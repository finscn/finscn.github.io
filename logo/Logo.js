

function Logo(cfg) {
    for (var key in cfg) {
        this[key] = cfg[key];
    }

    this.offsetX = this.width / 2;
    this.offsetY = this.height / 2;
    this.imgWidth = this.img.width;
    this.imgHeight = this.img.height;
}

Logo.prototype = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    vx: 0,
    vy: 0,
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
    img: null,
    rotation: 0,
    scale : 1,
    vr: 0,
    alpha : 1,

    update: function(timeStep) {
        this.x += this.vx * timeStep;
        this.y += this.vy * timeStep;
        this.rotation += this.vr * timeStep;

        if (this.x >= this.maxX) {
            this.x = this.maxX;
            this.vx = -Math.abs(this.vx);
        } else if (this.x <= this.minX) {
            this.x = this.minX;
            this.vx = Math.abs(this.vx);
        }
        if (this.y >= this.maxY) {
            this.y = this.maxY;
            this.vy = -Math.abs(this.vy);
        } else if (this.y <= this.minY) {
            this.y = this.minY;
            this.vy = Math.abs(this.vy);
        }
    },
    render: function(ctx) {

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale( this.scale , this.scale );
        ctx.rotate(this.rotation);
        ctx.translate(-this.offsetX, -this.offsetY);
        ctx.globalAlpha=this.alpha;
        ctx.drawImage(this.img, 0, 0, this.imgWidth, this.imgHeight, 0, 0, this.width, this.height);
        ctx.restore();
    }

}


function createLogo(img, x, y, vx, vy, alpha) {
    var sprite = new Logo({
        img: $id(img),
        x: x || 0,
        y: y || 0,
        width : 90 ,
        height : 90 ,
        scale : 2/3 ,
        maxX: Config.width,
        maxY: Config.height,
        vx: vx ? 0.15 : 0,
        vy: vy ? 0.15 : 0,
        vr: 0.0015,
        alpha : alpha||1
    })
    return sprite;
}

function createSprties(){
    

    var cr=Config.logoCount/2;
    var col=cr*Config.width/(Config.width+Config.height)
    col=Math.ceil(col)
    var row=cr-col;


    var spaceX=Math.ceil(Config.width/(col-1)) ;
    var spaceY=Math.ceil(Config.height/(row-1));

    var sprites = [];   
    var logos = ["html5", "chrome", "ie", "firefox", "safari", "opera"];
    var logoCount=logos.length;

    for (var i=0;i<=col;i++){
        var logo=logos[i%logoCount];
        sprites.push(createLogo(logo, spaceX*i, i%4*10, false, true, 1-i*0.01 ));
    }

    for (var i=0;i<=row;i++){
        var logo=logos[i%logoCount];
        sprites.push(createLogo(logo, i%4*10, spaceY*i, true, false, 1-i*0.01 ));
    }

    for (var i=0;i<=col;i++){
        var logo=logos[i%logoCount];
        sprites.push(createLogo(logo, spaceX*i, Config.height - i%4*10, false, true, 1-i*0.01 ));
    }


    for (var i=0;i<=row;i++){
        var logo=logos[i%logoCount];
        sprites.push(createLogo(logo, Config.width - i%4*10, spaceY*i, true, false, 1-i*0.01 ));
    }

    return sprites;
}
