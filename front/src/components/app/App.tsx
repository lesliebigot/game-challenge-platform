import "./App.css";
import { Routes, Route } from "react-router";

import { Header } from "../header/header.tsx";
import { Footer } from "../footer/footer.tsx";
import { HomePage } from "../homePage/homePage.tsx";
import { GameList } from "../gameLists/gameList.tsx";

function App() {
  return (
    <>
      
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/games" element={<GameList/>}/>
      </Routes>
      
      <Footer />
      
    </>
  );
}

export default App;
