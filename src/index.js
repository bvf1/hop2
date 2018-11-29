//import List from './lib/list';

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


  let el = document.body.getElementsByClassName('list');
  let lecturePages = Array.from(el);
  console.log(lecturePages[0]);
  console.log(lecturePages[0]);
  

  // let lecturePage = []; // [lecturePages.lenght];
  // for (let i = lecturePages.length - 1; i >= 0; i -= 1) {
  //   lecturePage.push(lecturePages[i]);
  // }
  // console.log(lecturePage.length);


  // console.log(lecturePages);
  // for (let i = 0; i < lecturePage.length; i++) {
  //   //const element = array[i];
    
  // }




  let a = [];
  for (let i = 0; i < lecturePages.length; i += 1) {
    a.push(lecturePages[i]);
  }
  
  
    Array.from(lecturePages);
  
    console.log(lecturePages[0]);
  console.log(a[0]);



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
      
      let nr = 1;
      lecturesData.forEach((lecture) => {
        if (lecture.thumbnail === undefined) undef = ` class="${lecture.thumbnail}"`;
        output += 
        `
        
          <a href="${URL}${lecture.slug}" class="lecture lecture-page list"><div class="grey">
            <img${undef} src="${lecture.thumbnail}">
            <p class="pflokkur">${lecture.category}</p>
            <div>
            <h1 class="title">${lecture.title}</h1>
            <input id='${nr}' type="checkbox"></input>
            </div>
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
