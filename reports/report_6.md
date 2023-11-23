# Report 6 (Week 9) due 11/22/23

## Team Report

### Previous Week Goals:

- Refactor our code so that separate page components are in different folders
- Get the class tabs not being highlighted/bold bug fixed
- Begin getting class courses to be clickable and direct to a new route
- Begin exploring AWS integration with sign up

### Progress and Issues:

Progress:
- Login and sign up page UI merged into main
- Code refactored and repo files organized
- Home page routing fixed so that the home page is the first page you see when opening RateMyCSE
- Class cards made clickable and directed to the course page which has correct course data fetched from the database

Issues:
- Had a problem making an API call of a single object for course pages, but eventually learned to map the JSON returned as an array

### Next Week Goals: 

- Have course page UI finished (the page you see when you click on a class card)
- Have review page UI finished and connected to the course page ‘review’ button
- Set up login/signup database interaction
- Set up email verification

## Individual Contributions

### Previous Week Goals:

**Oliver** - Set up email verification and add password hiding feature when typing passwords.

**Henry** - Will fix the tabs not remaining bold issue.

**Thao** - Set up course page routing.

**Celestine** - Refactor the codebase so that components exist in separate folders. Help Thao set up the course page routing.

**Jeremy** - Get temporary/read-only permissions for our database. Look into the AWS service that does email storage/verification for Oliver. Will also check that the changes to the database do not break the query to list all classes.

### Progress and Issues:

**Oliver** - Looked into email verification with AWS Cognito.

**Henry** - Fixed the default route so that it no longer includes ‘/rate-my-cse/’. Worked on bolded tab bug.

**Thao** - Routed class cards to the corresponding course page on RateMyCSE.

**Celestine** - Refactored file contents into different folders and files based on page. Started implementing the Review page UI. 

**Jeremy** - Got read permissions set up for the peer review assignment. Helped Thao get unblocked with the class cards backend and double checked that the new database changes did not break the current backend. Got user and identity pool set up for AWS Cognito.

### Next Week Goals:

**Oliver** - Set up email verification and add password hiding feature when typing passwords.

**Henry** - Will continue to work on bold tab bug.

**Thao** - Start implementing course page UI

**Celestine** - Finish Review page UI and start implementing its functionality with the database submission.

**Jeremy** - Get the code connecting to AWS Cognito to our application and that the sign up is working
