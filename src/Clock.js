var Clock =  cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( "images/clock/idle_clock01.png");

		this.movingAction = this.createAnimation();
		this.runAction( this.movingAction );
	},

	createAnimation: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'images/clock/idle_clock01.png' );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock02.png" );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock03.png" );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock04.png" );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock05.png" );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock06.png" );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock07.png" );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock08.png" );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock09.png" );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock10.png" );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock11.png" );
		animation.addSpriteFrameWithFile( "images/clock/idle_clock12.png" );
		animation.setDelayPerUnit( 0.25 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
	}
});