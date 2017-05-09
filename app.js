$("input#address").suggest({
	label : "Adresse complete", 
	street_number_input : {
		id : "number",
		label : "Numero de la rue"
	},
	street_name_input : {
		id : "street",
		label : "Nom de la rue"
	},
	zip_input : {
		id : "zip",
		label : "Code postal"
	},
	town_input : {
		id : "town",
		label : "Ville"
	},
	department_input : {
		id : "department",
		label : "Departement"
	},
	region_input : {
		id : "region",
		label : "Region"
	},
	country_input : {
		id : "country",
		label : "Pays"
	}
});



