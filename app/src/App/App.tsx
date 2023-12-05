import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import {HomeLayout} from '../Layout/Layout';
import {HomePage} from '../Homepage/Homepage';
import {ClassList} from '../Directories/Directory';
import {LoginPage} from '../Login/LoginPage';
import {SignupPage} from '../Login/SignupPage';
import {CoursePage} from '../CoursePages/CoursePage';
import {ReviewPage} from '../Rating/Rating';
import {useEffect} from 'react';

// Utility component, scrolls to the top of the 
// page upon route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const classPrefix = 'cse';
  const classNumbers = ['100s', '300s', '400s', '500s'];

  return (
    <Router>
      <ScrollToTop/>
      <HomeLayout>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          {classNumbers.map((classNumber) => (
            <Route
              path={"/" + classPrefix + classNumber}
              element={<ClassList classLevelNumber={classNumber[0]} />}
            />
          ))}
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/signup'} element={<SignupPage/>}/>
          <Route path={'/search/:query'} element={<ClassList />} />
          <Route path={'/course/:classNum'} element={<CoursePage/>}/>
          <Route path={'/course/:classNum/review'} element={<ReviewPage/>}/>
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
