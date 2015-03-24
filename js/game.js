function Game(id) {
	this.id = id;
	this.canvas = null;
	this.context = null;
	this.canvasWidth = null;
	this.canvasHeight = null;
	this.offSetX = null;
	this.offSetY = null;
	this.isAnimationActive = false;
	this.key = null;

	this.balloons = [
		{
			x: 10,
			y: 10,
			r : 10,
			speed : 4,
			target : {
				x : 0,
				y : 0
			},
			mouseControl : 'left',
			color: 'red'
		},
		{
			x: 20,
			y: 20,
			r : 15,
			speed : 2,
			target : {
				x : 0,
				y : 0
			},
			mouseControl : 'right',
			color: 'blue'
		}
	];

	this.isAnimationActive = false;
}

Game.prototype = {
	init: function () {
		var self = this;

		this.canvas = document.getElementById(this.id);
		this.context = this.canvas.getContext('2d');
		this.canvasWidth = this.canvas.width;
		this.canvasHeight = this.canvas.height;

		this.offSetX = this.canvas.offsetLeft;
		this.offSetY = this.canvas.offsetTop;


		if (!this.canvas) {
			return false
		}

		this.canvas.addEventListener('contextmenu', function(e) {
			self.eventClick(e);
			e.preventDefault();
		}, false);

		this.canvas.addEventListener('click', function (e) {
			self.eventClick(e);
		});



		this.startGame();
	},

	startGame: function () {

		this.draw();
	},


	draw: function () {
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		var i,
			array = this.balloons;

		for (i = 0; i < array.length; i++) {
			var x = array[i].x,
				y = array[i].y,
				r = array[i].r,
				color = array[i].color;

			this.drawCircle(x, y , r, color);
		}
	},

	drawCircle : function (x, y , r, color) {

		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2 * Math.PI, false);
		this.context.fillStyle = color;
		this.context.fill();
		this.context.lineWidth = 1;
		this.context.strokeStyle = color;
		this.context.stroke();
	},

	eventClick : function (e) {
		this.key = (e).which;
		this.checkKeys();

		this.defineCoords(e);
	/*	this.move();*/
	},

	defineCoords: function (e) {
		var x = (e.clientX - this.offSetX),
		 	y = (e.clientY - this.offSetY);
	},

	checkKeys : function () {
		var mouseButton = {
			1: 'left',
			3: 'right'
			};

			if (this.key in mouseButton) {
				var d = mouseButton[this.key];

				console.log(d)
			}
	},

	move : function (obj) {
		var self = this,
			now,
			dTime,
			startTime,
			distance;

		startTime = Date.now();
		if (this.isAnimationActive) {
			return false
		}

		this.isAnimationActive = true;

		var tick = function () {
			now = Date.now();
			dTime = now - startTime;

			// todo movement through vectors
			// todo movement through angle/cos/sin -> atan2

			var diffX = obj.target.x - obj.x,
				diffY = obj.target.y - obj.y;

			distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

			// todo use time difference between frames
			var dx = (diffX / distance);
			var dy = (diffY / distance);

			// todo VECTORS
			// todo normalization

			obj.x += dx * obj.speed;
			obj.y += dy * obj.speed;

			if (distance < 5 ) {
				self.isAnimationActive = false;
			}

			self.draw(obj.x, obj.y);

			// Redraw
			if(self.isAnimationActive) requestAnimationFrame(tick);
		};
		tick();
	}

};

function pageReady() {
	var game = new Game('canvas');
	game.init();
}

window.addEventListener('load', pageReady);