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

Point.prototype.getX() = function(){
	return this.x
}
Point.prototype.getY() = function(){
	return this.y
}
Point.prototype.setPoint(x, y) = function(){
	this.x = x
	this.y = y
}

Point.prototype.distance = function(point){
   return Math.sqrt( Math.pow(this.getX() - point.getX() , 2) +  Math.pow(this.getY() - point.getY() , 2) )
}
