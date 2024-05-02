import { useGetPositionAndShiftQuery } from "~/api/useGetPositionandShiftQuery";

export const useGetPositionAndShift = () => {
  const {
    data: dataPositionAndShift,
    isSuccess,
    isError,
  } = useGetPositionAndShiftQuery();
  console.log(dataPositionAndShift);
  console.log(isSuccess);
  console.log(isError);

  return {
    dataPositionAndShift: dataPositionAndShift?.data.data,
  };
};
