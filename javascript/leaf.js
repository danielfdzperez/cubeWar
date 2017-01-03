/**
 *	Class Leaf
 *
 * 	Todavia no se bien explicarla cuando lo tenga terminado pongo la descripción
 *
 */

// Ver despues como hacerlos bien, consultarlo con DaniF
 var leftChild 	= new Leaf();
 var rightChild = new Leaf();

function Leaf(x, y, width, height){
	this.min_leaf_size 	= 6 //Valor Fijo, ver despues como hacerlo de forma correcta.
	this.y 				= y
	this.x 				= x
	this.width 			= width
	this.height 		= height
}

Leaf.prototype.split = function() {

	if (leftChild != null || rightChild != null)
		return false

	var splitH = Math.random() > 0.5

	if (this.width > this.height && this.width / this.height >= 1.25)
		splitH = false
	else if (this.width < this.height && this.width / this.height <= 1.25)
		splitH = true

	var max = (splitH ? height : width) - this.min_leaf_size
	if (max <= this.min_leaf_size)
		return false

	var split = this.getRandomInt(this.min_leaf_size, max)
	if (splitH){
		leftChild 	= new Leaf(x, y, width, split)
		rightChild 	= new Leaf(x, y, width, height - split)
	}
	else{

		leftChild 	= new Leaf(x, y, split, height)
		rightChild 	= new Leaf(x, y, width -  split, height)	
	}
	return true
}

Leaf.prototype.getRandomInt = function(min, max){
	return Math.floor(Math.random() * (max - min)) + min
}

Leaf.prototype.setMinLeafSize = function(new_value){
	this.min_leaf_size = new_value
}


//TODO ver que hace la clase rectangle y vector en Flixel, 

//URL de la web donde estoy viendo como hacer los mapas aleatorios
//https://gamedevelopment.tutsplus.com/tutorials/how-to-use-bsp-trees-to-generate-game-maps--gamedev-12268
