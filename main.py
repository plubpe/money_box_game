mySprite = sprites.create(assets.image("""
    player_D
"""), SpriteKind.player)
controller.move_sprite(mySprite)
tiles.set_tilemap(tilemap("""level1"""))
path: List[tiles.Location] = []
distance =0
for i in range(2):
    Ai_U = Create_Enemy()
    tiles.place_on_random_tile(Ai_U, sprites.dungeon.collectible_insignia)
tiles.place_on_random_tile(mySprite,assets.tile("""block"""))
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

def Create_Enemy():
    global Ai_U
    Ai_U = sprites.create(assets.image("""Ai_U"""),SpriteKind.enemy)
    sprites.set_data_string(Ai_U, "direction", "L")
    return Ai_U

def on_update_enemy_move():
    global path, distance
    grid.snap(mySprite)
    for e in sprites.all_of_kind(SpriteKind.enemy):
       path = scene.a_star(tiles.location_of_sprite(e),tiles.location_of_sprite(mySprite))
       print(path)
       print(tiles.location_of_sprite(e))
       if path != None :
         distance = len(path) - 1
         print(distance)
         if distance <= 5:
            scene.follow_path(e, path)
#game.on_update_interval(500, on_update_enemy_move)


def Detect_Wall(Sprite2: Sprite, B2: number):
    if B2 == 1:
        if Sprite2.is_hitting_tile(CollisionDirection.LEFT):
            sprites.set_data_string(Sprite2, "direction", "U")
        elif Sprite2.is_hitting_tile(CollisionDirection.RIGHT):
            sprites.set_data_string(Sprite2, "direction", "U")
        elif Sprite2.is_hitting_tile(CollisionDirection.TOP):
            sprites.set_data_string(Sprite2, "direction", "U")
        elif Sprite2.is_hitting_tile(CollisionDirection.BOTTOM):
            sprites.set_data_string(Sprite2, "direction", "U")
    elif B2 == 2:
        if Sprite2.is_hitting_tile(CollisionDirection.LEFT):
            sprites.set_data_string(Sprite2, "direction", "D")
        elif Sprite2.is_hitting_tile(CollisionDirection.RIGHT):
            sprites.set_data_string(Sprite2, "direction", "D")
        elif Sprite2.is_hitting_tile(CollisionDirection.TOP):
            sprites.set_data_string(Sprite2, "direction", "D")
        elif Sprite2.is_hitting_tile(CollisionDirection.BOTTOM):
            sprites.set_data_string(Sprite2, "direction", "D")
    elif B2 == 3:
        if Sprite2.is_hitting_tile(CollisionDirection.LEFT):
            sprites.set_data_string(Sprite2, "direction", "R")
        elif Sprite2.is_hitting_tile(CollisionDirection.RIGHT):
            sprites.set_data_string(Sprite2, "direction", "R")
        elif Sprite2.is_hitting_tile(CollisionDirection.TOP):
            sprites.set_data_string(Sprite2, "direction", "R")
        elif Sprite2.is_hitting_tile(CollisionDirection.BOTTOM):
            sprites.set_data_string(Sprite2, "direction", "R")
    elif B2 == 4:
        if Sprite2.is_hitting_tile(CollisionDirection.LEFT):
            sprites.set_data_string(Sprite2, "direction", "L")
        elif Sprite2.is_hitting_tile(CollisionDirection.RIGHT):
            sprites.set_data_string(Sprite2, "direction", "L")
        elif Sprite2.is_hitting_tile(CollisionDirection.TOP):
            sprites.set_data_string(Sprite2, "direction", "L")
        elif Sprite2.is_hitting_tile(CollisionDirection.BOTTOM):
            sprites.set_data_string(Sprite2, "direction", "L")

def Create_covid19():
    global b1
    b1 = sprites.create(assets.image("""
    myImage0
    """), SpriteKind.enemy)
    sprites.set_data_string(b1, "direction", "L")
    return b1