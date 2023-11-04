import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {InnerPage, HomeLayout, ClassList} from '../Homepage/Homepage';
import {GetDefaultRoute} from '../Helpers/utils';
import '../Homepage/Homepage.css';

function App() {
  const classPrefix = 'cse';
  const classNumbers = ['100s', '300s', '400s', '500s'];

  return (
    <Router>
      <HomeLayout>
        <Routes>
          <Route path={GetDefaultRoute()} element={<InnerPage />} />
          {classNumbers.map((classNumber) => (
            <Route
              path={GetDefaultRoute() + "/" + classPrefix + classNumber}
              element={<ClassList classLevelNumber={classNumber[0]} />}
            />
          ))}
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
