import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Layout} from "../Components/HOCS/Layout";
import {Routes} from "../../Constants/Routes";
import {ContextWrapper} from "../../Context/ContextWrapper";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <ContextWrapper>
                    <Layout>
                        {Routes?.map((el, idx) => (
                            <Route key={idx} path={el.path} exact>{<el.page/>}</Route>
                        ))}
                    </Layout>
                </ContextWrapper>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
