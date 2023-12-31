<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;

class APIController
{
     public static function index()
     {
          $servicios = Servicio::all();

          echo json_encode($servicios);
     }

     public static function guardar()
     {
          //Almacena la cita y devuelve el ID

          $cita = new Cita($_POST);
          $resultado = $cita->guardar();

          $id = $resultado['id'];

          //Almacena la cita y el servicio
          $idServicio = explode(",", $_POST['servicios']);

          foreach ($idServicio as $idServicios) {
               $args = [
                    'citaId' => $id,
                    'servicioId' => $idServicios
               ];
               $citaServicio = new CitaServicio($args);
               $citaServicio->guardar();
          }

          echo json_encode(['resultado' => $resultado]);
     }
}
