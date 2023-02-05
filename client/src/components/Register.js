import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/api/loginApiSlice";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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
      const response = await register({ username, password }).unwrap();
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      if (!error?.originalStatus) {
        setErrMsg("no server response");
      } else if (error.originalStatus === 409) {
        setErrMsg("Username already exist");
      } else {
        setErrMsg("Register Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="register">
      <form onSubmit={handleSubmit} className="logReg">
        <h1>Register</h1>
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
        <button>Register</button>
        <button className="logout-btn" onClick={() => navigate("/")}>
          <span>Back To Home</span>
        </button>
      </form>
    </section>
  );

  return content;
};

export default Register;
