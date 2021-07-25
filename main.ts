let mySprite = sprites.create(assets.image`
    player_D
`, SpriteKind.Player)
controller.moveSprite(mySprite)
tiles.setTilemap(tilemap`
    level1
`)
tiles.placeOnRandomTile(mySprite, assets.image`block`)
scene.cameraFollowSprite(mySprite)
controller.anyButton.onEvent(ControllerButtonEvent.Released, function on_button_released() {
    grid.snap(mySprite)
})
function Animate_by_Velocity(sprite: Sprite) {
    if (sprite.vx > 0) {
        sprites.setDataString(mySprite, "direction", "R")
        animation.runImageAnimation(sprite, assets.animation`
            villager2WalkRight
            `, 100, true)
    } else if (sprite.vx < 0) {
        sprites.setDataString(mySprite, "direction", "L")
        animation.runImageAnimation(sprite, assets.animation`
            villager2WalkLeft
            `, 100, true)
    } else if (sprite.vy < 0) {
        sprites.setDataString(mySprite, "direction", "U")
        animation.runImageAnimation(sprite, assets.animation`
            villager2WalkBack
            `, 100, true)
    } else if (sprite.vy > 0) {
        sprites.setDataString(mySprite, "direction", "D")
        animation.runImageAnimation(sprite, assets.animation`
            villager2WalkFront
            `, 100, true)
    } else {
        animation.stopAnimation(animation.AnimationTypes.All, sprite)
    }
    
}

