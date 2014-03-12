var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.countClock = 0;
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.avatar = new Avatar();
        this.avatar.setPosition( cc.p( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.avatar );

        this.clock = [];
        for( var i = 0; i < 30; i++ ){
            this.clock[i] = new Clock();
        }
        this.hey(Math.random()*5);
        
        return true;
    },

    hey: function(t) {
        this.scheduleOnce( function( ){ 
            this.addClock();
            this.hey( Math.random() * 3 );
        } , t);
    },

    addClock: function() {
        this.clock[this.countClock].setPosition(cc.p( Math.random() * screenWidth, Math.random() * screenHeight ));
        this.addChild(this.clock[this.countClock++]);
        if( this.countClock == 30 ){
            this.countClock = 0;
        }
        console.log(this.countClock++);
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

