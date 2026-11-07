import type { Lesson, VocabWord } from '../types';
import enriched0001To0010 from '../../docs/hsk4-0001-0010-enriched.json';
import enriched0011To0020 from '../../docs/hsk4-0011-0020-enriched.json';
import enriched0021To0030 from '../../docs/hsk4-0021-0030-enriched.json';
import enriched0031To0040 from '../../docs/hsk4-0031-0040-enriched.json';
import enriched0041To0050 from '../../docs/hsk4-0041-0050-enriched.json';
import enriched0051To0060 from '../../docs/hsk4-0051-0060-enriched.json';

type EnrichedWord = {
  id: string;
  hanzi: string;
  pinyin: string;
  topic_id?: string;
  display_meaning_vi?: string;
  meaning_en?: string;
  app_note_vi?: string;
  app_synonym_note_vi?: string;
  collocations?: string[];
  example_sentences?: Array<{ zh: string; vi?: string }>;
};

type FocusLessonDef = {
  id: string;
  moduleId: string;
  title: string;
  topic: string;
  color: string;
};

const sourceWords = [
  ...(enriched0001To0010 as EnrichedWord[]),
  ...(enriched0011To0020 as EnrichedWord[]),
  ...(enriched0021To0030 as EnrichedWord[]),
  ...(enriched0031To0040 as EnrichedWord[]),
  ...(enriched0041To0050 as EnrichedWord[]),
  ...(enriched0051To0060 as EnrichedWord[]),
].filter((word, index, words) => words.findIndex((item) => item.hanzi === word.hanzi) === index);

const FOCUS_LESSONS: FocusLessonDef[] = [
  {
    id: 'HSK4-F1-L1',
    moduleId: 'hsk4-module-1',
    title: '1 · 安排',
    topic: '安排与工作 / sắp xếp · Công việc',
    color: '#455A64',
  },
  {
    id: 'HSK4-F1-L2',
    moduleId: 'hsk4-module-2',
    title: '2 · 毕业',
    topic: '毕业与学习 / tốt nghiệp · Học tập',
    color: '#0D47A1',
  },
  {
    id: 'HSK4-F1-L3',
    moduleId: 'hsk4-module-3',
    title: '3 · 爱情',
    topic: '爱情与心情 / tình yêu · Cảm xúc',
    color: '#AD1457',
  },
  {
    id: 'HSK4-F1-L4',
    moduleId: 'hsk4-module-4',
    title: '4 · 父亲',
    topic: '父亲与人物 / bố · Con người',
    color: '#6A1B9A',
  },
  {
    id: 'HSK4-F1-L5',
    moduleId: 'hsk4-module-5',
    title: '5 · 安全',
    topic: '安全与生活 / an toàn · Đời sống',
    color: '#2E7D32',
  },
  {
    id: 'HSK4-F1-L6',
    moduleId: 'hsk4-module-6',
    title: '6 · 出发',
    topic: '出发与出行 / khởi hành · Đi lại',
    color: '#E65100',
  },
];

export const hsk4FocusWords: VocabWord[] = sourceWords.map((word, index) => {
  const lesson = FOCUS_LESSONS[Math.floor(index / 10)];
  const example = word.example_sentences?.[0];
  const collocations = word.collocations ?? [];
  return {
    id: word.id,
    level: 'HSK4',
    lessonId: lesson.id,
    moduleId: lesson.moduleId,
    hanzi: word.hanzi,
    pinyin: word.pinyin,
    meaningVi: word.display_meaning_vi || '',
    meaningEn: word.meaning_en || word.display_meaning_vi || '',
    exampleCn: example?.zh || collocations.join(' · '),
    exampleVi: example?.vi || '',
    appNoteVi: word.app_note_vi,
    appSynonymNoteVi: word.app_synonym_note_vi,
    collocationTop: collocations.slice(0, 3),
    topicId: word.topic_id,
  };
});

export const hsk4FocusLessons: Lesson[] = FOCUS_LESSONS.map((lesson) => ({
  id: lesson.id,
  levelId: 'HSK4',
  moduleId: lesson.moduleId,
  title: lesson.title,
  topic: lesson.topic,
  color: lesson.color,
  words: hsk4FocusWords.filter((word) => word.lessonId === lesson.id),
}));
