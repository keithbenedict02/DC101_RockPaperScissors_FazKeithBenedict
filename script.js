let choices = ["paper","rock","scissors"];
let userScore=0, comScore=0;
let muted=false;
let canPlay = true;
const COOLDOWN = 3000; 
const clickSound=document.getElementById("clickSound");
const winSound=document.getElementById("winSound");
const loseSound=document.getElementById("loseSound");
const drawSound=document.getElementById("drawSound");
const bgm=document.getElementById("bgm");
const muteBtn=document.getElementById("muteBtn");

const overlay=document.getElementById("result-overlay");
const overlayText=document.getElementById("overlay-text");


document.body.addEventListener("click",()=>{
    bgm.volume=0.2;
    clickSound.volume = 0.8; 
    winSound.volume   = 1.0; 
    loseSound.volume  = 0.8; 
    drawSound.volume  = 0.5; 
    bgm.play();
},{once:true});


muteBtn.onclick=()=>{
    muted=!muted;
    [clickSound,winSound,loseSound,drawSound,bgm].forEach(s=>s.muted=muted);
    muteBtn.innerHTML=muted?'<i class="fas fa-volume-mute"></i>':'<i class="fas fa-volume-up"></i>';
};


function updateScore(){ document.getElementById("score").innerHTML=`${userScore} - ${comScore}`; }


function icon(choice){
    if(choice==="paper")return'<i class="far fa-hand-paper"></i>';
    if(choice==="rock")return'<i class="far fa-hand-rock"></i>';
    return'<i class="far fa-hand-scissors"></i>';
}



function game(userChoice){

    
    if(!canPlay) return;

  
    canPlay = false;

    clickSound.currentTime = 0;
    clickSound.play();

    const comChoice = choices[Math.floor(Math.random()*3)];

    document.getElementById("YourObject").innerHTML = icon(userChoice);
    document.getElementById("ComObject").innerHTML  = icon(comChoice);

    if(
        (userChoice==="rock" && comChoice==="scissors") ||
        (userChoice==="paper" && comChoice==="rock") ||
        (userChoice==="scissors" && comChoice==="paper")
    ) win(userChoice);
    else if(userChoice === comChoice) draw(userChoice);
    else lose(userChoice);

    
    setTimeout(() => {
        canPlay = true;
    }, COOLDOWN);
}



function showOverlay(text,color){
    overlayText.textContent=text;
    overlayText.style.color=color;
    overlay.classList.add("show");
    setTimeout(()=>overlay.classList.remove("show"),1200);
}


function win(c){ userScore++; updateScore(); winSound.play(); animate(c,"green"); showOverlay("YOU WIN!","lime"); }
function lose(c){ comScore++; updateScore(); loseSound.play(); animate(c,"red"); showOverlay("YOU LOSE!","red"); }
function draw(c){ drawSound.play(); animate(c,"gray"); showOverlay("DRAW!","cyan"); }


function animate(choice,color){
    const btn=document.getElementById(choice);
    btn.classList.replace("bn",color);
    setTimeout(()=>btn.classList.replace(color,"bn"),1200);
}
