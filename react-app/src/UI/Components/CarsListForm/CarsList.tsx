import React, {FC, useContext} from 'react';
import {useAsyncEffect} from "../../../Hooks/useAsyncEffect";
import {Context} from "../../../Context/ContextWrapper";
import {ListGroup} from "react-bootstrap";

export const CarsList = () => {
    const {getCars, cars} = useContext(Context)
    useAsyncEffect(async () => {
        await getCars();
    }, [])

    return (
        <div>
            {cars.length > 0 && (
                <>
                    <h2>Ваши машины:</h2>
                    <ListGroup>
                        {cars?.map((el, idx) => (
                            <ListGroup.Item key={idx}>Название авто: {el.title} | Категория авто: {el.category} | Рыночная цена авто: {el.price} PROFI | Срок эксплуатации: {el.lifetime} лет</ListGroup.Item>
                        ))}
                    </ListGroup>
                </>
            )
            }
        </div>
    );
};
