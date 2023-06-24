import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { LoginForm } from './LogInForm';

export const AuthNow = () => {
  const { isAuth, logOut } = useContext(AuthContext);
  return isAuth ? (
    <>
      <p>"You are welcome!" </p>
      <button onClick={logOut}>Logout</button>
    </>
  ) : (
    <LoginForm />
  );
};
