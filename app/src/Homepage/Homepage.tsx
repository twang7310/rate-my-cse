import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {InnerPage, HomeLayout} from './Homepage-components';
import {GetDefaultRoute} from '../Helpers/utils';
import './Homepage.css';

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
              key={classNumber}
              path={GetDefaultRoute() + classPrefix + classNumber}
            />
          ))}
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
