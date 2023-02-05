import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <div className="outer-log">
      <Link to="/login">
        <div className="log">
          Login
        </div>
      </Link>
      <Link to="/register">
        <div className="log">
          Register
        </div>
      </Link>
    </div>
  );

  return content;
};

export default Public;
