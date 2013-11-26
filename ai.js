// JavaScript Document/Users/karthus/Desktop/CS4386/ai.js

/* Eric

Plz follow the return format of aiAction().

1. focusCardIndex:

2. destPos: {pos:__,x:(__%3)*105+ai.gridPosX,y:Math.floor(__/3)*105+170}  !!!!!!! player.gridPosX if burn player's card

3. if AI steal a card from player, plz also provide
		stealPos: {pos:__,x:(__%3)*105+player.gridPosX,y:Math.floor(__/3)*105+170}

4. plz provide the burn target if use burn
		burnTarget:

5. if AI use clown, plz provide the suit and the rank
		suit:
		rank:
*/
function aiAction(){
	return conservative();
}
function conservative(){		//By Karthus

	var found;
	for (var i = 0; i < 9; i++){
		if (!ai.grid[i]) {										//ai.grid[i] : check whether the grid has card or not 
			var destPos = {pos:i,x:(i%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};	
			break;
		}
	}

	for (var i = 0; i < 6; i++){
		if (dealtCards[i].suit==SPECIAL_SUIT && dealtCards[i].rank==0){				//get Joker  
			found=i;
			alert("Joker");
			return {focusCardIndex:found,destPos:destPos};	
		}
		else if (dealtCards[i].suit==SPECIAL_SUIT && dealtCards[i].rank==2){		//get Torch 
			found=i;
			alert("Torch");
			//  need function update
			return {focusCardIndex:found,destPos:destPos};
		}
	}
	for (var i = 0; i < 6; i++){
		if (dealtCards[i].suit != SPECIAL_SUIT ){								// normal cards		
			found=i;	
			break;								
		}
	}
	alert("testing");
	
	for (var i=0;i<9;i++){												//  Pairs,Flush,Straight.If a pattern can't be formed ,then simply pick a card

		for (var j=0;j<6;j++){

			if ( ai.grid[i]  &&  dealtCards[j].rank==ai.grid[i].rank ){	// Get for pairs  and three of a kind  			
				found=j;
					if (ai.grid[(i)] && ai.grid [(i+1)%8] && ai.grid[(i+2)%8]){

							for (var z=0;z<3;z++){
								
								if (!ai.grid[z]){
									alert("pairs");
									var destPos = {pos:i,x:(z)*105+ai.gridPosX,y:Math.floor(i%3)*105+170};
									return {focusCardIndex:found,destPos:destPos};	
								}
							}
					}	
			}
				

			if (ai.grid[i] && dealtCards[j].suit==ai.grid[i].suit ){		// Get for Flush 
				found=j;
					if (ai.grid[(i)] && ai.grid [(i+1)%8] && ai.grid[(i+2)%8]){

							for (var z=0;z<3;z++){
								
								if (!ai.grid[z]){
									alert("flush");
									var destPos = {pos:i,x:(z)*105+ai.gridPosX,y:Math.floor(i%3)*105+170};
									return {focusCardIndex:found,destPos:destPos};	
								}
							}
					}						
			}

			if ( (ai.grid[i]  &&  ((dealtCards[j].rank-1>ai.grid[i].rank) || (dealtCards[j].rank+1>ai.grid[i].rank) ) )){	// Get for Straight 	
				found=j;
					if (ai.grid[(i)] && ai.grid [(i+1)%8] && ai.grid[(i+2)%8]){

							for (var z=0;z<3;z++){
								
								if (!ai.grid[z]){
									alert("straight");
									var destPos = {pos:i,x:(z)*105+ai.gridPosX,y:Math.floor(i%3)*105+170};
									return {focusCardIndex:found,destPos:destPos};	
								}
							}
					}	
			}		
			
		}	
	}											//focusCardIndex : the index from the card deck 
	alert("random");						
	return {focusCardIndex:found,destPos:destPos};	//destPos : the position of the ai grid 
}
/*
function aggressive(){
	//thoughts by jimmyshum:
	//ai player would not only be target-oriented, it would also think about the player grid for raising the probability of winning the game

}
function targetOriented(){
	//thoughts by jimmyshum:
	//ai player would like to choose some particular conditions for awarding higher scores 
	var prior = new Array();
	var occupiedGrid = 0;
	//count the empty grid in ai panel
	for(var i=0;i<9;i++){
		if(ai.grid[i]){
			occupiedGrid++;
		}
	}

	//Action dealing with the number of empty grid , the first step
	if(occupiedGrid == 0){
		for(var i=0;i<6;i++){
			if(dealtCards[i].suit!=SPECIAL_SUIT){
				if(dealtCards[i].rank >= 10 && dealtCards[i].rank <= 12){
					prior.push(i);
				}
			}
		}
		var choose = prior[Math.floor(Math.random()*prior.length)];
		//test
		alert(choose);


		//For the ai grid part
		//to ensure that the random num is within 0 - 5 (6 will cause arrayOutOfBound)
		do{
			do{
				randNum = Math.floor(Math.random()*9);	
			}while(randNum == 9);
			//|check
			//alert("destPos: "+randNum);
			//|check
			if (!ai.grid[randNum]) {
				var destPos = {pos:randNum,x:(randNum%3)*105+ai.gridPosX,y:Math.floor(randNum/3)*105+170};
			}
			//|check
			//alert(!ai.grid[randNum]);
			//|check
		}while(ai.grid[randNum]);

		return {focusCardIndex:choose,destPos:destPos};

	}
	else
		return random();
}
*/
