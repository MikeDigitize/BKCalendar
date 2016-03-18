import $ from "jquery";

$(".date-event").on("click", function(evt) {
    evt.stopPropagation();
    $(".eventTip").remove();
    var eventTip = createEventTip.call(this);
    $(this).append(eventTip);
    setTimeout(function() {
        eventTip.addClass("show");
    }, 0);
});

$(document).on("click", function() {
    $(".eventTip").removeClass("show");
    setTimeout(function(){
        $(".eventTip").remove();
    }, 300);
});

$(".icon").click(function() {
    $(".icon").removeClass("selected");
    $(this).addClass("selected");
});

function createEventTip() {
    var eventTip = $("<span class='event-tip' />");
    var eventTime = $("<p class='event-time' />");
    var eventDescribe = $("<p class='event-desc' />");
    $(eventDescribe).text($(this).attr("data-event"));
    $(eventTime).text($(this).attr("data-time"));
    eventTip.append(eventTime);
    eventTip.append(eventDescribe);
    return eventTip;
}


