// import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
console.log(isLecturePage);
  /* if (isLecturePage) {
    //
  } else {
    const list = new List();
    list.load();
  }
*/

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
        output += 
        `
        
          <a href="${URL}${lecture.slug}" class="lecture lecture-page"><div class="grey">
            <img${undef} src="${lecture.thumbnail}">
            <p>${lecture.category}</p>
            <h1 class="title">${lecture.title}</h1>
          </div></a>
      `;
        undef = '';
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(error => console.error(error));   
});

let button = document.querySelectorAll('button');

button[0].addEventListener('click', () => {
  console.log('1');
});
button[1].addEventListener('click', () => {
  console.log('2');
});
button[2].addEventListener('click', () => {
  console.log('3');
});
