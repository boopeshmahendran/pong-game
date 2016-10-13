var gameStart = {
	preload: function() {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
	},
	create: function() {
		this.stage.backgroundColor = '#e74c3c';
		var title = this.add.text(this.game.world.width * 0.5,
								 this.game.world.height * 0.5, "PONG GAME\nCLICK TO START",
								 {font: "50px Times New Roman", fill: "#212121"});
		var helpText = this.add.text(this.game.world.width * 0.5,
								 this.game.world.height * 0.8, "USE UP AND DOWN TO MOVE PLAYER 1\nUSE W AND S TO MOVE PLAYER 2",
								 {font: "30px Tahoma", fill: "#4E342E"});
		title.anchor.set(0.5);
		helpText.anchor.set(0.5)
		this.game.input.onDown.add(this.clickStart, this);
	},
	update: function() {
	},
	clickStart: function() {
		this.game.state.start('mainGame');
	},

};