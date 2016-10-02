var clicks = 0;
var cursors = 0;
var nextCursorCost = 10;

var autoSave = "on";
var autoSaveCounter = 0;

var multiplier = 1;

function addClick(number){
    clicks = clicks + number;
	document.getElementById("clicks").innerHTML = prettify(clicks);
};

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));    	//works out the cost of this cursor
    if(clicks >= cursorCost){                                  		//checks that the player can afford the cursor
        cursors = cursors + 1;                                  	//increases number of cursors
    	clicks = clicks - cursorCost;                     	    	//removes the clicks spent
        document.getElementById('cursors').innerHTML = prettify(cursors);		//updates the number of cursors for the user
        document.getElementById('clicks').innerHTML = prettify(clicks);  		//updates the number of clicks for the user
    };
    nextCursorCost = Math.floor(10 * Math.pow(1.1,cursors));       	//works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = prettify(nextCursorCost);  	//updates the cursor cost for the user
};

function buyUpgrade(number){
	if (number == 1 && clicks >= 200) {
		clicks -= 200;
		multiplier = multiplier * 2;
	}
}

$(document).ready(function(){
	$(".upgrade").click(function(){
		$(this).hide(1000);
	});
});

$(document).ready(function(){
	$(".testanimation").click(function(){
		$(this).fadeOut();
	});
});

function prettify(input){
    var output = Math.floor(input); 
	return output;
}

function save(){
	var save = {
    clicks: clicks,
    cursors: cursors,
	nextCursorCost: nextCursorCost
	}
	localStorage.setItem("save",JSON.stringify(save));
	console.log("Game saved");
}

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.clicks !== "undefined") clicks = savegame.clicks;
	if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
	if (typeof savegame.nextCursorCost !== "undefined") nextCursorCost = savegame.nextCursorCost;
	document.getElementById('cursors').innerHTML = prettify(cursors);	
    document.getElementById('clicks').innerHTML = prettify(clicks);		
	document.getElementById('cursorCost').innerHTML = prettify(nextCursorCost);
	console.log("Game loaded");
}

function deleteSave(){
	localStorage.removeItem("save");
}

window.setInterval(function(){
	
	if (autoSave == "on") {
		autoSaveCounter += 1;
		if (autoSaveCounter >= 180) {
			save();
			autoSaveCounter = 0;
		}
	}
	
	addClick(cursors*0.2*multiplier);
	
	
}, 1000);

window.onload = load();