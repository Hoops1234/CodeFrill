// AI JavaScript Introduction Quiz Generator
class JavaScriptIntroQuizGenerator {
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
                    question: "What is JavaScript?",
                    options: [
                        "A markup language for web pages",
                        "A programming language that runs in web browsers",
                        "A styling language for websites",
                        "A database query language"
                    ],
                    correct: 1,
                    explanation: "JavaScript is a high-level programming language that runs primarily in web browsers to make web pages interactive.",
                    difficulty: "beginner"
                },
                {
                    question: "Who created JavaScript?",
                    options: [
                        "Guido van Rossum",
                        "Brendan Eich",
                        "James Gosling",
                        "Tim Berners-Lee"
                    ],
                    correct: 1,
                    explanation: "JavaScript was created by Brendan Eich in 1995 while he was working at Netscape Communications.",
                    difficulty: "beginner"
                },
                {
                    question: "In which year was JavaScript created?",
                    options: [
                        "1991",
                        "1995",
                        "2000",
                        "2005"
                    ],
                    correct: 1,
                    explanation: "JavaScript was created in 1995 by Brendan Eich at Netscape Communications.",
                    difficulty: "beginner"
                },
                {
                    question: "What was JavaScript originally called?",
                    options: [
                        "ECMAScript",
                        "LiveScript",
                        "NetScript",
                        "WebScript"
                    ],
                    correct: 1,
                    explanation: "JavaScript was originally named LiveScript before being renamed to JavaScript for marketing purposes.",
                    difficulty: "intermediate"
                },
                {
                    question: "Where does JavaScript typically run?",
                    options: [
                        "Only on web servers",
                        "Only in web browsers",
                        "In both web browsers and on web servers",
                        "Only in mobile applications"
                    ],
                    correct: 2,
                    explanation: "JavaScript can run both client-side (in browsers) and server-side (with Node.js) environments.",
                    difficulty: "beginner"
                },
                {
                    question: "What is ECMAScript?",
                    options: [
                        "A JavaScript framework",
                        "The standardized specification for JavaScript",
                        "A JavaScript library",
                        "A JavaScript IDE"
                    ],
                    correct: 1,
                    explanation: "ECMAScript is the standardized specification that JavaScript implementations follow.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which of the following is NOT a JavaScript engine?",
                    options: [
                        "V8",
                        "SpiderMonkey",
                        "JavaScriptCore",
                        "Python Engine"
                    ],
                    correct: 3,
                    explanation: "V8 (Chrome), SpiderMonkey (Firefox), and JavaScriptCore (Safari) are JavaScript engines, but Python Engine is not.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is Node.js?",
                    options: [
                        "A web browser",
                        "A JavaScript runtime for servers",
                        "A JavaScript framework",
                        "A database system"
                    ],
                    correct: 1,
                    explanation: "Node.js is a JavaScript runtime environment that allows JavaScript to run on servers outside of web browsers.",
                    difficulty: "beginner"
                },
                {
                    question: "Which company developed the V8 JavaScript engine?",
                    options: [
                        "Microsoft",
                        "Mozilla",
                        "Apple",
                        "Google"
                    ],
                    correct: 3,
                    explanation: "Google developed the V8 JavaScript engine, which is used in Chrome browser and Node.js.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the main purpose of JavaScript in web development?",
                    options: [
                        "To style web pages",
                        "To structure web page content",
                        "To add interactivity to web pages",
                        "To store data on servers"
                    ],
                    correct: 2,
                    explanation: "JavaScript's primary purpose in web development is to add interactivity and dynamic behavior to web pages.",
                    difficulty: "beginner"
                },
                {
                    question: "Which of the following is a characteristic of JavaScript?",
                    options: [
                        "Compiled language",
                        "Statically typed",
                        "Interpreted language",
                        "Assembly language"
                    ],
                    correct: 2,
                    explanation: "JavaScript is an interpreted, high-level programming language that is executed by JavaScript engines.",
                    difficulty: "intermediate"
                },
                {
                    question: "What does AJAX stand for in JavaScript context?",
                    options: [
                        "Asynchronous JavaScript and XML",
                        "Advanced JavaScript and XHTML",
                        "Automated JavaScript and XML",
                        "Active JavaScript and XHTML"
                    ],
                    correct: 0,
                    explanation: "AJAX stands for Asynchronous JavaScript and XML, enabling dynamic content updates without page reloads.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which of the following file extensions is commonly used for JavaScript files?",
                    options: [
                        ".js",
                        ".javascript",
                        ".jscript",
                        ".webjs"
                    ],
                    correct: 0,
                    explanation: "JavaScript files typically use the .js file extension.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the DOM in JavaScript?",
                    options: [
                        "Document Object Model - a programming interface for HTML documents",
                        "Data Object Manager - for handling databases",
                        "Dynamic Object Method - for creating objects",
                        "Document Oriented Module - for organizing code"
                    ],
                    correct: 0,
                    explanation: "DOM (Document Object Model) is a programming interface that represents HTML/XML documents as a tree structure.",
                    difficulty: "beginner"
                },
                {
                    question: "Which of the following best describes JavaScript's typing system?",
                    options: [
                        "Statically typed",
                        "Strongly typed",
                        "Dynamically typed",
                        "Strictly typed"
                    ],
                    correct: 2,
                    explanation: "JavaScript is dynamically typed, meaning variable types are determined at runtime.",
                    difficulty: "intermediate"
                }
            ],
            fillBlanks: [
                {
                    question: "JavaScript is primarily used for web page ________.",
                    answer: "interactivity",
                    explanation: "JavaScript adds interactivity and dynamic behavior to web pages.",
                    difficulty: "beginner"
                },
                {
                    question: "JavaScript runs in the ________ environment of web browsers.",
                    answer: "client-side",
                    explanation: "JavaScript typically runs on the client-side (user's browser) rather than server-side.",
                    difficulty: "beginner"
                },
                {
                    question: "The V8 JavaScript engine was developed by ________.",
                    answer: "Google",
                    explanation: "Google developed the V8 engine which powers Chrome browser and Node.js.",
                    difficulty: "intermediate"
                },
                {
                    question: "JavaScript is an ________ programming language.",
                    answer: "interpreted",
                    explanation: "JavaScript is interpreted, meaning it's executed line by line by the JavaScript engine.",
                    difficulty: "intermediate"
                },
                {
                    question: "The DOM stands for Document ________ Model.",
                    answer: "Object",
                    explanation: "DOM (Document Object Model) represents HTML documents as programmable objects.",
                    difficulty: "beginner"
                },
                {
                    question: "JavaScript was created at ________ Communications.",
                    answer: "Netscape",
                    explanation: "JavaScript was developed at Netscape Communications in 1995.",
                    difficulty: "intermediate"
                },
                {
                    question: "JavaScript files typically have the ________ extension.",
                    answer: ".js",
                    explanation: "JavaScript files use the .js extension to identify them as JavaScript code.",
                    difficulty: "beginner"
                },
                {
                    question: "ECMAScript is the ________ specification for JavaScript.",
                    answer: "standardized",
                    explanation: "ECMAScript provides the standardized specification that JavaScript implementations follow.",
                    difficulty: "intermediate"
                }
            ],
            identification: [
                {
                    question: "What type of programming language is JavaScript?",
                    answer: "Interpreted",
                    explanation: "JavaScript is an interpreted language that is executed by JavaScript engines without prior compilation.",
                    difficulty: "beginner"
                },
                {
                    question: "What does the acronym 'JS' commonly stand for in web development?",
                    answer: "JavaScript",
                    explanation: "JS is the common abbreviation for JavaScript in web development contexts.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the primary environment where JavaScript traditionally runs?",
                    answer: "Web browser",
                    explanation: "JavaScript was originally designed to run in web browsers to provide client-side interactivity.",
                    difficulty: "beginner"
                },
                {
                    question: "What company originally developed JavaScript?",
                    answer: "Netscape",
                    explanation: "JavaScript was developed by Netscape Communications Corporation in 1995.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the current standardized version of JavaScript called?",
                    answer: "ECMAScript",
                    explanation: "ECMAScript is the official standard specification for the JavaScript programming language.",
                    difficulty: "intermediate"
                },
                {
                    question: "What popular JavaScript runtime allows server-side JavaScript execution?",
                    answer: "Node.js",
                    explanation: "Node.js is a runtime environment that allows JavaScript to run outside of web browsers, typically on servers.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the main purpose of JavaScript in web development?",
                    answer: "Add interactivity",
                    explanation: "JavaScript's primary role is to add interactivity and dynamic behavior to otherwise static web pages.",
                    difficulty: "beginner"
                },
                {
                    question: "What type of applications can be built with JavaScript?",
                    answer: "Web applications",
                    explanation: "JavaScript is primarily used for building interactive web applications and websites.",
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
    window.quizGenerator = new JavaScriptIntroQuizGenerator();
});