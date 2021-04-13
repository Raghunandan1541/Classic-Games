const canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

width = canvas.width;
height = canvas.height;

class Player {
	constructor(x, y, wdth, higt) {
		this.x = x;
		this.y = y
		this.wdth = wdth;
		this.higt = higt;
	}

	draw = () => {
		
		ctx.beginPath();
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(this.x, this.y, this.wdth, this.higt);
		ctx.fill();
	}
}

class Ball {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	draw = () => {
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}

var player1 = new Player(100, 250, 20, 120);
var player2 = new Player(1200, 250, 20, 120);
var ball = new Ball(600, 300, 10, '#fff');


const animate = () => {

	ctx.fillStyle = "#0000005";
	ctx.fillRect(0, 0, width, height);

	player1.draw();
	player2.draw();
	ball.draw();



}

animate();