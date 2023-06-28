import React, {FC, useContext} from 'react';
import {IProps} from "../../../Interfaces/IProps";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../../Context/ContextWrapper";
import Service from "../../../Services/Service";

export const AddCategory:FC<IProps> = ({login}) => {
    const {getLicense} = useContext(Context)

    const addHandler = async (e:any) => {
        e.preventDefault();
        const { target } = e;
        const tx = await Service.post({func: "addCategory", type: "POST" , args: [login, target[0].value]})
        await getLicense()
    }

    return (
        <div>
            <Form onSubmit={addHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Категория авто</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </Form.Select>
                </Form.Group>
                <Button type={'submit'} variant={"success"}>Подтвердить</Button>
            </Form>
        </div>
    );
};
