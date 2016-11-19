function Menu(buttons, title, events, draw_type){
    this.button           = buttons
    this.curren_buton     = 0
    this.button[this.curren_buton].activated = true

    this.title            = title
    this.background_color = /*background_color*/null
    this.events           = events
    this.draw_type        = draw_type
}

Menu.prototype.draw = function(ctx, width, height){
    ctx.fillStyle = "MediumBlue"
    ctx.fillRect(0, 0, width, height)

    title_size = 10
    var center_x = 0 + ( (width/2) - ((this.title.length*title_size)/2)*standard_size )
    var difference_y = (height/2)/2
    drawWord(ctx, this.title, title_size, new Point(center_x , 10))

    var creator = "Created by Daniel Fernandez"
    drawWord(ctx, creator, 2, new Point(width - (creator.length+1)*8, height-(3*5)))
    var github = "GitHub danielfdzperez"
    drawWord(ctx, github, 2, new Point(width - (creator.length+1)*8, height-(10*5)))

     
    this["drawButtons" + this.draw_type](ctx, width, height, difference_y) 
}

Menu.prototype.drawButtonsCenter = function(ctx, width, height, start_point){
    for(var i in this.button)
       this.button[i].draw(ctx, new Point(width/2 - this.button[i].width/2, i*100+start_point))
}

Menu.prototype.drawButtonsList = function(ctx, width, height, start_point){
    var col = 0
    var row = 0
    var margin = 5
    for(var i in this.button){
       var button_width = this.button[i].width + margin
       var button_height = this.button[i].height + margin
       this.button[i].draw(ctx, new Point( (button_width * col + margin), row*button_height + start_point ))

       if((++col * button_width + margin) + button_width > width ){
	   col = 0
	   row ++
       }
    }
}

Menu.prototype.drawButtonsEdited = function(ctx, width, height, start_point){
}

Menu.prototype.nexButton = function(){
    this.button[this.curren_buton].activated = false
    this.curren_buton = ++this.curren_buton % this.button.length
    this.button[this.curren_buton].activated = true
}

Menu.prototype.previousButton = function(){
    this.button[this.curren_buton].activated = false
    if(--this.curren_buton < 0)
	this.curren_buton = this.button.length-1
    this.button[this.curren_buton].activated = true
}

function MenuManager(canvas, menu){
    this.menu         = []
    this.event        = new Events()
    this.canvas      = document.getElementById(canvas)
    this.ctx         = this.canvas.getContext('2d')
    this.current_menu = 0
    if(menu)
	this.fill(menu)
    this.timer = null
    this.running = false
}

MenuManager.prototype.start = function(){
    this.event.enableInputs()
    this.running = true
    this.loop()
}

MenuManager.prototype.loop = function(){
    this.draw()
    this.menu[this.current_menu].events(this.event)

    var that = this
    if(this.running)
       this.timer = setTimeout(function(){that.loop()}, 10)
}

MenuManager.prototype.stop = function(){
    this.event.removeInputs()
    clearTimeout(this.timer)
    this.running = false
}

MenuManager.prototype.fill = function(menu){
    this.menu = []
    for(var i in menu)
	this.menu.push(menu[i])
}

MenuManager.prototype.changeMenu = function(n){
    if(n < this.menu.length && n >= 0)
	this.current_menu = n
    if(!n && n != 0)
	this.current_menu = ++this.current_menu % this.menu.length
}

MenuManager.prototype.draw = function(){
    this.menu[this.current_menu].draw(this.ctx, this.canvas.width, this.canvas.height)
}

MenuManager.prototype.events = function(){
}
