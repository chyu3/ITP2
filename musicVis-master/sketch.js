//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

function preload(){
	sound = loadSound('assets/stomper_reggae_bit.mp3', success, error, whileloading);
}


//------->error callbacks
function success(){
    console.log("success: " + sound.duration());
    duration = sound.duration(); //getting the sample duration and store it
    
    //???????to be checked (won't be set until sound is loaded)
    var isReady = true;
    
}

function error(err){
    console.log("error");
    //err = pop up error window with error specified 
    alert("error: " + err);
}

function whileloading(prog){
    //prog = how far it is processed (prog increments from 0 to 1)
    //can be used to show a progress bar while files are loading
    console.log("loading: " + prog);   
}
//------->


function setup(){
	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
     vis.add(new FireworkEffect());
     vis.add(new RidgePlots());
     vis.add(new Bloom());

}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
