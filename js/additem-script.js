//Name: Nathan Byarley
//Project: VFW Week 4
//Term: 1306


//wait until the DOM has loaded
window.addEventListener("DOMContentLoaded", function Elist() { 


	//getElementById Function
	function byId(b) {
		var elementBy = document.getElementById(b);
		return elementBy;
	}
	
		//create selection field element
	function listItems(){
		//local variables
		var formTag = document.getElementsByTagName("form");
		var targetList = byId("select");
		var createSelect = document.createElement("select");
		
		//give the select element the attribute of id="ilist"
		createSelect.setAttribute("id", "ilist");
		
		//for loop to run through the itemSlot array
		for(var i=0, j=itemSlot.length; i<j; i++) {
			//local variables
			var createOption = document.createElement("option");
			var optText = itemSlot[i];
			
			createOption.setAttribute("value", optText);
			createOption.innerHTML = optText;
			createSelect.appendChild(createOption);
		}
		targetList.appendChild(createSelect);
		
	}
	
	//get the selected radio button function
	function getSelectedRadio(){
		var radioBtn = document.forms[0].rarity;
		
		//loop check which button has been selected
		for(var i = 0; i < radioBtn.length; i++) {
			if(radioBtn[i].checked) {
				rareValue = radioBtn[i].value;
			}
		}
	}
	
	//get the value of the checkbox
	function getCheckboxValue() {
		//if conditional if the checkbox is checked or not
		if(byId("saveto").checked) {
			saveGearValue = byId("saveto").value;
		} else {
			saveGearValue = "No";
		}
	}
	
	//alter CSS within JS by changing atributes.
	function newDisplay(t) {
		switch(t){
			case "on":
				byId("equipmentForm").style.display = "none";
				byId("cleardata").style.display = "inline";
				byId("showdata").style.display = "none";
				byId("additem").style.display = "inline";
				break;
			case "off":
				byId("equipmentForm").style.display = "block";
				byId("cleardata").style.display = "inline";
				byId("showdata").style.display = "inline";
				byId("additem").style.display = "none";
				byId("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function validate(b){
		//define elements we want to check
		var getEname = byId("ename");//equipment name
		var getIlist = byId("ilist");//item slot
		
		//error message clear
		errorMessage.innerHTML = "";
		getEname.style.border = "1px solid black";
		getIlist.style.border = "1px solid black";
		
		
		//get error message
		var errorArray = [];
		
		//equipment name validation
		if(getEname.value === ""){
			var enameError = "* Please enter the equipment name.";
			getEname.style.border = "1px solid red";
			errorArray.push(enameError);
		}
		
		//item slot validation
		if(getIlist.value === "--Select A Slot--") {
			var ilistError = "* Please choose an item slot.";
			getIlist.style.border = "1px solid red";
			errorArray.push(ilistError);
		}
		
		//if any errors print to screen
		if(errorArray.length >= 1) {
			for(var i=0, j=errorArray.length; i < j; i++) {
				var errorText = document.createElement("li");
				errorText.innerHTML = errorArray[i];
				errorMessage.appendChild(errorText);
			}
			b.preventDefault();
			return false;
		}else {
			//if there are no errors 
			//save the data
			saveData(this.key);
		}
	}
	
	//save data function
	function saveData(key) {
		if(!key) {
		    //if there is no key it means this is a new items and needs a new key.
			var randomID = Math.floor(Math.random()*10000001);
		}else {
		//set the id to the existing key were editing so that it will save over the data
		//the key is the same key thats been passed alon fron the edit buttin even handler
		//to the validate funtion, and then pass here into the store data function.
			randomID = key;
		}
		
		getSelectedRadio(); //calls the radio function
		getCheckboxValue(); //calls the checkbox function
		
		//get form information and store within an object
		var equipment = {};
			equipment.equipmentName = ["Equipment Name:", byId("ename").value];
			equipment.itemList = ["Item Slot:", byId("ilist").value];
			equipment.rarity = ["Rarity:", rareValue];
			equipment.levelSlide = ["Item Level:", byId("islide").value];
			equipment.date = ["Date:", byId("date").value];
			equipment.savegear = ["Save to List:", saveGearValue];
			equipment.addNote = ["Notes:", byId("note").value];
			
			//convert object to string
			localStorage.setItem(randomID, JSON.stringify(equipment));
			
			//notify the user, equipment has been added
			alert("Equipment has been Added");
			
	}
	
	//Get data function
	function getData() {
		//change display scrren
		newDisplay("on");
		
		if(localStorage.length === 0) {
			alert("There is no equipment to view, so default data has been added");
			autoData();
		}
		
		//write data from local storage to the browser
		var createDiv = document.createElement("div");
		createDiv.setAttribute("id", "items");
		
		var createList = document.createElement("ul");
		createDiv.appendChild(createList);
		
		document.body.appendChild(createDiv);
		byId("items").style.display = "block";	
		
		//for loop create the external ul/li tags for the data within localstorage
		for(var i = 0, ls = localStorage.length; i < ls; i++){
			var createListItem = document.createElement("li");
			var linksLi = document.createElement("li");
			createList.appendChild(createListItem);
			
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			//convert string back to object
			var objectString = JSON.parse(value);
			
			var createSubList = document.createElement("ul");
			createListItem.appendChild(createSubList);
			
			//calling the img function
			getImg(objectString.itemList[1],createSubList);
			
			//in loop also creates the li tages for the actual data within localstorage
			for(var y in objectString) {
				var createSubLi = document.createElement("li");
				createSubList.appendChild(createSubLi);
				var optSubText = objectString[y][0] + " " + objectString[y][1];
				
				createSubLi.innerHTML = optSubText;
				createSubList.appendChild(linksLi);
				
				}
				createLinks(localStorage.key(i), linksLi); //creates the edit and deleat links
			}
		}
		
	//get img function
	function getImg(category, createSubList){
		var imageListItem = document.createElement("li");
		createSubList.appendChild(imageListItem);
		//creat the image htlm code
		var newImage = document.createElement("img");
		var setSrc = newImage.setAttribute("src", "img/" + category + ".jpg");
		imageListItem.appendChild(newImage);
	}
	
	//JSON object to auto populate
	function autoData() {
		for(var a in json){
			var RandID = Math.floor(Math.random()*10000001);
			localStorage.setItem(RandID, JSON.stringify(json[a]));
		}
	}
	
	//function . creates the edit and delete 
	function createLinks(key, linksLi) {
		//Edit Link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		
		var editText = "Edit Equipment";
		
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);	
		
		//line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		//delete Link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		
		var deleteText = "Delete Equipment";
		
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem() {
		//grab data from local storage
		var value = localStorage.getItem(this.key);
		var equipment = JSON.parse(value);
		
		//show the form
		newDisplay("off");
		
		//populate the form fields with current local storage
		byId("ename").value = equipment.equipmentName[1];
		byId("ilist").value = equipment.itemList[1];
		var radioBtn = document.forms[0].rarity;
		for(var i = 0; i < radioBtn.length; i++){
			if(radioBtn[i].value == "Common" && equipment.rarity[1] == "Common") {
				radioBtn[i].setAttribute("checked", "checked");
			}else if(radioBtn[i].value == "Uncommon" && equipment.rarity[1] == "Uncommon") {
				radioBtn[i].setAttribute("checked", "checked");
			}else if(radioBtn[i].value == "Rare" && equipment.rarity[1] == "Rare") {
				radioBtn[i].setAttribute("checked", "checked");
			}else if (radioBtn[i].value == "Epic" && equipment.rarity[1] == "Epic"){
				radioBtn[i].setAttribute("checked", "checked");
			}
		}
		byId("islide").value = equipment.levelSlide[1];
		byId("date").value = equipment.date[1];
		
		if (equipment.savegear[1] == "on") {
			byId("saveto").setAttribute("checked", "checked");
		}
		byId("note").value = equipment.addNote[1];
		
		//remove the initial listener from the input 'save contact' button
		save.removeEventListener("click", saveData);
		//change submit button
		byId("saveBtn").value = "Edit Equipment";
		var editButton = byId("saveBtn");
		//save the key value established in this function as a property of the editbutton event
		//so we can use that value when we save the data we edited
		editButton.addEventListener("click", validate);
		editButton.key = this.key;

	}
	//delete individual item
	function deleteItem() {
		var verify = confirm("are you sure you want to delete this equipment");
		if(verify){
			localStorage.removeItem(this.key);
			alert("the Equipment was deleted");
			window.location.reload();
		}else {
			alert("Equipment was not deleted");
		}
	}
		
	
	//clears all data within localstorage as long as teh condtion is false
	//if condition is true here is no data to remove
	function clearLocalStorage() {
		if(localStorage.length === 0){
			alert("There is no data to clear");
			
		}else {
			localStorage.clear();
			alert("All Equipment has been removed");
			window.location.reload();
			return false;
			
		}
	}
	
	
	//global variables
	var itemSlot = ["--Select A Slot--", "Belt", "Chest", "Feet", "Gloves", "Helmet", "Pants", "Shoulders", "Back", "Main Hand", "Off Hand", "Two Handed", "Neck", "Left Ring", "Right Ring"];
	var rareValue;
	var saveGearValue = "No";
	var errorMessage = byId("errors");
	
	//call the list items function
	listItems();
	
	
	//showdata event
	var displayLink = byId("showdata");
	displayLink.addEventListener("click", getData);

	//cleardata event
	var removeDataLink = byId("cleardata");
	removeDataLink.addEventListener("click", clearLocalStorage);
	
	//save event
	var save = byId("saveBtn");
	save.addEventListener("click", validate);

});//End of window Listener

