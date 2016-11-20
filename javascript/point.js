/**
 * Clase Point
 *
 * Guarda las coordenas de una ubicacion
 */
function Point(x, y){
	this.x = x
	this.y = y
}

/**
 * Compara dos puntos
 *
 * position -> Es el punto con el que se quiere comparar
 *
 * Return
 * Bool
 */
Point.prototype.equals = function(position){
   return ((this.x == position.x) && (this.y == position.y))
}

/**
 * Genera un punto con posiciones aleatorias en un rango
 *
 * x_limit -> Limite del numero aleatorio en la posicion x
 * y_limit -> Limite del numero aleatorio en la posicion y
 *
 * Return
 * void
 */
Point.prototype.random = function(x_limit, y_limit){
    this.x = Math.random() * x_limit
    this.y = Math.random() * y_limit
}

