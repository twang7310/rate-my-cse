import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {InnerPage, HomeLayout} from '../Homepage/Homepage';
import {LoginPage} from '../LoginPage/LoginPage';
import {GetDefaultRoute} from '../Helpers/utils';
import '../Homepage/Homepage.css';
import '../LoginPage/LoginPage.css';

function App() {
  const classPrefix = 'cse';
  const classNumbers = ['100s', '300s', '400s', '500s'];

  return (
    <Router>
      <HomeLayout>
        <Routes>
          <Route path={GetDefaultRoute()} element={<InnerPage/>} />
          {classNumbers.map((classNumber) => (
            <Route
              key={classNumber}
              path={GetDefaultRoute() + classPrefix + classNumber}
            />
          ))}
          <Route path={GetDefaultRoute() + '/login'} element={<LoginPage/>}/>
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
