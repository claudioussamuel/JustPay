export interface UnavailabeDataType  {
    title:string;
    description:string;
    image:string;
}

export interface User{
    gender: unknown;
    dob: unknown;
    profilePic: unknown;
    email: unknown;
    phone: unknown;
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

export interface ContactAddedType{
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    imageUrl: string;
    xHandle: string;
    facebookHandle: string;
    igHandle: string;
    location: string;
    email: string;
    phone: string;
    userAddress: string;
}

export type PrivyUser={
    id?:string;
    email?:string;
    name?:string;
}
export interface ContainerAddContentProps {
    addNewContacts: ContactAddedType[];
}


export interface UserData {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    profilePic: string;
    xHandle: string;
    facebookHandle: string;
    igHandle: string;
    address: string;
    email: string;
    phone: string;
}

