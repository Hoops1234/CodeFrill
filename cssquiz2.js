// AI CSS Quiz Generator
class CSSQuizGenerator {
    constructor() {
        this.questionBank = this.initializeQuestionBank();
        this.currentQuiz = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.quizStartTime = null;
        this.selectedQuestionTypes = ['multipleChoice', 'fillBlanks', 'identification'];
        this.difficultyLevel = 'intermediate';
        this.questionCount = 10;
        this.progressGraph = null;

        this.initializeEventListeners();
        this.initializeProgressGraph();
    }

    initializeQuestionBank() {
        return {
            multipleChoice: [
                {
                    question: "What does CSS stand for?",
                    options: [
                        "Computer Style Sheets",
                        "Creative Style Sheets",
                        "Cascading Style Sheets",
                        "Colorful Style Sheets"
                    ],
                    correct: 2,
                    explanation: "CSS stands for Cascading Style Sheets, which is a stylesheet language used to describe the presentation of a document written in HTML.",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS property is used to change the text color of an element?",
                    options: [
                        "font-color",
                        "text-color",
                        "color",
                        "foreground-color"
                    ],
                    correct: 2,
                    explanation: "The 'color' property is used to set the color of text in CSS.",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS property controls the size of text?",
                    options: [
                        "text-size",
                        "font-size",
                        "size",
                        "text-style"
                    ],
                    correct: 1,
                    explanation: "The 'font-size' property is used to control the size of text in CSS.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the correct CSS syntax to select an element with id 'header'?",
                    options: [
                        ".header",
                        "#header",
                        "*header",
                        "header"
                    ],
                    correct: 1,
                    explanation: "The # symbol is used to select elements by their id attribute in CSS.",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS property is used to control the spacing between elements?",
                    options: [
                        "spacing",
                        "margin",
                        "padding",
                        "border"
                    ],
                    correct: 1,
                    explanation: "The 'margin' property is used to control the spacing between elements in CSS.",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS selector is used to target all elements of a specific HTML tag type?",
                    options: [
                        "Class selector (.)",
                        "ID selector (#)",
                        "Type selector (element name)",
                        "Universal selector (*)"
                    ],
                    correct: 2,
                    explanation: "Type selectors target all elements of a specific HTML tag type, like 'p' for paragraphs or 'div' for div elements.",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS property is used to make text bold?",
                    options: [
                        "font-weight",
                        "text-decoration",
                        "font-style",
                        "text-transform"
                    ],
                    correct: 0,
                    explanation: "The 'font-weight' property is used to make text bold. Common values are 'normal', 'bold', and numeric values like 400, 700.",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS color value represents the color red?",
                    options: [
                        "red",
                        "#ff0000",
                        "rgb(255, 0, 0)",
                        "All of the above"
                    ],
                    correct: 3,
                    explanation: "All of these color values represent red in CSS - named colors ('red'), hexadecimal (#ff0000), and RGB values (rgb(255, 0, 0)).",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS property is used to create rounded corners?",
                    options: [
                        "border-radius",
                        "corner-radius",
                        "border-corner",
                        "rounded-border"
                    ],
                    correct: 0,
                    explanation: "The 'border-radius' property is used to create rounded corners for elements in CSS.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the difference between an ID selector and a class selector in CSS?",
                    options: [
                        "ID selectors use # and class selectors use .",
                        "ID selectors are unique, class selectors can be used multiple times",
                        "ID selectors have higher specificity than class selectors",
                        "All of the above"
                    ],
                    correct: 3,
                    explanation: "ID selectors (#) are unique identifiers, class selectors (.) can be reused, and ID selectors have higher CSS specificity than class selectors.",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS property is used to set the background color of an element?",
                    options: [
                        "color",
                        "background-color",
                        "bg-color",
                        "background"
                    ],
                    correct: 1,
                    explanation: "The 'background-color' property is used to set the background color of HTML elements in CSS.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the correct way to add a background color in CSS?",
                    options: [
                        "background-color: blue;",
                        "bg-color: blue;",
                        "color-background: blue;",
                        "background: blue;"
                    ],
                    correct: 0,
                    explanation: "The correct CSS property for background color is 'background-color' followed by a color value.",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS property is used to align text horizontally?",
                    options: [
                        "text-align",
                        "align",
                        "horizontal-align",
                        "text-position"
                    ],
                    correct: 0,
                    explanation: "The 'text-align' property is used to align text horizontally within its container.",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS selector would you use to target all paragraph elements on a page?",
                    options: [
                        ".paragraph",
                        "#paragraph",
                        "p",
                        "*paragraph"
                    ],
                    correct: 2,
                    explanation: "The type selector 'p' targets all paragraph elements. Type selectors use the element name without any symbols.",
                    difficulty: "beginner"
                },
                {
                    question: "Which CSS property controls the width of an element's border?",
                    options: [
                        "border-width",
                        "border-size",
                        "border-thickness",
                        "border-style"
                    ],
                    correct: 0,
                    explanation: "The 'border-width' property controls the thickness of an element's border.",
                    difficulty: "beginner"
                }
            ],
            fillBlanks: [
                {
                    question: "The ________ property in CSS is used to control the space between lines of text.",
                    answer: "line-height",
                    explanation: "The 'line-height' property controls the amount of space between lines of text.",
                    difficulty: "intermediate"
                },
                {
                    question: "CSS Grid is a ________-dimensional layout method for the web.",
                    answer: "two",
                    explanation: "CSS Grid Layout is a two-dimensional layout method that allows you to lay out content in rows and columns.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ property specifies the stack order of an element.",
                    answer: "z-index",
                    explanation: "The 'z-index' property specifies the stack order of positioned elements, controlling which elements appear on top.",
                    difficulty: "intermediate"
                },
                {
                    question: "In CSS, ________ is the process of finding and applying all declarations relevant to an element.",
                    answer: "cascade",
                    explanation: "The cascade is the process of combining different CSS rules and resolving conflicts between them.",
                    difficulty: "advanced"
                },
                {
                    question: "The ________ pseudo-class selects an element that is being hovered over with a mouse.",
                    answer: "hover",
                    explanation: "The :hover pseudo-class is used to select elements when you mouse over them.",
                    difficulty: "beginner"
                },
                {
                    question: "CSS ________ allows you to create responsive layouts that adapt to different screen sizes.",
                    answer: "media queries",
                    explanation: "Media queries are a CSS feature that allows you to apply styles based on device characteristics like screen size.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ property defines how an element is displayed in relation to other elements.",
                    answer: "position",
                    explanation: "The 'position' property specifies the type of positioning method used for an element.",
                    difficulty: "intermediate"
                },
                {
                    question: "In CSS, ________ is used to select all elements with a specific class name.",
                    answer: ".classname",
                    explanation: "The dot (.) selector is used to select elements by their class name in CSS.",
                    difficulty: "beginner"
                }
            ],
            identification: [
                {
                    question: "What CSS property would you use to make text appear in italics?",
                    answer: "font-style",
                    explanation: "The 'font-style' property is used to make text appear in italics. The value 'italic' makes text slanted.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the name of the CSS layout model that provides a way to size items in a responsive grid?",
                    answer: "CSS Grid",
                    explanation: "CSS Grid Layout provides a method for creating responsive grid-based layouts with precise control over rows and columns.",
                    difficulty: "intermediate"
                },
                {
                    question: "What CSS property controls the transparency of an element?",
                    answer: "opacity",
                    explanation: "The 'opacity' property controls the transparency level of an element, with values ranging from 0 (fully transparent) to 1 (fully opaque).",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the CSS property used to create smooth transitions between different states of an element?",
                    answer: "transition",
                    explanation: "The 'transition' property allows you to change property values smoothly over a given duration.",
                    difficulty: "intermediate"
                },
                {
                    question: "What CSS property is used to control the inner spacing of an element?",
                    answer: "padding",
                    explanation: "The 'padding' property controls the space between an element's content and its border.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the name of the CSS technique used to make web pages work well on all device sizes?",
                    answer: "responsive design",
                    explanation: "Responsive design is an approach to web development that makes web pages render well on a variety of devices and screen sizes.",
                    difficulty: "intermediate"
                },
                {
                    question: "What CSS property would you use to hide an element but keep it in the document flow?",
                    answer: "visibility: hidden",
                    explanation: "Setting visibility to 'hidden' hides the element but preserves the space it would have occupied in the layout.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the CSS property used to control how content overflows an element's box?",
                    answer: "overflow",
                    explanation: "The 'overflow' property specifies what happens if content overflows an element's content area.",
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
            subject: 'CSS',
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
            subject: 'CSS',
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
    window.quizGenerator = new CSSQuizGenerator();
});