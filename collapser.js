'use strict'
;(function(){

	class Button
	{
		constructor(options)
		{
			this.element = $(document.createElement("a"));
			this.collapsed = options.opened || false;
			this.class = options.class || "collapser-button";
			this.textOpened = options.textOpened || 'скрыть';
			this.textClosed = options.textClosed || 'подробнее' ;
			this.speed = options.speed || 250;
			this.func = options.func || "linear";
			this.block = options.block;
			this.init(options);
		}

		init(options)
		{
			var self = this;
			this.element.attr("class", options.class);

			if (options.append) $(options.append).append(this.element);
			else this.block.element.after(this.element);

			this.element.click(function(e){
				self.toogle();
			})
		}

		close()
		{
			this.block.element.animate({ height: this.block.minHeight }, this.speed, this.func);
			this.element.html(this.textClosed);
			this.collapsed = true;
		}

		open()
	    {
	    	this.block.element.animate({ height: this.block.maxHeight }, this.speed, this.func);
			this.element.html(this.textOpened);
			this.collapsed = false;
		}

		toogle()
	    {
			if (this.collapsed) this.open();
			else this.close();
		}


	}

	class Block
	{
		constructor(options)
		{
			this.element = options.element;
			this.maxHeight = false;
			this.minHeight = false;
			this.button = false;
			this.init(options);
		}

		init(options)
		{
			this.minHeight = options.minHeight || this.element.attr("data-collapse-min-height") || 100;
			this.maxHeight = options.maxHeight || this.element.attr("data-collapse-max-height");

			var settings = {
				block : this,
				func : options.timeFunc || this.element.attr("data-collapse-time-func"),
				append : options.buttonAppend || this.element.attr("data-collapse-button-append"),
				speed : options.speed || this.element.attr("data-collapse-speed"),
				textOpened : options.textOpened || this.element.attr("data-collapse-open-text"),
				textClosed : options.textClosed || this.element.attr("data-collapse-close-text"),
				opened : options.opened || this.element.attr("data-collapse-opened"),
				class : options.buttonClass || this.element.attr("data-collapse-button-class")
			}

			this.button = new Button(settings);

			this.getSize();
		}

		getSize()
	    {
	        var img = this.element.find('img');
			if(img.length != 0)
	        {
				var self = this;
				var counter = 0;
				img.each(function(){
					var tempImg = new Image();
					tempImg.src = this.src;
					tempImg.onload = function(){
						counter++;
						if(counter == img.length){
							self.setSize();
						}
					};
				});
			}
	        else this.setSize();
		}

		setSize()
	    {
	    	var self = this,
	    		height = this.element.height();

	    	if (height == 0)
	    		setTimeout(function(){
	    			self.setSize();
	    		}, 10);
	    	else
	    	{
	    		if (!self.maxHeight) self.maxHeight = height;
	    		if (self.minHeight > height)
		    	{
		    		self.minHeight = height;
		    		self.button.element.hide();
		    	}
		    	self.element.css('height', self.minHeight);
		    	self.element.css('overflow', 'hidden');
		    	self.button.toogle();
	    	}
		}
		
	}	

	$.fn.collapse = function(options)
    {
        this.each(function(){
            if (options) options.element = $(this);
            else options = { element: $(this) }
			this.collapser = new Block(options);
        });
    }

    $(document).ready(function(){
        $('.collapser').collapse();
    });

})();
