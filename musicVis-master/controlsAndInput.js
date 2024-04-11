//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		if(!this.playbackButton.hitCheck()){
			var fs = fullscreen();
			fullscreen(!fs);
		}
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(3);
		textSize(15);

		//playback button 
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){

			text("Select a visualisation and Play:", 80, 40);
			this.menu();
		}	
        else{
            fill(180,50,255);
            stroke("white");
            background(180,0,255);
            textSize(50);
            text("--Press Space for Menu--", width/4-60,height/2);
        }
		pop();
        

	};

	this.menu = function(){
		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i++){
			var yLoc = 70 + i*30;
			text((i+1) + ":  " +vis.visuals[i].name, 80, yLoc);
		}
	};
}


