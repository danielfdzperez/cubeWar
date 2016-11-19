(function(){
    window.addEventListener("load", start, false)
    var menu = null
    var world = null
    function start(){
      world = new World("canvas", maps, map_conf, enemy, all_tiles, tile_size, function(){createMenu()})
      createMenu()
    }
    
    
    
    function createMenu(){
      loadMaxLevel()
      var key= {"enter":13, "up": 38, "down":40, "right":39, "left":37, "scape":27}
      menu = new MenuManager("canvas")
    
      /*Start Menu*/
      var start_button = []
      start_button.push(new Button("Start", 150, 60, function(){menu.stop();world.start();}))
      start_button.push(new Button("Levels", 150, 60, function(){menu.changeMenu(1)}))
      start_button.push(new Button("Controls", 150, 60, function(){menu.changeMenu(2)}))
      var start_menu_event = function(e){
          if(e.isNotUsed(key.enter)){//Enter
    	  this.button[this.curren_buton].action()
          }
          if(e.isNotUsed(key.up))//Up
    	  this.previousButton()
          if(e.isNotUsed(key.down)){//Down
    	  this.nexButton()
          }
      }
      var menus = []
      var start_menu = new Menu(start_button, "Reverse World", start_menu_event, "Center")
      
      /*Level Menu*/
      var level_menu_event = function(e){
          if(e.isNotUsed(key.enter))
    	  this.button[this.curren_buton].action()
          if(e.isNotUsed(key.left))
    	  this.previousButton()
          if(e.isNotUsed(key.right))
    	  this.nexButton()
          if(e.isNotUsed(key.scape))
    	  menu.changeMenu(0)
      }
      function button_action(n){
          return function(){menu.stop();world.start(n);}
      }
      var level_button = []
      for(var i = 0; i < maps.length; i++)
          if(i <= max_level)
             level_button.push(new Button((i+1).toString(), 100, 80, button_action(i)))
          else
             level_button.push(new Button("Loked", 100, 80, function(){}))
    
      var level_menu = new Menu(level_button, "Select level", level_menu_event, "List")
    
      /*Controls menu*/
      var controls_button = []
      controls_button.push(new Button("Controls A", 180, 60, function(){ changeKeys("a"); menu.changeMenu(0); }))
      controls_button.push(new Button("Controls B", 180, 60, function(){ changeKeys("b"); menu.changeMenu(0); }))
      var control_menu = new Menu(controls_button, "Controls", level_menu_event, "Edited")
      control_menu.drawButtonsEdited = function(ctx, width, height, start_point){
        var key_conf = null
        if(this.button[0].activated)
    	key_conf = "a"
        else
    	key_conf = "b"
        var row = 0
        var col_1 = start_point
        var col_2 = col_1 + 300
        key_conf = eval("keys_" + key_conf)
        for(var i in  key_conf){
           drawWord(ctx, i, standard_size, new Point(col_1, row * 50 + start_point))
           drawWord(ctx, keyToString(key_conf[i]), standard_size, new Point(col_2, row * 50 + start_point))
           row ++
        }
        drawWord(ctx, "Go back", standard_size, new Point(col_1, row * 50 + start_point))
        drawWord(ctx, "scape", standard_size, new Point(col_2, row * 50 + start_point))
    
        for(var i in this.button)
           this.button[i].draw(ctx, new Point(i * (this.button[i].width + 5) + 5, height - this.button[i].height - 5 ))
      }
    
    
      menus.push(start_menu)
      menus.push(level_menu)
      menus.push(control_menu)
      menu.fill(menus)
      menu.start()
    }
})()
