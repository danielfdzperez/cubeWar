/**
 * Class Tile
 * 
 * walkable -> bool que indica si se puede caminar por el tile
 * size -> el tamaño del tile
 */
function Tile(walkable, size, color/*, size, image, damage, animation*/){
    this.walkable    = walkable
    this.size        = size
    //this.color       = color
    //this.image       = image
    //this.animation   = animation
    //this.damage      = damage
}

/*
 * Dibuja tile
 * Params:
 * ctx => Contexto del canvas
 * y,x => Cordenadas
 * distance => Distancia del jugador para hacer el scroll
 */
Tile.prototype.draw = function(ctx, y, x, distance){
    ctx.fillStyle = this.color
    ctx.fillRect(x*this.size + distance.x, y*this.size + distance.y, this.size, this.size)
    ctx.strokeStyle = 'black'
    ctx.lineWidth  = 0.8
    ctx.strokeRect(x*this.size + distance.x, y*this.size + distance.y, this.size, this.size)
}

/*
 * Devuelve el atributo walkable
 */
Tile.prototype.isWalkable = function(){
    return this.walkable
}

/*
 * Devuelve el daño que causa el tile
 */
Tile.prototype.getDamage = function(){
    return this.damage
}

/*
 * Devuelve true si quita daño
 */
Tile.prototype.haveDamage = function(){
    return this.damage != 0;
}
