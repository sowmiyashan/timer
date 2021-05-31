
function addSpan(num,hand){
    var numbers = document.getElementById(hand);
    for(i=0; i<num; i++){
        var span = document.createElement("span")
        if(i<10){
            span.textContent = '0'+i
        }
        else{
            span.textContent = i;
        }
        numbers.appendChild(span);
    }
    return numbers;
}

var hour = document.getElementById("hour");
hour = addSpan(100,'hour');
var hr = hour.getElementsByTagName("span");
var hindex = 0;


var minute = document.getElementById("minute");
minute = addSpan(60,'minute');
var min = minute.getElementsByTagName("span");
var mindex = 0;



var ss = document.getElementById("sec");
ss = addSpan(60,'sec')
var sec = ss.getElementsByTagName("span");
var sindex = 0;



function nextNum(value){
    if(value == "hr"){
        hr[hindex].style.display = 'none';
        hindex = (hindex + 1) % hr.length;
        hr[hindex].style.display = 'initial';
    }
    else if(value == "minute"){
        min[mindex].style.display = 'none';
        mindex = (mindex + 1) % min.length;
        min[mindex].style.display = 'initial';
    }
    else{
        sec[sindex].style.display = 'none';
        sindex = (sindex + 1) % sec.length;
        sec[sindex].style.display = 'initial';
    }
    btn();
}

function prevNum(value){
    if(value == "hr"){
        hr[hindex].style.display = 'none';
        hindex = (hindex - 1 + hr.length) % hr.length;
        hr[hindex].style.display = 'initial';
    }
    else if(value == "minute"){
        min[mindex].style.display = 'none';
        mindex = (mindex - 1 + min.length) % min.length;
        min[mindex].style.display = 'initial';
    }
    else{
        sec[sindex].style.display = 'none';
        sindex = (sindex - 1 + sec.length) % sec.length;
        sec[sindex].style.display = 'initial';
    }
    btn();
}


var startbtn = document.getElementById("startbtn")
btn();
function btn(){
    if((hindex == 0) && (mindex == 0) && (sindex == 0)){
        startbtn.disabled = true
    }
    else{
        startbtn.disabled = false
    }
}

var TIME_LIMIT = 0;

// TIME_LIMIT = (hindex  * 3600) + (mindex * 60) + sindex;
// Start with an initial value of 20 seconds

const FULL_DASH_ARRAY = 754;

// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;

function calcTime(){
    TIME_LIMIT = (hindex  * 3600) + (mindex * 60) + sindex +1 ;
    timeLeft = TIME_LIMIT;
}


function formatTime(time) {

    let hours = Math.floor(time/3600);
    // The largest round integer less than or equal to the result of time divided being by 60.
    let minutes = Math.floor((time - hours*3600) / 60);
    
    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;
    
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds<10) {
      seconds = `0${seconds}`;
    }
    if (minutes<10) {
        minutes = `0${minutes}`;
    }
    if (hours<10) {
        hours = `0${hours}`;
    }
    // The output in MM:SS format
    return `${hours} : ${minutes} : ${seconds}`;
}

let timerInterval = null;



// Divides time left by the defined time limit.
function calculateTimeFraction() {
    let rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
      
// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 754`;
    document
      .getElementById("animateCircle")
      .setAttribute("stroke-dasharray", circleDasharray);
}

function startTimer() {
    timerInterval = setInterval(() => {
      // The amount of time passed increments by one
      if(timeLeft!=0){
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;   
        setCircleDasharray();
      }
      else{
        stopTimer();
        document.getElementById("animateCircle").setAttribute("stroke-dasharray", "754");
    }
      
      
      // The time left label is updated
      document.getElementById("time-left").innerHTML = formatTime(timeLeft);
      
    }, 1000); 
}

function stopTimer(){
    clearTimeout(timerInterval);
}

document.getElementById("circular").innerHTML = `
        <div class="wrap">
            <div id="timer">
            <svg width="260" height="260" class="base-timer__svg">
                <circle class="defaultCircle" cx="125" cy="125" r="120" stroke="#80eeff"
                stroke-width="5" fill="none" stroke-linecap="round" />
                <circle id="animateCircle" cx="135" cy="125" r="120" stroke="#00deff"
                stroke-width="5" fill="none" stroke-dasharray="754" stroke-linecap="round" /> 
            </svg>

                <span id="time-left">
                    00 : 00 : 00
                </span>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="btn-row">
                <div class="col-6">
                    <button type="button" onclick="PR()" id="pause" style="background-color: #fff5ab; color: #c449c2" class="start btn">Pause</button>
                </div>
                <div class="col-6">
                    <button type="button" onclick="cancel()" id="cancel" class=" start btn">Cancel</button>
                </div>    
            </div>
        </div>
        
`;


function start(){
    circle = document.getElementById("animateCircle")
    console.log(circle);
    calcTime();
    input = document.getElementById("input")
    input.style.display = "none"
    circular = document.getElementById("circular")
    circular.style.display = "initial"
    startTimer();
}

var pr = 0;

function PR(){
    if(pr == 0){
        clearTimeout(timerInterval);
        document.getElementById("pause").textContent = "Resume";
        document.getElementById("pause").style.backgroundColor = "#867ae9"
        document.getElementById("pause").style.color = "#fff5ab"
        pr = 1;
    }
    else{
        startTimer();
        document.getElementById("pause").textContent = "Pause";
        document.getElementById("pause").style.backgroundColor = "#fff5ab"
        document.getElementById("pause").style.color = "#c449c2"
        pr=0
    }
}

function cancel(){
    if(pr == 1){
        PR();
    }
    input = document.getElementById("input")
    input.style.display = "initial"
    circular = document.getElementById("circular")
    circular.style.display = "none"
    stopTimer();
    document.getElementById("animateCircle").setAttribute("stroke-dasharray", "754");
    timePassed = TIME_LIMIT = timeLeft = 0;
    timerInterval = null;
    document.getElementById("time-left").innerHTML = formatTime(timeLeft);
    
}

