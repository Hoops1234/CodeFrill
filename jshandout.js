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

const quizData = [
      {
        question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
        options: ["function", "var", "let", "const"],
        answer: 2,
        explanation: "The let keyword declares a block-scoped variable, unlike var which is function-scoped.",
        
      },
      {
        question: "What will happen if you try to reassign a const variable?",
        options: ["It will convert to let", "It will throw a TypeError", "It will overwrite the value", "It will silently fail"],
        answer: 1,
        explanation: "Reassigning a const variable throws a TypeError because const variables are immutable.",
        
      },
      {
        question: "Which of the following is true about var declarations?",
        options: ["They are only available in strict mode", "They are block-scoped", "They are hoisted and initialized to undefined", "They cannot be reassigned"],
        answer: 2,
        explanation: "var declarations are hoisted and initialized to undefined, and they are function-scoped.",
        
      },
      {
        question: "What is the output of: console.log(x); let x = 5;",
        options: ["undefined", "null", "ReferenceError", "5"],
        answer: 2,
        explanation: "Accessing a let variable before declaration results in a ReferenceError due to the temporal dead zone.",
        
      },
      {
        question: "Which keyword should you use to declare a variable that won’t change?",
        options: ["let", "const", "static", "var"],
        answer: 1,
        explanation: "Use const to declare variables that should not be reassigned.",
        
      },
      {
        question: "What is the scope of a variable declared with var inside a function?",
        options: ["Global", "Block", "Function", "Module"],
        answer: 2,
        explanation: "var is function-scoped, meaning it is accessible throughout the function in which it is declared.",
        
      },
      {
        question: "Which of the following is NOT a valid variable name in JavaScript?",
        options: ["myVar2", "2ndVar", "$value", "_myVar"],
        answer: 1,
        explanation: "Variable names cannot start with a digit, so 2ndVar is invalid.",
        
      },
      {
        question: "What does hoisting mean in JavaScript?",
        options: ["Variables are made immutable", "Variables are copied to global scope", "Variables are deleted after execution", "Variables are moved to the top of their scope"],
        answer: 3,
        explanation: "Hoisting moves variable and function declarations to the top of their scope before code execution.",
        
      },
      {
        question: "Which of the following is true about the temporal dead zone?",
        options: ["It is a runtime error", "It allows access to variables before declaration", "It affects var declarations", "It applies to let and const"],
        answer: 3,
        explanation: "The temporal dead zone applies to let and const, preventing access before declaration.",
        
      },
      {
        question: "What is the default value of an uninitialized var variable?",
        options: ["false", "null", "undefined", "0"],
        answer: 2,
        explanation: "Uninitialized var variables are hoisted and set to undefined by default.",
        
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
        detail: { score: percentage, totalQuestions: quizData.length, subject: 'JavaScript' }
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