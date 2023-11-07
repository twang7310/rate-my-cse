import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage, HomeLayout, ClassList} from '../Homepage/Homepage';
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
              path={"/" + classPrefix + classNumber}
              element={<ClassList classLevelNumber={classNumber[0]} />}
            />
          ))}
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
