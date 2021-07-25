mySprite = sprites.create(assets.image("""
    player_D
"""), SpriteKind.player)
controller.move_sprite(mySprite)
tiles.set_tilemap(tilemap("""
    level1
"""))
tiles.place_on_random_tile(mySprite,assets.image("""block"""))
scene.camera_follow_sprite(mySprite)
laser: Sprite = None

def on_button_released():
    grid.snap(mySprite)
controller.any_button.on_event(ControllerButtonEvent.RELEASED, on_button_released)

def Animate_by_Velocity(sprite: Sprite):
    if mySprite.vx > 0:
        sprites.set_data_string(mySprite, "direction", "R")
        animation.run_image_animation(mySprite,
            assets.animation("""
            player_Animation_R
            """),
            50,
            True)
    elif mySprite.vx < 0:
        sprites.set_data_string(mySprite, "direction", "L")
        animation.run_image_animation(mySprite,
            assets.animation("""
            player_Animation_L
            """),
            50,
            True)
    elif mySprite.vy < 0:
        sprites.set_data_string(mySprite, "direction", "U")
        animation.run_image_animation(mySprite,
            assets.animation("""
            player_Animation_U
            """),
            50,
            True)
    elif mySprite.vy > 0:
        sprites.set_data_string(mySprite, "direction", "D")
        animation.run_image_animation(mySprite,
            assets.animation("""
            player_Animation_D
            """),
            50,
            True)
    else:
        animation.stop_animation(animation.AnimationTypes.ALL, sprite)

def on_update_interval():
    Animate_by_Velocity(mySprite)
game.on_update_interval(250, on_update_interval)

def on_a_pressed():
    global laser
    if sprites.read_data_string(mySprite, "direction") == "U":
        laser = sprites.create_projectile_from_sprite(assets.image("""
        laser_2
        """), mySprite, 0, -100)
    elif sprites.read_data_string(mySprite, "direction") == "D":
        laser = sprites.create_projectile_from_sprite(assets.image("""
        laser_2
        """), mySprite, 0, 100)
    elif sprites.read_data_string(mySprite, "direction") == "L":
        laser = sprites.create_projectile_from_sprite(assets.image("""
        laser
        """), mySprite, -100, 0)
    elif sprites.read_data_string(mySprite, "direction") == "R":
        laser = sprites.create_projectile_from_sprite(assets.image("""
        laser
        """), mySprite, 100, 0)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)