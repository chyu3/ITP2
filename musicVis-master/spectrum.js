function Spectrum(){
	this.name = "spectrum";

	this.draw = function(){
        background(224,216,198);
		push();
		var spectrum = fourier.analyze();
		noStroke();

		for(var i = 0; i<spectrum.length; i++){

			//fade the colour of the bin from green to red
			var g = map(spectrum[i], 255, 0, 0, 255);
			fill(spectrum[i], g, 200);

			//draw each bin as a rectangle from the left of the screen
			//across
			var y = map(i, 0, spectrum.length, 0, height);
			var w = map(spectrum[i], 0, 255, 0, width);
			rect(0, y, w, height/spectrum.length);
		}  		
		pop();
	};
}
