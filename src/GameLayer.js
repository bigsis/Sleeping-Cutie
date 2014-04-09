var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.countClock = 0;
        this.wakeGauge = 0;
        this.wakeRate = 0;
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.avatar = new Avatar();
        this.avatar.setPosition( cc.p( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.avatar );

        this.guage = new Guage();
        this.guage.setPosition( cc.p( 50 , screenHeight - 100 ) );
        this.addChild( this.guage );

        this.clock;
        // for( var i = 0; i < 30; i++ ){
        //     this.clock[i] = new Clock();
        // }
        this.randomClock(Math.random()*5);

         this.setMouseEnabled( true );
        return true;
    },

    onMouseDown: function( event ) {
        var location = event.getLocation();
        var childOnScreen = this.getChildren();
        var num = this.getChildrenCount();
        // console.log( location.x );
        // console.log( childOnScreen[1].getPositionX() );
        
        for( var i = childOnScreen.length-1; i > 1; i-- ){
            var posX = childOnScreen[i].getPositionX();
            var posY = childOnScreen[i].getPositionY()
            if ( ( location.x > posX - 27 ) && ( location.x < posX + 27 ) ){
                if ( ( location.y > posY - 27 ) && ( location.y < posY + 27 ) ){
                    childOnScreen[i].dealarm();
                    this.removeChild( childOnScreen[i] );
                    // console.log(this.getChildrenCount());
                    if ( this.getChildrenCount() == 2 ){
                        this.schedule( function( ){ 
                            this.guage.decreaseRate( 0.002 );
                        } , 0.1 );
                        // this.guage.emptyAlarm(  );
                    }
                    return;
                }
            }
        }
    },

    randomClock: function( t ) {
        this.scheduleOnce( function( ){ 
            this.addClock();
            this.randomClock( Math.random() * 3 );
        } , t);
    },

    addClock: function() {
        this.clock = new Clock( this.guage );
        this.clock.setPosition(cc.p( Math.random() * screenWidth, Math.random() * screenHeight ));
        this.addChild( this.clock );
        // if( this.countClock >= 30 ){
        //     this.countClock = 0;
        // }
    },

    clockAlarmed: function() {
        this.wakeRate++;
        console.log(this.wakeRate);
    },

    clockStop: function() {
        this.wakeRate--;
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

