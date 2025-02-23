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
    firstName:string;
    lastName:string;
    gmail:string;
    occupation:string;
    x?:string;
    date?:string;
    ig?:string;
    phone?:string;
}

export interface ContainerAddContentProps {
    addNewContacts: ContactAddedType[];
}


