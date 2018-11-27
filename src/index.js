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

  fetch('../lectures.json')
    .then((result) => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }
      return result.json();
    })
    .then((data) => {
      // console.log(data);
      let output = '';
      data.forEach((lecture) => {
        output += `
        <div class="lecture">
          <p>${lecture.thumbnail}</p>
          <p>${lecture.category}</p>
          <p>${lecture.title}</p>
        </div>
      `;
      });
      document.getElementById('lectures').innerHTML = output;
    })
    .catch(error => console.error(error));
});
