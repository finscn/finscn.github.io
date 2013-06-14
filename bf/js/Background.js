
function Background(cfg){
	EntityTemplate.collidable(this);
	merger(this, cfg);
}


Background.prototype={
	
	constructor : Background ,

	img : "sky",

	init : function(scene){
		return;
		this.scene=scene;
		this.img=ResourcePool.get(this.img)||this.img;

		this.viewWidth=scene.viewWidth;
		this.viewHeight=scene.viewHeight;

		this.viewport=scene.game.viewport;
		this.layers=this.layers||[];
		
		var z=5;
		var Me=this;
		this.layers.forEach(function(l){
			l.zIndex=z++;
			l.parentDom=Me.viewport;
			l.init(Me);
		});

	},

	update : function(timeStep){
		return;
		this.x=this.scene.x;
		this.y=this.scene.y;
		this.layers.forEach(function(e){
			e.update(timeStep);
		})

	},

	render : function(context,timeStep){
		return;
		
		context.drawImage(this.img,
			0,0,this.img.width,this.img.height,
			0,0,this.viewWidth,this.viewHeight);


		// return;
		this.layers.forEach(function(e){
			e.render(context,timeStep);
		})
	}

}
