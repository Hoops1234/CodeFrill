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
                    question: "Which operator is used for exponentiation in JavaScript?",
                    options: [
                        "^",
                        "**",
                        "exp",
                        "pow"
                    ],
                    correct: 1,
                    explanation: "The ** operator is used for exponentiation in JavaScript (e.g., 2 ** 3 = 8).",
                    difficulty: "beginner"
                },
                {
                    question: "What does the '===' operator do?",
                    options: [
                        "Assigns a value to a variable",
                        "Compares values only",
                        "Compares both value and type",
                        "Creates a new variable"
                    ],
                    correct: 2,
                    explanation: "The '===' operator performs strict equality comparison, checking both value and type.",
                    difficulty: "beginner"
                },
                {
                    question: "Which operator is used to find the remainder of a division?",
                    options: [
                        "/",
                        "%",
                        "div",
                        "mod"
                    ],
                    correct: 1,
                    explanation: "The % operator is the modulo operator, used to find the remainder of a division.",
                    difficulty: "beginner"
                },
                {
                    question: "What does the '&&' operator do?",
                    options: [
                        "Logical OR",
                        "Logical AND",
                        "Bitwise AND",
                        "Nullish coalescing"
                    ],
                    correct: 1,
                    explanation: "The '&&' operator is the logical AND operator, returning true if both operands are truthy.",
                    difficulty: "beginner"
                },
                {
                    question: "Which operator checks if a property exists in an object?",
                    options: [
                        "exists",
                        "has",
                        "in",
                        "within"
                    ],
                    correct: 2,
                    explanation: "The 'in' operator checks if a property exists in an object or if an element exists in an array.",
                    difficulty: "intermediate"
                },
                {
                    question: "What does the '??' operator do?",
                    options: [
                        "Nullish coalescing",
                        "Optional chaining",
                        "Logical OR",
                        "Bitwise OR"
                    ],
                    correct: 0,
                    explanation: "The '??' operator is the nullish coalescing operator, returning the right operand when the left is null or undefined.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which operator is used for bitwise XOR?",
                    options: [
                        "&",
                        "|",
                        "^",
                        "~"
                    ],
                    correct: 2,
                    explanation: "The '^' operator performs bitwise XOR (exclusive OR) operation.",
                    difficulty: "intermediate"
                },
                {
                    question: "What does the 'typeof' operator return for null?",
                    options: [
                        "null",
                        "undefined",
                        "object",
                        "boolean"
                    ],
                    correct: 2,
                    explanation: "The 'typeof' operator returns 'object' for null, which is considered a bug in JavaScript.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which operator is used to delete a property from an object?",
                    options: [
                        "remove",
                        "delete",
                        "clear",
                        "unset"
                    ],
                    correct: 1,
                    explanation: "The 'delete' operator removes a property from an object.",
                    difficulty: "intermediate"
                },
                {
                    question: "What does the '?.' operator do?",
                    options: [
                        "Optional chaining",
                        "Nullish coalescing",
                        "Safe navigation",
                        "Conditional access"
                    ],
                    correct: 0,
                    explanation: "The '?.' operator is optional chaining, used to access properties that might be null or undefined.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which operator has higher precedence: multiplication (*) or addition (+)?",
                    options: [
                        "Multiplication has higher precedence",
                        "Addition has higher precedence",
                        "They have equal precedence",
                        "It depends on the context"
                    ],
                    correct: 0,
                    explanation: "Multiplication (*) has higher precedence than addition (+), following standard mathematical operator precedence.",
                    difficulty: "intermediate"
                },
                {
                    question: "What does the 'void' operator do?",
                    options: [
                        "Creates a void function",
                        "Evaluates expression and returns undefined",
                        "Creates an empty object",
                        "Deletes a variable"
                    ],
                    correct: 1,
                    explanation: "The 'void' operator evaluates an expression and returns undefined.",
                    difficulty: "advanced"
                },
                {
                    question: "Which operator is used for unsigned right shift?",
                    options: [
                        "<<",
                        ">>",
                        ">>>",
                        "^"
                    ],
                    correct: 2,
                    explanation: "The '>>>' operator performs unsigned (zero-fill) right shift operation.",
                    difficulty: "advanced"
                },
                {
                    question: "What does the 'instanceof' operator check?",
                    options: [
                        "If a value is an instance of a constructor",
                        "If a property exists in an object",
                        "If two values are equal",
                        "If a variable is defined"
                    ],
                    correct: 0,
                    explanation: "The 'instanceof' operator checks if an object is an instance of a particular constructor.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which operator is used for strict inequality?",
                    options: [
                        "!=",
                        "!==",
                        "<>",
                        "not="
                    ],
                    correct: 1,
                    explanation: "The '!==' operator performs strict inequality comparison, checking both value and type.",
                    difficulty: "beginner"
                }
            ],
            fillBlanks: [
                {
                    question: "The ________ operator is used for logical OR operations.",
                    answer: "||",
                    explanation: "The '||' operator performs logical OR operations, returning true if at least one operand is truthy.",
                    difficulty: "beginner"
                },
                {
                    question: "The ________ operator checks if a value is not equal to another (value only).",
                    answer: "!=",
                    explanation: "The '!=' operator performs loose inequality comparison, checking values only (not types).",
                    difficulty: "beginner"
                },
                {
                    question: "The ________ operator is used to combine expressions in a conditional statement.",
                    answer: "?:",
                    explanation: "The '?:' is the ternary operator, used as a shorthand for if-else statements.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ operator is used for bitwise AND operations.",
                    answer: "&",
                    explanation: "The '&' operator performs bitwise AND operations on integer operands.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ operator converts a value to a boolean and negates it.",
                    answer: "!",
                    explanation: "The '!' operator is the logical NOT operator, converting a value to boolean and negating it.",
                    difficulty: "beginner"
                },
                {
                    question: "The ________ operator is used for addition and string concatenation.",
                    answer: "+",
                    explanation: "The '+' operator performs addition for numbers and concatenation for strings.",
                    difficulty: "beginner"
                },
                {
                    question: "The ________ operator shifts bits to the left.",
                    answer: "<<",
                    explanation: "The '<<' operator performs left shift operation, equivalent to multiplying by 2 for each position.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ operator is used to access properties of potentially undefined objects safely.",
                    answer: "?.",
                    explanation: "The '?.' optional chaining operator allows safe access to nested object properties.",
                    difficulty: "intermediate"
                }
            ],
            identification: [
                {
                    question: "What operator would you use to check if 'apple' is in the array ['apple', 'banana', 'orange']?",
                    answer: "in",
                    explanation: "The 'in' operator can be used to check if an element exists in an array by index or if a property exists in an object.",
                    difficulty: "intermediate"
                },
                {
                    question: "What operator allows you to provide a default value when a variable is null or undefined?",
                    answer: "??",
                    explanation: "The nullish coalescing operator '??' returns the right operand when the left operand is null or undefined.",
                    difficulty: "intermediate"
                },
                {
                    question: "What operator is commonly used in loops to increment a counter by 1?",
                    answer: "++",
                    explanation: "The '++' operator increments a variable by 1 and is commonly used in for loops.",
                    difficulty: "beginner"
                },
                {
                    question: "What operator would you use to check if an object is an instance of the Array constructor?",
                    answer: "instanceof",
                    explanation: "The 'instanceof' operator checks if an object was created by a specific constructor function.",
                    difficulty: "intermediate"
                },
                {
                    question: "What operator is used to perform both comparison and assignment in one expression?",
                    answer: "?",
                    explanation: "The ternary operator '?' allows conditional expressions: condition ? trueValue : falseValue.",
                    difficulty: "intermediate"
                },
                {
                    question: "What operator is used to determine the type of a JavaScript value?",
                    answer: "typeof",
                    explanation: "The 'typeof' operator returns a string indicating the type of the operand.",
                    difficulty: "beginner"
                },
                {
                    question: "What bitwise operator flips all bits of a number?",
                    answer: "~",
                    explanation: "The bitwise NOT operator '~' inverts all bits of its operand.",
                    difficulty: "advanced"
                },
                {
                    question: "What operator is used to combine two values and assign the result to the first variable?",
                    answer: "+=",
                    explanation: "The '+=' operator adds the right operand to the left operand and assigns the result to the left operand.",
                    difficulty: "beginner"
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