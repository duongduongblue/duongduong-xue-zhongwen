import type { Lesson, VocabWord } from '../types';
import enrichedTop10 from '../../docs/hsk5-batch1-top10-enriched.json';
import enriched11To20 from '../../docs/hsk5-batch1-11-20-enriched.json';
import enriched21To30 from '../../docs/hsk5-batch1-21-30-enriched.json';
import enriched31To40 from '../../docs/hsk5-batch1-31-40-enriched.json';
import enriched41To50 from '../../docs/hsk5-batch1-41-50-enriched.json';
import enriched51To60 from '../../docs/hsk5-batch2-51-60-enriched.json';
import enriched61To70 from '../../docs/hsk5-batch2-61-70-enriched.json';
import enriched71To80 from '../../docs/hsk5-batch2-71-80-enriched.json';
import enriched81To90 from '../../docs/hsk5-batch2-81-90-enriched.json';
import enriched91To100 from '../../docs/hsk5-batch2-91-100-enriched.json';

type EnrichedWord = {
  id: string;
  level: 'HSK5';
  hanzi: string;
  pinyin: string;
  meaning_vi?: string;
  meaning_en?: string;
  display_meaning_vi?: string;
  app_note_vi?: string;
  app_synonym_note_vi?: string;
  app_collocation_top?: string[];
  collocations?: string[];
  example_sentences?: Array<{ zh: string; vi?: string }>;
  app_example_vi?: string;
};

type FocusLessonDef = {
  id: string;
  moduleId: string;
  title: string;
  topic: string;
  color: string;
};

const sourceWords = [
  ...(enrichedTop10 as EnrichedWord[]),
  ...(enriched11To20 as EnrichedWord[]),
  ...(enriched21To30 as EnrichedWord[]),
  ...(enriched31To40 as EnrichedWord[]),
  ...(enriched41To50 as EnrichedWord[]),
  ...(enriched51To60 as EnrichedWord[]),
  ...(enriched61To70 as EnrichedWord[]),
  ...(enriched71To80 as EnrichedWord[]),
  ...(enriched81To90 as EnrichedWord[]),
  ...(enriched91To100 as EnrichedWord[]),
];

const FOCUS_LESSONS: FocusLessonDef[] = [
  {
    id: 'HSK5-F1-L1',
    moduleId: 'hsk5-module-1',
    title: '1 · 社会',
    topic: '社会与变化 / Xã hội và thay đổi',
    color: '#6B2FA0',
  },
  {
    id: 'HSK5-F1-L2',
    moduleId: 'hsk5-module-2',
    title: '2 · 工作',
    topic: '工作与决定 / Công việc và quyết định',
    color: '#5A2E8C',
  },
  {
    id: 'HSK5-F1-L3',
    moduleId: 'hsk5-module-3',
    title: '3 · 论证',
    topic: '解释与论证 / Giải thích và lập luận',
    color: '#7E57C2',
  },
  {
    id: 'HSK5-F1-L4',
    moduleId: 'hsk5-module-3',
    title: '4 · 心理',
    topic: '情绪与心理 / Cảm xúc và tâm lý',
    color: '#5E35B1',
  },
  {
    id: 'HSK5-F1-L5',
    moduleId: 'hsk5-module-4',
    title: '5 · 媒体',
    topic: '媒体与正式表达 / Truyền thông và văn phong trang trọng',
    color: '#8E24AA',
  },
  {
    id: 'HSK5-F1-L6',
    moduleId: 'hsk5-module-4',
    title: '6 · 语体',
    topic: '语气与现实 / Sắc thái và thực tế',
    color: '#6A1B9A',
  },
  {
    id: 'HSK5-F1-L7',
    moduleId: 'hsk5-module-5',
    title: '7 · 措施',
    topic: '态度与措施 / Thái độ và biện pháp',
    color: '#4527A0',
  },
  {
    id: 'HSK5-F1-L8',
    moduleId: 'hsk5-module-5',
    title: '8 · 实现',
    topic: '实现与基础 / Hiện thực hóa và nền tảng',
    color: '#3949AB',
  },
  {
    id: 'HSK5-F1-L9',
    moduleId: 'hsk5-module-6',
    title: '9 · 变化',
    topic: '持续与变化 / Duy trì và thay đổi',
    color: '#00897B',
  },
  {
    id: 'HSK5-F1-L10',
    moduleId: 'hsk5-module-6',
    title: '10 · 质量',
    topic: '质量与合作 / Chất lượng và hợp tác',
    color: '#C0392B',
  },
];

export const hsk5FocusWords: VocabWord[] = sourceWords.map((word, index) => {
  const lesson = FOCUS_LESSONS[Math.floor(index / 10)];
  const example = word.example_sentences?.[0];
  const collocations = word.collocations ?? word.app_collocation_top ?? [];

  return {
    id: word.id,
    level: 'HSK5',
    lessonId: lesson.id,
    moduleId: lesson.moduleId,
    hanzi: word.hanzi,
    pinyin: word.pinyin,
    meaningVi: word.display_meaning_vi || word.meaning_vi || word.meaning_en || '',
    meaningEn: word.meaning_en || word.display_meaning_vi || word.meaning_vi || '',
    exampleCn: example?.zh || collocations.join(' · '),
    exampleVi: example?.vi || word.app_example_vi || '',
    appNoteVi: word.app_note_vi,
    appSynonymNoteVi: word.app_synonym_note_vi,
    collocationTop: collocations.slice(0, 3),
  };
});

export const hsk5FocusLessons: Lesson[] = FOCUS_LESSONS.map((lesson) => ({
  id: lesson.id,
  levelId: 'HSK5',
  moduleId: lesson.moduleId,
  title: lesson.title,
  topic: lesson.topic,
  color: lesson.color,
  words: hsk5FocusWords.filter((word) => word.lessonId === lesson.id),
}));
