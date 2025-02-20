export interface UnavailabeDataType  {
    title:string;
    description:string;
    image:string;
}

export interface User{
    firstName:string;
    lastName: string;
    xHandle: string;
    facebookHandle:string;
    igHandle:string;
    address:string;
    occupation:string;
}

export interface UserContextType{
    users: User[];
    addUser:(user: User) =>void;
}