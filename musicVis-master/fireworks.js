function Fireworks(){
    var fireworks = [];
    this.addFirework = function(){
        var fireColour = null;
        var r = random(0,255) ;
        var g = random(0,255);
        var b = random(0,255) ;
        fireColour = color(r,g,b);
        var fireX = random(0,width*0.8);
        var fireY = random(0,height*0.8);
        var firework = new Firework(fireColour, fireX, fireY);
        fireworks.push(firework);
    }
    this.update = function(){
        for(var i=0; i<fireworks.length; i++){
            fireworks[i].draw();
            if(fireworks[i].depleted){
                fireworks.splice(i,1);
            }
        }
    }
}