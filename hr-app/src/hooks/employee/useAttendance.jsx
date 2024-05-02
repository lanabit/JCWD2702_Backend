import { useClockInMutation } from "~/api/employee/useAttendanceMutation";

export const useClockIn = () => {
  const { mutate: mutationClockIn } = useClockInMutation({
    onSuccess: (res) => {
      console.log("clockin res!:");
      alert(res.data.message);
    },
    onError: (err) => {
      console.log("clockin error!", err);
    },
  });

  return {
    mutationClockIn,
  };
};
