const x = location.search;

const slug = x.substring(6);

const output = document.getElementById('output');
let lists = -1;


document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');

  

  function setHeader(image, category, title) {
    let output = '';
    output += `
    <img class="image" src="${image}">
    <h3>${category}</h3>
    <h2>${title}</h2> 
    `;
    document.getElementById('header').innerHTML = output;
  }

  function element(type, data) {
    let el;
    //const output = document.getElementById('output');
    let li;
    
    let text;
    let item;
    

    switch (type) {
      case 'youtube':
        el = document.createElement('video');
        break;
      case 'text':
        el = document.createElement('p');
        break;
      case 'attribute':
        el = document.createElement('attribute');
        break;
      case 'quote':
        el = document.createElement('blockquote');
        break;
      case 'image':
        el = document.createElement('img');
        break;
      case 'caption':
        el = document.createElement('caption');
        break;
      case 'heading':
        el = document.createElement('h2');
        break;
      case 'list':
        lists += 1;
        el = document.createElement('ul');
        el.setAttribute('class', 'list');
        output.appendChild(el);
        return;
      case 'li':
        li = document.createElement('li');
        text = document.createTextNode(data);
        li.appendChild(text);      

        item = document.getElementsByClassName('list');
        item[lists].appendChild(li);
        return;
      case 'code':
        el = document.createElement('code');
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
