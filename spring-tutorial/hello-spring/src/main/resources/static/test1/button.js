$(document).ready(function () {

    const $button = $("#ajax-test");
    const $button2 = $("#ajax-test-post");
    $button.click(() => {
        $.ajax({
            url: '/test1/test',
            type: 'get',
            contentType: "application/json",
            success: (data) => {
                console.log('success!!');
                console.log(data);
            },
            error: (data) => {
                console.error(data);
            }
        })
    })

    $button2.click(() => {
        $.ajax({
            url: '/test1/test',
            type: 'post',
            data: JSON.stringify({userId: $("#userId").val()}),
            contentType: "application/json",
            success: (data) => {

            },
            error: (data) => {
                console.error(data);
            }
        })
    })
})