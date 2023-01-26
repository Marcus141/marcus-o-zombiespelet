let timeLastFrame = Date.now();
let deltaTime = 0;

let objectList = []


let gravityVector;
let distanceToGround;
function gravity(object){
	distanceToGround = (ground.position.y - object.position.y + object.hight) / 100;
	gravityVector = 1/(distanceToGround ** 1.1) * 6
	object.velocity = object.velocity.deltaTimeAdd(new Vector(0, gravityVector))
}


function airFriction(object) {
	object.velocity = object.velocity.deltaTimeAdd(object.velocity.scale(-2));
}


function circleCollision(object1, object2) {
	if (distanceFromCenter(object1, object2) <= object1.radius + object2.radius) {
		console.log("yes");
	}
}
let tempCenter;
function movableBoxCollision(object1, object2) {
	if (
		object2.position.x <= object1.position.x + object1.width &&
		object1.position.x <= object2.position.x + object2.width &&
		object2.position.y <= object1.position.y + object1.hight &&
		object1.position.y <= object2.position.y + object2.hight
	){
		
	}
}
function imovableBoxCollision(object1, object2) {
	if (object2.position.x <= object1.position.x + object1.width &&
		object1.position.x <= object2.position.x + object2.width &&
		object2.position.y <= object1.position.y + object1.hight &&
		object1.position.y <= object2.position.y + object2.hight
	){
		//if (keyboard.w && object1.velocity.y === 0) return;

		if (object1.y + object1.hight >= object2.y &&
			object1.y <= object2.y + object2.hight &&
			object1.x <= object2.x
			){
				object1.position.x = object2.position.x - object1.width
				console.log("1")
			}
		if (object1.x + object1.width >= object2.x &&
			object1.x <= object2.x + object2.width &&
			object1.y <= object2.y){
				
				//object1.position.y = object2.position.y - object1.hight
				//object1.velocity = object1.velocity.y = 0
				console.log("2")
			}
		if (object1.y + object1.hight >= object2.y &&
			object1.y <= object2.y + object2.hight &&
			object1.x + object1.width >= object2.x + object2.width
			){
				object1.position.x = object2.position.x + object2.width
				console.log("3")
			}
		if (object1.x <= object2.x + object2.width &&
			object1.x + object1.width >= object2.x &&
			object1.y >= object2.y + object2.hight
			){
				object1.position.y = object2.position.y + object1.hight
				console.log("4")
			}
		console.log("No")
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
	constructor(_x, _y, _width, _hight, _mass) {
		this.width = _width;
		this.hight = _hight;
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

let player1 = new Sqare(400, 400, 40, 80);

let player2 = new Sqare(600, 400, 40, 80);

let ground = new Sqare(0, 600, 1500, 100)

objectList.push(player1, player2, ground)

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
	player1.acceleration.displayVector(player1.position.x + player1.width/2, player1.position.y + player1.hight/2, 100, 2, "black");

	player1.acceleration = player1.acceleration.scale(4);
	player1.velocity = player1.velocity.deltaTimeAdd(player1.acceleration);

	
	
	
	
	airFriction(player1);
	gravity(player1)
	imovableBoxCollision(player1, ground)
	
	
	
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
	rectangle(
		ground.position.x,
		ground.position.y,
		ground.width,
		ground.hight,
		"black"
	)
	
	player1.velocity.displayVector(player1.position.x + player1.width/2, player1.position.y + player1.hight/2, 100, 2, "blue");
	}
