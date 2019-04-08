<?php
    namespace HTL3R\RockPaperScissors;
    require 'vendor/autoload.php';

    getWinner();

    function getWinner() {
        $playerChoiceJson = file_get_contents("php://input");
        $playerChoice = json_decode($playerChoiceJson, true)["playerChoice"];

        $computerChoice = rand(0, 2);
        $gameStateForPlayer = analyseChoices($computerChoice, $playerChoice);

        echo json_encode((array(
            'gameStateForPlayer' => $gameStateForPlayer,
            'playerChoice' => $playerChoice,
            'computerChoice' => $computerChoice
        )));
    }

    function analyseChoices($computerChoice, $playerChoice) {
        /*
        * Schere ... 0
        * Stein  ... 1
        * Papier ... 2
        */

        // Spieler gewinnt
        if (($playerChoice == 0 && $computerChoice == 2) || ($playerChoice == 1 && $computerChoice == 0) || ($playerChoice == 2 && $computerChoice == 1)) {
            $gameStateForPlayer = "Gewonnen";
        }
        else if ($playerChoice == $computerChoice) {
            $gameStateForPlayer = "Unentschieden";
        }
        else {
            $gameStateForPlayer = "Verloren";
        }
        return $gameStateForPlayer;
    }