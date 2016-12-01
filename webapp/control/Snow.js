sap.ui.define([
    "sap/ui/core/Control",
    "jquery.sap.global"
    ],
	function(Control) {
	"use strict";

	return Control.extend("de.blogspot.openui5.adventcalendar.control.Snow", {
		
		metadata: {
			properties: {
				width: {
					type: "sap.ui.core.CSSSize",
					defaultValue: "inherit"
				},
				height: {
					type: "sap.ui.core.CSSSize",
					defaultValue: "inherit"
				},
				backgroundColor: {
					type: "sap.ui.core.CSSColor",
					defaultValue: "transparent"
				}
			}
		},
		
		renderer: function(oRm, oControl) {
			// open tag
			oRm.write("<canvas");
            oRm.writeControlData(oControl);
            // classes
            oRm.addClass("background");
            // styles
            oRm.addStyle("position", "absolute");
            oRm.addStyle("top", "0");
            oRm.addStyle("left", "0");
            oRm.addStyle("width", "100%");
            oRm.addStyle("height", "100%");
            oRm.addStyle("min-height", "100vh");
            oRm.addStyle("transition", "background-color 0.8s");
            
            if(oControl.getWidth() !== "inherit") {
                oRm.addStyle("width", oControl.getWidth());
            }
            if(oControl.getHeight() !== "inherit") {
                oRm.addStyle("height", oControl.getHeight());
            }
            if(oControl.getBackgroundColor() !== "transparent") {
                oRm.addStyle("background", oControl.getBackgroundColor());
            }
            
            oRm.writeClasses();
            oRm.writeStyles();
            oRm.write(">");
            
            // close tag
            oRm.write("</canvas>");
		},
			
		/**
		 * after rendering
		 */
		onAfterRendering : function() {
			if (Control.prototype.onAfterRendering) {
				Control.prototype.onAfterRendering.apply(this, arguments);
			}
			
			this._init();
		},
		
		_init : function() {
			var $CanvasNode = $("#" + this.getId()),
				canvas = $CanvasNode[0];
			this.canvas = canvas;
			
			this.flakes = [];
			
			this.ctx = this.canvas.getContext("2d");
			this.flakeCount = 300;
			
			this.mX = -100;
			this.mY = -100;
			
			this.width = this.canvas.width = window.innerWidth;
			this.height = this.canvas.height = window.innerHeight;

			var self = this;
			
			window.addEventListener("resize", function() {
				self.width = self.canvas.width = window.innerWidth;
				self.height = self.canvas.height = window.innerHeight;
			});
	
			for(var i = 0; i < this.flakeCount; ++i) {
				var x = Math.floor(Math.random() * this.width),
					y = Math.floor(Math.random() * this.height),
					size = (Math.random()*3.5) + .5,
					speed = size*.5,
					opacity = (Math.random() * 0.5) + 0.1;
	
				this.flakes.push({
					speed: speed,
					velY: speed,
					velX: 0,
					x: x,
					y: y,
					size: size,
					stepSize: (Math.random()) / 30,
					step: 0,
					opacity: opacity
				});
			}
			
			this._snow();
		},
		
		_snow : function() {
			this.ctx.clearRect(0, 0, this.width, this.height);
			
			for(var i = 0; i < this.flakeCount; ++i) {
				var flake = this.flakes[i],
					x = this.mX,
					y = this.mY,
					minDist = 150,
					x2 = flake.x,
					y2 = flake.y,
					dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
					dx = x2 - x,
					dy = y2 - y;
	
				if( dist < minDist ) {
					var force = minDist / (dist * dist),
					xcomp = (x - x2) / dist,
					ycomp = (y - y2) / dist,
					deltaV = force / 2;
					flake.velX -= deltaV * xcomp;
					flake.velY -= deltaV * ycomp;
				}
				else {
					flake.velX *= .98;
					if( flake.velY <= flake.speed ) {
						flake.velY = flake.speed;
					}
					flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
				}
	
				this.ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
				flake.y += flake.velY;
				flake.x += flake.velX;
	
				if( flake.y >= this.height || flake.y <= 0 ) {
					this._reset(flake);
				}
	
				if( flake.x >= this.width || flake.x <= 0 ) {
					this._reset(flake);
				}
	
				this.ctx.beginPath();
				this.ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
				this.ctx.fill();
			}
			
			requestAnimationFrame(this._snow.bind(this));
		},
		
		_reset : function(flake) {
			flake.x = Math.floor(Math.random() * this.width);
			flake.y = 0;
			flake.size = (Math.random() * 3.5) + .5;
			flake.speed = flake.size * .5;
			flake.velY = flake.speed;
			flake.velX = 0;
			flake.opacity = (Math.random() * 0.5) + 0.1;
		}
			
	});
		
});