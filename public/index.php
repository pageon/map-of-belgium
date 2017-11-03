<?php
require_once __DIR__ . '/../vendor/autoload.php';

$loader = new \Twig_Loader_Filesystem(__DIR__ . '/../resources/view');
$twig = new Twig_Environment($loader);

$dotenv = new Dotenv\Dotenv(__DIR__ .'/../');
$dotenv->load();

die($twig->render('map.twig', [
    'apiKey' => getenv('GOOGLE_API_KEY'),
]));
