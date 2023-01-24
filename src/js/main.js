let timeLastFrame = Date.now();
let deltaTime = 0;

function circleCollision(object1, object2) {
	if (distanceFromCenter(object1, object2) <= object1.radius + object2.radius) {
		console.log("yes");
	}
}

function airFriction(object) {
	object.velocity = object.velocity.deltaTimeAdd(object.velocity.scale(-2));
}

function boxCollision(object1, object2) {
	if (
		object2.x <= object1.x + object1.width &&
		object1.x <= object2.x + object2.width &&
		object2.y <= object1.y + object1.hight &&
		object1.y <= object2.y + object2.hight
	){

	}
}

let object1Center;
let object2Center;
function distanceFromCenter(object1, object2) {
	switch (object1.shape) {
		case "circle":
			object1Center = [object1._x, object1._y];
			break;
		case "rectangle":
			object1Center = [
				object1.width / 2 + object1.x,
				object1.hight / 2 + object1.y,
			];
	}
	switch (object2.shape) {
		case "circle":
			object2Center = [object2._x, object2._y];
			break;
		case "rectangle":
			object2Center = [
				object2.width / 2 + object2.x,
				object2.hight / 2 + object2.y,
			];
	}
	return Math.sqrt(
		Math.abs(object1Center[0] - object2Center[0]) ** 2 +
			Math.abs(object1Center[1] - object2Center[1]) ** 2
	);
}

class Vector {
	constructor(_x, _y) {
		this.x = _x;
		this.y = _y;
	}
	add(vector) {
		return new Vector(this.x + vector.x, this.y + vector.y);
	}
	deltaTimeAdd(vector) {
		return new Vector(
			this.x + vector.x * deltaTime,
			this.y + vector.y * deltaTime
		);
	}
	subtract(vector) {
		return new Vector(this.x - vector.x, this.y - vector.y);
	}
	scale(scalar) {
		return new Vector(this.x * scalar, this.y * scalar);
	}
	magnitude() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}
	normalize() {
		if (this.magnitude() === 0) {
			return new Vector(0, 0);
		} else {
			return new Vector(this.x / this.magnitude(), this.y / this.magnitude());
		}
	}
	displayVector(_x, _y, _scalar, _thickness, _color) {
		line(
			_x,
			_y,
			_x + this.x * _scalar,
			_y + this.y * _scalar,
			_thickness,
			_color
		);
	}
}
class Sqare {
	constructor(_x, _y, _mass) {
		this.width = 40;
		this.hight = 80;
		this.position = new Vector(_x, _y);
		this.velocity = new Vector(0, 0);
		this.acceleration = new Vector(0, 0);
		this.accelerationConstant = 20;
		this.mass = _mass;
		this.shape = "rectangle";
	}
}

class Ball {
	constructor(_x, _y, _radius, _color) {
		this.position = new Vector(_x, _y);
		this.velocity = new Vector(0, 0);
		this.acceleration = new Vector(0, 0);
		this.radius = _radius;
		this.color = _color;
		this.shape = "circle";
	}
}

let player1 = new Sqare(400, 400);

let player2 = new Sqare(600, 400);

function update() {
	clearScreen();

	// Calculationg delta time
	deltaTime = (Date.now() - timeLastFrame) / 1000;
	timeLastFrame = Date.now();

	// player movement
	if (keyboard.d) {player1.acceleration = new Vector( 1, 0);}
	if (keyboard.a) {player1.acceleration = new Vector(-1, 0);}
	if (keyboard.w) {player1.acceleration = new Vector( 0,-1);}
	if (keyboard.s) {player1.acceleration = new Vector( 0, 1);}
    if (keyboard.a && keyboard.w) {player1.acceleration = new Vector(-1/Math.sqrt(2), -1/Math.sqrt(2))}
    if (keyboard.d && keyboard.w) {player1.acceleration = new Vector( 1/Math.sqrt(2), -1/Math.sqrt(2))}
    if (keyboard.d && keyboard.s) {player1.acceleration = new Vector( 1/Math.sqrt(2),  1/Math.sqrt(2))}
    if (keyboard.a && keyboard.s) {player1.acceleration = new Vector(-1/Math.sqrt(2),  1/Math.sqrt(2))}
	if (keyboard.d && keyboard.a) {player1.acceleration.x = 0;}
	if (keyboard.w && keyboard.s) {player1.acceleration.y = 0;}

	// stops all acceleration if all movement keys are not pressed
	if (!keyboard.s && !keyboard.w && !keyboard.a && !keyboard.d) {
		player1.acceleration = new Vector(0, 0);
	}

	//Displays player vectors and 
	player1.acceleration.displayVector(100, 100, 100, 2, "black");

	player1.acceleration = player1.acceleration.scale(4);
	player1.velocity = player1.velocity.deltaTimeAdd(player1.acceleration);

	player1.velocity.displayVector(100, 200, 100, 2, "black");



	
	airFriction(player1);



	// calculating new position
	player1.position = player1.position.add(player1.velocity);
	player1.position = player1.position.add(player1.velocity);

	player2.position = player2.position.add(player2.velocity);
	player2.position = player2.position.add(player2.velocity);

	rectangle(
		player1.position.x,
		player1.position.y,
		player1.width,
		player1.hight,
		"red"
	);
	rectangle(
		player2.position.x,
		player2.position.y,
		player2.width,
		player2.hight,
		"green"
	);
}
