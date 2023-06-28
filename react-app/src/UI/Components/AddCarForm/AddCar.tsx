import React, {FC, useContext} from 'react';
import Service from "../../../Services/Service";
import {Button, Form} from "react-bootstrap";
import {IProps} from "../../../Interfaces/IProps";
import {Context} from "../../../Context/ContextWrapper";

export const AddCar:FC<IProps> = ({login}) => {

    const {getCars} = useContext(Context)

    const addHandler = async(e:any) => {
        e.preventDefault();
        const { target } = e;
        const tx = await Service.post({func: "addCar", args: [login, target[0].value, target[1].value, target[2].value, target[3].value], type: "POST"})
        alert(tx);
        await getCars();
    }

    return (
        <div>
            <h2>Добавить авто</h2>
            <Form onSubmit={addHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Название</Form.Label>
                    <Form.Control type="text" placeholder="Введите название авто" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Рыночная стоимость</Form.Label>
                    <Form.Control type="number" min={1} placeholder="Введите стоимость" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Срок эксплуатации</Form.Label>
                    <Form.Control type="number" min={0} placeholder="Введите срок эксплуатации вождения" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Категория авто</Form.Label>
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
