import CustomerLoginPage from "./CustomerLoginPage"

class WelcomePage {

    getWelcomeTitle = () => cy.get('.fontBig.ng-binding')
    getLogOutBtn = () => cy.get('button[ng-show="logout"]')
    getAccountNumberDdl = () => cy.get('select[ng-hide="noAccount"]')
    getUserAccountNumber = () => cy.get('.borderM > .center > .ng-binding:nth-child(1)')
    getUserBalance = () => cy.get('.borderM > .center > .ng-binding:nth-child(2)')
    getUserCurrency = () => cy.get('.borderM > .center > .ng-binding:nth-child(3)')
    getTransactionsBtn = () => cy.get('button[ng-class="btnClass1"]')
    getDepositBtn = () => cy.get('button[ng-class="btnClass2"]')
    getWithdrawlBtn = () => cy.get('button[ng-class="btnClass3"]')
    getTransactionsTable = () => cy.get('.table')
    getTransactionsTableRows = () => cy.get('table > tbody > tr')
    getTransactionsBackBtn = () => cy.get('.fixedTopBox > .btn:nth-child(1)')
    getTransactionsResetBtn = () => cy.get('button[ng-show="showDate"]')
    getAmountToBeField = () => cy.get('input[type="number"]')
    getTransactionsSubmitBtn = () => cy.get('button[type="submit"]')
    getTransactionsMessage = () => cy.get('span[ng-show="message"]')
    getDepositDateTimeCell = () => cy.get('table > tbody > tr > td:nth-child(1)')
    getDepositAmountCell = () => cy.get('table > tbody > tr > td:nth-child(2)')
    getDepositTransactionTypeCell = () => cy.get('table > tbody > tr > td:nth-child(3)')
    getWithdrawlDateTimeCell = () => cy.get('table > tbody > tr:nth-child(2) > td:nth-child(1)')
    getWithdrawlAmountCell = () => cy.get('table > tbody > tr:nth-child(2) > td:nth-child(2)')
    getWithdrawlTransactionTypeCell = () => cy.get('table > tbody > tr:nth-child(2) > td:nth-child(3)')


    checkWelcomeTitile(userName) {
        this.getWelcomeTitle().should('have.text', userName)

        return this
    }

    selectAccountData(data) {
        this.getAccountNumberDdl().select(data.accountNumber)
        this.getUserAccountNumber().should('have.text', `${data.accountNumber} `)
        this.getUserBalance().should('have.text', data.balance)
        this.getUserCurrency().should('have.text', data.currency)

        return this
    }

    parseUserBalance() {
        this.getUserBalance().then($el => {
            let balance = $el.text()

            console.log(balance)
            return balance
        })

        return this
    }

    clickTransactionsBtn() {
        cy.wait(1000)
        this.getTransactionsBtn().click()
        this.getTransactionsTableRows().should('be.visible')

        return this
    }

    clickDepositBtn() {
        this.getDepositBtn().click()
        this.getAmountToBeField().should('be.visible')

        return this
    }

    clickWithdrawlBtn() {
        this.getWithdrawlBtn().click()
        this.getAmountToBeField().should('be.visible')

        return this;
    }

    
    clickWithdrawSubmitBtn() {
        this.getTransactionsSubmitBtn().click()

        return this
    }

    checkWithdrawlSuccessMessage() {
        this.getTransactionsMessage().should('have.text', 'Transaction successful')

        return this
    }

    checkWithdrawlErrorMessage() {
        this.getTransactionsMessage().should('have.text', 'Transaction Failed. You can not withdraw amount more than the balance.')

        return this
    }

    clickDepositSubmitBtn() {
        this.getTransactionsSubmitBtn().click()
        this.getTransactionsMessage().should('have.text', 'Deposit Successful')

        return this
    }

    typeAmountToBeDepositedField(value) {
        this.getAmountToBeField().type(value)

        return this
    }

    clickTransactionsBackBtn = () => {
        this.getTransactionsBackBtn().click()
        this.getUserAccountNumber().should('be.visible')

        return this
    }

    clickTransactionsResetBtn() {
        this.clickTransactionsBtn()
        this.getTransactionsResetBtn().click()
        this.getTransactionsTableRows().should('not.exist')

        return this
    }


    checkTransactionsErrorMessage() {
        this.clickWithdrawlBtn()
        this.getUserBalance().then($el => {
            let balance = $el.text()
            return balance
        }).then(userData => {
            this.getAmountToBeField().type(+userData + 100)
            this.clickWithdrawSubmitBtn()
            this.checkWithdrawlErrorMessage() 
        })
        
        return this
    }


    checkDepositCalculation(amount) {
        this.clickTransactionsResetBtn()
        this.clickTransactionsBackBtn()
        this.getUserBalance()
            .then($el => {
                let balance = $el.text()
                return balance
            }).then(data => {
                this.clickDepositBtn()
                this.typeAmountToBeDepositedField(amount)
                this.clickDepositSubmitBtn()
                this.getUserBalance()
                    .then($el => {
                        let userBalance = $el.text()
                        let depositValue = userBalance - data;
                        expect(+userBalance).to.eql(+data + amount)
                        expect(depositValue).to.eql(amount)
                    })
            })

        return this
    }


    checkWithdrawlCalculation(amount) {
        this.getUserBalance()
            .then($el => {
                let balance = $el.text()
                return balance
            }).then(data => {
                this.clickWithdrawlBtn()
                this.getAmountToBeField().type(amount)
                this.clickWithdrawSubmitBtn()
                this.checkWithdrawlSuccessMessage()
                this.getUserBalance()
                    .then($el => {
                        let userBalance = $el.text()
                        let withdrawValue = data - userBalance;
                        expect(+userBalance).to.eql(data - amount)
                        expect(withdrawValue).to.eql(amount)
                    })
            })

        return this
    }

    getCurrentDate() {
        const date = new Date().toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });
        return date
    }

    checkDepositTransactionsComplete(transactionAmount) {
        this.clickTransactionsBtn()
        this.getDepositDateTimeCell().then($el => {
            let transactionDate = $el.text().replace(/[:]\d\d /, ' ')
            let date = this.getCurrentDate().replace(/\d{4}\,/g, new Date().getFullYear())
            expect(transactionDate).to.eql(date)
        })
        this.getDepositAmountCell().then($item => {
            expect(+$item.text()).to.eql(transactionAmount)
        })
        this.getDepositTransactionTypeCell().then($data => {
            let type = $data.text()
            expect(type).to.eql('Credit')
        })
        this.clickTransactionsBackBtn()

        return this
    }


    checkWithdrawlTransactionsComplete(transactionAmount) {
        this.clickTransactionsBtn()
        this.getWithdrawlDateTimeCell().then($el => {
            let transactionDate = $el.text().replace(/[:]\d\d /, ' ')
            let date = this.getCurrentDate().replace(/\d{4}\,/g, new Date().getFullYear())
            expect(transactionDate).to.eql(date)
        })
        this.getWithdrawlAmountCell().then($item => {
            expect(+$item.text()).to.eql(transactionAmount)
        })
        this.getWithdrawlTransactionTypeCell().then($data => {
            let type = $data.text()
            expect(type).to.eql('Debit')
        })
        this.clickTransactionsBackBtn()

        return this
    }

    clickLogOutBtn() {
        this.getLogOutBtn().click()

        return CustomerLoginPage
    }

}
export default WelcomePage