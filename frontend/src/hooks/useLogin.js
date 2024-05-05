import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password, setFormField, navigator) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!email || !password) {
        setError("Please fill out all fields.");
        return;
      }

      const form = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "https://nasa-api-app-b9y8.onrender.com/api/v1/users/login",
        {
          headers: { "Content-Type": "application/json" },
          data: form,
        }
      );

      console.log(response);

      if (response.status === 200) {
        setFormField({ email: "", password: "" });
        setError("");
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
        navigator("/");
      } else {
        setError(response.data.message);
        setIsLoading(false);
      }
    } catch (e) {
      console.log({ error: e });
      setError(e?.response?.data?.message || "An error occurred.");
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
