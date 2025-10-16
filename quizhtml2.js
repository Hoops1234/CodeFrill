// AI HTML Quiz Generator
class HTMLQuizGenerator {
    constructor() {
        this.questionBank = this.initializeQuestionBank();
        this.currentQuiz = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.quizStartTime = null;
        this.selectedQuestionTypes = ['multipleChoice', 'fillBlanks', 'identification'];
        this.difficultyLevel = 'intermediate';
        this.questionCount = 10;

        this.initializeEventListeners();
    }

    initializeQuestionBank() {
        return {
            multipleChoice: [
                {
                    question: "Which of the following is a popular HTML editor?",
                    options: [
                        "Microsoft Word",
                        "Visual Studio Code",
                        "Adobe Photoshop",
                        "Google Chrome"
                    ],
                    correct: 1,
                    explanation: "Visual Studio Code is a popular, free HTML editor developed by Microsoft with excellent features for web development.",
                    difficulty: "beginner"
                },
                {
                    question: "What feature automatically completes HTML tags and attributes as you type?",
                    options: ["Syntax highlighting", "Auto-completion", "Live preview", "Code formatting"],
                    correct: 1,
                    explanation: "Auto-completion (IntelliSense) automatically suggests and completes HTML tags, attributes, and values as you type.",
                    difficulty: "beginner"
                },
                {
                    question: "Which HTML editor feature highlights different parts of code in different colors?",
                    options: ["Auto-completion", "Syntax highlighting", "Emmet", "Live preview"],
                    correct: 1,
                    explanation: "Syntax highlighting color-codes different elements like tags, attributes, and content to make code more readable.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the purpose of the 'Emmet' feature in HTML editors?",
                    options: [
                        "To run HTML code",
                        "To expand abbreviations into full HTML structures",
                        "To check for errors",
                        "To format existing code"
                    ],
                    correct: 1,
                    explanation: "Emmet allows you to type CSS-like abbreviations that expand into full HTML structures, speeding up coding.",
                    difficulty: "beginner"
                },
                {
                    question: "Which HTML editor is known for its extensive collection of extensions and plugins?",
                    options: [
                        "Notepad",
                        "Sublime Text",
                        "Visual Studio Code",
                        "TextEdit"
                    ],
                    correct: 2,
                    explanation: "Visual Studio Code has a vast marketplace of extensions that can add features like additional themes, productivity tools, and language support.",
                    difficulty: "beginner"
                },
                {
                    question: "What feature allows you to see how your HTML will look while you're coding?",
                    options: ["Code folding", "Live preview", "Version control", "Package manager"],
                    correct: 1,
                    explanation: "Live preview shows a real-time rendering of your HTML as you type, allowing you to see changes instantly.",
                    difficulty: "beginner"
                },
                {
                    question: "Which of the following is a text-based HTML editor?",
                    options: [
                        "Dreamweaver",
                        "Sublime Text",
                        "Adobe Muse",
                        "Webflow"
                    ],
                    correct: 1,
                    explanation: "Sublime Text is a sophisticated text editor that supports HTML with features like multiple selections and powerful search.",
                    difficulty: "intermediate"
                },
                {
                    question: "What HTML editor feature helps organize code by allowing sections to be collapsed?",
                    options: ["Code folding", "Syntax highlighting", "Auto-completion", "Error detection"],
                    correct: 0,
                    explanation: "Code folding allows you to collapse and expand sections of code, making it easier to navigate large files.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which HTML editor is developed by Adobe and provides visual design tools?",
                    options: ["Brackets", "Atom", "Dreamweaver", "BlueGriffon"],
                    correct: 2,
                    explanation: "Adobe Dreamweaver is a professional HTML editor that combines code editing with visual design tools.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the purpose of 'minifying' HTML code in an editor?",
                    options: [
                        "To add comments",
                        "To reduce file size by removing unnecessary characters",
                        "To add indentation",
                        "To check for errors"
                    ],
                    correct: 1,
                    explanation: "Minifying removes unnecessary whitespace and characters from HTML to reduce file size and improve loading speed.",
                    difficulty: "beginner"
                },
                {
                    question: "Which HTML editor feature automatically indents and formats your code?",
                    options: ["Code formatting", "Syntax highlighting", "Auto-completion", "Error checking"],
                    correct: 0,
                    explanation: "Code formatting (beautification) automatically indents and organizes HTML code according to best practices.",
                    difficulty: "intermediate"
                },
                {
                    question: "What type of software is 'Brackets'?",
                    options: ["Web browser", "Open-source HTML editor", "Image editor", "File manager"],
                    correct: 1,
                    explanation: "Brackets is a free, open-source HTML editor developed by Adobe specifically for web development.",
                    difficulty: "beginner"
                },
                {
                    question: "Which HTML editor feature shows potential errors and warnings in your code?",
                    options: ["Live preview", "Linting", "Code folding", "Version control"],
                    correct: 1,
                    explanation: "Linting analyzes your code and highlights potential errors, security issues, and best practice violations.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the main advantage of using a dedicated HTML editor over a basic text editor?",
                    options: [
                        "Lower cost",
                        "Advanced features like syntax highlighting and auto-completion",
                        "Smaller file size",
                        "Faster startup time"
                    ],
                    correct: 1,
                    explanation: "Dedicated HTML editors provide specialized features like syntax highlighting, auto-completion, and live preview that make coding more efficient.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which HTML editor is known for its 'Command Palette' feature?",
                    options: ["Sublime Text", "Visual Studio Code", "Atom", "Notepad++"],
                    correct: 0,
                    explanation: "Sublime Text features a Command Palette that allows quick access to all functions via keyboard shortcuts.",
                    difficulty: "intermediate"
                }
            ],
            fillBlanks: [
                {
                    question: "The ________ feature in HTML editors provides instant preview of web pages.",
                    answer: "live preview",
                    explanation: "Live preview allows developers to see real-time changes to their HTML as they code, improving productivity.",
                    difficulty: "beginner"
                },
                {
                    question: "________ is a popular HTML editor developed by Microsoft.",
                    answer: "Visual Studio Code",
                    explanation: "Visual Studio Code (VS Code) is a free, open-source HTML editor developed by Microsoft with extensive features and extensions.",
                    difficulty: "beginner"
                },
                {
                    question: "________ is a feature that highlights HTML syntax in different colors.",
                    answer: "syntax highlighting",
                    explanation: "Syntax highlighting improves code readability by color-coding different elements like tags, attributes, and values.",
                    difficulty: "beginner"
                },
                {
                    question: "________ allows you to expand abbreviations into full HTML structures in editors.",
                    answer: "Emmet",
                    explanation: "Emmet is a toolkit that allows developers to write HTML faster using CSS-like abbreviations and shortcuts.",
                    difficulty: "beginner"
                },
                {
                    question: "________ is a lightweight HTML editor known for its speed and simplicity.",
                    answer: "Sublime Text",
                    explanation: "Sublime Text is known for its speed, elegant interface, and powerful features that make coding efficient.",
                    difficulty: "intermediate"
                },
                {
                    question: "________ is an open-source HTML editor created by GitHub.",
                    answer: "Atom",
                    explanation: "Atom is a free, open-source HTML editor created by GitHub with a focus on customization and extensibility.",
                    difficulty: "intermediate"
                },
                {
                    question: "________ is a feature that checks code for errors and best practices.",
                    answer: "linting",
                    explanation: "Linting helps developers maintain code quality by identifying potential issues and enforcing coding standards.",
                    difficulty: "beginner"
                },
                {
                    question: "________ allows you to collapse and expand sections of code for better organization.",
                    answer: "code folding",
                    explanation: "Code folding improves navigation in large files by allowing developers to hide and show different sections of code.",
                    difficulty: "intermediate"
                }
            ],
            identification: [
                {
                    question: "What HTML editor feature provides real-time preview of web pages?",
                    answer: "live preview",
                    explanation: "Live preview shows how the HTML will appear in a browser while you're coding, allowing for immediate visual feedback.",
                    difficulty: "advanced"
                },
                {
                    question: "What HTML editor feature automatically suggests completions as you type?",
                    answer: "auto-completion",
                    explanation: "Auto-completion (IntelliSense) suggests HTML tags, attributes, and values as you type, speeding up development.",
                    difficulty: "advanced"
                },
                {
                    question: "What HTML editor feature color-codes different parts of code for better readability?",
                    answer: "syntax highlighting",
                    explanation: "Syntax highlighting uses different colors for HTML elements, attributes, and text to make code structure more apparent.",
                    difficulty: "intermediate"
                },
                {
                    question: "What HTML editor feature allows you to hide and show sections of code?",
                    answer: "code folding",
                    explanation: "Code folding allows developers to collapse sections of code they are not currently working on, improving focus and navigation.",
                    difficulty: "advanced"
                },
                {
                    question: "What HTML editor feature checks code for errors and suggests improvements?",
                    answer: "linting",
                    explanation: "Linting analyzes HTML code and provides warnings about potential issues, security vulnerabilities, and best practice violations.",
                    difficulty: "intermediate"
                },
                {
                    question: "What HTML editor feature expands abbreviations into full HTML structures?",
                    answer: "Emmet",
                    explanation: "Emmet allows developers to write HTML faster by expanding CSS-like abbreviations into complete HTML structures.",
                    difficulty: "intermediate"
                },
                {
                    question: "What HTML editor feature automatically formats and indents code?",
                    answer: "code formatting",
                    explanation: "Code formatting (beautification) automatically organizes HTML code with proper indentation and spacing for better readability.",
                    difficulty: "intermediate"
                },
                {
                    question: "What HTML editor feature reduces file size by removing unnecessary characters?",
                    answer: "minification",
                    explanation: "Minification removes unnecessary whitespace, comments, and characters from HTML to reduce file size and improve loading speed.",
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
            subject: 'HTML',
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
            subject: 'HTML',
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
    window.quizGenerator = new HTMLQuizGenerator();
});