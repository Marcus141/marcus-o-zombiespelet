let timeLastFrame = Date.now()
let deltaTime = 0


// Player info
class Player{
    constructor(){
        this.dimentions = [40, 80]
        this.vector = [0, 0]
        this.position = [400, 520]
        this.gravity = 10
        this.inAir = false
        this.spaceDown = false
    }
}

let player1 = new Player()

function update(){
    clearScreen()

    // Calculationg delta time
    deltaTime = (Date.now() - timeLastFrame)/1000
    timeLastFrame = Date.now()

    // gravity
    player1.vector[1] += player1.gravity * deltaTime
    

    // check if on ground
    if (player1.position[1] >= 520){
        player1.vector[1] = 0
        player1.position[1] = 520
        player1.inAir = false
    }

    // player acceleration
    if (keyboard.d && keyboard.shift && player1.vector[0] <  4.5 && !player1.inAir)   {player1.vector[0] += 40 * deltaTime} // run  right
    else if (keyboard.d && player1.vector[0] <  3)                                    {player1.vector[0] += 30 * deltaTime} // walk ritht
    if (keyboard.a && keyboard.shift && player1.vector[0] > -4.5 && !player1.inAir)   {player1.vector[0] -= 40 * deltaTime} // run  left
    else if (keyboard.a && player1.vector[0] > -3)                                    {player1.vector[0] -= 30 * deltaTime} // walk left

    // ground friction
    if (player1.position[1] === 520 && player1.vector[1] === 0){
        if      (player1.vector[0] <= -0.5 && !keyboard.a)	 {player1.vector[0] += 6 * deltaTime}
        else if (player1.vector[0] >=  0.5 && !keyboard.d)   {player1.vector[0] -= 6 * deltaTime}
        else if (Math.abs(player1.vector[0]) < 0.5 && !(keyboard.a || keyboard.d))   {player1.vector[0] = 0} // setting horisontal velocity to 0 if low enough to stop idle drifting
    }
    

    // player jump
    if (keyboard.space && !player1.spaceDown){
        player1.vector[1] -= 400 * deltaTime
        player1.inAir = true
    }
    if (keyboard.space) {player1.spaceDown = true}
    else if (!player1.inAir && !keyboard.space) {player1.spaceDown = false}

    player1.position[0] += player1.vector[0]
    player1.position[1] += player1.vector[1]

    rectangle(player1.position[0], player1.position[1], player1.dimentions[0], player1.dimentions[1], "red")
    rectangle(0, 600, 1900, 100, "black")
}