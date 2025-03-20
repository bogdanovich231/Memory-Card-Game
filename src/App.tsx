import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameBoard from "./Components/GameBoard/GameBoard";
import MainPage from "./Pages/MainPage/MainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game-board/:level" element={<GameBoard />} />
      </Routes>
    </Router>
  );
};

export default App;
