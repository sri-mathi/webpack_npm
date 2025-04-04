import { LOGIN_CONSTANTS } from "./constants";
import { LoginFormProps } from "./types";

const LoginForm = ({ onSubmit, errorMessage }: LoginFormProps) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
      )}
      <div>
        <label className="block text-black-600 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder={LOGIN_CONSTANTS.emailPlaceholder}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-black-600 text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder={LOGIN_CONSTANTS.passwordPlaceholder}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        {LOGIN_CONSTANTS.loginButton}
      </button>
    </form>
  );
};

export default LoginForm;
