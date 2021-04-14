const jetpack = require('fs-jetpack');
const parse = require('csv-parse/lib/sync');

const allSections = [
  'ESN AKI Deggendorf',
  'ESN Augsburg',
  'ESN Bayreuth',
  'ESN Bochum',
  'ESN Bonn',
  'ESN Braunschweig',
  'ESN Darmstadt',
  'ESN Dortmund',
  'ESN Düsseldorf',
  'ESN Erasmix Medizin Berlin',
  'ESN Frankfurt (Oder)',
  'ESN Frankfurt am Main',
  'ESN Freiburg',
  'ESN Göttingen',
  'ESN Halle (Saale)',
  'ESN Hamburg',
  'ESN Hannover e.V',
  'ESN Heidelberg',
  'ESN Hildesheim',
  'ESN HTW Dresden',
  'ESN Ingolstadt',
  'ESN IPAS Landau',
  'ESN Jena',
  'ESN Karlsruhe',
  'ESN Kiel',
  'ESN Koblenz',
  'ESN Konstanz',
  'ESN Köln',
  'ESN LEI Greifswald',
  'ESN LEI Rostock',
  'ESN LEI STEP Kaiserslautern',
  'ESN MESA München',
  'ESN Potsdam',
  'ESN Saarbrücken',
  'ESN Siegen',
  'ESN Stuttgart',
  'ESN TU Dresden',
  'ESN TUMi München',
  'ESN VISUM Mannheim',
  'ESN Witten/Herdecke',
];
const parsedAnswers = parse(
  jetpack.read('question_answers_all_vol3.csv', 'utf8').trim(),
  // jetpack.read('question_answers_all_vol2.csv', 'utf8').trim(),
  // jetpack.read('question_answers_all.csv', 'utf8').trim(),
  {
    skip_empty_lines: true,
    trim: true,
  }
);
// console.log(parsedAnswers);
const questions = {};
let currentQuestion = '';
for (const entry of parsedAnswers) {
  if (entry[0].includes('Q')) {
    if (entry[2].includes('de')) {
      currentQuestion = entry[1];
      questions[currentQuestion] = { question: { de: entry[1] } };
    } else {
      questions[currentQuestion] = {
        question: { ...questions[currentQuestion].question, en: entry[1] },
      };
    }
  } else {
    const data = questions[currentQuestion];
    const index = parseInt(entry[0].replace('AO', ''), 10) - 1;
    const newAnswers = [...(data.answers ?? [])];
    if (entry[2].includes('de')) {
      newAnswers[index] = { ...newAnswers[index], de: entry[1], id: entry[0] };
    } else {
      newAnswers[index] = { ...newAnswers[index], en: entry[1] };
    }
    questions[currentQuestion] = { ...data, answers: newAnswers };
  }
}
const exportFiles = [
  'results-1.csv',
  'results-2.csv',
  'results-4.csv',
  'results-5.csv',
  'results-6.csv',
  'results-7.csv',
];

exportFiles.map((file) => {
  const parsedResults = parse(jetpack.read(file, 'utf8').trim(), {
    skip_empty_lines: true,
    trim: true,
  });
  const items = parsedResults[0].slice(0, parsedResults[0].length - 1);
  const sections = parsedResults.slice(1);
  const sectionNames = sections.map((s) => s.slice(-1)[0].trim());
  items.forEach((key, index) => {
    const data = questions[key];
    if (!data) {
      console.log(file);
      console.log(key);
      console.log(questions);
    }
    const results = { none: [] };
    let isPublic = true;
    sections.forEach((result) => {
      const questionId = data.answers.find((a) => a.de === result[index]).id;
      if (result.slice(-1)[0].trim() === 'Vote') {
        isPublic = false;
      }
      results[questionId] = [
        ...(results[questionId] ?? []),
        result.slice(-1)[0].trim(),
      ];
      results[questionId].sort();
    });
    if (isPublic) {
      results.none = allSections.filter((s) => !sectionNames.includes(s));
    } else {
      const none = [];
      for (let i = 0; i < allSections.length - sections.length; i++) {
        none[i] = 'Vote';
      }
      results.none = none;
    }
    questions[key] = { ...data, results };
  });
});
jetpack.write('../src/assets/data/results.json', Object.values(questions));
// console.log(questions.get('In der Quarantäne habe ich … bekommen.'));
