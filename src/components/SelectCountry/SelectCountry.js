import React from "react";
import {observer} from "mobx-react";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CircularProgress from "@material-ui/core/CircularProgress";


@observer
class SelectCountry extends React.Component {

    renderOption() {
        const {store} = this.props;
        return store.cities.map(city => {
            return <option key={city.id} value={city.id}>{city.name}</option>
        })
    }

    renderSelectedCitites() {
        const {store} = this.props;
        return  store.selectedCities.map((cityId, i) => {
            const city =  store.cities.find(city => city.id === cityId);
            return (
                <ListItem className="list_item" key={city.id}>
                    <NavLink onClick={() => {store.currentCity = city.id}} to={`/details/${city.id}`}>
                        <ListItemText primary={city.name}
                                      secondary={'temperature ' + city.temp + ' degrees Celsius'}/>
                    </NavLink>
                    <ListItemSecondaryAction>
                        <IconButton onClick={(e) => store.removeCity(city.id)}
                                    edge="end" aria-label="delete">
                            <DeleteForeverIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        });
    }
    render() {
        const {store} = this.props;
        return (
            <div style={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h5" align={"right"}>
                            Choose city:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Select native
                                defaultValue="default"
                                onChange={(e) => store.chooseCity(+e.target.value)}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-simple',
                                }}>
                            <option disabled value="default">click to select</option>
                            { this.renderOption() }
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {this.renderSelectedCitites()}

                            {store.isFetching ?  <ListItem className="list_item" align={"center"}><CircularProgress color="secondary"/></ListItem> : null}
                        </List>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default SelectCountry;
