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

export interface ContainerAddContentProps {
    addNewContacts: ContactAddedType[];
}


