import {Header, Sidebar, LevelTab} from './Homepage-components';
import './Homepage.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar>
        <LevelTab classlevel='CSE 100s'/>
        <LevelTab classlevel='CSE 300s'/>
        <LevelTab classlevel='CSE 400s'/>
        <LevelTab classlevel='CSE 500s'/>
      </Sidebar>
    </div>
  );
}

export default App;
