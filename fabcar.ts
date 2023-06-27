/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {Context, Contract} from 'fabric-contract-api';
import {ICar, IInfo, ILicense, ITicket, IUser, Roles} from './interfaces';

export class FabCar extends Contract {

    public async initLedger(ctx: Context) {
        console.info('============= START : Initialize Ledger ===========');
        const info: IInfo = {
            'users': [
                {
                    login: 'bank',
                    password: '123',
                    FIO: 'bank',
                    experience: '0',
                    balance: 1000,
                    role: Roles.Bank
                },
                {
                    login: 'ivan',
                    password: '123',
                    FIO: 'Иванов Иван Иванович',
                    experience: '2',
                    balance: 50,
                    cars: [],
                    tickets: [],
                    role: Roles.DPS
                },
                {
                    login: 'semen',
                    password: '123',
                    FIO: 'Семенов Семен Семенович',
                    experience: '5',
                    balance: 50,
                    cars: [],
                    tickets: [],
                    role: Roles.User
                },
                {
                    login: 'petr',
                    password: '123',
                    FIO: 'Петров Петр Петрович',
                    experience: '10',
                    balance: 50,
                    cars: [],
                    tickets: [],
                    role: Roles.User
                },

            ],
            'licenses': [
                {
                    id: '000',
                    lifetime: '11.01.2021',
                    category: ['A']
                },
                {
                    id: '111',
                    lifetime: '12.05.2025',
                    category: ['B']
                },
                {
                    id: '222',
                    lifetime: '09.09.2020',
                    category: ['C']
                },
                {
                    id: '333',
                    lifetime: '13.02.2027',
                    category: ['A']
                },
                {
                    id: '444',
                    lifetime: '10.09.2020',
                    category: ['B']
                },
                {
                    id: '555',
                    lifetime: '24.06.2019',
                    category: ['C']
                },
                {
                    id: '666',
                    lifetime: '31.03.2030',
                    category: ['A']
                },
            ]
        };
        const objKeys = Object.keys(info);
        for (let i = 0; i < objKeys.length; i++) {
            await ctx.stub.putState(objKeys[i], Buffer.from(JSON.stringify(info[objKeys[i]])));
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    private async getAllUsers(ctx: Context): Promise<string> {
        const data = (await ctx.stub.getState('users')).toString();
        return data;
    }

    private async getAllLicenses(ctx: Context): Promise<string> {
        const data = (await ctx.stub.getState('licenses')).toString();
        return data;
    }

    public async getBalance(ctx: Context, login: string): Promise<number> {
        const users: IUser[] = JSON.parse(await this.getAllUsers(ctx));
        const user = users.find((el) => el.login === login);
        if (user) {
            return user.balance;
        } else {
            return 0;
        }
    }

    public async signUp(ctx: Context, login: string, password: string, FIO: string, experience: string): Promise<string> {
        const users = JSON.parse(await this.getAllUsers(ctx));
        const existUser = users.find((el) => el.login === login);
        if (existUser) {
            return JSON.stringify('Пользователь с таким логином уже существует');
        }
        const newUser: IUser = {
            login,
            password,
            FIO,
            experience,
            balance: 0,
            cars: [],
            tickets: [],
            role: Roles.User
        };
        users.push(newUser);
        await ctx.stub.putState('users', Buffer.from(JSON.stringify(users)));
        return JSON.stringify('Успешная регистрация');
    }

    public async signIn(ctx: Context, login: string, password: string): Promise<string> {
        const users: IUser[] = JSON.parse(await this.getAllUsers(ctx));
        const existUser = users.find((el) => el.login === login && el.password === password);
        if (!existUser) {
            return JSON.stringify('Неверно введены данные');
        }
        return JSON.stringify(existUser);
    }

    public async addLicense(ctx: Context, login: string, id: string, lifetime: string, category: string): Promise<string> {
        const users: IUser[] = JSON.parse(await this.getAllUsers(ctx));
        const licenses: ILicense[] = JSON.parse(await this.getAllLicenses(ctx));
        const existLicense = licenses.find((el) => el.id === id && el.lifetime === lifetime && el.category.indexOf(category) !== -1);
        const userIndex = users.findIndex((el) => el.login === login);
        if (userIndex === -1) {
            return JSON.stringify('Неправильный логин пользователя');
        }
        if (!existLicense) {
            return JSON.stringify('Неверно введены данные водительского удостоверения');
        }
        users[userIndex].license = {
            id,
            lifetime,
            category: [`${category}`]
        };
        return JSON.stringify('Удостоверение успешно добавлено');
    }

    public async addCar(ctx: Context, login: string, title: string, category: string): Promise<string> {
        const users: IUser[] = JSON.parse(await this.getAllUsers(ctx));
        const userIndex = users.findIndex((el) => el.login === login);
        if (userIndex === -1) {
            return JSON.stringify('Неправильный логин пользователя');
        }
        const indexCategory = users[userIndex].license.category.indexOf(category);
        if (indexCategory === -1) {
            return JSON.stringify('Вы не можете добавить авто категории, которой у вас нет в водительском');
        }
        const car: ICar = {
            title,
            category
        };
        users[userIndex].cars.push(car);
        await ctx.stub.putState('users', Buffer.from(JSON.stringify(users)));
        return JSON.stringify('Машина успешно добавлена');
    }

    public async payTicket(ctx: Context, login: string, ticketId: string): Promise<string> {
        const users: IUser[] = JSON.parse(await this.getAllUsers(ctx));
        const userIndex = users.findIndex((el) => el.login === login);
        const bankIndex = users.findIndex((el) => el.login === 'bank');
        const ticketIndex = users[userIndex].tickets.findIndex((el) => el.id === ticketId);
        if (ticketIndex === -1) {
            return JSON.stringify('Неправильный номер штрафа');
        }
        const date = Math.floor(new Date().getTime() / 1000);
        const ticketDate = Math.floor(new Date(users[userIndex].tickets[ticketIndex].issuingTime).getTime() / 1000);
        console.log(date, ticketDate);
        console.log(date - ticketDate < 432000);
        if (date - ticketDate < 432000) {
            users[userIndex].balance -= 5;
            users[bankIndex].balance += 5;
            users[userIndex].tickets.splice(ticketIndex, 1);
        } else {
            users[userIndex].balance -= 10;
            users[bankIndex].balance += 10;
            users[userIndex].tickets.splice(ticketIndex, 1);
        }
        console.log(users[userIndex].tickets);
        await ctx.stub.putState('users', Buffer.from(JSON.stringify(users)));
        return JSON.stringify('Штраф успешно оплачен');
    }

    public async giveTicket(ctx: Context, login: string, idLicense: string): Promise<string> {
        const users: IUser[] = JSON.parse(await this.getAllUsers(ctx));
        const userIndex = users.findIndex((el) => el.login === login);
        if (users[userIndex].role !== Roles.DPS) {
            return JSON.stringify('У вас нет доступа');
        }
        const violatorIndex = users.findIndex((el) => el.license.id === idLicense);
        if (violatorIndex === -1) {
            return JSON.stringify('Неверный номер водительского');
        }
        const ticket: ITicket = {
            id: users[violatorIndex].tickets.length.toString(),
            issuingTime: new Date().getTime().toString(),
        };
        console.log(ticket);
        users[violatorIndex].tickets.push(ticket);
        await ctx.stub.putState('users', Buffer.from(JSON.stringify(users)));
        return JSON.stringify('Штраф успешно выписан');
    }

    public async extensionLicense(ctx: Context, login: string): Promise<string> {
        const users: IUser[] = JSON.parse(await this.getAllUsers(ctx));
        const userIndex = users.findIndex((el) => el.login === login);
        if (userIndex === -1) {
            return JSON.stringify('Неправильный логин');
        }
        if (users[userIndex].tickets.length > 0) {
            return JSON.stringify('Для продления водительских, нужно оплатить все штрафы');
        }
        const date = Math.floor(new Date().getTime() / 1000);
        const licenseDate = Math.floor(new Date(users[userIndex].license.lifetime).getTime() / 1000);
        if (licenseDate - date > 2678400) {
            const newDate = new Date((licenseDate + 2678400)*1000).toString();
            users[userIndex].license.lifetime = newDate;
            await ctx.stub.putState('users', Buffer.from(JSON.stringify(users)));
            return JSON.stringify('Водительские успешно продлены');
        } else {
            return JSON.stringify('Текущая дата должна быть не больше, чем за месяц до окончания срока действия удостоверения');
        }
    }

    public async addCategory(ctx: Context, login: string, category: string): Promise<string>{
        const users: IUser[] = JSON.parse(await this.getAllUsers(ctx));
        const userIndex = users.findIndex((el) => el.login === login);
        if (userIndex === -1) {
            return JSON.stringify('Неправильный логин');
        }
        const existCategory = users[userIndex].license.category.indexOf(category);
        if(existCategory !== -1){
            return JSON.stringify("")
        }
        users[userIndex].license.category.push(category);
        await ctx.stub.putState('users', Buffer.from(JSON.stringify(users)));
        return JSON.stringify('Категория успешно добавлена');
    }

}
