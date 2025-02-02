class Bullet{
    constructor(x,y){
        this.width = 5;
        this.height = 15;
        this.x = x  + player.width / 2 - this.width / 2;
        this.y = y;
        this.speed = 7;
    }

    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        this.y -= this.speed;
    }
}

export default Bullet;