///<reference types='cypress' />

import CustomerLoginPage from "../pageObjects/CustomerLoginPage"
import HomePage from "../pageObjects/HomePage"
import WelcomePage from "../pageObjects/WelcomePage"
import main from "../fixtures/main.json"
import transactionsData from "../fixtures/transactionsData.json"

const homePage = new HomePage()
const customerLoginPage = new CustomerLoginPage()
const welcomePage = new WelcomePage()


describe('4rd resource', () => {

    beforeEach(() => {
        cy.visit(main.url4)
    })

    it('Customer login', () => {

        homePage.clickCustomerLoginBtn()
        customerLoginPage.checkYourNameDdl()
                         .selectUserNameFromDdl(transactionsData.userName[1])
                         .clickLoginBtn()
        welcomePage.checkWelcomeTitile(transactionsData.userName[1])
                   .selectAccountData(transactionsData.data[0])
                   .checkTransactionsErrorMessage()
                   .checkDepositCalculation(500)
                   .checkDepositTransactionsComplete(500)
                   .checkWithdrawlCalculation(50)
                   .checkWithdrawlTransactionsComplete(50)
                   .clickLogOutBtn()
        customerLoginPage.checkYourNameDdl()
    })
})
