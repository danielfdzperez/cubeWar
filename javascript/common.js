

function updateMRU(pos, speed, t){
	return ( pos + (speed * t) )
}

function updateMRUV(pos, speed, t){
	var acc = 0.9
	var obj = {}
	obj.speed = speed + acc * t 
	obj.pos = (pos + (speed * t) + ( (1/2) * acc * Math.pow(t, 2)) )
	return obj
}

function MultidimensionalArray(y){
    var array = []
    for (var i = 0; i < y; i++)
       array[i] = []
   return array
}

/**
 * Pasa de tile a point (coordenadas)
 * point -> El punto que se quiere convertir
 * size  -> Tamaño de del tile
 *
 * Return
 * Un tile que representa un punto
 */
function tileToPoint(point, size){
    var point = point
    return new Point( (point.x * size + size/2), (point.y * size + size/2) )
}

/**
 * Pasa de point a tile (coordenadas)
 * point -> El punto que se quiere convertir
 * size  -> Tamaño de del tile
 *
 * Return
 * Un punto que representa un tile
 */
function pointToTile(point, size){
    return new Point( Math.floor(point.x/size), Math.floor(point.y/size))
}

/**
 * Para saber si un objeto esta en un array
 *
 * Parametros
 * array -> El array donde buscar
 * x -> El elemento que se quiere buscar
 *
 * Return
 * Bool
 */
function isInArray(array, x){
    for(var i in array)
        if(array[i] == x)
            return true
    return false
}
