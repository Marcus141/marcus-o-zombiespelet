let timeLastFrame = Date.now()
let deltaTime = 0


// Player info
class Player{
    constructor(_x, _y){
        this.width = 40
        this.hight = 80
        this.vector = [0, 0]
        this.x = _x
        this.y = _y
        this.gravity = 12
        this.inAir = false
        this.spaceDown = false
    }
}

let player1 = new Player(400, 400)


function boxCollision(object1, object2){
    if (object2.x <= object1.x + object1.width &&
        object1.x <= object2.x + object2.width &&
        object2.y <= object1.y + object1.hight &&
        object1.y <= object2.y + object2.hight){
            console.log("Collideing")
    }
}

let player2 = new Player(600, 400)




function update(){
    clearScreen()

    // Calculationg delta time
    deltaTime = (Date.now() - timeLastFrame)/1000
    timeLastFrame = Date.now()

    // gravity
    //player1.vector[1] += player1.gravity * deltaTime

    boxCollision(player1, player2)
    

    // check if on ground
    //if (player1.y >= 520){
    //    player1.vector[1] = 0
    //    player1.y = 520
    //    player1.inAir = false
    //}

    // player acceleration
    if (keyboard.d && keyboard.shift && player1.vector[0] <  3 && !player1.inAir)   {player1.vector[0] += 30 * deltaTime} // run  right
    else if (keyboard.d && player1.vector[0] <  2)                                  {player1.vector[0] += 20 * deltaTime} // walk ritht
    if (keyboard.a && keyboard.shift && player1.vector[0] > -3 && !player1.inAir)   {player1.vector[0] -= 30 * deltaTime} // run  left
    else if (keyboard.a && player1.vector[0] > -2)                                  {player1.vector[0] -= 20 * deltaTime} // walk left

    if (keyboard.right && keyboard.shift && player2.vector[0] <  3 && !player2.inAir)  {player2.vector[0] += 30 * deltaTime} // run  right
    else if (keyboard.right && player2.vector[0] <  2)                                 {player2.vector[0] += 20 * deltaTime} // walk ritht
    if (keyboard.left && keyboard.shift && player2.vector[0] > -3 && !player2.inAir)   {player2.vector[0] -= 30 * deltaTime} // run  left
    else if (keyboard.left && player2.vector[0] > -2)                                  {player2.vector[0] -= 20 * deltaTime} // walk left

    // ground friction
    //if (player1.y === 520 && player1.vector[1] === 0){
    //    if      (player1.vector[0] <= -0.5 && !keyboard.a)	 {player1.vector[0] += 9 * deltaTime}
    //    else if (player1.vector[0] >=  0.5 && !keyboard.d)   {player1.vector[0] -= 9 * deltaTime}
    //    else if (Math.abs(player1.vector[0]) < 0.5 && !(keyboard.a || keyboard.d))   {player1.vector[0] = 0} // setting horisontal velocity to 0 if low enough to stop idle drifting
    //}

    //air friction
    
    

    // player jump
    //if (keyboard.space && !player1.spaceDown){
    //    player1.vector[1] -= 4
    //    player1.inAir = true
    //}
    //if (keyboard.space) {player1.spaceDown = true}
    //else if (!player1.inAir && !keyboard.space) {player1.spaceDown = false}

    // calculating new position
    player1.x += player1.vector[0]
    player1.y += player1.vector[1]

    player2.x += player2.vector[0]
    player2.y += player2.vector[1]

    rectangle(player1.x, player1.y, player1.width, player1.hight, "red")
    rectangle(player2.x, player2.y, player2.width, player2.hight, "blue")
    //rectangle(0, 600, 1900, 100, "black")
}