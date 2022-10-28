var score = sessionStorage.getItem('SCORE')
var wrong_index = JSON.parse(sessionStorage.getItem('WRONG_INDEX'));


document.getElementById('Score_Text').innerHTML = score

for (let i = 0; i < wrong_index.length ; i ++){
  $(".progress_dot_" + wrong_index[i]).attr("src", "../../backgroundImages/red_progress_dot.png");
}
