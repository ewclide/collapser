'use strict'
;(function(){

	class Button
	{
		constructor(options)
		{
			this.element = $(document.createElement("a"));
			this.collapsed = options.collapsed || false;
			this.class = options.class || "collapser-button";
			this.textOpened = options.textOpened || 'скрыть';
			this.textClosed = options.textClosed || 'подробнее' ;
			this.speed = options.speed || 250;
			this.funct = options.funct || "linear";
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
			this.block.element.animate({ height: this.block.minHeight }, this.speed, this.funct);
			this.element.html(this.textClosed);
			this.collapsed = true;
		}

		open()
	    {
	    	this.block.element.animate({ height: this.block.maxHeight }, this.speed, this.funct);
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
			this.minHeight = this.element.attr("data-min-height") || 100;
			this.maxHeight = this.element.attr("data-max-height") || 500;

			var settings = {
				block : this,
				funct : this.element.attr("data-time-func"),
				append : this.element.attr("data-button-append"),
				speed : this.element.attr("data-speed"),
				textOpened : this.element.attr("data-open-text"),
				textClosed : this.element.attr("data-close-text"),
				collapsed : this.element.attr("data-collapsed"),
				class : this.element.attr("data-button-class")
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
	    		self.maxHeight = height;
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
            if(options) options.element = $(this);
            else options = { element: $(this) }
			this.collapser = new Block(options);
        });
    }

    $(document).ready(function(){
        $('.collapser').collapse();
    });

})();
