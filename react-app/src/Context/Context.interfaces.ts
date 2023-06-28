import {ReactNode} from "react";

interface IContextProps{
    children: ReactNode
}

export enum Roles {User = "Водитель", DPS = "Сотрудник ДПС", Bank = "Банк"}

interface ITicket {
    id: string;
    issuingTime: string;
}

interface IUser{
    login: string;
    password: string;
    FIO: string;
    experience: string;
    balance: number;
    role: Roles;
}
interface ILicense{
    id: string,
    lifetime: string,
    category: string[];
}

interface ICar{
    title: string;
    price: string;
    lifetime: string;
    category: string;
}

interface IValues{
    getUser(user:IUser): void;
    getBalance(): Promise<void>;
    user: IUser;
    logout(): void;
    tickets: ITicket[];
    getTickets(): Promise<void>;
    getLicense(): Promise<void>;
    getCars(): Promise<void>;
    cars: ICar[];
    license: ILicense;
    balance: number
}

export type{
    ICar,
    ILicense,
    IUser,
    ITicket,
    IContextProps,
    IValues
}
