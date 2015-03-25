function Balloon(x, y, r, speed) {

}

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
	this.balloonsAmount = 2;
	this.balloons = [
		{
			x: 10,
			y: 10,
			r : 10,
			speed : 3,
			target : {
				x : 0,
				y : 0
			},
			mouseControl : 'left',
			color: 'red',
			isMoving : false
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
			color: 'blue',
			isMoving : false
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

		this.defineCoords(e);
		this.move(this.balloons);
	},

	defineCoords: function (e) {
		var x = (e.clientX - this.offSetX),
		 	y = (e.clientY - this.offSetY);

		this.checkKeys(x, y);
	},

	checkKeys : function (x,y) {
		var mouseButton = {
			1: 'left',
			3: 'right'
			};

			if (this.key in mouseButton) {
				// todo DONT use var inside if
				mouseClicked = mouseButton[this.key];
			}

		for (var i = 0; i < this.balloons.length; i++) {
			if (this.balloons[i].mouseControl == mouseClicked) {
				this.balloons[i].target.x = x;
				this.balloons[i].target.y = y;
				this.balloons[i].isMoving = true;
			}
		}
	},

	move : function () {
		var self = this,
			now,
			dTime,
			startTime,
			distance,
			i;

		startTime = Date.now();

		if (this.isAnimationActive) {
			return false
		}

		var tick = function () {
			// todo implement cycle stopping
			console.log('test');
			self.isAnimationActive = false;
			now = Date.now();
			dTime = now - startTime;

			for (i = 0; i < self.balloons.length;  i++) {
				if (self.balloons[i].isMoving) {
					self.isAnimationActive = true;
					var obj = self.balloons[i];

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
						obj.isMoving = false;
					}
					self.draw(obj.x, obj.y);
				}
			}
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