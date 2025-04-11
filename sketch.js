let table; // 用於存放 CSV 資料
let question = "";
let options = [];
let correctAnswer = "";
let radio;
let submitButton;
let result = "";
let currentQuestionIndex = 0; // 當前題目索引
let correctCount = 0; // 答對題數
let incorrectCount = 0; // 答錯題數

function preload() {
  // 載入 CSV 檔案
  table = loadTable("questions.csv", "csv", "header");
  if (table.getRowCount() === 0) {
    console.error("CSV 資料未正確載入！");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadQuestion(currentQuestionIndex);

  // 建立選項 (radio 按鈕)
  radio = createRadio();
  radio.style("font-size", "35px");
  radio.style("color", "#95b8d1");
  radio.position(windowWidth / 2 - 100, windowHeight / 2);

  // 建立按鈕
  submitButton = createButton("下一題");
  submitButton.style("font-size", "20px");
  submitButton.position(windowWidth / 2 - 30, windowHeight / 2 + 140);
  submitButton.mousePressed(handleButtonClick);
}

function draw() {
  background("#809bce");
  fill("#d6eadf");
  noStroke();
  let rectWidth = windowWidth / 2;
  let rectHeight = windowHeight / 2;
  let rectX = (windowWidth - rectWidth) / 2;
  let rectY = (windowHeight - rectHeight) / 2;
  rect(rectX, rectY, rectWidth, rectHeight);

  fill("#95b8d1");
  textSize(35);
  textAlign(CENTER, CENTER);
  text(question, windowWidth / 2, windowHeight / 2 - 50);

  fill("#000");
  textSize(25);
  text(result, windowWidth / 2, windowHeight / 2 + 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  radio.position(windowWidth / 2 - 100, windowHeight / 2);
  submitButton.position(windowWidth / 2 - 30, windowHeight / 2 + 140);
}

function loadQuestion(index) {
  if (index < table.getRowCount()) {
    let row = table.getRow(index);
    question = row.get("question");
    options = [
      row.get("option1"),
      row.get("option2"),
      row.get("option3"),
      row.get("option4"),
    ];
    correctAnswer = row.get("answer");

    if (radio) {
      radio.elt.innerHTML = ""; // 清空舊的選項
      for (let i = 0; i < options.length; i++) {
        radio.option(options[i], options[i]);
      }
    }
  } else {
    question = "測驗結束！";
    options = [];
    correctAnswer = "";
  }
}

function handleButtonClick() {
  if (currentQuestionIndex < table.getRowCount()) {
    checkAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < table.getRowCount()) {
      loadQuestion(currentQuestionIndex);
    } else {
      // 測驗結束
      question = `測驗結束！\n答對題數：${correctCount}\n答錯題數：${incorrectCount}`;
      result = "";
      submitButton.html("再試一次");
    }
  } else {
    // 重置測驗
    resetQuiz();
  }
}

function checkAnswer() {
  let selected = radio.value();
  if (selected === correctAnswer) {
    result = "答對了";
    correctCount++;
  } else {
    result = "答錯了";
    incorrectCount++;
  }
}

function resetQuiz() {
  currentQuestionIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  result = "";
  loadQuestion(currentQuestionIndex);
  submitButton.html("下一題");
}
