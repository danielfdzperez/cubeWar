function Character(position, dimensions, world){
	this.world      = world
	this.position   = position ||new Point(0,0)
	this.speed      = new Point(0,0)
	this.dimensions = dimensions
}

Character.prototype.getSquarePoints = function(x, y, tile_size, extra){
	var obj = {}
	var extra = extra || 0
	obj["down"]  = Math.floor((y+this.dimensions-1 + extra)/tile_size)
	obj["up"]    = Math.floor((y-this.dimensions - extra)/tile_size)
	obj["left"]  = Math.floor((x-this.dimensions - extra)/tile_size)
	obj["right"] = Math.floor((x+this.dimensions-1 + extra)/tile_size)
	return obj
}

Character.prototype.collision = function(character){
    return !( (this.position.x + this.dimensions < character.position.x - character.dimensions) ||  
             (this.position.y + this.dimensions < character.position.y - character.dimensions) ||
             (this.position.x - this.dimensions > character.position.x + character.dimensions) ||
             (this.position.y - this.dimensions > character.position.y + character.dimensions) 
           )
}
