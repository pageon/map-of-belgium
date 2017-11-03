<?php

namespace Pageon;

class Church
{
    public $name;
    public $street;
    public $city;
    public $postalCode;
    public $lat;
    public $lng;

    public function __construct(array $attributes)
    {
        $this->name = $attributes[0] ?? null;
        $this->street = $attributes[1] ?? null;
        $this->city = ucfirst(strtolower($attributes[3] ?? ''));
        $this->postalCode = $attributes[4] ?? null;

        $address = str_replace(' ', '+', $this->getAddress());
        $geocode = file_get_contents('https://maps.google.com/maps/api/geocode/json?address='.$address.'&sensor=false');
        $output = json_decode($geocode);

        if (isset($output->results[0])) {
            $this->lat = $output->results[0]->geometry->location->lat;
            $this->lng = $output->results[0]->geometry->location->lng;
        }
    }

    public function getAddress(): string
    {
        return $this->street.' '.$this->postalCode.' '.$this->city;
    }

    public function toArray()
    {
        return [
            'name' => $this->name,
            'street' => $this->street,
            'city' => $this->city,
            'postalCode' => $this->postalCode,
            'lat' => $this->lat,
            'lng' => $this->lng,
        ];
    }
}
