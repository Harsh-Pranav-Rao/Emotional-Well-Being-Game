//The list of emotions
var emotions = ["angry", "calm", "happy", "love", "sad", "scared"];

//The number Of Buttons
var numberOfButtons = document.querySelectorAll(".button").length;

//The sounds in the game
var correct_Sound = new Audio("Sounds/Correct_Sound.m4a");
var wrong_Sound = new Audio("Sounds/Wrong_Sound.m4a");
var initialInstruction_Sound = new Audio("Sounds/soundsOfEmotions/initialInstruction.m4a");


var nextButton = document.querySelector('.next');
var finishButton = document.querySelector('.finish');
var emotion_label = document.getElementById("emotionLabel")
var sparkles_effect = document.querySelector('.sparkles');
var correct_label = document.querySelector('.Correct_label')
var not_quite_label = document.querySelector('.Not_Quite_label')
var who_Is_text_label = document.querySelector('.Who_Is_text')
var tick_icon_1 = document.querySelector('.tick_icon_1')
var cross_icon_1 = document.querySelector('.cross_icon_1')
var tick_icon_2 = document.querySelector('.tick_icon_2')
var cross_icon_2 = document.querySelector('.cross_icon_2')
// var pointsInt = 0;
// var pointsStr = pointsInt.toString();
var level;
var wrong_index = []
var score = 0;
var randomNumber1;
var randomNumber2;
var randomEmotion;

//The randomize function
function randomize() {
  level = 1
  //why does alert still say one?
  //!!!!!PROBLEM!!!!!1
  //alert(level)


  $('.image').addClass('hover')

  //Hide the name of the random emotion (Till it's revealed)
  document.querySelectorAll(".image")[0].style.visibility = "hidden";
  document.querySelectorAll(".image")[1].style.visibility = "hidden";
  who_Is_text_label.style.visibility = "hidden";
  emotion_label.style.visibility = "hidden";
  correct_label.style.visibility = "hidden";
  not_quite_label.style.visibility = "hidden";
  sparkles_effect.style.visibility = "hidden";
  tick_icon_1.style.visibility = "hidden";
  cross_icon_1.style.visibility = "hidden";
  tick_icon_2.style.visibility = "hidden";
  cross_icon_2.style.visibility = "hidden";
  nextButton.style.visibility = "hidden";
  finishButton.style.visibility = "hidden";



  //Play 'Click on the person' sound as soon as page loads/next is pressed
  initialInstruction_Sound.play();

  //Play the name of the random emotion right after the initial Instruction
  function PlayRandomEmotionSound() {
    var randomEmotion_Sound = new Audio("Sounds/soundsOfEmotions/" + emotions[randomEmotion] + ".m4a");
    randomEmotion_Sound.play();
  }


  //Wait for the cards to flip and then make them dance
  setTimeout(function() {
    $(".image").addClass("rotateAnimation")
  }, 1012.5);


  //Assign the random values between 1 and 6 to randomNumber1 and randomNumber2
  randomNumber1 = (Math.floor(Math.random() * 6));
  randomNumber2 = (Math.floor(Math.random() * 6));

  //Make sure both random numbers are different
  while (randomNumber1 == randomNumber2) {
    randomNumber2 = (Math.floor(Math.random() * 6));
  }


  var emotionRandomNumber = (Math.floor(Math.random() * 2) + 1)

  //Creating emotion1 and emotion2
  var emotion1 = "imagesOfEmotions/" + emotions[randomNumber1] + ".png";
  var emotion2 = "imagesOfEmotions/" + emotions[randomNumber2] + ".png";

  //If the randomly selected emotion number is 1 then the random emotion chosen is random number 1
  if (emotionRandomNumber == 1) {
    randomEmotion = randomNumber1;
  }

  //If the randomly selected emotion number is 2 then the random emotion chosen is random number 2
  if (emotionRandomNumber == 2) {
    randomEmotion = randomNumber2;
  }


  //Function to turn/hide the cards when the next button is clicked
  function unflipCards() {
    $(".card-1").removeClass("flip-card");
    $(".card-2").removeClass("flip-card");
  }


  //Events that take place once 'next' is clicked
  nextButton.addEventListener("click", unflipCards());
  nextButton.addEventListener("click", randomize);
  nextButton.addEventListener("click", levelCounter);

  //Assigning functions to each image when they're clicked
  document.querySelectorAll(".button")[0].addEventListener("click", handleClick1);
  document.querySelectorAll(".button")[1].addEventListener("click", handleClick2);

  //For the score
  // document.querySelector(".points").textContent = pointsInt

  //Two make all the images unclickable once clicked
  function removeEvents_Click() {
    document.querySelectorAll(".button")[0].removeEventListener("click", handleClick1);
    document.querySelectorAll(".button")[1].removeEventListener("click", handleClick2);
  }


  function levelCounter() {
    level = level + 1
    //!!!!!PROBLEM!!!!!1
    //alert(level)
  }

  //When the correct image is clicked, following function is run
  function correctPress(number) {

    //alert(level)
    // $('body').css("background-image","url(../backgroundImages/correct_background.png)")
    score += 1

    $(".grey_progress_dot_" + level).attr("src", "../backgroundImages/green_progress_dot.png");

    $('.image').removeClass('hover')

    if (number == 1) {
      $(".image").removeClass("rotateAnimation");
      $(".image" + number).addClass("correct_1");

      correct_Sound.play();
      $('.Brushstroke_container').addClass("new_place_of_emotion_label_when_correct_or_wrong")
      removeEvents_Click()
      $(".image2").addClass("image_disabled");
      $('.Who_Is_text').addClass("image_disabled");

    }

    if (number == 2) {
      $(".image").removeClass("rotateAnimation");
      $(".image" + number).addClass("correct_2");


      correct_Sound.play();
      $('.Brushstroke_container').addClass("new_place_of_emotion_label_when_correct_or_wrong")
      removeEvents_Click()
      $(".image1").addClass("image_disabled");
      $('.Who_Is_text').addClass("image_disabled");
      // pointsInt = pointsInt + 1
      // document.querySelector(".points").textContent = pointsInt


    }

    setTimeout(function() {
      sparkles_effect.style.visibility = "visible";
      correct_label.style.visibility = "visible";
    }, 1650);

    setTimeout(function() {
      if (level == 10) {
        finishButton.style.visibility = "visible";
      }
      else{
        nextButton.style.visibility = "visible";
      }
    }, 3000);


  }

  //When the wrong image is clicked, following function is run
  function wrongPress(number) {
    wrong_index.push(level)

    // $('body').css("background-image","url(../backgroundImages/wrong_background.png)")

    $(".grey_progress_dot_" + level).attr("src", "../backgroundImages/red_progress_dot.png");

    $('.image').removeClass('hover')

    setTimeout(function() {
      not_quite_label.style.visibility = "visible";
    }, 1650);

    if (number == 1) {
      wrong_Sound.play();
      removeEvents_Click()
      $('.Who_Is_text').addClass("image_disabled");
      $('.Brushstroke_container').addClass("new_place_of_emotion_label_when_correct_or_wrong")
      $(".image2").addClass("image_disabled");
      $(".image" + number).addClass("wrong_1");
      $(".cross_icon_1").addClass("cross_icon_1_moving")
      $(".image").removeClass("rotateAnimation");

      setTimeout(function () {
        cross_icon_1.style.visibility = "visible";
        $(".cross_icon_1").addClass("fade_in_animation")
      }, 2000);

      setTimeout(function() {
        $(".Not_Quite_label").addClass("image_disabled")
      }, 4000);


      setTimeout(function() {
        $(".image2").addClass("fade_in_animation")
      }, 4500);

      $(".image2").removeClass("fade_in_animation")

      setTimeout(function() {
        $(".image1").removeClass("wrong_1")
        $(".image1").addClass("image_returning_back_to_original_place");

        $(".cross_icon_1").removeClass("cross_icon_1_moving")
        $(".cross_icon_1").addClass("cross_icons_returning_back_to_original_place")
      }, 5000);

      setTimeout(function() {
        tick_icon_2.style.visibility = "visible";
        $(".tick_icon_2").addClass("fade_in_animation")

      }, 6000);

      setTimeout(function() {
        $(".tick_icon_2").addClass("actual_correct_image")
        $(".image2").addClass("actual_correct_image");
      }, 6500);

    }

    if (number == 2) {
      wrong_Sound.play();
      $('.Brushstroke_container').addClass("new_place_of_emotion_label_when_correct_or_wrong")
      removeEvents_Click()
      $(".image1").addClass("image_disabled");
      $('.Who_Is_text').addClass("image_disabled");
      $(".image" + number).addClass("wrong_2");
      $(".cross_icon_2").addClass("cross_icon_2_moving")
      $(".image").removeClass("rotateAnimation");

      setTimeout(function () {
        cross_icon_2.style.visibility = "visible";
        $(".cross_icon_2").addClass("fade_in_animation")
      }, 2000);

      setTimeout(function() {
        $(".Not_Quite_label").addClass("image_disabled")
      }, 4000);

      setTimeout(function() {
        $(".image1").addClass("fade_in_animation")
      }, 4500);

      $(".image1").removeClass("fade_in_animation")

      setTimeout(function() {
        $(".image2").removeClass("wrong_2")
        $(".image2").addClass("image_returning_back_to_original_place");

        $(".cross_icon_2").removeClass("cross_icon_2_moving")
        $(".cross_icon_2").addClass("cross_icons_returning_back_to_original_place")
      }, 5000);

      setTimeout(function() {
        tick_icon_1.style.visibility = "visible";
        $(".tick_icon_1").addClass("fade_in_animation")

        cross_icon_2.style.visibility = "visible";
        $(".cross_icon_2").addClass("fade_in_animation")
      }, 6000);

      setTimeout(function() {
        $(".tick_icon_1").addClass("actual_correct_image")
        $(".image1").addClass("actual_correct_image");
      }, 6500);

    }


    setTimeout(function() {
      if (level == 10) {
        finishButton.style.visibility = "visible";
      }
      else{
        nextButton.style.visibility = "visible";
      }
    }, 8000);

  }


  //Function that takes place when image2 is clicked
  function handleClick1() {
    if (randomNumber1 == randomEmotion) {
      correctPress(1)
      // pointsInt = pointsInt + 1
      // document.querySelector(".points").textContent = pointsInt
    }

    if (randomNumber1 != randomEmotion) {
      wrongPress(1)
    }
  }


  //Function that takes place when image2 is clicked
  function handleClick2() {
    if (randomNumber2 == randomEmotion) {
      correctPress(2);
      // pointsInt = pointsInt + 1
      // document.querySelector(".points").textContent = pointsInt
    }


    if (randomNumber2 != randomEmotion) {
      wrongPress(2);
    }
  }


  //Function that takes place to reset the screen once the next button is clicked
  function Screen_Reset() {
    $(".image1").removeClass("correct_1")
    $(".image2").removeClass("correct_2")
    $(".image1").removeClass("wrong_1")
    $(".image2").removeClass("wrong_2")
    $(".image1").removeClass("image_disabled");
    $(".image2").removeClass("image_disabled");
    $(".image1").removeClass("actual_correct_image");
    $(".image2").removeClass("actual_correct_image");
    $('.Who_Is_text').removeClass("image_disabled");
    $('.Brushstroke_container').removeClass("new_place_of_emotion_label_when_correct_or_wrong")
    $(".image1").removeClass("fade_in_animation")
    $(".image2").removeClass("fade_in_animation")
    $(".image1").removeClass("actual_correct_image");
    $(".image2").removeClass("actual_correct_image");
    $(".image1").removeClass("image_returning_back_to_original_place");
    $(".image2").removeClass("image_returning_back_to_original_place");
    $(".Not_Quite_label").removeClass("image_disabled")
    $(".tick_icon_1").removeClass("actual_correct_image")
    $(".tick_icon_2").removeClass("actual_correct_image")
    $('body').css("background-image","url(../backgroundImages/Background.png)")
    $(".cross_icon_1").removeClass("cross_icons_returning_back_to_original_place")
    $(".cross_icon_2").removeClass("cross_icons_returning_back_to_original_place")
    $(".cross_icon_1").removeClass("cross_icon_1_moving")
    $(".cross_icon_2").removeClass("cross_icon_2_moving")


    nextButton.style.visibility = "hidden";
  }

  //Once the initial Instruction is said(which takes 3.3 seconds), run the function
  setTimeout(function() {
    //Play the name of the random emotion
    PlayRandomEmotionSound();

    //Add the name of the random emotion to the emotion label
    $("#emotionLabel").text(emotions[randomEmotion]);

    //It was hidden, now make it visible
    who_Is_text_label.style.visibility = "visible";
    emotion_label.style.visibility = "visible";
    document.querySelectorAll(".image")[0].setAttribute("src", emotion1);
    document.querySelectorAll(".image")[1].setAttribute("src", emotion2);
    document.querySelectorAll(".image")[0].style.visibility = "visible";
    document.querySelectorAll(".image")[1].style.visibility = "visible";

    //Add the class called flip-card which turns them over
    $(".card-1").addClass("flip-card");
    $(".card-2").addClass("flip-card");
  }, 3200);




  //Reset the screen, which takes 0.6 seconds
  setTimeout(function() {
    Screen_Reset();
  }, 600);


}


function handleFinish(){
  sessionStorage.setItem("SCORE",score);
  sessionStorage.setItem("WRONG_INDEX",JSON.stringify(wrong_index));

  return;

}


// when the images are loaded in, basically in the 3300 timeout, to card-1 and card-2, add the class transform which basically contains rotateY(180deg);

// comes to centre
// not quite right

//Age selection -
// Bring the 3 age buttons up




//have 10 levels, ending,


// function toptimer() {
//   const FULL_DASH_ARRAY = 283;
//   const WARNING_THRESHOLD = 10;
//   const ALERT_THRESHOLD = 5;
//
//   const COLOR_CODES = {
//     info: {
//       color: "green"
//     },
//     warning: {
//       color: "orange",
//       threshold: WARNING_THRESHOLD
//     },
//     alert: {
//       color: "red",
//       threshold: ALERT_THRESHOLD
//     }
//   };
//
//   const TIME_LIMIT = 50;
//   let timePassed = 0;
//   let timeLeft = TIME_LIMIT;
//   let timerInterval = null;
//   let remainingPathColor = COLOR_CODES.info.color;
//
//   document.getElementById("app").innerHTML = `
// <div class="base-timer">
//   <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//     <g class="base-timer__circle">
//       <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
//       <path
//         id="base-timer-path-remaining"
//         stroke-dasharray="283"
//         class="base-timer__path-remaining ${remainingPathColor}"
//         d="
//           M 50, 50
//           m -45, 0
//           a 45,45 0 1,0 90,0
//           a 45,45 0 1,0 -90,0
//         "
//       ></path>
//     </g>
//   </svg>
//   <span id="base-timer-label" class="base-timer__label">${formatTime(
//     timeLeft
//   )}</span>
// </div>
// `;
//
//   startTimer();
//
//   function onTimesUp() {
//     clearInterval(timerInterval);
//   }
//
//   function startTimer() {
//     timerInterval = setInterval(() => {
//       timePassed = timePassed += 1;
//       timeLeft = TIME_LIMIT - timePassed;
//       document.getElementById("base-timer-label").innerHTML = formatTime(
//         timeLeft
//       );
//       setCircleDasharray();
//       setRemainingPathColor(timeLeft);
//
//       if (timeLeft === 0) {
//         onTimesUp();
//       }
//     }, 1000);
//   }
//
//   function formatTime(time) {
//
//     let seconds = time;
//
//     if (seconds < 10) {
//       seconds = `0${seconds}`;
//     }
//     return `${seconds}`;
//   }
//
//   function setRemainingPathColor(timeLeft) {
//     const {
//       alert,
//       warning,
//       info
//     } = COLOR_CODES;
//     if (timeLeft <= alert.threshold) {
//       document
//         .getElementById("base-timer-path-remaining")
//         .classList.remove(warning.color);
//       document
//         .getElementById("base-timer-path-remaining")
//         .classList.add(alert.color);
//     } else if (timeLeft <= warning.threshold) {
//       document
//         .getElementById("base-timer-path-remaining")
//         .classList.remove(info.color);
//       document
//         .getElementById("base-timer-path-remaining")
//         .classList.add(warning.color);
//     }
//   }
//
//   function calculateTimeFraction() {
//     const rawTimeFraction = timeLeft / TIME_LIMIT;
//     return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
//   }
//
//   function setCircleDasharray() {
//     const circleDasharray = `${(
//     calculateTimeFraction() * FULL_DASH_ARRAY
//   ).toFixed(0)} 283`;
//     document
//       .getElementById("base-timer-path-remaining")
//       .setAttribute("stroke-dasharray", circleDasharray);
//   }
//
//
// }


//opening screen just for branding no numberOfButtons
// Emotion of expression below it give age groups > 6-8 and 8-10, disable 8-10




//method-
//when an image is clicked, button will become enabled, and when button is clicked, randomize fuction will be called.
//when image is clicked and image is correct, then point+=1

//Errors-
//scoreboard does not work *check if correct press is called if yes then points = points + 1



//!!##!!##FIX POSITIONING
//###fix the dance/zoom out colloison(!!!show 'width increase' method), timer, background music, voice , delay next button enabling, when correct image is clicked it does a rotation
//Make like a box, and in that place the random emotion, make the randomEmotion and image and not text so you can add animations to it when it randomizes.
//3 hearts - if you click on wrong, then one heart gone. If all 3 hearts are gone, game over screen pops up

//Improvements-
//dancing images
// Correct Postitioning(Margins,alignment etc)
// Border fixing
//Voice
//Animations
//Colour scheme
// Font type size
// different languages
// opening screen
// background design
// proper colour scheme
// logo positioning
// background music
// timer

// when correct/wrong image is clicked-
// images should become unclickable


// //when next is clicked-
// random emotion should change
// span of re should change
// the border colour should become normal(corect/wrong class should be removed)
// next button should become disabled


//create seperate arrays of emotions selected for randomnumber1 and randomNumber2
// while randomnumber1 and randomnumber2 is the same as the last element in their respective arrays, make them random again.
// also make arrays for emotionRandomNumber randomEmotion, and check and change them accordingly.

//Emotional bingo questions


//instructions page
//questions pop up
//image or text for scoreLabel
//cards, flip over.

//when it's correct like a green background sparklerss
//when it's wrong like a red background They stay where they are (for 2 images)
//when you're showing the answer ,have like a neutral background

//score representation
//menu bar functionality

//next game?


//FLip the background to landscape

//AGE
//both boxes can be closer
//Bring the title down
//Do branding at the ending
//Differentiate between title and button using

//instructions


//next pops up when they click
//correct animations
