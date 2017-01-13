/* 	Class Rectangle
 *	
 *	Esta clase es generar habitaciones y control de colisiones
 *
 *
*/

/* Rectangle
 *
 * Constructor de la clase
 * 
 * position -> es un objeto de la class point
 * width 	-> anchura del rectangulo
 * height 	-> altura del rectangulo 
*/

function Rectangle(position, width, height){
	this.position 	= position
	this.width 		= width
	this.height 	= height
}

/* Intersects
 *
 * Comprueba si dos rectangulos estan violandose como los delfines
 *  
 * rectangle -> es un objeto de tipo rectangle
*/

Rectangle.prototype.intersects = function(rectangle){
	return (this.position.x < rectangle.position.x + rectangle.width &&
			this.position.x + this.width > rectangle.position.x &&
			this.position.y < rectangle.position.y + rectangle.height &&
			this.position.y + this.height > rectangle.position.y)
}