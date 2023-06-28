import React from 'react';
import {Button, Form} from "react-bootstrap";
import Service from "../../Services/Service";
import {useHistory} from "react-router-dom";

const SignUp = () => {
    const navigation = useHistory()
    const signUpHandler = async(e:any) => {
        e.preventDefault();
        const { target } = e;
        const tx = await Service.post({func: "signUp", args: [target[0].value,target[1].value,target[2].value,target[3].value], type: "POST"})
        alert(tx);
        navigation.push('/signIn');
    }

    return (
        <div>
            <h2>Регистрация</h2>
            <Form onSubmit={signUpHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" placeholder="Введите логин" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Введите пароль" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control type="text" placeholder="Введите ФИО" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Стаж вождения(в годах)</Form.Label>
                    <Form.Control type="number" min={0} placeholder="Введите стаж вождения" required/>
                </Form.Group>

                <Button variant="success" type="submit">
                    Подтвердить
                </Button>
            </Form>
        </div>
    );
};

export default SignUp;
