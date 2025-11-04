import { createContext } from "react";

// TYPE DU CONTEXT
// dans le context on va mettre le token et le pseudo
// ce sera un objet avec 2 propriétés
interface IUserContext {
  jwt: null | string;
  pseudo: null | string;
  userId: null | number;
  login: (jwt: string, pseudo: string, userId: number) => void;
  logout: () => void;
}

// le CONTEXT
const UserContext = createContext<undefined | IUserContext>(undefined);

export default UserContext;
