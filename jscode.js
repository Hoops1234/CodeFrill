  console.log('JS loaded and DOM ready');
  
  // Global showtext function for inline onclick handlers
  window.showtext = function(id) {
    showText(id);
  };
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
      // Hide discussion section
      const discussionSection = document.getElementById('Discussion');
      if (discussionSection) discussionSection.classList.remove('visible');
      // Hide notes toggle button
      const toggleVideoNotes = document.getElementById('toggleVideoNotes');
      if (toggleVideoNotes) toggleVideoNotes.style.display = 'none';
      // Show module and its topic
      const module = document.getElementById('module');
      if (module) module.style.display = 'block';
      const moduleTopic = document.querySelector('#module .topic');
      if (moduleTopic) moduleTopic.style.display = 'block';
      // On desktop, keep notepad visible; on mobile, hide it
      const notepad = document.getElementById('notepad');
      if (window.innerWidth >= 1025) {
        if (notepad) notepad.style.display = 'block';
      } else {
        if (notepad) notepad.style.display = 'none';
      }
    } else if (id === 'test') {
      // Hide module topic
      const moduleTopic = document.querySelector('#module .topic');
      if (moduleTopic) moduleTopic.style.display = 'none';
      // Hide discussion section
      const discussionSection = document.getElementById('Discussion');
      if (discussionSection) discussionSection.classList.remove('visible');
      // Hide notes toggle button
      const toggleVideoNotes = document.getElementById('toggleVideoNotes');
      if (toggleVideoNotes) toggleVideoNotes.style.display = 'none';
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
    } else if (id === 'Discussion') {
      // Hide module topic
      const moduleTopic = document.querySelector('#module .topic');
      if (moduleTopic) moduleTopic.style.display = 'none';
      // Hide test section
      const testSection = document.getElementById('test');
      if (testSection) testSection.style.display = 'none';
      // Show discussion section
      const discussionSection = document.getElementById('Discussion');
      if (discussionSection) discussionSection.classList.add('visible');
      // Show the notes toggle button
      const toggleVideoNotes = document.getElementById('toggleVideoNotes');
      if (toggleVideoNotes) toggleVideoNotes.style.display = 'flex';
      // Reset video notes for new session
      videoNotes = [];
      updateFloatingNotesList();
    } else if (id === 'notepad') {
      // Only on mobile
      if (window.innerWidth < 1025) {
        // Hide module topic
        const moduleTopic = document.querySelector('#module .topic');
        if (moduleTopic) moduleTopic.style.display = 'none';
        // Hide test section
        const testSection = document.getElementById('test');
        if (testSection) testSection.style.display = 'none';
        // Hide discussion section
        const discussionSection = document.getElementById('Discussion');
        if (discussionSection) discussionSection.classList.remove('visible');
        // Show notepad
        const notepad = document.getElementById('notepad');
        if (notepad) notepad.style.display = 'block';
      }
    }
  }

  const notepad = document.getElementById("notepad");
  const modBtn = document.getElementById("modBtn");
  const testBtn = document.getElementById("testBtn");
  const disBtn = document.getElementById("disBtn");
  const testSection = document.getElementById("test");
  const noteBtn = document.getElementById("noteBtn");
  const noteSection = document.getElementById("notepad")
  const moduleList = document.getElementById("moduleList");
  const moduleTopic = document.querySelector('#module .topic');
  const module = document.getElementById('module');
  const discussionSection = document.getElementById('Discussion');

  // Initial setup
  if (module) module.style.display = 'block';
  if (moduleTopic) moduleTopic.style.display = 'block';
  if (testSection) testSection.style.display = "none";
  if (discussionSection) discussionSection.classList.remove('visible');
  if (moduleList) moduleList.style.display = "block"; // List always visible, no toggle
  // Show notes-section by default on desktop
  if (window.innerWidth >= 1025) {
    if (noteSection) noteSection.style.display = "block";
  } else {
    if (noteSection) noteSection.style.display = "none";
  }
  // Initialize module view
  showtext('module');
  console.log('Initial setup complete. moduleList display:', moduleList ? moduleList.style.display : 'not found');

  // Toggle Notes Section
  const toggleNotesBtn = document.getElementById('toggleNotesBtn');

  if (toggleNotesBtn) {
    toggleNotesBtn.addEventListener('click', () => {
      if (notepad) {
        notepad.style.display = notepad.style.display === 'none' ? 'block' : 'none';
      }
    });
  }

  // modBtn listener: switch to module viewyes (no toggle)
  if (modBtn) {
    modBtn.addEventListener("click", function () {
      console.log('modBtn clicked - switching to module');
      showText('module');
    });
  }
// testBtn listener: call showText('test') to show quiz, hide module and notepad
if (testBtn) {
  testBtn.addEventListener("click", function() {
    console.log('testBtn clicked - switching to test');
    showText('test');
  });
}

// disBtn listener: show discussion videos
if (disBtn) {
  disBtn.addEventListener("click", function() {
    showText('Discussion');
  });
}

if (noteBtn) {
  noteBtn.addEventListener("click", function() {
    console.log('noteBtn clicked - switching to notepad');
    showText('notepad');
  });
}

// Video modal functionality - handle multiple videos
const videoThumbs = document.querySelectorAll('.video-thumb');
const closeBtns = document.querySelectorAll('.close, .close2');

videoThumbs.forEach(videoThumb => {
  videoThumb.addEventListener('click', () => {
    const modalId = videoThumb.getAttribute('data-modal');
    const videoModal = document.getElementById(modalId);
    if (videoModal) {
      videoModal.style.display = 'flex';
    }
    // Show the floating notes panel and toggle button when video is playing
    const videoNotesPanel = document.getElementById('videoNotesPanel');
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'flex';
    }
    if (toggleVideoNotes) {
      toggleVideoNotes.style.display = 'flex';
    }
 });
});

// Close buttons
closeBtns.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.video-modal');
    if (modal) {
      modal.style.display = 'none';
      const modalVideo = modal.querySelector('video');
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    }
    // Clear quiz countdown
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    // Mark quiz as inactive to remove beforeunload warning
    isQuizActive = false;
    // Hide the notes panel and toggle button when video modal closes
    if (toggleVideoNotes) {
      toggleVideoNotes.style.display = 'none';
    }
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'none';
    }
  });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('video-modal')) {
    event.target.style.display = 'none';
    const modalVideo = event.target.querySelector('video');
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
    // Clear quiz countdown
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    // Mark quiz as inactive to remove beforeunload warning
    isQuizActive = false;
    // Hide the notes panel and toggle button when video modal closes
    if (toggleVideoNotes) {
      toggleVideoNotes.style.display = 'none';
    }
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'none';
    }
  }
});

// Close modal with ESC key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.video-modal').forEach(modal => {
      if (modal.style.display === 'block' || modal.style.display === 'flex') {
        modal.style.display = 'none';
        const modalVideo = modal.querySelector('video');
        if (modalVideo) {
          modalVideo.pause();
          modalVideo.currentTime = 0;
        }
      }
    });
    // Clear quiz countdown
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    // Mark quiz as inactive to remove beforeunload warning
    isQuizActive = false;
    // Hide the notes panel and toggle button when ESC is pressed
    if (toggleVideoNotes) {
      toggleVideoNotes.style.display = 'none';
    }
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'none';
    }
  }
});

// Show notes panel when document enters fullscreen
document.addEventListener('fullscreenchange', () => {
  const videoNotesPanel = document.getElementById('videoNotesPanel');
  const toggleVideoNotes = document.getElementById('toggleVideoNotes');
  const fullscreenQuizWarning = document.getElementById('fullscreenQuizWarning');
  
  if (document.fullscreenElement) {
    // In fullscreen - show notes panel if we're in discussion mode
    const discussionSection = document.getElementById('Discussion');
    if (discussionSection && discussionSection.classList.contains('visible')) {
      if (videoNotesPanel) videoNotesPanel.style.display = 'flex';
      if (toggleVideoNotes) toggleVideoNotes.style.display = 'flex';
    }
  } else {
    // Exited fullscreen - hide the fullscreen warning if shown
    if (fullscreenQuizWarning) {
      fullscreenQuizWarning.classList.remove('show');
    }
    // Show the quiz modal if a quiz is pending
    if (currentQuizData && videoQuizModal) {
      videoQuizModal.style.display = 'flex';
    }
  }
});

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
  
    // ============================================
// DAILY TASK FUNCTIONALITY
// ============================================

// Daily Questions Database (JavaScript programming focused)
const dailyQuestions = [
  {
    question: "What does JavaScript stand for?",
    type: "text",
    answer: "JavaScript is not related to Java. It was originally called LiveScript but renamed to JavaScript for marketing reasons.",
    hint: "Despite the name, JavaScript is not related to Java."
  },
  {
    question: "Write the JavaScript keyword used to declare a variable that can be reassigned.",
    type: "code",
    answer: "let",
    hint: "It's a block-scoped variable declaration introduced in ES6."
  },
  {
    question: "What is the entry point of a JavaScript program running in a browser?",
    type: "text",
    answer: "The script executes when loaded, or functions are called in response to events",
    hint: "Unlike Java, there's no main method - code runs when the script loads or in event handlers."
  },
  {
    question: "Write the correct syntax for a JavaScript function declaration.",
    type: "code",
    answer: "function myFunction() { }",
    hint: "Use the function keyword followed by the function name and parentheses."
  },
  {
    question: "Which data type is used for whole numbers in JavaScript?",
    type: "text",
    answer: "number",
    hint: "JavaScript has a single number type for both integers and floating-point numbers."
  },
  {
    question: "Write a JavaScript statement to declare a variable named 'count' and initialize it to 0.",
    type: "code",
    answer: "let count = 0;",
    hint: "Use let keyword, variable name, assignment operator, and initial value."
  },
  {
    question: "What is the purpose of the 'const' keyword in JavaScript?",
    type: "text",
    answer: "declares a block-scoped variable that cannot be reassigned",
    hint: "It creates a constant reference to a value."
  },
  {
    question: "Write the JavaScript code to print 'Hello, World' to the console.",
    type: "code",
    answer: "console.log('Hello, World');",
    hint: "Use console.log with the message in parentheses."
  },
  {
    question: "Which loop is best when you know exactly how many times to iterate?",
    type: "text",
    answer: "for loop",
    hint: "It has initialization, condition, and increment in one line."
  },
  {
    question: "Write a for loop that prints numbers from 1 to 5.",
    type: "code",
    answer: "for (let i = 1; i <= 5; i++) { console.log(i); }",
    hint: "Initialize i=1, condition i<=5, increment i++."
  },
  {
    question: "What is the default value of an uninitialized variable in JavaScript?",
    type: "text",
    answer: "undefined",
    hint: "Variables that are declared but not assigned a value have this value."
  },
  {
    question: "Write an if statement that checks if x is equal to 10.",
    type: "code",
    answer: "if (x === 10) {",
    hint: "Use triple equals for strict comparison, opening brace required."
  },
  {
    question: "What keyword makes a variable accessible only within its block scope?",
    type: "text",
    answer: "let",
    hint: "It's the block-scoped variable declaration (also const)."
  },
  {
    question: "Write the JavaScript statement to create a String variable named 'name'.",
    type: "code",
    answer: "let name = '';",
    hint: "Use let keyword, variable name, and optional initial empty string."
  },
  {
    question: "What principle allows JavaScript objects to have multiple forms through prototypal inheritance?",
    type: "text",
    answer: "polymorphism",
    hint: "Objects can take on many forms through inheritance and method overriding."
  },
  {
    question: "Write the syntax to create an array of 5 elements.",
    type: "code",
    answer: "let arr = new Array(5); // or let arr = [];",
    hint: "Use the Array constructor or array literal syntax."
  },
  {
    question: "What keyword is used to inherit properties from another object in JavaScript?",
    type: "text",
    answer: "extends",
    hint: "Used in class declarations to inherit from a parent class."
  },
  {
    question: "Write a function that returns the sum of two numbers.",
    type: "code",
    answer: "function sum(a, b) { return a + b; }",
    hint: "Use function keyword, parameters, and return statement."
  },
  {
    question: "What is the base object from which all JavaScript objects inherit?",
    type: "text",
    answer: "Object.prototype",
    hint: "All objects inherit from this prototype unless explicitly set to null."
  },
  {
    question: "Write the correct way to create an empty array in JavaScript.",
    type: "code",
    answer: "let arr = [];",
    hint: "Use array literal syntax with empty brackets."
  }
];

// Daily Task State Management
const DAILY_TASK_STORAGE_KEY = 'dailyTaskData-jscode';
const TASK_DURATION_HOURS = 24;

// Get daily question index based on date (consistent for the day)
function getDailyQuestionIndex() {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  // Simple hash: sum of date parts modulo question count
  const hash = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % dailyQuestions.length;
}

// Load or initialize daily task state
function loadDailyTaskState() {
  const saved = localStorage.getItem(DAILY_TASK_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse daily task state:', e);
    }
  }
  return null;
}

// Save daily task state
function saveDailyTaskState(state) {
  localStorage.setItem(DAILY_TASK_STORAGE_KEY, JSON.stringify(state));
}

// Calculate time remaining in milliseconds
function getTimeRemaining(targetDate) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;
  return diff > 0 ? diff : 0;
}

// Format milliseconds to HH:MM:SS
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Initialize or check daily task
function initDailyTask() {
  const now = new Date();
  const state = loadDailyTaskState();
  
  const questionText = document.getElementById('questionText');
  const timerDisplay = document.getElementById('taskTimer');
  const correctCountEl = document.getElementById('correctCount');
  const wrongCountEl = document.getElementById('wrongCount');
  const totalCountEl = document.getElementById('totalCount');
  const answerSection = document.getElementById('answerSection');
  const previousAnswersEl = document.getElementById('previousAnswers');
  
  if (!questionText || !timerDisplay) {
    console.error('Daily task elements not found');
    return;
  }
  
  // Check if we need to load a new question (24h passed)
  let currentState = state;
  
  if (state) {
    const questionDate = new Date(state.assignedDate);
    const timeDiff = now.getTime() - questionDate.getTime();
    const hoursPassed = timeDiff / (1000 * 60 * 60);
    
    // If 24 hours have passed and the question hasn't been answered correctly
    if (hoursPassed >= TASK_DURATION_HOURS) {
      // Mark current as expired (auto-wrong if not answered)
      if (!state.answered) {
        state.expired = true;
        state.wrong = true;
        state.answered = true;
        state.answeredAt = now.toISOString();
        // Update scores: increment wrong count
        if (state.stats) {
          state.stats.wrong++;
          state.stats.total++;
        }
        saveDailyTaskState(state);
      }
      // Create new state for a fresh question
      const newQuestionIndex = getDailyQuestionIndex();
      const newState = {
        questionIndex: newQuestionIndex,
        question: dailyQuestions[newQuestionIndex],
        assignedDate: now.toISOString(),
        deadline: new Date(now.getTime() + TASK_DURATION_HOURS * 60 * 60 * 1000).toISOString(),
        answered: false,
        correct: false,
        expired: false,
        stats: state.stats || { correct: 0, wrong: 0, total: 0 },
        history: state.history || []
      };
      currentState = newState;
      saveDailyTaskState(newState);
    }
  } else {
    // First time - initialize with today's question
    const questionIndex = getDailyQuestionIndex();
    const deadline = new Date(now.getTime() + TASK_DURATION_HOURS * 60 * 60 * 1000);
    currentState = {
      questionIndex: questionIndex,
      question: dailyQuestions[questionIndex],
      assignedDate: now.toISOString(),
      deadline: deadline.toISOString(),
      answered: false,
      correct: false,
      expired: false,
      stats: { correct: 0, wrong: 0, total: 0 },
      history: []
    };
    saveDailyTaskState(currentState);
  }
  
  // Update UI
  updateDailyTaskUI(currentState);
  
  // Start timer if question not yet answered
  if (!currentState.answered) {
    startDailyTaskTimer(currentState);
  } else {
    // Show final status
    if (currentState.expired) {
      timerDisplay.innerHTML = '<span style="color: #e74c3c;">EXPIRED - No answer within 24 hours</span>';
    } else if (currentState.correct) {
      timerDisplay.innerHTML = '<span style="color: #27ae60;">COMPLETED</span>';
    } else {
      timerDisplay.innerHTML = '<span style="color: #e74c3c;">WRONG</span>';
    }
    // Disable answer section
    disableAnswerSection();
  }
  
  // Update counters
  if (correctCountEl) correctCountEl.textContent = currentState.stats.correct;
  if (wrongCountEl) wrongCountEl.textContent = currentState.stats.wrong;
  if (totalCountEl) totalCountEl.textContent = currentState.stats.total;
  
  // Display previous answers
  displayPreviousAnswers(currentState.history);
}

// Update daily task UI
function updateDailyTaskUI(state) {
  const questionText = document.getElementById('questionText');
  if (questionText && state.question) {
    questionText.textContent = state.question.question;
    
    // Add hint as small text
    const hintEl = document.createElement('small');
    hintEl.style.display = 'block';
    hintEl.style.marginTop = '5px';
    hintEl.style.color = '#7f8c8d';
    hintEl.textContent = `Hint: ${state.question.hint}`;
    questionText.appendChild(hintEl);
  }
}

// Start countdown timer
let dailyTaskInterval = null;

function startDailyTaskTimer(state) {
  const timerDisplay = document.getElementById('taskTimer');
  
  if (dailyTaskInterval) {
    clearInterval(dailyTaskInterval);
  }
  
  function updateTimer() {
    const remaining = getTimeRemaining(state.deadline);
    if (remaining <= 0) {
      clearInterval(dailyTaskInterval);
      dailyTaskInterval = null;
      
      // Time's up - mark as expired and reload question
      timerDisplay.innerHTML = '<span style="color: #e74c3c;">TIME EXPIRED!</span>';
      setTimeout(() => {
        initDailyTask(); // Load new question
      }, 2000);
      return;
    }
    
    timerDisplay.textContent = `Time Remaining: ${formatTime(remaining)}`;
  }
  
  updateTimer(); // Initial update
  dailyTaskInterval = setInterval(updateTimer, 1000);
}

// Submit answer handler
function submitDailyAnswer() {
  const userAnswerInput = document.getElementById('userAnswer');
  const userAnswer = userAnswerInput.value.trim();
  
  if (!userAnswer) {
    alert('Please enter an answer!');
    return;
  }
  
  const state = loadDailyTaskState();
  if (!state || state.answered) {
    alert('This question has already been answered or expired.');
    return;
  }
  
  // Check if time is still valid
  const now = new Date();
  const deadline = new Date(state.deadline);
  if (now > deadline) {
    alert('Time expired! The question has been marked as wrong.');
    initDailyTask();
    return;
  }
  
  // Validate answer
  const correctAnswer = state.question.answer.toLowerCase().trim();
  const userAnswerNormalized = userAnswer.toLowerCase().trim();
  
  // For code answers, some normalization
  let isCorrect = false;
  if (state.question.type === 'code') {
    // Remove extra whitespace, normalize quotes
    const normalizedUser = userAnswerNormalized.replace(/\s+/g, ' ').replace(/"/g, "'");
    const normalizedCorrect = correctAnswer.replace(/\s+/g, ' ').replace(/"/g, "'");
    isCorrect = normalizedUser === normalizedCorrect;
  } else {
    // Text answer - check if contains the key terms or exact match
    isCorrect = userAnswerNormalized === correctAnswer || 
                correctAnswer.includes(userAnswerNormalized) ||
                userAnswerNormalized.includes(correctAnswer);
  }
  
  // Update state
  state.answered = true;
  state.correct = isCorrect;
  state.answeredAt = now.toISOString();
  state.userAnswer = userAnswer;
  
  // Update stats
  if (isCorrect) {
    state.stats.correct++;
  } else {
    state.stats.wrong++;
  }
  state.stats.total++;
  
  // Add to history
  const historyEntry = {
    date: now.toISOString(),
    question: state.question.question,
    userAnswer: userAnswer,
    correct: isCorrect,
    correctAnswer: state.question.answer
  };
  state.history.unshift(historyEntry);
  if (state.history.length > 20) state.history.pop(); // Keep last 20
  
  saveDailyTaskState(state);
  
  // Update UI
  const timerDisplay = document.getElementById('taskTimer');
  if (isCorrect) {
    timerDisplay.innerHTML = '<span style="color: #27ae60;">✓ CORRECT!</span>';
  } else {
    timerDisplay.innerHTML = `<span style="color: #e74c3c;">✗ WRONG! Correct: ${state.question.answer}</span>`;
  }
  
  // Update counters
  document.getElementById('correctCount').textContent = state.stats.correct;
  document.getElementById('wrongCount').textContent = state.stats.wrong;
  document.getElementById('totalCount').textContent = state.stats.total;
  
  // Disable answer section
  disableAnswerSection();
  
  // Display previous answers
  displayPreviousAnswers(state.history);
}

// Disable answer input after submission/expiry
function disableAnswerSection() {
  const userAnswer = document.getElementById('userAnswer');
  const submitBtn = document.getElementById('submitAnswer');
  const clearBtn = document.getElementById('clearAnswer');
  
  if (userAnswer) userAnswer.disabled = true;
  if (submitBtn) submitBtn.disabled = true;
  if (clearBtn) clearBtn.disabled = true;
}

// Display answer history
function displayPreviousAnswers(history) {
  const container = document.getElementById('previousAnswers');
  if (!container) return;
  
  if (!history || history.length === 0) {
    container.innerHTML = '<p style="color: #7f8c8d;">No previous answers yet.</p>';
    return;
  }
  
  const html = history.map(entry => {
    const date = new Date(entry.date);
    const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const statusClass = entry.correct ? 'correct' : 'wrong';
    const statusText = entry.correct ? '✓' : '✗';
    
    return `
      <div class="answer-entry" style="padding: 8px; margin: 5px 0; border-left: 3px solid ${entry.correct ? '#27ae60' : '#e74c3c'}; background: #f8f9fa;">
        <div style="font-size: 0.85em; color: #666;">${dateStr} ${statusText}</div>
        <div><strong>Q:</strong> ${entry.question}</div>
        <div><strong>Your Answer:</strong> ${entry.userAnswer}</div>
        ${!entry.correct ? `<div style="color: #e74c3c;"><strong>Correct:</strong> ${entry.correctAnswer}</div>` : ''}
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
}

// Clear answer input
function clearDailyAnswer() {
  const userAnswer = document.getElementById('userAnswer');
  if (userAnswer) userAnswer.value = '';
}

// Event Listeners for Daily Task
document.addEventListener('DOMContentLoaded', function() {
  // Initialize daily task
  initDailyTask();
  
  // Setup submit button
  const submitBtn = document.getElementById('submitAnswer');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitDailyAnswer);
  }
  
  // Setup clear button
  const clearBtn = document.getElementById('clearAnswer');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearDailyAnswer);
  }
  
  // Allow Enter key to submit
  const userAnswer = document.getElementById('userAnswer');
  if (userAnswer) {
    userAnswer.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitDailyAnswer();
      }
    });
  }
});
    
    // Function to generate PDF thumbnail
    async function generatePDFThumbnail(pdfPath, canvasId) {
      try {
        const loading = document.querySelector(`#${canvasId}`).nextElementSibling;
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        
        console.log(`Attempting to load PDF: ${pdfPath}`);
        
        // Check if PDF.js is loaded
        if (typeof pdfjsLib === 'undefined') {
          throw new Error('PDF.js library not loaded');
        }
        
        // Load PDF with error handling
        const loadingTask = pdfjsLib.getDocument({
          url: pdfPath,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true
        });
        
        const pdf = await loadingTask.promise;
        console.log(`PDF loaded successfully: ${pdfPath}`);
        
        const page = await pdf.getPage(1); // Get first page
        
        // Set canvas dimensions
        const scale = 0.3; // Scale down for thumbnail
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        // Render page to canvas
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
        console.log(`Thumbnail rendered for: ${pdfPath}`);
        
        // Hide loading text
        loading.style.display = 'none';
        canvas.style.display = 'block';
        
      } catch (error) {
        console.error(`Error generating PDF thumbnail for ${pdfPath}:`, error);
        const loading = document.querySelector(`#${canvasId}`).nextElementSibling;
        
        // Show fallback instead of error message
        loading.style.display = 'none';
        const fallback = document.querySelector(`#${canvasId}`).parentElement.querySelector('.thumbnail-fallback');
        if (fallback) {
          fallback.style.display = 'flex';
          fallback.style.flexDirection = 'column';
          fallback.style.alignItems = 'center';
          fallback.style.justifyContent = 'center';
          fallback.style.height = '100%';
        }
      }
    }
    
    // Alternative: Use fallback icons immediately
    function showFallbackIcons() {
      const fallbacks = document.querySelectorAll('.thumbnail-fallback');
      const loadings = document.querySelectorAll('.thumbnail-loading');
      
      fallbacks.forEach(fallback => {
        fallback.style.display = 'flex';
        fallback.style.flexDirection = 'column';
        fallback.style.alignItems = 'center';
        fallback.style.justifyContent = 'center';
        fallback.style.height = '100%';
      });
      
      loadings.forEach(loading => {
        loading.style.display = 'none';
      });
    }
    
    // Generate thumbnails when page loads
    document.addEventListener('DOMContentLoaded', () => {
      // Add click handler for handout cards to open PDF
      document.querySelectorAll('.handout-card').forEach(card => {
        card.addEventListener('click', function(e) {
          e.preventDefault();
          const pdfUrl = this.getAttribute('href');
          if (pdfUrl) {
            window.open(pdfUrl, '_blank');
          }
        });
      });

      // Check if we should try PDF thumbnails or use fallback
      const usePDFThumbnails = false; // Set to true to try PDF thumbnails
      
      if (usePDFThumbnails) {
        // Wait a bit for PDF.js to load
        setTimeout(() => {
          generatePDFThumbnail('handouts/Html Introduction.pdf', 'thumbnail-1');
          generatePDFThumbnail('handouts/HTML Editor.pdf', 'thumbnail-2');
          generatePDFThumbnail('handouts/HTML Attributes.pdf', 'thumbnail-3');
        }, 1000);
      } else {
        // Use fallback icons immediately
        showFallbackIcons();
      }
    });

// Video Quiz Functionality - JavaScript Programming
const videoQuizData = {
  'modalVideo': [
    // Multiple Choice Questions for JavaScript Video
    { 
      time: 10, 
      question: 'Which keyword is used to declare a variable in JavaScript that can be reassigned?', 
      options: ['var', 'constant', 'let', 'fixed'], 
      correct: 2, 
      type: 'multiple',
      explanation: 'The let keyword declares a block-scoped variable that can be reassigned. Use const for constants that cannot be reassigned.'
    },
    { 
      time: 25, 
      question: 'What is the correct way to call a function named "displayMessage"?', 
      options: ['call displayMessage()', 'displayMessage()', 'invoke displayMessage', 'run displayMessage'], 
      correct: 1, 
      type: 'multiple',
      explanation: 'Functions are invoked using their name followed by parentheses: functionName(). The call/invoke keywords are not used in JavaScript syntax.'
    },
    { 
      time: 40, 
      question: 'What is the correct syntax for a JavaScript comment?', 
      options: ['<!-- comment -->', '// comment', '# comment', '/* comment */'], 
      correct: 3, 
      type: 'multiple',
      explanation: 'JavaScript uses /* */ for multi-line comments and // for single-line comments. HTML-style comments <!-- --> are not valid in JavaScript.'
    },
    { 
      time: 55, 
      question: 'Which method is used to display output in JavaScript?', 
      options: ['print()', 'echo()', 'console.log()', 'document.write()'], 
      correct: 2, 
      type: 'multiple',
      explanation: 'console.log() is the standard method for displaying output in JavaScript, typically used for debugging purposes.'
    },
    { 
      time: 75, 
      question: 'Write the correct JavaScript variable declaration:', 
      type: 'code', 
      correctCode: 'let message = "Hello World";', 
      hints: ['Use let keyword', 'Variable name should be message', 'Assign the string "Hello World"'],
      explanation: 'The let keyword declares a block-scoped variable. Use const for constants and let for variables that may change.'
    },
    { 
      time: 100, 
      question: 'How do you create a function in JavaScript?', 
      options: ['function myFunction()', 'def myFunction()', 'create function myFunction()', 'func myFunction()'], 
      correct: 0, 
      type: 'multiple',
      explanation: 'JavaScript uses the function keyword to declare functions. The syntax is: function functionName() { ... }'
    }
  ],
  'modalVideo2': [
    // Multiple Choice Questions (6)
    { time: 15, question: 'What does Java stand for?', options: ['Java Application Programming', 'Just Another Virtual Architecture', 'High-level programming language', 'None of the above'], correct: 0, type: 'multiple' },
    { time: 45, question: 'Which data type is used for whole numbers in Java?', options: ['double', 'char', 'int', 'boolean'], correct: 2, type: 'multiple' },
    { time: 75, question: 'What is the output of: System.out.println(5 + 3 * 2)?', options: ['16', '11', '13', '20'], correct: 1, type: 'multiple' },
    { time: 105, question: 'Which loop is best for iterating a known number of times?', options: ['while', 'do-while', 'for', 'foreach'], correct: 2, type: 'multiple' },
    { time: 135, question: 'How do you access the length of an array arr?', options: ['arr.length', 'arr.size', 'arr.len', 'arr.getLength()'], correct: 0, type: 'multiple' },
    { time: 165, question: 'What is the correct way to declare a Java class?', options: ['class MyClass', 'Class MyClass', 'new class MyClass', 'MyClass class'], correct: 0, type: 'multiple' },
    // Code Writer Questions (4)
    { time: 200, question: 'Write a Java variable declaration for a string name:', type: 'code', correctCode: 'String name;', hints: ['Use String keyword', 'Variable name should be "name"', 'End with semicolon'] },
    { time: 240, question: 'Write an if statement checking if x is greater than 10:', type: 'code', correctCode: 'if (x > 10) {', hints: ['Use if keyword with parentheses', 'Use > operator', 'Include opening curly brace'] },
    { time: 280, question: 'Write a for loop from 0 to 4:', type: 'code', correctCode: 'for (int i = 0; i < 5; i++)', hints: ['Use for keyword', 'Initialize i = 0', 'Check i < 5 and increment i++'] },
    { time: 320, question: 'Write a method that returns an int called getAge:', type: 'code', correctCode: 'public int getAge() { return 0; }', hints: ['Use public int return type', 'Method name getAge()', 'Return an int value'] }
  ]
};

let currentVideo = null;
let currentQuizIndex = 0;
let answeredQuizzes = {};  // Track which quizzes have been answered for each video
let quizResults = {};  // Track correct/incorrect: { videoId: { index: { answered: boolean, correct: boolean } } }

// Load saved quiz progress from localStorage
function loadQuizProgress() {
   const saved = localStorage.getItem('jscode-quiz-progress');
   if (saved) {
     try {
       const data = JSON.parse(saved);
       answeredQuizzes = data.answeredQuizzes || {};
       quizResults = data.quizResults || {};
     } catch (e) {
       answeredQuizzes = {};
       quizResults = {};
     }
   }
 }
 
 // Save quiz progress to localStorage
 function saveQuizProgress() {
   const data = {
     answeredQuizzes: answeredQuizzes,
     quizResults: quizResults
   };
   localStorage.setItem('jscode-quiz-progress', JSON.stringify(data));
   
   // Update profile quiz results with aggregated JavaScript quiz score
   updateProfileQuizResults(getSubjectFromVideoId(currentVideo ? currentVideo.id : null));
 }

// Helper to get subject name from video ID
function getSubjectFromVideoId(videoId) {
  const subjectMap = {
    'modalVideo': 'JavaScript',
    'modalVideo2': 'Java'
  };
  return subjectMap[videoId] || 'Programming';
}

// Update the user profile's quizResults with quiz score (when a video is completed)
function updateProfileQuizResults(subject) {
  // Determine current video ID
  const videoId = currentVideo ? currentVideo.id : null;
  if (!videoId) return;

  const videoQuizzes = videoQuizData[videoId] || [];
  if (videoQuizzes.length === 0) return;

  // Check if all quizzes for this video are answered
  const answeredIndices = answeredQuizzes[videoId] || [];
  const allAnswered = videoQuizzes.every((_, idx) => answeredIndices.includes(idx));
  if (!allAnswered) return;

  // Calculate score
  let correctCount = 0;
  videoQuizzes.forEach((quiz, idx) => {
    const result = quizResults[videoId] ? quizResults[videoId][idx] : null;
    if (result && result.correct) correctCount++;
  });
  const score = Math.round((correctCount / videoQuizzes.length) * 100);

  // Get existing results
  let profileQuizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');

  // Avoid duplicate entry for same video
  const duplicateIndex = profileQuizResults.findIndex(e => e.videoId === videoId && e.subject === subject);
  if (duplicateIndex !== -1) {
    profileQuizResults[duplicateIndex].score = score;
    profileQuizResults[duplicateIndex].date = new Date().toISOString();
  } else {
    const newEntry = {
      date: new Date().toISOString(),
      score: score,
      hours: 0,
      subject: subject,
      difficulty: 'intermediate',
      type: 'video-quiz',
      videoId: videoId
    };
    profileQuizResults.push(newEntry);
  }

  if (profileQuizResults.length > 50) {
    profileQuizResults.splice(0, profileQuizResults.length - 50);
  }

  localStorage.setItem('quizResults', JSON.stringify(profileQuizResults));
  localStorage.setItem('refreshChart', 'true');

  if (typeof refreshProgressChart === 'function') {
    refreshProgressChart();
  }

  console.log('Profile quiz results updated - Java video ' + videoId + ' score:', score + '%');
}

const videoQuizModal = document.getElementById('videoQuizModal');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const quizSubmitBtn = document.getElementById('quizSubmitBtn');
const quizCountdown = document.getElementById('quizCountdown');
const quizContent = document.getElementById('quizContent');
const countdownTimer = document.getElementById('countdownTimer');
const quizNoteInput = document.getElementById('quizNoteInput');
const skipCountdownBtn = document.getElementById('skipCountdownBtn');
const videoNotesDisplay = document.getElementById('videoNotesDisplay');

let countdownInterval = null;
let currentQuizData = null;
let videoNotes = [];  // Store notes taken during video playback
let currentVideoElement = null;
let isQuizActive = false;  // Track if quiz is in progress for beforeunload warning

// Handle beforeunload warning when quiz is active
window.addEventListener('beforeunload', function(event) {
  if (isQuizActive) {
    const message = 'Warning: You have unsaved progress. Your video notes and quiz progress will not be saved if you close this page.';
    event.preventDefault();  // Standard for most browsers
    event.returnValue = message;  // Required for some browsers
    return message;  // For older browsers
  }
});

// Handle skip countdown button
if (skipCountdownBtn) {
  skipCountdownBtn.addEventListener('click', () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    
    // Check if there are any unanswered quizzes before current video position
    const videoId = currentVideo ? currentVideo.id : 'modalVideo';
    const currentTime = currentVideo ? currentVideo.currentTime : 0;
    const quizzes = videoQuizData[videoId];
    
    if (quizzes && quizzes.length > 0) {
      const pendingQuizzes = [];
      quizzes.forEach((quiz, index) => {
        if (quiz.time <= currentTime && !answeredQuizzes[videoId].includes(index)) {
          pendingQuizzes.push({ quiz, index });
        }
      });
      
      if (pendingQuizzes.length > 0) {
        // There are pending quizzes - show them first
        pendingSkippedQuizzes = pendingQuizzes;
        quizCountdown.style.display = 'none';
        quizContent.style.display = 'block';
        showSkippedQuiz(0);
        return;
      }
    }
    
    // No pending quizzes - show the regular quiz content
    showQuizContent();
  });
}

// Handle close quiz modal button
const closeQuizModalBtn = document.getElementById('closeQuizModal');
if (closeQuizModalBtn) {
  closeQuizModalBtn.addEventListener('click', () => {
    // Mark any pending quizzes as wrong when closing without answering
    if (currentVideo && currentQuizData) {
      const videoId = currentVideo.id;
      const quizIndex = currentQuizIndex;
      
      // Check if this quiz hasn't been answered yet
      if (!answeredQuizzes[videoId] || !answeredQuizzes[videoId].includes(quizIndex)) {
        // Mark as answered with wrong result
        if (!answeredQuizzes[videoId]) {
          answeredQuizzes[videoId] = [];
        }
        answeredQuizzes[videoId].push(quizIndex);
        
        // Track as incorrect
        if (!quizResults[videoId]) {
          quizResults[videoId] = {};
        }
        quizResults[videoId][quizIndex] = {
          answered: true,
          correct: false
        };
        
        saveQuizProgress();
        updateQuizStatus();
      }
    }
    
    // Also mark any pending skipped quizzes as wrong
    if (pendingSkippedQuizzes.length > 0) {
      pendingSkippedQuizzes.forEach(skipped => {
        const videoId = currentVideo ? currentVideo.id : 'modalVideo';
        const quizIndex = skipped.index;
        
        if (!answeredQuizzes[videoId] || !answeredQuizzes[videoId].includes(quizIndex)) {
          if (!answeredQuizzes[videoId]) {
            answeredQuizzes[videoId] = [];
          }
          answeredQuizzes[videoId].push(quizIndex);
          
          if (!quizResults[videoId]) {
            quizResults[videoId] = {};
          }
          quizResults[videoId][quizIndex] = {
            answered: true,
            correct: false
          };
        }
      });
      
      pendingSkippedQuizzes = [];
      saveQuizProgress();
      updateQuizStatus();
    }
    
    videoQuizModal.style.display = 'none';
    // Mark quiz as inactive to remove beforeunload warning
    isQuizActive = false;
    // Hide the floating notes panel
    const videoNotesPanel = document.getElementById('videoNotesPanel');
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'none';
    }
    // Do NOT auto-play video - user can manually resume if they want
    // Reset countdown if any
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  });
}

// Video notes handling
function saveVideoNote() {
  const noteText = quizNoteInput.value.trim();
  if (noteText) {
    videoNotes.push(noteText);
    quizNoteInput.value = '';
    updateVideoNotesDisplay();
  }
}

function updateVideoNotesDisplay() {
  if (videoNotesDisplay) {
    videoNotesDisplay.innerHTML = videoNotes.map(note => `<p>• ${note}</p>`).join('');
  }
}

function flashVideoNotes() {
  if (videoNotesDisplay && videoNotes.length > 0) {
    videoNotesDisplay.classList.add('flash');
    setTimeout(() => {
      videoNotesDisplay.classList.remove('flash');
    }, 3000);
  }
}

// Floating Video Notes Panel functionality
const videoNotesPanel = document.getElementById('videoNotesPanel');
const toggleVideoNotes = document.getElementById('toggleVideoNotes');
const closeVideoNotes = document.getElementById('closeVideoNotes');
const videoNotesList = document.getElementById('videoNotesList');
const videoNoteInput = document.getElementById('videoNoteInput');

// Toggle notes panel
if (toggleVideoNotes) {
  toggleVideoNotes.addEventListener('click', () => {
    if (videoNotesPanel) {
      videoNotesPanel.style.display = videoNotesPanel.style.display === 'none' ? 'flex' : 'none';
    }
  });
}

// Close notes panel
if (closeVideoNotes) {
  closeVideoNotes.addEventListener('click', () => {
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'none';
    }
  });
}

// Add note from floating panel
if (videoNoteInput) {
  videoNoteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const noteText = videoNoteInput.value.trim();
      if (noteText) {
        videoNotes.push(noteText);
        videoNoteInput.value = '';
        updateFloatingNotesList();
      }
    }
  });
}

function updateFloatingNotesList() {
  if (videoNotesList) {
    videoNotesList.innerHTML = videoNotes.map(note => `<p>• ${note}</p>`).join('');
  }
}

// Show notes panel when Discussion section is shown
const originalShowText = showText;
showText = function(id) {
  originalShowText(id);
  
  if (id === 'Discussion') {
    // Do NOT show the toggle button yet - it will show when video modal opens
    if (toggleVideoNotes) {
      toggleVideoNotes.style.display = 'none';
    }
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'none';
    }
    // Reset notes for new video session
    videoNotes = [];
    updateFloatingNotesList();
    // Update quiz status display
    updateQuizStatus();
  } else {
    // Hide the toggle button and panel in other modes
    if (toggleVideoNotes) {
      toggleVideoNotes.style.display = 'none';
    }
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'none';
    }
  }
};

// Initialize answered quizzes tracking
Object.keys(videoQuizData).forEach(videoId => {
  answeredQuizzes[videoId] = [];
});

// Add timeupdate listener to videos
document.querySelectorAll('#modalVideo, #modalVideo2').forEach(video => {
  let previousTime = 0;
  
  video.addEventListener('timeupdate', function() {
    checkForQuiz(this);
    previousTime = this.currentTime;
  });
  
  // Handle seeking - check for skipped quizzes
  video.addEventListener('seeking', function() {
    const videoId = this.id;
    const currentTime = this.currentTime;
    const quizzes = videoQuizData[videoId];
    
    if (!quizzes || quizzes.length === 0) return;
    
    // Find quizzes between previous time and current time (skipped quizzes)
    const skippedQuizzes = [];
    quizzes.forEach((quiz, index) => {
      if (quiz.time > previousTime && quiz.time <= currentTime && !answeredQuizzes[videoId].includes(index)) {
        skippedQuizzes.push({ quiz, index });
      }
    });
    
    // If there are skipped quizzes, force user to answer them
    if (skippedQuizzes.length > 0) {
      // Store skipped quizzes to answer
      pendingSkippedQuizzes = skippedQuizzes;
      currentVideo = this;
      currentVideoElement = this;
      
      // Pause the video
      this.pause();
      
      // Show quiz modal for skipped quizzes
      videoQuizModal.style.display = 'flex';
      quizCountdown.style.display = 'none';
      quizContent.style.display = 'block';
      
      // Show first skipped quiz
      showSkippedQuiz(0);
    }
  });
});

// Update quiz status display
function updateQuizStatus() {
  const quizStatusList = document.getElementById('quizStatusList');
  const retakeQuizBtn = document.getElementById('retakeQuizBtn');
  
  if (!quizStatusList) return;
  
  let statusHtml = '';
  let totalQuizzes = 0;
  let answeredCount = 0;
  let correctCount = 0;
  
  // JavaScript Programming video quizzes
  const video1Quizzes = videoQuizData['modalVideo'] || [];
  if (video1Quizzes.length > 0) {
    statusHtml += '<div class="video-quiz-status"><strong>JavaScript Introduction:</strong>';
    video1Quizzes.forEach((quiz, index) => {
      totalQuizzes++;
      const isAnswered = answeredQuizzes['modalVideo'] && answeredQuizzes['modalVideo'].includes(index);
      const result = quizResults['modalVideo'] ? quizResults['modalVideo'][index] : null;
      const isCorrect = result && result.correct;
      
      if (isAnswered) {
        answeredCount++;
        if (isCorrect) correctCount++;
      }
      
      let statusIcon, statusClass, title;
      if (!isAnswered) {
        statusIcon = '○';
        statusClass = 'pending';
        title = 'Not answered yet';
      } else if (isCorrect) {
        statusIcon = '✓';
        statusClass = 'correct';
        title = 'Correct answer';
      } else {
        statusIcon = '✗';
        statusClass = 'incorrect';
        title = 'Wrong answer - click to retake';
      }
      
      statusHtml += `<span class="quiz-status-icon ${statusClass}" data-video="modalVideo" data-index="${index}" title="${title}">${statusIcon}</span>`;
    });
    statusHtml += '</div>';
  }
  
  // Java Programming video quizzes
  const video2Quizzes = videoQuizData['modalVideo2'] || [];
  if (video2Quizzes.length > 0) {
    statusHtml += '<div class="video-quiz-status"><strong>Java Programming:</strong>';
    video2Quizzes.forEach((quiz, index) => {
      totalQuizzes++;
      const isAnswered = answeredQuizzes['modalVideo2'] && answeredQuizzes['modalVideo2'].includes(index);
      const result = quizResults['modalVideo2'] ? quizResults['modalVideo2'][index] : null;
      const isCorrect = result && result.correct;
      
      if (isAnswered) {
        answeredCount++;
        if (isCorrect) correctCount++;
      }
      
      let statusIcon, statusClass, title;
      if (!isAnswered) {
        statusIcon = '○';
        statusClass = 'pending';
        title = 'Not answered yet';
      } else if (isCorrect) {
        statusIcon = '✓';
        statusClass = 'correct';
        title = 'Correct answer';
      } else {
        statusIcon = '✗';
        statusClass = 'incorrect';
        title = 'Wrong answer - click to retake';
      }
      
      statusHtml += `<span class="quiz-status-icon ${statusClass}" data-video="modalVideo2" data-index="${index}" title="${title}">${statusIcon}</span>`;
    });
    statusHtml += '</div>';
  }
  
  statusHtml += `<div class="quiz-summary">Total: ${correctCount}/${totalQuizzes} correct (${answeredCount}/${totalQuizzes} answered)</div>`;
  quizStatusList.innerHTML = statusHtml;
  
  // Show retake button if any quizzes are answered
  if (retakeQuizBtn) {
    retakeQuizBtn.style.display = answeredCount > 0 ? 'inline-block' : 'none';
  }
  
  // Add click handlers to status icons
  document.querySelectorAll('.quiz-status-icon').forEach(icon => {
    const videoId = icon.getAttribute('data-video');
    const index = parseInt(icon.getAttribute('data-index'));
    const result = quizResults[videoId] ? quizResults[videoId][index] : null;
    const isAnswered = result && result.answered;
    
    if (isAnswered) {
      icon.style.cursor = 'pointer';
      icon.onclick = function() {
        retakeQuiz(videoId, index);
      };
    } else {
      icon.style.cursor = 'not-allowed';
      icon.title = 'Answer this quiz in the video first';
      icon.onclick = null;
    }
  });
}

// Add question number display in quiz modal
function showQuizContent() {
  // Hide fullscreen warnings when quiz content is shown
  const fullscreenWarning = document.getElementById('fullscreenWarning');
  if (fullscreenWarning) {
    fullscreenWarning.style.display = 'none';
  }
  
  const quiz = currentQuizData;
  const videoId = currentVideo ? currentVideo.id : 'modalVideo2';
  
  // Hide countdown, show quiz content
  quizCountdown.style.display = 'none';
  quizContent.style.display = 'block';
  
// Set question with quiz number
  const quizNumber = currentQuizIndex + 1;
  quizQuestion.textContent = `Q${quizNumber}: ${quiz.question}`;
  quizOptions.innerHTML = '';
}

// Retake a specific quiz
function retakeQuiz(videoId, index) {
  const quiz = videoQuizData[videoId][index];
  
  // Remove from answered (allow retaking)
  if (answeredQuizzes[videoId]) {
    const idx = answeredQuizzes[videoId].indexOf(index);
    if (idx > -1) {
      answeredQuizzes[videoId].splice(idx, 1);
    }
  }
  
  // Clear previous result for this quiz
  if (quizResults[videoId]) {
    delete quizResults[videoId][index];
  }
  
  // Find the video element
  const video = document.getElementById(videoId);
  if (video) {
    currentVideo = video;
    currentVideoElement = video;
    
    // Pause if playing
    video.pause();
    
    // Seek to quiz timestamp
    video.currentTime = quiz.time;
    
    // Show quiz modal
    videoQuizModal.style.display = 'flex';
    quizCountdown.style.display = 'none';
    quizContent.style.display = 'block';
    
    // Show the specific quiz
    currentQuizIndex = index;
    currentQuizData = quiz;
    
    // Show question with number
    const quizNumber = index + 1;
    quizQuestion.textContent = `Q${quizNumber}: ${quiz.question}`;
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';
    
    // Check if this is a code-based question
    const codeEditorSection = document.getElementById('codeEditorSection');
    const codeEditor = document.getElementById('codeEditor');
    
    if (quiz.type === 'code') {
      // Show code editor, hide multiple choice options
      quizOptions.style.display = 'none';
      codeEditorSection.style.display = 'block';
      codeEditor.value = '';
      codeEditor.disabled = false;
      
      // Show hints if available
      if (quiz.hints && quiz.hints.length > 0) {
        const hintsDiv = document.createElement('div');
        hintsDiv.className = 'code-hints';
        hintsDiv.innerHTML = '<strong>Hints:</strong><ul>' + 
          quiz.hints.map(hint => `<li>${hint}</li>`).join('') + 
          '</ul>';
        quizOptions.appendChild(hintsDiv);
        quizOptions.style.display = 'block';
      }
    } else {
      // Show multiple choice options, hide code editor
      quizOptions.style.display = 'block';
      codeEditorSection.style.display = 'none';
      
      quiz.options.forEach((option, optIndex) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('quiz-option-btn');
        btn.style.display = 'block';
        btn.style.width = '100%';
        btn.style.margin = '10px 0';
        btn.style.padding = '12px';
        btn.style.textAlign = 'left';
        btn.onclick = () => {
          const isCorrect = (optIndex === quiz.correct);
          
          // Mark as answered with result
          if (!answeredQuizzes[videoId]) {
            answeredQuizzes[videoId] = [];
          }
          if (!answeredQuizzes[videoId].includes(index)) {
            answeredQuizzes[videoId].push(index);
          }
          
          // Track correct/incorrect
          if (!quizResults[videoId]) {
            quizResults[videoId] = {};
          }
          quizResults[videoId][index] = {
            answered: true,
            correct: isCorrect
          };
          
          saveQuizProgress();
          
          // Show feedback
          if (isCorrect) {
            quizFeedback.textContent = '✓ Correct!';
            quizFeedback.className = 'quiz-feedback correct';
          } else {
            quizFeedback.textContent = '✗ Wrong!';
            quizFeedback.className = 'quiz-feedback incorrect';
            
// Show correct answer
         const correctAnswerDiv = document.createElement('div');
         correctAnswerDiv.className = 'correct-answer-display';
         correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong> ${quiz.options[quiz.correct]}`;
         quizFeedback.appendChild(correctAnswerDiv);
       }

       // Disable all options after answering
       const allBtns = quizOptions.querySelectorAll('button');
          allBtns.forEach(b => b.disabled = true);
          
          // Update status after answering
          setTimeout(() => {
            updateQuizStatus();
          }, 1500);
        };
        quizOptions.appendChild(btn);
      });
    }
    
    // Update status display
    updateQuizStatus();
  }
}

// Function to show skipped quizzes one by one
function showSkippedQuiz(skippedIndex) {
  if (skippedIndex >= pendingSkippedQuizzes.length) {
    // All skipped quizzes answered, close modal
    videoQuizModal.style.display = 'none';
    pendingSkippedQuizzes = [];
    return;
  }
  
  const skipped = pendingSkippedQuizzes[skippedIndex];
  const quiz = skipped.quiz;
  const quizIndex = skipped.index;
  
  // Show question with number
  quizQuestion.textContent = `Q${quizIndex + 1}: ${quiz.question}`;
  quizOptions.innerHTML = '';
  quizFeedback.textContent = '';
  
  // Check if this is a code-based question
  const codeEditorSection = document.getElementById('codeEditorSection');
  const codeEditor = document.getElementById('codeEditor');
  
  if (quiz.type === 'code') {
    // Show code editor, hide multiple choice options
    quizOptions.style.display = 'none';
    codeEditorSection.style.display = 'block';
    codeEditor.value = '';
    codeEditor.disabled = false;
    
    // Show hints if available
    if (quiz.hints && quiz.hints.length > 0) {
      const hintsDiv = document.createElement('div');
      hintsDiv.className = 'code-hints';
      hintsDiv.innerHTML = '<strong>Hints:</strong><ul>' + 
        quiz.hints.map(hint => `<li>${hint}</li>`).join('') + 
        '</ul>';
      quizOptions.appendChild(hintsDiv);
      quizOptions.style.display = 'block';
    }
    
    // Set up submit handler for code question
    quizSubmitBtn.onclick = () => {
      const userCode = codeEditor.value.trim();
      
      if (!userCode) {
        // No code entered - mark as wrong
        if (!answeredQuizzes[currentVideo.id]) {
          answeredQuizzes[currentVideo.id] = [];
        }
        if (!answeredQuizzes[currentVideo.id].includes(quizIndex)) {
          answeredQuizzes[currentVideo.id].push(quizIndex);
        }
        
        if (!quizResults[currentVideo.id]) {
          quizResults[currentVideo.id] = {};
        }
        quizResults[currentVideo.id][quizIndex] = {
          answered: true,
          correct: false
        };
        
        saveQuizProgress();
        
        // Show feedback with explanation
        quizFeedback.innerHTML = `<div class="quiz-result incorrect"><strong>✗ Skipped!</strong> No code entered - marked as wrong.</div>`;
        if (quiz.explanation) {
          const explanationDiv = document.createElement('div');
          explanationDiv.className = 'quiz-explanation';
          explanationDiv.innerHTML = `<strong>Explanation:</strong> ${quiz.explanation}`;
          quizFeedback.appendChild(explanationDiv);
        }
        
        // Show correct answer
        const correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.className = 'correct-answer-display';
        correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong><pre>${escapeHtml(quiz.correctCode)}</pre>`;
        quizFeedback.appendChild(correctAnswerDiv);
        
        codeEditor.disabled = true;
        updateQuizStatus();
        
        setTimeout(() => {
          showSkippedQuiz(skippedIndex + 1);
        }, 4000);
        
        return;
      }
      
      // Validate code - normalize whitespace and compare
      const normalizedUserCode = userCode.replace(/\s+/g, ' ').trim();
      const normalizedCorrectCode = quiz.correctCode.replace(/\s+/g, ' ').trim();
      const isCorrect = (normalizedUserCode === normalizedCorrectCode);
      
      if (!answeredQuizzes[currentVideo.id]) {
        answeredQuizzes[currentVideo.id] = [];
      }
      if (!answeredQuizzes[currentVideo.id].includes(quizIndex)) {
        answeredQuizzes[currentVideo.id].push(quizIndex);
      }
      
      if (!quizResults[currentVideo.id]) {
        quizResults[currentVideo.id] = {};
      }
      quizResults[currentVideo.id][quizIndex] = {
        answered: true,
        correct: isCorrect
      };
      
      saveQuizProgress();
      
      if (isCorrect) {
        quizFeedback.innerHTML = '<div class="quiz-result correct">✓ Correct!</div>';
      } else {
        quizFeedback.innerHTML = '<div class="quiz-result incorrect">✗ Wrong!</div>';
        
        // Show explanation for wrong answers
        if (quiz.explanation) {
          const explanationDiv = document.createElement('div');
          explanationDiv.className = 'quiz-explanation';
          explanationDiv.innerHTML = `<strong>Explanation:</strong> ${quiz.explanation}`;
          quizFeedback.appendChild(explanationDiv);
        }
        
        const correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.className = 'correct-answer-display';
        correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong><pre>${escapeHtml(quiz.correctCode)}</pre>`;
        quizFeedback.appendChild(correctAnswerDiv);
      }
      
      codeEditor.disabled = true;
      updateQuizStatus();
      
      setTimeout(() => {
        showSkippedQuiz(skippedIndex + 1);
      }, 4000);
    };
    
    return;
  }
  
  // Multiple choice question handling
  quizOptions.style.display = 'block';
  codeEditorSection.style.display = 'none';
  
  quiz.options.forEach((option, optIndex) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.classList.add('quiz-option-btn');
    btn.style.display = 'block';
    btn.style.width = '100%';
    btn.style.margin = '10px 0';
    btn.style.padding = '12px';
    btn.style.textAlign = 'left';
    btn.onclick = () => {
      const isCorrect = (optIndex === quiz.correct);
      
      // Mark as answered with result
      if (!answeredQuizzes[currentVideo.id]) {
        answeredQuizzes[currentVideo.id] = [];
      }
      if (!answeredQuizzes[currentVideo.id].includes(quizIndex)) {
        answeredQuizzes[currentVideo.id].push(quizIndex);
      }
      
      // Track correct/incorrect
      if (!quizResults[currentVideo.id]) {
        quizResults[currentVideo.id] = {};
      }
      quizResults[currentVideo.id][quizIndex] = {
        answered: true,
        correct: isCorrect
      };
      
      saveQuizProgress();
      
      // Show feedback
      if (isCorrect) {
        quizFeedback.innerHTML = '<div class="quiz-result correct">✓ Correct!</div>';
      } else {
        quizFeedback.innerHTML = '<div class="quiz-result incorrect">✗ Wrong!</div>';
        
        // Show explanation for wrong answers
        if (quiz.explanation) {
          const explanationDiv = document.createElement('div');
          explanationDiv.className = 'quiz-explanation';
          explanationDiv.innerHTML = `<strong>Explanation:</strong> ${quiz.explanation}`;
          quizFeedback.appendChild(explanationDiv);
        }
        
// Show correct answer
         const correctAnswerDiv = document.createElement('div');
         correctAnswerDiv.className = 'correct-answer-display';
         correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong> ${quiz.options[quiz.correct]}`;
         quizFeedback.appendChild(correctAnswerDiv);
       }

       // Disable all options after answering
       const allBtns = quizOptions.querySelectorAll('button');
       allBtns.forEach(b => b.disabled = true);
       
       // Update status display
       updateQuizStatus();
       
       // Show next skipped quiz after short delay
       setTimeout(() => {
         showSkippedQuiz(skippedIndex + 1);
       }, 1500);
     };
     quizOptions.appendChild(btn);
   });
}

function checkForQuiz(video) {
  const videoId = video.id;
  const currentTime = video.currentTime;
  const quizzes = videoQuizData[videoId];
  
  if (!quizzes || quizzes.length === 0) return;
  
  // Initialize answeredQuizzes for this video if not exists
  if (!answeredQuizzes[videoId]) {
    answeredQuizzes[videoId] = [];
  }
  
  // Check each quiz timestamp
  quizzes.forEach((quiz, index) => {
    // Check if we're within 1 second of the quiz timestamp and haven't answered this quiz yet
    if (Math.abs(currentTime - quiz.time) < 1 && !answeredQuizzes[videoId].includes(index)) {
      showQuiz(video, quiz, index);
    }
  });
}

function showQuiz(video, quiz, index) {
  // Pause the video
  video.pause();
  currentVideo = video;
  currentVideoElement = video;
  currentQuizIndex = index;
  currentQuizData = quiz;
  
  // Set quiz as active for beforeunload warning
  isQuizActive = true;
  
  // Show the quiz as an overlay directly on the video
  showVideoOverlay(video, quiz, index);
}

// Show quiz overlay directly on the video
function showVideoOverlay(video, quiz, index) {
  // Get the video's parent container (modal-content)
  const modalContent = video.closest('.modal-content');
  if (!modalContent) return;
  
  // Remove any existing overlay
  const existingOverlay = modalContent.querySelector('.video-quiz-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }
  
  // Create the overlay
  const overlay = document.createElement('div');
  overlay.className = 'video-quiz-overlay';
  
  // Build the quiz content
  let overlayHtml = `
    <div class="overlay-question">Q${index + 1}: ${quiz.question}</div>
    <div class="overlay-options">
  `;
  
  if (quiz.type === 'code') {
    // Code input - show text input overlay
    overlayHtml += `
      <div class="overlay-code-section">
        <textarea class="overlay-code-input" placeholder="Type your code here..."></textarea>
        <div class="overlay-code-hints">
          ${quiz.hints ? quiz.hints.map(h => `<span class="hint-tag">${h}</span>`).join('') : ''}
        </div>
        <button class="overlay-submit-btn">Submit</button>
      </div>
    `;
  } else {
    // Multiple choice - show option buttons
    quiz.options.forEach((option, optIndex) => {
      overlayHtml += `
        <button class="overlay-option-btn" data-index="${optIndex}">${option}</button>
      `;
    });
    overlayHtml += `<button class="overlay-submit-btn">Skip</button>`;
  }
  
  overlayHtml += `</div>`;
  overlay.innerHTML = overlayHtml;
  
  // Add the overlay to the modal content
  modalContent.appendChild(overlay);
  
  // Set up click handlers for multiple choice options
  if (quiz.type !== 'code') {
    const optionBtns = overlay.querySelectorAll('.overlay-option-btn');
    let selectedIndex = null;
    
    optionBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove selected class from all buttons
        optionBtns.forEach(b => b.classList.remove('selected'));
        // Add selected class to clicked button
        this.classList.add('selected');
        selectedIndex = parseInt(this.getAttribute('data-index'));
      });
    });
    
    // Submit button handler
    const submitBtn = overlay.querySelector('.overlay-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (selectedIndex === null) {
          // Skip - mark as wrong
          markQuizAnswer(video.id, index, false, null, quiz.correct, quiz.explanation);
        } else {
          const isCorrect = (selectedIndex === quiz.correct);
          markQuizAnswer(video.id, index, isCorrect, selectedIndex, quiz.correct, quiz.explanation);
        }
        // Remove overlay
        overlay.remove();
        // Resume video
        video.play();
        isQuizActive = false;
      });
    }
  } else {
    // Code input handling
    const codeInput = overlay.querySelector('.overlay-code-input');
    const submitBtn = overlay.querySelector('.overlay-submit-btn');
    
    if (submitBtn && codeInput) {
      submitBtn.addEventListener('click', () => {
        const userCode = codeInput.value.trim();
        if (!userCode) {
          // Empty - mark as wrong
          markQuizAnswer(video.id, index, false, null, null, quiz.explanation);
        } else {
          const normalizedUserCode = userCode.replace(/\s+/g, ' ').trim();
          const normalizedCorrectCode = quiz.correctCode.replace(/\s+/g, ' ').trim();
          const isCorrect = (normalizedUserCode === normalizedCorrectCode);
          markQuizAnswer(video.id, index, isCorrect, null, null, quiz.explanation);
        }
        // Remove overlay
        overlay.remove();
        // Resume video
        video.play();
        isQuizActive = false;
      });
    }
  }
}

// Mark quiz answer and update status (updated to include explanation)
function markQuizAnswer(videoId, index, isCorrect, selectedIndex, correctIndex, explanation) {
  // Mark as answered with result
  if (!answeredQuizzes[videoId]) {
    answeredQuizzes[videoId] = [];
  }
  if (!answeredQuizzes[videoId].includes(index)) {
    answeredQuizzes[videoId].push(index);
  }
  
  // Track correct/incorrect
  if (!quizResults[videoId]) {
    quizResults[videoId] = {};
  }
  quizResults[videoId][index] = {
    answered: true,
    correct: isCorrect,
    explanation: explanation || ''
  };
  
  saveQuizProgress();
  updateQuizStatus();
}

// Legacy showQuiz function for backward compatibility
function showQuizLegacy(video, quiz, index) {
  // Pause the video
  video.pause();
  currentVideo = video;
  currentVideoElement = video;
  currentQuizIndex = index;
  currentQuizData = quiz;
  
  // Set quiz as active for beforeunload warning
  isQuizActive = true;
  
  // Show the separate fullscreen warning modal if in fullscreen
  const fullscreenQuizWarning = document.getElementById('fullscreenQuizWarning');
  const fullscreenWarning = document.getElementById('fullscreenWarning');
  
  if (document.fullscreenElement) {
    if (fullscreenQuizWarning) {
      fullscreenQuizWarning.classList.add('show');
    }
    // Show the inner fullscreen warning in the countdown modal
    if (fullscreenWarning) {
      fullscreenWarning.style.display = 'block';
    }
    // Show quiz modal with countdown after showing warning
    videoQuizModal.style.display = 'flex';
    
    // Show countdown, hide quiz content
    quizCountdown.style.display = 'block';
    quizContent.style.display = 'none';
    
    // Show the floating notes panel so users can take notes during countdown
    const videoNotesPanel = document.getElementById('videoNotesPanel');
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'flex';
    }
    
    // Update display with video notes and flash them
    updateVideoNotesDisplay();
    flashVideoNotes();
    
    // Clear the note input for new notes during countdown
    if (quizNoteInput) quizNoteInput.value = '';
    
    // Start 10-second countdown
    let timeLeft = 10;
    countdownTimer.textContent = timeLeft;
    
    if (countdownInterval) clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
      timeLeft--;
      countdownTimer.textContent = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        // Show actual quiz
        showQuizContent();
      }
    }, 1000);
  } else {
    // Not in fullscreen - show quiz modal with countdown directly
    videoQuizModal.style.display = 'flex';
    
    // Show countdown, hide quiz content
    quizCountdown.style.display = 'block';
    quizContent.style.display = 'none';
    
    // Show the floating notes panel so users can take notes during countdown
    const videoNotesPanel = document.getElementById('videoNotesPanel');
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'flex';
    }
    
    // Update display with video notes and flash them
    updateVideoNotesDisplay();
    flashVideoNotes();
    
    // Clear the note input for new notes during countdown
    if (quizNoteInput) quizNoteInput.value = '';
    
    // Start 10-second countdown
    let timeLeft = 10;
    countdownTimer.textContent = timeLeft;
    
    if (countdownInterval) clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
      timeLeft--;
      countdownTimer.textContent = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        // Show actual quiz
        showQuizContent();
      }
    }, 1000);
  }
}

function showQuizContent() {
  // Hide fullscreen warnings when quiz content is shown
  const fullscreenWarning = document.getElementById('fullscreenWarning');
  if (fullscreenWarning) {
    fullscreenWarning.style.display = 'none';
  }
  
  const quiz = currentQuizData;
  
  // Hide countdown, show quiz content
  quizCountdown.style.display = 'none';
  quizContent.style.display = 'block';
  
  // Set question
  quizQuestion.textContent = quiz.question;
  quizOptions.innerHTML = '';
  
  // Check if this is a code-based question
  const codeEditorSection = document.getElementById('codeEditorSection');
  const codeEditor = document.getElementById('codeEditor');
  
  if (quiz.type === 'code') {
    // Show code editor, hide multiple choice options
    quizOptions.style.display = 'none';
    codeEditorSection.style.display = 'block';
    codeEditor.value = '';
    
    // Show hints if available
    if (quiz.hints && quiz.hints.length > 0) {
      const hintsDiv = document.createElement('div');
      hintsDiv.className = 'code-hints';
      hintsDiv.innerHTML = '<strong>Hints:</strong><ul>' + 
        quiz.hints.map(hint => `<li>${hint}</li>`).join('') + 
        '</ul>';
      quizOptions.appendChild(hintsDiv);
      quizOptions.style.display = 'block';
    }
  } else {
    // Show multiple choice options, hide code editor
    quizOptions.style.display = 'block';
    codeEditorSection.style.display = 'none';
    
    quiz.options.forEach((option, i) => {
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quizOption';
      radio.value = i;
      
      const span = document.createElement('span');
      span.textContent = option;
      
      label.appendChild(radio);
      label.appendChild(span);
      quizOptions.appendChild(label);
    });
  }
  
  // Reset feedback and button
  quizFeedback.textContent = '';
  quizFeedback.className = 'quiz-feedback';
  quizSubmitBtn.textContent = 'Submit Answer';
  quizSubmitBtn.disabled = false;
}

// Handle quiz submission - validates answer and shows feedback
quizSubmitBtn.addEventListener('click', function() {
  const quiz = currentQuizData;
  const videoId = currentVideo ? currentVideo.id : 'modalVideo';
  const quizIndex = currentQuizIndex;
  
  // Check if this is a code-based question
  if (quiz.type === 'code') {
    const codeEditor = document.getElementById('codeEditor');
    const userCode = codeEditor.value.trim();
    
    if (!userCode) {
      // No code entered - mark as wrong (skipped)
      if (!answeredQuizzes[videoId]) {
        answeredQuizzes[videoId] = [];
      }
      if (!answeredQuizzes[videoId].includes(quizIndex)) {
        answeredQuizzes[videoId].push(quizIndex);
      }
      
      if (!quizResults[videoId]) {
        quizResults[videoId] = {};
      }
      quizResults[videoId][quizIndex] = {
        answered: true,
        correct: false
      };
      
      saveQuizProgress();
      
      // Show feedback for skipped question
      quizFeedback.textContent = '✗ Skipped! No code entered - marked as wrong.';
      quizFeedback.className = 'quiz-feedback incorrect';
      
      // Show correct answer
      const correctAnswerDiv = document.createElement('div');
      correctAnswerDiv.className = 'correct-answer-display';
      correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong><pre>${escapeHtml(quiz.correctCode)}</pre>`;
      quizFeedback.appendChild(correctAnswerDiv);
      
      // Disable code editor
      codeEditor.disabled = true;
      
      // Update button to close
      quizSubmitBtn.textContent = 'Close Quiz';
      
      // Update status display
      updateQuizStatus();
      
      // Close after delay
      setTimeout(() => {
        videoQuizModal.style.display = 'none';
        isQuizActive = false;
        const videoNotesPanel = document.getElementById('videoNotesPanel');
        if (videoNotesPanel) {
          videoNotesPanel.style.display = 'none';
        }
        if (countdownInterval) {
          clearInterval(countdownInterval);
          countdownInterval = null;
        }
      }, 3000);
      
      return;
    }
    
    // Validate code - normalize whitespace and compare
    const normalizedUserCode = userCode.replace(/\s+/g, ' ').trim();
    const normalizedCorrectCode = quiz.correctCode.replace(/\s+/g, ' ').trim();
    const isCorrect = (normalizedUserCode === normalizedCorrectCode);
    
    // Mark as answered with result
    if (!answeredQuizzes[videoId]) {
      answeredQuizzes[videoId] = [];
    }
    if (!answeredQuizzes[videoId].includes(quizIndex)) {
      answeredQuizzes[videoId].push(quizIndex);
    }
    
    if (!quizResults[videoId]) {
      quizResults[videoId] = {};
    }
    quizResults[videoId][quizIndex] = {
      answered: true,
      correct: isCorrect
    };
    
    saveQuizProgress();
    
    // Show feedback
    if (isCorrect) {
      quizFeedback.textContent = '✓ Correct!';
      quizFeedback.className = 'quiz-feedback correct';
    } else {
      quizFeedback.textContent = '✗ Wrong!';
      quizFeedback.className = 'quiz-feedback incorrect';
      
      // Show correct answer
      const correctAnswerDiv = document.createElement('div');
      correctAnswerDiv.className = 'correct-answer-display';
      correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong><pre>${escapeHtml(quiz.correctCode)}</pre>`;
      quizFeedback.appendChild(correctAnswerDiv);
    }
    
    // Disable code editor
    codeEditor.disabled = true;
    
    // Update button to close
    quizSubmitBtn.textContent = 'Close Quiz';
    
    // Update status display
    updateQuizStatus();
    
    // Close after delay
    setTimeout(() => {
      videoQuizModal.style.display = 'none';
      isQuizActive = false;
      const videoNotesPanel = document.getElementById('videoNotesPanel');
      if (videoNotesPanel) {
        videoNotesPanel.style.display = 'none';
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }, 3000);
    
    return;
  }
  
  // Multiple choice question handling
  const selectedOption = document.querySelector('input[name="quizOption"]:checked');
  
  if (!selectedOption) {
    // No answer selected - mark as wrong (skipped)
    if (!answeredQuizzes[videoId]) {
      answeredQuizzes[videoId] = [];
    }
    if (!answeredQuizzes[videoId].includes(quizIndex)) {
      answeredQuizzes[videoId].push(quizIndex);
    }
    
    // Track as incorrect
    if (!quizResults[videoId]) {
      quizResults[videoId] = {};
    }
    quizResults[videoId][quizIndex] = {
      answered: true,
      correct: false
    };
    
    saveQuizProgress();
    
    // Show feedback for skipped question
    quizFeedback.textContent = '✗ Skipped! No answer selected - marked as wrong.';
    quizFeedback.className = 'quiz-feedback incorrect';
    
    // Show correct answer
    const correctAnswerDiv = document.createElement('div');
    correctAnswerDiv.className = 'correct-answer-display';
    correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong> ${quiz.options[quiz.correct]}`;
    quizFeedback.appendChild(correctAnswerDiv);
    
    // Disable all options
    const allRadios = quizOptions.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => radio.disabled = true);
    
    // Update button to close
    quizSubmitBtn.textContent = 'Close Quiz';
    
    // Update status display
    updateQuizStatus();
    
    // Close after delay
    setTimeout(() => {
      videoQuizModal.style.display = 'none';
      isQuizActive = false;
      const videoNotesPanel = document.getElementById('videoNotesPanel');
      if (videoNotesPanel) {
        videoNotesPanel.style.display = 'none';
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }, 2000);
    
    return;
  }
  
  // Answer selected - validate it
  const userAnswer = parseInt(selectedOption.value);
  const isCorrect = (userAnswer === quiz.correct);
  
  // Mark as answered with result
  if (!answeredQuizzes[videoId]) {
    answeredQuizzes[videoId] = [];
  }
  if (!answeredQuizzes[videoId].includes(quizIndex)) {
    answeredQuizzes[videoId].push(quizIndex);
  }
  
  // Track correct/incorrect
  if (!quizResults[videoId]) {
    quizResults[videoId] = {};
  }
  quizResults[videoId][quizIndex] = {
    answered: true,
    correct: isCorrect
  };
  
  saveQuizProgress();
  
  // Show feedback
  if (isCorrect) {
    quizFeedback.textContent = '✓ Correct!';
    quizFeedback.className = 'quiz-feedback correct';
  } else {
    quizFeedback.textContent = '✗ Wrong!';
    quizFeedback.className = 'quiz-feedback incorrect';
    
    // Show correct answer
    const correctAnswerDiv = document.createElement('div');
    correctAnswerDiv.className = 'correct-answer-display';
    correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong> ${quiz.options[quiz.correct]}`;
    quizFeedback.appendChild(correctAnswerDiv);
  }
  
  // Disable all options after answering
  const allRadios = quizOptions.querySelectorAll('input[type="radio"]');
  allRadios.forEach(radio => radio.disabled = true);
  
  // Update button to close
  quizSubmitBtn.textContent = 'Close Quiz';
  
  // Update status display
  updateQuizStatus();
  
  // Close after delay
  setTimeout(() => {
    videoQuizModal.style.display = 'none';
    isQuizActive = false;
    const videoNotesPanel = document.getElementById('videoNotesPanel');
    if (videoNotesPanel) {
      videoNotesPanel.style.display = 'none';
    }
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }, 2000);
});

// Handle note input Enter key during countdown
if (quizNoteInput) {
  quizNoteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveVideoNote();
    }
  });
}

// Helper function to escape HTML for display
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Handle run code button for live preview
const runCodeBtn = document.getElementById('runCodeBtn');
if (runCodeBtn) {
  runCodeBtn.addEventListener('click', () => {
    const codeEditor = document.getElementById('codeEditor');
    const previewFrame = document.getElementById('previewFrame');
    const userCode = codeEditor.value;
    
    // Update iframe with user's code
    const frameDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(userCode);
    frameDoc.close();
  });
}

// Load quiz progress on page load
document.addEventListener('DOMContentLoaded', () => {
  loadQuizProgress();
  updateQuizStatus();
  
  // Handle retake all quizzes button
  const retakeQuizBtn = document.getElementById('retakeQuizBtn');
  if (retakeQuizBtn) {
    retakeQuizBtn.addEventListener('click', () => {
      // Clear all quiz progress
      answeredQuizzes = {};
      quizResults = {};
      
      // Re-initialize answered quizzes tracking
      Object.keys(videoQuizData).forEach(videoId => {
        answeredQuizzes[videoId] = [];
      });
      
      saveQuizProgress();
      updateQuizStatus();
      
      // Show video to allow retaking quizzes
      const discussionSection = document.getElementById('Discussion');
      if (discussionSection && discussionSection.classList.contains('visible')) {
        const jsVideo = document.getElementById('modalVideo');
        const javaVideo = document.getElementById('modalVideo2');
        if (jsVideo) {
          jsVideo.currentTime = 0;
        }
        if (javaVideo) {
          javaVideo.currentTime = 0;
        }
      }
    });
  }
});