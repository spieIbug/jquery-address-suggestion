# jquery-address-suggestion
A jquery plugin for address autocomplete using Google Map Geocode API

[jsFiddle Demo](https://jsfiddle.net/yacmed/yp0xmdf5/)

## Install using npm :

```
npm install jquery-address-suggestion
```

## How to use it ?

### HTML Example

```
<div class="form-group col-md-12">
	<label for="address">Address</label>
	<input type="text" class="form-control" id="address">
</div>
<div class="form-group">
	<div class="col-md-4">
		<label for="number">number</label>
		<input type="text" class="form-control" id="number">
	</div>
	<div class="col-md-8">
		<label for="street">street</label>
		<input type="text" class="form-control" id="street">
	</div>	
</div>
<div class="form-group">
	<div class="col-md-4">
		<label for="zip">zip</label>
		<input type="text" class="form-control" id="zip">
	</div>
	<div class="col-md-8">
		<label for="town">town</label>
		<input type="text" class="form-control" id="town">
	</div>	
</div>
<div class="form-group">
	<div class="col-md-4">
		<label for="department">Department</label>
		<input type="text" class="form-control" id="department">
	</div>
	<div class="col-md-4">
		<label for="region">Region</label>
		<input type="text" class="form-control" id="region">
	</div>	
	<div class="col-md-4">
		<label for="country">Country</label>
		<input type="text" class="form-control" id="country">
	</div>	
</div>
<script src="path_to_jquery/jquery.min.js"></script>
<script src="path_to_bootstrap/bootstrap.min.js"></script>
<script src="js/jquery.address-suggest.js"></script>		
```
### JS Example
```
// this config is used to bind field to be autocompleted, and also to internationalize labels
var optionnalConfig = {
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
};
$("input#address").suggest(optionnalConfig);
```