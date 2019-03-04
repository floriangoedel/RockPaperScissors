"use strict";

app.component("main", {
    templateUrl: "components/main.html",
    controller: "MainController",
    bindings: {}
});


app.controller("MainController", function ($log, $http) {
    $log.debug("MainController()");

    this.$onInit = function () {
        this.status = 'Nothing recieved yet'; // Status der API Requests
        this.ip = '--';
        this.location = '--';
        this.latitude = '--';
        this.longitude = '--';
        this.sunset = '--';
        this.sunrise = '--';
        this.weather = '--';
    };

    this.absenden = () => {
        // Status setzen
        this.status = 'Requesting';

        // API Requests
        $http
            .get(`http://ip-api.com/json/${this.host}`)
            .then(response => {
                let data = response.data;
                this.ip = data.query;
                this.city = data.city;
                this.country = data.country;
                this.location = this.country + ', ' + this.city + ', ' + data.as;
                this.latitude = data.lat;
                this.longitude = data.lon;

                return Promise.all([
                        $http
                            .get(`https://api.sunrise-sunset.org/json`, {
                                params: {
                                    lat: this.latitude,
                                    lng: this.longitude,
                                    formatted: 1
                                }
                            }),
                        $http
                            .get(`http://api.openweathermap.org/data/2.5/weather`, {
                                params: {
                                    q: this.city,
                                    APPID: 'c56c07387befaa8667aaeb750c5f280b'
                                }
                            }),
                        $http
                            .get(`http://api.timezonedb.com/v2.1/get-time-zone`, {
                                params: {
                                    key: '3SFER4S4OGAT',
                                    by: 'position',
                                    lat: this.latitude,
                                    lng: this.longitude,
                                    format: 'json'
                                }
                            })
                    ])
                    .then (responses => {
                        $log.debug(responses[0].data);
                        this.sunset = responses[0].data.results.sunset;
                        this.sunrise = responses[0].data.results.sunrise + '  - Date Filter nicht richtig verwendet, da aufgrund der Ausgabe der API nicht in ein Date Objekt umgewandelt werden kann';
                        this.weather = responses[1].data.weather[0].description;
                        this.timezone = responses[2].data.abbreviation;

                        // Status setzen
                        this.status = 'Successful';
                    })
                    .catch(response => {
                        // Status setzen
                        this.status = 'Error';

                        // Fehler Informationen ausgeben
                        $log.debug('An error occurred: While requesting sunrise/sunset- / weather- & timezone-information!');
                        let errorInformation;
                        if ((errorInformation = response.data.message) !== undefined) {
                            $log.debug('Error information: ' + response.data.message);
                        }
                    });

            })
            .catch(response => {
                // Status setzen
                this.status = 'Error';

                // Fehler Informationen ausgeben
                $log.debug('An error occurred: While requesting basic IP-information!');
                let errorInformation;
                if ((errorInformation = response.data.message) !== undefined) {
                    $log.debug('Error information: ' + response.data.message);
                }
            });
    };

});