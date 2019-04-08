<?php
    namespace HTL3R\RockPaperScissors;
    require 'vendor/autoload.php';
    use HTL3R\RockPaperScissors\classes\EntityManagerMethods;

    writeToDatabase();

    function writeToDatabase() {
        $choicesAsJson = file_get_contents("php://input");
        $choices = json_decode($choicesAsJson, true);
        $playerChoice = $choices["playerChoice"];
        $computerChoice = $choices["computerChoice"];
        $entityManager = new EntityManagerMethods();
        $entityManager->writeToDatabase($computerChoice, $playerChoice);
    }