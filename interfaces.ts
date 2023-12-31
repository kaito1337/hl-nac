/*
 * SPDX-License-Identifier: Apache-2.0
 */
export enum Roles {User = "Водитель", DPS = "Сотрудник ДПС", Bank = "Банк"}
interface IInfo{
    users: IUser[];
    licenses: ILicense[];
}

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
    license: ILicense;
    cars: ICar[];
    tickets: ITicket[];
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

export type{
    IInfo,
    ITicket,
    ILicense,
    ICar,
    IUser
}
