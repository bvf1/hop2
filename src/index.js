document.addEventListener('DOMContentLoaded', () => {
  const URL = 'fyrirlestur.html?slug=';

  fetch('../lectures.json')
    .then((result) => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }
      return result.json();
    })
    .then((data) => {
      const lecturesData = data.lectures;

      let output = '';
      let undef = '';

      lecturesData.forEach((lecture) => {
        if (lecture.thumbnail === undefined) undef = ` class="${lecture.thumbnail}"`;
        output += `
        
          <a href="${URL}${lecture.slug}" class "${lecture.category} lecture lecture-page list"><div class="grey">
            <img${undef} src="${lecture.thumbnail}">
            <p class="pflokkur">${lecture.category}</p>
            <div>
              <h1 class="title">${lecture.title}</h1>
              <p class="check check--hidden">&#10003</p>
            </div>
          </div></a>
      `;
        undef = '';
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(error => console.error(error));   
});

/**
 * Felur alla fyrirlestrana, gefur þeim classan hide
 */
function hide() {
  const el = document.getElementsByClassName('lecture');
  for (let i = 0; i < el.length; i += 1) {
    el[i].addAttribute('class', 'hide');
  }
}

/**
 * Sýnir alla fyrirlestra af gefnri týpu, tekur clasann hide í burtu
 * @param {*} type
 */
function show(type) { 
  const el = document.getElementsByClassName(type);
  for (let i = 0; i < el.length; i += 1) {
    el[i].removeAttribute('class', 'hide');
  }
}

/**
 * Finnur út hvað á að fela og hvað á að birta
 * @param {*} butArr 
 */
function showWhat(butArr) {
  if (((butArr[0] && butArr[1] && butArr[2]) || (!butArr[0] && !butArr[1] && !butArr[2]))) console.log('showall');
  else {
    hide();
    if (butArr[0]) show('html');
    if (butArr[1]) show('css');
    if (butArr[2]) show('javascript');
  }
}

//document.getElementById('1').classList.remove('checked');
let isChecked;
let butArr = [false, false, false];
/**
 * addEvent listener fyrir takkana
 */
let button = document.querySelectorAll('button');

button[0].addEventListener('click', () => {
  document.getElementById('1').classList.toggle('checked');
  butArr[0] = !butArr[0];
  showWhat(butArr);
  console.log('1 ' + butArr[0] + butArr[1] + butArr[2]);
});

button[1].addEventListener('click', () => {
  document.getElementById('2').classList.toggle('checked');
  butArr[1] = !butArr[1];
  showWhat(butArr);

  console.log('2 ' + butArr[1]);
});

button[2].addEventListener('click', () => {
  document.getElementById('3').classList.toggle('checked');
  //el = document.getElementsByClassName('checked');
  butArr[2] = !butArr[2];
  showWhat(butArr);

  console.log('3 ' + butArr[2]);
});
