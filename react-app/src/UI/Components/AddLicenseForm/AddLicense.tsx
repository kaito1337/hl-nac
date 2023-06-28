import React, {FC, useContext} from 'react';
import {IProps} from "../../../Interfaces/IProps";
import Service from "../../../Services/Service";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../../Context/ContextWrapper";

export const AddLicense: FC<IProps> = ({login}) => {

    const {getLicense} = useContext(Context)

    const addHandler = async (e: any) => {
        e.preventDefault();
        const {target} = e;
        const tx = await Service.post({
            func: "addLicense",
            args: [login, target[0].value, target[1].value, target[2].value],
            type: "POST"
        })
        alert(tx)
        await getLicense()
    }

    return (
        <div>
            <h2>Добавить водительское удостоверение</h2>
            <Form onSubmit={addHandler}>

                <Form.Group className="mb-3">
                    <Form.Label>Номер водительского</Form.Label>
                    <Form.Control type="text" placeholder="Введите номер" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Срок действия водительского</Form.Label>
                    <Form.Control type="text" placeholder="Например: 28.06.2023" required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Категория водительского</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </Form.Select>
                </Form.Group>


                <Button variant="success" type="submit">
                    Подтвердить
                </Button>
            </Form>
        </div>
    );
};
