/**
 * Class Events
 * Clase que gestiona los eventos
 */
function Events(){
    this.keys_down = {} //Teclas pulsadas
    this.keys_up = {} //Teclas levantadas
    this.last_key = null //Ultima tecla pulsada
    this.key_down_listener = null
    this.key_up_listener   = null
    this.key_used = [] 
}

/**
 * Habilita el uso de las teclas
 */
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

/**
 * Comprueba si una tecla no se esta usando
 */
Events.prototype.isNotUsed = function(x){
    if(x in this.keys_down && !(x in this.key_used)){
	this.key_used[x] = true
	return true
    }
    else
	return false
}

/**
 * Deshabilita el uso de las teclas
 */
Events.prototype.removeInputs = function(){
    removeEventListener("keydown", this.key_down_listener, false)
    removeEventListener("keyup", this.key_up_listener, false)
    this.keys_up   = []
    this.keys_down = []
    this.key_used  = []
}

/**
 * Añade una tecla pulsada
 */
Events.prototype.addKeyDown = function(e){
     this.keys_down[e.keyCode] = true 
     this.last_key = e.keyCode
     delete this.keys_up[e.keyCode]
}

/**
 * Añade una tecla que se ha dejado de pulsar
 */
Events.prototype.addKeyUp = function(e){
    this.keys_up[e.keyCode] = true 
    this.last_key = e.keyCode
    delete this.keys_down[e.keyCode]
}
