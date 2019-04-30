function init() {
    var myMap = new ymaps.Map('map', {
        center: [55.74, 37.58],
        zoom: 13,
        controls: []
    });
    searchControl = new ymaps.control.SearchControl({
        options: {
            provider: 'yandex#search',
            noSelect: true
        }

    });

    searchControl.events.add('load', function (event) {

        if (!event.get('skip') && searchControl.getResultsCount()) {
            var lat = searchControl.getResult(0)._value.geometry._coordinates[0];
            var lon = searchControl.getResult(0)._value.geometry._coordinates[1];
            getTimeZone(lat,lon);
	    console.log('search');
        }
    });

    myMap.controls.add(searchControl);
    searchControl.search('Тюмень');
}

function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));
    return nd;
}

function startTime(){
        var tm=calcTime(timeOffset);
        var h=tm.getHours();
        var m=tm.getMinutes();
        var s=tm.getSeconds();
        m=checkTime(m);
        s=checkTime(s);
        $('#txt').html(h+":"+m+":"+s);
        t=setTimeout('startTime()',1000);
}

function checkTime(i){
 if (i<10) { i="0" + i; }
   return i;
 }

function getTimeZone(lat,lon){
    $.getJSON('http://api.geonames.org/timezoneJSON?lat='+lat+'&lng='+lon+'&username=hashkeeperok',function(data){
        timeOffset = data['gmtOffset'];
	if(timeOffset > 0){
		$('#gmt').html('   GMT +' + timeOffset);
	} else if(timeOffset <0) {
        	$('#gmt').html('   GMT -' + timeOffset);
   	} else {
        	$('#gmt').html('   GMT  ' + timeOffset);
    }

    });
}

document.addEventListener("DOMContentLoaded", ready);
function ready() {
    timeOffset = 5;
    startTime();
    ymaps.ready(init);
    if(timeOffset > 0){
        $('#gmt').html('   GMT +' + timeOffset);
    } else if(timeOffset <0) {
        $('#gmt').html('   GMT -' + timeOffset);
    } else {
    	$('#gmt').html('   GMT  ' + timeOffset);
    } 
    $('.togCity').show('slow');
}






