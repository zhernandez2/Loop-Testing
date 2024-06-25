class Login
{
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page)
    {
        this.page = page;
    }

    async enterUserName(userName)
    {
        if(userName == null || userName == '')
        {
            console.log("got here")
            throw new Error("No userName given");
        }
        await this.page.getByLabel('email').fill(userName);
    }
    async enterPassword(passWord)
    {
        if(passWord == null || passWord == '')
        {
            throw new Error("No Password given");
        }
        await this.page.getByLabel('Password', {exact : true}).fill(passWord);
    }
    async clickContinueAfterEmailIsProvided()
    {
        await this.page.getByRole('button',{name : 'Continue', exact : true}).click();
    }
    async clickLogin()
    {
        await this.page.getByRole('button',{name : 'Log in'}).click();
    }

    async Login(userName,password)
    {
        await this.enterUserName(userName);
        await this.clickContinueAfterEmailIsProvided()
        await this.enterPassword(password);
        await this.clickLogin();
    }
}
    

module.exports = Login