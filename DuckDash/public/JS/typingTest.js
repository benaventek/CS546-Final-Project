let prompt = document.getElementById('prompt');
let restart = document.getElementById('restart');
let timer = document.getElementById('timer');
let accuracy = document.getElementById('accuracy');
let score = document.getElementById('score');
let wpm = document.getElementById('wpm');
let test = document.getElementById('test');
let tests = JSON.parse(document.getElementById('tests').textContent);
let sessionCookie = JSON.parse(document.getElementById('cookie').textContent);
let promptDropdown = document.getElementById('promptDropdown');
let promptDropdownDiv = document.getElementById('prompt-dropdown');
let timeDropdown = document.getElementById('timeDropdown');
let timeDropdownDiv = document.getElementById('time-dropdown');
let diffDropdown = document.getElementById('difficultyDropdown');
let diffDropdownDiv = document.getElementById('diff-dropdown');
let focusMessage = document.getElementById('focusmsg');
let signInMessage = document.getElementById('login-alert');
let saveMessage = document.getElementById('save-alert');
let randomWords = [
  'request',
  'negotiation',
  'kidney',
  'disorder',
  'expression',
  'fight',
  'deviation',
  'quality',
  'new',
  'missile',
  'joke',
  'confusion',
  'wage',
  'dance',
  'lily',
  'fast',
  'shock',
  'pick',
  'meadow',
  'sharp',
  'motivation',
  'suspicion',
  'ridge',
  'football',
  'cancel',
  'button',
  'battlefield',
  'ignore',
  'iron',
  'praise',
  'short',
  'dedicate',
  'accident',
  'conglomerate',
  'jail',
  'basin',
  'instrument',
  'vat',
  'freighter',
  'combine',
  'government',
  'instinct',
  'pension',
  'strap',
  'partner',
  'suspect',
  'haunt',
  'paragraph',
  'model',
  'freeze',
  'mobile',
  'fast',
  'pressure',
  'quiet',
  'ring',
  'deer',
  'manage',
  'fault',
  'deadly',
  'linear',
  'crusade',
  'plug',
  'give',
  'bean',
  'complete',
  'mainstream',
  'write',
  'momentum',
  'hate',
  'dependence',
  'tax',
  'motivation',
  'tournament',
  'job',
  'glacier',
  'medium',
  'cower',
  'pottery',
  'forestry',
  'spokesperson',
  'grow',
  'tell',
  'program',
  'eavesdrop',
  'survival',
  'major',
  'innovation',
  'business',
  'peanut',
  'cupboard',
  'left',
  'food',
  'top',
  'persist',
  'embox',
  'blade',
  'closed',
  'sister',
  'stake',
  'promote',
  'apple',
  'orange',
  'banana',
  'grape',
  'melon',
  'strawberry',
  'pineapple',
  'kiwi',
  'watermelon',
  'peach',
  'pear',
  'plum',
  'cherry',
  'blueberry',
  'raspberry',
  'blackberry',
  'mango',
  'papaya',
  'coconut',
  'avocado',
  'lemon',
  'lime',
  'apricot',
  'fig',
  'guava',
  'passionfruit',
  'dragonfruit',
  'pomegranate',
  'lychee',
  'cranberry',
  'elderberry',
  'gooseberry',
  'boysenberry',
  'rhubarb',
  'persimmon',
  'date',
  'kiwifruit',
  'starfruit',
  'mulberry',
  'tangerine',
  'cantaloupe',
  'honeydew',
  'grapefruit',
  'mandarin',
  'nectarine',
  'quince',
  'soursop',
  'ackee',
  'breadfruit',
  'plantain',
  'durian',
  'jackfruit',
  'lychee',
  'mangosteen',
  'rambutan',
  'salak',
  'soursop',
  'tamarind',
  'yuzu',
  'kumquat',
  'persimmon',
  'pomelo',
  'ugli',
  'passionfruit',
  'feijoa',
  'kiwano',
  'longan',
  'sapodilla',
  'sugar',
  'white',
  'breadnut',
  'jabuticaba',
  'marang',
  'santol',
  'sweetsop',
  'tamarillo',
  'abiu',
  'barbadine',
  'cainito',
  'canistel',
  'carob',
  'cempedak',
  'chayote',
  'feijoa',
  'guanabana',
  'guava',
  'honeyberry',
  'horned',
  'jackfruit',
  'jambul',
  'kaffir',
  'kakadu',
  'kerson',
  'kumquat',
  'longan',
  'loquat',
  'mamey',
  'mangosteen',
  'marang',
  'medlar',
  'monstera',
  'mora',
  'morus',
  'mulberry',
  'nance',
  'noni',
  'pawpaw',
  'pepino',
  'pitanga',
  'pitaya',
  'pulasan',
  'quandong',
  'quince',
  'rambutan',
  'redcurrant',
  'salak',
  'santol',
  'soursop',
  'apple',
  'star',
  'strawberry guava',
  'sugar apple',
  'surinam cherry',
  'tamarind',
  'tamarillo',
  'fruit',
  'currant',
  'sapote',
  'yuzu',
];
let punctuation = [
  '.',
  ',',
  ';',
  ':',
  '!',
  '?',
  '-',
  '_',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  '<',
  '>',
  '/',
  '|',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '+',
  '=',
  '~',
];
let started = false;
let forceRestart = false;
let timePassed = 0;
function newTest() {
  focusMessage.hidden = false;
  prompt.hidden = false;
  signInMessage.hidden = true;
  saveMessage.hidden = true;
  done = false;
  started = false;
  current = 0;
  furthestReached = 0;
  accuracy.innerHTML = '100%';
  wpm.innerHTML = '0 WPM';
  timing = false;
  let letters = prompt.querySelectorAll('.letter');
  letters.forEach((letter) => {
    letter.classList.remove('current');
    letter.classList.remove('next');
    letter.classList.remove('correct');
    letter.classList.remove('incorrect');
  });
  numwrong = [];
  if (promptDropdown.value === 'random') {
    if (timeDropdown.value === '15s') {
      timer.innerHTML = '15 Seconds';
    } else if (timeDropdown.value === '30s') {
      timer.innerHTML = '30 Seconds';
    } else if (timeDropdown.value === '1m') {
      timer.innerHTML = '60 Seconds';
    }
  } else if (
    parseInt(promptDropdown.value) >= 0 &&
    parseInt(promptDropdown.value) < tests.length
  ) {
    let selectedTest = tests[parseInt(promptDropdown.value)];
    timer.innerHTML = selectedTest.timeLimit + ' Seconds';
  }
  timePassed = 0;
  return;
}

function easyRandomTestGen() {
  let words = [];
  for (let i = 0; i < 100; i++) {
    words.push(randomWords[Math.floor(Math.random() * randomWords.length)]);
  }
  let prompt = words.join(' ');
  return prompt;
}

function mediumRandomTestGen() {
  let words = [];
  for (let i = 0; i < 100; i++) {
    let word = randomWords[Math.floor(Math.random() * randomWords.length)];
    let letters = word.split('');
    let newWord = '';
    for (let j = 0; j < letters.length; j++) {
      if (Math.random() < 0.1) {
        newWord += letters[j].toUpperCase();
      } else {
        newWord += letters[j];
      }
    }
    words.push(newWord);
  }
  let prompt = words.join(' ');
  return prompt;
}

function hardRandomTestGen() {
  let words = [];
  for (let i = 0; i < 100; i++) {
    let word = randomWords[Math.floor(Math.random() * randomWords.length)];
    let letters = word.split('');
    let newWord = '';
    for (let j = 0; j < letters.length; j++) {
      if (Math.random() < 0.1) {
        newWord += letters[j].toUpperCase();
      } else {
        newWord += letters[j];
      }
    }
    if (Math.random() < 0.1) {
      newWord += punctuation[Math.floor(Math.random() * punctuation.length)];
    }
    words.push(newWord);
  }
  let prompt = words.join(' ');
  return prompt;
}

document.addEventListener('DOMContentLoaded', () => {
  // put the tests from the db into the dropdown
  tests.forEach((test, index) => {
    let option = document.createElement('option');
    option.value = index.toString();
    option.text = test.testTitle;
    promptDropdown.add(option);
  });
  // generate random prompt on page load
  quoteToWrite = easyRandomTestGen();
  forceRestart = true;
  newTest();
  prompt.innerHTML = quoteToWrite;

  let words = quoteToWrite.split(' ');
  let wordDivs = words.map((word, index) => {
    let div = document.createElement('div');
    div.classList.add('word');

    if (index !== 0) {
      let spaceSpan = document.createElement('span');
      spaceSpan.innerHTML = '&nbsp;';
      spaceSpan.classList.add('letter', 'space');
      div.appendChild(spaceSpan);
    }

    let letters = word.split('');
    let letterSpans = letters.map((letter) => {
      let span = document.createElement('span');
      span.textContent = letter;
      span.classList.add('letter');
      return span;
    });

    letterSpans.forEach((span) => div.appendChild(span));

    return div;
  });

  prompt.innerHTML = '';
  wordDivs.forEach((div) => prompt.appendChild(div));
});

promptDropdown.addEventListener('change', () => {
  if (promptDropdown.value === 'random') {
    timeDropdownDiv.hidden = false;
    diffDropdownDiv.hidden = false;
  } else {
    timeDropdownDiv.hidden = true;
    diffDropdownDiv.hidden = true;
  }
});

diffDropdown.addEventListener('change', () => {
  if (promptDropdown.value === 'random') {
    if (diffDropdown.value === 'easy') {
      quoteToWrite = easyRandomTestGen();
    } else if (diffDropdown.value === 'medium') {
      quoteToWrite = mediumRandomTestGen();
    } else if (diffDropdown.value === 'hard') {
      quoteToWrite = hardRandomTestGen();
    }
  }
  forceRestart = true;
  newTest();
  prompt.innerHTML = quoteToWrite;

  let words = quoteToWrite.split(' ');
  let wordDivs = words.map((word, index) => {
    let div = document.createElement('div');
    div.classList.add('word');

    if (index !== 0) {
      let spaceSpan = document.createElement('span');
      spaceSpan.innerHTML = '&nbsp;';
      spaceSpan.classList.add('letter', 'space');
      div.appendChild(spaceSpan);
    }

    let letters = word.split('');
    let letterSpans = letters.map((letter) => {
      let span = document.createElement('span');
      span.textContent = letter;
      span.classList.add('letter');
      return span;
    });

    letterSpans.forEach((span) => div.appendChild(span));

    return div;
  });

  prompt.innerHTML = '';
  wordDivs.forEach((div) => prompt.appendChild(div));
});

promptDropdown.addEventListener('change', () => {
  if (promptDropdown.value === 'random') {
    if (diffDropdown.value === 'easy') {
      quoteToWrite = easyRandomTestGen();
    } else if (diffDropdown.value === 'medium') {
      quoteToWrite = mediumRandomTestGen();
    } else if (diffDropdown.value === 'hard') {
      quoteToWrite = hardRandomTestGen();
    }
  } else if (
    parseInt(promptDropdown.value) >= 0 &&
    parseInt(promptDropdown.value) < tests.length
  ) {
    quoteToWrite = tests[parseInt(promptDropdown.value)].text;
  }
  forceRestart = true;
  newTest();
  prompt.innerHTML = quoteToWrite;

  let words = quoteToWrite.split(' ');
  let wordDivs = words.map((word, index) => {
    let div = document.createElement('div');
    div.classList.add('word');

    if (index !== 0) {
      let spaceSpan = document.createElement('span');
      spaceSpan.innerHTML = '&nbsp;';
      spaceSpan.classList.add('letter', 'space');
      div.appendChild(spaceSpan);
    }

    let letters = word.split('');
    let letterSpans = letters.map((letter) => {
      let span = document.createElement('span');
      span.textContent = letter;
      span.classList.add('letter');
      return span;
    });

    letterSpans.forEach((span) => div.appendChild(span));

    return div;
  });

  prompt.innerHTML = '';
  wordDivs.forEach((div) => prompt.appendChild(div));
});

timeDropdown.addEventListener('change', () => {
  forceRestart = true;
  newTest();
});

restart.addEventListener('click', () => {
  // generate random prompt on page load
  clearInterval(interval);
  if (promptDropdown.value === 'random') {
    if (diffDropdown.value === 'easy') {
      quoteToWrite = easyRandomTestGen();
    } else if (diffDropdown.value === 'medium') {
      quoteToWrite = mediumRandomTestGen();
    } else if (diffDropdown.value === 'hard') {
      quoteToWrite = hardRandomTestGen();
    }
  }
  forceRestart = true;
  newTest();
  prompt.innerHTML = quoteToWrite;

  let words = quoteToWrite.split(' ');
  let wordDivs = words.map((word, index) => {
    let div = document.createElement('div');
    div.classList.add('word');

    if (index !== 0) {
      let spaceSpan = document.createElement('span');
      spaceSpan.innerHTML = '&nbsp;';
      spaceSpan.classList.add('letter', 'space');
      div.appendChild(spaceSpan);
    }

    let letters = word.split('');
    let letterSpans = letters.map((letter) => {
      let span = document.createElement('span');
      span.textContent = letter;
      span.classList.add('letter');
      return span;
    });

    letterSpans.forEach((span) => div.appendChild(span));

    return div;
  });

  prompt.innerHTML = '';
  wordDivs.forEach((div) => prompt.appendChild(div));
});

prompt.addEventListener('focus', () => {
  focusMessage.style.display = 'none';
});

prompt.addEventListener('blur', () => {
  if (done === false) {
    focusMessage.style.display = 'block';
  }
});
function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 10);
  });
}
let timing = false;
let done = false;
//Timer
async function startTimer() {
  currtime = 0;
  if (promptDropdown.value === 'random') {
    switch (timeDropdown.value) {
      case '15s':
        currtime = 15;
        break;
      case '30s':
        currtime = 30;
        break;
      case '1m':
        currtime = 60;
        break;
      default:
        break;
    }
  } else {
    let selectedTest = tests[parseInt(promptDropdown.value)];
    currtime = selectedTest.timeLimit;
  }

  while (timePassed < currtime && timing) {
    await wait();
    timePassed += 0.01;

    timer.innerHTML =
      (Math.round((currtime - timePassed) * 100) / 100).toFixed(2) + ' Seconds';
  }
  if (timePassed >= currtime) {
    timer.innerHTML = '0 Seconds';
    done = true;
  }
  if (forceRestart === true) {
    forceRestart = false;
    if (timeDropdown.value === '15s') {
      timer.innerHTML = '15 Seconds';
    } else if (timeDropdown.value === '30s') {
      timer.innerHTML = '30 Seconds';
    } else if (timeDropdown.value === '1m') {
      timer.innerHTML = '60 Seconds';
    }
  }
  let finalWpm;
  let finalAccuracy;
  let testType;
  let testId;
  let dateTaken = new Date().toLocaleDateString();
  let timeTaken = new Date().toLocaleTimeString();
  if (done) {
    finalWpm = wpm.innerHTML;
    finalAccuracy = accuracy.innerHTML;
    if (promptDropdown.value === 'random') {
      testType = 'Random';
      randomDifficulty = diffDropdown.value;
      randomTime = timeDropdown.value;
      testId = null;
    } else {
      testType = 'Preset';
      testId = tests[parseInt(promptDropdown.value)]._id;
    }
    if (sessionCookie == null) {
      focusMessage.hidden = true;
      prompt.hidden = true;
      signInMessage.hidden = false;
    } else {
      focusMessage.hidden = true;
      prompt.hidden = true;
      saveMessage.hidden = false;
    }
  }
  if (done) {
    if (sessionCookie != null) {
      let result = {
        testType: testType,
        testId: testId,
        userId: sessionCookie.userID,
        wpm: finalWpm,
        accuracy: finalAccuracy,
        dateTaken: dateTaken,
        timeTaken: timeTaken,
      };
      await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });
    }
  }
}

let current = 0;
let numwrong = [];
let words = [];
let wordCount = 0;
let furthestReached = 0;
let interval;
function updateWPM() {
  let currwpm = (wordCount / timePassed) * 60;
  if (timePassed == 0) currwpm = 0;
  wpm.innerHTML = Math.round(currwpm).toFixed(0) + ' WPM';
}

prompt.addEventListener('keydown', (event) => {
  let keyPress = event.key;
  if (keyPress === 'Shift' || keyPress === 'CapsLock' || done) {
    return;
  }
  if (!started) {
    started = true;
    timing = true;
    startTimer();
    interval = setInterval(updateWPM, 500);
  }
  let letters = prompt.querySelectorAll('.letter');
  letters.forEach((letter) => {
    letter.classList.remove('current');
    letter.classList.remove('next');
  });
  if (current < letters.length) {
    letters[current].classList.add('current');
    if (current + 1 < letters.length && keyPress !== 'Backspace') {
      letters[current + 1].classList.add('next');
    }
    if (keyPress === ' ') {
      keyPress = ' ';
    }
    if (keyPress === letters[current].textContent) {
      if (keyPress === ' ') {
        words[current] = true;
      }
      letters[current].classList.add('correct');
      current++;
      furthestReached++;
    } else if (keyPress === 'Backspace' && current > 0) {
      current--;
      letters[current].classList.remove('correct');
      letters[current].classList.remove('incorrect');
      letters[current].classList.add('current');
      letters[current].classList.add('next');
    } else {
      letters[current].classList.add('incorrect');
      numwrong[current] = true;
      current++;
      furthestReached++;
    }
    let count = 0;
    wordCount = 0;
    for (let i = 0; i <= furthestReached; i++) {
      if (numwrong[i]) count++;
      if (words[i]) wordCount++;
    }
    accuracy.innerHTML =
      100 - Math.round((count / furthestReached) * 100).toFixed(0) + '%';
  }
  //Check if now at the end
  if (current == letters.length) {
    for (let i = 0; i <= furthestReached; i++) {
      if (words[i]) wordCount++;
    }
    wordCount++;
    forceRestart = false;
    timing = false;
    done = true;
    //stop the interval when the typing is done
    clearInterval(interval);
  }
  //scroll lines down when typing
  let currentWord = prompt.querySelector('.current');

  if (currentWord) {
    currentWord.scrollIntoView({
      behavior: 'smooth', //asked gpt for help
      block: 'end',
    });
  }
});
