const informMe = function (endpoint, value) {
    $.ajax({
        url: `https://restcountries.eu/rest/v2/${endpoint}/${value}`,
        type: "GET",
    }).always(function (data) {
        console.log("ajax attempted");
    }).done(function (data) {
        console.log("ajax successful");
        console.log(data);
        var renderedData = JSON.stringify(data, null, 2);
        $("#container").html(renderedData);
    }).fail(function (data) {
        alert("enter valid 'endpoint' and 'value' inputs");
    });
};



