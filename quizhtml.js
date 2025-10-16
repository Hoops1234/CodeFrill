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
        this.progressGraph = null;

        this.initializeEventListeners();
        this.initializeProgressGraph();
    }

    initializeQuestionBank() {
        return {
            multipleChoice: [
                {
                    question: "What does HTML stand for?",
                    options: [
                        "Hypertext Markup Language",
                        "High Tech Modern Language",
                        "Home Tool Markup Language",
                        "Hyperlink and Text Markup Language"
                    ],
                    correct: 0,
                    explanation: "HTML stands for Hypertext Markup Language, the standard markup language for creating web pages.",
                    difficulty: "beginner"
                },
                {
                    question: "Which HTML element is used for the largest heading?",
                    options: ["h6", "h1", "heading", "head"],
                    correct: 1,
                    explanation: "h1 defines the most important heading, which is the largest one.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the correct HTML element for inserting a line break?",
                    options: ["lb", "break", "br", "line"],
                    correct: 2,
                    explanation: "br is the correct HTML element for inserting a line break.",
                    difficulty: "beginner"
                },
                {
                    question: "Which attribute is used to specify an image's alternative text?",
                    options: ["title", "src", "alt", "href"],
                    correct: 2,
                    explanation: "The alt attribute provides alternative text for an image if it cannot be displayed.",
                    difficulty: "beginner"
                },
                {
                    question: "What does the 'href' attribute in an anchor tag specify?",
                    options: [
                        "The relationship between documents",
                        "The destination URL",
                        "The title of the link",
                        "The target frame"
                    ],
                    correct: 1,
                    explanation: "The href attribute specifies the URL of the page the link goes to.",
                    difficulty: "beginner"
                },
                {
                    question: "Which HTML element is used to define a table row?",
                    options: ["table", "tr", "td", "th"],
                    correct: 1,
                    explanation: "tr stands for table row and is used to define a row in an HTML table.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the purpose of the meta tag in HTML?",
                    options: [
                        "To create navigation menus",
                        "To provide metadata about the document",
                        "To embed images",
                        "To create forms"
                    ],
                    correct: 1,
                    explanation: "The meta tag provides metadata about the HTML document, such as description, keywords, author, etc.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which HTML5 semantic element is used to define navigation links?",
                    options: ["nav", "navigation", "menu", "links"],
                    correct: 0,
                    explanation: "nav is the semantic HTML5 element used to define a set of navigation links.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the correct way to include an external CSS file in HTML?",
                    options: [
                        "'css src='style.css'",
                        "'style src='style.css'",
                        "'link rel='stylesheet' href='style.css'",
                        "'script src='style.css'"
                    ],
                    correct: 2,
                    explanation: "The correct way is to use <link rel='stylesheet' href='style.css' to include an external CSS file.",
                    difficulty: "beginner"
                },
                {
                    question: "Which HTML element is used to create a numbered list?",
                    options: ["ul", "ol", "li", "list"],
                    correct: 1,
                    explanation: "ol creates an ordered (numbered) list, while <ul> creates an unordered (bulleted) list.",
                    difficulty: "beginner"
                },
                {
                    question: "What does the 'id' attribute do in HTML?",
                    options: [
                        "It specifies the language of the document",
                        "It provides a unique identifier for an element",
                        "It defines the title of the page",
                        "It links to external resources"
                    ],
                    correct: 1,
                    explanation: "The id attribute provides a unique identifier for an HTML element, used for styling and JavaScript manipulation.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which HTML element is used to define the structure of an HTML document?",
                    options: ["body", "html", "head", "structure"],
                    correct: 1,
                    explanation: "The html element is the root element that defines the whole HTML document.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the purpose of the 'lang' attribute in the <html> tag?",
                    options: [
                        "To specify the programming language",
                        "To declare the language of the document",
                        "To set the font language",
                        "To define character encoding"
                    ],
                    correct: 1,
                    explanation: "The lang attribute declares the language of the document content, important for accessibility and search engines.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which HTML5 element is used to represent self-contained content?",
                    options: ["section", "article", "div", "content"],
                    correct: 1,
                    explanation: "article represents a self-contained piece of content that could be distributed independently.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the correct HTML element for playing video files?",
                    options: ["movie", "video", "media", "play"],
                    correct: 1,
                    explanation: "video is the HTML5 element used to embed video content in web pages.",
                    difficulty: "intermediate"
                }
            ],
            fillBlanks: [
                {
                    question: "The ________ element is used to create a hyperlink in HTML.",
                    answer: "a",
                    explanation: "The 'a>'element (anchor) is used to create hyperlinks in HTML.",
                    difficulty: "beginner"
                },
                {
                    question: "HTML documents must start with ________ and end with ________.",
                    answer: "!DOCTYPE html",
                    explanation: "All HTML documents should start with '!DOCTYPE html' declaration.",
                    difficulty: "beginner"
                },
                {
                    question: "The ________ attribute is used to specify the source of an image.",
                    answer: "src",
                    explanation: "The 'src' attribute specifies the URL of the image to be displayed.",
                    difficulty: "beginner"
                },
                {
                    question: "The ________ element is used to define the head section of an HTML document.",
                    answer: "head",
                    explanation: "The 'head' element contains metadata about the document and goes in the document head.",
                    difficulty: "beginner"
                },
                {
                    question: "CSS can be included in HTML using the ________ element.",
                    answer: "style",
                    explanation: "The 'style' element is used to embed CSS directly in HTML documents.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ element represents a section of content that forms an independent part of a document.",
                    answer: "article",
                    explanation: "The 'article' element represents self-contained content that could be distributed independently.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ attribute is used to provide alternative text for images.",
                    answer: "alt",
                    explanation: "The 'alt' attribute provides alternative information for an image if it cannot be displayed.",
                    difficulty: "beginner"
                },
                {
                    question: "The ________ element is used to create a form for user input.",
                    answer: "form",
                    explanation: "The 'form' element is a container for different types of input elements.",
                    difficulty: "intermediate"
                }
            ],
            identification: [
                {
                    question: "What HTML element is used to display a scalar measurement within a range?",
                    answer: "meter",
                    explanation: "The 'meter' element represents a scalar measurement within a known range, like disk usage.",
                    difficulty: "advanced"
                },
                {
                    question: "What HTML element is used to represent the result of a calculation?",
                    answer: "output",
                    explanation: "The 'output' element represents the result of a calculation or user action.",
                    difficulty: "advanced"
                },
                {
                    question: "What HTML element is used to create a progress bar?",
                    answer: "progress",
                    explanation: "The 'progress' element displays the progress of a task, like download completion.",
                    difficulty: "intermediate"
                },
                {
                    question: "What HTML element is used to define client-side image maps?",
                    answer: "map",
                    explanation: "The 'map' element is used with <area> elements to define an image map.",
                    difficulty: "advanced"
                },
                {
                    question: "What HTML element is used to group related form controls?",
                    answer: "fieldset",
                    explanation: "The 'fieldset' element groups related elements in a form with an optional legend.",
                    difficulty: "intermediate"
                },
                {
                    question: "What HTML element is used to provide additional details that can be shown or hidden?",
                    answer: "details",
                    explanation: "The 'details' element creates a disclosure widget that can show/hide additional information.",
                    difficulty: "intermediate"
                },
                {
                    question: "What HTML element is used to represent a caption or legend for a figure?",
                    answer: "figcaption",
                    explanation: "The 'figcaption' element provides a caption or legend for a <figure> element.",
                    difficulty: "intermediate"
                },
                {
                    question: "What HTML element is used to define preformatted text?",
                    answer: "pre",
                    explanation: "The 'pre' element defines preformatted text that preserves spaces and line breaks.",
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