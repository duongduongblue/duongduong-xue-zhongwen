const fs = require('fs');
const path = require('path');

const root = process.cwd();
const seedPath = path.join(root, 'src', 'data', 'app-seed.ts');
const curriculumPath = path.join(root, 'src', 'data', 'curriculum-hsk1.ts');
const datasetsDir = path.join(root, '..', 'datasets');
const docsDir = path.join(root, 'docs');

const rawWords = JSON.parse(fs.readFileSync(path.join(root, '..', 'datasets', 'chinese-daily-hsk1-full-100.json'), 'utf8'));
const wordByHanzi = new Map(rawWords.map((word) => [word.hanzi, word]));

const lessonDefs = [
  {
    id: 'HSK1-M1-L1', moduleId: 'hsk1-module-1', moduleTitle: 'Survival Basics',
    lessonTitleVi: 'Chào hỏi cơ bản', lessonTitleZh: '问候语', shortTitleVi: 'Chào hỏi', shortTitleZh: '问候',
    words: ['你好', '谢谢', '再见', '请', '对不起', '没关系'],
  },
  {
    id: 'HSK1-M1-L2', moduleId: 'hsk1-module-1', moduleTitle: 'Survival Basics',
    lessonTitleVi: 'Giới thiệu bản thân', lessonTitleZh: '自我介绍', shortTitleVi: 'Giới thiệu', shortTitleZh: '介绍',
    words: ['我', '你', '他', '她', '我们', '名字', '叫', '是', '中国'],
  },
  {
    id: 'HSK1-M1-L3', moduleId: 'hsk1-module-1', moduleTitle: 'Survival Basics',
    lessonTitleVi: 'Hỏi đáp cơ bản', lessonTitleZh: '基本问答', shortTitleVi: 'Hỏi đáp', shortTitleZh: '提问',
    words: ['这', '那', '什么', '哪', '谁', '几', '多少'],
  },
  {
    id: 'HSK1-M2-L4', moduleId: 'hsk1-module-2', moduleTitle: 'People & Daily Life',
    lessonTitleVi: 'Gia đình và người thân', lessonTitleZh: '家庭', shortTitleVi: 'Gia đình', shortTitleZh: '家庭',
    words: ['人', '家', '妈妈', '爸爸', '朋友', '猫', '狗'],
  },
  {
    id: 'HSK1-M2-L5', moduleId: 'hsk1-module-2', moduleTitle: 'People & Daily Life',
    lessonTitleVi: 'Trường lớp và học tập', lessonTitleZh: '学校', shortTitleVi: 'Trường lớp', shortTitleZh: '学校',
    words: ['学生', '老师', '学校', '书', '汉语', '学习', '读', '写', '听', '说'],
  },
  {
    id: 'HSK1-M2-L6', moduleId: 'hsk1-module-2', moduleTitle: 'People & Daily Life',
    lessonTitleVi: 'Ăn uống hằng ngày', lessonTitleZh: '吃喝', shortTitleVi: 'Ăn uống', shortTitleZh: '饮食',
    words: ['水', '茶', '饭', '苹果', '吃', '喝', '想'],
  },
  {
    id: 'HSK1-M3-L7', moduleId: 'hsk1-module-3', moduleTitle: 'Numbers, Time & Movement',
    lessonTitleVi: 'Số đếm cơ bản', lessonTitleZh: '数字', shortTitleVi: 'Số đếm', shortTitleZh: '数字',
    words: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
  },
  {
    id: 'HSK1-M3-L8', moduleId: 'hsk1-module-3', moduleTitle: 'Numbers, Time & Movement',
    lessonTitleVi: 'Thời gian và lịch', lessonTitleZh: '时间', shortTitleVi: 'Thời gian', shortTitleZh: '时间',
    words: ['今天', '明天', '昨天', '现在', '点', '分钟', '月', '日', '星期'],
  },
  {
    id: 'HSK1-M3-L9', moduleId: 'hsk1-module-3', moduleTitle: 'Numbers, Time & Movement',
    lessonTitleVi: 'Đi lại và nơi chốn', lessonTitleZh: '出行', shortTitleVi: 'Di chuyển', shortTitleZh: '出行',
    words: ['去', '来', '回', '住', '车', '出租车', '飞机', '门', '医院', '商店'],
  },
  {
    id: 'HSK1-M4-L10', moduleId: 'hsk1-module-4', moduleTitle: 'Core Actions & Description',
    lessonTitleVi: 'Hành động cơ bản', lessonTitleZh: '基本动作', shortTitleVi: 'Hành động', shortTitleZh: '动作',
    words: ['看', '买', '开', '坐', '工作', '会', '能', '爱', '喜欢'],
  },
  {
    id: 'HSK1-M4-L11', moduleId: 'hsk1-module-4', moduleTitle: 'Core Actions & Description',
    lessonTitleVi: 'Mô tả cơ bản', lessonTitleZh: '基本描述', shortTitleVi: 'Mô tả', shortTitleZh: '描述',
    words: ['大', '小', '多', '少', '好', '冷', '热', '忙', '累', '高兴'],
  },
  {
    id: 'HSK1-M4-L12', moduleId: 'hsk1-module-4', moduleTitle: 'Core Actions & Description',
    lessonTitleVi: 'Tình huống hằng ngày', lessonTitleZh: '日常情景', shortTitleVi: 'Tình huống', shortTitleZh: '情景',
    words: ['不', '有', '没有', '天气', '下雨', '钱'],
  },
];

const structured = lessonDefs.flatMap((lesson, lessonIndex) =>
  lesson.words.map((hanzi, wordIndex) => {
    const word = wordByHanzi.get(hanzi);
    if (!word) throw new Error(`Missing word: ${hanzi}`);
    return {
      id: word.id,
      level: 'HSK1',
      moduleId: lesson.moduleId,
      moduleTitle: lesson.moduleTitle,
      lessonId: lesson.id,
      lessonTitleVi: lesson.lessonTitleVi,
      lessonTitleZh: lesson.lessonTitleZh,
      shortTitleVi: lesson.shortTitleVi,
      shortTitleZh: lesson.shortTitleZh,
      lessonOrder: lessonIndex + 1,
      wordOrder: wordIndex + 1,
      hanzi: word.hanzi,
      pinyin: word.pinyin,
      meaning_vi: word.meaning_vi,
      meaning_en: word.meaning_en,
      part_of_speech: word.part_of_speech || '',
      example_cn: word.example_cn || '',
      example_translation: word.example_translation || '',
      tags: word.tags || [],
      frequency_band: word.frequency_band || 'high',
    };
  })
);

const jsonOut = {
  meta: {
    level: 'HSK1',
    mappedWordCount: structured.length,
    lessonCount: lessonDefs.length,
    source: 'DuongDuong HSK1 structured mapping',
  },
  words: structured,
};

const csvHeaders = [
  'id','level','moduleId','moduleTitle','lessonId','lessonTitleVi','lessonTitleZh','shortTitleVi','shortTitleZh','lessonOrder','wordOrder','hanzi','pinyin','meaning_vi','meaning_en','part_of_speech','example_cn','example_translation','tags','frequency_band'
];
const csvEscape = (value) => {
  const s = Array.isArray(value) ? value.join('|') : String(value ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const csv = [csvHeaders.join(',')]
  .concat(structured.map((row) => csvHeaders.map((header) => csvEscape(row[header])).join(',')))
  .join('\n');

fs.writeFileSync(path.join(datasetsDir, 'duongduong-hsk1-structured-actual.json'), JSON.stringify(jsonOut, null, 2), 'utf8');
fs.writeFileSync(path.join(datasetsDir, 'duongduong-hsk1-structured-actual.csv'), csv, 'utf8');
console.log(`Generated structured HSK1 dataset: ${structured.length} rows`);
