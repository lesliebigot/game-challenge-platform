import "./App.css";
import { Routes, Route } from "react-router";

import { Header } from "../header/header.tsx";
import { Footer } from "../footer/footer.tsx";
import { HomePage } from "../homePage/homePage.tsx";
import { GameList } from "../gameLists/gameList.tsx";
import { Challenges } from "../challenges/challenges.tsx";
import { SignIn } from "../signIn/signIn.tsx";
import { SignUp } from "../signUp/signUp.tsx";
import { Profil } from "../profil/profil.tsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Le contenu principal s’étend pour remplir l’espace libre */}
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
