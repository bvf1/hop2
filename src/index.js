//import List from './lib/list';
import finished from './lib/fyrirlestur';
console.log(finished);

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
//console.log(isLecturePage);
  /* if (isLecturePage) {
    //
  } else {
    const list = new List();
    list.load();
  }
*/

  let el = document.body.getElementsByClassName('list');
  let arr = Array.from(el);

  for (let i = 0; i < el.length; i += 1) {
    values.push(el[i]);
  }

  const URL = 'fyrirlestur.html?slug=';

  el = document.getElementby

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
        
        console.log(lecture.slug);
        if (lecture.thumbnail === undefined) undef = ` class="${lecture.thumbnail}"`;
        output += `
        
          <a href="${URL}${lecture.slug}" class="lecture lecture-page list"><div class="grey">
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


//if (finished.slug)

//let check = document.getElementsByClassName('check');

let el = document.getElementsByClassName('indxbutt');
let ell = document.getElementById('1').classList.toggle('checked');

let butArr = [true, true, true];

let button = document.querySelectorAll('button');
button[0].addEventListener('click', () => {
  document.getElementById('1').classList.toggle('checked');

  if (butArr[0])


  console.log('1');
});
button[1].addEventListener('click', () => {
  document.getElementById('2').classList.toggle('checked');

  console.log('2');
});
button[2].addEventListener('click', () => {

  document.getElementById('3').classList.toggle('checked');
  console.log('3');
});
