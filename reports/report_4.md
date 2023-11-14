# Report 4 (Week 7) due 11/08/23

## Team Report

### Previous Week Goals:

- Get Beta Release ready
  - Initial email login and verification set up
  - Course directory implemented 
    - Pages fetching course data from database
    - Links to course pages
  - Course pages done
    - Pages fetching course data from database
  - People can add a review
    - Review UI
    - Submitted reviews added to database

### Progress and Issues:

Progress:

In our misunderstanding of the Beta Release, we over-extended our planned goals for the demo. Instead, we modified our goals to just completing the course directory pages and their database interaction.
- Set up dynamic website to run on Vercel for all developers
- Completed Beta Release Milestone
  - Completed course directory pages’ class card display and interaction with the database
    - Set up Express server and API folder to define endpoints to connect to the MySQL database
  - Deployed beta website to Vercel URL
  - Created Beta slide presentation
- Added RateMyCSE logo to header
- Implementation of log-in page UI currently a pull request

Issues:

- When opening the site, the home page is not the first thing you see
- Database contains CSE courses that don't exist, some courses have ridiculously long prerequisite lists

### Next Week Goals: 

- Begin to get the login set up
- Fix the bug so that the homepage is the default/landing page
- Get the class tabs not being highlighted/bold bug fixed
- Make sure the data for class course is correct
- Begin getting class courses to be clickable and direct to a new route

## Individual Contributions

### Previous Week Goals:

**Oliver** - Have the sign in and email verification set up for the demo

**Henry** - Sort out UI issues in the design

**Thao** - Have the homepage ready to demo

**Celestine** -  Have the class directory and course pages ready to demo

**Jeremy** - Set up the database interaction for course directory, pages, and login set up. Support Celestine in getting the class directory and course pages ready to demo.

### Progress and Issues:

**Oliver** - Worked on getting the login page UI set up and the routing. Vercel isn’t working for him so that’s a current blocker.

**Henry** - Got the UI done for adding a review. Worked on fixing the default routing bug.

**Thao** - Finished the homepage, code-reviewed, worked on the Beta slideshow presentation, connected to the database and started learning MySQL.

**Celestine** - Added page Routing tests, code-reviewed and approved the Homepage implementation, fixed a merge issue which deleted CSS styling, added Rating boxes to the class directory cards and semi-finalized other card CSS, and made the Architecture and Design slide in the Beta presentation. Had some CSS styling problems where card elements would overflow from the right side of the card, which I’m still trying to work out, but am having a hard time finding a solution for.

**Jeremy** - Had the course information added to our database. Set up Vercel and API endpoints using serverless functions. Also added that class tabs opened a route that displayed a list of classes.

### Next Week Goals:

**Oliver** - Get the login page backend set up and look into email verification.

**Henry** - Will work on the fixing the bug where the tabs are not highlighted/bold when on that route.

**Thao** - Fix bugs, work on implementation, write user manual and developer guidelines in the project’s Git Repository.

**Celestine** -  Solve the class card overflow problem. Refactor our file organization for better modularity (separate our Homepage.tsx and all tests). Start implementation of course pages linked to the directory cards.

**Jeremy** - Investigate the data where there are some classes that have wrong description/wrong classes in the database. Also try to help Oliver fix his Vercel environment. Potentially look into finding an easier way to view backend changes with Vercel instead of deploying each time/waiting for deployment.
