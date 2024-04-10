let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","green","blue"];
let started=false;
let level=0;
const listlevel=[];
let h2=document.querySelector("h2");
let h4=document.querySelector("h4");

let highestScore = localStorage.getItem("highestScore");
if (highestScore === null) {
    highestScore = 0;
} else {
    highestScore = parseInt(highestScore);
}
function updateHighestScore() {
    h4.innerText = `Highest Score = ${highestScore}`;
    localStorage.setItem("highestScore", highestScore);
}


document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game stated.");
        started=true;
        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randInd=Math.floor(Math.random()*3);
    let randColor=btns[randInd];
    let randbtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}
function checkAns(idx){
   
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp(),1000);
        }
    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        if (level > highestScore) {
            highestScore = level;
            updateHighestScore();
        }
        reset();   
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allbtn=document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click",btnPress)
}
function reset(){
    started=false;
    gameSeq=[];
    level=0;
    userSeq=[];
}
updateHighestScore();