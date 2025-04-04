import { useAuth } from "./useAuth";

export const useLogin = () => {
  const { login, errorMessage } = useAuth();

  const handleSubmit = (formData) => {
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const values = {
    //   email: formDat
    //   password: formData.get("password") as string,
    // };
    login(formData);
  };

  return {
    handleSubmit,
    errorMessage,
  };
};
