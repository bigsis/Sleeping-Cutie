var Guage = cc.Node.extend({
	ctor:function( ) {
		this._super();
		this.inner = cc.Sprite.create( 'images/wake_guage.png' );
		this.inner.setAnchorPoint( new cc.Point( 0, 0 ) );
		this.rate = 0;
		this.inner.setScaleX( this.rate );
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

	reSchedule: function( rate ) {
		this.schedule( function( ){ 
			// console.log(this.rate);
			if( this.rate < 1.5 ){
		    	this.inner.setScaleX( rate );
		    }
		} , 0 );
	}
});