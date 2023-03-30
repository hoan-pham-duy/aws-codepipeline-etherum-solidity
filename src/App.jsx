import FiredGuys from './components/FireGuys';
import Install from './components/Install';
import LhMemoriesComp from './components/LhMemories';

function App() {

  if (window.ethereum) {
    return <LhMemoriesComp />;
  } else {
    return <Install />
  }
}

export default App;