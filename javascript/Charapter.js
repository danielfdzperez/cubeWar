/**
 * Class Character
 * Clase base de todos los personajes del juego
 *
 * Parametros
 * damage -> daño que inflige 
 * level -> nivel actual
 * max_life -> vida maxima 
 * current_life -> vida actual
 * current_experience -> experiencia actual
 * experience_to_next_level -> experiencia para subir al siguiente nivel
 **/
 function Character(damage, level, max_life, current_life, current_experience, experience_to_next_level){
 	this.damage 						= damage
 	this.level 							= level
 	this.max_life 						= max_life
 	this.current_life 					= current_life
 	this.current_experience 			= current_experience
 	this.experience_to_next_level 		= experience_to_next_level
 }

/**
 * Funcion para el movimiento de los personajes/enemigos
 * 
 * Parametros
 * point -> un objeto que indica donde nos vamos a mover
 **/
 Character.prototype.move = function(point){

 }

 Character.prototype.attack = function(){

 }