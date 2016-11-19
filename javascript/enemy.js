Enemy.prototype = new Character
Enemy.prototype.constructor = Enemy

function Enemy(position, speed, world){
	var real_position = tileToPoint(position, world.tile_size)
	Character.call(this, real_position, 10, world)
    this.position.y = ((Math.floor((this.position.y)/this.world.tile_size))+1) *this.world.tile_size - this.dimensions
	this.speed.x = speed
}

Enemy.prototype.updatePhysics = function(t){

    var x_position = updateMRU(this.position.x, this.speed.x, 1)
    
    var can_move = this.world.checkMovement(this.getSquarePoints(x_position, this.position.y, this.world.tile_size))

    if(this.speed.x > 0){
    	if(can_move["up right"] && can_move["down right"])
	       this.position.x = x_position
	    else{
	    	this.position.x = Math.floor((this.position.x+this.dimensions)/this.world.tile_size)*this.world.tile_size-this.dimensions
            this.speed.x *= -1
        }
    }
	else
		if(can_move["up left"] && can_move["down left"])
	       this.position.x = x_position
	   else{
	    	this.position.x = Math.floor((this.position.x-this.dimensions+1)/this.world.tile_size)*this.world.tile_size + this.dimensions
            this.speed.x *= -1
       }
   
    var obj = updateMRUV(this.position.y, this.speed.y, 1)
    this.speed.y = obj.speed
    
    
    can_move = this.world.checkMovement(this.getSquarePoints(this.position.x, obj.pos+this.dimensions, this.world.tile_size))
    
        if( can_move["down right"] && this.speed.x > 0){
            this.speed.x *= -1
        }
        if( can_move["down left"] && this.speed.x < 0){
            this.speed.x *= -1
        }
        if( !(can_move["down right"] && can_move["down left"]) ){
            this.position.y = ((Math.floor((this.position.y)/this.world.tile_size))+1) *this.world.tile_size - this.dimensions
            this.speed.y = 0
            this.in_the_air = false 
        }else
            this.position.y = obj.pos  
}

Enemy.prototype.getSquarePoints = function(x, y, tile_size){
    var obj = {}
    obj["down"]  = Math.floor((y+this.dimensions-1)/tile_size)
    obj["up"]    = Math.floor((y-this.dimensions)/tile_size)
    obj["left"]  = Math.floor((x-this.dimensions-1)/tile_size)
    obj["right"] = Math.floor((x+this.dimensions-1)/tile_size)
    return obj
}

Enemy.prototype.draw = function(ctx, difference){
    ctx.beginPath()
    ctx.fillStyle  = 'red'
    ctx.arc(this.position.x, this.position.y  + difference, this.dimensions, 0, (Math.PI/180)*360, false)
    ctx.fill()
    ctx.closePath()
}

