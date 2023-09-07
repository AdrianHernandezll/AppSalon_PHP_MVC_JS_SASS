<?php


namespace Model;

class Cita extends ActiveRecord
{

     //Base de Datos

     protected static $tabla = 'cita';
     protected static $columnasDB = ['id', 'fecha', 'hora', 'usuarioId'];

     //Atributos


}
