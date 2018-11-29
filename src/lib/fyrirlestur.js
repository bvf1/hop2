const x = location.search;

const slug = x.substring(6);

let lists = -1;

const output = document.getElementById('output');

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');

  function setHeader(image, category, title) {
    let output = '';
    output += `
    <h3 class="headtext">${category}</h3>
    <h1 class="headtitle">${title}</h1>
    `;
    document.getElementById('header').innerHTML = output;
  }

  function element(type, data) {
    let el;
    let li;
    let text;
    let item;
    let string;
   // let output;

    switch (type) {
      case 'youtube':
        el = document.createElement('iframe');
        el.setAttribute('src', data)
        el.setAttribute('frameborder', '0');
        el.setAttribute('allowfullscreen', '0');
        output.appendChild(el)
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
        el = document.createElement('attribute');
        break;
      case 'quote':
        el = document.createElement('blockquote');
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
        console.log(undefined);
        break;
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
        // console.log(lectureType);
        // console.log(lectureData[0]);
        // console.log(lectureData.length);
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
