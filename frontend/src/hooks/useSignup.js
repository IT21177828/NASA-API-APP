import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (formField, setFormField, navigator) => {
    setIsLoading(true);
    setError(null);

    try {
      if (formField.name && formField.email && formField.password) {
        console.log("Form data is valid. Submitting...");

        console.log(formField);

        const data = {
          name: formField.name,
          email: formField.email,
          password: formField.password,
        };

        const response = await axios.post(
          "https://nasa-api-app-b9y8.onrender.com/api/v1/users/signup",
          {
            headers: { "Content-Type": "application/json" },
            data,
          }
        );

        console.log(response);

        if ((response.status = 201)) {
          setFormField({
            name: "",
            email: "",
            password: "",
          });
          setError("");
          setIsLoading(false);          
        } else {
          setError(response.data.message);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log({ error: error });
      setError(error?.response?.data?.message || "An error occurred.");
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
