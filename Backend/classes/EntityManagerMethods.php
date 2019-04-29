n<?php
    namespace HTL3R\RockPaperScissors\classes;
    USE Doctrine\ORM\Tools\Setup;
    USE Doctrine\ORM\EntityManager;
    USE HTL3R\RockPaperScissors\src\RoundStatistics;

    class EntityManagerMethods
    {
        public $entitymanager;

        public function __construct()
        {
            $connectionParams = array(
                'dbname' => "rockpaperscissors",
                'user' => "root",
                'password' => '',
                'host' => 'localhost',
                'driver' => 'pdo_mysql'
            );
            $config = Setup::createAnnotationMetadataConfiguration(array(__DIR__ . '/../src'), true);
            $this->entityManager = EntityManager::create($connectionParams, $config);
        }

        public function writeToDatabase($computerChoice, $playerChoice) {
            $game = new RoundStatistics();
            $game->computerChoice = $computerChoice;
            $game->playerChoice = $playerChoice;
            $game->date = new \DateTime(); // e.g. 10.10.2019;19:25:21

            $this->entityManager->persist($game);
            $this->entityManager->flush();
        }

    }