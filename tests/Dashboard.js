class Dashboard
{
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page)
    {
        this.page = page;
    }

    async selectProject(projectName){
        await this.page.getByLabel(projectName).click();
    }

    async selectCard(cardTitle){
        await this.page.getByText(cardTitle).click()
    }
}

module.exports = Dashboard