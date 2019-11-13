// Startup script, as soon as page loads it starts execution of needed scripts

time.initial();

$("#content").swipe({swipeRight:function(event, direction, distance, duration, fingerCount){navigation.open();},threshold:100});
$("#content").swipe({swipeLeft:function(event, direction, distance, duration, fingerCount){navigation.close();},threshold:100});


maingateDiv = document.getElementById(maingateId);
maingateDiv.addEventListener('touchstart', function(e) {
    e.preventDefault();
    maingate.mousedown();
});
maingateDiv.addEventListener('mousedown', function(e) {
    e.preventDefault();
    maingate.mousedown();
});
maingateDiv.addEventListener('touchend', function(e) {
    e.preventDefault();
    maingate.mouseup();
});
maingateDiv.addEventListener('mouseup', function(e) {
    e.preventDefault();
    maingate.mouseup();
});
