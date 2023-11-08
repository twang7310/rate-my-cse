# RateMyCSE v1.3.9-beta
RateMyCSE is a website for UW students to rate, review, and better understand the structure of CSE classes at UW.
The website will be a center for all the information a student would need in order to create a balanced schedule 
for their quarters; a collection of student opinions and experiences about specific CSE courses.

## Current Use Cases
- The user can navigate between course directory pages, which display all courses of a level (100s, 300s, 400s, 500s) with their, name, description, and average review ratings in the three rating categories. Once one of these pages is navigated to, all this information on all relevant classes is fetched from the database and parsed into a displayed list of these 'class cards'.

## Repository Layout
We are in our early stages of development. Our current repo layout is:

### `app`
The folder for all of our development files.
### `reports`
The folder for our weekly status reports.

## Build and Test

To build and test the system locally, built-in React scripts are used. 

To build, enter the `app` directory and run this command to generate a deployable version of the application in a build directory:
```bash
npm build
```

To test, enter the `app` directory and run this command to run all the project's Jest tests:
```bash
npm test
```

## Run
To run the system locally, run this React script in the `app` directory to run a static version of the website on the localhost site provided to you:
```bash
npm start
```

To run a dynamic version, set up Vercel using [this documentation](https://docs.google.com/document/d/1B64yPUQdTuXjUSW5-lY_u1_KKsJCz6n7-R-Csg8UUMg/edit?usp=sharing), then run this command in the `app` directory, following the instructions to log in and connect to project and view the site at the provided Preview link:
```bash
vercel
```

To deploy to production, we deploy our repository to Vercel and set that deployment as the production website. This can only be done by our GitHub repository owner,
