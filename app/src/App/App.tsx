import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage, HomeLayout} from '../Homepage/Homepage';
import '../Homepage/Homepage.css';

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
              key={classNumber}
              path={classPrefix + classNumber}
            />
          ))}
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
