import { useMutation } from "react-query";
import axios from "axios";

export const useCreateEmployeeMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async ({
      email,
      password,
      fullname,
      address,
      positionId,
      shiftId,
    }) => {
      const data = {
        email,
        password,
        fullname,
        address,
        positionId,
        shiftId,
      };
      console.log("Mutation create employee Executed!");
      return await axios.post("http://localhost:5000/hr/employee", data, {
        headers: {
          "accesstoken":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjbHZlcmlvbzIwMDAxeWJ6Y2Q1Zms4YmUwIiwiaWF0IjoxNzE0MDMyMDU0LCJleHAiOjE3MTQwMzU2NTR9.5oru4xuhK5qXdhi3p1Jfjgm8IKDssWecHIr7-EqzJPk",
        },
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
