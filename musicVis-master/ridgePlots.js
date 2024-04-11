/* 
1. draw the line without any output
    a. workout where on the screen to plot and the scale
    b. draw lines that move up the screen in regular intervals
        i. create a 2d array of lines, add one to the array every x frames
        ii. each frame clear screen and decrease the y coordinate of each line
        iii. if line y is smaller than plot y, then remove from array
2. add the music output

3. Implement GUI Controls
*/

function RidgePlots(){
    this.name = "Ridge Plots";
//    var music;
    var output = [];
    var startX;
    var startY;
    var endY;
    var spectrumWidth;
    

    var speed = 0.7;
    
    //setup
    this.onResize = function(){
        startX = width/5;
        endY = height/5;
        startY = height - endY;
        //in the middle
        spectrumWidth = (width/5)*3;
    };
    
    //call onResize to set initial value
    this.onResize();
    
    this.draw = function(){
        background(200);
        stroke(130);
        strokeWeight(3);

        if(frameCount % 30 == 0){
        addWave();
        }
    
        for(var i=0; i < output.length; i++){
            var o = output[i];
            
            //add HSB color
            colorMode(HSB, 360);
            fill(frameCount%360, 360,360);
            

            beginShape();

            for(var j = 0; j < o.length; j++){
                // Update the y-coordinate to move lines upwards
                o[j].y -= speed;

                vertex(o[j].x, o[j].y);
            }

            endShape();        
            // Remove the line when it reaches the right edge of the canvas
            if(o[0].y < endY){
                output.splice(i, 1);
            }
        }
        colorMode(RGB);
        
    }
    
    function addWave(){
        //output.push([{x:startX, y:startY}, {x:startX+spectrumWidth, y:startY}]);
    
        //1024 elements inside w
        var w = fourier.waveform();
        var output_wave = [];
        var smallScale = 3;
        var bigScale = 40;

        for(var i = 0; i < w.length; i++){
            if(i%20 == 0){
                var x = map(i, 0, 1024, startX, startX+spectrumWidth);
                if(i<1024*0.25 || i>1024*0.75){
                    var y = map(w[i], -1, 1, -smallScale, smallScale);
                    output_wave.push({
                        x:x,
                        y:startY + y});
                }

                else{
                    var y = map(w[i], -1, 1, -bigScale, bigScale);
                    output_wave.push({
                        x:x,
                        y:startY + y});
                }
            }
        }
        output.push(output_wave);
    }

}