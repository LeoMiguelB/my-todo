import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <div>
      <Link to="/login">
        <div className="log">
          <footer>Login</footer>
        </div>
      </Link>
      <Link to="/register">
        <div className="log">
          <footer>Register</footer>
        </div>
      </Link>
    </div>
  );

  return content;
};

export default Public;
