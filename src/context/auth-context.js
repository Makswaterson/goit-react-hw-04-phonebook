import { useState, createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const logIn = password => {
    if (password === 'Admin') setisAuth(true);
    else alert('Введіть пароль');
  };

  const logOut = () => {
    setisAuth(false);
  };
  return (
    <AuthContext.Provider value={{ isAuth, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
