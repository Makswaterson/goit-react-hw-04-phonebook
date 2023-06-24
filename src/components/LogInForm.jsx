import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

export const LoginForm = () => {
  const { logIn } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    logIn(e.target.elements.password.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" name="password" />
      <button type="submit"> Відправити</button>
    </form>
  );
};
