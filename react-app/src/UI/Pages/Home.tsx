import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import {Context} from "../../Context/ContextWrapper";
import TicketList from "../Components/TicketListForm/TicketList";
import {useAsyncEffect} from "../../Hooks/useAsyncEffect";
import {GiveTicket} from "../Components/GiveTicketForm/GiveTicket";
import {CarsList} from "../Components/CarsListForm/CarsList";
import {AddLicense} from "../Components/AddLicenseForm/AddLicense";
import {AddCar} from "../Components/AddCarForm/AddCar";
import {Button} from "react-bootstrap";
import Service from "../../Services/Service";
import {Roles} from "../../Context/Context.interfaces";
import {AddCategory} from "../Components/AddCategoryForm/AddCategory";

const Home = () => {
    const {user, getBalance, getLicense, license, balance} = useContext(Context)
    const navigation = useHistory()
    useAsyncEffect(async () => {
        if (user.login === "") {
            navigation.push('/signIn')
        } else {
            await getBalance();
            await getLicense();
            console.log(new Date(license.lifetime).getTime() / 1000)
            // console.log(license)
        }
    }, [])

    const extendHandler = async () => {
        const date = Math.floor(new Date().getTime() / 1000).toString()
        const tx = await Service.post({func: "extendLicense", args: [user.login, date], type: "POST"})
        alert(tx);
        await getLicense()
    }

    return (
        <div style={{margin: "0 auto", width: "40%"}}>
            <h2>Личный кабинет</h2>
            <p>Ваш логин: {user.login}</p>
            <p>Ваша роль: {user.role}</p>
            <p>Ваш баланс: {balance} PROFI</p>

            {user.role !== Roles.Bank &&
                (
                    <>
                        <p>Ваше ФИО: {user.FIO}</p>
                        <p>Ваш стаж вождения: {user.experience} лет</p>
                        <AddLicense login={user.login}/>
                        {
                            license.id.length > 0 && (
                                <>
                                    <p>Номер вашего водительского: {license?.id}</p>
                                    <p>Категории водительского: {license?.category?.map((el, idx) => (
                                        <>
                                            {el}
                                        </>
                                    ))}</p>
                                    <p>Срок действия: {new Date(license?.lifetime).toLocaleDateString()}</p>
                                    <Button variant="success" onClick={extendHandler}>Продлить водительские</Button>
                                </>
                            )

                        }
                        <TicketList login={user.login}/>
                        <AddCar login={user.login}/>
                        <CarsList/>
                        <AddCategory login={user.login}/>
                        {user.role === "Сотрудник ДПС" && (
                            <>
                                <GiveTicket login={user.login}/>
                            </>
                        )}
                    </>
                )}

        </div>
    );
};

export default Home;
