var Clock =  cc.Sprite.extend({
	ctor: function( guage ) {
		this._super();
		this.guage = guage;
		this.initWithFile( "images/clock/idle_clock01.png");
		this.state = Clock.IDLE;

		this.movingAction = this.idleAnimation();
		this.runAction( this.movingAction );
		
		this.scheduleOnce( function( ){ 
		    
			

			if( this.state == Clock.IDLE ){
				this.getParent().clockAlarmed();
				this.stopAction( this.movingAction );
				this.movingAction = this.alarmAnimation();
		   		this.runAction( this.movingAction );
		   		this.state = Clock.ALARM;
		   		this.scheduleOnce( function( ){ 
		   			
		   			// cc.AudioEngine.getInstance().playEffect( 'effects/Rooster.mp3', true );
				} , 0 );
		   		
		   		this.schedule( function( ){ 
		   			this.guage.increaseRate( 0.001 );
		   			
				} , 0 );
			}
			

			
		} , Math.random() * 3 );
		
		
	},

	dealarm: function() {
		if( this.state == Clock.ALARM ){
			this.guage.decreaseRate( 0.001 );
			this.cleanup();
		}
		this.state = Clock.DEALARM;
		this.stopAction( this.movingAction );

		this.movingAction = this.dealarmAnimation();
		this.runAction( this.movingAction );

		cc.AudioEngine.getInstance().pauseAllEffects();
		this.scheduleOnce( function( ){ 
		   this.removeFromParent();
			} , 1.5 );
	},

	getState: function() {
		return this.state;
	},


	idleAnimation: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( "images/clock/idle_clock01.png" );
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
	},

	alarmAnimation: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( "images/clock/alarm_clock/alarm_clock01.png" );
		animation.addSpriteFrameWithFile( "images/clock/alarm_clock/alarm_clock02.png" );
		animation.addSpriteFrameWithFile( "images/clock/alarm_clock/alarm_clock03.png" );
		animation.addSpriteFrameWithFile( "images/clock/alarm_clock/alarm_clock04.png" );
		animation.addSpriteFrameWithFile( "images/clock/alarm_clock/alarm_clock05.png" );
		animation.addSpriteFrameWithFile( "images/clock/alarm_clock/alarm_clock06.png" );
		animation.addSpriteFrameWithFile( "images/clock/alarm_clock/alarm_clock07.png" );
		animation.setDelayPerUnit( 0.25 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	dealarmAnimation: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( "images/clock/dealarm_clock/dealarm_clock01.png" );
		animation.addSpriteFrameWithFile( "images/clock/dealarm_clock/dealarm_clock02.png" );
		animation.addSpriteFrameWithFile( "images/clock/dealarm_clock/dealarm_clock03.png" );
		animation.addSpriteFrameWithFile( "images/clock/dealarm_clock/dealarm_clock04.png" );
		animation.addSpriteFrameWithFile( "images/clock/dealarm_clock/dealarm_clock05.png" );
		animation.addSpriteFrameWithFile( "images/clock/dealarm_clock/dealarm_clock06.png" );
		animation.addSpriteFrameWithFile( "images/clock/dealarm_clock/dealarm_clock07.png" );
		animation.addSpriteFrameWithFile( "images/clock/dealarm_clock/dealarm_clock08.png" );
		animation.addSpriteFrameWithFile( "images/clock/dealarm_clock/dealarm_clock09.png" );
		animation.setDelayPerUnit(0.17 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
	}
});

Clock.IDLE = 0;
Clock.ALARM = 1;
Clock.DEALARM = 2;