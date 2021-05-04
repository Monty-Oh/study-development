/**
 * test1.html jquery input javascript
 * */
$(document).ready(function () {
    // jquery 객체임을 명시한다.
    const $userId = $("#userId");

    $userId.focusin(() => {
        let idVal = $userId.val();
        console.log(idVal);
    })

    $userId.on("propertychange change keyup paste input", () => {
        console.log($userId.val());
    })
})