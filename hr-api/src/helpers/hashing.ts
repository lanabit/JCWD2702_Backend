import bcrypt from "bcrypt";
const saltRounds = 10;

interface IHashPassword {
  password: string;
}

interface IComparePassword {
  passwordClient: string;
  passwordDb: string;
}

export const HashPassword = async ({ password }: IHashPassword) => {
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async ({
  passwordClient,
  passwordDb,
}: IComparePassword) => {
  return await bcrypt.compare(passwordClient, passwordDb);
};
