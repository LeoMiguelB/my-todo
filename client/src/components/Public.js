import { Link } from "react-router-dom";

import Login from "./Login";

import Register from "./Register";

const Public = () => {
  const content = (
    <div className="outer-log">
      <Login />
      <Register />
    </div>
  );

  return content;
};

export default Public;
