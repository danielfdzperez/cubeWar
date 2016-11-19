function Button(name, width, height, action){
    this.name      = name
    this.width     = width
    this.height    = height
    this.action    = action
    this.activated = false
}

Button.prototype.draw = function(ctx, pos){
    ctx.strokeStyle = 'black'
    ctx.lineWidth  = 3
    ctx.strokeRect(pos.x, pos.y, this.width, this.height)

    if(this.activated)
       ctx.fillStyle = "white"
    else
       ctx.fillStyle = "DeepSkyBlue"
    ctx.fillRect(pos.x, pos.y, this.width, this.height)
    var center_x = pos.x + ( (this.width/2) - ((this.name.length*standard_size)/2)*standard_size )
    var center_y = pos.y + ( (this.height/2) - (5/2)*5)
    drawWord(ctx, this.name, standard_size, new Point(center_x ,center_y))
}
