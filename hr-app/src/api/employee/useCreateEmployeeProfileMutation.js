import { useMutation } from "react-query";
import axios from "axios";
import { axiosInstance } from "~/utils/axiosInstance";

export const useCreateEmployeeProfileMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (fd) => {
      console.log(fd);
      return await axiosInstance.post("/employee/profile", fd);
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};


export const useUpdateEmployeeProfileMutation = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (fd) => {
      console.log(fd);
      return await axiosInstance.put("/employee/profile", fd);
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};
