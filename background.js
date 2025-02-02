class Background{
    constructor(){
        this.speed = 1;
        this.y = 0;
    }
    draw(){
        ctx.drawImage(bgImg,0,this.y,canvas.width,canvas.height);
        ctx.drawImage(bgImg,0,this.y - canvas.height,canvas.width,canvas.height);
        this.y += this.speed;
        if( this.y >= canvas.height){
            this.y = 0;
        }
    } 
}

export default Background;