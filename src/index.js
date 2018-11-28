// import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

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
      // console.log(data);

    //  const lect = data;

      const lectures = data.lectures;
      
      let output = '';
      lectures.forEach((lecture) => {
        output += `
        <a href="${URL}${lecture.slug}" class="lecture"><div class="grey">
          <img class="image" src="${lecture.thumbnail}">
          <p>${lecture.category}</p>
          <h1 class="title">${lecture.title}</h1>
        </div></a>
      `;
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(error => console.error(error));
});

// const dev = document.querySelector('.lecture');
// dev.addEventListener('click', () => {
//   console.log("pushed");

// });

const el = document.getElementsByClassName("lecture").src;
el.parentNode.parentNode.parentNode.removeChild(el.parentNode);