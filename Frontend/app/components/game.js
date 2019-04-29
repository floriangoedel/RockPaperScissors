"use strict";

app.component("game", {
    templateUrl: "components/game.html",
    controller: "GameController",
    bindings: {
        playerChoice: "&"
    }
});

app.config(function($stateProvider) {
    $stateProvider.state({
        name: "game",
        url: "/",
        component: "game"
    });
});

app.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise("not-found");
});

app.controller("GameController", function ($log, $http) {
    $log.debug("GameController erfolgreich erstellt");

    this.$onInit = function () {
        this.inputFieldVariations = [
            {
                imageSource: "../resources/scissor.jpg",
                inputName: "Schere"
            },
            {
                imageSource: "../resources/rock.jpg",
                inputName: "Stein"
            },
            {
                imageSource: "../resources/paper.jpg",
                inputName: "Papier"
            }
        ];
    };

    this.analyseGame = (playerchoice) => {
        let playerChoiceAsInt;
        switch(playerchoice) {
            case "Schere":
                playerChoiceAsInt = 0;
                break;
            case "Stein":
                playerChoiceAsInt = 1;
                break;
            case "Papier":
                playerChoiceAsInt = 2;
                break;
        }

        let parameter = JSON.stringify({
            playerChoice: playerChoiceAsInt
        });

        let url = "../../Backend/getWinner.php";

        $http({
            method: 'POST',
            url: url,
            data: parameter
        }).then(
            (response) => {
                let gameStateForPlayer = response.data.gameStateForPlayer;
                let computerChoice = response.data.computerChoice;
                let playerChoice = response.data.playerChoice;

                this.printGameState(gameStateForPlayer, computerChoice, playerChoice);
                this.writeToDatabase(computerChoice, playerChoice);
            }, function (error) {
                console.log(error);
            });
    };

    this.printGameState = (gameStateForPlayer, computerChoice, playerChoice) => {
        // Convert the game state to a SweetAlert display mode
        let displayMode;
        switch(gameStateForPlayer) {
            case 'Gewonnen':
                displayMode = "success";
                break;
            case 'Verloren':
                displayMode = "error";
                break;
            case 'Unentschieden':
                displayMode = "warning";
                break;
        }

        // Convert Numbers to String (e.g. 0 => "Schere")
        let playerChoiceAsString = this.choiceInttoString(playerChoice);
        let computerChoiceAsString = this.choiceInttoString(computerChoice);

        // Create string, content is the choice from the player and the computer
        let displayChoices = "Du: " + playerChoiceAsString + ", Computer: " + computerChoiceAsString;

        // Output via Sweetalert
        swal(gameStateForPlayer, displayChoices, displayMode);
    };

    /*
     * Schere ... 0
     * Stein  ... 1
     * Papier ... 2
     */
    this.choiceInttoString = (choiceAsInt) => {
        let choiceAsString;
        switch(choiceAsInt) {
            case 0:
                choiceAsString = "Schere";
                break;
            case 1:
                choiceAsString = "Stein";
                break;
            case 2:
                choiceAsString = "Papier";
                break;
        }
        return choiceAsString;
    };

    this.writeToDatabase = (computerChoice, playerChoice) => {
        let url = '../../Backend/writeToDatabase.php';

        let parameter = JSON.stringify({
            computerChoice: computerChoice,
            playerChoice: playerChoice
        });

        $http({
            method: 'POST',
            url: url,
            data: parameter
        }).then(
            (response) => {
                $log.debug("Database Insert worked!");
            }, function (error) {
                console.log(error);
            });
    };



});