var mainGame = {
	preload: function() {
		game.load.image('player', 'images/player.png');
		game.load.image('ball', 'images/ball.png');
	},
	create: function() {
		// player 1
		this.player1 = game.add.sprite(50, this.game.world.centerY, 'player');
		this.player1.scale.set(0.5);
		this.player1.anchor.set(0.5);
		this.player1.score = 0;

		// player 2
		this.player2 = game.add.sprite(this.game.world.width - 60, this.game.world.centerY, 'player');
		this.player2.scale.set(0.5);
		this.player2.anchor.set(0.5);
		this.player2.score = 0;

		// ball
		this.ball = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
		this.ball.anchor.set(0.5);

		this.enablePhysics();
		this.game.physics.arcade.checkCollision.left = false;
		this.game.physics.arcade.checkCollision.right = false;

		// set ball position and start ball
		this.resetBall();
		this.startBall();

		// ball collision detection
		this.ball.body.collideWorldBounds = true;
		this.ball.checkWorldBounds = true;
		this.ball.events.onOutOfBounds.add(this.ballOut, this);


		this.ball.body.bounce.set(1);

		// score text
		var fontStyle = {font: '45px Arial'};
		this.score1 = this.game.add.text(20, 0, '0', fontStyle);
		this.score2 = this.game.add.text(game.world.width - 20, 0, '0', fontStyle);
		this.score2.anchor.set(1, 0);

		// gameover Text
		this.gameOverText = this.game.add.text(this.game.world.width * 0.5, this.game.world.height * 0.5, '', fontStyle);
		this.gameOverText.anchor.set(0.5);
	}, 
	enablePhysics: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// player 1
		this.game.physics.enable(this.player1, Phaser.Physics.ARCADE);
		this.player1.body.collideWorldBounds = true;
		this.player1.body.immovable = true;

		// player 2
		this.game.physics.enable(this.player2, Phaser.Physics.ARCADE);
		this.player2.body.collideWorldBounds = true;
		this.player2.body.immovable = true;

		// ball
		this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
	},
	update: function() {
		this.game.physics.arcade.collide(this.player1, this.ball, this.ballHitPlayer, null, this);
		this.game.physics.arcade.collide(this.player2, this.ball, this.ballHitPlayer, null, this);

		// player 1 controls
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
			this.player1.body.velocity.y = -200;
		}
		else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
			this.player1.body.velocity.y = 200;
		}
		else {
			this.player1.body.velocity.y = 0;
		}

		// player 2 controls
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player2.body.velocity.y = -200;
		}
		else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.player2.body.velocity.y = 200;
		}
		else {
			this.player2.body.velocity.y = 0;
		}
	},
	render: function() {
	},
	ballHitPlayer: function(player, ball) {
		this.ballSpeed += 15;
		if (ball.body.velocity.x < 0)
			 ball.body.velocity.x = -this.ballSpeed - 2 * Math.abs(ball.y - player.y);
		else
			 ball.body.velocity.x = this.ballSpeed + 2 * Math.abs(ball.y - player.y);
	},
	ballOut: function(ball) {
		if (ball.x <= 0) {
		 ++this.player2.score;
		 this.score2.setText(this.player2.score);
		}
		else {
		 ++this.player1.score;
		 this.score1.setText(this.player1.score);
		}

		this.resetBall();
		this.startBall();

		var winner = this.checkGameOver();
		if (winner) {
			 this.gameOver(winner);
		}
	},
	checkGameOver: function() {
		if (this.player1.score === 5) {
			return 1;
		}
		else if (this.player2.score === 5) {
			return 2;
		}
		return false;
	},
	resetBall: function() {
		this.ball.reset(this.game.world.centerX, this.game.world.centerY);
		this.ballSpeed = 120;
	},
	startBall: function() {
		this.ball.body.velocity.set(this.ballSpeed);
	},
	gameOver: function(winner) {
		this.gameOverText.setText("Game Over!\n Player " + winner + " Wins.\n Click To Retry");
		this.resetBall();

		// reset player 1
		this.player1.reset(50, this.game.world.centerY);

		// reset player 2 
		this.player2.reset(this.game.world.width - 60, this.game.world.centerY);

		// event handler for restarting game
		this.game.input.onDown.addOnce(this.restart, this);
	},
	restart: function() {
		this.gameOverText.setText('');
		this.player1.score = 0;
		this.player2.score = 0;
		this.score1.setText(0);
		this.score2.setText(0);
		this.resetBall();
		this.startBall();
	}
};