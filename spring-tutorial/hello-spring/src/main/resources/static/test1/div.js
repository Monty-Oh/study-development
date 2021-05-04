/**
 * test1.html jquery div javascript
 * */
$(document).ready(function () {
    $("#hide-test-1").load("/modal");
    $("#hide-test-1").hide();
    $("#jquery-test-1").click(function (e) {
        const hideTest1 = $("#hide-test-1");
        if (hideTest1.css("display") === "none") {
            hideTest1.show();
        } else {
            hideTest1.hide();
        }
    })
})
