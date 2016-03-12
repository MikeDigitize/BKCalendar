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
    var eventTip = $("<span class='eventTip' />");
    var eventTime = $("<p class='eventTime' />")
    var eventDescribe = $("<p class='eventTime' />");
    $(eventDescribe).text($(this).attr("data-event"));
    $(eventTime).text($(this).attr("data-time"));
    eventTip.append(eventTime);
    eventTip.append(eventDescribe);
    return eventTip;
}

function getDate(y, m, d = 0) {
    return new Date(y, m, d, 12, 0);
}

function getDayOfWeek(date) {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getUTCDay()];
}

function getMonth(date) {
    return date.getMonth();
}

function getYear(date) {
    return date.getFullYear();
}

function getDaysInMonths(y, m) {
    return /8|3|5|10/.test(m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
}

function logDays(y, m) {
    let daysInMonth = getDaysInMonths(y, m) + 1;
    for(let i = 1; i < daysInMonth; i++) {
        console.log(getDayOfWeek(getDate(y, m, i)), i);
    }
}

let currentDate = new Date();
let currentMonth = getMonth(currentDate);
let currentYear = getYear(currentDate);

logDays(currentYear, currentMonth);


