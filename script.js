var onoff=false;
var strict=false;
var start = false;
var level = "--";
var sequence = [];
var userSequence=[];
var playTime = true; // user turn
var usetWaitTimer = 2000; // 2 seconds for each sequence value 2*sequence.length

var userTimerCtrl;
var clearColorDelay=800; // how much time wait to clear colors (1 second)


function playsound(sound){
  // play sound
  var a=document.getElementById(sound);
  a.currentTime=0;
  a.play();
}

function checkArray(arr1, arr2){
  if (arr1.length !== arr2.length) {
    return false;
  }
  
  for(var i=0;i<arr1.length;i++) {
    if(arr1[i]!==arr2[i]){
      return false;
    }
  }
  return true;
}

function getRandNum(){
  return Math.floor(Math.random()*4);
}

function digits(num, count){
  return ("00000"+num).slice(-count);
}

function showLevel(lvl){
  $("#display").text(digits(lvl,2));
}

function showSequence(index, max){
  if(index>=max) return;
  
  console.log("showing seq",index);
  switch (sequence[index]){
    case 0:
      $("#topleft").addClass("on");
      break;
    case 1:
      $("#topright").addClass("on");
      break;
    case 2:
      $("#bottomleft").addClass("on");
      break;
    case 3:
      $("#bottomright").addClass("on");
      break;
  };

  // play sound
  playsound("audio");

  //clear on class
  setTimeout(function(){
    console.log("clear color");
    $("#topleft").removeClass("on");
    $("#topright").removeClass("on");
    $("#bottomleft").removeClass("on");
    $("#bottomright").removeClass("on");

    setTimeout(function(){
      showSequence(index+1, max);
    },clearColorDelay);
    
  }, clearColorDelay); 
}

function addData(){
  console.log("ptime",playTime);
  sequence.push(getRandNum());
  console.log("sequence",sequence);
}

function game(add){
  if(!start) return;
  playTime=false;
  showLevel(level);
  if(add) {
    addData();
  }
  
  showSequence(0, sequence.length);
  // user turn
  playTime=true;
  userSequence=[];
  console.log("ptime",playTime);

  //1. create another timer handler to wait for user input
  //2. if user input ontime and correct, clear interval and addData (repeat)
  //3. if userinput incorrect, clear interval, showsequence, and repeat from step 1.
  //4. if timer runout and userinput incomplete, clear interval, showsequence, repeat from step 1.
  
  
  // wait for user input
  userTimerCtrl = setTimeout(function(){
    // check if user input is correct
    console.log(JSON.stringify(sequence));
    console.log(JSON.stringify(userSequence));
    if (checkArray(sequence,userSequence)){
      // both equal, next level
      alert("good job, next level");
      level++;
      game(true);// addData, showSequence, waitForInput, checkInput, repeat
    } else {
      // wrong input, show sequence, wait for input
      alert("wrong input");

      // if strict, re initialize all, start over newSequence
      var startAgain=false;
      if(strict){
        level = "0";
        userSequence=[];
        sequence=[];
        startAgain=true;
      }
      
      game(startAgain); //NOTaddData, showSeq, wait, check, repeat

    }
    
  }, usetWaitTimer*(sequence.length+1));
  
}


///////////////////////
///////////////////////

$(document).ready(function(){
  $("#switchbtn").click(function(){
    onoff=!onoff;
    $(this).toggleClass("on");
    
    console.log("onoff",onoff);
  });

  $("#count").click(function(){
    strict=!strict;
    $("#strict-light").toggleClass("on");
    
    console.log("strict",strict);
  });

  $("#start").click(function(){
    start=!start;
    if(start){
      level=0;
      game(true);
    } else {
      level = "--";
      
      userTimerCtrl = clearTimeout(userTimerCtrl);
    }
    showLevel(level);
    
    console.log("start",start);
  });
  
  
  
  // color buttons on user input
  $("#topleft").mousedown(function(){
    if(playTime) {
      $(this).toggleClass("on");
      userSequence.push(0);
      //play sound
      playsound("audio");
    }
  }).mouseup(function(){
    if(playTime) {
      $(this).removeClass("on");
    }
  });
  
  $("#topright").mousedown(function(){
    if(playTime) {
      $(this).toggleClass("on");
      userSequence.push(1);
      //play sound
      playsound("audio");
    }
  }).mouseup(function(){
    if(playTime) {
      $(this).removeClass("on");
    }
  });
  
  $("#bottomleft").mousedown(function(){
    if(playTime) {
      $(this).toggleClass("on");
      userSequence.push(2);
      //play sound
      playsound("audio");
    }
  }).mouseup(function(){
    if(playTime) {
      $(this).removeClass("on");
    }
  });
  
  $("#bottomright").mousedown(function(){
    if(playTime) {
      $(this).toggleClass("on");
      userSequence.push(3);
      //play sound
      playsound("audio");
    }
  }).mouseup(function(){
    if(playTime) {
      $(this).removeClass("on");
    }
  });
  

});