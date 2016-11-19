function Events(){
    this.keys_down = {}
    this.keys_up = {}
    this.last_key = null
    this.key_down_listener = null
    this.key_up_listener   = null
    this.key_used = []
}

Events.prototype.enableInputs = function(){
    var that = this
    this.key_down_listener = function (e) {
            console.log(e.keyCode)
	    that.keys_down[e.keyCode] = true 
	    that.last_key = e.keyCode
	    delete that.keys_up[e.keyCode] 
	    }
    addEventListener("keydown", this.key_down_listener, false)

    this.keys_up_listener =  function (e) {
	    that.keys_up[e.keyCode] = true 
	    that.last_key = e.keyCode
	    delete that.keys_down[e.keyCode] 
	    delete that.key_used[e.keyCode]
	    }
    addEventListener("keyup", this.keys_up_listener, false)
}

Events.prototype.isNotUsed = function(x){
    if(x in this.keys_down && !(x in this.key_used)){
	this.key_used[x] = true
	return true
    }
    else
	return false
}

Events.prototype.removeInputs = function(){
    removeEventListener("keydown", this.key_down_listener, false)
    removeEventListener("keyup", this.key_up_listener, false)
    this.keys_up   = []
    this.keys_down = []
    this.key_used  = []
}

Events.prototype.addKeyDown = function(e){
     this.keys_down[e.keyCode] = true 
     this.last_key = e.keyCode
     delete this.keys_up[e.keyCode]
}

Events.prototype.addKeyUp = function(e){
    this.keys_up[e.keyCode] = true 
    this.last_key = e.keyCode
    delete this.keys_down[e.keyCode]
}
