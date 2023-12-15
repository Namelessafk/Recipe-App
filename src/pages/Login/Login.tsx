import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
  },
};

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(INITIAL_STATE);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setLogin((prevFormData) => ({
      ...prevFormData,
      user: {
        ...prevFormData.user,
        [name]: value,
      },
    }));
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    const { email, password } = login.user;
    return password.length > 6 && isEmailValid(email);
  };

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
        localStorage.setItem('user', JSON.stringify({ email: login.user.email }));
        navigate('/meals');
      } }
      className="login-form"
    >
      <input
        data-testid="email-input"
        type="email"
        placeholder="E-mail"
        name="email"
        onChange={ handleChange }
        required
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        value={ login.user.password }
        onChange={ handleChange }
        placeholder="Password"
        required
      />
      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ !isFormValid() }
      >
        Enter
      </button>
    </form>
  );
}
