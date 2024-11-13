const quizdata = [
    {
        question: "A substance that can kill or seriously harm is called what?",
        a: "Diet Drink",
        b: "Corasong",
        c: "Poison",
        d: "Paranola",
        correct: "c",
        id: "third",
        name: "Poison",
    },

    {
        question: "Which element has the chemical symbol 'O'?",
        a: "Oxygen",
        b: "Gold",
        c: "Osmium",
        d: "Helium",
        correct: "a",
        id: "first",
        name: "Oxygen",


    },

    {
        question: "What is the largest planet in our solar system?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "c",
        id: "third",
        name: "Jupiter",
    },

    {
        question: "What is the capital city of Australia?",
        a: "Sydney",
        b: "Melbourne",
        c: "Canberra",
        d: "Perth",
        correct: "c",
        id: "third",
        name: "Canberra",


    },
    {
        question: "What is the national bird of the united state?",
        a: "Bald Eagle",
        b: "Mockingbird",
        c: "Cardinal",
        d: "Wild Turney",
        correct: "a",
        id: "first",
        name: "Bald Eagle",
    },

    {
        question: "Who painted the Mona Lisa?",
        a: "Michelangelo",
        b: "Pablo Picasso",
        c: "Vincent van Gogh",
        d: "Leonardo da Vinci",
        correct: "d",
        id: "fourth",
        name: "Leonardo da Vinci",
    },

    {
        question: "Which planet in our solar system is known for having the highest number of moons?",
        a: "Saturn",
        b: "Mars",
        c: "Neptune",
        d: "Venus",
        correct: "a",
        id: "first",
        name: "Saturn"
    },
    {
        question: "Who developed the theory of relativity?",
        a: "Isaac Newton",
        b: "Nikola Tesla",
        c: "Albert Einstein",
        d: "Marie Curie",
        correct: "c",
        id: "third",
        name: "Albert Einstein"
    },
    {
        question: "In which year did the Titanic sink on its maiden voyage?",
        a: "1905",
        b: "1912",
        c: "1923",
        d: "1898",
        correct: "b",
        id: "second",
        name: "1912"
    },
    {
        question: "Which country is home to the largest desert in the world?",
        a: "Australia",
        b: "Saudi Arabia",
        c: "Antarctica",
        d: "China",
        correct: "c",
        id: "third",
        name: "Antarctica"
    }
];



const quiz = document.getElementById("quiz");
const CountQuestion = document.getElementById("count-question");
const totalNoOfQues = document.getElementById("tot-no-que");
const questionNo = document.getElementById("question-number");
const questionTitle = document.getElementById("question");
const answerLabel = document.querySelectorAll(".answer-label");
const nextQuestionButton = document.getElementById("next-question-btn");
const allInputs = document.querySelectorAll("input[type='radio']");
const submitQuiz = document.getElementById("submit");
const progressCircle = document.getElementById("progress-circle");
const progressValue = document.getElementById("progress-value");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");



const timerEl = document.getElementById("timer");
let timeLeft = 10;
let countdownInterval;

const startTimer = () => {
    clearInterval(countdownInterval); // Clear any existing timer
    timeLeft = 10;
    timerEl.innerHTML = `Time Left: ${timeLeft}s`;

    countdownInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerHTML = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            moveToNextQuestion();
        }
    }, 1000);
};

const moveToNextQuestion = () => {
    let answer = getSelected();

    if (answer == quizdata[currentQtn].correct) {
        answered++;
    }

    markAnswers();  // Highlight correct and incorrect answers

    setTimeout(() => {
        currentQtn++;
        if (currentQtn < quizdata.length) {
            loadQuiz();
        } else {
            showResults();
        }
    }, 1000); // Delay to let users see the result before loading next question
};



let currentQtn = 0;
let answered = 0;

const resetAnswerStyles = () => {
    answerLabel.forEach(label => {
        label.classList.remove("correct-answer", "incorrect-answer");
    });
};


const loadQuiz = () => {
    resetAnswerStyles();

    CountQuestion.innerHTML = `${currentQtn + 1}`;
    totalNoOfQues.innerHTML = quizdata.length;
    questionNo.innerHTML = `${currentQtn + 1}`;
    questionTitle.innerHTML = quizdata[currentQtn].question;
    answerLabel[0].innerHTML = quizdata[currentQtn].a;
    answerLabel[1].innerHTML = quizdata[currentQtn].b;
    answerLabel[2].innerHTML = quizdata[currentQtn].c;
    answerLabel[3].innerHTML = quizdata[currentQtn].d;
    reset();

    if (currentQtn == quizdata.length - 1) {
        nextQuestionButton.style.display = "none";
        submitQuiz.style.display = "block";

    }

    startTimer(); // Start the timer for each question


}
const reset = () => {
    allInputs.forEach((allInputs) => {
        allInputs.checked = false;

    })
}


const markAnswers = () => {
    allInputs.forEach((input, index) => {
        const label = answerLabel[index];

        // Reset styles first
        label.classList.remove("correct-answer", "incorrect-answer");

        // If the option is correct, mark it green
        if (input.value === quizdata[currentQtn].correct) {
            label.classList.add("correct-answer");
        } else if (input.checked) {
            // If an incorrect option is selected, mark it red
            label.classList.add("incorrect-answer");
        }

    });
};




const animateScore = (finalScore) => {
    let currentScore = 0;
    const increment = Math.ceil(finalScore / 50); // Speed of animation, higher means faster
    const scoreInterval = setInterval(() => {
        if (currentScore >= finalScore) {
            clearInterval(scoreInterval);

            if (answered >= 0 && answered <= 2) {
                scoreEl.innerHTML = `Questions Answered Correctly: ${finalScore} / ${quizdata.length}😔`;

                console.log("avvvv");
            }


            if (answered > 2 && answered <= 5) {
                scoreEl.innerHTML = `Questions Answered Correctly: ${finalScore} / ${quizdata.length}😐`;

                console.log("avvvv");
            }

            if (answered > 5 && answered <= 7) {
                scoreEl.innerHTML = `Questions Answered Correctly: ${finalScore} / ${quizdata.length}💪`;

                console.log("avvvv");
            }

            if (answered > 7 && answered <= 9) {
                scoreEl.innerHTML = `Questions Answered Correctly: ${finalScore} / ${quizdata.length}😉`;

                console.log("avvvv");
            }


            if (answered >= 10) {
                scoreEl.innerHTML = `Questions Answered Correctly: ${finalScore} / ${quizdata.length}🎉😎`;

                console.log("avvvv");
            }


        } else {
            currentScore += increment;
            scoreEl.innerHTML = `Questions Answered Correctly: ${finalScore} / ${quizdata.length}`;
        }
    }, 500); // The duration of each increment in milliseconds
};


nextQuestionButton.addEventListener("click", () => {
    let answer = getSelected();

    if (answer == null) {
        alert("Please select an answer before proceeding.");

    } else {
        clearInterval(countdownInterval); // Stop the timer when moving to the next question
        moveToNextQuestion();
    }

    if (answer != null && answer === quizdata[currentQtn].correct) {
        answered++;
        console.log("I hate coding...");

        markAnswers();  // Highlight correct and incorrect answers

        reset();

        setTimeout(() => {

            currentQtn++;
            if (currentQtn < quizdata.length) {
                loadQuiz();
            }
        }, 1000); // Delay to let users see the result before loading next question

    }

    if (answer != null && answer != quizdata[currentQtn].correct) {

        markAnswers();  // Highlight correct and incorrect answers
        reset();

        setTimeout(() => {

            currentQtn++;
            if (currentQtn < quizdata.length) {
                loadQuiz();
            }
        }, 1000); // Delay to let users see the result before loading next question

    }



});


const updateCircularGraph = (percentage) => {


    // Update the circular progress bar with a conic-gradient
    let start = 0;
    const animate = setInterval(() => {
        start++;
        if (start > percentage) {
            clearInterval(animate);
        }
        progressCircle.style.background = `conic-gradient(
            lightgreen ${start * 3.6}deg,
            #e6e6e6 ${start * 3.6}deg
        )`;
        progressValue.textContent = `${start}%`;
    }, 50); // Adjust for animation speed
};




submitQuiz.addEventListener("click", () => {
    let answer = getSelected();

    if (answer == null) {
        alert("Please select an answer before proceeding.");

    }



    if (answer != null && answer === quizdata[currentQtn].correct) {
        if (answer === quizdata[currentQtn].correct) {
            answered++;
        }

        markAnswers();  // Highlight correct and incorrect answers

        setTimeout(() => {
            quiz.style.display = "none";
            resultEl.style.display = "block";
            animateScore(answered);
        }, 1000); // Delay to show final answers before displaying result


        const finalPercentage = Math.round((answered / quizdata.length) * 100) - 1;
        updateCircularGraph(finalPercentage);


    }

    if (answer != null && answer != quizdata[currentQtn].correct) {

        if (answer === quizdata[currentQtn].correct) {
            answered++;
        }
        markAnswers();  // Highlight correct and incorrect answers

        setTimeout(() => {
            quiz.style.display = "none";
            resultEl.style.display = "block";
            animateScore(answered);
        }, 1000); // Delay to show final answers before displaying result



        const finalPercentage = Math.round((answered / quizdata.length) * 100) - 1;
        updateCircularGraph(finalPercentage);


    }

});



submitQuiz.addEventListener("click", () => {
    clearInterval(countdownInterval); // Stop the timer on submission
    showResults();
});

const showResults = () => {
    quiz.style.display = "none";
    resultEl.style.display = "block";
    animateScore(answered);

    const finalPercentage = Math.round((answered / quizdata.length) * 100);
    updateCircularGraph(finalPercentage);
};

const getSelected = () => {

    let answer;

    allInputs.forEach((allInputs) => {
        if (allInputs.checked) {

            answer = allInputs.value;
        }

    });
    return answer;
}

loadQuiz();




