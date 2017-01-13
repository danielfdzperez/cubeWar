/* Class Map
 * 
 * Clase para generar los mapas
 * 
 * 
*/

function Map(width, height, tile_size){
	this.width 		= width
	this.height		= height
	this.tile_size 	= tile_size
	this.max_rooms  = 20
	
}

Map.prototype.draw = function(){

}

Map.prototype.generateMap = function(){
	var other_rooms = []
	for (var i = 0; i < 20; i++){
		var width = Math.floor(Math.random() * this.width)
		var height = Math.floor(Math.random() * this.height)

		var position = new Point(Math.floor(Math.random() * this.width),
				 				 Math.floor(Math.random() * this.height))

		var room = new Room(position, width, height)

		var collision = false

		for (let j = 0; j < other_rooms.length && !collision; j++){
			if (other_rooms[j].intersects(room))
				collision = true
		}

		if (!collision)
			other_rooms.push(room)
	}
}




