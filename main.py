@namespace
class SpriteKind:
    Block = SpriteKind.create()

abc = 0
mySprite = sprites.create(assets.image("""player_D"""), SpriteKind.player)
controller.move_sprite(mySprite)
scene.camera_follow_sprite(mySprite)
laser: Sprite = None
Ai_U: Sprite = None
path = None
distance = 0
info.start_countdown(100)

create_a_scene()

def create_a_scene():
    tiles.set_tilemap(tilemap("""level1"""))
    box1 = sprites.create(assets.image("""box"""), SpriteKind.food)
    box2 = sprites.create(assets.image("""box"""), SpriteKind.food)
    box3 = sprites.create(assets.image("""box"""), SpriteKind.food)
    tiles.place_on_tile(box1, tiles.get_tile_location(7, 4))
    tiles.place_on_tile(box2, tiles.get_tile_location(8, 4))
    tiles.place_on_tile(box3, tiles.get_tile_location(9, 4))
    animation.run_image_animation(box1, assets.animation("""Box_Animation"""),
                    200,
                    True)
    animation.run_image_animation(box2, assets.animation("""Box_Animation"""),
                    200,
                    True)
    animation.run_image_animation(box3, assets.animation("""Box_Animation"""),
                    200,
                    True)
    path: List[tiles.Location] = []
    distance =0
    for i in range(2):
        Ai_U = Create_Enemy()
        tiles.place_on_random_tile(Ai_U, sprites.dungeon.collectible_insignia)
    tiles.place_on_random_tile(mySprite,assets.tile("""block"""))

def create_a_scene_2():
    potion1 = sprites.create(assets.image("""potion"""), SpriteKind.food)
    potion2 = sprites.create(assets.image("""potion"""), SpriteKind.food)
    potion3 = sprites.create(assets.image("""potion"""), SpriteKind.food)
    tiles.set_tilemap(tilemap("""level5"""))
    box1 = sprites.create(assets.image("""box"""), SpriteKind.food)
    box2 = sprites.create(assets.image("""box"""), SpriteKind.food)
    tiles.place_on_tile(box1, tiles.get_tile_location(7, 6))
    tiles.place_on_tile(box2, tiles.get_tile_location(9, 6))
    tiles.place_on_tile(potion1, tiles.get_tile_location(6, 8))
    tiles.place_on_tile(potion2, tiles.get_tile_location(8, 8))
    tiles.place_on_tile(potion3, tiles.get_tile_location(10, 8))
    animation.run_image_animation(box1, assets.animation("""Box_Animation"""),
                    200,
                    True)
    animation.run_image_animation(box2, assets.animation("""Box_Animation"""),
                    200,
                    True)
    path: List[tiles.Location] = []
    distance =0
    for i in range(2):
        Ai_U = Create_Enemy()
        tiles.place_on_random_tile(Ai_U, sprites.dungeon.collectible_insignia)
    tiles.place_on_random_tile(mySprite,assets.tile("""block"""))

def on_button_released():
    grid.snap(mySprite)
    animation.stop_animation(animation.AnimationTypes.ALL, mySprite)
controller.any_button.on_event(ControllerButtonEvent.RELEASED, on_button_released)

def on_left_pressed():
    sprites.set_data_string(mySprite, "direction", "L")
    animation.run_image_animation(mySprite,
        assets.animation("""player_Animation_L"""),
        100,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    sprites.set_data_string(mySprite, "direction", "R")
    animation.run_image_animation(mySprite,
        assets.animation("""player_Animation_R"""),
        100,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_up_pressed():
    sprites.set_data_string(mySprite, "direction", "U")
    animation.run_image_animation(mySprite,
        assets.animation("""player_Animation_U"""),
        100,
        True)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_down_pressed():
    sprites.set_data_string(mySprite, "direction", "D")
    animation.run_image_animation(mySprite,
        assets.animation("""player_Animation_D"""),
        100,
        True)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

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

def Detect_Wall(Sprite2: Sprite, Ai2: number):
    if Ai2 == 1:
        if Sprite2.is_hitting_tile(CollisionDirection.LEFT):
            sprites.set_data_string(Sprite2, "direction", "U")
        elif Sprite2.is_hitting_tile(CollisionDirection.RIGHT):
            sprites.set_data_string(Sprite2, "direction", "U")
        elif Sprite2.is_hitting_tile(CollisionDirection.TOP):
            sprites.set_data_string(Sprite2, "direction", "U")
        elif Sprite2.is_hitting_tile(CollisionDirection.BOTTOM):
            sprites.set_data_string(Sprite2, "direction", "U")
    elif Ai2 == 2:
        if Sprite2.is_hitting_tile(CollisionDirection.LEFT):
            sprites.set_data_string(Sprite2, "direction", "D")
        elif Sprite2.is_hitting_tile(CollisionDirection.RIGHT):
            sprites.set_data_string(Sprite2, "direction", "D")
        elif Sprite2.is_hitting_tile(CollisionDirection.TOP):
            sprites.set_data_string(Sprite2, "direction", "D")
        elif Sprite2.is_hitting_tile(CollisionDirection.BOTTOM):
            sprites.set_data_string(Sprite2, "direction", "D")
    elif Ai2 == 3:
        if Sprite2.is_hitting_tile(CollisionDirection.LEFT):
            sprites.set_data_string(Sprite2, "direction", "R")
        elif Sprite2.is_hitting_tile(CollisionDirection.RIGHT):
            sprites.set_data_string(Sprite2, "direction", "R")
        elif Sprite2.is_hitting_tile(CollisionDirection.TOP):
            sprites.set_data_string(Sprite2, "direction", "R")
        elif Sprite2.is_hitting_tile(CollisionDirection.BOTTOM):
            sprites.set_data_string(Sprite2, "direction", "R")
    elif Ai2 == 4:
        if Sprite2.is_hitting_tile(CollisionDirection.LEFT):
            sprites.set_data_string(Sprite2, "direction", "L")
        elif Sprite2.is_hitting_tile(CollisionDirection.RIGHT):
            sprites.set_data_string(Sprite2, "direction", "L")
        elif Sprite2.is_hitting_tile(CollisionDirection.TOP):
            sprites.set_data_string(Sprite2, "direction", "L")
        elif Sprite2.is_hitting_tile(CollisionDirection.BOTTOM):
            sprites.set_data_string(Sprite2, "direction", "L")

def Move_by_Facing(Sprite2: Sprite):
    if sprites.read_data_string(Sprite2, "direction") == "L":
        Sprite2.vx = -20
        Sprite2.vy = 0
    elif sprites.read_data_string(Sprite2, "direction") == "R":
        Sprite2.vx = 20
        Sprite2.vy = 0
    elif sprites.read_data_string(Sprite2, "direction") == "U":
        Sprite2.vx = 0
        Sprite2.vy = -20
    elif sprites.read_data_string(Sprite2, "direction") == "D":
        Sprite2.vx = 0
        Sprite2.vy = 20

def on_on_update():
    for value in sprites.all_of_kind(SpriteKind.enemy):
        Detect_Wall(value, randint(1, 5))
        Move_by_Facing(value)
game.on_update(on_on_update)

def on_on_overlap(sprite, otherSprite):
    game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    otherSprite2.destroy()
    GPS=tiles.location_of_sprite(otherSprite2)
    tiles.set_tile_at(GPS,assets.tile("""block1"""))
    tiles.set_wall_at(GPS, True)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap2)

def on_b_pressed():
    GPS2=tiles.location_of_sprite(mySprite)
    kick_loc = tiles.location_in_direction(GPS2, CollisionDirection.LEFT)
    kick_loc2 = tiles.location_in_direction(GPS2, CollisionDirection.RIGHT)
    kick_loc3 = tiles.location_in_direction(GPS2, CollisionDirection.TOP)
    kick_loc4 = tiles.location_in_direction(GPS2, CollisionDirection.BOTTOM)
    

    if tiles.tile_at_location_equals(kick_loc,assets.tile("""block1""")):
        animation.run_image_animation(mySprite,
                    assets.animation("""
                    player_Animation_L
                    """),
                    100,
                    True)
        tiles.set_tile_at(kick_loc,assets.tile("""block0"""))
        tiles.set_wall_at(kick_loc, False)
        block = sprites.create_projectile_from_sprite(assets.tile("""block1"""), mySprite, -100, 0)
        block.set_kind(SpriteKind.Block)
    elif tiles.tile_at_location_equals(kick_loc2,assets.tile("""block1""")):
        animation.run_image_animation(mySprite,
                    assets.animation("""
                    player_Animation_kick_R
                    """),
                    100,
                    True)
        tiles.set_tile_at(kick_loc2,assets.tile("""block0"""))
        tiles.set_wall_at(kick_loc2, False)
        block = sprites.create_projectile_from_sprite(assets.tile("""block1"""), mySprite, 100, 0)
        block.set_kind(SpriteKind.Block)
    elif tiles.tile_at_location_equals(kick_loc3,assets.tile("""block1""")):
        animation.run_image_animation(mySprite,
                    assets.animation("""
                    player_Animation_kick_U
                    """),
                    100,
                    True)
        tiles.set_tile_at(kick_loc3,assets.tile("""block0"""))
        tiles.set_wall_at(kick_loc3, False)
        block = sprites.create_projectile_from_sprite(assets.tile("""block1"""), mySprite, 0, -100)
        block.set_kind(SpriteKind.Block)
    elif tiles.tile_at_location_equals(kick_loc4,assets.tile("""block1""")):
        animation.run_image_animation(mySprite,
                    assets.animation("""
                    player_Animation_kick_D
                    """),
                    100,
                    True)
        tiles.set_tile_at(kick_loc4,assets.tile("""block0"""))
        tiles.set_wall_at(kick_loc4, False)
        block = sprites.create_projectile_from_sprite(assets.tile("""block1"""), mySprite, 0, 100)
        block.set_kind(SpriteKind.Block)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_update_spawn_enemy():
    E = len(sprites.all_of_kind(SpriteKind.enemy))
    if E < 2:
        Ai_U = Create_Enemy()
        tiles.place_on_random_tile(Ai_U, sprites.dungeon.collectible_insignia)
game.on_update_interval(1000, on_update_spawn_enemy)

def on_update_Detect_Wall_block():
    for value in sprites.all_of_kind(SpriteKind.Block):
        Detect_Wall_block(value)
game.on_update_interval(100, on_update_Detect_Wall_block)

def Detect_Wall_block(Sprite2: Sprite):
    GPS3 = tiles.location_of_sprite(Sprite2)
    GPS4 = tiles.location_in_direction(GPS3, CollisionDirection.LEFT)
    GPS5 = tiles.location_in_direction(GPS3, CollisionDirection.RIGHT)
    GPS6 = tiles.location_in_direction(GPS3, CollisionDirection.TOP)
    GPS7 = tiles.location_in_direction(GPS3, CollisionDirection.BOTTOM)
    if tiles.tile_is_wall(GPS4) and tiles.tile_is(GPS4,assets.tile("""lava""")) and Sprite2.vx < 0:
        tiles.set_tile_at(GPS4,assets.tile("""block0"""))
        tiles.set_wall_at(GPS4, False)
        Sprite2.destroy()
    elif tiles.tile_is_wall(GPS5) and tiles.tile_is(GPS5,assets.tile("""lava""")) and Sprite2.vx > 0:
        tiles.set_tile_at(GPS5,assets.tile("""block0"""))
        tiles.set_wall_at(GPS5, False)
        Sprite2.destroy()
    elif tiles.tile_is_wall(GPS6) and tiles.tile_is(GPS6,assets.tile("""lava""")) and Sprite2.vy < 0:
        tiles.set_tile_at(GPS6,assets.tile("""block0"""))
        tiles.set_wall_at(GPS6, False)
        Sprite2.destroy()
    elif tiles.tile_is_wall(GPS7) and tiles.tile_is(GPS7,assets.tile("""lava""")) and Sprite2.vy > 0:
        tiles.set_tile_at(GPS7,assets.tile("""block0"""))
        tiles.set_wall_at(GPS7, False)
        Sprite2.destroy()

def on_overlap_food(sprite, otherSprite):
    global abc
    otherSprite.destroy()
    abc = abc+1
    if abc == 3 :
        for e in sprites.all_of_kind(SpriteKind.enemy):
            e.destroy()
        create_a_scene_2()
    elif abc == 8 :
        game.over(True)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_overlap_food)
