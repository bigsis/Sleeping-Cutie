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

        this.clock = [];
        for( var i = 0; i < 30; i++ ){
            this.clock[i] = new Clock();
        }
        this.randomClock(Math.random()*5);
        
        return true;
    },

    randomClock: function(t) {
        this.scheduleOnce( function( ){ 
            this.addClock();
            this.randomClock( Math.random() * 3 );
        } , t);
    },

    addClock: function() {
        this.clock[this.countClock].setPosition(cc.p( Math.random() * screenWidth, Math.random() * screenHeight ));
        this.addChild(this.clock[this.countClock++]);
        if( this.countClock >= 30 ){
            this.countClock = 0;
        }
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

