# RateMyCSE v0.4.4
RateMyCSE is a website for UW students to rate, review, and better understand the structure of CSE classes at UW.
The website will be a center for all the information a student would need in order to create a balanced schedule 
for their quarters; a collection of student opinions and experiences about specific CSE courses.

[User Manual](https://github.com/twang7310/rate-my-cse/blob/main/user-manual.md)

[Developer Guidelines](https://github.com/twang7310/rate-my-cse/blob/main/developer-guidelines.md)

## Current Use Cases
- The user can navigate between course directory pages, which display all courses of a level (100s, 300s, 400s, 500s) with their, name, description, and average review ratings in the three rating categories. Once one of these pages is navigated to, all this information on all relevant classes is fetched from the database and parsed into a displayed list of these 'class cards'.
- The user can click on a course from a directory page and be to that course's page, which displays that course's name, description, and average review ratings (fetched from the database), and has a button which takes the user to that course's review page.
- On a course's review page, the user can leave a comment reviewing that course and select their ratings out of 5 on the three review categories. They can click the submit button to submit their review to the database, which returns them to the course page, or hit the back button to return without submitting.

## Repository Layout
We are in our early stages of development. Our current repo layout is:

### `.github`
The folder for CI pipeline workflows and the bug report template.
### `app`
The folder for all of our development files.
### `reports`
The folder for our weekly status reports.

## Build and Test

To build and test the system locally, built-in React scripts are used. 

Before either, enter the `app` directory and run this command to install project dependencies:
```bash
npm install
```

To build, run this command in the `app` directory to generate a deployable version of the application in a build directory:
```bash
npm run build
```

To test, run this command in the `app` directory to run all the project's Jest tests:
```bash
npm test
```

## Run
To run the system locally, run these React scripts in the `app` directory to run a static version of the website (with very limited functionality) on the localhost site provided to you:
```bash
npm install
npm start
```

To run a full, dynamic version of the site, set up Vercel using [this documentation](https://docs.google.com/document/d/1B64yPUQdTuXjUSW5-lY_u1_KKsJCz6n7-R-Csg8UUMg/edit?usp=sharing), then run this command in the repo's default directory, following the instructions to log in and connect to project and view the site at the provided Preview link:
```bash
vercel
```

To deploy to production, we deploy our repository to Vercel and set that deployment as the production website. This can only be done by our GitHub repository owner.