const { test, expect } = require('@playwright/test');

import Dashboard from "./Dashboard.js";
import Login from "./login.js";

const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief",
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting",
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates",
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests, Project",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire",
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests, Project",
    "column": "In Progress",
    "card_title": "[Example] Password not working",
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests, Project",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V",
  }
];

test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((data) => {
    test("TestId: " + data.name, async ({ page }) => {
      await test.step('Login to Asana', async () => {
        // Login to Asana
        await page.goto("https://app.asana.com/-/login");

        //create new locator object
        const login = new Login(page);

        //automated login
        await login.Login("ben+pose@workwithloop.com","Password123");
      });

      await test.step('Navigate to the project page', async () => {
        // Navigate to the project page

        //Create new dashboard object
        const dashboard = new Dashboard(page);

        //select correct project for each test case
        await dashboard.selectProject(data.leftNav);
      });

      await test.step('Verify the card is within the right column', async () => {
        // Verify the card is within the right column

        //create dashboard
        const dashboard = new Dashboard(page);
        
        //select the specific card
        await dashboard.selectCard(data.card_title);

        //try to find the correct column button in the card, if not fail
        //wanted to catch the timeout error so I could fail the test normally
        try{
          await expect(page.getByRole('button',{name: data.column})).toBeVisible()
        }
        catch(error){
          console.log("Was not in the correct column.")
          expect(false).toBeTruthy()
        }
        })
      });     
    });
  })
