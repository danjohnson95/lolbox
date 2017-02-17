function getObj(form){
	var title, header, closebtn, contents, footer, ajax;
	ajax = {};

	title = form.find('.title').val();
	header = form.find('.display-header').is(':checked');
	closebtn = form.find('.closebtn').is(':checked');
	contents = form.find('.contents').val();
	footer = form.find('.footer').is(':checked');

	if(form.is('.ajax-lolbox')){
		ajax = {
			use: true,
			url: 'demo-ajax.html'
		};
	}

	return {
		ajax: ajax,
		contents: contents,
		head: {
			use: header,
			title: title,
			close: closebtn
		},
		foot: {
			use: footer
		}
	}
}

function handleOpen(e){
	e.preventDefault();
	var obj = getObj($(this));
	$(document).lolbox(obj);
}

$(document).on('change', '.display-header', function(){
	var state = !$(this).is(':checked');
	$(this).parents('ul').find('li .title-dependant').prop('disabled', state);
});

$(document).on('submit', 'form.standard-lolbox', handleOpen);

$(document).on('submit', 'form.ajax-lolbox', handleOpen);
