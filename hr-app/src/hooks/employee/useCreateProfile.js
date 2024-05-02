import { useCreateEmployeeProfileMutation } from "~/api/employee/useCreateEmployeeProfileMutation";

export const useCreateEmployeeProfile = () => {
  console.log("Hooks");
  const { mutate: mutationCreateProfile } = useCreateEmployeeProfileMutation({
    onSuccess: () => {
      alert("Success");
    },
    onError: () => {
      alert("Error");
    },
  });

  return {
    mutationCreateProfile,
  };
};
