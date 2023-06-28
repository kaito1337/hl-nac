import React, {FC} from 'react';
import {IContextProps} from "../../../Context/Context.interfaces";
import {Header} from "../HeaderForm/Header";

export const Layout:FC<IContextProps> = ({children}) => {
    return (
        <div>
            <Header/>
            <div style={{display: "flex", justifyContent: "center", marginTop: "1.5rem", textAlign: "center", fontSize: "1.5rem"}}>{children}</div>
        </div>
    );
};
