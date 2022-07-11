const inputContainer = document.querySelector(".inputs")
const discTitle = document.querySelector(".disc")
const gussCount = document.querySelector(".guess-count")
const restButton = document.querySelector("button")
const typing = document.querySelector(".typing")
const succ = new Audio("audio/audio.mp3")
const winner = document.querySelector(".winner")
// all words
const words = [
    {
        word: "react",
        disc: "JavaScript Library",
    },
    {
        word: "vue",
        disc: "JavaScript Framework",
    },
    {
        word: "vue",
        disc: "JavaScript Framework",
    },
    {
        word: "angular",
        disc: "JavaScript MVW Framework",
    },
    {
        word: "php",
        disc: "general-purpose scriting language",
    },
    {
        word: "ruby",
        disc: "open source programming language",
    },
    {
        word: "python",
        disc: " programming language",
    },
    {
        word: "tailwind",
        disc: "A utility-first CSS framework",
    },
    {
        word: "bootstrap",
        disc: "world's most famous free CSS framework",
    },
];
 
//variables
let word , 
maxGuess = 12,
countToWin = [];

//focus input after user keydown
document.addEventListener("keydown", () => typing.focus());

//start game after user keydown
typing.addEventListener("input" , startGame)

//handle click resetButton change game
restButton.addEventListener("click", getRandomWork)

//get Random Work
function getRandomWork(){
    //handle reset element
    reset();
    let randomObject = words[Math.floor(Math.random() * words.length)]
    let disc = randomObject.disc;

    //ovwrwrite values
    word = randomObject.word;

    //add discrebtion
    discTitle.innerHTML = disc;

    //add guess count
    gussCount.innerText = maxGuess;

    //creat inputs
    let inputs = "";
    for (let i=0; i < word.length; i++){
        inputs += `<input type="text" disabled />`
    }
    inputContainer.innerHTML = inputs;
}

getRandomWork();

//start Game
function startGame(e){
    let char = e.target.value;
    if(!char.match(/[a-z]/i)) return;
    if(word.includes(char)){
        for(let i=0 ; i< word.length; i++){
            //add char in poistion && cheack position is found or not
            if(word[i] === char && !inputContainer.querySelectorAll('input')[i].value) {
                inputContainer.querySelectorAll('input')[i].value = char;
                countToWin.push(char);
            }
        }
    }else{
        maxGuess--;
    }
    gussCount.innerText = maxGuess;
    typing.value = "";

    //Winer
    if(countToWin.length === word.length){
        winner.classList.remove("hidden")
        succ.play();
        countToWin = [];
    }
    //lose
    setTimeout(() => {
     if(maxGuess <= 0){
        alert("انت خسرااااااااااان")
        for(let i = 0; i<word.length; i++){
            inputContainer.querySelectorAll("input")[i].value = word[i]; 
         }
    }
    });
}

//reset element
function reset(){
    maxGuess = 12;
    winner.classList.add("hidden");
    countToWin = [];
    succ.pause();
}