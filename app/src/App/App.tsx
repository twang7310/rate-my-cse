import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomeLayout} from '../Layout/Layout';
import {HomePage} from '../Homepage/Homepage';
import {ClassList} from '../Directories/Directory';
import {LoginPage} from '../Login/LoginPage';
import {SignupPage} from '../Login/SignupPage';
import {CoursePage} from '../CoursePages/CoursePage';

function App() {
  const classPrefix = 'cse';
  const classNumbers = ['100s', '300s', '400s', '500s'];

  return (
    <Router>
      <HomeLayout>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          {classNumbers.map((classNumber) => (
            <Route
              path={"/" + classPrefix + classNumber}
              element={<ClassList classLevelNumber={classNumber[0]} />}
            >
            </Route>
          ))}
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/signup'} element={<SignupPage/>}/>
          <Route path={'/course/:classNum'} element={<CoursePage/>}/>
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
