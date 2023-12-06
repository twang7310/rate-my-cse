# RateMyCSE v0.4.4 (old)
RateMyCSE is a website for UW students to rate, review, and better understand the structure of CSE classes at UW.
The website will be a center for all the information a student would need in order to create a balanced schedule 
for their quarters; a collection of student opinions and experiences about specific CSE courses.

[User Manual](https://github.com/twang7310/rate-my-cse/blob/main/user-manual.md)

[Developer Guidelines](https://github.com/twang7310/rate-my-cse/blob/main/developer-guidelines.md)

## Features & Functionality
### [Directory Tabs](https://github.com/twang7310/rate-my-cse/blob/main/user-manual.md#directory-tabs)
On the left hand side of the screen there are tabs to separate courses by their course number (CSE154: Web Programming would be found in the CSE100s tab) and users can click on those tabs to find all the courses in that course level.

### [Search Bar](https://github.com/twang7310/rate-my-cse/blob/main/user-manual.md#search-bar-work-in-progress)
On the home page there is a search bar where you can enter the name of the course you’re looking for or the course number and the matching courses will appear. Whenever the user is not on the home page, a search bar can be found on the top right.

### [RateMyCSE Accounts](https://github.com/twang7310/rate-my-cse/blob/main/user-manual.md#creating-an-account-work-in-progress)
Although an account isn't required to view courses and their reviews, you can create an account using a valid UW email (@uw.edu) and log in and out of RateMyCSE to submit/edit/delete your reviews.

### [Review Submissions](https://github.com/twang7310/rate-my-cse/blob/main/user-manual.md#submitting-a-review-work-in-progress)
Users with accounts can leave reviews with numerical ratings for difficulty, workload, and practicality.
Optionally, they can leave a text review and the quarter and professor that they took.
Users have the option to go back and edit or remove their reviews as well.

## Repository Layout
### `.github`
The folder for CI pipeline workflows and the bug report template.
### `app`
The folder for all of our development files.
  - `api` - All of the API calls used for SQL queries throughout the site like retrieving course information, inputting user reviews, etc.
  - `public` - Contains the index.html file needed for the react app to render
  - `src` - Code for all the React components and pages that you see on the site
    - `__mocks__` - Mocked content for the mui-one-time-password-input package to let Jest allow third-party imports
    -  `images` - Where we keep logos and icons
    - `App` - The base layout of the site containing the URL routes and page definitions
    - `CoursePages` - The page for each individual course containing the course’s information and reviews
    - `Directories` - The page contents that appear when clicking on the sidebar tabs (CSE 100s, CSE 300s, etc.)
    - `Homepage` - The page that first loads when visiting RateMyCSE
    - `Layout` - The components that stay consistent on RateMyCSE (The header, and sidebar)
    - `Login` - The login pages including the sign up and forget password pages
    - `Popup` - Component used for alerts on RateMyCSE
    - `Rating` - The page for users to leave their review and ratings
    - `utils` - A folder for our helpers or factored-out code that is used in multiple folders

### `reports`
The folder for our weekly status reports.

## Build and Test

To build and test the system locally, built-in React scripts are used. 
First make sure you have cloned our repository.
  1. Navigate to [our GitHub page](https://github.com/twang7310/rate-my-cse) and clone the repository to your IDE
      - See [this documentation](https://docs.google.com/document/d/1LwtVxxJOj7jnUVf5e_kKqspS8TplsrqHjAzqN-fwkPc/edit?usp=sharing) to set up in VSCode
  2. If not already installed, install Node.js using [any of these options](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
  3. Navigate into the `app` directory and install packages with the following commands:
  ```bash
  cd app
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
