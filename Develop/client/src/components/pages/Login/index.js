import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../utils/mutations';
import Auth from '../../../utils/auth';
import '../../../assets/css/Login.css';

function Login(props) {
  console.log(props.name)
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { loading, error }] = useMutation(LOGIN_USER);
  useEffect(() => {
    // onToggle(true);
  });

  // Form submit handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: 'Tim@gmail.com', password: 'password' }
      });

      const token = data.login.token;
      Auth.login(token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container my-1">
      <div className="formParent">
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">Email address:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          {loading ? (
            <div>
              <p className="loading-text">Loading...</p>
            </div>
          ) : null}
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect. Please correct credentials or create a new
                account
              </p>
            </div>
          ) : null}
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
