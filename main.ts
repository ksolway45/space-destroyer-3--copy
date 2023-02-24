controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        `, ship, 0, -140)
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mysprite2, 0, -135)
    projectile.startEffect(effects.coolRadial, 150)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        `, ship, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
info.onScore(15, function () {
    mysprite2 = sprites.create(assets.image`myImage`, SpriteKind.Player)
    mysprite2.follow(ship, 100)
    mysprite2.sayText("hi need help", 200, true)
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverScoringType(game.ScoringType.HighScore)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.hearts)
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.smiles)
    sprite.startEffect(effects.smiles, 200)
    info.changeLifeBy(-1)
})
let mysprite2: Sprite = null
let projectile: Sprite = null
let ship: Sprite = null
game.splash("Kill the Aliens!", "Press A to Start")
let asteroids = [sprites.space.spaceAsteroid4, sprites.space.spaceAsteroid2]
ship = sprites.create(sprites.space.spaceGreenShip, SpriteKind.Player)
ship.setStayInScreen(true)
ship.bottom = 120
controller.moveSprite(ship, 100, 100)
info.setLife(3)
effects.starField.startScreenEffect()
game.onUpdateInterval(5000, function () {
    projectile = sprites.create(img`
        . 6 . . . . . . . . . . . . 6 . 
        6 9 6 . . . . . . . . . . 6 9 6 
        . 6 . . . . . . . . . . . . 6 . 
        . 6 . . . . . . . . . . . . 6 . 
        . 6 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
        . 6 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
        9 6 9 1 1 1 9 9 9 9 1 1 1 9 6 9 
        9 6 9 1 1 f 9 9 9 9 1 f 1 9 6 9 
        9 6 9 1 f f 9 9 9 9 f f 1 9 6 9 
        9 6 9 9 9 9 9 9 9 9 9 9 9 9 6 9 
        . 6 9 9 6 1 1 1 1 1 1 6 9 9 6 . 
        . . 9 9 9 6 6 6 6 6 6 9 9 9 . . 
        . . 9 9 9 9 9 9 9 9 9 9 9 9 . . 
        `, SpriteKind.Enemy)
    projectile.setPosition(randint(15, 155), 1)
    projectile.vy = randint(150, 75)
})
game.onUpdateInterval(2000, function () {
    projectile = sprites.create(img`
        . 7 7 . . . . . 7 7 . 
        . . 2 2 . . . . 2 7 . 
        . . 2 2 2 . . . 2 7 . 
        . . a 2 2 2 2 2 a . . 
        . . a a 2 2 2 a a . . 
        . a a a 2 2 2 a 2 . . 
        . 2 2 2 a 2 a 2 2 2 . 
        . a a 2 2 a 2 2 a a . 
        2 1 1 9 2 2 2 9 1 1 2 
        2 2 1 8 1 7 1 8 1 2 2 
        a 2 2 8 2 2 2 8 2 2 a 
        a a 2 2 2 a 2 2 2 a a 
        2 2 2 1 2 1 2 1 2 2 2 
        . 2 1 2 1 2 1 2 1 2 . 
        . . 2 2 2 2 2 2 2 . . 
        . . . 2 a a a 2 . . . 
        `, SpriteKind.Enemy)
    projectile.setPosition(randint(15, 155), 1)
    projectile.vy = randint(150, 75)
})
game.onUpdateInterval(1000, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
game.onUpdateInterval(4500, function () {
    projectile = sprites.create(img`
        . . . . 3 . . . . . . . . . . 
        . . . . . 3 3 . . 3 . . . . . 
        . . . . . . 3 3 3 . . . . . . 
        . . . . 8 8 8 8 8 8 8 . . . . 
        . . 8 8 8 8 8 8 8 8 8 8 8 . . 
        . 3 3 3 3 8 8 8 8 8 3 3 3 3 . 
        3 9 9 9 9 3 8 8 8 3 9 9 9 9 3 
        9 c c 8 8 9 3 8 3 9 8 8 c c 9 
        c 8 8 1 1 8 9 3 9 8 1 1 8 8 c 
        a 8 1 9 f 1 8 9 8 1 9 f 1 8 a 
        a 8 1 f f 1 8 c 8 1 f f 1 8 a 
        a a 8 1 1 8 c 9 c 8 1 1 8 a a 
        a a a 8 8 a a a a a 8 8 a a a 
        a a a a a a a a a a a a a a a 
        8 a 8 a 8 a 8 a 8 a 8 a 8 a 8 
        . 8 . 8 . 8 . 8 . 8 . 8 . 8 . 
        `, SpriteKind.Enemy)
    projectile.setPosition(randint(15, 155), 1)
    projectile.vy = randint(150, 75)
})
