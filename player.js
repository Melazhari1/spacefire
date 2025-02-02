class Player{
    constructor(){
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 20;
        this.speed = 5;
    }

    draw(){
        ctx.drawImage(playerImg,this.x,this.y,this.width,this.height);
    }

    move(dir){
        if( dir == 'left'  && this.x > 0 ){
            this.x -= this.speed;
        }
        if( dir == 'right'  && this.x < canvas.width - this.width ){
            this.x += this.speed;
        }
    }
}
export default Player;