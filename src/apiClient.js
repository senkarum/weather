import ApolloClient, {gql} from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://127.0.0.1:4000/graphql',
});

export default {
    fetchCityMin(city, countryCode) {
        return client
            .query({
                query: gql`{getWeather(city: "${city}", countryCode: "${countryCode}") {celcius_avg}}`
            })
    },

    fetchCityFull(city, countryCode) {
        return client
            .query({
                query: gql`{getWeather(city: "${city}", countryCode: "${countryCode}")
                 {fahrenheit_avg celcius_avg kelvin_avg pressure_avg humidity_avg sea_level_avg}}`
            })
    }
}


