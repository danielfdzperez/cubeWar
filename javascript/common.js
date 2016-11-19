var keys_a = {"up": 38, "right": 39, "left": 37, "reverse_map":82, "reverse_tiles":69}
var keys_b = {"up": 87, "right": 68, "left": 65, "reverse_map":80, "reverse_tiles":79}
var keys = keys_a
function changeKeys(key_type){
    keys = eval("keys_" + key_type)
}

function keyToString(key){
    var non_string_key = {38:"row up", 37:"row left", 39:"row right", 27:"scape"}
    if(key in non_string_key)
	return non_string_key[key]
    else
	return String.fromCharCode(key)
}

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

function MapConf(start_tile, end_tile, reverse_tiles, reverse_map, reverse_gravity, non_reverse_tiles){
    conf = {"start_tile": start_tile,
            "end_tile": end_tile,
            "reverse_tiles": reverse_tiles,
            "reverse_map":reverse_map,
            "reverse_gravity": reverse_gravity,
            "non_reverse_tiles": non_reverse_tiles || []}
    return conf
}

function tileToPoint(point, size){
    var point = point
    return new Point( (point.x * size + size/2), (point.y * size + size/2) )
}

function pointToTile(point, size){
    return new Point( Math.floor(point.x/size), Math.floor(point.y/size))
}

function isInArray(array, x){
    for(var i in array)
        if(array[i] == x)
            return true
    return false
}

function enemyConf(pos, speed_x){
    var obj = {"pos":new Point(pos.x, pos.y), "speed": speed_x}
    return obj
}

/*Save and load the max level archieved*/
var max_level = null
function loadMaxLevel(){
    if( localStorage["Reverse World Max Level"]!= undefined)
	max_level = localStorage["Reverse World Max Level"]
    else
	localStorage["Reverse World Max Level"] = 0
}
function setMaxLevel(lvl){
    if(lvl > max_level) 
	localStorage["Reverse World Max Level"] = lvl
}
