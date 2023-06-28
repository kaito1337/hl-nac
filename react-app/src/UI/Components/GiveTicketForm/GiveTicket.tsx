import React, {FC, useContext} from 'react';
import {Button, Form} from "react-bootstrap";
import Service from "../../../Services/Service";
import {IProps} from "../../../Interfaces/IProps";
import {Context} from "../../../Context/ContextWrapper";

export const GiveTicket:FC<IProps> = ({login}) => {

    const {getTickets} = useContext(Context)

    const giveTicketHandler = async (e:any) => {
        e.preventDefault();
        const { target } = e;
        const time = new Date().getTime().toString()
        console.log(time)
        const tx = await Service.post({func: 'giveTicket', type: "POST", args: [login, target[0].value, time]})
        alert(tx)
        await getTickets()
    }

    return (
        <div style={{width: "80%", margin: "0 auto"}}>
            <h2>Выписать штраф человеку</h2>
            <Form onSubmit={giveTicketHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Номер водительского удостоверения</Form.Label>
                    <Form.Control type="text" placeholder="Введите номер водительского" required/>
                </Form.Group>

                <Button variant="success" type="submit">
                    Выписать
                </Button>
            </Form>
        </div>
    );
};

