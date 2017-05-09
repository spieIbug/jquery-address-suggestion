/**
* @Author : Maamar Yacine MEDDAH
* Jquery Plugin that uses Google Map Geocode Api.
* Used for address suggestion 
*/
$.fn.extend({
  suggest: function(options) {
	var suggestedAddresses = [];
	const input = this;
	var selectedAddressIndex = -1;
	const fields = options || {
		label : "Formatted address", 
		street_number_input : {
			id : "number",
			label : "Street number"
		},
		street_name_input : {
			id : "street",
			label : "Street"
		},
		zip_input : {
			id : "zip",
			label : "Zip code"
		},
		town_input : {
			id : "town",
			label : "Town"
		},
		department_input : {
			id : "department",
			label : "Department"
		},
		region_input : {
			id : "region",
			label : "Region"
		},
		country_input : {
			id : "country",
			label : "Country"
		}
	}
	$("<div class=\"suggestions-container\" id=\"suggestions-container\"></div>" ).insertAfter(input);
	for (var key in fields){
		$("label[for = '"+fields[key].id+"']").html(fields[key].label);
	}
	$("label[for = '"+input.attr('id')+"']").html(fields.label);
	$(input).on("input", function(){
		selectedAddressIndex = -1;
		$.ajax({
			url: "https://maps.googleapis.com/maps/api/geocode/json?address="+this.value
		}).done(function(response) {
			if(response.status==="OK"){
				var receivedAddresses = response.results;
				if (receivedAddresses.length){
					suggestedAddresses = extract(receivedAddresses);
				}
			}
			$(".suggestions-container").html(format(suggestedAddresses));
			$(".suggestions-container").show();
			$("div.suggestions-container-row").hover(function() {
				$("div.suggestions-container-row").css('background','#ffffff');
				selectedAddressIndex = $(this).attr("data-index");
				$(input).val(suggestedAddresses[selectedAddressIndex].formatted);
				$(this).focus();
				$(this).css('background','#9191e9');
			}).click(function(){
				selectedAddressIndex = $(this).attr("data-index");
				$(input).val(suggestedAddresses[selectedAddressIndex].formatted);
				fillFields(fields);
				$(".suggestions-container").hide();
			});
		}).fail(function(){
			$(".suggestions-container").hide();
		});
	}); 
	/**
	* Section that handle keys up/down/enter/esc to navigate between results
	*/	
	$(document).keydown(function(e) {
		switch(e.which) {
			case 38: {
				// up
				$("#address_"+selectedAddressIndex).css('background','#ffffff');
				if (selectedAddressIndex>0) {
					selectedAddressIndex--;
				}
				$(input).val(suggestedAddresses[selectedAddressIndex].formatted);
				fillFields(fields);
				$("#address_"+selectedAddressIndex).focus();
				$("#address_"+selectedAddressIndex).css('background','#9191e9');
				break;
			}
			case 40: {
				// down
				$("#address_"+selectedAddressIndex).css('background','#ffffff');
				if (selectedAddressIndex<suggestedAddresses.length-1) {
					selectedAddressIndex++;
				}
				$(input).val(suggestedAddresses[selectedAddressIndex].formatted);
				fillFields(fields);
				$("#address_"+selectedAddressIndex).focus();
				$("#address_"+selectedAddressIndex).css('background','#9191e9');
				break;
			}
			case 13: {
				fillFields(fields);
				$(".suggestions-container").hide();
				break;
			}
			case 27: {
				fillFields(fields);
				$(".suggestions-container").hide();
				break;
			}
			default: return; // exit this handler for other keys
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	function fillFields(fields){
		$("#"+fields.street_number_input.id).val(suggestedAddresses[selectedAddressIndex].detail.number);
		$("#"+fields.street_name_input.id).val(suggestedAddresses[selectedAddressIndex].detail.street);
		$("#"+fields.zip_input.id).val(suggestedAddresses[selectedAddressIndex].detail.zip);
		$("#"+fields.town_input.id).val(suggestedAddresses[selectedAddressIndex].detail.town);
		$("#"+fields.department_input.id).val(suggestedAddresses[selectedAddressIndex].detail.department);
		$("#"+fields.region_input.id).val(suggestedAddresses[selectedAddressIndex].detail.region);
		$("#"+fields.country_input.id).val(suggestedAddresses[selectedAddressIndex].detail.country);
	}
	/**
	* Format suggested addresses to divs that will be included into the Suggestions list
	*/
	function format(suggestedAddresses) {
		var htmlGlobal = "";
		suggestedAddresses.forEach(function(address, index){		
			var htmlCurrent =""
			htmlCurrent +="<div class=\"suggestions-container-row\" tabindex=\""+index+"\" id=\"address_"+index+"\" data-index=\""+index+"\">";
					htmlCurrent +=address.formatted;
			htmlCurrent +="</div>";
			htmlGlobal+=htmlCurrent;
		});
		return htmlGlobal;
	}
	/**
	* Extracts Google Map result and transform it to a smaller structure
	*/
	function extract(receivedAddresses){
			var suggestedAddresses = [];
			receivedAddresses.forEach(function(addressComponent){
				var address = {};
				address.formatted = addressComponent.formatted_address;
				address.latlng = addressComponent.geometry.location;
				address.detail = {};
				addressComponent.address_components.forEach(function(component){
					if (component.types.indexOf("street_number")>-1){
						// set numero
						address.detail.number = component.long_name;
					}
					if (component.types.indexOf("route")>-1){
						// set voie
						address.detail.street = component.long_name;
					}
					if (component.types.indexOf("locality")>-1){
						// set ville
						address.detail.town = component.long_name;
					}
					if (component.types.indexOf("administrative_area_level_2")>-1){
						// set departement
						address.detail.department = component.long_name;
					}
					if (component.types.indexOf("administrative_area_level_1")>-1){
						// set region
						address.detail.region = component.long_name;
					}
					if (component.types.indexOf("country")>-1){
						// set pays
						address.detail.country = component.long_name;
					}
					if (component.types.indexOf("postal_code")>-1){
						// set code postal
						address.detail.zip = component.long_name;
					}
				});
				suggestedAddresses.push(address);
			});
			return suggestedAddresses;
		}
  }
});
