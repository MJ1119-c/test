let radio;
let input;
let submitButton;
let resultP;
let questionP;
let correctCountP;
let incorrectCountP;
let infoP;
let table;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#c2c5aa");

  textSize(30);

  // 顯示答對題數和答錯題數
  correctCountP = createP(`答對題數：${correctCount}`);
  correctCountP.style('font-size', '20px');
  correctCountP.position(10, 10);

  incorrectCountP = createP(`答錯題數：${incorrectCount}`);
  incorrectCountP.style('font-size', '20px');
  incorrectCountP.position(10, 40);

  // 顯示個人資訊
  infoP = createP('413730168許孟婕');
  infoP.style('font-size', '20px');
  infoP.position(10, 70);

  // 顯示題目
  questionP = createP('');
  questionP.style('font-size', '30px');
  questionP.style('font-weight', 'bold');
  questionP.position((windowWidth - questionP.size().width) / 2, (windowHeight / 2) - 200);

  // 建立選擇題
  radio = createRadio();
  radio.style('font-size', '20px');
  radio.style('font-weight', 'bold');
  radio.position((windowWidth - radio.size().width) / 2+230, (windowHeight / 2) - 100);

  // 建立填空題
  input = createInput();
  input.style('font-size', '30px');
  input.position((windowWidth - input.size().width) / 2, (windowHeight / 2) - 100);
  input.hide();
  
  // 建立送出按鈕
  submitButton = createButton('送出');
  submitButton.style('font-size', '30px');
  submitButton.style('font-weight', 'bold');
  submitButton.position((windowWidth - submitButton.size().width) / 2, (windowHeight / 2) + 50);
  submitButton.mousePressed(checkAnswer);

  // 建立結果顯示段落
  resultP = createP('');
  resultP.style('font-size', '30px');
  resultP.style('font-weight', 'bold');
  resultP.position((windowWidth - resultP.size().width) / 2, (windowHeight / 2) + 150);

  loadQuestion();
}

function draw() {
  background("#c2c5aa");
}

function loadQuestion() {
  if (currentQuestionIndex < table.getRowCount()) {
    let row = table.getRow(currentQuestionIndex);
    let question = row.get('question');
    let type = row.get('type');
    let correctAnswer = row.get('correct');

    questionP.html(question);
    questionP.position((windowWidth - questionP.size().width) / 2, (windowHeight / 2) - 200);

    if (type === 'multiple-choice') {
      let options = [row.get('option1'), row.get('option2'), row.get('option3'), row.get('option4')];
      radio.html('');
      options.forEach(option => radio.option(option));
      radio.value('');
      radio.show();
      input.hide();
    } else if (type === 'fill-in-the-blank') {
      radio.hide();
      input.value('');
      input.show();
    }

    submitButton.html('送出');
    submitButton.mousePressed(checkAnswer);
  } else {
    showResults();
  }
}

function checkAnswer() {
  const row = table.getRow(currentQuestionIndex);
  const correctAnswer = row.get('correct').trim(); // 確保正確答案沒有多餘的空格
  const type = row.get('type');
  let answer;

  if (type === 'multiple-choice') {
    answer = radio.value();
  } else if (type === 'fill-in-the-blank') {
    answer = input.value().trim(); // 確保輸入的答案沒有多餘的空格
  }

  if (answer === correctAnswer) {
    resultP.html('答對了！');
    resultP.style('color', '#415a77');
    correctCount++;
    correctCountP.html(`答對題數：${correctCount}`);
  } else {
    resultP.html('答錯了！');
    resultP.style('color', '#780000');
    incorrectCount++;
    incorrectCountP.html(`答錯題數：${incorrectCount}`);
  }

  if (currentQuestionIndex < table.getRowCount() - 1) {
    submitButton.html('下一題');
    submitButton.mousePressed(nextQuestion);
  } else {
    showResults();
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

function showResults() {
  questionP.html('測驗結束！');
  radio.hide();
  input.hide();
  submitButton.hide();
  resultP.html(`答對數：${correctCount}，答錯數：${incorrectCount}`);
  resultP.style('color', '#283618');
}