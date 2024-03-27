export interface IUser{
    username: string,
    email: string, 
    password: string, 
    role: string
}

export interface IUserJSON extends IUser{
    uid: number
}