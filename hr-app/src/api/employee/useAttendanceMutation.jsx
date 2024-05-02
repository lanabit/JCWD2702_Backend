import { useMutation } from "react-query";
import axios from "axios";
import { getCookie } from "~/utils/cookieHelper";

export const useClockInMutation = ({ onSuccess, onError }) => {
  const employeeid = getCookie();
  const { mutate } = useMutation({
    mutationFn: async () => {
      console.log("employeeid in cookie", employeeid);
      return await axios.post(
        "http://localhost:5000/employee/clockin",
        {},
        {
          headers: {
            employeeid: employeeid,
          },
        }
      );
    },
    onSuccess,
    onError,
  });

  return {
    mutate,
  };
};

//mutate, status(check status req api), isLoading
