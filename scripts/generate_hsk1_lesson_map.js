const fs = require('fs');
const path = require('path');

const root = process.cwd();
const datasetPath = path.join(root, '..', 'datasets', 'chinese-daily-hsk1-full-100.json');
const docsDir = path.join(root, 'docs');

const words = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
const byHanzi = new Map(words.map((w) => [w.hanzi, w]));

const lessons = [
  {
    id: 'HSK1-M1-L1',
    module: 'Survival Basics',
    title_vi: 'Chào hỏi cơ bản',
    title_zh: '问候语',
    short_vi: 'Chào hỏi',
    short_zh: '问候',
    goal: 'Biết chào, cảm ơn, xin lỗi, mời và tạm biệt trong tình huống cơ bản.',
    words: ['你好', '谢谢', '再见', '请', '对不起', '没关系'],
  },
  {
    id: 'HSK1-M1-L2',
    module: 'Survival Basics',
    title_vi: 'Giới thiệu bản thân',
    title_zh: '自我介绍',
    short_vi: 'Giới thiệu',
    short_zh: '介绍',
    goal: 'Nói tôi là ai, tên là gì, người khác là ai.',
    words: ['我', '你', '他', '她', '我们', '名字', '叫', '是', '中国'],
  },
  {
    id: 'HSK1-M1-L3',
    module: 'Survival Basics',
    title_vi: 'Hỏi đáp cơ bản',
    title_zh: '基本问答',
    short_vi: 'Hỏi đáp',
    short_zh: '提问',
    goal: 'Biết hỏi cái gì, ai, đâu, mấy, bao nhiêu.',
    words: ['这', '那', '什么', '哪', '谁', '几', '多少'],
  },
  {
    id: 'HSK1-M2-L4',
    module: 'People & Daily Life',
    title_vi: 'Gia đình và người thân',
    title_zh: '家庭',
    short_vi: 'Gia đình',
    short_zh: '家庭',
    goal: 'Nói về gia đình, bạn bè và người thân quen.',
    words: ['人', '家', '妈妈', '爸爸', '朋友'],
  },
  {
    id: 'HSK1-M2-L5',
    module: 'People & Daily Life',
    title_vi: 'Trường lớp và học tập',
    title_zh: '学校',
    short_vi: 'Trường lớp',
    short_zh: '学校',
    goal: 'Nói về việc học, trường, sách và môn học.',
    words: ['学生', '老师', '学校', '书', '汉语', '学习', '读', '写', '听', '说'],
  },
  {
    id: 'HSK1-M2-L6',
    module: 'People & Daily Life',
    title_vi: 'Ăn uống hằng ngày',
    title_zh: '吃喝',
    short_vi: 'Ăn uống',
    short_zh: '饮食',
    goal: 'Nói về món ăn, đồ uống và nhu cầu ăn uống cơ bản.',
    words: ['水', '茶', '饭', '苹果', '吃', '喝', '想'],
  },
  {
    id: 'HSK1-M3-L7',
    module: 'Numbers, Time & Movement',
    title_vi: 'Số đếm cơ bản',
    title_zh: '数字',
    short_vi: 'Số đếm',
    short_zh: '数字',
    goal: 'Nhận diện và dùng số 1–10.',
    words: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
  },
  {
    id: 'HSK1-M3-L8',
    module: 'Numbers, Time & Movement',
    title_vi: 'Thời gian và lịch',
    title_zh: '时间',
    short_vi: 'Thời gian',
    short_zh: '时间',
    goal: 'Biết diễn đạt hôm nay, ngày mai, giờ giấc và ngày tháng cơ bản.',
    words: ['今天', '明天', '昨天', '现在', '点', '分钟', '月', '日', '星期'],
  },
  {
    id: 'HSK1-M3-L9',
    module: 'Numbers, Time & Movement',
    title_vi: 'Đi lại và nơi chốn',
    title_zh: '出行',
    short_vi: 'Di chuyển',
    short_zh: '出行',
    goal: 'Nói đi đâu, đến đâu và một số nơi chốn cơ bản.',
    words: ['去', '来', '回', '住', '车', '出租车', '飞机', '门', '医院', '商店'],
  },
  {
    id: 'HSK1-M4-L10',
    module: 'Core Actions & Description',
    title_vi: 'Hành động cơ bản',
    title_zh: '基本动作',
    short_vi: 'Hành động',
    short_zh: '动作',
    goal: 'Diễn đạt các hành động thường gặp trong học tập và đời sống.',
    words: ['看', '买', '开', '坐', '工作', '会', '能', '爱', '喜欢'],
  },
  {
    id: 'HSK1-M4-L11',
    module: 'Core Actions & Description',
    title_vi: 'Mô tả cơ bản',
    title_zh: '基本描述',
    short_vi: 'Mô tả',
    short_zh: '描述',
    goal: 'Mô tả người, vật và cảm giác bằng tính từ cơ bản.',
    words: ['大', '小', '多', '少', '好', '冷', '热', '忙', '累', '高兴'],
  },
  {
    id: 'HSK1-M4-L12',
    module: 'Core Actions & Description',
    title_vi: 'Tình huống hằng ngày',
    title_zh: '日常情景',
    short_vi: 'Tình huống',
    short_zh: '情景',
    goal: 'Ôn tập HSK1 qua các ngữ cảnh hằng ngày và từ chức năng còn lại.',
    words: ['不', '有', '没有', '天气', '下雨', '钱'],
  },
];

const rows = [];
const used = new Set();
for (const lesson of lessons) {
  for (const hanzi of lesson.words) {
    const word = byHanzi.get(hanzi);
    if (!word) throw new Error(`Missing word in dataset: ${hanzi}`);
    if (used.has(word.id)) throw new Error(`Duplicate assignment: ${hanzi}`);
    used.add(word.id);
    rows.push({
      lesson_id: lesson.id,
      lesson_title_vi: lesson.title_vi,
      lesson_title_zh: lesson.title_zh,
      word_id: word.id,
      hanzi: word.hanzi,
      pinyin: word.pinyin,
      meaning_vi: word.meaning_vi,
      meaning_en: word.meaning_en,
      notes: lesson.goal,
    });
  }
}

const unassigned = words.filter((w) => !used.has(w.id));
const summary = [
  '# DuongDuong 学中文 — HSK1 Lesson-to-Word Mapping (Actual)',
  '',
  `Total mapped words: ${rows.length}`,
  `Unassigned words from current 100-word starter dataset: ${unassigned.length}`,
  '',
  '## Lesson counts',
  ...lessons.map((l) => `- ${l.id} — ${l.title_vi} / ${l.title_zh}: ${l.words.length} words`),
  '',
  '## Unassigned words (should be added in later expansion or moved into review/mixed lessons)',
  ...unassigned.map((w) => `- ${w.hanzi} (${w.pinyin}) — ${w.meaning_vi}`),
  '',
].join('\n');

const csvHeaders = ['lesson_id','lesson_title_vi','lesson_title_zh','word_id','hanzi','pinyin','meaning_vi','meaning_en','notes'];
const csvEscape = (s) => {
  const v = String(s ?? '');
  return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
};
const csv = [csvHeaders.join(',')]
  .concat(rows.map((row) => csvHeaders.map((h) => csvEscape(row[h])).join(',')))
  .join('\n');

fs.writeFileSync(path.join(docsDir, 'hsk1-lesson-word-map-actual.csv'), csv, 'utf8');
fs.writeFileSync(path.join(docsDir, 'hsk1-lesson-word-map-summary.md'), summary, 'utf8');
console.log(`Mapped ${rows.length} words. Unassigned: ${unassigned.length}`);