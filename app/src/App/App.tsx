import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage, HomeLayout, ClassList} from '../Homepage/Homepage';
import {LoginPage} from '../Login/LoginPage';
import {SignupPage} from '../Login/SignupPage';
import {GetDefaultRoute} from '../Helpers/utils';
import '../Homepage/Homepage.css';
import '../Login/Login.css';

function App() {
  const classPrefix = 'cse';
  const classNumbers = ['100s', '300s', '400s', '500s'];

  return (
    <Router>
      <HomeLayout>
        <Routes>
          <Route path={GetDefaultRoute()} element={<HomePage />} />
          {classNumbers.map((classNumber) => (
            <Route
              path={GetDefaultRoute() + "/" + classPrefix + classNumber}
              element={<ClassList classLevelNumber={classNumber[0]} />}
            />
          ))}
          <Route path={GetDefaultRoute() + '/login'} element={<LoginPage/>}/>
          <Route path={GetDefaultRoute() + '/signup'} element={<SignupPage/>}/>
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
