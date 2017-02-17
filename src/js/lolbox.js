(function($){
	var outer, inner;

	var lol = {

		doc: [],
		opt: {},
		html: null,
		newelement: [],

		baseOpt: {
			contents: '',
			zindex: 999,
			ajax: {
				use: false,
				url: null,
				method: 'get',
				dataType: 'auto',
				data: null,
				callback: null
			},
			head: {
				use: true,
				close: true,
				title: 'Title'
			},
			foot: {
				use: true,
				close: {
					use: true,
					callback: null,
					text: 'Close'
				},
				conf: {
					use: true,
					callback: null,
					text: 'Okay'
				}
			}
		},

		/**
		 * Initialises a new instance of lolbox
		 * @param Array The jQuery object of the document
		 * @param Object Options passed in by the user
		 * @return Array The jQuery object of the document
		 */
		init: function(doc, opt){
			this.doc = doc;
			this.opt = opt;

			this.destroyAll();
			this.parseOptions();

			this.html = this.getHTML();
			this.doc.find('body').append(this.html);
			this.element = doc.find('#lolbox');

			if(opt.ajax.use) this.parseAjax();

			this.registerListeners();
			this.open();

			return doc;
		},

		/**
		 * Returns the element object
		 * @return object jQuery object of the element inserted
		 */
		getElement: function(){
			return lol.element;
		},

		/**
		 * Animates the modal into visibility
		 * @return void
		 */
		open: function(){
			var outer, inner, winWidth, lolWidth, calcLeft;
			inner = this.element.find('.lolbox.lolbox-inner');
			outer = this.element.find('.lolbox.lolbox-outer');

			winWidth = $(window).width();
			lolWidth = inner.width();
			calcLeft = (winWidth - lolWidth) / 2 +"px";

			outer.css('z-index', lol.opt.zindex).removeClass('hide');
			inner.css({
				'z-index': lol.opt.zindex+1,
				'left': calcLeft
			}).removeClass('hide');

			setTimeout(function(){
				outer.addClass('show');
				inner.addClass('show');
			}, 100);

		},

		/**
		 * Registers event listeners to the buttons within the modal.
		 * @return void
		 */
		registerListeners: function(){
			var elm = this.element;
			elm.find('.lolbox-footer button[data-close]').on('click', lol.clickClose);
			elm.find('.lolbox-head div[data-close]').on('click', lol.clickClose);
			elm.find('.lolbox-footer button[data-conf]').on('click', lol.clickConf);
		},

		/**
		 * Destorys any old instances of lolbox in this document
		 * @return void
		 */
		destroyAll: function(){
			this.doc.find('#lolbox').off();
			this.doc.find('#lolbox').remove();
		},

		/**
		 * Closes the modal, waits until the animation is complete, then
		 * destroys the instance. Runs the callback when complete.
		 * @param function Callback to run once it's closed
		 * @return void
		 */
		close: function(callback){
			console.log('close');
			this.element.fadeOut(function(){
				lol.destroyAll();
				callback();
			});
		},

		/**
		 * Closes the modal, waits until the animation is complete, then
		 * destroys the instance and then runs a callback if the user
		 * has specified one
		 * @return void
		 */
		clickClose: function(){
			lol.close(function(){
				if(lol.opt.foot.close.callback){
					lol.opt.foot.close.callback();
				}
			});
		},

		/**
		 * Closes the modal, waits until the animation is complete, then
		 * destroys the instance and then runs a callback if the user
		 * has specified one
		 * @return void
		 */
		clickConf: function(){
			lol.close(function(){
				if(lol.opt.foot.conf.callback){
					lol.opt.foot.conf.callback();
				}
			});
		},

		/**
		 * Ensures that options passed through are valid, and uses
		 * defaults if none are set
		 * @return void
		 */
		parseOptions: function(){
			var opt = $.extend({}, this.baseOpt, this.opt);
			opt.ajax = $.extend({}, this.baseOpt.ajax, this.opt.ajax);
			opt.head = $.extend({}, this.baseOpt.head, this.opt.head);
			opt.foot = $.extend({}, this.baseOpt.foot, this.opt.foot);

			console.log(opt.ajax);
			if(opt.ajax.use) opt.content = "<div class='lolbox-load'></div>";
			this.opt = opt;
		},

		/**
		 * Run when the user has specified their contents will be
		 * retreived by AJAX. Initiates the AJAX request, and sets
		 * the contents of the modal to a loading icon. When the
		 * AJAX is complete, the appropriate action will be taken.
		 * @return void
		 */
		parseAjax: function(){
			// We'll inject the content once it's ready,
			// and display a loading icon for the meantime.
			var opt = lol.opt;
			opt.content = "<div class='lolbox-load'></div>";
			$.ajax({
				url: opt.ajax.url,
				method: opt.ajax.method,
				dataType: opt.ajax.dataType,
				data: opt.ajax.data,
				success: lol.injectAjaxContent,
				error: lol.injectAjaxError
			});
		},

		/**
		 * Injects contents from the AJAX request into the body of the
		 * modal element. If a callback function has been specified
		 * by the user, that gets run too.
		 * @param mixed The data returned from the AJAX
		 * @return void
		 */
		injectAjaxContent: function(e){
			lol.getElement().find('.lolbox-contents').html(e);
			if(this.opt.ajax.callback) this.opt.ajax.callback();
		},

		/**
		 * Injects an error message into the modal body. If a callback
		 * function has been specified by the user, that gets run too.
		 * @param Object The AJAX error object
		 * @return void
		 */
		injectAjaxError: function(e){
			var error = "<div class='lolbox-error'>";
			error += e.statusText;
			error += "</div>";

			console.log(lol.getElement());

			lol.getElement().find('.lolbox-contents').html(error);
			if(lol.opt.ajax.callback) this.opt.ajax.callback();
		},

		/**
		 * Generates the markup for lolbox, using options defined by
		 * the user.
		 * @return String The HTML to be inserted
		 */
		getHTML: function(){
			var opt, html;
			opt = this.opt;

			html = "<div id='lolbox'>";
			html += "<div class='lolbox lolbox-outer hide'></div>";
			html += "<div class='lolbox lolbox-inner hide'>";

			if(opt.head.use){
				html += "<div class='lolbox-head'>";
				html += opt.head.title;
				if(opt.head.close) html += "<div data-close>&times;</div>";
				html += "</div>";
			}

			html += "<div class='lolbox-contents'>";
			html += opt.contents;
			html += "</div>";

			if(opt.foot.use){
				html += "<div class='lolbox-footer'>";
				if(opt.foot.close.use) html += "<button data-close>"+opt.foot.close.text+"</button>";
				if(opt.foot.conf.use) html += "<button data-conf>"+opt.foot.conf.text+"</button>";
				html += "</div>";
			}
			html += "</div>";
			return html;
		}

	};


	$.fn.lolbox = function(opt){
		// Initialise a new instance of lolbox.
		return lol.init(this, opt);
	};
}(jQuery));
