import { useState } from "react";
import { useNavigate } from "react-router-dom";
import amplifyService from "../../services/aws/aws-services";
import axios from "axios";
import Cookies from "universal-cookie";
import useAuthStore from "../store/authStore";

const cookies = new Cookies();

interface LoginFormValues {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const navigate = useNavigate();

  const { setAccessToken, setTenantId } = useAuthStore();

  const login = async (values: LoginFormValues) => {
    try {
      const userSignedIn = await amplifyService.signIn({
        username: values.email,
        password: values.password,
      });

      if (userSignedIn.isSignedIn) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("name", "Test-User");
        localStorage.setItem("email", values.email);

        console.log("Successfully completed login");

        const accessToken = cookies.get(
          "CognitoIdentityServiceProvider.7hte1nkjug6rqsf9air6021aqr.dashboard2%40mailsac.com.accessToken"
        );

        if (accessToken) {
          console.log("Access Token:", accessToken);
          setAccessToken(accessToken);

          const response = await axios.get(
            "http://localhost:3000/api/crm/validate-user",
            {
              headers: {
                Authorization: accessToken,
              },
            }
          );

          console.log("User validation API call successful:", response.data);
          const tenant_id = response?.data?.data?.defaultWorkspace?.id;
          console.log("x-tenant-id", tenant_id);
          if (tenant_id) {
            setTenantId(tenant_id);
          }

          localStorage.setItem("x-tenant-id", tenant_id);
        } else {
          console.warn("Access token not found in cookies.");
        }

        // navigate("/showconnection");
      }
    } catch (e: any) {
      setErrorMessage(e.message || "An error occurred");
      localStorage.setItem("isAuthenticated", "false");
      console.error("Login error:", e);
    }
  };

  return { login, errorMessage };
};
