// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`1100110001010101010101010101010101010101010102020202020202020202020202020201010202020202020202020202020202020101020202020202020302020202020202010102020202020203030302020202020201010202020202020202020202020202020101020203030303030303030303030202010102030303030303030303030303030201010202020202020202020202020202020101020303030303030303030303030302010102020303030303030303030303020201010202020403050303030503040202020101020202020303030303030302020202010102020202020303030303020202020201010202020202020303030202020202020101020202020202020302020202020202010101010101010101010101010101010101`, img`
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.dungeon.hazardLava1,sprites.dungeon.hazardLava0,sprites.dungeon.floorLight2,sprites.dungeon.collectibleInsignia,sprites.castle.rock0], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
