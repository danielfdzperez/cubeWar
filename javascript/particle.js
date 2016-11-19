function Particle(position, radius, life, speed, angle, color){
        this.position = position
        this.radius   = radius
        this.life     = life
        this.speed    = speed
        this.angle    = angle
        this.color    = color
}

var N = 200
ParticleSystem.prototype = []
function ParticleSystem(position, color, size){
	this.end = true
	if(position){
	   this.fill(position, color, size)
       this.end = false
    }
}

ParticleSystem.prototype.fill = function(position, color, size){
	color = color || 'black'
	size  = size  || 2
	this.end = false
	for(var i=0; i<N; i++)
       this.push(new Particle(new Point(position.x, position.y), size, Math.floor(Math.random()*100), 
       	         Math.random()*5, Math.floor(Math.random()*360),color))
}

ParticleSystem.prototype.empty = function(){
    this.splice(0,this.length)
}

ParticleSystem.prototype.draw=function(ctx, difference){
	for(var i=0; i<this.length; i++){
	    ctx.fillStyle=this[i].color
	    ctx.beginPath()
	    ctx.arc(this[i].position.x,this[i].position.y + difference, this[i].radius,0,Math.PI*2,true)
	    ctx.fill()
	}
}

ParticleSystem.prototype.updatePhysics=function(delta_time){
    for(var i=0; i<this.length; i++){
        this[i].life -= delta_time
        if(this[i].life < 0)
            this.splice(i--,1)
        else{
            this[i].position.x += Math.cos(this[i].angle) * this[i].speed * delta_time
            this[i].position.y += Math.sin(this[i].angle) * this[i].speed * delta_time
        }
    }
    if(this.length <= 0)
    	this.end = true
}
