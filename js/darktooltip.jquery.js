/* 
 * DarkTooltip v0.1.0 
 * Simple customizable tooltip with confirm option and 3d effects
 * (c)2014 Rub�n Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

(function($) {

	function DarkTooltip(element, options){
		this.bearer = element;
		this.options = options;
		this.delay;
	}

	DarkTooltip.prototype = {
		show: function(){
			window.clearTimeout(this.delay);
			this.tooltip.css('display', 'block');
		},

		hide: function(){
			var tt = this.tooltip;
			this.delay = setTimeout( function(){
				tt.css('display', 'none');
			}, 100);
		},

		toggle: function(){
			if(this.tooltip.is(":visible")){
				this.hide();
			}else{
				this.show();
			}
		},

		addAnimation: function(){
			switch(this.options.animation){
				case 'none':
					break;
				case 'fadeIn':
					this.tooltip.addClass('animated');
					this.tooltip.addClass('fadeIn');
					break;
				case 'flipIn':
					this.tooltip.addClass('animated');
					this.tooltip.addClass('flipIn');
					break;
			}
		},

		setContent: function(){
			$(this.bearer).css('cursor', 'pointer');
			//Get tooltip content
			this.content = this.bearer.attr("data-tooltip");
			if(this.content == undefined){
				console.log("No content for tooltip: " + this.bearer.selector);
				return;
			}
			if(this.content.charAt(0) == '#'){
				$(this.content).hide();
				this.content = $(this.content).html();
				this.contentType='html';
			}else{
				this.contentType='text';
			}
			//Create tooltip container
			this.tooltip = $("<ins class = 'dark-tooltip " + this.options.theme + " " + this.options.size + " " 
				+ this.options.gravity + "'>" + this.content + "<div class = 'tip'></div></ins>");
			this.tip = this.tooltip.find(".tip");
			
			$(this.bearer).append(this.tooltip);
			//Adjust size for html tooltip
			if(this.contentType == 'html'){
				this.tooltip.css('max-width','none');
			}
			this.tooltip.css('opacity', this.options.opacity);
			this.addAnimation();
			if(this.options.confirm){
				this.addConfim();
			}
		},

		setPositions: function(){
			var leftPos = 0;
			var topPos = 0;
			switch(this.options.gravity){
				case 'south':
					leftPos = this.bearer.offset().left + (this.bearer.outerWidth()/2) - (this.tooltip.outerWidth()/2);
					topPos = this.bearer.offset().top - this.tooltip.outerHeight();
					break;
				case 'west':
					leftPos = this.bearer.offset().left + (this.bearer.outerWidth());
					topPos = this.bearer.offset().top + this.bearer.outerHeight()/2 - (this.tooltip.outerHeight()/2);
					break;
				case 'north':
					leftPos = this.bearer.offset().left + (this.bearer.outerWidth()/2) - (this.tooltip.outerWidth()/2);
					topPos = this.bearer.offset().top + this.bearer.outerHeight();
					break;
				case 'east':
					leftPos = this.bearer.offset().left - (this.tooltip.outerWidth());
					topPos = this.bearer.offset().top + this.bearer.outerHeight()/2 - (this.tooltip.outerHeight()/2);
					break;
			}
			this.tooltip.css('left', leftPos);
			this.tooltip.css('top', topPos);
		},

		setEvents: function(){
			var dt = this;
			if(this.options.trigger == "hover" || this.options.trigger == "mouseover" || this.options.trigger == "onmouseover"){
				this.bearer.mouseover( function(){
					dt.setPositions();
					dt.show();
				}).mouseout( function(){
					dt.hide();
				});
			}else if(this.options.trigger == "click" || this.options.trigger == "onclik"){
				this.bearer.click( function(e){
					dt.setPositions();
					dt.toggle();
					$('html').one('click',function() {
						dt.toggle();
					});
					e.stopPropagation();
				});
			}
		},

		activate: function(){
			this.setContent();
			if(this.content){
				this.setEvents();
			}
		},

		addConfirm: function(){
			
		}
	}

	$.fn.darkTooltip = function(options) {
		options = $.extend({}, $.fn.darkTooltip.defaults, options);
		var tooltip = new DarkTooltip(this, options);
		tooltip.activate();
	}

	$.fn.darkTooltip.defaults = {
        opacity: 0.9,
        size: 'medium',
        gravity: 'south',
        theme: 'dark',
        confirm: false,
        trigger: 'hover',
        animation: 'none',
        confirm: false,
        yes: 'Yes',
        no: 'No'
    };

})(jQuery);
