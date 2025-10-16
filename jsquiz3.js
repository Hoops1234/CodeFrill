// AI JavaScript Operators Quiz Generator
class JavaScriptOperatorsQuizGenerator {
    constructor() {
        this.questionBank = this.initializeQuestionBank();
        this.currentQuiz = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.quizStartTime = null;
        this.selectedQuestionTypes = ['multipleChoice', 'fillBlanks', 'identification'];
        this.difficultyLevel = 'beginner';
        this.questionCount = 10;
        this.progressGraph = null;

        this.initializeEventListeners();
        this.initializeProgressGraph();
    }

    initializeQuestionBank() {
        return {
            multipleChoice: [
                {
                    question: "Which keyword is used to declare a variable in JavaScript?",
                    options: [
                        "var",
                        "variable",
                        "v",
                        "declare"
                    ],
                    correct: 0,
                    explanation: "The 'var' keyword is used to declare variables in JavaScript.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the correct way to declare a constant variable?",
                    options: [
                        "const myVar = 'hello';",
                        "constant myVar = 'hello';",
                        "var myVar = 'hello';",
                        "let myVar = 'hello';"
                    ],
                    correct: 0,
                    explanation: "The 'const' keyword is used to declare constant variables that cannot be reassigned.",
                    difficulty: "beginner"
                },
                {
                    question: "Which variable declaration allows reassignment?",
                    options: [
                        "const",
                        "let",
                        "final",
                        "static"
                    ],
                    correct: 1,
                    explanation: "The 'let' keyword declares variables that can be reassigned, unlike 'const' which creates constants.",
                    difficulty: "beginner"
                },
                {
                    question: "What happens when you declare a variable without var, let, or const?",
                    options: [
                        "Syntax error",
                        "Creates a global variable",
                        "Creates a local variable",
                        "Reference error"
                    ],
                    correct: 1,
                    explanation: "Declaring a variable without var, let, or const creates a global variable, which is generally considered bad practice.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which scope does 'var' create?",
                    options: [
                        "Block scope",
                        "Function scope",
                        "Global scope",
                        "Module scope"
                    ],
                    correct: 1,
                    explanation: "Variables declared with 'var' have function scope, meaning they are accessible throughout the entire function.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is variable hoisting?",
                    options: [
                        "Variables being moved to the top of their scope",
                        "Variables being deleted automatically",
                        "Variables being converted to constants",
                        "Variables being moved between functions"
                    ],
                    correct: 0,
                    explanation: "Variable hoisting is when variable declarations are moved to the top of their scope during compilation.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which declaration method was introduced in ES6?",
                    options: [
                        "var",
                        "const and let",
                        "function",
                        "class"
                    ],
                    correct: 1,
                    explanation: "The 'const' and 'let' keywords were introduced in ES6 (ECMAScript 2015) for better variable scoping.",
                    difficulty: "intermediate"
                },
                {
                    question: "What happens when you try to access an undeclared variable?",
                    options: [
                        "Returns null",
                        "Returns undefined",
                        "Throws ReferenceError",
                        "Creates the variable"
                    ],
                    correct: 2,
                    explanation: "Accessing an undeclared variable throws a ReferenceError in JavaScript.",
                    difficulty: "beginner"
                },
                {
                    question: "Which variable type is block-scoped?",
                    options: [
                        "var",
                        "let and const",
                        "function",
                        "global"
                    ],
                    correct: 1,
                    explanation: "Variables declared with 'let' and 'const' are block-scoped, meaning they exist only within the block they were declared in.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the Temporal Dead Zone?",
                    options: [
                        "A period where variables don't exist",
                        "A zone where time travel is possible",
                        "A debugging tool",
                        "A memory management technique"
                    ],
                    correct: 0,
                    explanation: "The Temporal Dead Zone is the period between entering a scope and when a 'let' or 'const' variable is declared, during which the variable cannot be accessed.",
                    difficulty: "advanced"
                },
                {
                    question: "Which statement about variable naming is correct?",
                    options: [
                        "Variables can start with numbers",
                        "Variables can contain spaces",
                        "Variables are case-sensitive",
                        "Variables can use reserved keywords"
                    ],
                    correct: 2,
                    explanation: "JavaScript variables are case-sensitive, meaning 'myVar' and 'myvar' are different variables.",
                    difficulty: "beginner"
                },
                {
                    question: "What happens to 'var' variables in a loop?",
                    options: [
                        "Each iteration gets its own variable",
                        "All iterations share the same variable",
                        "Variables are automatically deleted",
                        "An error is thrown"
                    ],
                    correct: 1,
                    explanation: "Variables declared with 'var' in a loop are shared across all iterations, which can lead to unexpected behavior.",
                    difficulty: "intermediate"
                }
            ],
            fillBlanks: [
                {
                    question: "The ________ keyword is used to declare a variable that can be reassigned.",
                    answer: "let",
                    explanation: "The 'let' keyword declares a variable that can be reassigned to a different value later in the code.",
                    difficulty: "beginner"
                },
                {
                    question: "The ________ keyword creates a constant variable that cannot be reassigned.",
                    answer: "const",
                    explanation: "The 'const' keyword declares a constant variable whose value cannot be changed after initialization.",
                    difficulty: "beginner"
                },
                {
                    question: "Variables declared with ________ have function scope in JavaScript.",
                    answer: "var",
                    explanation: "Variables declared with 'var' are function-scoped, meaning they exist throughout the entire function.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ is the area of code where a variable can be accessed.",
                    answer: "scope",
                    explanation: "Scope determines where variables, functions, and objects are accessible in your code.",
                    difficulty: "beginner"
                },
                {
                    question: "JavaScript variables are ________, meaning 'myVar' and 'myvar' are different.",
                    answer: "case-sensitive",
                    explanation: "JavaScript is case-sensitive, so variable names with different cases are treated as different variables.",
                    difficulty: "beginner"
                },
                {
                    question: "The ________ is when variable declarations are moved to the top of their scope.",
                    answer: "hoisting",
                    explanation: "Hoisting is a JavaScript mechanism where variable declarations are moved to the top of their scope during compilation.",
                    difficulty: "intermediate"
                },
                {
                    question: "Variables declared with ________ and ________ are block-scoped.",
                    answer: "let, const",
                    explanation: "Both 'let' and 'const' declarations are block-scoped, existing only within the block where they were declared.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ occurs when trying to access a 'let' or 'const' variable before its declaration.",
                    answer: "Temporal Dead Zone",
                    explanation: "The Temporal Dead Zone is the period from the start of the block until the variable declaration is encountered.",
                    difficulty: "advanced"
                }
            ],
            identification: [
                {
                    question: "What keyword would you use to declare a variable that won't be reassigned in JavaScript?",
                    answer: "const",
                    explanation: "The 'const' keyword declares a read-only constant that must be initialized and cannot be reassigned.",
                    difficulty: "beginner"
                },
                {
                    question: "What scope do variables declared with 'let' and 'const' have?",
                    answer: "block scope",
                    explanation: "Variables declared with 'let' and 'const' have block scope, meaning they exist only within the block they were declared in.",
                    difficulty: "intermediate"
                },
                {
                    question: "What happens when you try to reassign a 'const' variable?",
                    answer: "TypeError",
                    explanation: "Attempting to reassign a 'const' variable throws a TypeError in JavaScript.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the process called when variable declarations are moved to the top of their scope?",
                    answer: "hoisting",
                    explanation: "Hoisting is when the JavaScript engine moves variable declarations to the top of their scope during compilation.",
                    difficulty: "intermediate"
                },
                {
                    question: "What zone exists for 'let' and 'const' variables before their declaration in a block?",
                    answer: "Temporal Dead Zone",
                    explanation: "The Temporal Dead Zone is the period from the start of the block until the 'let' or 'const' variable declaration is encountered.",
                    difficulty: "advanced"
                },
                {
                    question: "What error is thrown when trying to access a variable that hasn't been declared?",
                    answer: "ReferenceError",
                    explanation: "A ReferenceError is thrown when trying to access a variable that doesn't exist in the current scope.",
                    difficulty: "beginner"
                },
                {
                    question: "What feature was introduced in ES6 for better variable scoping?",
                    answer: "let and const",
                    explanation: "ES6 introduced 'let' and 'const' declarations to provide block scoping and prevent common variable-related bugs.",
                    difficulty: "intermediate"
                },
                {
                    question: "What happens to 'var' variables declared in the global scope?",
                    answer: "become global properties",
                    explanation: "Variables declared with 'var' in the global scope become properties of the global object (window in browsers).",
                    difficulty: "intermediate"
                }
            ]
        };
    }

    initializeEventListeners() {
        const generateBtn = document.getElementById('generateQuiz');
        const nextBtn = document.getElementById('nextQuestion');
        const prevBtn = document.getElementById('prevQuestion');
        const submitBtn = document.getElementById('submitQuiz');
        const retakeBtn = document.getElementById('retakeQuiz');
        const newQuizBtn = document.getElementById('newQuiz');
        const toggleGraphBtn = document.getElementById('toggleGraph');

        if (generateBtn) generateBtn.addEventListener('click', () => this.generateQuiz());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousQuestion());
        if (submitBtn) submitBtn.addEventListener('click', () => this.submitQuiz());
        if (retakeBtn) retakeBtn.addEventListener('click', () => this.retakeQuiz());
        if (newQuizBtn) newQuizBtn.addEventListener('click', () => this.generateNewQuiz());
        if (toggleGraphBtn) toggleGraphBtn.addEventListener('click', () => this.toggleProgressGraph());
    }

    initializeProgressGraph() {
        // Initialize progress graph component
        this.progressGraph = new QuizProgressGraph('progressGraphContainer');
    }

    toggleProgressGraph() {
        const graphContainer = document.getElementById('progressGraphContainer');
        const toggleBtn = document.getElementById('toggleGraph');

        if (graphContainer.style.display === 'none' || !graphContainer.style.display) {
            this.progressGraph.show();
            toggleBtn.textContent = 'Hide Progress Graph';
            toggleBtn.classList.remove('btn-secondary');
            toggleBtn.classList.add('btn-primary');
        } else {
            this.progressGraph.hide();
            toggleBtn.textContent = 'Show Progress Graph';
            toggleBtn.classList.remove('btn-primary');
            toggleBtn.classList.add('btn-secondary');
        }
    }

    generateQuiz() {
        // Get user preferences
        this.questionCount = parseInt(document.getElementById('questionCount').value);
        this.difficultyLevel = document.getElementById('difficulty').value;

        // Get selected question types
        this.selectedQuestionTypes = [];
        if (document.getElementById('multipleChoice').checked) this.selectedQuestionTypes.push('multipleChoice');
        if (document.getElementById('fillBlanks').checked) this.selectedQuestionTypes.push('fillBlanks');
        if (document.getElementById('identification').checked) this.selectedQuestionTypes.push('identification');

        if (this.selectedQuestionTypes.length === 0) {
            alert('Please select at least one question type.');
            return;
        }

        // Generate quiz questions
        this.currentQuiz = this.generateQuestions();
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.quizStartTime = new Date();

        // Show quiz area
        document.querySelector('.quiz-setup').style.display = 'none';
        document.getElementById('quizArea').style.display = 'block';

        this.displayQuestion();
    }

    generateQuestions() {
        const questions = [];
        const questionsPerType = Math.floor(this.questionCount / this.selectedQuestionTypes.length);
        const remainder = this.questionCount % this.selectedQuestionTypes.length;

        this.selectedQuestionTypes.forEach((type, index) => {
            const typeQuestions = this.questionBank[type].filter(q => q.difficulty === this.difficultyLevel);
            const count = questionsPerType + (index < remainder ? 1 : 0);

            // If we don't have enough questions of this type and difficulty, use all available
            const availableQuestions = typeQuestions.length > 0 ? typeQuestions : this.questionBank[type];

            // Randomly select questions
            const selectedQuestions = this.shuffleArray(availableQuestions).slice(0, Math.min(count, availableQuestions.length));

            questions.push(...selectedQuestions.map(q => ({ ...q, type })));
        });

        return this.shuffleArray(questions);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    displayQuestion() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        if (!question) return;

        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.currentQuiz.length) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('totalQuestions').textContent = this.currentQuiz.length;

        // Update question display
        document.getElementById('qNumber').textContent = this.currentQuestionIndex + 1;
        document.getElementById('questionText').textContent = question.question;

        // Update question type display
        const typeDisplay = {
            multipleChoice: 'Multiple Choice',
            fillBlanks: 'Fill in the Blanks',
            identification: 'Identification'
        };
        document.getElementById('qType').textContent = typeDisplay[question.type];

        // Show/hide containers based on question type
        const optionsContainer = document.getElementById('optionsContainer');
        const inputContainer = document.getElementById('inputContainer');

        if (question.type === 'multipleChoice') {
            this.displayMultipleChoice(question, optionsContainer, inputContainer);
        } else {
            this.displayTextInput(question, optionsContainer, inputContainer);
        }

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    displayMultipleChoice(question, optionsContainer, inputContainer) {
        optionsContainer.style.display = 'block';
        inputContainer.style.display = 'none';

        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.innerHTML = `
                <input type="radio" name="answer" value="${index}" id="option${index}">
                <label for="option${index}" class="option-label">${option}</label>
            `;

            // Check if this was the user's previous answer
            if (this.userAnswers[this.currentQuestionIndex] === index.toString()) {
                optionDiv.querySelector('input[type="radio"]').checked = true;
            }

            optionDiv.addEventListener('click', () => {
                this.userAnswers[this.currentQuestionIndex] = index.toString();
                // Remove previous selection styling
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                // Add selection styling
                optionDiv.classList.add('selected');
            });

            optionsContainer.appendChild(optionDiv);
        });
    }

    displayTextInput(question, optionsContainer, inputContainer) {
        optionsContainer.style.display = 'none';
        inputContainer.style.display = 'block';

        const userInput = document.getElementById('userInput');
        userInput.value = this.userAnswers[this.currentQuestionIndex] || '';

        // Add event listener for input changes
        userInput.oninput = () => {
            this.userAnswers[this.currentQuestionIndex] = userInput.value.trim();
        };
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevQuestion');
        const nextBtn = document.getElementById('nextQuestion');
        const submitBtn = document.getElementById('submitQuiz');

        prevBtn.style.display = this.currentQuestionIndex > 0 ? 'block' : 'none';

        if (this.currentQuestionIndex === this.currentQuiz.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuiz.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    submitQuiz() {
        const unanswered = this.userAnswers.length < this.currentQuiz.length ||
                          this.userAnswers.some(answer => answer === undefined || answer === '');

        if (unanswered) {
            const confirmSubmit = confirm('You have unanswered questions. Do you want to submit anyway?');
            if (!confirmSubmit) return;
        }

        this.showResults();
    }

    showResults() {
        document.getElementById('quizArea').style.display = 'none';
        document.getElementById('resultsArea').style.display = 'block';

        let correctAnswers = 0;
        const reviewContainer = document.getElementById('reviewContainer');
        reviewContainer.innerHTML = '';

        this.currentQuiz.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = this.checkAnswer(question, userAnswer);

            if (isCorrect) correctAnswers++;

            const reviewItem = document.createElement('div');
            reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;

            let answerDisplay = '';
            if (question.type === 'multipleChoice') {
                answerDisplay = `Your answer: ${question.options[parseInt(userAnswer)] || 'No answer'}<br>Correct answer: ${question.options[question.correct]}`;
            } else {
                answerDisplay = `Your answer: ${userAnswer || 'No answer'}<br>Correct answer: ${question.answer}`;
            }

            reviewItem.innerHTML = `
                <div class="review-question">${question.question}</div>
                <div class="review-answer">${answerDisplay}</div>
                <div class="review-explanation">${question.explanation}</div>
            `;

            reviewContainer.appendChild(reviewItem);
        });

        // Calculate and display score
        const score = Math.round((correctAnswers / this.currentQuiz.length) * 100);
        const timeTaken = this.calculateTimeTaken();
        const timeTakenMinutes = Math.floor(parseInt(timeTaken.split(':')[0]) * 60 + parseInt(timeTaken.split(':')[1])) / 60;

        // Get existing results for improvement calculation
        const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
        const previousScores = existingResults.map(result => result.score).slice(0, -1); // Exclude current score

        // Calculate skill improvement and study hours
        const skillImprovement = this.calculateSkillImprovement(score, previousScores);
        const studyHours = this.calculateStudyHours(correctAnswers, this.currentQuiz.length, timeTakenMinutes, this.difficultyLevel);

        // Update display elements
        document.getElementById('skillLevel').textContent = skillImprovement.skillLevel;
        document.getElementById('skillTrend').textContent = skillImprovement.trend;
        document.getElementById('scoreImprovement').textContent = `${skillImprovement.improvement > 0 ? '+' : ''}${skillImprovement.improvement}%`;
        document.getElementById('studyEfficiency').textContent = `${studyHours.efficiency}%`;
        document.getElementById('actualHours').textContent = `${studyHours.actualHours}h`;
        document.getElementById('recommendedHours').textContent = `${studyHours.recommendedHours}h`;
        document.getElementById('correctAnswers').textContent = correctAnswers;
        document.getElementById('totalQuestionsResult').textContent = this.currentQuiz.length;
        document.getElementById('timeTaken').textContent = timeTaken;

        // Update skill level badge color
        const skillBadge = document.getElementById('skillLevel');
        skillBadge.className = `skill-badge ${skillImprovement.skillLevel.toLowerCase()}`;

        // Update improvement indicator color
        const improvementElement = document.getElementById('scoreImprovement');
        if (skillImprovement.improvement > 0) {
            improvementElement.style.color = '#27ae60';
        } else if (skillImprovement.improvement < 0) {
            improvementElement.style.color = '#e74c3c';
        } else {
            improvementElement.style.color = '#95a5a6';
        }

        // Save quiz results to localStorage
        this.saveQuizResults(score, correctAnswers, this.currentQuiz.length, timeTaken);

        // Update progress graph with new data
        if (this.progressGraph) {
            this.progressGraph.updateChart();
        }

        // Notify user profile to refresh chart if function is available
        if (window.refreshProgressChart) {
            console.log('Notifying user profile to refresh chart...');
            window.refreshProgressChart();
        } else {
            // Store a flag to refresh chart when user profile loads
            localStorage.setItem('refreshChart', 'true');
        }
    }

    checkAnswer(question, userAnswer) {
        if (question.type === 'multipleChoice') {
            return parseInt(userAnswer) === question.correct;
        } else {
            // For text answers, do case-insensitive comparison
            return userAnswer && userAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim();
        }
    }

    calculateTimeTaken() {
        if (!this.quizStartTime) return '0:00';

        const now = new Date();
        const diff = Math.floor((now - this.quizStartTime) / 1000);
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    calculateSkillImprovement(currentScore, previousScores) {
        if (previousScores.length === 0) {
            return {
                improvement: 0,
                trend: 'First attempt',
                skillLevel: this.getSkillLevel(currentScore)
            };
        }

        const recentScores = previousScores.slice(-5); // Last 5 attempts
        const averagePrevious = recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length;
        const improvement = currentScore - averagePrevious;

        let trend = 'Stable';
        if (improvement > 10) trend = 'Improving significantly';
        else if (improvement > 5) trend = 'Improving';
        else if (improvement < -10) trend = 'Declining';
        else if (improvement < -5) trend = 'Needs improvement';

        return {
            improvement: Math.round(improvement),
            trend: trend,
            skillLevel: this.getSkillLevel(currentScore)
        };
    }

    getSkillLevel(score) {
        if (score >= 90) return 'Expert';
        if (score >= 80) return 'Advanced';
        if (score >= 70) return 'Intermediate';
        if (score >= 60) return 'Beginner';
        return 'Novice';
    }

    calculateStudyHours(correctAnswers, totalQuestions, timeTakenMinutes, difficulty) {
        // Base study hours calculation
        const accuracyRate = correctAnswers / totalQuestions;
        const baseHours = timeTakenMinutes / 60; // Convert minutes to hours

        // Adjust based on performance and difficulty
        let efficiencyMultiplier = 1;
        if (accuracyRate >= 0.9) efficiencyMultiplier = 1.5; // High performers study more efficiently
        else if (accuracyRate >= 0.7) efficiencyMultiplier = 1.2;
        else if (accuracyRate < 0.5) efficiencyMultiplier = 0.8; // Need more study time for low performance

        // Difficulty adjustment
        const difficultyMultiplier = {
            'beginner': 0.8,
            'intermediate': 1.0,
            'advanced': 1.3
        };

        const adjustedHours = baseHours * efficiencyMultiplier * difficultyMultiplier[difficulty];

        // Calculate recommended study hours for next session
        const recommendedHours = this.calculateRecommendedStudyHours(accuracyRate, difficulty);

        return {
            actualHours: Math.round(adjustedHours * 100) / 100,
            recommendedHours: recommendedHours,
            efficiency: Math.round((accuracyRate * 100) / (timeTakenMinutes / 10)) // Efficiency score
        };
    }

    calculateRecommendedStudyHours(accuracyRate, difficulty) {
        let baseHours = 1; // Base 1 hour

        // Adjust based on performance
        if (accuracyRate < 0.6) baseHours = 2; // Need more study time
        else if (accuracyRate > 0.8) baseHours = 0.5; // Can study less, already performing well

        // Difficulty adjustment
        const difficultyMultiplier = {
            'beginner': 0.8,
            'intermediate': 1.0,
            'advanced': 1.5
        };

        return Math.round((baseHours * difficultyMultiplier[difficulty]) * 100) / 100;
    }

    saveQuizResults(score, correctAnswers, totalQuestions, timeTaken) {
        const timeTakenMinutes = Math.floor(parseInt(timeTaken.split(':')[0]) * 60 + parseInt(timeTaken.split(':')[1])) / 60;

        const quizResult = {
            subject: 'JavaScript',
            score: score,
            correctAnswers: correctAnswers,
            totalQuestions: totalQuestions,
            timeTaken: timeTaken,
            timeTakenMinutes: timeTakenMinutes,
            difficulty: this.difficultyLevel,
            questionTypes: this.selectedQuestionTypes,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };

        // Get existing quiz results from localStorage
        const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]');

        // Add new result
        existingResults.push(quizResult);

        // Keep only last 50 results to prevent localStorage from getting too large
        const recentResults = existingResults.slice(-50);

        // Save back to localStorage
        localStorage.setItem('quizResults', JSON.stringify(recentResults));

        // Also save latest score for quick access
        localStorage.setItem('latestQuizScore', JSON.stringify({
            subject: 'JavaScript',
            score: score,
            date: quizResult.date
        }));
    }

    retakeQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];

        document.getElementById('resultsArea').style.display = 'none';
        document.getElementById('quizArea').style.display = 'block';

        this.displayQuestion();
    }

    generateNewQuiz() {
        document.getElementById('resultsArea').style.display = 'none';
        document.querySelector('.quiz-setup').style.display = 'block';

        // Reset quiz data
        this.currentQuiz = [];
        this.userAnswers = [];
    }
}

// Initialize the quiz generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.quizGenerator = new JavaScriptOperatorsQuizGenerator();
});