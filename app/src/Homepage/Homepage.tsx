import {Header, Sidebar, LevelTab, InnerPage} from './Homepage-components';
import './Homepage.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar>
        <LevelTab classlevel='Home'/>
        <LevelTab classlevel='CSE 100s'/>
        <LevelTab classlevel='CSE 300s'/>
        <LevelTab classlevel='CSE 400s'/>
        <LevelTab classlevel='CSE 500s'/>
      </Sidebar>
      <InnerPage/>
    </div>
  );
}

export default App;
