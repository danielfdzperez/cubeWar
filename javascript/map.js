function Map(map, conf, tile, tile_dimensions, enemy, world){
	if(!conf)
		throw "Error map conf"
	this.tiles_type           = tile /*Type of tyles*/
	this.map                  = map /*Array of maps*/
	this.current_map          = this.map[0]
	this.n_current_map        = 0
	this.is_reversed_tiles    = false
	this.is_reversed          = false
	this.reverse_map          = null
	this.conf                 = conf
	this.tile_dimensions      = tile_dimensions
	this.enemy                = enemy
	this.current_enemy        = []
	this.world                = world
	this.createReverseMap()
}

/*Visible tiles for scroll in y*/
Map.prototype.visibleTiles = function(){
	var map_dimensions = this.current_map.length
	var canvas_dimensions = Math.floor(this.world.canvas.height/this.tile_dimensions)
	return  map_dimensions <= canvas_dimensions ? map_dimensions : canvas_dimensions
}

Map.prototype.halfVisibility = function(){
	return Math.floor(this.visibleTiles()/2)
}

/*Return length of the current map in y*/
Map.prototype.length = function(){
	return this.current_map.length
}

Map.prototype.width = function(){
	return this.current_map[0].length
}

Map.prototype.changeCurrentMap = function(n){
	if((n < this.map.length) || ((this.n_current_map + 1) < this.map.length)){
	   this.restart()
	   this.current_map = this.map[n >= 0 ? this.n_current_map = n : ++this.n_current_map]
	   this.createReverseMap()
	   this.spawnEnemy()
	   sound.play('lvl')
	   return true
	}
	else
	    return false
    
}

Map.prototype.spawnEnemy = function(){
	this.current_enemy.splice(0, this.current_enemy.length)
	var enemy = this.enemy[this.n_current_map]
	for(var i in enemy)
	   this.current_enemy.push(new Enemy(enemy[i].pos, enemy[i].speed, this.world))
}

Map.prototype.drawScroll = function(ctx, player_position, distance_to_player, fix_y){
	var tile_player_position = pointToTile(player_position, this.tile_dimensions)

    var first_y_tile = Math.max(0,tile_player_position.y - this.halfVisibility() - fix_y)
    var last_y_tile = Math.min(this.length(),tile_player_position.y + this.halfVisibility() + 1 - fix_y)
    
    for(var i = first_y_tile; i < last_y_tile; i++){
       if(i < 0 || i > this.current_map.length-1)
       	 alert(i)	
       for(var j = 0; j < this.current_map[i].length; j++){
       	  if(this.current_map[i][j] == 'f')
       	  	var a = 5
          this.tiles_type[this.current_map[i][j]].draw(ctx, i, j, distance_to_player)
       }
    }

    
	
    var position = this.getEndPoint()
    endLevelPointAnimation(ctx, position, distance_to_player)
    // color = 'purple' 
    // ctx.beginPath()
    // ctx.fillStyle  = color
    // ctx.arc( position.x, position.y + distance_to_player, 10, 0, Math.PI*180, false)
    // ctx.fill()
    // ctx.closePath()
}

Map.prototype.isWalkable = function(y, x){
	return  this.tiles_type[this.current_map[y][x]].isWalkable()
}

Map.prototype.isLethal = function(y, x){
	return  this.tiles_type[this.current_map[y][x]].isLethal()
}

Map.prototype.reverseTiles = function(){
	if(!this.conf[this.n_current_map].reverse_tiles)
		return
	for(var i in this.tiles_type)
        this.tiles_type[i].is_reversed = !this.tiles_type[i].is_reversed
    this.is_reversed_tiles = !this.is_reversed_tiles
}

Map.prototype.createReverseMap = function(){
	this.reverse_map = MultidimensionalArray(this.current_map.length)
	for(var i = 0; i < this.current_map.length; i++)
    	for(var j = this.current_map[i].length-1; j >= 0; j--)
    		if(this.conf[this.n_current_map].non_reverse_tiles.length > 0){
    		   	var special_tiles = this.conf[this.n_current_map].non_reverse_tiles
    		   	var future_position = this.current_map[i].length - 1 - j
    		    if(!isInArray(special_tiles,this.current_map[i][j]) && !isInArray(special_tiles,this.reverse_map[i][future_position]) && 
    		       !isInArray(special_tiles,this.current_map[i][future_position]) )
    		         this.reverse_map[i][future_position] = this.current_map[i][j]
    		    else{
    		   	     this.reverse_map[i][j] = this.current_map[i][j]
    		    }
    		}
    		else
    			this.reverse_map[i][this.current_map[i].length - 1 - j] = this.current_map[i][j]
}

Map.prototype.reverseMap = function(){
	if(!this.conf[this.n_current_map].reverse_map)
		return
	var aux = this.current_map
	this.current_map = this.reverse_map
	this.reverse_map = aux
	this.is_reversed = !this.is_reversed
	this.reverseEnemy()
}

Map.prototype.reverseEnemy = function(){
	for(var i in this.current_enemy){
		var enemy = this.current_enemy[i]
		var reverse_position = this.current_map[0].length * this.tile_dimensions -  enemy.position.x
		var reverse_point_position = pointToTile(new Point(reverse_position, enemy.position.y), this.tile_dimensions)
		if(!isInArray(this.conf[this.n_current_map].non_reverse_tiles, 
			this.current_map[reverse_point_position.y][reverse_point_position.x])){
		    enemy.position.x = reverse_position 
		    enemy.speed.x *= -1
	    }
	}
}

Map.prototype.restart = function(){
	if(this.is_reversed)
		this.reverseMap()
	if(this.is_reversed_tiles)
		this.reverseTiles()
}

Map.prototype.getStartPoint = function(){
	return tileToPoint(this.conf[this.n_current_map].start_tile, this.tile_dimensions)
}
Map.prototype.getStartTile = function(){
	return this.conf[this.n_current_map].start_tile
}

Map.prototype.getEndPoint = function(){
	return tileToPoint(this.conf[this.n_current_map].end_tile, this.tile_dimensions)
}

Map.prototype.getEndTile = function(){
	return this.conf[this.n_current_map].end_tile
}

Map.prototype.endLevel = function(){
    return this.n_current_map >= this.map.length-1 
}
