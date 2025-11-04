import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export function SignUp() {
  const [pseudo, setPseudo] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [csrfToken, setCsrfToken] = useState(""); // CSRF token
  const navigate = useNavigate();

  // Récupérer le token CSRF au montage
  useEffect(() => {
    axios
      .get("https://projet-gamer-challenges.onrender.com/api/csrf-token", {
        withCredentials: true,
      })
      .then((res) => {
        setCsrfToken(res.data.csrfToken);
      });
  }, []);

  const signup = async () => {
    try {
      // Inclusion du token CSRF dans les headers
      const response = await axios.post(
        "https://projet-gamer-challenges.onrender.com/register",
        {
          pseudo,
          lastname,
          firstname,
          email,
          password,
          birthdate: birthdate.toString(),
          role_id: "1",
        },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );
      console.log("Réponse inscription :", response);
      navigate("/signin");
    } catch (e) {
      console.error("Erreur signup:", e instanceof Error ? e.message : e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    signup();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-10 pb-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 pixel-font text-center">
        Page d'inscription
      </h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lastname" className="label">
                Nom
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                className="input w-full"
                placeholder="Nom"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="firstname" className="label">
                Prénom
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                className="input w-full"
                placeholder="Prénom"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="birthdate" className="label">
                Date de naissance
              </label>
              <input
                id="birthdate"
                name="birthdate"
                type="date"
                className="input w-full"
                placeholder="Date de naissance"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="input w-full"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmedPassword" className="label">
                Confirmation de mot de passe
              </label>
              <input
                id="confirmedPassword"
                name="confirmedPassword"
                type="password"
                className="input w-full"
                placeholder="Mot de passe"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="pseudo" className="label">
                Pseudo
              </label>
              <input
                id="pseudo"
                name="pseudo"
                type="text"
                className="input w-full"
                placeholder="Pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button className="btn btn-primary">S'inscrire</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
