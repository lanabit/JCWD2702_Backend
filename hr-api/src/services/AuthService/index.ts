import { IFindEmployeeByEmailParams } from "./types";
import { prisma } from "../../connection";

export const findEmployeeByEmail = async ({
  email,
}: IFindEmployeeByEmailParams) => {
  const findEmployee = await prisma.employee.findFirst({
    where: {
      email,
    },
    include: {
      EmployeeProfile : {
        include: {
          EmployeeImagesProfile: true
        } 
      }
    }
  });

  if (!findEmployee) throw new Error("Email is not registered");

  return findEmployee;
};
