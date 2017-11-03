<?php

require_once __DIR__ .'/vendor/autoload.php';

use Pageon\Command\ChurchImport;
use Symfony\Component\Console\Application;

class Console extends Application
{
    public function __construct()
    {
        parent::__construct('Pageon Console');

        $this->add(new ChurchImport());
    }
}

$console = new Console();
$console->run();
