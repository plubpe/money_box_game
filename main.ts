let Ai_U: Sprite;
let mySprite = sprites.create(assets.image`
    player_D
`, SpriteKind.Player)
controller.moveSprite(mySprite)
tiles.setTilemap(tilemap`level1`)
let path : tiles.Location[] = []
let distance = 0
for (let i = 0; i < 2; i++) {
    Ai_U = Create_Enemy()
    tiles.placeOnRandomTile(Ai_U, sprites.dungeon.collectibleInsignia)
}
tiles.placeOnRandomTile(mySprite, assets.tile`block`)
scene.cameraFollowSprite(mySprite)
let laser : Sprite = null
controller.anyButton.onEvent(ControllerButtonEvent.Released, function on_button_released() {
    grid.snap(mySprite)
})
function Animate_by_Velocity(sprite: Sprite) {
    if (mySprite.vx > 0) {
        sprites.setDataString(mySprite, "direction", "R")
        animation.runImageAnimation(mySprite, assets.animation`
            player_Animation_R
            `, 50, true)
    } else if (mySprite.vx < 0) {
        sprites.setDataString(mySprite, "direction", "L")
        animation.runImageAnimation(mySprite, assets.animation`
            player_Animation_L
            `, 50, true)
    } else if (mySprite.vy < 0) {
        sprites.setDataString(mySprite, "direction", "U")
        animation.runImageAnimation(mySprite, assets.animation`
            player_Animation_U
            `, 50, true)
    } else if (mySprite.vy > 0) {
        sprites.setDataString(mySprite, "direction", "D")
        animation.runImageAnimation(mySprite, assets.animation`
            player_Animation_D
            `, 50, true)
    } else {
        animation.stopAnimation(animation.AnimationTypes.All, sprite)
    }
    
}

game.onUpdateInterval(250, function on_update_interval() {
    Animate_by_Velocity(mySprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    if (sprites.readDataString(mySprite, "direction") == "U") {
        laser = sprites.createProjectileFromSprite(assets.image`
        laser_2
        `, mySprite, 0, -100)
    } else if (sprites.readDataString(mySprite, "direction") == "D") {
        laser = sprites.createProjectileFromSprite(assets.image`
        laser_2
        `, mySprite, 0, 100)
    } else if (sprites.readDataString(mySprite, "direction") == "L") {
        laser = sprites.createProjectileFromSprite(assets.image`
        laser
        `, mySprite, -100, 0)
    } else if (sprites.readDataString(mySprite, "direction") == "R") {
        laser = sprites.createProjectileFromSprite(assets.image`
        laser
        `, mySprite, 100, 0)
    }
    
})
function Create_Enemy(): Sprite {
    
    Ai_U = sprites.create(assets.image`Ai_U`, SpriteKind.Enemy)
    sprites.setDataString(Ai_U, "direction", "L")
    return Ai_U
}

function on_update_enemy_move() {
    
    grid.snap(mySprite)
    for (let e of sprites.allOfKind(SpriteKind.Enemy)) {
        path = scene.aStar(tiles.locationOfSprite(e), tiles.locationOfSprite(mySprite))
        console.log(path)
        console.log(tiles.locationOfSprite(e))
        if (path != null) {
            distance = path.length - 1
            console.log(distance)
            if (distance <= 5) {
                scene.followPath(e, path)
            }
            
        }
        
    }
}

// game.on_update_interval(500, on_update_enemy_move)
function Detect_Wall(Sprite2: Sprite, Ai2: number) {
    if (Ai2 == 1) {
        if (Sprite2.isHittingTile(CollisionDirection.Left)) {
            sprites.setDataString(Sprite2, "direction", "U")
        } else if (Sprite2.isHittingTile(CollisionDirection.Right)) {
            sprites.setDataString(Sprite2, "direction", "U")
        } else if (Sprite2.isHittingTile(CollisionDirection.Top)) {
            sprites.setDataString(Sprite2, "direction", "U")
        } else if (Sprite2.isHittingTile(CollisionDirection.Bottom)) {
            sprites.setDataString(Sprite2, "direction", "U")
        }
        
    } else if (Ai2 == 2) {
        if (Sprite2.isHittingTile(CollisionDirection.Left)) {
            sprites.setDataString(Sprite2, "direction", "D")
        } else if (Sprite2.isHittingTile(CollisionDirection.Right)) {
            sprites.setDataString(Sprite2, "direction", "D")
        } else if (Sprite2.isHittingTile(CollisionDirection.Top)) {
            sprites.setDataString(Sprite2, "direction", "D")
        } else if (Sprite2.isHittingTile(CollisionDirection.Bottom)) {
            sprites.setDataString(Sprite2, "direction", "D")
        }
        
    } else if (Ai2 == 3) {
        if (Sprite2.isHittingTile(CollisionDirection.Left)) {
            sprites.setDataString(Sprite2, "direction", "R")
        } else if (Sprite2.isHittingTile(CollisionDirection.Right)) {
            sprites.setDataString(Sprite2, "direction", "R")
        } else if (Sprite2.isHittingTile(CollisionDirection.Top)) {
            sprites.setDataString(Sprite2, "direction", "R")
        } else if (Sprite2.isHittingTile(CollisionDirection.Bottom)) {
            sprites.setDataString(Sprite2, "direction", "R")
        }
        
    } else if (Ai2 == 4) {
        if (Sprite2.isHittingTile(CollisionDirection.Left)) {
            sprites.setDataString(Sprite2, "direction", "L")
        } else if (Sprite2.isHittingTile(CollisionDirection.Right)) {
            sprites.setDataString(Sprite2, "direction", "L")
        } else if (Sprite2.isHittingTile(CollisionDirection.Top)) {
            sprites.setDataString(Sprite2, "direction", "L")
        } else if (Sprite2.isHittingTile(CollisionDirection.Bottom)) {
            sprites.setDataString(Sprite2, "direction", "L")
        }
        
    }
    
}

function Move_by_Facing(Sprite2: Sprite) {
    if (sprites.readDataString(Sprite2, "direction") == "L") {
        Sprite2.vx = -20
        Sprite2.vy = 0
    } else if (sprites.readDataString(Sprite2, "direction") == "R") {
        Sprite2.vx = 20
        Sprite2.vy = 0
    } else if (sprites.readDataString(Sprite2, "direction") == "U") {
        Sprite2.vx = 0
        Sprite2.vy = -20
    } else if (sprites.readDataString(Sprite2, "direction") == "D") {
        Sprite2.vx = 0
        Sprite2.vy = 20
    }
    
}

game.onUpdate(function on_on_update() {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        Detect_Wall(value, randint(1, 5))
        Move_by_Facing(value)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    game.over(false)
})
