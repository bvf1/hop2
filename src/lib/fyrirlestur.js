//export const isFinished = {};

const x = window.location.search;
const slug = x.substring(6);
let el = document.getElementById('finishButton');
console.log(el);
let fin = el;
const finished = {
  ur: slug,
  finished: el,
};
export default finished;


let lists = -1;
let quotes = -1;
let quoteData;
let text;

let isChecked = true;

// export default function isChecked(element) {
  
// }

const output = document.getElementById('output');

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');

  function setHeader(image, category, title) {
    document.getElementById('header').setAttribute('style', `background-image:url(${image})`);
    text = '';
    text += `
    <h3 class="headertext">${category}</h3>
    <h1 class="headertitle">${title}</h1> 
    `;
    document.getElementById('header').innerHTML = text;
  }

  function element(type, data) {
   // let el;
    let li;
    let item;
    let string;

    switch (type) {
      case 'youtube':
        el = document.createElement('iframe');
        el.setAttribute('src', data)
        el.setAttribute('src', data);
        el.setAttribute('frameborder', '0');
        el.setAttribute('allowfullscreen', '0');
        output.appendChild(el)
        output.appendChild(el);
        return;
      case 'text':
        string = data.split('\n');
        for (let i = 0; i < string.length; i += 1) {
          element('p', string[i]);
        }
        return;
      case 'p':
        el = document.createElement('p');
        el.setAttribute('class', 'setn');
        break;
      case 'attribute':
        text = `
          <blockquote class="qt">${quoteData}<blockquote>
          <attribute class="att">${data}<attribute>
        `;
        item = document.getElementsByClassName('quote');
        item[quotes].innerHTML = text;
        return;
      case 'quote':
        quotes += 1;
        quoteData = data;
        el = document.createElement('div');
        el.setAttribute('class', 'quote');
        break;
      case 'image':
        el = document.createElement('img');
        el.setAttribute('src', data);
        output.appendChild(el);
        return;
      case 'caption':
        el = document.createElement('caption');
        break;
      case 'heading':
        el = document.createElement('h2');
        el.setAttribute('class', 'headi');
        break;
      case 'list':
        lists += 1;
        el = document.createElement('ul');
        el.setAttribute('class', 'list');
        output.appendChild(el);
        return;
      case 'li':
        li = document.createElement('li');
        li.setAttribute('class', 'li');
        text = document.createTextNode(data);
        li.appendChild(text);

        item = document.getElementsByClassName('list');
        item[lists].appendChild(li);
        return;
      case 'code':
        string = data.split('\n');
        for (let i = 0; i < string.length; i += 1) {
          element('codeBit', string[i]);
        }
        return;
      case 'codeBit':
        el = document.createElement('pre');
        el.setAttribute('class', 'code');
        break;
      default:
        el = document.createElement('div');
        text = "Element Not Found";
        output.appendChild(el).appendChild(text);
    }

    text = document.createTextNode(data);
    output.appendChild(el).appendChild(text);
  }

  fetch('../lectures.json')
    .then((result) => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }

      return result.json();
    })
    .then((data) => {
      const lecturesData = data.lectures;
      const chosenLecture = lecturesData.find((lecture => lecture.slug === slug));

      const headerImage = chosenLecture.image;
      const headerCategory = chosenLecture.category;
      const headerTitle = chosenLecture.title;

      setHeader(headerImage, headerCategory, headerTitle);

      const contents = chosenLecture.content;

      let lectureType;
      let lectureData;
      for (let i = 0; i < contents.length; i += 1) {
        lectureType = contents[i].type;
        lectureData = contents[i].data;

        element(lectureType, lectureData);

        if (lectureType === 'list') {
          for (let j = 0; j < lectureData.length; j += 1) {
            element('li', lectureData[j]);
          }
        }

        if (contents[i].attribute) {
          lectureData = contents[i].attribute;
          element('attribute', lectureData);
        }
        if (contents[i].caption) {
          lectureData = contents[i].caption;
          element('caption', lectureData);
        }
      }
    })
    .catch(error => console.error(error));
});
//let isFinished;
const button = document.querySelector('button');

button.addEventListener('click', () => {
  el = document.getElementById('finishButton')
  text = document.getElementById('finishButton').innerText;
  document.getElementById('finishButton').innerText = 'Fyrirlestur er kláraður';

  if (text === 'Klára fyrirlestur') {
    el.removeAttribute('class');
    el.setAttribute('class', 'finished');

  //  isFinished = false;
    document.getElementById('finishButton').innerText = 'Fyrirlestur er kláraður';
  } else {
    el.removeAttribute('class');
    el.setAttribute('class', 'unfinished');

    document.getElementById('finishButton').innerText = 'Klára fyrirlestur';
    //isFinished(false);
   // isFinished = true;
  }
});

