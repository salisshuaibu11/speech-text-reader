document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  const voicesSelect = document.getElementById('voices');
  const textarea = document.getElementById('text');
  const readBtn = document.getElementById('read');
  const toggleBtn = document.getElementById('toggle');
  const closeBtn = document.getElementById('close');
  const textBox = document.getElementById('text-box');

  let synth = window.speechSynthesis;
  let voices = [];


  const data = [
    {
      image: './img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
  ]

  const populateVoiceList = () => {
    voices = synth.getVoices();

    for(let i = 0; i < voices.length; i++) {
      let option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voicesSelect.appendChild(option);
    }
  }

  populateVoiceList();

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  const readText = (text) => {
    let utterThis = new SpeechSynthesisUtterance(text);
    let selectedOption = voicesSelect.selectedOptions[0].getAttribute('data-name');

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption || voices[i] === text) {
        utterThis.voice = voices[i];
      }
    }

    synth.speak(utterThis);
  }

  const createBox = (box) => {
    let markup;
    markup = `
      <div class="box">
        <img src="${box.image}"  alt="${box.text}"/>
        <h2 class="info">${box.text}</h2>
      </div>
    `;
    main.insertAdjacentHTML('beforeend', markup);
  }

  data.forEach(createBox);

  main.querySelectorAll('.box').forEach((box) => {
    console.log(box)
    box.addEventListener('click', e => {
      let text = box.children[1].textContent;
      readText(text);
    })
  })
  toggleBtn.addEventListener('click', () =>  textBox.classList.add('show'));
  closeBtn.addEventListener('click', () => textBox.classList.remove('show'));

  readBtn.addEventListener('click', () => {
    let text = textarea.value;
    readText(text)
  });
})
