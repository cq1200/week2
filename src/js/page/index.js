//  
require(['jquery', 'handlebars'], function() {
    $.ajax({
        url: '/api/data',
        dataType: 'json',
        success: function(data) {
            var tpl = $('#tpl').html();
            var template = handlebars.compile(tpl);
            var html = template(data);
            $('.row').append(html);
        }
    })
})