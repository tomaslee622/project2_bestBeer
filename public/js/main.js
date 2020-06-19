$(function () {
    if (localStorage.getItem('popState') != 'shown') {
        $("#remind__modal").modal('show');
    }

    $('').click(function (e) {
        $('#remind__modal').fadeOut();
        localStorage.setItem('popState', 'shown');
    });
});