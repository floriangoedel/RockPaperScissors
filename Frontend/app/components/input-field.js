"use strict";

app.component("inputField", {
    templateUrl: "components/input-field.html",
    controller: "InputFieldController",
    bindings: {
        inputName: "<",
        imageSource: "<",
        playerchoice: "&"
    }
});


app.controller("InputFieldController", function ($log) {

    this.setPlayerChoice = () => {
        this.playerchoice({choice: this.inputName});
    };

});