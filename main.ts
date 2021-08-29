let Ai_U: Sprite;
namespace SpriteKind {
    export const Block = SpriteKind.create()
}

let mySprite = sprites.create(assets.image`player_D`, SpriteKind.Player)
controller.moveSprite(mySprite)
tiles.setTilemap(tilemap`level1`)
tiles.placeOnTile(null, tiles.getTileLocation(0, 0))
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
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    sprites.setDataString(mySprite, "direction", "L")
    animation.runImageAnimation(mySprite, assets.animation`player_Animation_L`, 100, true)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    sprites.setDataString(mySprite, "direction", "R")
    animation.runImageAnimation(mySprite, assets.animation`player_Animation_R`, 100, true)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    sprites.setDataString(mySprite, "direction", "U")
    animation.runImageAnimation(mySprite, assets.animation`player_Animation_U`, 100, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    sprites.setDataString(mySprite, "direction", "D")
    animation.runImageAnimation(mySprite, assets.animation`player_Animation_D`, 100, true)
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
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_on_overlap2(sprite2: Sprite, otherSprite2: Sprite) {
    otherSprite2.destroy()
    let GPS = tiles.locationOfSprite(otherSprite2)
    tiles.setTileAt(GPS, assets.tile`block1`)
    tiles.setWallAt(GPS, true)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    let block: Sprite;
    let GPS2 = tiles.locationOfSprite(mySprite)
    let kick_loc = tiles.locationInDirection(GPS2, CollisionDirection.Left)
    let kick_loc2 = tiles.locationInDirection(GPS2, CollisionDirection.Right)
    let kick_loc3 = tiles.locationInDirection(GPS2, CollisionDirection.Top)
    let kick_loc4 = tiles.locationInDirection(GPS2, CollisionDirection.Bottom)
    if (tiles.tileAtLocationEquals(kick_loc, assets.tile`block1`)) {
        animation.runImageAnimation(mySprite, assets.animation`
                    player_Animation_L
                    `, 100, true)
        tiles.setTileAt(kick_loc, assets.tile`block0`)
        tiles.setWallAt(kick_loc, false)
        block = sprites.createProjectileFromSprite(assets.tile`block1`, mySprite, -100, 0)
        block.setKind(SpriteKind.Block)
    } else if (tiles.tileAtLocationEquals(kick_loc2, assets.tile`block1`)) {
        animation.runImageAnimation(mySprite, assets.animation`
                    player_Animation_kick_R
                    `, 100, true)
        tiles.setTileAt(kick_loc2, assets.tile`block0`)
        tiles.setWallAt(kick_loc2, false)
        block = sprites.createProjectileFromSprite(assets.tile`block1`, mySprite, 100, 0)
        block.setKind(SpriteKind.Block)
    } else if (tiles.tileAtLocationEquals(kick_loc3, assets.tile`block1`)) {
        animation.runImageAnimation(mySprite, assets.animation`
                    player_Animation_kick_U
                    `, 100, true)
        tiles.setTileAt(kick_loc3, assets.tile`block0`)
        tiles.setWallAt(kick_loc3, false)
        block = sprites.createProjectileFromSprite(assets.tile`block1`, mySprite, 0, -100)
        block.setKind(SpriteKind.Block)
    } else if (tiles.tileAtLocationEquals(kick_loc4, assets.tile`block1`)) {
        animation.runImageAnimation(mySprite, assets.animation`
                    player_Animation_kick_D
                    `, 100, true)
        tiles.setTileAt(kick_loc4, assets.tile`block0`)
        tiles.setWallAt(kick_loc4, false)
        block = sprites.createProjectileFromSprite(assets.tile`block1`, mySprite, 0, 100)
        block.setKind(SpriteKind.Block)
    }
    
})
game.onUpdateInterval(1000, function on_update_spawn_enemy() {
    let Ai_U: Sprite;
    let E = sprites.allOfKind(SpriteKind.Enemy).length
    if (E < 2) {
        Ai_U = Create_Enemy()
        tiles.placeOnRandomTile(Ai_U, sprites.dungeon.collectibleInsignia)
    }
    
})
game.onUpdateInterval(100, function on_update_Detect_Wall_block() {
    for (let value of sprites.allOfKind(SpriteKind.Block)) {
        Detect_Wall_block(value)
    }
})
function Detect_Wall_block(Sprite2: Sprite) {
    let GPS3 = tiles.locationOfSprite(Sprite2)
    let GPS4 = tiles.locationInDirection(GPS3, CollisionDirection.Left)
    let GPS5 = tiles.locationInDirection(GPS3, CollisionDirection.Right)
    let GPS6 = tiles.locationInDirection(GPS3, CollisionDirection.Top)
    let GPS7 = tiles.locationInDirection(GPS3, CollisionDirection.Bottom)
    if (tiles.tileIsWall(GPS4) && tiles.tileIs(GPS4, assets.tile`lava`) && Sprite2.vx < 0) {
        tiles.setTileAt(GPS4, assets.tile`block0`)
        tiles.setWallAt(GPS4, false)
        Sprite2.destroy()
    } else if (tiles.tileIsWall(GPS5) && tiles.tileIs(GPS5, assets.tile`lava`) && Sprite2.vx > 0) {
        tiles.setTileAt(GPS5, assets.tile`block0`)
        tiles.setWallAt(GPS5, false)
        Sprite2.destroy()
    } else if (tiles.tileIsWall(GPS6) && tiles.tileIs(GPS6, assets.tile`lava`) && Sprite2.vy < 0) {
        tiles.setTileAt(GPS6, assets.tile`block0`)
        tiles.setWallAt(GPS6, false)
        Sprite2.destroy()
    } else if (tiles.tileIsWall(GPS7) && tiles.tileIs(GPS7, assets.tile`lava`) && Sprite2.vy > 0) {
        tiles.setTileAt(GPS7, assets.tile`block0`)
        tiles.setWallAt(GPS7, false)
        Sprite2.destroy()
    }
    
}

