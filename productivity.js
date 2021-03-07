
// Create a "close" button and append it to each list item
var buttonClickCount = 0;
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}


//TIMER!!!
const pomodoroTimer = document.querySelector('#pomodoro-timer');

const startButton = document.querySelector('#pomodoro-start');
const stopButton = document.querySelector('#pomodoro-stop');

//Start Code
startButton.addEventListener('click', () => {
  toggleClock();
})

//Stop Code
stopButton.addEventListener('click', () => {
  toggleClock(true);
})

//duration event listeners
workDurationInput.addEventListener('input', () => {
  updatedWorkSessionDuration = minuteToSeconds(workDurationInput.value);
})

breakDurationInput.addEventListener('input', () => {
  updatedBreakSessionDuration = minuteToSeconds(breakDurationInput.value);
})

const minuteToSeconds = (mins) => {
  return mins * 60
}

//VARIABLE DEFINITIONS
let isClockRunning = false;

//values are equal to 25 mins
let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;

//value equal to 5 mins
let breakSessionDuration = 300;

//type and current session definition
let type = 'Work';
let timeSpentInCurrentSession = 0;

let currentTaskLabel = document.querySelector('#pomodoro-clock-task');

let updatedWorkSessionDuration;
let updatedBreakSessionDuration;

let workDurationInput = document.querySelector('#input-work-duration');
let breakDurationInput = document.querySelector('#input-break-duration');

let isClockStopped  = true;

workDurationInput.value = '25';
breakDurationInput.value = '5';

const toggleClock = (reset) => {
  if (reset) {
    //stop timer
    stopClock();
  }
  else {
    if (isClockStopped){
      setUpdatedTimers();
      isClockStopped = false;
    }
    if (isClockRunning === true) {
      //pause timer
      clearInterval(clockTimer);
      isClockRunning = false;
    }
    else {
      //start timer
      isClockRunning = true;
      clockTimer = setInterval(() => {
        //decrease time left, increase time spent
        stepDown();
        //currentTimeLeftInSession--
        displayCurrentTimeLeftInSession();
      }, 1000)
      isClockRunning = true;
    }
  }
}

const stopClock = () => {
  setUpdatedTimers();
  displaySessionLog(type);
  //reset timer
  clearInterval(clockTimer);
  //updated variable
  isClockStopped = true;
  isClockRunning = false;
  //reset time
  currentTimeLeftInSession = workSessionDuration;
  //update timer
  displayCurrentTimeLeftInSession();
  type = 'Work';
  timeSpentInCurrentSession = 0
}

const stepDown = () => {
  if (currentTimeLeftInSession > 0) {
    //decrease time left, increase time spent
    currentTimeLeftInSession--;
    timeSpentInCurrentSession++;
  }
  else if (currentTimeLeftInSession === 0) {
    timeSpentInCurrentSession = 0;
    if (type === 'Work') {
      currentTimeLeftInSession = breakSessionDuration;
      displaySessionLog('Work');
      type = 'Break';
      //check and see if break is in the right place...
      //updatedtimers = after break
      setUpdatedTimers();
      currentTaskLabel.value = 'Break';
      currentTaskLabel.disabled = true;
    }
    else {
      currentTimeLeftInSession = workSessionDuration;
      type = 'Work';
      //check and see if work is in the right place...
      //updatedtimers = after work
      setUpdatedTimers();
      if (currentTaskLabel.value === 'Break') {
        currentTaskLabel.value = workSessionLabel;
      }
      currentTaskValue.disabled = false;
      displaySessionLog('Break');
    }
  }
  displayCurrentTimeLeftInSession();
}

const displayCurrentTimeLeftInSession = () => {
  const secondsLeft = currentTimeLeftInSession;
  let result = '';
  const seconds = secondsLeft % 60;
  const minutes = parseInt(secondsLeft / 60) % 60;
  let hours = parseInt(secondsLeft / 3600);
  //add leading zeros if minutes or seconds are less than 10
  function addLeadingZeroes(time) {
    return time < 10 ? `0${time}` : time;
  }
  if (hours < 0) result += `${hours}:`
  result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
  pomodoroTimer.innerText = result.toString();
}

const displaySessionLog = (type) => {
  const sessionsList = document.querySelector('#pomodoro-sessions');
  //append li
  const li = document.createElement('li');
  if (type === 'Work') {
    sessionLabel = currentTaskLabel.value ? currentTaskLabel.value : 'Work';
  }
  else {
    sessionLabel = 'Break';
  }
  let elapsedTime = parseInt(timeSpentInCurrentSession / 60);
  elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1';

  const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`);
  li.appendChild(text);
  sessionsList.appendChild(li);
}

const setUpdatedTimers = () => {
  if (type === 'Work') {
    currentTimeLeftInSession = updatedWorkSessionDuration ? updatedWorkSessionDuration : workSessionDuration;
    workSessionDuration = currentTimeLeftInSession;
  }
  else {
    currentTimeLeftInSession = updatedBreakSessionDuration ? updatedBreakSessionDuration : breakSessionDuration;
    breakSessionDuration = currentTimeLeftInSession;
  }
}

function MusicGenerate() {
  buttonClickCount++
  var audio = document.getElementById("music");
  audio.loop = true;

  if(buttonClickCount % 2 == 1){

    audio.play();


  }

  
}

