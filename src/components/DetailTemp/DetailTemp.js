import React from "react";
import {observer} from "mobx-react";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";


@observer
class DetailTemp extends React.Component {
    state = {

    };

    componentDidMount() {
        const {store} = this.props;
        const cityId = +this.props.match.params.id;
        if (cityId) store.getFullInfo(cityId);
        this.setState({currentCity: store.cities.find(city => city.id === cityId)});
    }

    render() {
        const {store} = this.props;
        const {currentCity} = this.state;
        if (!currentCity) return (
            <Typography variant="h4" align={"center"}>
                First select a city <NavLink exact to="/">Back to select</NavLink>
            </Typography>
        );

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3" align={"center"}>
                        Weather in {currentCity.name}
                    </Typography>
                    <NavLink exact to="/">Back to select</NavLink>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Parameter</TableCell>
                                    <TableCell>Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {store.isFetching ?  <TableRow>< TableCell colSpan="2" align={"center"}><CircularProgress color="secondary"/></TableCell></TableRow> : null}

                                {!store.isFetching ?
                                    <>
                                        <TableRow>
                                            <TableCell>Temperature in celsius</TableCell>
                                            <TableCell>{store.currentCityFullInfo.celcius_avg}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Temperature in fahrenheit</TableCell>
                                            <TableCell>{store.currentCityFullInfo.fahrenheit_avg}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Temperature in kelvin</TableCell>
                                            <TableCell>{store.currentCityFullInfo.kelvin_avg}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Pressure</TableCell>
                                            <TableCell>{store.currentCityFullInfo.pressure_avg}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Humidity</TableCell>
                                            <TableCell>{store.currentCityFullInfo.humidity_avg}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Sea level</TableCell>
                                            <TableCell>{store.currentCityFullInfo.sea_level_avg}</TableCell>
                                        </TableRow>
                                    </>
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

        )
    }
}

export default DetailTemp