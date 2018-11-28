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

      const lecturesData = data.lectures;

      let output = '';
      lecturesData.forEach((lecture) => {
        output += `
        <a href="${URL}${lecture.slug}" class="lecture"><div class="grey">
          <p class lti>${lecture.thumbnail}</p>
          <p>${lecture.category}</p>
          <h1>${lecture.title}</h1>
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

const lti = document.getElementById('lti');
console.log(lti);

