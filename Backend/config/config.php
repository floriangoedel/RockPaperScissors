<?php
    namespace HTL3R\RockPaperScissors\config;
    USE Doctrine\ORM\Tools\Setup;
    USE Doctrine\ORM\EntityManager;

    $connectionParams = array(
        'dbname' => "rockpaperscissors",
        'user' => "root",
        'password' => '',
        'host' => 'localhost',
        'driver' => 'pdo_mysql'
    );

    $config = Setup::createAnnotationMetadataConfiguration(array(__DIR__ . '/../src'), true);

    $entitymanager = EntityManager::create($connectionParams, $config);