function Point(x, y){
	this.x = x
	this.y = y
}

Point.prototype.equals = function(position){
   return ((this.x == position.x) && (this.y == position.y))
}

Point.prototype.random = function(x_limit, y_limit){
    this.x = Math.random() * x_limit
    this.y = Math.random() * y_limit
}

