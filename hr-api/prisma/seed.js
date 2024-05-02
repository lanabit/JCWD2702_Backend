// import { PrismaClient } from "@prisma/client/edge";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dataPosition = [
  {
    name: "Manager",
    salary: 25000000,
  },
  {
    name: "PM",
    salary: 17500000,
  },
  {
    name: "Programmer",
    salary: 15000000,
  },
  {
    name: "HR",
    salary: 12000000,
  },
];

const dataShift = [
  {
    start: "1970-01-01T09:00:00.000Z",
    end: "1970-01-01T18:00:00.000Z",
  },
  {
    start: "1970-01-01T13:00:00.000Z",
    end: "1970-01-01T22:00:00.000Z",
  },
];

const dataEmployee = [
  {
    email: "wulan@test.com",
    fullname: "Wulan Tsabita",
    password: "12345678",
    positionId: 4,
    shiftId: 1,
    address: "Bintaro",
  },
];

async function main() {
  for (let item of dataPosition) {
    await prisma.position.create({
      data: item,
    });
  }
  for (let item of dataShift) {
    await prisma.shift.create({
      data: item,
    });
  }
  for (let item of dataEmployee) {
    await prisma.employee.create({
      data: item,
    });
  }
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
