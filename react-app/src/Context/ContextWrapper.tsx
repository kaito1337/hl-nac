import React, {createContext, FC, useState} from 'react';
import {ICar, IContextProps, ILicense, ITicket, IUser, IValues, Roles} from "./Context.interfaces";
import Service from "../Services/Service";

export const Context = createContext({} as IValues)
export const ContextWrapper: FC<IContextProps> = ({children}) => {
    const initUser: IUser = {
        login: '',
        password: '',
        FIO: '',
        role: Roles.User,
        experience: "",
        balance: 0
    }
    const initLicense: ILicense = {
        id: "",
        lifetime: "",
        category: []
    }
    const [user, setUser] = useState<IUser>(initUser)
    const [balance, setBalance] = useState<number>(0)
    const [license, setLicense] = useState<ILicense>(initLicense)
    const [tickets, setTickets] = useState<ITicket[]>([])
    const [cars, setCars] = useState<ICar[]>([])

    const getUser = (user: IUser) => {
        setUser(user);
    }

    const getCars = async () => {
        const data = await Service.post({func: "getCars", type: "GET", args: [user.login]});
        setCars(data);
    }

    const getLicense = async () => {
        const data = await Service.post({func: "getLicense", type: "GET", args: [user.login]});
        setLicense(data);
    }
    const getTickets = async () => {
        const data = await Service.post({func: "getTickets", type: "GET", args: [user.login]});
        setTickets(data);
    }

    const logout = () => {
        setUser(initUser);
        setBalance(0);
        setLicense(initLicense)
        setCars([]);
        setTickets([]);
    }

    const getBalance = async () => {
        const newBalance = await Service.post({func: "getBalance", type: "GET", args: [user.login]});
        setBalance(newBalance);
    }

    const values = {
        getUser,
        user,
        balance,
        getBalance,
        logout,
        tickets,
        getTickets,
        cars,
        license,
        getCars,
        getLicense,
    }

    return (
        <Context.Provider value={values}>{children}</Context.Provider>
    );
};
