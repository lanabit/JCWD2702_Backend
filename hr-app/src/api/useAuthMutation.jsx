import { useMutation } from "react-query";
import axios from "axios";

export const useAuthMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({ email, password }) => {
      return await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};

//mutate, status(check status req api), isLoading
