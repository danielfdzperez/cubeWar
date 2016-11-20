

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

/**
 *
 * Construye un array de multiples dimensiones
 *
 * Parametros
 * dim -> dimensiones del array
 * size -> El tamaño de cada dimension
 *
 * Return
 * Un array multidimensional
 *
 * Ej
 * var a = MultidimensionalArray(3,2)
 * a -> [ [ [],[] ] , [ [],[] ] ]
 */
function MultidimensionalArray(dim, size){
    return buildMultidimensionalArray(dim, size, size)
    function buildMultidimensionalArray(dim, n, size){
	//Si la dimension llega al final solo se devuelve un array
	if(dim <= 1){
	    var array = []
	    return array
	}

	//Si se llega al final del tamaño de una dimension
	if(n <= 1){
	    var array = []
	    array[n-1] = rec(dim-1, size, size)
	    return array
	}

	var array = rec(dim, n-1, size)
	array[n-1] = rec(dim-1, size, size)
	return array
    }
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
