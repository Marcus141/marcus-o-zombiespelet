let timeLastFrame = Date.now();
let deltaTime = 0;

let objectList = []


function airFriction(object) {
	object.velocity = object.velocity.deltaTimeAdd(object.velocity.mul(-2));
}

function distanceToLineSegment(p1, p2, q) {
	let u = p2.sub(p1);
	let v = q.sub(p1);

	let dotProduct = u.dot(v);
	let uLengthSquared = u.dot(u);
	let t = dotProduct / uLengthSquared;

	if (t < 0) {
		return q.sub(p1).length();
	} else if (t > 1) {
		return q.sub(p2).length();
	} else {
		let projection = p1.add(u.mul(t));
		return q.sub(projection).length();
	}
}

function findClosestLine(lineList, q) {
	let closestDistance = Infinity;
	for (let i = 0; i < lineList.length; i++) {
		let p1 = lineList[i][0];
		let p2 = lineList[i][1];
		let distance = distanceToLineSegment(p1, p2, q);
		closestDistance = Math.min(closestDistance, distance);
	}
	return closestDistance;
}


function sphereSDF(p, r) {
	return p.length() - r;
}

function rayMarch(camera, rayDirection, maxSteps, stepSize) {
	let position = camera;
	for (let i = 0; i < maxSteps; i++) {
		let distanceToScene = findClosestLine(lineList, position);
		if (distanceToScene < stepSize) {
			return position;
		}
		position = position.add(rayDirection.mul(distanceToScene));
	}
	return null;
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

	sub(v) {
		return new Vector2(this.x - v.x, this.y - v.y);
	}

	mul(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalize() {
		return this.mul(1 / this.length());
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




let player1 = new Sqare(400, 400, 40, 80);


let lineList = [
	[new Vector2(500, 400), new Vector2(700, 400)],
	[new Vector2(100, 100), new Vector2(300, 200)],
	[new Vector2(700, 400), new Vector2(900, 600)]
];






function update() {
	clearScreen();
	fill("black")

	// Calculationg delta time
	deltaTime = (Date.now() - timeLastFrame) / 1000;
	timeLastFrame = Date.now();

	for (let i = 0; i < lineList.length; i++){
		line(lineList[i][0].x, lineList[i][0].y, lineList[i][1].x, lineList[i][1].y, 2, "gray")
	}







	let camera = player1.position
	let maxSteps = 100;
	let stepSize = 0.01;

	for (let i = 0; i < 720; i++){
		let rayDirection = new Vector2(Math.cos(i), Math.sin(i))
		let result = rayMarch(camera, rayDirection, maxSteps, stepSize);
		if (result){
			let playerToResultLength =  Math.sqrt((result.x - player1.position.x) ** 2 + (result.y - player1.position.y) ** 2)
			if (playerToResultLength >= 500){
				line(player1.position.x, player1.position.y, player1.position.x + (result.x - player1.position.x)/playerToResultLength * 500, player1.position.y + (result.y - player1.position.y)/playerToResultLength * 500, 1, "white")
			} else {
				line(player1.position.x, player1.position.y, result.x, result.y, 1, "white")
			}
		}
		if (result === null){
			line(player1.position.x, player1.position.y,player1.position.x + rayDirection.x * 500, player1.position.y + rayDirection.y * 500)
		}
	}






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


	player1.acceleration = player1.acceleration.mul(4);
	player1.velocity = player1.velocity.deltaTimeAdd(player1.acceleration);

	
	
	
	
	airFriction(player1);
	
	
	// calculating new position
	player1.position = player1.position.add(player1.velocity);
	player1.position = player1.position.add(player1.velocity);
	
	
	rectangle(
		player1.position.x,
		player1.position.y,
		player1.width,
		player1.hight,
		"red"
		);
	}
