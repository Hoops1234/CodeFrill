// Daily Question System - SQL Questions
const questions = [
  {
    id: 1,
    question: "What does SQL stand for?",
    answer: "structured query language",
    alternativeAnswers: ["structured query language", "sql", "structured query lang"],
    explanation: "SQL stands for Structured Query Language. It is the standard language for relational database management systems.",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which SQL statement is used to retrieve data from a database?",
    answer: "select",
    alternativeAnswers: ["select", "get", "fetch", "retrieve"],
    explanation: "The SELECT statement retrieves data from one or more tables in a database. It is the most commonly used SQL command.",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What is the correct syntax to select all columns from a table called 'customers'?",
    answer: "select * from customers",
    alternativeAnswers: ["select all from customers", "select * customers", "select all customers"],
    explanation: "SELECT * retrieves all columns. The FROM clause specifies which table to query. The table name follows FROM.",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which SQL clause filters records based on a condition?",
    answer: "where",
    alternativeAnswers: ["where", "filter", "having", "condition"],
    explanation: "The WHERE clause filters rows based on specified conditions. Only rows that meet the condition are returned.",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "How do you select only unique values from a column?",
    answer: "select distinct",
    alternativeAnswers: ["distinct", "unique", "select unique"],
    explanation: "DISTINCT eliminates duplicate rows from the result set, showing only unique values in the selected column(s).",
    difficulty: "easy"
  },
  {
    id: 6,
    question: "What keyword sorts the result set in ascending order?",
    answer: "order by asc",
    alternativeAnswers: ["order by", "order by asc", "sort asc", "asc"],
    explanation: "ORDER BY sorts results. ASC (ascending) is the default sort order. Use DESC for descending order.",
    difficulty: "easy"
  },
  {
    id: 7,
    question: "Which SQL statement inserts new data into a table?",
    answer: "insert into",
    alternativeAnswers: ["insert", "insert into", "add", "create"],
    explanation: "INSERT INTO adds new rows to a table. You specify the table, columns (optional), and values to insert.",
    difficulty: "easy"
  },
  {
    id: 8,
    question: "What SQL command modifies existing records in a table?",
    answer: "update",
    alternativeAnswers: ["update", "modify", "change", "alter"],
    explanation: "UPDATE modifies existing records. Always use a WHERE clause to specify which rows to update, or ALL rows will be changed.",
    difficulty: "easy"
  },
  {
    id: 9,
    question: "Which statement removes rows from a table?",
    answer: "delete from",
    alternativeAnswers: ["delete", "delete from", "remove", "truncate"],
    explanation: "DELETE FROM removes rows from a table. Use WHERE to specify which rows to delete; without WHERE, all rows are deleted.",
    difficulty: "easy"
  },
  {
    id: 10,
    question: "How do you limit the number of rows returned by a query?",
    answer: "limit",
    alternativeAnswers: ["limit", "top", "fetch first", "rownum"],
    explanation: "LIMIT restricts the number of rows returned. Useful with large datasets: SELECT * FROM table LIMIT 10 returns only 10 rows.",
    difficulty: "easy"
  },
  {
    id: 11,
    question: "What is a primary key in SQL?",
    answer: "a column that uniquely identifies each row in a table",
    alternativeAnswers: ["primary key", "unique identifier", "column that uniquely identifies each row"],
    explanation: "A PRIMARY KEY uniquely identifies each record in a table. It must contain unique, non-NULL values and only one per table.",
    difficulty: "medium"
  },
  {
    id: 12,
    question: "Which type of SQL JOIN returns only matching rows from both tables?",
    answer: "inner join",
    alternativeAnswers: ["inner join", "join"],
    explanation: "INNER JOIN returns only rows where there is a match in both tables. Rows without matches are excluded from both tables.",
    difficulty: "medium"
  },
  {
    id: 13,
    question: "What does the COUNT() function do?",
    answer: "counts the number of rows",
    alternativeAnswers: ["count rows", "count", "counts rows", "number of rows"],
    explanation: "COUNT() returns the number of rows that match a query. COUNT(*) counts all rows including NULLs. COUNT(column) counts non-NULL values only.",
    difficulty: "easy"
  },
  {
    id: 14,
    question: "Which aggregate function returns the average value of a numeric column?",
    answer: "avg",
    alternativeAnswers: ["avg", "average", "mean"],
    explanation: "AVG() calculates the average (mean) of a numeric column. It ignores NULL values in its calculation.",
    difficulty: "easy"
  },
  {
    id: 15,
    question: "What does GROUP BY do?",
    answer: "groups rows with the same values into summary rows",
    alternativeAnswers: ["groups rows", "group by", "aggregate rows"],
    explanation: "GROUP BY groups rows with identical values into summary rows. Often used with aggregate functions like COUNT, SUM, AVG.",
    difficulty: "medium"
  },
  {
    id: 16,
    question: "What is the purpose of the HAVING clause?",
    answer: "filters groups after grouping",
    alternativeAnswers: ["filter groups", "having", "filter after group by"],
    explanation: "HAVING filters groups after GROUP BY, similar to how WHERE filters rows before grouping. Used with aggregate conditions.",
    difficulty: "medium"
  },
  {
    id: 17,
    question: "Which SQL data type is used to store variable-length strings?",
    answer: "varchar",
    alternativeAnswers: ["varchar", "varchar2", "text", "string"],
    explanation: "VARCHAR(n) stores variable-length strings up to n characters. More space-efficient than fixed-length CHAR.",
    difficulty: "easy"
  },
  {
    id: 18,
    question: "What does the LIKE operator do?",
    answer: "searches for a pattern in a column",
    alternativeAnswers: ["pattern matching", "like", "wildcard search"],
    explanation: "LIKE is used for pattern matching with wildcards: % (any string) and _ (single char). Example: WHERE name LIKE 'J%' finds names starting with J.",
    difficulty: "easy"
  },
  {
    id: 19,
    question: "How do you select records where a column value is in a list of values?",
    answer: "where column in (values)",
    alternativeAnswers: ["in operator", "where in", "in clause"],
    explanation: "IN allows you to test if a value matches any value in a list: WHERE status IN ('active', 'pending')",
    difficulty: "easy"
  },
  {
    id: 20,
    question: "What is a foreign key?",
    answer: "a column that references a primary key in another table",
    alternativeAnswers: ["foreign key", "references another table", "link between tables"],
    explanation: "A FOREIGN KEY is a column that references the PRIMARY KEY of another table, establishing a relationship between the two tables.",
    difficulty: "medium"
  },
  {
    id: 21,
    question: "Which SQL statement creates a new table?",
    answer: "create table",
    alternativeAnswers: ["create table", "make table", "new table"],
    explanation: "CREATE TABLE defines a new table with specified columns, data types, and constraints. Table names must be unique within a database.",
    difficulty: "easy"
  },
  {
    id: 22,
    question: "What does the SUM() function return?",
    answer: "the total of all values in a column",
    alternativeAnswers: ["sum", "total", "sum of values"],
    explanation: "SUM() returns the total sum of a numeric column. Ignores NULL values. Commonly used with GROUP BY for group totals.",
    difficulty: "easy"
  },
  {
    id: 23,
    question: "Which SQL statement modifies a table's structure (add/drop columns)?",
    answer: "alter table",
    alternativeAnswers: ["alter table", "modify table", "change table"],
    explanation: "ALTER TABLE changes an existing table's structure: ADD COLUMN, DROP COLUMN, MODIFY column type, ADD/DROP constraints.",
    difficulty: "medium"
  },
  {
    id: 24,
    question: "What is the difference between DELETE and TRUNCATE?",
    answer: "delete removes rows one by one (can use where), truncate removes all rows quickly",
    alternativeAnswers: ["delete is row by row, truncate removes all", "truncate is faster", "delete can have where clause"],
    explanation: "DELETE removes rows individually (can use WHERE), fires triggers, can be rolled back. TRUNCATE removes ALL rows instantly, cannot use WHERE, minimal logging.",
    difficulty: "hard"
  },
  {
    id: 25,
    question: "What does the COALESCE function do?",
    answer: "returns the first non-null value from a list",
    alternativeAnswers: ["first non-null", "coalesce", "handle nulls"],
    explanation: "COALESCE returns the first non-NULL value among its arguments. Useful for replacing NULLs: COALESCE(column, 'default')",
    difficulty: "hard"
  },
  {
    id: 26,
    question: "What is a subquery (nested query)?",
    answer: "a query inside another sql statement",
    alternativeAnswers: ["query within query", "nested query", "subselect"],
    explanation: "A subquery is a SELECT statement nested inside another SQL statement (SELECT, INSERT, UPDATE, DELETE). Used for complex queries.",
    difficulty: "medium"
  },
  {
    id: 27,
    question: "Which JOIN type returns all rows from the left table and matched rows from the right?",
    answer: "left join",
    alternativeAnswers: ["left join", "left outer join"],
    explanation: "LEFT JOIN returns all rows from the left (first) table and matching rows from the right table. Unmatched right rows return NULLs.",
    difficulty: "medium"
  },
  {
    id: 28,
    question: "How do you create an index on a column?",
    answer: "create index",
    alternativeAnswers: ["create index", "add index", "index column"],
    explanation: "CREATE INDEX improves SELECT query performance on that column: CREATE INDEX idx_name ON table(column). But indexes slow down INSERT/UPDATE/DELETE.",
    difficulty: "medium"
  },
  {
    id: 29,
    question: "What does the CASE statement do?",
    answer: "provides if-then-else logic in sql queries",
    alternativeAnswers: ["if-then-else", "case statement", "conditional logic"],
    explanation: "CASE gives IF-THEN-ELSE logic in SQL: CASE WHEN condition THEN result ELSE other_result END. Used for conditional transformations.",
    difficulty: "hard"
  },
  {
    id: 30,
    question: "Which constraint ensures a column cannot have NULL values?",
    answer: "not null",
    alternativeAnswers: ["not null", "not null constraint", "required"],
    explanation: "NOT NULL constraint prohibits NULL values in a column. The column must always have a value when inserting or updating rows.",
    difficulty: "easy"
  },
  {
    id: 31,
    question: "What is the purpose of AUTO_INCREMENT (or IDENTITY)?",
    answer: "automatically generates unique numbers for a column",
    alternativeAnswers: ["auto increment", "auto increment", "identity", "serial"],
    explanation: "AUTO_INCREMENT (MySQL) / IDENTITY (SQL Server) / SERIAL (PostgreSQL) automatically generates sequential unique numbers, typically for primary keys.",
    difficulty: "easy"
  },
  {
    id: 32,
    question: "Which operator combines two or more conditions and returns true if ALL are true?",
    answer: "and",
    alternativeAnswers: ["and", "&&"],
    explanation: "AND combines conditions and requires ALL to be true. OR requires at least one condition to be true.",
    difficulty: "easy"
  },
  {
    id: 33,
    question: "What does UNION do in SQL?",
    answer: "combines results of two or more select statements",
    alternativeAnswers: ["union", "combine results", "merge queries"],
    explanation: "UNION combines results from multiple SELECT statements. It removes duplicates by default. Use UNION ALL to keep duplicates.",
    difficulty: "medium"
  },
  {
    id: 34,
    question: "Which statement is used to change the structure of an existing table?",
    answer: "alter table",
    alternativeAnswers: ["alter table", "modify table", "change table"],
    explanation: "ALTER TABLE is used to add, delete, or modify columns and constraints in an existing table.",
    difficulty: "easy"
  },
  {
    id: 35,
    question: "What is the default sorting order of ORDER BY?",
    answer: "ascending",
    alternativeAnswers: ["ascending", "asc", "a to z"],
    explanation: "ORDER BY defaults to ascending (ASC) order. Use ORDER BY column DESC for descending order.",
    difficulty: "easy"
  },
  {
    id: 36,
    question: "Which SQL keyword removes duplicate rows from a result set?",
    answer: "distinct",
    alternativeAnswers: ["distinct", "unique", "distinct keyword"],
    explanation: "DISTINCT is used with SELECT to eliminate duplicate rows and return only unique values.",
    difficulty: "easy"
  },
  {
    id: 37,
    question: "What is the result of SELECT COUNT(*) FROM table WHERE column IS NULL?",
    answer: "counts rows where column is null",
    alternativeAnswers: ["count nulls", "null count", "count rows with null"],
    explanation: "COUNT(*) counts rows including those where column IS NULL. COUNT(column) would exclude NULL values from the count.",
    difficulty: "medium"
  },
  {
    id: 38,
    question: "Which type of JOIN returns all rows when there is a match in either table?",
    answer: "full join",
    alternativeAnswers: ["full join", "full outer join"],
    explanation: "FULL JOIN (or FULL OUTER JOIN) returns all rows when there is a match in either the left or right table. Unmatched sides get NULLs.",
    difficulty: "medium"
  },
  {
    id: 39,
    question: "What does the BETWEEN operator do?",
    answer: "selects values within a range (inclusive)",
    alternativeAnswers: ["range", "between", "within range"],
    explanation: "BETWEEN selects values within a specified range, inclusive of both endpoints. Example: WHERE age BETWEEN 18 AND 65 includes 18 and 65.",
    difficulty: "easy"
  },
  {
    id: 40,
    question: "Which aggregate function returns the highest value in a column?",
    answer: "max",
    alternativeAnswers: ["max", "maximum", "highest"],
    explanation: "MAX() returns the maximum (highest) value in a column. It works with numeric, date, and string columns (alphabetical max for strings).",
    difficulty: "easy"
  }
];

// Daily Question Manager
class DailyQuestion {
  constructor() {
    this.currentQuestion = null;
    this.lastDate = null;
    this.loadStats();
  }

  // Get which question to show based on current date
  getQuestionForToday() {
    const today = new Date();
    const dayOfYear = this.getDayOfYear(today);
    return questions[dayOfYear % questions.length];
  }

  // Check if it's a new day
  isNewDay() {
    const today = new Date().toDateString();
    return this.lastDate !== today;
  }

  // Get day of year (1-366)
  getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  // Load saved statistics
  loadStats() {
    const saved = localStorage.getItem('dailyTaskStats');
    if (saved) {
      this.stats = JSON.parse(saved);
    } else {
      this.stats = {
        correct: 0,
        wrong: 0,
        total: 0,
        lastAttempt: null,
        lastCorrectDate: null,
        streak: 0,
        history: []
      };
    }
    this.calculateStreak();
  }

  // Calculate current streak
  calculateStreak() {
    if (!this.stats.lastCorrectDate) {
      this.stats.streak = 0;
      return;
    }
    
    const lastCorrect = new Date(this.stats.lastCorrectDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastCorrect.toDateString() === today.toDateString()) {
      this.stats.streak = this.stats.streak || 0;
    } else if (lastCorrect.toDateString() === yesterday.toDateString()) {
      this.stats.streak = this.stats.streak || 1;
    } else {
      this.stats.streak = 0;
    }
  }

  // Update statistics
  updateStats(isCorrect, userAnswer) {
    this.stats.total++;
    if (isCorrect) {
      this.stats.correct++;
      const today = new Date().toDateString();
      const lastCorrect = this.stats.lastCorrectDate ? new Date(this.stats.lastCorrectDate).toDateString() : null;
      if (lastCorrect !== today) {
        this.stats.lastCorrectDate = new Date().toISOString();
        this.calculateStreak();
      }
    } else {
      this.stats.wrong++;
    }
    this.stats.lastAttempt = new Date().toISOString();
    this.stats.history.push({
      date: new Date().toDateString(),
      questionId: this.currentQuestion.id,
      userAnswer,
      isCorrect,
      explanation: this.currentQuestion.explanation
    });
    if (this.stats.history.length > 30) {
      this.stats.history = this.stats.history.slice(-30);
    }
    this.saveStats();
  }

  // Initialize or reset daily question
  initDailyQuestion() {
    if (this.isNewDay()) {
      this.currentQuestion = this.getQuestionForToday();
      this.lastDate = new Date().toDateString();
      // Reset attempts for today
      this.todayAttempts = 0;
      this.maxAttemptsPerDay = 3;
    } else if (!this.currentQuestion) {
      this.currentQuestion = this.getQuestionForToday();
    }
    return this.currentQuestion;
  }

  // Check user answer
  checkAnswer(userAnswer) {
    const correct = this.normalizeAnswer(userAnswer) === this.normalizeAnswer(this.currentQuestion.answer);
    this.updateStats(correct, userAnswer);
    return {
      isCorrect: correct,
      correctAnswer: this.currentQuestion.answer,
      explanation: this.currentQuestion.explanation,
      attemptsLeft: this.maxAttemptsPerDay - (++this.todayAttempts)
    };
  }

  // Normalize answer for comparison
  normalizeAnswer(answer) {
    return answer.toLowerCase()
      .trim()
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ')     // Normalize whitespace
      .replace(/[^a-z0-9\s-]/g, '') // Keep letters, numbers, spaces, hyphens
      .replace(/\s+/g, ' ')     // Normalize whitespace again
      .trim();
  }

  // Get stats for display
  getStats() {
    return this.stats;
  }

  // Get attempt status
  getAttemptStatus() {
    return {
      attempts: this.todayAttempts,
      maxAttempts: this.maxAttemptsPerDay,
      canAttempt: this.todayAttempts < this.maxAttemptsPerDay
    };
  }
}

// Initialize global daily question manager
const dailyQuestionManager = new DailyQuestion();

// UI Controller
const DailyTaskUI = {
  elements: {
    questionText: document.getElementById('questionText'),
    userAnswer: document.getElementById('userAnswer'),
    submitBtn: document.getElementById('submitAnswer'),
    clearBtn: document.getElementById('clearAnswer'),
    correctCount: document.getElementById('correctCount'),
    wrongCount: document.getElementById('wrongCount'),
    totalCount: document.getElementById('totalCount'),
    previousAnswers: document.getElementById('previousAnswers'),
    taskTimer: document.getElementById('taskTimer'),
    answerSection: document.getElementById('answerSection'),
    attemptCount: document.getElementById('attemptCount'),
    attemptProgress: document.getElementById('attemptProgress')
  },

  init() {
    this.bindEvents();
    this.loadDailyQuestion();
    this.updateStatsDisplay();
    this.updateAttemptStatus();
    this.updatePreviousAnswers();
    this.updateDateDisplay();
  },

  bindEvents() {
    this.elements.submitBtn.addEventListener('click', () => this.submitAnswer());
    this.elements.clearBtn.addEventListener('click', () => this.clearAnswer());
    this.elements.userAnswer.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        this.submitAnswer();
      }
    });
  },

  loadDailyQuestion() {
    const question = dailyQuestionManager.initDailyQuestion();
    
    // Update question text with difficulty
    this.elements.questionText.textContent = question.question;
    const difficultyEl = document.getElementById('difficultyBadge');
    if (difficultyEl) {
      difficultyEl.textContent = question.difficulty;
      difficultyEl.className = `difficulty-badge difficulty-${question.difficulty}`;
    }
    
    this.elements.userAnswer.value = '';
    this.elements.userAnswer.disabled = false;
    this.elements.submitBtn.disabled = false;
    this.elements.userAnswer.focus();
    
    // Clear any existing feedback
    const existingFeedback = this.elements.answerSection.querySelector('.feedback-message');
    if (existingFeedback) existingFeedback.remove();
    this.elements.answerSection.classList.remove('success', 'error');
    
    this.updateAttemptStatus();
    this.updatePreviousAnswers();
    
    const attemptStatus = dailyQuestionManager.getAttemptStatus();
    if (!attemptStatus.canAttempt) {
      this.showAttemptsExhausted();
    }
  },

  submitAnswer() {
    const userAnswer = this.elements.userAnswer.value.trim();
    if (!userAnswer) {
      alert('Please enter an answer before submitting.');
      return;
    }

    // Clear any existing feedback
    const existingFeedback = this.elements.answerSection.querySelector('.feedback-message');
    if (existingFeedback) existingFeedback.remove();
    this.elements.answerSection.classList.remove('success', 'error');

    const result = dailyQuestionManager.checkAnswer(userAnswer);
    this.showResult(result);
    this.updateStatsDisplay();
    this.updateAttemptStatus();

    if (result.isCorrect) {
      this.elements.userAnswer.value = '';
      this.elements.userAnswer.disabled = true;
      this.elements.submitBtn.disabled = true;
      setTimeout(() => {
        this.loadDailyQuestion();
      }, 2500);
    } else if (dailyQuestionManager.getAttemptStatus().attempts >= dailyQuestionManager.maxAttemptsPerDay) {
      this.showAttemptsExhausted();
    } else {
      this.elements.userAnswer.value = '';
      this.elements.userAnswer.focus();
    }
  },

  showResult(result) {
    if (result.isCorrect) {
      this.showCorrectFeedback();
    } else {
      this.showIncorrectFeedback(result);
    }
  },

  showCorrectFeedback() {
    this.elements.answerSection.classList.add('success');
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-message correct';
    feedbackDiv.innerHTML = `
      <strong>✅ Correct Answer!</strong>
      <p>Excellent! You've mastered this concept.</p>
      <p style="margin-top: 8px; opacity: 0.8;">Loading next question...</p>
    `;
    this.elements.answerSection.appendChild(feedbackDiv);
  },

  showIncorrectFeedback(result) {
    this.elements.answerSection.classList.add('error');
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-message incorrect';
    feedbackDiv.innerHTML = `
      <strong>❌ Not Quite Right</strong>
      <p><span class="correct-answer-label">Correct answer: </span>
         <span class="correct-answer-value">${result.correctAnswer}</span></p>
      <p><strong>💡 Explanation:</strong> ${result.explanation}</p>
      <p class="attempts-left">Attempts remaining: <strong>${result.attemptsLeft}</strong></p>
    `;
    this.elements.answerSection.appendChild(feedbackDiv);
  },

  showAttemptsExhausted() {
    this.elements.userAnswer.disabled = true;
    this.elements.submitBtn.disabled = true;
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-message exhausted';
    feedbackDiv.innerHTML = `
      <strong>⏰ Daily Limit Reached</strong>
      <p>You've used all ${dailyQuestionManager.maxAttemptsPerDay} attempts for today.</p>
      <p>Come back tomorrow for a new question!</p>
      <p class="next-question">Next question in: <span id="countdown"> calculating... </span></p>
    `;
    this.elements.answerSection.appendChild(feedbackDiv);
    this.startCountdown();
  },

  startCountdown() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = tomorrow - now;
      if (diff <= 0) {
        clearInterval(this.countdownInterval);
        location.reload();
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const countdownEl = document.getElementById('countdown');
      if (countdownEl) {
        countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    this.countdownInterval = interval;
  },

  clearAnswer() {
    this.elements.userAnswer.value = '';
    const feedback = this.elements.answerSection.querySelector('.feedback-message');
    if (feedback) feedback.remove();
    this.elements.answerSection.classList.remove('success', 'error');
  },

  updateStatsDisplay() {
    const stats = dailyQuestionManager.getStats();
    this.elements.correctCount.textContent = stats.correct;
    this.elements.wrongCount.textContent = stats.wrong;
    this.elements.totalCount.textContent = stats.total;
    
    // Update streak in timer area
    const streakEl = document.getElementById('streakCount');
    if (streakEl) streakEl.textContent = stats.streak || 0;
  },

  updateAttemptStatus() {
    const status = dailyQuestionManager.getAttemptStatus();
    this.elements.attemptCount.textContent = `${status.attempts}/${status.maxAttempts}`;
    
    // Update progress dots
    if (this.elements.attemptProgress) {
      this.elements.attemptProgress.innerHTML = '';
      for (let i = 0; i < status.maxAttempts; i++) {
        const dot = document.createElement('span');
        dot.className = 'attempt-dot';
        if (i < status.attempts) {
          dot.classList.add('used');
        } else {
          dot.classList.add('remaining');
        }
        this.elements.attemptProgress.appendChild(dot);
      }
    }
  },

  updateDateDisplay() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) currentDateEl.textContent = dateStr;
    
    const streakEl = document.getElementById('streakCount');
    if (streakEl) streakEl.textContent = dailyQuestionManager.getStats().streak || 0;
  },

  updatePreviousAnswers() {
    const stats = dailyQuestionManager.getStats();
    const container = this.elements.previousAnswers;
    container.innerHTML = '';
    
    if (stats.history.length === 0) {
      container.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 20px;">No attempts yet. Start answering questions!</p>';
      return;
    }
    
    const recentHistory = stats.history.slice(-5).reverse();
    recentHistory.forEach(item => {
      const dateStr = new Date(item.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const itemEl = document.createElement('div');
      itemEl.className = `history-item ${item.isCorrect ? 'correct' : 'incorrect'}`;
      itemEl.innerHTML = `
        <div class="history-status">${item.isCorrect ? '✅' : '❌'}</div>
        <div class="history-answer">
          <strong>Q${item.questionId}:</strong> ${item.userAnswer || '<em>(empty)</em>'}
          <div class="history-question">${dateStr}</div>
        </div>
      `;
      container.appendChild(itemEl);
    });
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  DailyTaskUI.init();
});
