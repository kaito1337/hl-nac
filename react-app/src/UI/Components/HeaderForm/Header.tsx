import React, {useContext} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Context} from "../../../Context/ContextWrapper";

export const Header = () => {
    const {user, logout} = useContext(Context)

    return (
        <Navbar style={{backgroundColor: "purple"}} data-bs-theme="dark">
            <Container>
                <Navbar.Brand >Профессионалы 2023</Navbar.Brand>
                <Nav className="me-auto">
                    {user.login !== '' ?
                        (
                            <>
                                <Link to='/home'>Личный кабинет</Link>
                                <Link to='/signIn' onClick={logout}>Выход</Link>
                            </>
                        ):
                            (
                                <>
                                    <Link to='/signUp'>Регистрация</Link>
                                    <Link to='/signIn'>Вход</Link>
                                </>
                            )}

                </Nav>
            </Container>
        </Navbar>
    );
};
