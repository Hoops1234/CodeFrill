
  console.log('JS loaded and DOM ready');
  // JavaScript for adding and deleting notes
  const addNoteBtn = document.querySelector('.add-note-btn');
  const noteInput = document.querySelector('.note-input');
  const notesList = document.getElementById('notes-list');

  function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes-htmlhandout') || '[]');
    notesList.innerHTML = '';
    savedNotes.forEach(noteText => {
      const newNote = document.createElement('div');
      newNote.classList.add('note-box');
      newNote.textContent = noteText;

      const delBtn = document.createElement('span');
      delBtn.classList.add('delete-note');
      delBtn.textContent = '🗑';
      delBtn.title = 'Delete Note';

      delBtn.addEventListener('click', () => {
        notesList.removeChild(newNote);
        saveNotes();
      });

      newNote.appendChild(delBtn);
      notesList.appendChild(newNote);
    });
  }

  function saveNotes() {
    const notes = Array.from(notesList.children).map(note => note.textContent.replace('🗑', '').trim());
    localStorage.setItem('notes-htmlhandout', JSON.stringify(notes));
  }

  function addNote(noteText) {
    if(noteText !== '') {
      const newNote = document.createElement('div');
      newNote.classList.add('note-box');
      newNote.textContent = noteText;

      const delBtn = document.createElement('span');
      delBtn.classList.add('delete-note');
      delBtn.textContent = '🗑';
      delBtn.title = 'Delete Note';

      delBtn.addEventListener('click', () => {
        notesList.removeChild(newNote);
        saveNotes();
      });

      newNote.appendChild(delBtn);

      notesList.appendChild(newNote);
      noteInput.value = '';
      saveNotes();
    }
  }

  // Add note function
  if (addNoteBtn) {
    addNoteBtn.addEventListener('click', () => {
      const noteText = noteInput.value.trim();
      addNote(noteText);
    });
  }

  // Add note on Enter key press
  if (noteInput) {
    noteInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const noteText = noteInput.value.trim();
        addNote(noteText);
      }
    });
  }

  // Load notes on page load
  loadNotes();

  function showText(id) {
    console.log('showText called with id:', id);
    if (id === 'module') {
      // Hide test section
      const testSection = document.getElementById('test');
      if (testSection) testSection.style.display = 'none';
      // Show module and its topic
      const module = document.getElementById('module');
      if (module) module.style.display = 'block';
      const moduleTopic = document.querySelector('#module .topic');
      if (moduleTopic) moduleTopic.style.display = 'block';
    } else if (id === 'test') {
      // Hide module topic
      const moduleTopic = document.querySelector('#module .topic');
      if (moduleTopic) moduleTopic.style.display = 'none';
      // Show test section
      const testSection = document.getElementById('test');
      if (testSection) testSection.style.display = 'block';
      // Hide notepad
      const notepad = document.getElementById('notepad');
      if (notepad) notepad.style.display = 'none';
      // Restore quiz results
      const savedResults = localStorage.getItem('quizResults-htmlhandout');
      if (savedResults) {
        document.getElementById('results').innerHTML = savedResults;
      }
    }
  }

  const notepad = document.getElementById("notepad");
  const modBtn = document.getElementById("modBtn");
  const testBtn = document.getElementById("testBtn");
  const testSection = document.getElementById("test");
  const moduleList = document.getElementById("moduleList");
  const moduleTopic = document.querySelector('#module .topic');
  const module = document.getElementById('module');

  // Initial setup
  if (module) module.style.display = 'block';
  if (moduleTopic) moduleTopic.style.display = 'block';
  if (testSection) testSection.style.display = "none";
  if (moduleList) moduleList.style.display = "block"; // List always visible, no toggle
  console.log('Initial setup complete. moduleList display:', moduleList ? moduleList.style.display : 'not found');

  // modBtn listener: switch to module view, show notepad (no toggle)
  if (modBtn) {
    modBtn.addEventListener("click", function () {
      console.log('modBtn clicked - switching to module');
      showText('module');
      if (notepad) notepad.style.display = "block";
    });
  }
// testBtn listener: call showText('test') to show quiz, hide module and notepad
if (testBtn) {
  testBtn.addEventListener("click", function() {
    console.log('testBtn clicked');
    showText('test');
  });
}

// HTML Quiz Database
const htmlQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language"
    ],
    correct: 0,
    topic: "HTML Basics"
  },
  {
    question: "Which HTML element is used for the largest heading?",
    options: ["<h6>", "<h1>", "<heading>", "<h2>"],
    correct: 1,
    topic: "HTML Structure"
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<break>", "<lb>", "<br>", "<line>"],
    correct: 2,
    topic: "HTML Elements"
  },
  {
    question: "Which attribute is used to specify a unique identifier for an HTML element?",
    options: ["class", "id", "title", "name"],
    correct: 1,
    topic: "HTML Attributes"
  },
  {
    question: "What is the purpose of the <alt> attribute in an image tag?",
    options: [
      "To specify image size",
      "To provide alternative text for screen readers",
      "To set image position",
      "To define image source"
    ],
    correct: 1,
    topic: "HTML Attributes"
  },
  {
    question: "Which HTML element is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correct: 1,
    topic: "HTML Links"
  },
  {
    question: "What does the 'href' attribute specify in a link?",
    options: [
      "The destination URL",
      "The link text",
      "The link color",
      "The link target"
    ],
    correct: 0,
    topic: "HTML Links"
  },
  {
    question: "Which HTML element is used to create an unordered list?",
    options: ["<ol>", "<list>", "<ul>", "<li>"],
    correct: 2,
    topic: "HTML Lists"
  },
  {
    question: "What is the correct HTML element for creating a table row?",
    options: ["<table>", "<tr>", "<td>", "<th>"],
    correct: 1,
    topic: "HTML Tables"
  },
  {
    question: "Which input type creates a submit button in HTML forms?",
    options: ["button", "text", "submit", "form"],
    correct: 2,
    topic: "HTML Forms"
  },
  {
    question: "What is the purpose of the <meta> tag in HTML?",
    options: [
      "To create metadata about the document",
      "To define styles",
      "To create navigation menus",
      "To embed media"
    ],
    correct: 0,
    topic: "HTML Meta"
  },
  {
    question: "Which HTML element is used to define the structure of an HTML document?",
    options: ["<body>", "<html>", "<head>", "<structure>"],
    correct: 1,
    topic: "HTML Structure"
  },
  {
    question: "What is the correct way to comment in HTML?",
    options: [
      "// This is a comment",
      "/* This is a comment */",
      "<!-- This is a comment -->",
      "<comment>This is a comment</comment>"
    ],
    correct: 2,
    topic: "HTML Basics"
  },
  {
    question: "Which attribute specifies the image source in HTML?",
    options: ["src", "href", "alt", "title"],
    correct: 0,
    topic: "HTML Images"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correct: 2,
    topic: "HTML/CSS"
  }
];

// Function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to generate and display quiz
function generateQuiz() {
  const topicInput = document.getElementById('topic').value.trim();
  const numQuestionsInput = document.getElementById('numQuestions');
  const numQuestions = parseInt(numQuestionsInput.value);

  if (!topicInput.toLowerCase().includes('html')) {
    alert('Please enter a topic related to HTML for the quiz.');
    return;
  }

  if (numQuestions < 1 || numQuestions > htmlQuestions.length) {
    alert(`Please enter a number between 1 and ${htmlQuestions.length}.`);
    return;
  }

  // Shuffle questions and select the requested number
  const shuffledQuestions = shuffleArray(htmlQuestions);
  const selectedQuestions = shuffledQuestions.slice(0, numQuestions);

  // Shuffle options for each question
  const quizQuestions = selectedQuestions.map(question => {
    const options = [...question.options];
    const correctAnswer = question.correct;

    // Shuffle the options
    const shuffledOptions = shuffleArray(options);

    // Find the new index of the correct answer after shuffling
    const newCorrectIndex = shuffledOptions.findIndex(option => option === question.options[correctAnswer]);

    return {
      question: question.question,
      options: shuffledOptions,
      correct: newCorrectIndex,
      topic: question.topic
    };
  });

  displayQuiz(quizQuestions);
}

// Function to display the quiz
function displayQuiz(questions) {
  const quizContainer = document.getElementById('quizContainer');
  quizContainer.innerHTML = '';

  questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = `Question ${index + 1}: ${q.question}`;
    questionDiv.appendChild(questionTitle);

    const optionsList = document.createElement('div');
    optionsList.className = 'options';

    q.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement('label');
      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = `question-${index}`;
      optionInput.value = optionIndex;

      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(` ${option}`));
      optionsList.appendChild(optionLabel);
      optionsList.appendChild(document.createElement('br'));
    });

    questionDiv.appendChild(optionsList);
    quizContainer.appendChild(questionDiv);
  });

  // Add submit button
  const submitBtn = document.createElement('button');
  submitBtn.className = 'generate-btn';
  submitBtn.textContent = 'Submit Quiz';
  submitBtn.style.marginTop = '20px';
  submitBtn.style.backgroundColor = '#2196F3';
  submitBtn.onclick = () => submitQuiz(questions);
  quizContainer.appendChild(submitBtn);

  // Add results div
  const resultsDiv = document.createElement('div');
  resultsDiv.id = 'results';
  resultsDiv.style.marginTop = '20px';
  resultsDiv.style.padding = '15px';
  resultsDiv.style.backgroundColor = '#f0f0f0';
  resultsDiv.style.borderRadius = '5px';
  quizContainer.appendChild(resultsDiv);
}

// Function to submit and score the quiz
function submitQuiz(questions) {
  let score = 0;
  let totalQuestions = questions.length;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  questions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);

    if (selectedOption) {
      const userAnswer = parseInt(selectedOption.value);
      const isCorrect = userAnswer === q.correct;

      if (isCorrect) {
        score++;
      }

      // Display question result
      const questionResult = document.createElement('div');
      questionResult.style.marginBottom = '10px';
      questionResult.style.padding = '10px';
      questionResult.style.backgroundColor = isCorrect ? '#d4edda' : '#f8d7da';
      questionResult.style.borderRadius = '5px';

      const questionText = document.createElement('p');
      questionText.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}`;
      questionResult.appendChild(questionText);

      const userAnswerText = document.createElement('p');
      userAnswerText.innerHTML = `<strong>Your answer:</strong> ${q.options[userAnswer]}`;
      questionResult.appendChild(userAnswerText);

      if (!isCorrect) {
        const correctAnswerText = document.createElement('p');
        correctAnswerText.innerHTML = `<strong>Correct answer:</strong> ${q.options[q.correct]}`;
        questionResult.appendChild(correctAnswerText);
      }

      resultsDiv.appendChild(questionResult);
    }
  });

  // Display final score
  const scoreDiv = document.createElement('div');
  scoreDiv.style.fontSize = '18px';
  scoreDiv.style.fontWeight = 'bold';
  scoreDiv.style.marginTop = '15px';
  scoreDiv.style.padding = '10px';
  scoreDiv.style.backgroundColor = score / totalQuestions >= 0.7 ? '#d4edda' : '#f8d7da';
  scoreDiv.style.borderRadius = '5px';
  scoreDiv.textContent = `Final Score: ${score}/${totalQuestions} (${Math.round((score / totalQuestions) * 100)}%)`;
  resultsDiv.appendChild(scoreDiv);

  // Save results to localStorage
  localStorage.setItem('quizResults-htmlhandout', resultsDiv.innerHTML);
}
  