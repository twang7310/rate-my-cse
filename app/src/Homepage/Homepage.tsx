import {Header, Sidebar, LevelTab} from './Homepage-components';
import './Homepage.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar>
        <LevelTab classlevel='1'/>
        <LevelTab classlevel='2'/>
        <LevelTab classlevel='3'/>
      </Sidebar>
    </div>
  );
}

export default App;
