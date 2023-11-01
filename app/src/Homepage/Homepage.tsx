import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Header, Sidebar, LevelTab, InnerPage, Layout} from './Homepage-components';
import './Homepage.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="rate-my-cse/" element={<Homepage/>} />
          <Route path="rate-my-cse/cse100s" element="cse100s page"/>
          <Route path="rate-my-cse/cse300s" element="cse300s page"/>
          <Route path="rate-my-cse/cse400s" element="cse400s page"/>
          <Route path="rate-my-cse/cse500s" element="cse500s page"/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

function Homepage() {
  return (
      <InnerPage/>
  );
}

export default App;
