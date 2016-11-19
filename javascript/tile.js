function Tile(walkable, color, size, lethal, reverse, animation){
    this.walkable = walkable
    this.color       = color
    this.size        = size
    this.is_reversed = false
    this.is_lethal   = lethal
    this.reverse     = reverse || this
    this.animation   = animation
}

Tile.prototype.draw = function(ctx, y, x, distance){
    if(!this.is_reversed)
        this.drawMe(ctx, y, x, distance, this.size)
    else
        this.drawReverse(ctx, y, x, distance)
}

Tile.prototype.drawMe = function(ctx, y, x, distance){
    if(this.animation)
	this.animation.draw(ctx, y, x, distance, this.size) 
    else{
      ctx.fillStyle = this.color
      ctx.fillRect(x*this.size, y*this.size + distance, this.size, this.size)
    }
    ctx.strokeStyle = 'black'
    ctx.lineWidth  = 0.8
    ctx.strokeRect(x*this.size, y*this.size + distance, this.size, this.size)

}

Tile.prototype.drawReverse = function(ctx, y, x, distance){
    this.reverse.drawMe(ctx,y,x, distance, this.size)
}

Tile.prototype.isWalkable = function(){
    if(!this.is_reversed)
        return this.imWalkable()
    else
       return this.isWalkableReverse()
}

Tile.prototype.imWalkable = function(){
    return this.walkable
}

Tile.prototype.isWalkableReverse = function(){
    return this.reverse.imWalkable()
}

Tile.prototype.isLethal = function(){
    if(!this.is_reversed)
        return this.imLethal()
    else
        return this.isLethalReverse()
}

Tile.prototype.imLethal = function(){
    return this.is_lethal
}

Tile.prototype.isLethalReverse = function(){
    return this.reverse.imLethal()
}
