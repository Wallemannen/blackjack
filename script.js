// =====================================
// BLACKJACK COACH v2.8
// =====================================


let playerHand=[];
let dealerHand=[];

let split1=[];
let split2=[];


let phase="playerFirst";

let activeHand="player";


let splitMode=false;

let gameFinished=false;



// =====================================
// NY HAND
// =====================================


function newHand(){


playerHand=[];
dealerHand=[];


split1=[];
split2=[];


phase="playerFirst";

activeHand="player";

splitMode=false;

gameFinished=false;



document
.getElementById("splitSection")
.classList.add("hidden");



document
.getElementById("splitBtn")
.classList.add("hidden");



document
.getElementById("finalResult")
.classList.add("hidden");



update();

}





// =====================================
// LÄGG KORT
// =====================================


function addCard(card){


if(gameFinished)
return;



// SPELARENS START

if(phase==="playerFirst"){


playerHand.push(card);



if(playerHand.length===2){


phase="dealerOpen";

activeHand="dealer";


}



}





// DEALERNS ÖPPNA KORT

else if(phase==="dealerOpen"){


dealerHand.push(card);



phase="playerTurn";


activeHand="player";



}







// SPELARENS TUR

else if(phase==="playerTurn"){



getActiveHand().push(card);



checkBust(getActiveHand());



}






// DEALERNS TUR

else if(phase==="dealerTurn"){


dealerHand.push(card);


checkDealer();



}



update();


}







// =====================================
// AKTIV HAND
// =====================================


function getActiveHand(){


if(activeHand==="player")
return playerHand;


if(activeHand==="split1")
return split1;


if(activeHand==="split2")
return split2;



return dealerHand;


}








// =====================================
// STANNA
// =====================================


function stand(){


if(gameFinished)
return;





// VANLIG HAND

if(activeHand==="player" && !splitMode){


phase="dealerTurn";

activeHand="dealer";


update();


return;


}





// SPLIT 1

if(activeHand==="split1"){


document
.getElementById("splitBox1")
.classList.remove("active-hand");


document
.getElementById("splitBox1")
.classList.add("dim");



activeHand="split2";



document
.getElementById("splitBox2")
.classList.remove("dim");


document
.getElementById("splitBox2")
.classList.add("active-hand");



update();

return;


}





// SPLIT 2


if(activeHand==="split2"){


document
.getElementById("splitBox2")
.classList.remove("active-hand");


document
.getElementById("splitBox2")
.classList.add("dim");



phase="dealerTurn";

activeHand="dealer";



update();


}



}








// =====================================
// SPLIT
// =====================================


function splitHand(){


if(playerHand.length!==2)
return;



if(
cardValue(playerHand[0]) !==
cardValue(playerHand[1])
)
return;



splitMode=true;



split1=[
playerHand[0]
];


split2=[
playerHand[1]
];



playerHand=[];



document
.getElementById("splitSection")
.classList.remove("hidden");



document
.getElementById("splitBtn")
.classList.add("hidden");



activeHand="split1";

phase="playerTurn";



document
.getElementById("splitBox1")
.classList.add("active-hand");



document
.getElementById("splitBox2")
.classList.add("dim");



update();



}








// =====================================
// KORTVISNING
// =====================================


function showCards(id,hand){


let box=
document.getElementById(id);



box.innerHTML="";



hand.forEach(card=>{


let div=
document.createElement("div");


div.className="card";


let symbol="♠";


if(card==="Kn")
symbol="♥";


if(card==="D")
symbol="♦";


if(card==="K")
symbol="♣";


div.innerHTML=
card+symbol;


box.appendChild(div);



});



}









// =====================================
// UPDATE
// =====================================


function update(){


showCards(
"playerCards",
playerHand
);


showCards(
"dealerCards",
dealerHand
);



showCards(
"split1Cards",
split1
);


showCards(
"split2Cards",
split2
);





document
.getElementById("playerScore")
.innerHTML=
playerHand.length
?
"Poäng "+handTotal(playerHand)
:
"";



document
.getElementById("dealerScore")
.innerHTML=
dealerHand.length
?
"Poäng "+handTotal(dealerHand)
:
"";



updateFocus();

updateTitle();

checkSplit();

showAdvice();


}








// =====================================
// FOKUS
// =====================================


function updateFocus(){


let p=
document.getElementById("playerBox");


let d=
document.getElementById("dealerBox");



p.classList.remove("active","dim");

d.classList.remove("active","dim");





if(activeHand==="dealer"){


d.classList.add("active");

p.classList.add("dim");


}

else{


p.classList.add("active");

d.classList.add("dim");


}



}








// =====================================
// TITEL
// =====================================


function updateTitle(){


let title=
document.getElementById("cardTitle");


let status=
document.getElementById("gameStatus");



if(activeHand==="dealer"){


title.innerHTML="DEALERNS KORT";

status.innerHTML="DEALERNS TUR";


}


else if(activeHand==="split1"){


title.innerHTML="SPLIT 1 KORT";

status.innerHTML="SPLIT 1";


}


else if(activeHand==="split2"){


title.innerHTML="SPLIT 2 KORT";

status.innerHTML="SPLIT 2";


}


else{


title.innerHTML="DITT KORT";

status.innerHTML="DIN TUR";


}



}









// =====================================
// SPLITKNAPP
// =====================================


function checkSplit(){


let btn=
document.getElementById("splitBtn");



if(

playerHand.length===2 &&

cardValue(playerHand[0])===cardValue(playerHand[1]) &&

!splitMode

){


btn.classList.remove("hidden");


}

else{


btn.classList.add("hidden");


}



}









// =====================================
// RÅD
// =====================================


function showAdvice(){


let box=
document.getElementById("advice");


let percent=
document.getElementById("percentage");



let hand=getActiveHand();



if(activeHand==="dealer"){


box.innerHTML="Dealer spelar";

percent.innerHTML="";


return;


}




if(hand.length<2){


box.innerHTML="Välj kort";

percent.innerHTML="";

return;


}




let total=
handTotal(hand);



if(

hand.length===2 &&

cardValue(hand[0])===cardValue(hand[1])

){


box.innerHTML="✂ SPLIT";

percent.innerHTML=
"Split 52% | Stanna 48%";


return;


}




if(total>=17){


box.innerHTML="🟥 STANNA";


percent.innerHTML=
"Stanna 60% | Ta kort 25%";


}

else{


box.innerHTML="🟩 TA KORT";


percent.innerHTML=
"Ta kort 55% | Stanna 35%";


}



}









// =====================================
// BUST
// =====================================


function checkBust(hand){



if(handTotal(hand)>21){



if(activeHand==="dealer"){


finish("DEALER BUST - DU VINNER");


}

else{


finish("BUST - FÖRLUST");


}



}



}








// =====================================
// DEALER
// =====================================


function checkDealer(){


let total=
handTotal(dealerHand);



if(total>21){


finish("DEALER BUST - DU VINNER");


return;


}



if(total>=17){


compareHands();


}



}








// =====================================
// RESULTAT
// =====================================


function compareHands(){


let dealer=
handTotal(dealerHand);


let player=
handTotal(playerHand);



if(dealer>player){


finish("DEALER VINNER");


}

else if(dealer===player){


finish("PUSH");


}

else{


finish("DU VINNER");


}



}





function finish(text){


gameFinished=true;



document
.getElementById("finalResult")
.classList.remove("hidden");



document
.getElementById("resultText")
.innerHTML=text;


}








// =====================================
// BLACKJACK VÄRDE
// =====================================


function cardValue(card){


if(
card==="Kn" ||
card==="D" ||
card==="K"
)

return 10;



if(card==="A")

return 11;



return Number(card);


}





function handTotal(hand){



let total=0;

let aces=0;



hand.forEach(card=>{


total+=cardValue(card);



if(card==="A")

aces++;



});



while(total>21 && aces>0){


total-=10;

aces--;


}



return total;


}






newHand();