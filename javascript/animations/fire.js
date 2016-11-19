FireAnimation.prototype = new Animation
FireAnimation.prototype.constructor = FireAnimation

function FireAnimation(){
    Animation.call(this)
    this.size = 10
    
}

FireAnimation.prototype.generate = function(total_size){
    var length_x = Math.floor(total_size/this.size)-1
    var length_y = Math.floor(total_size/this.size)-1
    this.element = MultidimensionalArray(length_y+1)
    for(var i = length_y; i > -1; i--)
    	for(var j = length_x; j > -1; j--){
	    var color = 'orange'
            var x_posibility = Math.abs(j - length_x/2)*(length_x/2)
            var y_posibility = length_y - i
            var total_posibility = y_posibility + x_posibility
            if(Math.floor(Math.random()*total_posibility) == 0)
               color = 'red'
	    this.element[i][j] = color
        }

}

FireAnimation.prototype.changeAnimation = function(total_size){
    if(++this.timer % this.nex_step == 0){
	this.timer = 1
	this.generate(total_size)
    }
}

FireAnimation.prototype.draw = function(ctx, y, x, distance, total_size){
    this.changeAnimation(total_size)

    for(var i = 0; i < this.element.length; i++)
    	for(var j = 0; j < this.element[i].length; j++){
            ctx.fillStyle = this.element[i][j]
            ctx.fillRect(x*total_size + j*this.size, (y*total_size + i*this.size) + distance, this.size, this.size)
	}
}
