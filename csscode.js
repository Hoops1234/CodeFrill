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
  
    // PDF.js configuration
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
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

// Video Quiz Functionality
const videoQuizData = {
  'modalVideo': [
    { time: 17, question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language'], correct: 0, type: 'multiple' },
    { time: 30, question: 'Write the basic HTML structure with DOCTYPE, html, head, and body tags:', type: 'code', correctCode: '<!DOCTYPE html>\n<html>\n<head>\n<title>My Page</title>\n</head>\n<body>\n</body>\n</html>', hints: ['Start with <!DOCTYPE html>', 'Include <html>, <head>, and <body> tags', 'Add a <title> inside <head>'] },
    { time: 60, question: 'Write an HTML heading tag for the largest heading with text "Welcome":', type: 'code', correctCode: '<h1>Welcome</h1>', hints: ['Use the <h1> tag', 'Put the text between opening and closing tags'] }
  ],
  'modalVideo2': [
    // Multiple Choice Questions (6)
    { time: 20, question: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'], correct: 2, type: 'multiple' },
    { time: 45, question: 'Which CSS property is used to change the text color?', options: ['text-color', 'font-color', 'color', 'text-style'], correct: 2, type: 'multiple' },
    { time: 70, question: 'What is the correct CSS syntax to select an element with id "header"?', options: ['#header', '.header', 'header', '*header'], correct: 0, type: 'multiple' },
    { time: 100, question: 'Which property is used to change the background color?', options: ['bgcolor', 'background-color', 'color', 'background'], correct: 1, type: 'multiple' },
    { time: 130, question: 'How do you select elements with class "container"?', options: ['#container', '.container', 'container', '*container'], correct: 1, type: 'multiple' },
    { time: 160, question: 'Which CSS property controls the font size?', options: ['text-size', 'font-style', 'font-size', 'size'], correct: 2, type: 'multiple' },
    // Code Writing Questions (4)
    { time: 200, question: 'Write CSS to make all h1 elements have blue color:', type: 'code', correctCode: 'h1 { color: blue; }', hints: ['Use the h1 selector', 'Use the color property', 'End with semicolon and closing brace'] },
    { time: 240, question: 'Write CSS to give an element with class "box" a 10px padding:', type: 'code', correctCode: '.box { padding: 10px; }', hints: ['Start with dot for class selector', 'Use padding property', 'Include unit px'] },
    { time: 280, question: 'Write CSS to center text in an element with id "title":', type: 'code', correctCode: '#title { text-align: center; }', hints: ['Use # for id selector', 'Use text-align property', 'Set value to center'] },
    { time: 320, question: 'Write CSS to make the background color light gray for all paragraphs:', type: 'code', correctCode: 'p { background-color: lightgray; }', hints: ['Use p selector', 'Use background-color property', 'Use lightgray value'] }
  ]
};

let currentVideo = null;
let currentQuizIndex = 0;
let answeredQuizzes = {};  // Track which quizzes have been answered for each video
let quizResults = {};  // Track correct/incorrect: { videoId: { index: { answered: boolean, correct: boolean } } }

// Load saved quiz progress from localStorage
function loadQuizProgress() {
  const saved = localStorage.getItem('csscode-quiz-progress');
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
  localStorage.setItem('csscode-quiz-progress', JSON.stringify(data));
  
  // Update profile quiz results with aggregated CSS quiz score
  updateProfileQuizResults('CSS');
}

// Update the user profile's quizResults with HTML quiz score (when a video is completed)
function updateProfileQuizResults(subject) {
  // Determine current video ID
  const videoId = currentVideo ? currentVideo.id : null;
  if (!videoId) return; // no active video
  
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

  console.log('Profile quiz results updated - CSS video ' + videoId + ' score:', score + '%');
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

// Add timeupdate listeners to all videos
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

// Track pending skipped quizzes
let pendingSkippedQuizzes = [];
let currentVideoForQuiz = null;

// Update quiz status display
function updateQuizStatus() {
  const quizStatusList = document.getElementById('quizStatusList');
  const retakeQuizBtn = document.getElementById('retakeQuizBtn');
  
  if (!quizStatusList) return;
  
  let statusHtml = '';
  let totalQuizzes = 0;
  let answeredCount = 0;
  let correctCount = 0;
  
  // HTML Introduction video quizzes
  const video1Quizzes = videoQuizData['modalVideo'] || [];
  if (video1Quizzes.length > 0) {
    statusHtml += '<div class="video-quiz-status">';
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
  
  // CSS video quizzes
  const video2Quizzes = videoQuizData['modalVideo2'] || [];
  if (video2Quizzes.length > 0) {
    statusHtml += '<div class="video-quiz-status"><strong>CSS Quiz:</strong>';
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
    
    quizQuestion.textContent = `Quiz at ${Math.floor(quiz.time)}s: ${quiz.question}`;
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
  
  quizQuestion.textContent = `Quiz at ${Math.floor(quiz.time)}s: ${quiz.question}`;
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
        
        quizFeedback.textContent = '✗ Skipped! No code entered - marked as wrong.';
        quizFeedback.className = 'quiz-feedback incorrect';
        
        // Show correct answer
        const correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.className = 'correct-answer-display';
        correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong><pre>${escapeHtml(quiz.correctCode)}</pre>`;
        quizFeedback.appendChild(correctAnswerDiv);
        
        codeEditor.disabled = true;
        updateQuizStatus();
        
        setTimeout(() => {
          showSkippedQuiz(skippedIndex + 1);
        }, 3000);
        
        return;
      }
      
      // Validate code
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
        quizFeedback.textContent = '✓ Correct!';
        quizFeedback.className = 'quiz-feedback correct';
      } else {
        quizFeedback.textContent = '✗ Wrong!';
        quizFeedback.className = 'quiz-feedback incorrect';
        
        const correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.className = 'correct-answer-display';
        correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong><pre>${escapeHtml(quiz.correctCode)}</pre>`;
        quizFeedback.appendChild(correctAnswerDiv);
      }
      
      codeEditor.disabled = true;
      updateQuizStatus();
      
      setTimeout(() => {
        showSkippedQuiz(skippedIndex + 1);
      }, 3000);
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
      
      // Show first video to allow retaking quizzes
      const discussionSection = document.getElementById('Discussion');
      if (discussionSection && discussionSection.classList.contains('visible')) {
        const firstVideo = document.getElementById('modalVideo');
        if (firstVideo) {
          firstVideo.currentTime = 0;
        }
      }
    });
  }
});