var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.countClock = 0;
        this.wakeGauge = 0;
        this.wakeRate = 0;
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.createBG();
        this.createAvatar();
        this.createLabel();
        this.createGuage();
        this.date = new Date();
        this.clock;
        this.speed = 2;
        this.speedCount = 0;
        this.state = GameLayer.PLAY;
        this.startTime = this.date.getTime();
        this.randomClock(Math.random()*5);
        this.scheduleUpdate();
        this.setMouseEnabled( true );
        this.timenet = 0;
        return true;
    },
    
    createBG: function() {
        var background = cc.Sprite.create( 'images/background.jpg' );
        background.setPosition( cc.p( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( background );
    },

    createAvatar: function() {
        this.avatar = new Avatar();
        this.avatar.setPosition( cc.p( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.avatar );
    },

    createGuage: function() {
        this.guage = new Guage();
        this.guage.setPosition( cc.p( 25 , screenHeight - 75 ) );
        this.addChild( this.guage );

        this.schedule( function( ){ 
            this.callGuageDecrease();
        } , 0.1 );
    },

    createLabel: function() {
        this.scoreLabel = cc.LabelTTF.create( this.score, 'Arial', 50 );
        this.scoreLabel.setPosition( cc.p( screenWidth -100, screenHeight -80 ) );
        this.addChild( this.scoreLabel ,3 );
    },

    updateScoreLabel: function() {
        
            var currentDate = new Date();
            var time = ( currentDate.getTime() - this.startTime ) / 1000;
            this.timenet = time.toFixed(1);
            this.scoreLabel.setString( this.timenet );
        
    },

    onMouseDown: function( event ) {
        var location = event.getLocation();
        var childOnScreen = this.getChildren();
        var num = this.getChildrenCount();
        
        for( var i = childOnScreen.length-1; i > 1; i-- ){
            var posX = childOnScreen[i].getPositionX();
            var posY = childOnScreen[i].getPositionY();
            if ( ( location.x > posX - 27 ) && ( location.x < posX + 27 ) ){
                if ( ( location.y > posY - 27 ) && ( location.y < posY + 27 ) ){
                    childOnScreen[i].dealarm();
                    return;
                }
            }
        }
    },

    callGuageDecrease: function() {
         this.guage.decreaseRate( 0.001 );
    },

    randomClock: function( t ) {
        this.speedCount++;
        if( this.speedCount % 3 == 0 && this.speed > 0.1){
            this.speed -= 0.1;
        }
        this.scheduleOnce( function( ){ 
            this.addClock();
            this.randomClock( Math.random() * this.speed );
        } , t);
    },

    addClock: function() {
        this.clock = new Clock( this.guage );
        this.clock.setPosition(cc.p( 15 + ( Math.random() * screenWidth - 15 ), Math.random() * ( screenHeight - 100 ) ) );
        if( this.guage.getRate() <=0 ){
            this.guage.increaseRate( 0.001 );
        }
        this.addChild( this.clock );
        
    },

    clockAlarmed: function() {
        this.wakeRate++;
        // console.log(this.wakeRate);
    },

    clockStop: function() {
        this.wakeRate--;
    },

    end: function() {
         var ending = cc.Sprite.create( 'images/ending.png' );
        ending.setPosition( cc.p( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( ending, 3 );
        this.cleanup();
        cc.AudioEngine.getInstance().playMusic( 'effects/Scream.mp3', true );

        this.scoreLabel2 = cc.LabelTTF.create( this.score, 'Arial', 50 );
        this.scoreLabel2.setPosition( cc.p( screenWidth - 75, screenHeight - 500 ) );
        // this.scoreLabel2.color = ccc3(255, 255, 0); 
        this.addChild( this.scoreLabel2 ,5 );
        this.scoreLabel2.setString(this.timenet);

    },

    update: function() {
        if( this.state == GameLayer.PLAY ){
            if( this.guage.getState() == 1 ){
                this.updateScoreLabel();
            } else{
                this.state = GameLayer.END;
                this.avatar.wakeUp();
                this.end();

            }
        }
    },
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

GameLayer.PLAY = 0;
GameLayer.END = 1;

