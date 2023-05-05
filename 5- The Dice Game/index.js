var randomNumberDice1 = Math.floor(Math.random() * 6) + 1;

var randomDiceImage1 = "/images/dice" + randomNumberDice1 + ".png";

var randomNumberDice2 = Math.floor(Math.random() * 6) + 1;

var randomDiceImage2 = "/images/dice" + randomNumberDice2 + ".png";

document.querySelectorAll("img")[0].setAttribute("src", randomDiceImage1);
document.querySelectorAll("img")[1].setAttribute("src", randomDiceImage2);

if (randomDiceImage1 > randomDiceImage2){
    document.querySelector("h1").innerHTML = "Player 1 wins!";
}
else if (randomDiceImage2 > randomDiceImage1){
    document.querySelector("h1").innerHTML = "Player 2 wins!";
}
else{
    document.querySelector("h1").innerHTML = "Draw!";
}