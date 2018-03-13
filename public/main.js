$(document).ready(function() {
    $('#p').datepicker();

    // $('[data-toggle="tooltip"]').tooltip();

    // $('[popup="baseline"]').tooltip({
    //     content: "<img class='baselinemap' src='http://www.pge.com/nots/rates/PGECZ_90Rev.pdf' />",
    // });
    // $('[epa]').tooltip({
    //     items: '[epa]',
    //     content: "Data from <a href='http://www.fueleconomy.gov/feg/PowerSearch.do?action=Cars&path=3&year1=2012&year2=2014&vtype=Electric&srchtyp=newAfv&pageno=1&sortBy=Comb&tabView=0&rowLimit=200'>EPA website</a>",
    // });

    var progress = $('.progress');
    progress.hide();
    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');
    status.hide();

    $('form').ajaxForm(
    {
        beforeSend: function() {
            status.empty();
            var percentVal = '0%';
            progress.slideDown();
            status.fadeOut();
            bar.width(percentVal);
            percent.html(percentVal);
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal);
            percent.html(percentVal);
        },
        success: function() {
            var percentVal = '100%';
            bar.width(percentVal);
            percent.html(percentVal);
        },
        complete: function(xhr) {
            progress.slideUp();
            status.fadeIn();
            status.html(xhr.responseText);
        },
    });
});
