var Avatar = cc.Node.extend({
	ctor: function() {
		this._super();
		this.nest = cc.Sprite.create( 'images/nest.png' );
		this.nest.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.nest );

		this.kirby = cc.Sprite.create( 'images/kirby/sleep_kirby01.png');
		this.kirby.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.kirby );

		this.kirby.movingAction = this.sleepAnimation();
		this.kirby.runAction( this.kirby.movingAction );
	},

	wakeUp: function() {
		console.log("wake");
		this.kirby.stopAction( this.movingAction );
		// this.cleanup();
		this.kirby.movingAction = this.wakeAnimation();
		this.kirby.runAction( this.kirby.movingAction );
	},

	sleepAnimation: function() {
		var animation = new cc.Animation.create();
			animation.addSpriteFrameWithFile( 'images/kirby/sleep_kirby05.png' );
			animation.addSpriteFrameWithFile( 'images/kirby/sleep_kirby06.png' );
			animation.addSpriteFrameWithFile( 'images/kirby/sleep_kirby07.png' );
			animation.addSpriteFrameWithFile( 'images/kirby/sleep_kirby08.png' );
			animation.addSpriteFrameWithFile( 'images/kirby/sleep_kirby09.png' );
			animation.addSpriteFrameWithFile( 'images/kirby/sleep_kirby10.png' );
			animation.addSpriteFrameWithFile( 'images/kirby/sleep_kirby11.png' );
			animation.setDelayPerUnit( 0.4 );
			return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	wakeAnimation: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'images/kirby/wake_kirby01.png' );
		animation.addSpriteFrameWithFile( 'images/kirby/wake_kirby02.png' );
		animation.addSpriteFrameWithFile( 'images/kirby/wake_kirby03.png' );
		animation.addSpriteFrameWithFile( 'images/kirby/wake_kirby04.png' );
		animation.addSpriteFrameWithFile( 'images/kirby/wake_kirby05.png' );
		animation.addSpriteFrameWithFile( 'images/kirby/wake_kirby06.png' );
		animation.addSpriteFrameWithFile( 'images/kirby/wake_kirby07.png' );
		animation.addSpriteFrameWithFile( 'images/kirby/wake_kirby08.png' );
		animation.setDelayPerUnit( 0.4 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );

	},
});


