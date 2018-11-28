const x = location.search;

const slug = x.substring(6);

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');

  function list() {
    console.log("listi");
    //lecture.list
  }

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
    switch (type) {
      case 'youtube':
        el = document.createElement('video');
        break;
      case 'text':
        el = document.createElement('p');
        break;
      case 'quote':
        el = document.createElement('blockquote');
        break;
      case 'image':
        el = document.createElement('img');
        break;
      case 'heading':
        el = document.createElement('h2');
        break;
      case 'list':
        //list();
        el = document.createElement('p');
        break;
      case 'code':
        el = document.createElement('video');
        break;
      default:
        console.log(undefined);
        break;
    }

    //console.log(el);
    const output = document.getElementById('output');
    const text = document.createTextNode(data);
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

      console.log(contents);

      let lectureType;
      let lectureData;
      for (let i = 0; i < contents.length; i += 1) {
        lectureType = contents[i].type;
        lectureData = contents[i].data;

        element(lectureType, lectureData);
      }
    })
    .catch(error => console.error(error));
});
