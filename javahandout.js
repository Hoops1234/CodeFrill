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
        question: "Which keyword is used to inherit a class in Java?",
        options: ["extend", "implement", "inherit", "super"],
        answer: 0,
        explanation: "The keyword extend use when subclass wants to inherit from a superclass",
        
      },
      {
        question: "what is abstract class provides in java?",
        options: ["implementation", "contact", "subclass", "superclass"],
        answer: 1,
        explanation: "because it serves as a blueprint for other classes.",
        
      },
      {
        question: "Which Object method is often overridden to give a meaningful string of an object?",
        options: ["equal()", "hashcode()", "clone()", "toString()"],
        answer: 3,
        explanation: "toString is the correct answer because it’s a method from Java’s Object class that returns a string representation of an object.",
        
      },
      {
        question: "What happens when a method is called in Java in terms of the call stack?",
        options: ["The method is compiled and stored in the heap", "The method is stored in the permanent generation", "A new frame is pushed onto the call stack", "A new thread is created for the method"],
        answer: 2,
        explanation: "the call stack tracks method execution. Each frame holds the method’s parameters, local variables, and return address.",
        
      },
      {
        question: "Which is the following the example of reserved words in java?",
        options: ["chart, boolean, switch, import", "Class, public, static, void"],
        answer: 0,
        explanation: "the chart, boolean, switch, and import is cant be used as a variables and the Class, public, static is not part reserved variables",
        
      },
      {
        question: "Which of the following is considered a best practice for naming methods in Java?",
        options: ["Method names should start with a lowercase letter and use camelCase", "Method names should be all uppercase to emphasize importance", "Method names should start with a capital letter and use snake_case", "Method names should match the class name exactly"],
        answer: 0,
        explanation: "starting camelCase with a lowercase letter makes method names blend naturally into the flow of code, especially when calling them on objects.",
        
      },
      {
        question: "which is the following Java stands for?",
        options: ["A markup language used for designing web pages", "A scripting language used for styling HTML elements", "A database query language used for managing relational", "A high-level, object-oriented programming language designed to be platform-independent"],
        answer: 3,
        explanation: "A high-level, object-oriented programming language designed to be platform-independent helps you to easier write the code potentially",
        
      },
      {
        question: "Which of the following is a primitive data type in Java?",
        options: ["String", "integer", "array", "int"],
        answer: 3,
        explanation: "int is a type of primitive data types which means it's a basic building of data not an object.",
        
      },
      {
        question: "Which data type would you use to store a single character?",
        options: ["char", "bool", "chart", "double"],
        answer: 0,
        explanation: "char is the correct answer because it's a primitive data types designed to store a single character like A, E",
        
      },
      {
        question: "Which type is used to store true/false values?",
        options: ["boolean", "char", "float", "double"],
        answer: 0,
        explanation: "boolean is the correct answer because this primitive data type is designed to store values that are either true or false",
        
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
        detail: { score: percentage, totalQuestions: quizData.length, subject: 'Java' }
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
      localStorage.removeItem('quizResults-javahandout');

      // Enable quiz inputs
      enableQuizInputs();

      // Hide retake button
      hideRetakeButton();
    });
  }

  // Initialize retake button state
  hideRetakeButton();
});