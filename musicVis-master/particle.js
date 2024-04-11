function Particle(x,y, colour, angle,speed) {
    var x = x;
    var y = y;
    var angle = angle;
    this.speed = speed;
    this.colour = colour;
    this.age = 255;
    this.draw = function(){
        this.update();
        var r = red(this.colour)-(255-this.age);
        var g = green(this.colour)-(255-this.age);
        var b = blue(this.colour)-(255-this.age);
        var c = color(r,g,b);
        fill(c);
        this.age-=1;
        noStroke();
//        rect(x+4,y-1,2,12);
//        rect(x-1,y+4,12,2);
//        
        beginShape();
        vertex(x+1,y+2);
        vertex(x+2,y);
//        vertex(x+9,y+8);
//        vertex(x+8,y+10);
        endShape(CLOSE);
        beginShape();
        vertex(x+8,y);
        vertex(x+9,y+2);
        vertex(x+2,y+10);
        vertex(x+1,y+8);
        endShape(CLOSE);
        
    }
    this.update = function(){
        this.speed -= 0.05; 
        x+=cos(angle)*speed+noise(frameCount)*10; 
        y+=sin(angle)*speed+noise(frameCount)*10;
    }
}