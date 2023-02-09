//class material{
//	constructor(_material){
//		switch (_material){
//			case "glass":
//				this.heatCap = 
//				thsi.expansionCoefficient = 
//				this.density =
//				this.condutionCoefficient = 
//
//			case "wood":
//				this.heatCap = 
//				thsi.expansionCoefficient = 
//				this.density =
//				this.condutionCoefficient = 
//
//			case "steel":
//				this.heatCap = 
//				thsi.expansionCoefficient = 
//				this.density =
//				this.condutionCoefficient = 
//
//			case "copper":
//				this.heatCap = 
//				thsi.expansionCoefficient = 
//				this.density =
//				this.condutionCoefficient = 
//
//		}
//	}
//}

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