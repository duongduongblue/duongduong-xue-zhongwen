const fs = require('fs');
const path = require('path');

const root = process.cwd();
const inputPath = path.join(root, '..', 'datasets', 'duongduong-hsk1-structured-actual.json');
const outDir = path.join(root, 'content', 'hsk1');
fs.mkdirSync(outDir, { recursive: true });

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const words = data.words || [];

const lessons = new Map();
for (const word of words) {
  const key = word.lessonId;
  if (!lessons.has(key)) {
    lessons.set(key, {
      lessonId: word.lessonId,
      moduleId: word.moduleId,
      moduleTitle: word.moduleTitle,
      lessonTitleVi: word.lessonTitleVi,
      lessonTitleZh: word.lessonTitleZh,
      shortTitleVi: word.shortTitleVi,
      shortTitleZh: word.shortTitleZh,
      level: word.level,
      words: [],
    });
  }
  lessons.get(key).words.push(word);
}

const lessonList = Array.from(lessons.values()).sort((a, b) => a.lessonId.localeCompare(b.lessonId));

for (const lesson of lessonList) {
  fs.writeFileSync(
    path.join(outDir, `${lesson.lessonId}.json`),
    JSON.stringify(lesson, null, 2),
    'utf8'
  );
}

const summary = {
  level: 'HSK1',
  totalLessons: lessonList.length,
  totalWords: words.length,
  modules: Array.from(new Set(lessonList.map((l) => `${l.moduleId} | ${l.moduleTitle}`))),
  lessons: lessonList.map((lesson) => ({
    lessonId: lesson.lessonId,
    moduleId: lesson.moduleId,
    moduleTitle: lesson.moduleTitle,
    lessonTitleVi: lesson.lessonTitleVi,
    lessonTitleZh: lesson.lessonTitleZh,
    shortTitleVi: lesson.shortTitleVi,
    shortTitleZh: lesson.shortTitleZh,
    wordCount: lesson.words.length,
  })),
};

fs.writeFileSync(path.join(outDir, 'hsk1-content-summary.json'), JSON.stringify(summary, null, 2), 'utf8');

const csvHeaders = [
  'lessonId','moduleId','moduleTitle','lessonTitleVi','lessonTitleZh','shortTitleVi','shortTitleZh','id','hanzi','pinyin','meaning_vi','meaning_en','part_of_speech','example_cn','example_translation','tags','frequency_band'
];
const csvEscape = (value) => {
  const s = Array.isArray(value) ? value.join('|') : String(value ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const csv = [csvHeaders.join(',')]
  .concat(words.map((row) => csvHeaders.map((h) => csvEscape(row[h])).join(',')))
  .join('\n');
fs.writeFileSync(path.join(outDir, 'hsk1-clean-content.csv'), csv, 'utf8');

console.log(`Prepared HSK1 clean content files for ${lessonList.length} lessons and ${words.length} words.`);
