import { prisma } from "../connection";
import moment from "moment-timezone";

export const getEmployees = async () => {
  const employees: any = await prisma.employee.findMany({
    include: {
      position: true,
      shift: true,
    },
  });
  return employees;
};

export const getEmployeeById = async (uid: string) => {
  const employee: any = await prisma.employee.findUnique({
    where: {
      uid,
    },
    include: {
      position: true,
      shift: true,
    },
  });
  return employee;
};

export const createAttendanceClockIn = async (id: any) => {
  await prisma.attendance.create({
    data: {
      date: new Date(),
      clockin: new Date(),
      employeeId: id,
      deduction: 0,
    },
  });
};

export const createAttendanceClockOut = async (id: number) => {
  await prisma.attendance.update({
    where: {
      id,
    },
    data: {
      clockout: new Date(),
    },
  });
};

export const createLeaveRequestService = async ({
  startDate,
  endDate,
  employeeid,
}: {
  startDate: any;
  endDate: any;
  employeeid: any;
}) => {
  await prisma.leaveRequest.create({
    data: {
      stardDate: new Date(startDate),
      endDate: new Date(endDate),
      employeeId: employeeid,
    },
  });
};

export const getShift = async () => {
  return await prisma.shift.findMany();
};

export const getPosition = async () => {
  return await prisma.position.findMany();
};

export const createProfileAndImagesProfile = async (
  uid: any,
  data: any,
  images: any
) => {
  return await prisma.$transaction(async (tx) => {
    const createdEmployeeProfile = await tx.employeeProfile.create({
      data: {
        birthDate: new Date(data.birthDate),
        address: data.address,
        employeeUid: uid,
      },
    });

    const imagesToCreate: any[] = [];
    images.forEach((item: any) => {
      imagesToCreate.push({
        url: item.path,
        employeeProfileId: createdEmployeeProfile.id,
      });
    });

    await tx.employeeImagesProfile.createMany({
      data: [...imagesToCreate],
    });
  });
};

export const updateProfileAndImages = async (uid: any, images: any) => {
  const findEmployee = await prisma.employee.findUnique({
    where: {
      uid,
    },
    include: {
      EmployeeProfile: {
        include: {
          EmployeeImagesProfile: true,
        },
      },
    },
  });

  const prevUrl = await prisma.employeeImagesProfile.findUnique({
    where: {
      id: findEmployee?.EmployeeProfile?.EmployeeImagesProfile[0].id,
    },
  });

  const imagesToCreate: any[] = [];
  
  images.forEach((item: any) => {
    imagesToCreate.push({
      url: item.path,
      employeeProfileId: findEmployee?.EmployeeProfile?.id,
    });
  });

  await prisma.$transaction(async (tx) => {
    await tx.employeeImagesProfile.update({
      where: {
        id: prevUrl?.id,
      },
      data: imagesToCreate[0],
    });
  });

  return prevUrl;
};
