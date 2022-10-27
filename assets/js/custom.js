const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particaleArray = [];

const mouse = {
    x: null,
    y: null,
    radius: 50
}
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

ctx.fillStyle = 'white';
ctx.font = "30px Poppins";
ctx.textAlign = "left";
ctx.fillText('Tingle',0,30);
const textCoordinates = ctx.getImageData(0,0,canvas.width,canvas.height);

class Partical {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30)+1;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt( dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance)/maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if(distance < mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
        }else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
    }
}
function init(){
    particaleArray = [];
    for ( let  y = 0, y2 = textCoordinates.height; y < y2; y++){
        for (let  x = 0, x2 = textCoordinates.height; x < x2; x++){
            if(textCoordinates.data[(y*4*textCoordinates .width)+(x*4)+3] > 128){
                let positionX = x;
                let positionY = y;
                particaleArray.push(new Partical(positionX*13,positionY*13));
            }
        }
    }
    // for(let i = 0; i<10000; i++){
    //     let x = Math.random() * canvas.height;
    //     let y = Math.random() * canvas.width;
    //     particaleArray.push(new Partical(x,y));
    // }
    // particaleArray.push(new Partical(50,50));
    // particaleArray.push(new Partical(80,50));
}
init();

function animation(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < particaleArray.length; i++ ) {
        particaleArray[i].draw();
        particaleArray[i].update();
    }
    requestAnimationFrame(animation);
}
animation();