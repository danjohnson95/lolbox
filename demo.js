function handleOpen(e){
	e.preventDefault();
	var title, header, closebtn, contents, footer, ajax, form;
	ajax = {};

	form = $(this);
	title = form.find('.title').val();
	header = form.find('.display-header').is(':checked');
	closebtn = form.find('.closebtn').is(':checked');
	contents = form.find('.contents').val();
	footer = form.find('.footer').is(':checked');

	if($(this).is('.ajax-lolbox')){
		ajax = {
			use: true,
			url: 'demo-ajax.html'
		};
	}

	$(document).lolbox({
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
	});
}

$(document).on('change', '.display-header', function(){
	var state = !$(this).is(':checked');
	$(this).parents('ul').find('li .title-dependant').prop('disabled', state);
});

$(document).on('submit', 'form.standard-lolbox', handleOpen);

$(document).on('submit', 'form.ajax-lolbox', handleOpen);
