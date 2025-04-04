import { Link } from "react-router-dom";
import { LOGIN_CONSTANTS } from "../LoginForm/constants";

const SignupLink = () => {
  return (
    <div className="text-center mt-4">
      <p className="text-sm text-black-600">
        {LOGIN_CONSTANTS.signupText}{" "}
        <Link to="/SignUp" className="text-blue-600 hover:underline">
          {LOGIN_CONSTANTS.signupLink}
        </Link>
      </p>
    </div>
  );
};

export default SignupLink;
