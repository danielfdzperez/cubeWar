/**
 * Class Chrono
 * Un cronometro
 */
function Chrono(){
	this.start_time = null
	this.difference = null
	this.min        = null
	this.seconds    = null
}

/**
 * Inicia la cuenta del cronometro
 */
Chrono.prototype.start = function(){
	this.start_time = new Date().getTime()
	this.min        = 0
	this.seconds    = 0
}

/**
 * Avanza el cronometro
 */
Chrono.prototype.step = function(){
	var current_time = new Date().getTime()
	this.difference = ((current_time - this.start_time) / 1000) / 60 //Get the minutes in decimal
	this.updateMinAndSecons()
}

/**
 * Actualiza los minutos y segundos
 */
Chrono.prototype.updateMinAndSecons = function(){
    this.min = Math.floor(this.difference)
    this.seconds = Math.floor((this.difference * 60) % 60)
}

/**
 * Convierte en string
 */
Chrono.prototype.toString = function(){
   return (this.min < 10 ? "0" : "") + this.min + ":" + (this.seconds < 10 ? "0" : "") + this.seconds
}

