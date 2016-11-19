IceAnimation.prototype = new Animation
IceAnimation.prototype.constructor = IceAnimation

function IceAnimation(){
    Animation.call(this)
    this.max_effect_size = 10
    this.max_elemtns     = 10
    this.generate(50)
}

IceAnimation.prototype.generate = function(total_size){
    this.element = []
    for(var i = 0; i < this.max_elemtns; i++){
          var random_x = Math.random()*total_size
          var random_y = Math.random()*total_size
	  this.element.push({"pos": new Point(random_x, random_y), "size": 3})
    }
}

IceAnimation.prototype.changeAnimation = function(total_size){
    if(++this.timer % this.nex_step == 0){
	this.timer = 1
        for(var i = 0; i < this.max_elemtns; i++)
            this.generate(total_size)
    }
}

IceAnimation.prototype.draw = function(ctx, y, x, distance, total_size){
      this.changeAnimation(total_size)
      ctx.fillStyle = "#A5F2F3"
      ctx.fillRect(x*total_size, y*total_size + distance, total_size, total_size)

      ctx.fillStyle = "white"
      for(var i = 0; i < this.max_elemtns; i++){
	 var size = this.element[i].size
         ctx.fillRect((x*total_size)+this.element[i].pos.x, (y*total_size + distance)+ this.element[i].pos.y, size, size)
      }
}


