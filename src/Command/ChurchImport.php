<?php

namespace Pageon\Command;

use Pageon\Church;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ChurchImport extends Command
{
    protected $inputPath;
    protected $outputPath;

    public function __construct($name = null)
    {
        parent::__construct('church:import');

        $this->inputPath = __DIR__.'/../../resources/data/churches.csv';
        $this->outputPath = __DIR__.'/../../resources/data/churches.json';
    }

    public function run(InputInterface $input, OutputInterface $output)
    {
        $count = count(explode("\n", file_get_contents($this->inputPath))) - 1;
        $i = 1;

        $read = fopen($this->inputPath, 'r');
        $write = fopen($this->outputPath, 'w');

        if (! $read) {
            throw new \Exception("Could not open file {$this->inputPath}");
        }

        if (! $write) {
            throw new \Exception("Could not open file {$this->outputPath}");
        }

        $result = [];

        $output->writeln('Starting import');

        fwrite($write, "[\n");

        while (($data = fgetcsv($read, 1000, ",")) !== false) {
            $church = new Church($data);
            $result[] = $church->toArray();

            fwrite($write, json_encode($church->toArray(), JSON_PRETTY_PRINT) . ",\n");

            $output->writeln("\t- ({$i}/{$count}) {$church->name}");
            $i++;
        }

        fwrite($write, "{}]\n");
        fclose($read);
        fclose($write);

        $output->writeln("Done. Saved in {$this->outputPath}");

        return $result;
    }
}
