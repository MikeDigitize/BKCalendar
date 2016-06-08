(function() {

	if(window.location.href.indexOf("contact") ==== -1) {
		return;
	}

	function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0; i<vars.length; i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){ 
               		return decodeURI(pair[1]);
               	}
       }
       return(false);
	}

	function showAndPopulateInput(input, text) {
		getParentDiv(input).style.display = "block";
		input.value = text;
	}

	function getParentDiv(input) {
		var parent = input.parentNode;
		while(parent.tagName !== "DIV") {
			parent = parent.parentNode;
		}
		return parent;
	}

	var event = getQueryVariable('event');
	var date = getQueryVariable('date');
	var time = getQueryVariable('time');
	var vehicle = getQueryVariable('vehicle');

	
	var form = document.querySelector("form");
	var formInputs = [].slice.call(form.querySelectorAll("input")).filter(function(input) {
		return input.type === "text";
	}).filter(function(_, i) {
		return i > 0;
	});

	if(vehicle) {
		showAndPopulateInput(formInputs[0], vehicle);
	}

	if(event) {
		showAndPopulateInput(formInputs[1], event);
	}

	if(date) {
		showAndPopulateInput(formInputs[2], date);
	}

	if(time) {
		showAndPopulateInput(formInputs[3], time);
	}

})();

