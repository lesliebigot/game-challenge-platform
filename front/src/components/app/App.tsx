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
import { CreateChallenge } from "../createChallenge/createChallenge.tsx";
import { ParticipateChallenge } from "../participateChallenge/participateChallenge.tsx";
import { EditChallenge } from "../editChallenge/editChallenge.tsx";
import { Contact } from "../contact/contact.tsx";
import { LegalNotice } from "../legalNotice/legalNotice.tsx";
import { SpecificGame } from "../specificGame/specificGame.tsx";
import { SpecificChallenge } from "../specificChallenge/specificChallenge.tsx";
import { Ranking } from "../ranking/ranking.tsx";
import { Team } from "../team/team.tsx";


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Le contenu principal s’étend pour remplir l’espace libre */}
      <main className="flex-1 flex flex-col">
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/:id" element={<SpecificGame />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/create-challenge/:id" element={<CreateChallenge />} />
          <Route path="/edit-challenge/:id" element={<EditChallenge />} />
          <Route path="/participate-challenge/:id" element={<ParticipateChallenge />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/games/1" element={<SpecificGame />} />
          <Route path="/challenges/:id" element={<SpecificChallenge />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
