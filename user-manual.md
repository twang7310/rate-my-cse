# What is RateMyCSE?
RateMyCSE is a course reviewing website specifically for the students of the University of Washington studying computer science. It is a place where you can find everything you need on a CSE class in order to build a balanced schedule. You can read written reviews from students who have taken the class, the average difficulty, workload, and practicality ratings of each class, see tags for classes that have coding, exams, or group projects (work in progress). You can also provide insight for other students by leaving your own reviews and ratings.

# How to install and run RateMyCSE
RateMyCSE is a free, public website. You can access it by visiting [rate-my-cse.vercel.app](https://rate-my-cse.vercel.app/). To run a local, dynamic version follow these steps:
1. Navigate to [our GitHub page](https://github.com/twang7310/rate-my-cse) and clone the repository to your IDE
    - See [this documentation](https://docs.google.com/document/d/1LwtVxxJOj7jnUVf5e_kKqspS8TplsrqHjAzqN-fwkPc/edit?usp=sharing) to set up in VSCode
2. If not already installed, install Node.js using [any of these options](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
3. Navigate into the `app` directory and install packages with the following commands:
```bash
cd app
npm install
```
4. [Set Up Vercel](https://docs.google.com/document/d/1B64yPUQdTuXjUSW5-lY_u1_KKsJCz6n7-R-Csg8UUMg/edit?usp=sharing)
5. Run `vercel` in the main terminal to run a deployment with backend functionality (can view through Preview link).

# How to use RateMyCSE

## Finding a Course
### Directory Tabs
1. On the left hand side of the screen there are tabs to separate courses by their course number (CSE154: Web Programming would be found in the CSE100s tab)
2. Click on the desired tab and it will load up all the courses within that course number category
      - (Work in progress) There are also filters you can apply to find courses with specific tags such as:
      - Coding: If a course involves coding or if it is purely theory and proofs
      - Collaborative: If the course allows you to have homework partners
      - Group-work: If the course requires you to work in a group
      - No Exams: If the course does not have a midterm or final
3. Once you have spotted your desired course, click anywhere on the class card (the white box containing the course) and you will be taken to the course page. There you can find the average ratings for that course (difficulty, workload, and practicality) as well as students’ written opinions and a course description. To view the official course website, you can click on the button that says “Course Website”. To see the DawgPaths page for that course, hit the button that says "DawgPaths".

### Search Bar
- On the home page there will be a search bar where you can enter the name of the course you’re looking for or the course number
- If you are not on the home page, a search bar can be found on the top right
- Enter your search and hit enter to get a list of all matching courses

## Creating an Account
1. Click on “Sign In” on the top right.
2. Enter your uw.edu email and click the “Verify” button.
3. You should be sent an email with a verification link. If you have not received an email, you can click on “Resend email” under the “Verify” button.
4. Go to your email and click on the verification link.
6. You have successfully created a RateMyCSE account! Now you can log in to rate and review courses yourself.

## Signing into your Account
1. Cick on “Sign In” on the top right.
2. Enter the uw.edu email associated with your RateMyCSE account, and the password for your RateMyCSE account.
    - If you forgot your password, click on the “Forgot password?”
    - Enter the UW email you signed up with and then your new password
    - A verification code should be sent to the entered UW email with a link to confirm your password was reset
3. Click on the “Continue” button and you should be logged in and ready to use RateMyCSE.

## Submitting a Review
1. Navigate to the course you want to review and click the purple button that says “Rate This Class”. 
    - If you are already logged in, this should take you to the review page
2. You will be taken to the review page where will be asked to rate the difficulty, workload, and difficulty, on a scale of 1 through 5.
3. To rate a category, simply click on the amount of stars you wish to give. The left-most star being a 1/5, and the right-most star being 5/5.
4. (Optional) To leave a text review, click on the white text box under “Comment (optional)” and start typing.
5. (Optional) Enter the quarter and professor that you took that course.
6. Once you are done, and wish to publish your review, click the purple button called “Submit”. If you would like to cancel your review, click the purple button called “Discard”. This will clear all of the information you have entered.

# How to Report Bugs
1. Head to https://github.com/twang7310/rate-my-cse/issues/new/choose to open a new issue.
2. Click on the “Get Started” button to the right of the Bug report option.
3. Provide a title for the bug that describes what happened (e.g. Login Button Bug).
4. Fill out the information requested in the template.
5. Click the green “Submit new issue” button at the bottom of the page.
6. Thank you for reporting the bug!
