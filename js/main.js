var game = new Phaser.Game(700, 700, Phaser.AUTO);

game.state.add('gameStart', gameStart);
game.state.add('mainGame', mainGame);
game.state.start('gameStart');