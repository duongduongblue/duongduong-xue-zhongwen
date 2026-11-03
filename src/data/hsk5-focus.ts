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
import enriched101To110 from '../../docs/hsk5-batch2-101-110-enriched.json';
import enriched111To120 from '../../docs/hsk5-batch2-111-120-enriched.json';
import enriched121To130 from '../../docs/hsk5-batch2-121-130-enriched.json';
import enriched131To140 from '../../docs/hsk5-batch2-131-140-enriched.json';
import enriched141To150 from '../../docs/hsk5-batch2-141-150-enriched.json';
import enriched151To160 from '../../docs/hsk5-batch2-151-160-enriched.json';
import enriched161To170 from '../../docs/hsk5-batch2-161-170-enriched.json';
import enriched171To180 from '../../docs/hsk5-batch2-171-180-enriched.json';
import enriched181To190 from '../../docs/hsk5-batch2-181-190-enriched.json';
import enriched191To200 from '../../docs/hsk5-batch2-191-200-enriched.json';
import enriched201To210 from '../../docs/hsk5-batch2-201-210-enriched.json';
import enriched211To220 from '../../docs/hsk5-batch2-211-220-enriched.json';
import enriched221To230 from '../../docs/hsk5-batch2-221-230-enriched.json';
import enriched231To240 from '../../docs/hsk5-batch2-231-240-enriched.json';
import enriched241To250 from '../../docs/hsk5-batch2-241-250-enriched.json';
import enriched251To260 from '../../docs/hsk5-batch2-251-260-enriched.json';
import enriched261To270 from '../../docs/hsk5-batch2-261-270-enriched.json';
import enriched271To280 from '../../docs/hsk5-batch2-271-280-enriched.json';
import enriched281To290 from '../../docs/hsk5-batch2-281-290-enriched.json';
import enriched291To300 from '../../docs/hsk5-batch2-291-300-enriched.json';
import enriched301To310 from '../../docs/hsk5-batch2-301-310-enriched.json';
import enriched311To320 from '../../docs/hsk5-batch2-311-320-enriched.json';
import enriched321To330 from '../../docs/hsk5-batch2-321-330-enriched.json';
import enriched331To340 from '../../docs/hsk5-batch2-331-340-enriched.json';
import enriched341To350 from '../../docs/hsk5-batch2-341-350-enriched.json';
import enriched351To360 from '../../docs/hsk5-batch2-351-360-enriched.json';
import enriched361To370 from '../../docs/hsk5-batch2-361-370-enriched.json';
import enriched371To380 from '../../docs/hsk5-batch2-371-380-enriched.json';
import enriched381To390 from '../../docs/hsk5-batch2-381-390-enriched.json';
import enriched391To400 from '../../docs/hsk5-batch2-391-400-enriched.json';
import enriched401To410 from '../../docs/hsk5-batch2-401-410-enriched.json';
import enriched411To420 from '../../docs/hsk5-batch2-411-420-enriched.json';
import enriched421To430 from '../../docs/hsk5-batch2-421-430-enriched.json';
import enriched431To440 from '../../docs/hsk5-batch2-431-440-enriched.json';
import enriched441To450 from '../../docs/hsk5-batch2-441-450-enriched.json';
import enriched451To460 from '../../docs/hsk5-batch2-451-460-enriched.json';
import enriched461To470 from '../../docs/hsk5-batch2-461-470-enriched.json';
import enriched471To480 from '../../docs/hsk5-batch2-471-480-enriched.json';

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
  ...(enriched101To110 as EnrichedWord[]),
  ...(enriched111To120 as EnrichedWord[]),
  ...(enriched121To130 as EnrichedWord[]),
  ...(enriched131To140 as EnrichedWord[]),
  ...(enriched141To150 as EnrichedWord[]),
  ...(enriched151To160 as EnrichedWord[]),
  ...(enriched161To170 as EnrichedWord[]),
  ...(enriched171To180 as EnrichedWord[]),
  ...(enriched181To190 as EnrichedWord[]),
  ...(enriched191To200 as EnrichedWord[]),
  ...(enriched201To210 as EnrichedWord[]),
  ...(enriched211To220 as EnrichedWord[]),
  ...(enriched221To230 as EnrichedWord[]),
  ...(enriched231To240 as EnrichedWord[]),
  ...(enriched241To250 as EnrichedWord[]),
  ...(enriched251To260 as EnrichedWord[]),
  ...(enriched261To270 as EnrichedWord[]),
  ...(enriched271To280 as EnrichedWord[]),
  ...(enriched281To290 as EnrichedWord[]),
  ...(enriched291To300 as EnrichedWord[]),
  ...(enriched301To310 as EnrichedWord[]),
  ...(enriched311To320 as EnrichedWord[]),
  ...(enriched321To330 as EnrichedWord[]),
  ...(enriched331To340 as EnrichedWord[]),
  ...(enriched341To350 as EnrichedWord[]),
  ...(enriched351To360 as EnrichedWord[]),
  ...(enriched361To370 as EnrichedWord[]),
  ...(enriched371To380 as EnrichedWord[]),
  ...(enriched381To390 as EnrichedWord[]),
  ...(enriched391To400 as EnrichedWord[]),
  ...(enriched401To410 as EnrichedWord[]),
  ...(enriched411To420 as EnrichedWord[]),
  ...(enriched421To430 as EnrichedWord[]),
  ...(enriched431To440 as EnrichedWord[]),
  ...(enriched441To450 as EnrichedWord[]),
  ...(enriched451To460 as EnrichedWord[]),
  ...(enriched461To470 as EnrichedWord[]),
  ...(enriched471To480 as EnrichedWord[]),
].filter((word, index, words) => words.findIndex((item) => item.hanzi === word.hanzi) === index);

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
  {
    id: 'HSK5-F1-L11',
    moduleId: 'hsk5-module-7',
    title: '11 · 态度',
    topic: '观点与态度 / Quan điểm và thái độ',
    color: '#AD1457',
  },
  {
    id: 'HSK5-F1-L12',
    moduleId: 'hsk5-module-8',
    title: '12 · 成长',
    topic: '学习与成长 / Học tập và trưởng thành',
    color: '#2E7D32',
  },
  {
    id: 'HSK5-F1-L13',
    moduleId: 'hsk5-module-8',
    title: '13 · 逻辑',
    topic: '逻辑连接 / Từ nối và lập luận',
    color: '#1565C0',
  },
  {
    id: 'HSK5-F1-L14',
    moduleId: 'hsk5-module-9',
    title: '14 · 关系',
    topic: '关系与情绪 / Quan hệ và cảm xúc',
    color: '#C2185B',
  },
  {
    id: 'HSK5-F1-L15',
    moduleId: 'hsk5-module-10',
    title: '15 · 科技',
    topic: '科技与生活 / Công nghệ và đời sống',
    color: '#0277BD',
  },
  {
    id: 'HSK5-F1-L16',
    moduleId: 'hsk5-module-11',
    title: '16 · 经济',
    topic: '经济与消费 / Kinh tế và tiêu dùng',
    color: '#EF6C00',
  },
  {
    id: 'HSK5-F1-L17',
    moduleId: 'hsk5-module-12',
    title: '17 · 健康',
    topic: '健康与预防 / Sức khỏe và phòng ngừa',
    color: '#00796B',
  },
  {
    id: 'HSK5-F1-L18',
    moduleId: 'hsk5-module-13',
    title: '18 · 规则',
    topic: '规则与公平 / Quy tắc và sự công bằng',
    color: '#455A64',
  },
  {
    id: 'HSK5-F1-L19',
    moduleId: 'hsk5-module-14',
    title: '19 · 事务',
    topic: '事务与行动 / Việc và hành động',
    color: '#E65100',
  },
  {
    id: 'HSK5-F1-L20',
    moduleId: 'hsk5-module-15',
    title: '20 · 思维',
    topic: '思维与判断 / Tư duy và nhận định',
    color: '#303F9F',
  },
  {
    id: 'HSK5-F1-L21',
    moduleId: 'hsk5-module-16',
    title: '21 · 表达',
    topic: '表达与连接 / Diễn đạt và từ nối',
    color: '#00838F',
  },
  {
    id: 'HSK5-F1-L22',
    moduleId: 'hsk5-module-17',
    title: '22 · 公共',
    topic: '政府与社会 / Chính phủ và xã hội',
    color: '#5D4037',
  },
  {
    id: 'HSK5-F1-L23',
    moduleId: 'hsk5-module-18',
    title: '23 · 研究',
    topic: '学习与研究 / Học tập và nghiên cứu',
    color: '#33691E',
  },
  {
    id: 'HSK5-F1-L24',
    moduleId: 'hsk5-module-19',
    title: '24 · 情感',
    topic: '情感与状态 / Cảm xúc và trạng thái',
    color: '#880E4F',
  },
  {
    id: 'HSK5-F1-L25',
    moduleId: 'hsk5-module-20',
    title: '25 · 程度',
    topic: '程度与范围 / Mức độ và phạm vi',
    color: '#546E7A',
  },
  {
    id: 'HSK5-F1-L26',
    moduleId: 'hsk5-module-21',
    title: '26 · 人物',
    topic: '人物与身份 / Con người và vai trò',
    color: '#43A047',
  },
  {
    id: 'HSK5-F1-L27',
    moduleId: 'hsk5-module-22',
    title: '27 · 文化',
    topic: '文化与作品 / Văn hóa và tác phẩm',
    color: '#8D6E63',
  },
  {
    id: 'HSK5-F1-L28',
    moduleId: 'hsk5-module-23',
    title: '28 · 位置',
    topic: '位置与方向 / Vị trí và hướng',
    color: '#1E88E5',
  },
  {
    id: 'HSK5-F1-L29',
    moduleId: 'hsk5-module-24',
    title: '29 · 因果',
    topic: '因果与判断 / Nguyên nhân và nhận định',
    color: '#6D4C41',
  },
  {
    id: 'HSK5-F1-L30',
    moduleId: 'hsk5-module-25',
    title: '30 · 代价',
    topic: '价值与代价 / Giá trị và cái giá',
    color: '#D81B60',
  },
  {
    id: 'HSK5-F1-L31',
    moduleId: 'hsk5-module-26',
    title: '31 · 项目',
    topic: '项目与部门 / Dự án và phòng ban',
    color: '#455A64',
  },
  {
    id: 'HSK5-F1-L32',
    moduleId: 'hsk5-module-27',
    title: '32 · 思想',
    topic: '思想与创造 / Tư tưởng và sáng tạo',
    color: '#5E35B1',
  },
  {
    id: 'HSK5-F1-L33',
    moduleId: 'hsk5-module-28',
    title: '33 · 情绪',
    topic: '情绪与感激 / Tâm trạng và lòng biết ơn',
    color: '#AD1457',
  },
  {
    id: 'HSK5-F1-L34',
    moduleId: 'hsk5-module-29',
    title: '34 · 出行',
    topic: '出行与到达 / Đi lại và đến nơi',
    color: '#0277BD',
  },
  {
    id: 'HSK5-F1-L35',
    moduleId: 'hsk5-module-30',
    title: '35 · 饮食',
    topic: '饮食与味道 / Ăn uống và mùi vị',
    color: '#EF6C00',
  },
  {
    id: 'HSK5-F1-L36',
    moduleId: 'hsk5-module-31',
    title: '36 · 身体',
    topic: '身体与感觉 / Cơ thể và cảm giác',
    color: '#00897B',
  },
  {
    id: 'HSK5-F1-L37',
    moduleId: 'hsk5-module-32',
    title: '37 · 执行',
    topic: '执行与程序 / Chấp hành và quy trình',
    color: '#37474F',
  },
  {
    id: 'HSK5-F1-L38',
    moduleId: 'hsk5-module-33',
    title: '38 · 宣布',
    topic: '宣布与原则 / Tuyên bố và nguyên tắc',
    color: '#6A1B9A',
  },
  {
    id: 'HSK5-F1-L39',
    moduleId: 'hsk5-module-34',
    title: '39 · 身份',
    topic: '身份与时代 / Danh tính và thời đại',
    color: '#5D4037',
  },
  {
    id: 'HSK5-F1-L40',
    moduleId: 'hsk5-module-35',
    title: '40 · 起居',
    topic: '起居与用具 / Nhà cửa và đồ dùng',
    color: '#6D4C41',
  },
  {
    id: 'HSK5-F1-L41',
    moduleId: 'hsk5-module-36',
    title: '41 · 欣赏',
    topic: '欣赏与经典 / Thưởng thức và kinh điển',
    color: '#8E24AA',
  },
  {
    id: 'HSK5-F1-L42',
    moduleId: 'hsk5-module-37',
    title: '42 · 思考',
    topic: '思考与变化 / Suy nghĩ và thay đổi',
    color: '#1565C0',
  },
  {
    id: 'HSK5-F1-L43',
    moduleId: 'hsk5-module-38',
    title: '43 · 经营',
    topic: '经营与合同 / Kinh doanh và hợp đồng',
    color: '#C62828',
  },
  {
    id: 'HSK5-F1-L44',
    moduleId: 'hsk5-module-39',
    title: '44 · 答应',
    topic: '答应与道理 / Nhận lời và lẽ phải',
    color: '#00838F',
  },
  {
    id: 'HSK5-F1-L45',
    moduleId: 'hsk5-module-40',
    title: '45 · 公开',
    topic: '公开与和平 / Công khai và hòa bình',
    color: '#2E7D32',
  },
  {
    id: 'HSK5-F1-L46',
    moduleId: 'hsk5-module-41',
    title: '46 · 夜',
    topic: '夜与自然 / Đêm và thiên nhiên',
    color: '#1565C0',
  },
  {
    id: 'HSK5-F1-L47',
    moduleId: 'hsk5-module-42',
    title: '47 · 程度',
    topic: '程度与形容 / Mức độ và miêu tả',
    color: '#546E7A',
  },
  {
    id: 'HSK5-F1-L48',
    moduleId: 'hsk5-module-43',
    title: '48 · 动作',
    topic: '身体与动作 / Cơ thể và động tác',
    color: '#00695C',
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
