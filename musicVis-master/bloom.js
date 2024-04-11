function Bloom(){
    this.name = "Bloom";
    var density = 1500;
    //circle size adjustment & initial
    var tunnelRadius = 1500;
    var angleStep;
    var angles = [];
    
//    this.mousePressed = function(){
//        music.loop();
//    }
    
    //draw light spectrum shape
    this.draw = function(){
        //-----------------------setup
        angleMode(DEGREES);
       //
        angleStep = 360 / density;
        
        //initial random angle
        for(let i = 0; i< density;i++){
            angles.push(random(360));
        }
        //------------------------
        
        background(120, 60, 100);
        //get frequency data
        var spectrum = fourier.analyze();
//        console.log(spectrum);
        
        stroke(20);
        strokeWeight(3);
        var energy1 = fourier.getEnergy('treble');
        ellipse(width/25-10,height/25,30+energy1);
        ellipse(width/25-10,height/25,40+energy1);
        
        stroke(200);
        var energy2 = fourier.getEnergy('highMid');
        ellipse(width/23-10,height/23,100+energy2);
        ellipse(width/23-10,height/23,150+energy2);
        
        //average amplitude of low frequencies(bass)
        let bassAmp = 0;
        for(let i=1; i<50;i++){
            bassAmp += spectrum[i];
        }
        
        bassAmp /= 50;
        
        // Adjust circle radius based on bass amplitude
        let newRadius = map(bassAmp, 0, 255, 50, 400); 
        //particles follow up
        tunnelRadius = lerp(tunnelRadius, newRadius, 0.1);

        //Update tunnel angles
        for (let i = 0; i < density; i++) {
            angles[i] += map(bassAmp, 0, 255, 0.5, 2);
        }
        
        //Draw tunnel effect
        translate(width / 2, height / 2);
    //    let r = random(255);
    //    let g = random(255);
    //    let b = random(255);
    //    stroke(r, g, b);
        stroke(0,255,255);
        strokeWeight(1.1);
        

        noFill();
        
        for (let i = 0; i < density; i++) {
            let x1 = cos(angles[i]) * tunnelRadius * (i / density);
            let y1 = sin(angles[i]) * tunnelRadius * (i / density);
            let x2 = cos(angles[i]) * tunnelRadius * ((i + 1) / density);
            let y2 = sin(angles[i]) * tunnelRadius * ((i + 1) / density);
            line(x1, y1, x2, y2);
        }

        // Loop tunnel angles
        if (frameCount % 120 === 0) {
            angles.shift();
            angles.push(random(360));
        }
        
        
    }
    
}