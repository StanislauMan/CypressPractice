import WelcomePage from "./WelcomePage"

class CustomerLoginPage {

    getYourNameDdl = () => cy.get('#userSelect')
    getListOfNames = () => cy.get('.form-control > option')
    getLoginBtn = () => cy.get('button[type="submit"]')
    getHomeBtn = () => cy.get('button[ng-click="home()"]')


    checkYourNameDdl() {
        this.getYourNameDdl().should('be.visible')

        return this
    }

    clickYourNameDdl() {
        this.getYourNameDdl().select()
        this.getListOfNames().should('be.visible')

        return this
    }

    selectUserNameFromDdl(userName) {
        this.getYourNameDdl().select(userName)

        return this
    }

    clickLoginBtn() {
        this.getLoginBtn().click()

        return WelcomePage
    }

}
export default CustomerLoginPage