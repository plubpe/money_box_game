let Ai_U: Sprite;
let mySprite = sprites.create(assets.image`
    player_D
`, SpriteKind.Player)
controller.moveSprite(mySprite)
tiles.setTilemap(tilemap`
    level1
`)
for (let i = 0; i < 2; i++) {
    Ai_U = Create_Enemy()
    tiles.placeOnRandomTile(Ai_U, sprites.dungeon.collectibleInsignia)
}
Ai_U = sprites.allOfKind(SpriteKind.Enemy)[0]
tiles.placeOnRandomTile(mySprite, assets.image`block`)
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

