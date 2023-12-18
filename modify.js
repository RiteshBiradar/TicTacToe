const audio = new Audio("audio/audio.mp3");
let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msgContainer");
let spanTag =document.querySelector("#spanTag");
let spanTag1 =document.querySelector("#span1Tag");
let draw =document.querySelector("#draw");
let resetBtn = document.querySelector(".resetBtn");
let newBtn = document.querySelector(".newBtn");

let turnO = true;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6],
];
boxes.forEach((box) => {
    box.addEventListener("click",() => {
        audio.play();
        if(turnO){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X"
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    })
});

let moves=0;
const maxMoves=9;
let add=0;
const checkWinner=()=>{
        for(let pattern of winPatterns){
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;
            if(pos1!="" && pos2!=""&&pos3!=""){
            if(pos1===pos2&&pos1===pos3){
                console.log("winner",pos1);
                showWinner(pos1);
                disableBoxes();
                countWinner(pos1);
                return;
            }
        }
        }
        moves++;
        checkDraw();
}

const checkDraw=()=>{
    if (moves === maxMoves) {
        add++;
        msg.innerText = "It's a draw";
        draw.innerText = add;
        msgContainer.classList.remove("hide");
    }
}

const showWinner = (winner) =>{
    msg.innerText=`Congratulations winner is ${winner}`;
    msgContainer.classList.remove("hide");

}

const disableBoxes=()=>{
    for(const box of boxes){
        box.disabled=true;
    }
}

let add1 = 0;
let add2 = 0;
const countWinner = (pos1) =>{
    if(`${pos1}`==='O'){
        add1++;
    spanTag.innerText = add1;
    }
    else if(`${pos1}`==='X'){
        add2++;
        spanTag1.innerText=add2;
    }
 }


const resetGame = ()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    moves = 0;

}

const newGame = ()=>{
    turnO=true;
    enableBoxes();
    add=0;
    add1=0;
    add2=0;
    spanTag.innerText='';
    spanTag1.innerText='';
    draw.innerText='';
    msgContainer.classList.add("hide");

}

const enableBoxes=()=>{
    for(const box of boxes){
        box.disabled=false;
        box.innerText='';
    }
}
resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",newGame);
