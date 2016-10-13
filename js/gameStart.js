var gameStart = {
	preload: function() {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
	},
	create: function() {
		this.stage.backgroundColor = '#e74c3c';
		var title = this.add.text(this.game.world.width * 0.5,
								 this.game.world.height * 0.5, "Pong Game\nClick to Start",
								 {font: "50px Arial", fill: "#2c3e50"});
		var helpText = this.add.text(this.game.world.width * 0.5,
								 this.game.world.height * 0.8, "Use Up and Down to move Player 1\nUse W and S to move Player 2",
								 {font: "30px Arial", fill: "#7f8c8d"});
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