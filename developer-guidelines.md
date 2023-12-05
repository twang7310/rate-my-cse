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
- `src`: Application code
    - `App`: routing logic and page definitions
    - `CoursePages`: logic and styling of course pages
    - `Homepage`: logic and styling homepage
    - `Layout`: logic and styling of the site layout (header and sidebar)
    - `Login`: logic and styling of the login and signup pages
-  `api`: API endpoints to query database, used by Vercel
    - To create a new endpoint for a unique query, add a file `[name].js` to this folder to create the endpoint `/api/[name]`

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

# How to Build a Release of the Software

The developer who releases the latest build (which *must* be the **GitHub repository owner**) has to deploy it manually on Vercel and then switch that deployment to the production environment.

The developer also has to manually update the version number on the README.md file through a PR. 
- The version number convention is [Major Release Number].[Number of Merges to Main] 
    - Example: v0.4.4 is major release 0 (beta) with 44 merges to main.

Also 'Create a New Release' on GitHub linked to a new tag of this new version number.

Our CI/CD pipeline checks the sanity of deployment for us on each PR. However, deployer must check website is functioning as expected on main URL after deployment.
