import React from 'react';
import './App.css';
import Container from "@material-ui/core/Container";
import Header from "./components/Header";
import SelectCountry from "./components/SelectCountry";
import {Route, Switch} from 'react-router-dom';
import DetailTemp from "./components/DetailTemp";

class App extends React.Component {

    render() {
        const {store} = this.props;
        return (
            <>
                <Header/>
                <Container className="content" maxWidth="md">
                    <Switch>
                        <Route exact path='/' render={() => <SelectCountry store={store}/>}/>
                        <Route path='/details/:id?' render={(props) => <DetailTemp {...props} store={store}/>}/>
                    </Switch>
                </Container>
            </>
        );
    }
}

export default App;
