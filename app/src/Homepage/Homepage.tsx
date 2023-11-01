import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {InnerPage, HomeLayout} from './Homepage-components';
import {GetDefaultRoute} from '../utils';
import './Homepage.css';

function App() {
  return (
    <Router>
      <HomeLayout>
        <Routes>
          <Route path={GetDefaultRoute() + '/'} element={<InnerPage/>} />
          <Route path={GetDefaultRoute() + '/cse100s'} element='cse100s page'/>
          <Route path={GetDefaultRoute() + '/cse300s'} element='cse300s page'/>
          <Route path={GetDefaultRoute() + '/cse400s'} element='cse400s page'/>
          <Route path={GetDefaultRoute() + '/cse500s'} element='cse500s page'/>
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
