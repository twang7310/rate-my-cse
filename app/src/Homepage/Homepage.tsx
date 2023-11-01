import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {InnerPage, HomeLayout} from './Homepage-components';
import './Homepage.css';

function App() {
  return (
    <Router>
      <HomeLayout>
        <Routes>
          <Route path='rate-my-cse/' element={<InnerPage/>} />
          <Route path='rate-my-cse/cse100s' element='cse100s page'/>
          <Route path='rate-my-cse/cse300s' element='cse300s page'/>
          <Route path='rate-my-cse/cse400s' element='cse400s page'/>
          <Route path='rate-my-cse/cse500s' element='cse500s page'/>
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
