RockAnimation.prototype = new Animation
RockAnimation.prototype.constructor = RockAnimation
function RockAnimation(total_size){
    Animation.call(this)
    this.generate(50)
}

RockAnimation.prototype.generate = function(total_size){
    var that = this
    function doBranch(n, pos){
	if(n >= 3)
	    return
	var n_branches = Math.random() * 5

	for(var i = 0; i < n_branches; i++){
	    var angle = (Math.random() * 360)* Math.PI/180
	    var x = pos.x + Math.cos(angle)* 20
	    var y = pos.y + Math.sin(angle)*20
	    var destination = new Point(x, y)

            that.element.push({"origin":pos, "destination":destination})
	    doBranch(n + 1, destination)
	}
    }
    var center = new Point(25,25)
    doBranch(0, center)
}

RockAnimation.prototype.draw = function(ctx, y, x, distance, total_size){
    var pos = new Point(x*total_size, y*total_size)
    ctx.fillStyle = 'grey'
    ctx.fillRect(pos.x, pos.y + distance, total_size, total_size)
    for(var i in this.element){
	ctx.beginPath()
	ctx.moveTo(this.element[i].origin.x + pos.x + distance, this.element[i].origin.y + pos.y + distance)
	ctx.lineTo(this.element[i].destination.x + pos.x + distance, this.element[i].destination.y + pos.y + distance)
	ctx.stroke()
    }
}
