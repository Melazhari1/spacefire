class Enemy{
    constructor(enemyImg){
        this.enemyImg = enemyImg;
        this.width = 40;
        this.height =  40;
        this.x = Math.random() * ( canvas.width  - this.width );
        this.y = - this.height;
        this.speed = 2  ;
    }

    draw(){
        ctx.drawImage( this.enemyImg, this.x, this.y,this.width,this.height );
    }

    update(){
        this.y += this.speed;
    }
}

export default Enemy;