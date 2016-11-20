/**
 * Class GameObject
 * Clase base de todos los objetos del juego
 *
 * Parametros
 * world -> el mundo al que pertenece el objeto
 * position -> posicion del objeto (tipo point)
 * dimensions -> dimension del objeto, al ser un cuadrado todos los lados son iguales
 */
function GameObject(world, position, dimensions/*, sprite, speed*/){
    this.world              = world
    this.position           = position
    this.id                 = GameObject.id++
    this.dimensions         = dimensions 
    //this.speed              = speed
    //this.collision_detector = collision_detector || []
    //this.sprite             = sprite || new Map()
    //this.state              = new State(this)
    
}

GameObject.id = 0

/**
 * Dibuja el objeto
 *
 * ctx -> contexto donde debe dibujarse
 */
GameObject.prototype.draw = function(ctx){
    ctx.fillStyle = "red";
    ctx.fillRect(this.coord.get('x'),this.coord.get('y'), 20,20);
}

/**
 * Reproduce sonido que tiene asociado el objeto
 * name -> nombre de la pista que hay que reproducir
 */
GameObject.prototype.playSound = function(name){
    this.world.playSound(this.sound.get(name))
}

/**
 * Actualiza las fisicas
 * delta : tiempo delta para actualizar las fisicas
*/
GameObject.prototype.updatePhysics = function(delta){
}

/*
 * Comprueba que tiles en el mapa está ocupando.
 *
 * x e y     : Son las posiciones futuras del personaje.
 * tile_size : Tamaño de los tiles del mundo.
 * extra     : Para modificar los valores de entrada (Tipo Coord).
 *
 * return obj : Objeto con los elementos {down, up, left, right} con numeros enteros.
 */
GameObject.prototype.getSquarePoints = function(x, y, tile_size, extra){
	var obj = {}
	var extra = extra || 0
	obj["down"]  = Math.floor((y+this.dimensions-1 + extra)/tile_size)
	obj["up"]    = Math.floor((y-this.dimensions - extra)/tile_size)
	obj["left"]  = Math.floor((x-this.dimensions - extra)/tile_size)
	obj["right"] = Math.floor((x+this.dimensions-1 + extra)/tile_size)
	return obj
}

/**
 * Actualiza los detectores de colisiones
 *
 */
GameObject.prototype.updateCollisionDetectorPosition = function(){
    for(var i=0; i<this.collision_detector.length; i++)
	this.collision_detector[i].update_position(this.position.x, this.position.y)
}

/**
 * Comprueba si dos GameObject son iguales
 *
 * Return
 * Bool
 */
GameObject.prototype.equals = function(obj){
    return this.id == obj.id
}
