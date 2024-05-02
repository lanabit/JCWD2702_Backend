import { useQuery } from "react-query";
import axios from "axios";

export const useGetPositionAndShiftQuery = () => {
  console.log("ini useQuery");
  const { data, isSuccess, isError } = useQuery({
    queryFn: async () => {
      return await axios.get("http://localhost:5000/employee/shift-position");
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
