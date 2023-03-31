import { BrowserRouter, Route, Routes } from "react-router-dom";

import FiredGuysComp from './components/FireGuys';
import Install from './components/Install';
import LhMemoriesComp from './components/LhMemories';
import Home from "./components/Home";

function App() {

  if (window.ethereum) {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/lh-memories" element={<LhMemoriesComp />}></Route>
        <Route path="/fire-guys" element={<FiredGuysComp />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
    // <LhMemoriesComp />
    );
  } else {
    return <Install />
  }
}

export default App;