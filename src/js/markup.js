/**
 * ! Move this!!
 */
const formatGameTime = time => {
  let sec = Math.floor(time % 60);
  let min = Math.floor(time / 60);

  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  return `${min} : ${sec}`;
};

const createRows =(n, element) => {
  let html = "";
  for (let i = 1; i <= n; i++) {
    html += `<div class="row-${i}"><div class="tile-container"></div></div>`;
  }
  element.innerHTML = html;
};

const createCard = (src, id) => {
  let html = `<div class="card" id="card-${id}">`;
  html += '<img src="img/covers/iron-throne.png" alt="" class="tile side-a" />';
  html += '<div class="side-b">';
  html += `<img src="img/characters/${src}" alt="${src}" />`;
  html += "</div></div>";

  return html;
};

const gameFinsihedMessage = (moves, time, element) => {
  let totalTime = formatGameTime(time);

  let html = "<div class='success'>";
  html += "<h4>CONGRATULATIONS!</h4>";
  html += `<p>You found all matches in ${moves} moves</p>`;
  html += `<p>And you took ${totalTime} minutes</p>`;
  html += "<p>You've managed to ward off the white walkers.</p>";
  html += "<p>For now.......</p>";
  html += "</div>";

  element.innerHTML = html;
};

const gameRulesMessage = (element) => {
  let html = "<div class='success'>";
  html += "<h4>How to play</h4>";
  html += `<p>Click the "Start Game" button to reveal 16 random cards</p>`;
  html += `<p>Select any card to reveal the hidden character.</p>`;
  html += "<p>Select a second card to try to find a matching pair.</p>";
  html += "<p>Reveal all 8 matching characters to win</p>";
  html += "</div>";

  element.innerHTML = html;
};

const generateCopyright = () => {
  let html = "";
  let year = new Date().getFullYear();

  html += `<p>Copyright &copy ${year}`;
  html += " | ";
  html += "<a href='https://donatron.github.io/portfolio' target='_blank' >";
  html += "Don Macarthur</a></p>";

  return html;
};

module.exports = {
  createRows,
  createCard,
  gameFinsihedMessage,
  gameRulesMessage,
  generateCopyright,
}