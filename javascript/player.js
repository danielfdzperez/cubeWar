Player.prototype = new Character
Player.prototype.constructor = Player
/*
   position - Point : Is the player position
*/
function Player(position, world){
	Character.call(this, position, 5, world)
	this.in_the_air = false

	this.parkour_right = false
	this.parkour_left  = false

	this.move_right   = false
	this.move_left    = false
	this.jump         = false
	this.is_alive     = false
	this.total_deaths   = 0

	this.reverse_map_pressed   = false
	this.reverse_tiles_pressed = false

    var that = this
    this.action = {"up": function(){
                             that.jump = true
		             console.log("jump")
                         },
                   "right": function(){that.move_right = true},
                   "left" : function(){that.move_left = true},
                   "no_right": function(){
                   	           that.move_right = false
                               },
                   "no_left": function(){
                   	           that.move_left = false
                               },
                   "no_up": function(){ that.jump = false },
                   "reverse_map": function(){
                   	                       if(!that.reverse_map_pressed){
                   	                          that.world.map.reverseMap()
                   	                          that.reverse_map_pressed = true
                   	                       }
                                  },
                   "no_reverse_map": function(){that.reverse_map_pressed = false},
                   "reverse_tiles": function(){
                   	                       if(!that.reverse_tiles_pressed){
                   	                          that.world.map.reverseTiles()
                   	                          that.reverse_tiles_pressed = true
                   	                       }
                                  },
                   "no_reverse_tiles": function(){that.reverse_tiles_pressed = false}

		              }
	this.keys = {"up": keys.up, "right": keys.right, "left": keys.left, "reverse_map":keys.reverse_map, "reverse_tiles": keys.reverse_tiles}
}

//var parkour_count = 10
Player.prototype.updatePhysics = function(t){

	if(!this.is_alive)
    	return

    var move_in_x = false
	//if(move_right || this.parkour_left){
	if(this.move_right){
		move_in_x = true
		this.speed.x = 5
	}
	//if(move_left || this.parkour_right){
	if(this.move_left){	
		move_in_x = true
		this.speed.x = -5
	}
	if(!move_in_x)
		this.speed.x = 0

	/*if(this.parkour_left)
		parkour_count --
	if(parkour_count <= 0){
		this.parkour_left = false
		parkour_count = 10
	}*/

	var x_position = updateMRU(this.position.x, this.speed.x, 1)
    
    var can_move = this.world.checkMovement(this.getSquarePoints(x_position, this.position.y, this.world.tile_size))

    if(this.speed.x > 0){
    	if(can_move["up right"] && can_move["down right"])
	       this.position.x = x_position
	    else
	    	this.position.x = (Math.floor(this.position.x+this.dimensions)/this.world.tile_size)*this.world.tile_size-this.dimensions
    }
	else
		if(can_move["up left"] && can_move["down left"])
	       this.position.x = x_position
	   else
	    	this.position.x = Math.floor((this.position.x-this.dimensions+1)/this.world.tile_size)*this.world.tile_size + this.dimensions
   
    if(this.jump && this.canJump()){
        this.speed.y = -10
        this.in_the_air = true
        sound.play('jump')
    }
    /*Comprobar que no esta callendo*/
    can_move = this.world.checkMovement(this.getSquarePoints(this.position.x, this.position.y, this.world.tile_size, 1))
    if(can_move["down right"] && can_move["down left"])
    	   if(!this.in_the_air)
    	   	  this.in_the_air = true
   
    var obj = {'pos':null, 'speed':null}
	if(this.in_the_air){
	   obj = updateMRUV(this.position.y, this.speed.y, 1)
	   this.speed.y = obj.speed
	
    
        can_move = this.world.checkMovement(this.getSquarePoints(this.position.x, obj.pos, this.world.tile_size))
	
        if( !(can_move["down right"] && can_move["down left"]) ){
        	this.position.y = ((Math.floor((this.position.y)/this.world.tile_size))+1) *this.world.tile_size - this.dimensions
	    	this.speed.y = 0
	    	this.in_the_air = false
	        
	    }
	    else
	    	if( !(can_move["up right"] && can_move["up left"]) ){
	    		this.position.y = Math.floor(this.position.y/this.world.tile_size)*this.world.tile_size + this.dimensions
	    	    this.speed.y = 0
	    	}
	    	else
	    	   this.position.y = obj.pos   		
	}
}

Player.prototype.draw = function(ctx, difference){

    if(!this.is_alive)
    	return

	ctx.fillStyle = 'black'
    ctx.fillRect( this.position.x-this.dimensions, 
    	          (this.position.y + difference)-this.dimensions, this.dimensions*2, this.dimensions*2)
    color = 'white'
    ctx.beginPath()
    ctx.fillStyle  = color
    ctx.arc(this.position.x, this.position.y + difference, 2, 0, (Math.PI/180)*360, false)
    ctx.fill()
    ctx.closePath()
}

Player.prototype.stop = function(){
	this.move_right = false
	this.move_left  = false
	this.jump       = false
}

Player.prototype.canJump = function(){
	var can_jump = false
	if(!this.in_the_air)
		can_jump = true
	/*else{
		var parkour_right = this.world.checkMovement(this.getSquarePoints(this.position.x+1, this.position.y, this.world.tile_size))
		var parkour_left = this.world.checkMovement(this.getSquarePoints(this.position.x-1, this.position.y, this.world.tile_size))
		if( !(parkour_right["up right"] && parkour_right["down right"])){
            can_jump = true
            this.parkour_right = true
        }else
			if(!(parkour_left["up left"] && parkour_left["down left"])){
				can_jump = true
                this.parkour_left = true
			}
			
	}*/


	return can_jump
}

Player.prototype.reverseControls = function(){
	
	var aux  = null
	var row_keys = ["up", "right", "left"]
	var keys_number = row_keys.length
	var special_keys = ["reverse_map", "reverse_tiles"]
	var special_keys_number = special_keys.length

	for(var i = 0; i < keys_number; i++){
		var random = Math.floor(Math.random()*keys_number)
		var aux = this.keys[row_keys[random]]
		this.keys[row_keys[random]] = this.keys[row_keys[i]]
		this.keys[row_keys[i]] = aux
	}
	for(var i = 0; i < special_keys_number; i++){
		var random = Math.floor(Math.random()*special_keys_number)
		var aux = this.keys[special_keys[random]]
		this.keys[special_keys[random]] = this.keys[special_keys[i]]
		this.keys[special_keys[i]] = aux
	}
	this.stop()
}

Player.prototype.die = function(){
	this.is_alive = false
	this.total_deaths ++
	sound.play('damage')
}

Player.prototype.restart = function(position){
	this.is_alive = true
	this.position.x = position.x
	this.position.y = position.y
}

Player.prototype.orderControls = function(){
    for(var i in keys)
	this.keys[i] = keys[i]
}

Player.prototype.events = function(event){
    if(this.keys.right in event.keys_up)
    	this.action.no_right()
    if(this.keys.left in event.keys_up)
    	this.action.no_left()
    if(this.keys.up in event.keys_up)
    	this.action.no_up()
    if(this.keys.reverse_map in event.keys_up)
    	this.action.no_reverse_map()
    if(this.keys.reverse_tiles in event.keys_up)
    	this.action.no_reverse_tiles()
    
    if(this.keys.up in event.keys_down)
    	this.action.up()
    if(this.keys.right in event.keys_down)
    	this.action.right()
    if(this.keys.left in event.keys_down)
    	this.action.left()
    if(this.keys.reverse_map in event.keys_down)
    	this.action.reverse_map()
    if(this.keys.reverse_tiles in event.keys_down)
    	this.action.reverse_tiles()
}
