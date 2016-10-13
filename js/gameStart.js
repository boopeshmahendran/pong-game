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
		title.anchor.set(0.5);
		this.game.input.onDown.add(this.clickStart, this);
	},
	update: function() {
	},
	clickStart: function() {
		this.game.state.start('mainGame');
	},

};