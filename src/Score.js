var Score = cc.Node.extend({
	ctor: function() {
		this._super();
		this.nest = cc.Sprite.create( 'images/nest.png' );
		this.nest.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.nest );

		this.kirby = cc.Sprite.create( 'images/kirby/sleep_kirby01.png');
		this.kirby.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.kirby );

		this.kirby.movingAction = this.createAnimation();
		this.kirby.runAction( this.kirby.movingAction );
	},
});