function Animation(color, animation_color){
    this.element         = []
    this.nex_step        = 10
    this.timer           = 4
}

AnimationManager.prototype = []
function AnimationManager(animation_type){
    this.current_animation  = 0
    this.max_animations     = 5
    this.animation_type      = animation_type
    this.fill()
}

AnimationManager.prototype.fill = function(){
    this.splice(0,this.length)
    for(var i = 0; i < this.max_animations; i++)
	this.push(eval("new " + this.animation_type + "()"))
}

AnimationManager.prototype.draw = function(ctx, y, x, distance, total_size){
    this[this.current_animation].draw(ctx, y, x, distance, total_size)
    this.nextAnimation()
}

AnimationManager.prototype.nextAnimation = function(){
    this.current_animation = ++this.current_animation % this.max_animations
}
