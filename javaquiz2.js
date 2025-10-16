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
                    question: "What is the output of the following code?\n\nString name = \"Java\";\nSystem.out.println(\"Hello \" + name + \"!\");",
                    options: [
                        "Hello Java!",
                        "HelloJava!",
                        "Hello + name + !",
                        "Compilation Error"
                    ],
                    correct: 0,
                    explanation: "The + operator concatenates strings when used with String operands, producing 'Hello Java!'.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the value of result after this code?\n\nint x = 5;\nint y = 10;\nint result = x + y * 2;",
                    options: [
                        "30",
                        "25",
                        "20",
                        "15"
                    ],
                    correct: 1,
                    explanation: "Multiplication has higher precedence than addition, so y * 2 is calculated first (20), then added to x (5 + 20 = 25).",
                    difficulty: "beginner"
                },
                {
                    question: "What is the output of the following code?\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(10 + 20 + \"Hello\" + 10 + 20);\n    }\n}",
                    options: [
                        "30Hello1020",
                        "1020Hello1020",
                        "Hello30",
                        "Compilation Error"
                    ],
                    correct: 0,
                    explanation: "Java evaluates left to right. First 10 + 20 = 30, then 30 + \"Hello\" = \"30Hello\", then \"30Hello\" + 10 = \"30Hello10\", finally \"30Hello10\" + 20 = \"30Hello1020\".",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the output of this code?\n\nint score = 85;\nif (score >= 90) {\n    System.out.println(\"A\");\n} else if (score >= 80) {\n    System.out.println(\"B\");\n} else {\n    System.out.println(\"C\");\n}",
                    options: [
                        "A",
                        "B",
                        "C",
                        "No output"
                    ],
                    correct: 1,
                    explanation: "The score is 85, which is >= 80 but < 90, so it matches the second condition and prints 'B'.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the size of an int data type in Java?",
                    options: [
                        "8 bits",
                        "16 bits",
                        "32 bits",
                        "64 bits"
                    ],
                    correct: 2,
                    explanation: "An int data type in Java is 32 bits (4 bytes) long.",
                    difficulty: "beginner"
                },
                {
                    question: "Which of the following is the correct way to create an object in Java?",
                    options: [
                        "MyClass obj = new MyClass;",
                        "MyClass obj = MyClass();",
                        "new MyClass obj;",
                        "obj = new MyClass();"
                    ],
                    correct: 0,
                    explanation: "The correct syntax is: ClassName objectName = new ClassName();",
                    difficulty: "beginner"
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
                    explanation: "Method overloading allows creating multiple methods with the same name but different parameter lists.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which collection class in Java maintains insertion order and allows duplicates?",
                    options: [
                        "HashSet",
                        "TreeSet",
                        "ArrayList",
                        "HashMap"
                    ],
                    correct: 2,
                    explanation: "ArrayList maintains insertion order and allows duplicate elements.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the parent class of all Java classes?",
                    options: [
                        "Main",
                        "Object",
                        "Class",
                        "Parent"
                    ],
                    correct: 1,
                    explanation: "The Object class is the root of the class hierarchy. Every class in Java is descended from the Object class.",
                    difficulty: "beginner"
                },
                {
                    question: "Which keyword is used to handle exceptions in Java?",
                    options: [
                        "throw",
                        "catch",
                        "try",
                        "finally"
                    ],
                    correct: 2,
                    explanation: "The 'try' keyword is used to specify a block where we should place exception code.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the difference between == and .equals() method in Java?",
                    options: [
                        "No difference",
                        "== compares references, .equals() compares content",
                        "== compares content, .equals() compares references",
                        ".equals() is not a valid method"
                    ],
                    correct: 1,
                    explanation: "== compares object references, while .equals() method compares the actual content of objects.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which of the following is the correct syntax for a main method in Java?",
                    options: [
                        "public static void main(String args)",
                        "public void main(String[] args)",
                        "public static void main(String[] args)",
                        "static public void main(String args[])"
                    ],
                    correct: 2,
                    explanation: "The correct signature for main method is: public static void main(String[] args)",
                    difficulty: "beginner"
                },
                {
                    question: "What is the purpose of the 'final' keyword in Java?",
                    options: [
                        "To define constants",
                        "To create abstract methods",
                        "To implement interfaces",
                        "To extend classes"
                    ],
                    correct: 0,
                    explanation: "The 'final' keyword is used to create constants or prevent method overriding and class inheritance.",
                    difficulty: "intermediate"
                },
                {
                    question: "Which interface must be implemented to create a thread in Java?",
                    options: [
                        "Thread",
                        "Runnable",
                        "Threadable",
                        "Concurrent"
                    ],
                    correct: 1,
                    explanation: "A class must implement the Runnable interface to be executed as a thread.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the output of System.out.println(5/2) in Java?",
                    options: [
                        "2.5",
                        "2",
                        "2.0",
                        "Compilation Error"
                    ],
                    correct: 1,
                    explanation: "In Java, division of integers results in an integer. 5/2 = 2 (integer division).",
                    difficulty: "beginner"
                }
            ],
            fillBlanks: [
                {
                    question: "To declare an array of integers in Java, you use the syntax: ________ arrayName = new int[size];",
                    answer: "int[]",
                    explanation: "Arrays in Java are declared using 'type[] arrayName' syntax, followed by initialization with 'new type[size]'.",
                    difficulty: "beginner"
                },
                {
                    question: "Java is a platform-independent programming language because it runs on the ________.",
                    answer: "JVM",
                    explanation: "Java achieves platform independence through the Java Virtual Machine (JVM), which executes bytecode on any platform that has a JVM installed.",
                    difficulty: "beginner"
                },
                {
                    question: "A ________ loop is used when you know exactly how many times to repeat a block of code.",
                    answer: "for",
                    explanation: "The for loop is used when the number of iterations is known beforehand, making it perfect for counting loops.",
                    difficulty: "beginner"
                },
                {
                    question: "In Java, ________ is the process of hiding implementation details and showing only functionality.",
                    answer: "encapsulation",
                    explanation: "Encapsulation is one of the four OOP principles that binds data and methods together.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ modifier makes a method accessible only within its own class.",
                    answer: "private",
                    explanation: "Private access modifier restricts access to the class itself.",
                    difficulty: "beginner"
                },
                {
                    question: "Java supports ________ inheritance, meaning a class can extend only one parent class.",
                    answer: "single",
                    explanation: "Java supports single inheritance, unlike some languages that support multiple inheritance.",
                    difficulty: "intermediate"
                },
                {
                    question: "The ________ block is always executed whether an exception occurs or not.",
                    answer: "finally",
                    explanation: "The finally block contains code that is always executed, used for cleanup operations.",
                    difficulty: "intermediate"
                },
                {
                    question: "________ is a mechanism to handle runtime errors in Java.",
                    answer: "Exception handling",
                    explanation: "Exception handling allows Java programs to handle runtime errors gracefully.",
                    difficulty: "intermediate"
                }
            ],
            identification: [
                {
                    question: "What is the term for passing a value to a method parameter?",
                    answer: "argument",
                    explanation: "An argument is a value passed to a method when it is called, which is assigned to the corresponding parameter.",
                    difficulty: "beginner"
                },
                {
                    question: "What is the name of the Java Virtual Machine that executes bytecode?",
                    answer: "JVM",
                    explanation: "JVM (Java Virtual Machine) executes Java bytecode and provides platform independence.",
                    difficulty: "beginner"
                },
                {
                    question: "What type of polymorphism is achieved through method overriding?",
                    answer: "Runtime polymorphism",
                    explanation: "Runtime polymorphism (dynamic method dispatch) is achieved through method overriding.",
                    difficulty: "advanced"
                },
                {
                    question: "What Java concept allows objects to be treated as instances of their parent class?",
                    answer: "Upcasting",
                    explanation: "Upcasting allows treating a subclass object as an instance of its parent class.",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the process of converting an object to a stream of bytes called?",
                    answer: "Serialization",
                    explanation: "Serialization converts objects to byte streams for storage or transmission.",
                    difficulty: "intermediate"
                },
                {
                    question: "What Java interface is implemented by classes that can be sorted?",
                    answer: "Comparable",
                    explanation: "Classes implementing Comparable interface can be sorted using Collections.sort().",
                    difficulty: "intermediate"
                },
                {
                    question: "What is the term for a blueprint or template for creating objects?",
                    answer: "class",
                    explanation: "A class is a blueprint that defines the properties and behaviors that objects of that type will have.",
                    difficulty: "beginner"
                },
                {
                    question: "What Java keyword is used to prevent method overriding?",
                    answer: "final",
                    explanation: "The final keyword prevents method overriding when applied to methods.",
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