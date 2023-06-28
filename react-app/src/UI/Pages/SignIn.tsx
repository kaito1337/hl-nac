import React, {useContext} from 'react';
import Service from "../../Services/Service";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../Context/ContextWrapper";
import {useHistory} from "react-router-dom";

const SignIn = () => {
    const {getUser} = useContext(Context)
    const navigation = useHistory()
    const signInHandler = async(e:any) => {
        e.preventDefault();
        const { target } = e;
        const tx = await Service.post({func: "signIn", args: [target[0].value,target[1].value], type: "GET"})
        if(typeof tx === "object"){
            getUser(tx)
            navigation.push('/home')
        }else{
            alert(tx)
        }
    }

    return (
        <div>
            <h2>Вход</h2>
            <Form onSubmit={signInHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" placeholder="Введите логин" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Введите пароль" required/>
                </Form.Group>

                <Button variant="success" type="submit">
                    Подтвердить
                </Button>
            </Form>
        </div>
    );
};

export default SignIn;
