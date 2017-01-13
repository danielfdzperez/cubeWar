/* Class Room
 *
 * Clase para crear habitaciones hereda de la clase rectangle
 *
 * center 	 -> calculo del centro del rectangulo en tiempo de ejecucion  
*/


Room.prototype = new Rectangle
Room.prototype.constructor = Room

/* Constructor de la clase
 *
 * posicion -> Pasamos un objeto de la clase Point. 
 * width 	-> ancho de la habitacion
 * heght 	-> alto de la habitacion
*/


function Room(posicion, width, height){
	Rectangle.call(this, posicion, width, height)
	this.center    = new Point((this.x +this.x + this.width) / 2,
							   (this.y +this.y + this.height) / 2) 
}


var a = new Room(new Point(1,2), 200, 200)
a.intersects