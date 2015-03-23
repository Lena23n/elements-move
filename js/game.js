function Game (id) {
	this.id = id;
	this.canvas = null;
	this.context = null;
	this.canvasWidth = null;
	this.canvasHeight = null;
	this.offSetX = null;
	this.offSetY = null;
	this.fieldSize = {
		w : 20,
		h : 20
	};
	this.cellSize = {
		w : null,
		h : null
	};
	this.balloon = {
		x: null,
		y: null
	};
}

Game.prototype = {
	init : function () {
		var self = this;

		this.canvas = document.getElementById(this.id);
		this.context = this.canvas.getContext('2d');
		this.canvasWidth = this.canvas.width;
		this.canvasHeight = this.canvas.height;
		this.cellSize = {
			w : this.canvasWidth / this.fieldSize.w,
			h : this.canvasHeight / this.fieldSize.h
		};

		this.offSetX  = this.canvas.offsetLeft;
		this.offSetY = this.canvas.offsetTop;


		if (!this.canvas) {
			return false
		}

		this.canvas.addEventListener('click', function(e) {
			self.eventClick(e);
		}, false);

		this.startGame();
	},

	startGame : function () {
		this.createBalloon();

		this.draw();
	},

	createBalloon : function () {
		this.balloon = {
			x: 1,
			y: 9
		};
	},

	draw : function () {
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.drawCircle(this.balloon.x, this.balloon.y);
	},

	drawCircle : function (x, y) {
		var circleX = Math.floor(x*this.cellSize.w),
			circleY = Math.floor(y*this.cellSize.h),
			radius = this.cellSize.w/2;

		this.context.beginPath();
		this.context.arc(circleX, circleY, radius, 0, 2*Math.PI, false);
		this.context.fillStyle = 'red';
		this.context.fill();
		this.context.lineWidth = 1;
		this.context.strokeStyle = 'red';
		this.context.stroke();
	},

	eventClick : function (e) {
		this.defineCoords(e);
		this.draw();
	},

	defineCoords : function (e) {
		var x = (e.clientX - this.offSetX)/this.cellSize.w,
			y = (e.clientY - this.offSetY)/this.cellSize.h;

		this.change(x,y);
	},

	change : function (x, y) {
		this.balloon.x = x;
		this.balloon.y = y;
	}

};

function pageReady () {
	var game = new Game('canvas');
	game.init();
}

window.addEventListener('load', pageReady);