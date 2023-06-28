import React, {FC, useContext} from 'react';
import {useAsyncEffect} from "../../../Hooks/useAsyncEffect";
import {Context} from "../../../Context/ContextWrapper";
import {Button, ListGroup} from "react-bootstrap";
import Service from "../../../Services/Service";
import {IProps} from "../../../Interfaces/IProps";

const TicketList:FC<IProps> = ({login}) => {
    const {getTickets, tickets, getBalance} = useContext(Context);
    useAsyncEffect(async () => {
        await getTickets();
    }, [])

    const payHandler = async (id: string) => {
        const date = Math.floor(new Date().getTime() / 1000).toString();
        const tx = await Service.post({func: "payTicket", args: [login, id, date], type: "POST"})
        alert(tx);
        await getTickets()
        await getBalance()
    }

    return (
        <div>
            {tickets.length > 0 ? (
                <>
                    <h2>Ваши штрафы:</h2>
                    <ListGroup>
                    {tickets?.map((el, idx) => (
                        <>
                            <ListGroup.Item>№{el.id} | Время выдачи штрафа: {new Date(+el.issuingTime).toLocaleTimeString()}</ListGroup.Item>
                            {new Date(+el.issuingTime).getTime() / 1000 + 300 > new Date().getTime() / 1000 ? (
                                (
                                    <ListGroup.Item>Цена штрафа: 5 PROFI</ListGroup.Item>
                                )
                            ) : <ListGroup.Item>Цена штрафа: 10 PROFI </ListGroup.Item> }
                            <Button variant={"success"} onClick={() => payHandler(el.id)}>Оплатить штраф</Button>
                        </>
                    ))}
                    </ListGroup>
                </>
            ) : undefined
            }
        </div>
    );
};

export default TicketList;
