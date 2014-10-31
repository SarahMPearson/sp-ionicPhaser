'use strict';
var game = new Phaser.Game(580, 320, Phaser.CANVAS, '', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', 'assets/ionicPhaser.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('mario', 'assets/super_mario.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('coin', 'assets/coin.png', 32, 32);

  game.scale.pageAlignHorizontally  = true;
  game.scale.pageAlignVertically    = true;

  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.refresh();
}

var map, background, clouds, ground, money, dude;

function create(){

  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');
  map.addTilesetImage('Mario', 'mario');

  // **** BRINGS IN THE LAYERS ***** ///
  background = map.createLayer('Background');
  clouds = map.createLayer('clouds');
  ground = map.createLayer('Ground');
  background.resizeWorld(); ///RESIZES SO IT FITS YOUR WINDOW

  map.setCollision(15, true, 'Ground');

  money = game.add.group();
  money.enableBody = true;
  money.physicsBodyType = Phaser.Physics.ARCADE;
  /// says what layer are you pulling from 'Money', what is the ID (gid in json, what spritesheet, which frame in the array, does it exsist, name of group)
  map.createFromObjects('Coins', 45, 'coin', 0, true, false, money);
  money.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
  money.callAll('animations.play', 'animations', 'spin');

  dude = game.add.sprite(0,0, 'dude');
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  game.physics.arcade.enable(dude);
  dude.body.gravity.y = 300;
  game.camera.follow(dude);

}

function update(){

  game.physics.arcade.collide(dude, ground);

  if(game.input.activePointer.isDown){
    if(game.input.activePointer.x < 150){
      dude.body.velocity.x = -150;
      dude.animations.play('left');
    }else{
      dude.body.velocity.x = 150;
      dude.animations.play('right');
    }

    if(game.input.activePointer.y < 150){
      dude.body.velocity.y = -250;
    }

    }else{
      dude.body.velocity.x = 0;
      dude.animations.stop();
      dude.frame = 4;
    }



}
