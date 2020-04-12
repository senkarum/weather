import {observable, action, runInAction} from 'mobx';
import apiClient from '../apiClient';

class AppStore {
    @observable selectedCities = [];

    @observable isFetching = false;

    @observable currentCityFullInfo = {};

    @observable currentCity = null;

    @observable cities = [
        {
            id: 1,
            code: 'nsk',
            name: 'Novosibirsk',
            countryCode: 'RU',
            temp: null,
        },
        {
            id: 2,
            code: 'msk',
            name: 'Moscow',
            countryCode: 'RU',
            temp: null,
        },
        {
            id: 3,
            code: 'irk',
            name: 'Irkutsk',
            countryCode: 'RU',
            temp: null,
        },

        {
            id: 4,
            code: 'soc',
            name: 'Sochi',
            countryCode: 'RU',
            temp: null,
        }
    ];

    @action chooseCity(cityId) {
        if (this.selectedCities.includes(cityId)) return;

        const selectedCity = this.cities.find(city => city.id === +cityId);
        this.isFetching = true;
        apiClient.fetchCityMin(selectedCity.name, selectedCity.countryCode)
            .then(answer => {
                runInAction(() => {
                    selectedCity.temp = answer.data.getWeather.celcius_avg;
                    this.selectedCities.push(cityId);
                    this.isFetching = false;
                });
            }, error => {
                runInAction(() => {
                    alert(error);
                    this.isFetching = false;
                })
            });
    }

    @action removeCity(cityId) {
        this.selectedCities = this.selectedCities.filter(item => item !== +cityId);
    }

    @action getFullInfo(cityId) {
        const cityData = this.cities.find(city => city.id === cityId);
        if (!cityData) return
        this.isFetching = true;
        return apiClient.fetchCityFull(cityData.name, cityData.countryCode).then(answer => {
            runInAction(() => {
                this.currentCityFullInfo = {...answer.data.getWeather};
                this.isFetching = false;
            });
        }, error => {
            runInAction(() => {
                alert(error);
                this.isFetching = false;
            })
        })
    }
}

export default AppStore;