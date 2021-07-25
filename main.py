mySprite = sprites.create(assets.image("""
    player_D
"""), SpriteKind.player)
controller.move_sprite(mySprite)
tiles.set_tilemap(tilemap("""
    level1
"""))
tiles.place_on_random_tile(mySprite,assets.image("""block"""))
scene.camera_follow_sprite(mySprite)

def on_button_released():
    grid.snap(mySprite)
controller.any_button.on_event(ControllerButtonEvent.RELEASED, on_button_released)

def Animate_by_Velocity(sprite: Sprite):
    if sprite.vx > 0:
        sprites.set_data_string(mySprite, "direction", "R")
        animation.run_image_animation(sprite,
            assets.animation("""
            villager2WalkRight
            """),
            100,
            True)
    elif sprite.vx < 0:
        sprites.set_data_string(mySprite, "direction", "L")
        animation.run_image_animation(sprite,
            assets.animation("""
            villager2WalkLeft
            """),
            100,
            True)
    elif sprite.vy < 0:
        sprites.set_data_string(mySprite, "direction", "U")
        animation.run_image_animation(sprite,
            assets.animation("""
            villager2WalkBack
            """),
            100,
            True)
    elif sprite.vy > 0:
        sprites.set_data_string(mySprite, "direction", "D")
        animation.run_image_animation(sprite,
            assets.animation("""
            villager2WalkFront
            """),
            100,
            True)
    else:
        animation.stop_animation(animation.AnimationTypes.ALL, sprite)
