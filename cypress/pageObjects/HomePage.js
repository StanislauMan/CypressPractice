import CustomerLoginPage from "./CustomerLoginPage"

class HomePage {

    getCustomerLoginBtn = () => cy.get('button[ng-click="customer()"]')
    getBankManagerLogin = () => cy.get('button[ng-click="manager()"]')


    clickCustomerLoginBtn() {
        this.getCustomerLoginBtn().click()

        return CustomerLoginPage
    }
}
export default HomePage