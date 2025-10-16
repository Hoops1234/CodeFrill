// AI Java Quiz Generator
class JavaQuizGenerator {
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
                    question: "What is the correct syntax for declaring a method in Java?",
                    options: [
                        "methodName(parameters) { }",
                        "accessModifier returnType methodName(parameters) { }",
                        "returnType methodName(parameters) { }",
                        "accessModifier methodName(parameters) returnType { }"
                    ],
                    correct: 1,
                    explanation: "The correct method declaration syntax includes access modifier, return type, method name, and parameters in parentheses.",
                    difficulty: "beginner"
                },
                {
                    question: "Which of the following is a valid method signature for a method that takes two integers and returns their sum?",
                    options: [
                        "public sum(int a, int b)",
                        "public int sum(int a, int b)",
                        "public int sum(a, b)",
                        "int sum(int a, int b)"
                    ],
                    correct: 1,
                    explanation: "A method signature must include the access modifier, return type, method name, and parameter types.",
                    difficulty: "beginner"
                },
                {
                    question: "What happens when a method is called in Java regarding parameter passing?",
                    options: [
                        "Parameters are passed by reference",
                        "Parameters are passed by value",
                        "Primitive types are passed by reference, objects by value",
                        "Objects are passed by reference, primitives by value"
                    ],
                    correct: 3,
                    explanation: "In Java, primitive types are passed by value, while objects are passed by reference (though the reference itself is passed by value).",
                    difficulty: "intermediate"
                },
                {
                    question: "What is method overloading in Java?",
                    options: [
                        "Creating multiple methods with the same name but different parameters",
                        "Creating multiple methods with different names but same functionality",
                        "Creating methods that call themselves",
                        "Creating methods that override parent class methods"
                    ],
                    correct: 0,
                    explanation: "Method overloading allows creating multiple methods with the same name but different parameter lists (different number or types of parameters).",
                    difficulty: "intermediate"
                },
                {
                    question: "Which access modifier makes a method accessible only within its own class?",
                    options: [
                        "public",
                        "protected",
                        "private",
                        "default (package-private)"
                    ],
                    correct: 2,
                    explanation: "The private access modifier restricts access to the method only within the same class where it's declared.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the return type of a constructor in Java?",
                    options: [
                        "void",
                        "int",
                        "No return type (constructors don't return anything)",
                        "The class name"
                    ],
                    correct: 2,
                    explanation: "Constructors in Java do not have a return type, not even void. They are special methods used to initialize objects.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which keyword is used to call a method from a parent class in Java?",
                    options: [
                        "this",
                        "super",
                        "parent",
                        "extends"
                    ],
                    correct: 1,
                    explanation: "The 'super' keyword is used to call methods from the parent class, particularly useful when overriding methods.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is a static method in Java?",
                    options: [
                        "A method that belongs to an instance of a class",
                        "A method that belongs to the class itself",
                        "A method that cannot be overridden",
                        "A method that must return a value"
                    ],
                    correct: 1,
                    explanation: "Static methods belong to the class rather than any specific instance and can be called without creating an object.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which of the following is true about the 'this' keyword in Java?",
                    options: [
                        "It refers to the current class",
                        "It refers to the current object",
                        "It refers to the parent class",
                        "It refers to a static method"
                    ],
                    correct: 1,
                    explanation: "The 'this' keyword refers to the current object instance and is used to access instance variables and methods.",
                    difficulty: "beginner"
                },
                {
                    question: "What is method overriding in Java?",
                    options: [
                        "Creating multiple methods with the same name",
                        "Providing a different implementation of a method in a subclass",
                        "Creating methods with the same signature in the same class",
                        "Hiding a method using static keyword"
                    ],
                    correct: 1,
                    explanation: "Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its parent class.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which of the following method signatures shows method overloading?",
                    options: [
                        "public void display() and public void display()",
                        "public void display() and public int display()",
                        "public void display(int x) and public void display(int y)",
                        "public void display(int x) and public int display(int x)"
                    ],
                    correct: 3,
                    explanation: "Method overloading requires methods to have the same name but different parameter lists or return types.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the purpose of the @Override annotation in Java?",
                    options: [
                        "To create a new method",
                        "To indicate that a method is overriding a parent class method",
                        "To make a method static",
                        "To make a method final"
                    ],
                    correct: 1,
                    explanation: "The @Override annotation indicates that the method is intended to override a method from the parent class and helps catch errors if the signature doesn't match.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which of the following is a valid varargs method declaration?",
                    options: [
                        "public void print(String... values)",
                        "public void print(String values...)",
                        "public void print(String...values)",
                        "public void print(...String values)"
                    ],
                    correct: 0,
                    explanation: "Varargs (variable arguments) are declared using 'type... parameterName' syntax, where the ellipsis (...) comes after the type.",
                    difficulty: "advanced"
                },
                {
                    question: "What happens when you call a method with arguments in Java?",
                    options: [
                        "The arguments are copied to the method parameters",
                        "The original variables are modified",
                        "The method cannot access the original variables",
                        "The arguments are converted to objects"
                    ],
                    correct: 0,
                    explanation: "When calling a method, the values of arguments are copied to the method parameters. This is known as pass-by-value.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which access modifier allows a method to be accessed from any class in the same package and subclasses in other packages?",
                    options: [
                        "private",
                        "public",
                        "protected",
                        "default"
                    ],
                    correct: 2,
                    explanation: "The protected access modifier allows access within the same package and from subclasses in other packages.",
                    difficulty: "intermediate"
                }
            ],
            fillBlanks: [
                {
                    question: "A method that calls itself is called a ________ method.",
                    answer: "recursive",
                    explanation: "Recursive methods call themselves to solve problems that can be broken down into smaller, similar subproblems.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ keyword is used to refer to the current object instance in a method.",
                    answer: "this",
                    explanation: "The 'this' keyword refers to the current object and is used to access instance variables and methods within the class.",
                    difficulty: "beginner"
                },
                {
                    question: "In Java, all instance methods are implicitly passed a reference to the current object called ________.",
                    answer: "this",
                    explanation: "Every instance method receives an implicit 'this' reference pointing to the object on which the method is being called.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ method is a special method that is automatically called when an object is created.",
                    answer: "constructor",
                    explanation: "Constructors initialize objects and have the same name as the class with no return type.",
                    difficulty: "beginner"
                },
                {
                    question: "Methods declared with the ________ keyword can be called without creating an instance of the class.",
                    answer: "static",
                    explanation: "Static methods belong to the class rather than instances and can be called using the class name.",
                    difficulty: "intermediate"
                },
                {
                    question: "The process of providing a different implementation of an inherited method in a subclass is called method ________.",
                    answer: "overriding",
                    explanation: "Method overriding allows subclasses to provide specific implementations of methods inherited from parent classes.",
                    difficulty: "intermediate"
                },
                {
                    question: "A method signature consists of the method name and its ________ list.",
                    answer: "parameter",
                    explanation: "A method signature is defined by its name and the number and types of its parameters.",
                    difficulty: "beginner"
                },
                {
                    question: "The ________ method is the entry point for Java applications and must be declared as public static void.",
                    answer: "main",
                    explanation: "The main method is the starting point of execution for Java programs and has a specific signature requirement.",
                    difficulty: "beginner"
                }
            ],
            identification: [
                {
                    question: "What keyword is used to call the constructor of the parent class?",
                    answer: "super",
                    explanation: "The super() call invokes the parent class constructor and must be the first statement in a constructor if used.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the term for having multiple methods with the same name but different parameters?",
                    answer: "Method overloading",
                    explanation: "Method overloading allows multiple methods with the same name but different parameter signatures in the same class.",
                    difficulty: "intermediate"
                },
                {
                    question: "What type of method cannot access instance variables and methods directly?",
                    answer: "Static method",
                    explanation: "Static methods belong to the class and cannot access instance members without creating an object.",
                    difficulty: "intermediate"
                },
                {
                    question: "What annotation is used to indicate that a method overrides a parent class method?",
                    answer: "@Override",
                    explanation: "The @Override annotation helps ensure that a method is actually overriding a parent class method and catches signature mismatches.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the implicit first parameter passed to all instance methods?",
                    answer: "this",
                    explanation: "The 'this' reference is automatically passed to instance methods and refers to the current object instance.",
                    difficulty: "advanced"
                },
                {
                    question: "What keyword prevents a method from being overridden in subclasses?",
                    answer: "final",
                    explanation: "When a method is declared as final, it cannot be overridden by subclasses, ensuring consistent behavior.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the special method used to initialize objects when they are created?",
                    answer: "Constructor",
                    explanation: "Constructors are special methods with the same name as the class and no return type, used to initialize objects.",
                    difficulty: "beginner"
                },
                {
                    question: "What Java feature allows methods to accept a variable number of arguments?",
                    answer: "Varargs",
                    explanation: "Varargs (variable arguments) allow methods to accept zero or more arguments of the same type using 'type...' syntax.",
                    difficulty: "advanced"
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
            subject: 'Java',
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
            subject: 'Java',
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
    window.quizGenerator = new JavaQuizGenerator();
});