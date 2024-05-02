import { useCreateEmployeeMutation } from "~/api/hr/useEmployeeMutation";

export const useCreateEmployee = () => {
  const { mutate: mutationCreateEmployee } = useCreateEmployeeMutation({
    onSuccess: (res) => {
      console.log("create employee success", res.data);
    },
    onError: (err) => {
      console.log("create employee failed", err);
    },
  });

  return {
    mutationCreateEmployee,
  };
};
