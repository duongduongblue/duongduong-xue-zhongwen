import type { Lesson, VocabWord } from '../types';
import enrichedTop10 from '../../docs/hsk5-batch1-top10-enriched.json';
import enriched11To20 from '../../docs/hsk5-batch1-11-20-enriched.json';

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
  example_sentences?: Array<{ zh: string; vi: string }>;
  app_example_vi?: string;
};

const sourceWords = [...(enrichedTop10 as EnrichedWord[]), ...(enriched11To20 as EnrichedWord[])];

const HSK5_WORD_TO_LESSON: Record<string, { lessonId: string; moduleId: string }> = {
  hsk5_batch1_001: { lessonId: 'HSK5-F1-L1', moduleId: 'hsk5-module-1' },
  hsk5_batch1_002: { lessonId: 'HSK5-F1-L1', moduleId: 'hsk5-module-1' },
  hsk5_batch1_003: { lessonId: 'HSK5-F1-L1', moduleId: 'hsk5-module-1' },
  hsk5_batch1_004: { lessonId: 'HSK5-F1-L1', moduleId: 'hsk5-module-1' },
  hsk5_batch1_005: { lessonId: 'HSK5-F1-L1', moduleId: 'hsk5-module-1' },
  hsk5_batch1_006: { lessonId: 'HSK5-F1-L1', moduleId: 'hsk5-module-1' },
  hsk5_batch1_007: { lessonId: 'HSK5-F1-L1', moduleId: 'hsk5-module-1' },
  hsk5_batch1_008: { lessonId: 'HSK5-F1-L1', moduleId: 'hsk5-module-1' },
  hsk5_batch1_009: { lessonId: 'HSK5-F1-L1', moduleId: 'hsk5-module-1' },
  hsk5_batch1_010: { lessonId: 'HSK5-F1-L1', moduleId: 'hsk5-module-1' },
  hsk5_batch1_011: { lessonId: 'HSK5-F1-L2', moduleId: 'hsk5-module-2' },
  hsk5_batch1_012: { lessonId: 'HSK5-F1-L2', moduleId: 'hsk5-module-2' },
  hsk5_batch1_013: { lessonId: 'HSK5-F1-L2', moduleId: 'hsk5-module-2' },
  hsk5_batch1_014: { lessonId: 'HSK5-F1-L2', moduleId: 'hsk5-module-2' },
  hsk5_batch1_015: { lessonId: 'HSK5-F1-L2', moduleId: 'hsk5-module-2' },
  hsk5_batch1_016: { lessonId: 'HSK5-F1-L2', moduleId: 'hsk5-module-2' },
  hsk5_batch1_017: { lessonId: 'HSK5-F1-L2', moduleId: 'hsk5-module-2' },
  hsk5_batch1_018: { lessonId: 'HSK5-F1-L2', moduleId: 'hsk5-module-2' },
  hsk5_batch1_019: { lessonId: 'HSK5-F1-L2', moduleId: 'hsk5-module-2' },
  hsk5_batch1_020: { lessonId: 'HSK5-F1-L2', moduleId: 'hsk5-module-2' },
};

export const hsk5FocusWords: VocabWord[] = sourceWords.map((word) => ({
  id: word.id,
  level: 'HSK5',
  lessonId: HSK5_WORD_TO_LESSON[word.id].lessonId,
  moduleId: HSK5_WORD_TO_LESSON[word.id].moduleId,
  hanzi: word.hanzi,
  pinyin: word.pinyin,
  meaningVi: word.display_meaning_vi || word.meaning_vi || '',
  meaningEn: word.meaning_en,
  exampleCn: word.example_sentences?.[0]?.zh || (word.app_collocation_top || []).join(' · '),
  exampleVi: word.app_example_vi || word.example_sentences?.[0]?.vi || '',
  appNoteVi: word.app_note_vi,
  appSynonymNoteVi: word.app_synonym_note_vi,
  collocationTop: word.app_collocation_top,
}));

export const hsk5FocusLessons: Lesson[] = [
  {
    id: 'HSK5-F1-L1',
    levelId: 'HSK5',
    moduleId: 'hsk5-module-1',
    title: '社会与变化 / Society & Change',
    topic: '社会、变化与分析 / Society, change and analysis',
    color: '#6B2FA0',
    words: hsk5FocusWords.filter((word) => word.lessonId === 'HSK5-F1-L1'),
  },
  {
    id: 'HSK5-F1-L2',
    levelId: 'HSK5',
    moduleId: 'hsk5-module-2',
    title: '工作与论证 / Work & Reasoning',
    topic: '工作、决定与推理 / Work, decisions and reasoning',
    color: '#5A2E8C',
    words: hsk5FocusWords.filter((word) => word.lessonId === 'HSK5-F1-L2'),
  },
];
