const question_list = [
  {
    //問題1
    question: 'この中で赤い果物はどれでしょうか？',
    answers: ['みかん','リンゴ','レモン','スイカ'],
    correct: 'リンゴ', //〇正解
    almost: 'スイカ', //△惜しい
  },
  {
    //問題2
    question: 'ピカチュウをライチュウに進化させるために必要な事は？',
    answers: ['サトシの決断力','じしゃく','かみなりのいし','ひかりいし'],
    correct: 'かみなりのいし',
    almost: 'サトシの決断力', //△惜しい
  },
  {
    //問題3
    question: '次の中で飲み物ではないのはどれでしょうか？',
    answers: ['コーラ','牛乳','汚い水','カレー'],
    correct: '汚い水',
    almost: 'カレー', //△惜しい
  },
  {
    //問題4
    question: '犬も歩けば？',
    answers: ['疲れる','棒に当たる','木から落ちる','散歩'],
    correct: '棒に当たる',
    almost: '疲れる', //△惜しい
  },
  {
    //問題5
    question: 'ドラえもんに登場するスネ夫の名字は？？',
    answers: ['関','源','野比','骨川'],
    correct: '骨川',
    almost: '関', //△惜しい
  },
  {
    //問題6
    question: 'お酢に卵を殻ごといれると卵はどうなる？',
    answers: ['透明な卵になる','鏡のようになんでもうつる卵になる','卵が溶けてなくなる','卵が石のように堅くなる'],
    correct: '透明な卵になる',
    almost: '卵が溶けてなくなる', //△惜しい
  },
  {
    //問題7
    question: 'しゃっくりはある調味料をなめると止まります。ある調味料とは？',
    answers: ['息を止める','砂糖','醤油','塩'],
    correct: '砂糖',
    almost: '息を止める', //△惜しい
  },
  {
    //問題8
    question: 'おぼうさんが木魚をたたく意味はなんでしょう？',
    answers: ['お経にリズムをつけるため','亡くなった人が天国にいけるようにと祈るため','眠くならないようにするため','悪い霊を寄せ付けないため'],
    correct: '眠くならないようにするため',
    almost: 'お経にリズムをつけるため', //△惜しい
  },
  {
    //問題9
    question: '大根おろしはあるすり方をすると、辛くなります。そのすり方とは？',
    answers: ['早くする','力を込めてする','力を弱めてする','愛情を込めてする'],
    correct: '早くする',
    almost: '愛情を込めてする', //△惜しい
  },
  {
    //問題10
    question: '次の野菜の名前うち1つは日本語ではありません。その野菜とは？',
    answers: ['シイタケ','レンコン','オクラ','ダイコン'],
    correct: 'オクラ',
    almost: 'レンコン', //△惜しい
  },
];

const question_all = question_list.length; //問題の総数
let question_count = 0; //何問答えたかの数
let score = 0; //点数
let answer_count = 0; //回答数
let close_count = 0;
let answer_button = document.getElementsByTagName('button');
let randomIndexes = [];
const maxQuestions = Math.min(5, question_list.length); // 5問までとする

const question_switch = () => {

  // ランダムな質問のインデックスを選択
  while (randomIndexes.length < maxQuestions) {
    const randomIndex = Math.floor(Math.random() * question_list.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }

  // 質問文を表示
  document.getElementById('question').innerText = 
  question_list[randomIndexes[question_count]].question;

  // 答えの数だけループ
  for (let count = 0; count < question_list[randomIndexes[question_count]].answers.length; count++) {
    // ボタンのvalueを設定
    document.getElementsByTagName('button')[count].value = 
    question_list[randomIndexes[question_count]].answers[count];
    // ボタンのテキストを設定
    document.getElementsByClassName('answer')[count].innerText = 
    question_list[randomIndexes[question_count]].answers[count];
  }
};

// 関数を呼び出してランダムな質問と選択肢を表示
question_switch();

for(let i = 0; i < answer_button.length; i++){
  answer_button[i].addEventListener('click', () =>{
    if(answer_button[i].value == question_list[randomIndexes[question_count]].correct){
      document.getElementById('result')
      .innerHTML = '正解！';
      score += 20;
      answer_count++;
    }else if(answer_button[i].value == question_list[randomIndexes[question_count]].almost){
      document.getElementById('result')
      .innerHTML = 'おしい！';
      score += 10;
      close_count++;
    }else{
      document.getElementById('result')
      .innerHTML = '不正解！';
    }
    setTimeout(function(){
      document.getElementById('result')
      .innerHTML = '';
    }, 1000); //正誤を次の問題に繋げないために
    question_count++;

    //答えたら問題の切り替え
    if(question_count < 5 ) {
      setTimeout(function(){
        question_switch(); //2問目以降
      }, 1000);//ミリ秒
    }else {
      setTimeout(function(){
        document.getElementById('result').innerHTML = 
        '問題が解き終わりました！<br>あなたは全'+ 5 + '問中、' + answer_count + '問正解！' + close_count + '問惜しかったです！' 
        + '<br>あなたの点数は'+ score + '点です！';
      },1000);
    }
  });
}