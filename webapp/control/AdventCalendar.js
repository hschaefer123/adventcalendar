/*!
 * Flickity v2.x UI5 component
 * http://flickity.metafizzy.co/
 * Touch, responsive, flickable carousel UI5 component
 * (c) Copyright 2016 UNIORG Solutions GmbH (8 Developer Team Licence).
 */
 
// Provides control uniorg.m.flickity.Gallery.
sap.ui.define([
    "sap/ui/core/Control",
    "jquery.sap.global",
    "./3rd/anime.min",
    "./3rd/charming.min",
    "./3rd/textfx",
    "./3rd/main3"
    ],
	function(Control, jQuery, a, c, t, AdventCalendar) {
	"use strict";

	return Control.extend("de.blogspot.openui5.adventcalendar.control.AdventCalendar", {
		
		metadata: {
			properties: {
				width: {
					type: "sap.ui.core.CSSSize",
					defaultValue: "inherit"
				},

				height: {
					type: "sap.ui.core.CSSSize",
					defaultValue: "inherit"
				}
			},
			defaultAggregation: "days",
			aggregations: {
				days: {
					type: "de.blogspot.openui5.adventcalendar.control.Day",
					multiple: true,
					singularName : "day",
					bindable: true
				}
			},
			events: {
				cellSelect: {},
				cellPress: {}
			}
		},
		
		renderer: function(oRm, oControl) {
			oRm.write("<main>");
			
			// open tag
			oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.addClass("calendar-wrap");
            if(oControl.getWidth() !== "inherit") {
                oRm.addStyle("width", oControl.getWidth());
            }
            if(oControl.getHeight() !== "inherit") {
                oRm.addStyle("height", oControl.getHeight());
            }
            oRm.writeClasses();
            oRm.writeStyles();
            //oRm.writeAttribute("tabindex", "-1");
            oRm.write(">");
            
            // render cells aggregation
            oRm.write("<div class=\"calendar\">");
            oControl.getDays().forEach(function (oDay) {
                oRm.renderControl(oDay);
            });
            oRm.write("</div>");
            
            oRm.write("<div class=\"content\">");
            	//oRm.write("<div class=\"content__block\"><h3 class=\"content__title\">Titel</h3><p class=\"content__description\">Description.</p><p class=\"content__meta\">Meta</p></div>");
            	oRm.write("<div class=\"content__number\">0</div>");
            	oRm.write("<button class=\"btn-back\" aria-label=\"Back to the grid view\">&crarr;</button>");
            oRm.write("</div>");
            
            // close tag
            oRm.write("</div>");
            
            oRm.write("</main>");
		},
			
		/**
		 * initialize 
		 */
		onAfterRendering : function() {
			if (Control.prototype.onAfterRendering) {
				Control.prototype.onAfterRendering.apply(this, arguments);
			}
			
			if (!this.isRendered) {
				//this._init();
				//var $calendarEl = document.querySelector("#" + this.getId());
				var $calendarEl = document.querySelector(".calendar");
				new AdventCalendar($calendarEl);
				
				this.isRendered = true;
			}
		}

	});
		
});