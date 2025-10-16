 // JavaScript for adding and deleting notes
  document.addEventListener('DOMContentLoaded', () => {
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


/*Test function*/

const quizData = [
      {
        question: "Which CSS selector targets all elements on a webpage?",
        options: ["element selector", "universal selector", "id selector", "class sellector"],
        answer: 1,
        explanation: "The Universal Selector, represented by an asterisk (*), targets all elements on the page. It is commonly used to reset default browser styles.",
        
      },
      {
        question: "What does the CSS rule p { font-size: 16px; } do?",
        options: ["sets the font size all paragraph to 16px", "sets font size of element with class 'p' to 16px", "sets the font size of a specific paragraphwith id 'p' to 16px", "sets the font size of all elements to 16px"],
        answer: 0,
        explanation: "The rule uses an Element Selector to target all <p> elements and sets their font size to 16px.",
        
      },
      {
        question: "Which selector would you use to style multiple elements with the same class?",
        options: ["class selector", "id selector", "universal selector", "element selector"],
        answer: 0,
        explanation: "The Class Selector, denoted by a period followed by the class name is used to apply styles to multiple elements sharing the same class.",
        
      },
      {
        question: "How is an ID Selector written in CSS?",
        options: ["idname", ".idname", "#idname", "*idname"],
        answer: 2,
        explanation: "An ID Selector is written using a hash symbol followed by the ID name It targets a unique element with that ID.",
        
      },
      {
        question: "Which is the following the example of reserved words in java?",
        options: ["chart, boolean, switch, import", "Class, public, static, void"],
        answer: 0,
        explanation: "the chart, boolean, switch, and import is cant be used as a variables and the Class, public, static is not part reserved variables",
        
      },
      {
        question: "What is a common use case for the Universal Selector in CSS?",
        options: ["targeting elements with a specific class", "applying consistent formatting to paragraph", "styling a navigation bar", "resetting default browser styles"],
        answer: 3,
        explanation: "The Universal Selector is often used to reset default browser styles by applying base styles to all elements.",
        
      },
      {
        question: "In a CSS declaration block, what separates the property from its value?",
        options: ["a comma", "a dash", "a colon", "a semicolon"],
        answer: 2,
        explanation: "In CSS, each declaration consists of a property and a value separated by a colon. For example, color: red; uses a colon to separate 'color' from 'red'.",
        
      },
      {
        question: "Which property would you use to adjust the size of text in CSS?",
        options: ["background-color", "padding", "font-size", "margin"],
        answer: 2,
        explanation: "The font-size property is used to set the size of the text in an element, such as font-size: 16px;.",
        
      },
      {
        question: "Which CSS property is used to change the background color of an element?",
        options: ["color", "background-color", "font-size", "padding"],
        answer: 1,
        explanation: "The background-color property in CSS is used to set the background color of an element, such as background-color: blue;.",
        
      },
      {
        question: "What does the CSS property margin control?",
        options: ["the space outside of an element", "the size of the text", "the space inside of an element", "the color of the element"],
        answer: 0,
        explanation: "The margin property in CSS controls the space outside an element, creating distance between the element and others around it.",
        
      }
    ];

    const quizForm = document.getElementById("quizForm");
  const resultsDiv = document.getElementById("results");

  if (quizForm) {
    quizData.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.innerHTML = `<h3>Q${index + 1}: ${q.question}</h3>`;
      q.options.forEach((opt, i) => {
        questionDiv.innerHTML += `
          <label>
            <input type="radio" name="q${index}" value="${i}">
            ${opt}
          </label>`;
      });
      quizForm.appendChild(questionDiv);
    });
  }

  const submitBtn = document.getElementById("submitBtn");
  const retakeBtn = document.getElementById("retakeBtn");

  function disableQuizInputs() {
    const inputs = quizForm.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => {
      input.disabled = true;
    });
  }

  function enableQuizInputs() {
    const inputs = quizForm.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => {
      input.disabled = false;
      input.checked = false; // Uncheck all radio buttons
    });
  }

  function showRetakeButton() {
    if (retakeBtn) {
      retakeBtn.style.display = 'block';
    }
  }

  function hideRetakeButton() {
    if (retakeBtn) {
      retakeBtn.style.display = 'none';
    }
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      let score = 0;
      let feedback = "";
      quizData.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
          const userAnswer = parseInt(selected.value);
          if (userAnswer === q.answer) {
            score++;
            feedback += `✅ Q${i + 1}: Correct! ${q.explanation}<br>`;
          } else {
            feedback += `❌ Q${i + 1}: Incorrect. ${q.explanation}<br>`;
          }
        } else {
          feedback += `⚠️ Q${i + 1}: No answer selected.<br>`;
        }
      });
      if (resultsDiv) {
        resultsDiv.innerHTML = `You scored ${score} out of ${quizData.length}.<br><br>${feedback}`;
      }

      // Save results to localStorage to persist across page interactions
      localStorage.setItem('quizResults-htmlhandout', resultsDiv ? resultsDiv.innerHTML : '');

      // Save score as percentage to localStorage
      let percentage = Math.round((score / quizData.length) * 100);
      let scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
      scores.push(percentage);
      localStorage.setItem('quizScores', JSON.stringify(scores));

      // Trigger custom event to notify other pages (like user profile) of new quiz score
      window.dispatchEvent(new CustomEvent('quizScoreUpdated', {
        detail: { score: percentage, totalQuestions: quizData.length, subject: 'CSS' }
      }));

      // Disable quiz inputs and show retake button after submission
      disableQuizInputs();
      showRetakeButton();
    });
  }

  if (retakeBtn) {
    retakeBtn.addEventListener("click", () => {
      // Clear results
      if (resultsDiv) {
        resultsDiv.innerHTML = '';
      }

      // Clear saved results from localStorage
      localStorage.removeItem('quizResults-htmlhandout');

      // Enable quiz inputs
      enableQuizInputs();

      // Hide retake button
      hideRetakeButton();
    });
  }

  // Initialize retake button state
  hideRetakeButton();
});