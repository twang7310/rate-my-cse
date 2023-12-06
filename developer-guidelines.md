# How to Obtain Source Code

1. Navigate to [our GitHub page](https://github.com/twang7310/rate-my-cse) and clone the repository to your IDE
    - See [this documentation](https://docs.google.com/document/d/1LwtVxxJOj7jnUVf5e_kKqspS8TplsrqHjAzqN-fwkPc/edit?usp=sharing) to set up in VSCode
2. If not already installed, install Node.js using [any of these options](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
3. Navigate into the `app` directory and install packages with the following commands:
```bash
cd app
npm install
```

# Directory Structure Layout

### `.github`
CI pipeline workflows and bug report template
### `reports`
Weekly status reports
### `app`
Main application
-  `api` - API endpoints to query database, used by Vercel
    - To create a new endpoint for a unique query, add a file `[name].js` to this folder to create the endpoint `/api/[name]`
- `images` - Where we keep logos and icons
- `public` - Contains the index.html file needed for the react app to render
- `src` - Application code
    - `__mocks__` - Mocked content for the mui-one-time-password-input package to let Jest allow third-party imports
    - `App`: routing logic and page definitions
    - `CoursePages` - logic and styling of course pages
    - `Homepage` - logic and styling homepage
    - `Layout` - logic and styling of the site layout (e.g. header and sidebar)
    - `Login` - logic and styling of the login, signup, and "forget password" pages
    - `Popup` - logic and styling for pop-up alerts on RateMyCSE (e.g. when a user tries to leave a review for a course they've already reviewed)
    - `Rating` - The page for users to leave their review and ratings
    - `utils` - A folder for our helpers or factored-out code that is used in multiple folders (e.g. search bar and loading page)

# How to Build the Software
There are two ways to build the software locally: with and without dynamic data.

### Non-Dynamic Build (Limited Functionality)

To see only UI and routing functionality, run the following commands:
```bash
cd app
npm run start
```

Warning: This build will not include base functionality like the course directories, reviews, etc. It is not the preferred build. For a full, functioning website, follow the instructions below.

### Dynamic Build (Full Functionality)

To also see backend interaction with database, install Vercel and MySQL:

[Instructions to Set Up MySQL](https://docs.google.com/document/d/1hxllThInRdxMRxFeXJ93Sv0CdyC7pF5A5nCzsViFWR4/edit?usp=sharing)


[Instructions to Set Up Vercel](https://docs.google.com/document/d/1B64yPUQdTuXjUSW5-lY_u1_KKsJCz6n7-R-Csg8UUMg/edit?usp=sharing)

Once set up, you can run `vercel` in the main terminal to run a deployment with backend functionality (can view through Preview link).

# How to Test the Software

In the project's terminal, run:
```bash
cd app
npm test
```

# How to Add New Tests

1. Identify the component to be tested
2. If the `[name].tsx` file containing the component does not have a corresponding `[name].test.tsx` file, create a `[name].test.tsx` file of the same name as the base file
3. Add the test to that corresponding test file

# How to Report Bugs
1. Head to https://github.com/twang7310/rate-my-cse/issues/new/choose to open a new issue.
2. Click on the “Get Started” button to the right of the Bug report option.
3. Provide a title for the bug that describes what happened (e.g. Login Button Bug).
4. Fill out the information requested in the template.
5. Click the green “Submit new issue” button at the bottom of the page.
6. Thank you for reporting the bug!

# How to Build a Release of the Software

The developer who releases the latest build (which *must* be the **GitHub repository owner**) has to deploy it manually on Vercel and then switch that deployment to the production environment.

The developer also has to manually update the version number on the README.md file through a PR. 
- The version number convention is [Major Release Number].[Number of Merges to Main] 
    - Example: v0.4.4 is major release 0 (beta) with 44 merges to main.

Also 'Create a New Release' on GitHub linked to a new tag of this new version number.

Our CI/CD pipeline checks the sanity of deployment for us on each PR. However, deployer must check website is functioning as expected on main URL after deployment.
