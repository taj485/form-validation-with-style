// Questions Array
const questions = [
    { question: 'Enter Your First Name' },
    { question: 'Enter Your Last Name' },
    { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create A Password', type: 'password' },
];

// Init Position at first question
let position = 0;

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // transition between questions

// init DOM elements
const  formBox = document.querySelector("#form-box");
const  nextBtn = document.querySelector("#next-btn");
const  prevBtn = document.querySelector("#prev-btn");
const  inputGroup = document.querySelector("#input-group");
const  inputField = document.querySelector("#input-field");
const  inputLabel = document.querySelector("#input-label");
const  inputProgress = document.querySelector("#input-progress");
const  progress = document.querySelector("#input-progress");

// EVENTS
//get question on dom load
document.addEventListener('DOMContentLoaded', getQuestion);

// next button
nextBtn.addEventListener('click', validate);

// Functions

function validate() {
    // Make Sure Pattern Matches If There Is One
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
      inputFail();
    } else {
      inputPass();
    }
  }

function transform(x , y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

function inputFail(){
    formBox.className = 'error';
    for( let i = 0; i - 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

function inputPass(){
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);
    questions[position].answer = inputField.value;
    position++;

    // If New Question, Hide Current and Get Next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove If No More Questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';
    formComplete();
  }
}

function formComplete() {
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(
      document.createTextNode(
        `Thanks ${
          questions[0].answer
        } You are registered and will get an email shortly`
      )
    );
    setTimeout(() => {
      formBox.parentElement.appendChild(h1);
      setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
  }
  

function getQuestion() {
    inputLabel.innerHTML = questions[position].question;
    inputField.type = questions[position].type || 'text';
    inputField.value = questions[position].answer || ' ';
    inputField.focus();

      // Set Progress Bar Width - Variable to the questions length
    progress.style.width = (position * 100) / questions.length + '%';
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}

function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = "";
    inputProgress.style.width = '100%';
}

function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition ="none";
    inputGroup.style.border = null;
}