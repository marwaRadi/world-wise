import { createContext, useContext, useReducer } from "react";
const AuthContext = createContext();
// initialValue
const initialValue = {
  user: null,
  authenticated: false,
};
// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, authenticated: true };
    case "logout":
      return initialValue;

    default:
      throw new Error("unknown action'key");
  }
}
// fake oject
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, authenticated }, dispatch] = useReducer(reducer, initialValue);


  
  function login(email, password) {
   
    if (email !== FAKE_USER.email) return alert('wrong email')
    if (password !== FAKE_USER.password) return alert('wrong Password')
    dispatch({ type: "login", payload: FAKE_USER });

  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("You used Context outside AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
