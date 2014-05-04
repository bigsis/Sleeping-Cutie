var Guage = cc.Node.extend({
	ctor:function( ) {
		this._super();
		this.inner = cc.Sprite.create( 'images/wake_guage.png' );
		this.inner.setAnchorPoint( new cc.Point( 0, 0 ) );
		this.outter = cc.Sprite.create( 'images/wake_guage_frame.png' );
		this.outter.setAnchorPoint( new cc.Point( 0, 0 ) );
		this.inner.setPosition( new cc.Point( 3,2 ) );
		this.rate = 0;
		this.state = Guage.NORMAL;
		this.inner.setScaleX( this.rate );
		this.addChild( this.outter );
		this.addChild( this.inner );
		
		this.reSchedule( this.rate );
		
	},

	increaseRate: function( rate ) {
		
 		this.rate += rate;
 		this.reSchedule( this.rate );
	},

	decreaseRate: function( rate ) {
		this.cleanup();
		if ( this.rate > 0 ){
			this.rate -= rate;
			this.reSchedule( this.rate );
		}
	},

	getRate: function() {
		return this.rate;
	},

	getState: function() {
		return this.state;
	},

	reSchedule: function( rate ) {
		this.schedule( function( ){ 
			if( this.state == Guage.NORMAL ){
		    	this.inner.setScaleX( rate );
		    	if( this.rate >= 1 ){
		    		this.state = Guage.FULL;
		    	}
		    }
		} , 0 );
	}
});
Guage.FULL = 0;
Guage.NORMAL = 1;