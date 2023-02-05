let timeLastFrame = Date.now();
let deltaTime = 0;

let objectList = []


function airFriction(object) {
	object.velocity = object.velocity.deltaTimeAdd(object.velocity.scale(-2));
}

function length(object1, object2){
	return Math.sqrt((
		object1.position.x - object2.position.x) ** 2 +
		object1.position.y - object2.position.y** 2)
}
function signedDstToCircle(object1, object2){
	return length(object1, object2) - object1.radius
}


function distanceToLineSegment(p1, p2, q) {
	let u = p2.subtract(p1);
	let v = q.subtract(p1);

	let dotProduct = u.dot(v);
	let uLengthSquared = u.dot(u);
	let t = dotProduct / uLengthSquared;

	if (t < 0) {
		return q.subtract(p1).length();
	} else if (t > 1) {
		return q.subtract(p2).length();
	} else {
		let projection = p1.add(u.scale(t));
		return q.subtract(projection).length();
	}
	
}


function circleCollision(object1, object2) {
	if (distanceFromCenter(object1, object2) <= object1.radius + object2.radius) {
		console.log("yes");
	}
}

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
		if (keyboard.w && object1.velocity.y <= 0.1) return;
		console.log(object1.velocity)

		if (object1.y + object1.hight >= object2.y &&
			object1.y <= object2.y + object2.hight &&
			object1.x <= object2.x
			){
				object1.position.x = object2.position.x - object1.width
				console.log("1")
			}
		if (object1.position.x + object1.width >= object2.position.x &&
			object1.position.x <= object2.position.x + object2.width &&
			object1.position.y <= object2.position.y){
				
				object1.position.y = object2.position.y - object1.hight
				object1.velocity = new Vector2(object1.velocity.x, 0) 
				//console.log("2")
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
	}
}

class Vector2 {
	constructor(_x, _y) {
		this.x = _x;
		this.y = _y;
	}

	add(v) {
		return new Vector2(this.x + v.x, this.y + v.y);
	}

	deltaTimeAdd(v) {
		return new Vector2(
			this.x + v.x * deltaTime,
			this.y + v.y * deltaTime
		);
	}

	subtract(v) {
		return new Vector2(this.x - v.x, this.y - v.y);
	}

	scale(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	length() {
		return Math.sqrt(this.dot(this));
	}
	normalize() {
		if (this.magnitude() === 0) {
			return new Vector2(0, 0);
		} else {
			return new Vector2(this.x / this.magnitude(), this.y / this.magnitude());
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
	
	dot(v) {
		return this.x * v.x + this.y * v.y;
	}
}

class Sqare {
	constructor(_x, _y, _width, _hight, _mass) {
		this.width = _width;
		this.hight = _hight;
		this.position = new Vector2(_x, _y);
		this.velocity = new Vector2(0, 0);
		this.acceleration = new Vector2(0, 0);
		this.accelerationConstant = 20;
		this.mass = _mass;
		this.shape = "rectangle";
	}
}

class Ball {
	constructor(_x, _y, _radius, _color) {
		this.position = new Vector2(_x, _y);
		this.velocity = new Vector2(0, 0);
		this.acceleration = new Vector2(0, 0);
		this.radius = _radius;
		this.color = _color;
		this.shape = "circle";
	}
}

let player1 = new Sqare(400, 400, 40, 80);

let player2 = new Sqare(600, 400, 40, 80);

let ground = new Sqare(0, 600, 1500, 100)

objectList.push(player1, player2, ground)

let lineList = [
	[
		new Vector2(500, 400),
		new Vector2(700, 400)
	],
	[
		new Vector2(700, 400),
		new Vector2(900, 600)
	]
]
let lineDistance = []


function update() {
	clearScreen();

	// Calculationg delta time
	deltaTime = (Date.now() - timeLastFrame) / 1000;
	timeLastFrame = Date.now();

	for (let i = 0; i < lineList.length; i++){
		line(lineList[i][0].x, lineList[i][0].y, lineList[i][1].x, lineList[i][1].y, 2, "black")
		lineDistance.push(distanceToLineSegment(lineList[i][0], lineList[i][1], player1.position))
		if (lineDistance.length > 2){
			lineDistance.splice(0, 1)
		}
	}

	circle(player1.position.x, player1.position.y, Math.min(lineDistance[0], lineDistance[1]), "black")
	//console.log(Math.min(lineDistance))

	// player movement
	if (keyboard.d) {player1.acceleration = new Vector2( 1, 0);}
	if (keyboard.a) {player1.acceleration = new Vector2(-1, 0);}
	if (keyboard.w) {player1.acceleration = new Vector2( 0,-1);}
	if (keyboard.s) {player1.acceleration = new Vector2( 0, 1);}
    if (keyboard.a && keyboard.w) {player1.acceleration = new Vector2(-1/Math.sqrt(2), -1/Math.sqrt(2))}
    if (keyboard.d && keyboard.w) {player1.acceleration = new Vector2( 1/Math.sqrt(2), -1/Math.sqrt(2))}
    if (keyboard.d && keyboard.s) {player1.acceleration = new Vector2( 1/Math.sqrt(2),  1/Math.sqrt(2))}
    if (keyboard.a && keyboard.s) {player1.acceleration = new Vector2(-1/Math.sqrt(2),  1/Math.sqrt(2))}
	if (keyboard.d && keyboard.a) {player1.acceleration.x = 0;}
	if (keyboard.w && keyboard.s) {player1.acceleration.y = 0;}

	// stops all acceleration if all movement keys are not pressed
	if (!keyboard.s && !keyboard.w && !keyboard.a && !keyboard.d) {
		player1.acceleration = new Vector2(0, 0);
	}

	//Displays player Vectors and 
	//player1.acceleration.displayVector(player1.position.x + player1.width/2, player1.position.y + player1.hight/2, 100, 2, "black");

	player1.acceleration = player1.acceleration.scale(4);
	player1.velocity = player1.velocity.deltaTimeAdd(player1.acceleration);

	
	
	
	
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
	
	//player1.velocity.displayVector(player1.position.x + player1.width/2, player1.position.y + player1.hight/2, 100, 2, "blue");
	}
