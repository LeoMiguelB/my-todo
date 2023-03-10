import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setCredentials } from "../features/api/authSlice";

import { useLoginMutation } from "../features/api/loginApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  //when the component loads focus on the username input
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //when changing user or pwd inputs set err msg empty for new potential erros
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ username, password }).unwrap();

      const { accessToken } = userData;

      dispatch(setCredentials({ token: accessToken, user: username }));
      setUsername("");
      setPassword("");
      navigate("/todos");
    } catch (error) {
      if (!error?.originalStatus) {
        setErrMsg("no server response");
      } else if (error.originalStatus === 400) {
        setErrMsg("Wrong username or password");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <form onSubmit={handleSubmit} className="logReg">
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={username}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
        />
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <button>Sign In</button>
      </form>
    </section>
  );

  return content;
};

export default Login;
