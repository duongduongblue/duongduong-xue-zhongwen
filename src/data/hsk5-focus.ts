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
import enriched481To490 from '../../docs/hsk5-batch2-481-490-enriched.json';
import enriched491To500 from '../../docs/hsk5-batch2-491-500-enriched.json';
import enriched501To510 from '../../docs/hsk5-batch2-501-510-enriched.json';
import enriched511To520 from '../../docs/hsk5-batch2-511-520-enriched.json';
import enriched521To530 from '../../docs/hsk5-batch2-521-530-enriched.json';
import enriched531To540 from '../../docs/hsk5-batch2-531-540-enriched.json';
import enriched541To550 from '../../docs/hsk5-batch2-541-550-enriched.json';
import enriched551To560 from '../../docs/hsk5-batch2-551-560-enriched.json';
import enriched561To570 from '../../docs/hsk5-batch2-561-570-enriched.json';
import enriched571To580 from '../../docs/hsk5-batch2-571-580-enriched.json';
import enriched581To590 from '../../docs/hsk5-batch2-581-590-enriched.json';
import enriched591To600 from '../../docs/hsk5-batch2-591-600-enriched.json';
import enriched601To610 from '../../docs/hsk5-batch2-601-610-enriched.json';
import enriched611To620 from '../../docs/hsk5-batch2-611-620-enriched.json';
import enriched621To630 from '../../docs/hsk5-batch2-621-630-enriched.json';
import enriched631To640 from '../../docs/hsk5-batch2-631-640-enriched.json';
import enriched641To650 from '../../docs/hsk5-batch2-641-650-enriched.json';
import enriched651To660 from '../../docs/hsk5-batch2-651-660-enriched.json';
import enriched661To670 from '../../docs/hsk5-batch2-661-670-enriched.json';
import enriched671To680 from '../../docs/hsk5-batch2-671-680-enriched.json';
import enriched681To690 from '../../docs/hsk5-batch2-681-690-enriched.json';
import enriched691To700 from '../../docs/hsk5-batch2-691-700-enriched.json';
import enriched701To710 from '../../docs/hsk5-batch2-701-710-enriched.json';
import enriched711To720 from '../../docs/hsk5-batch2-711-720-enriched.json';
import enriched721To730 from '../../docs/hsk5-batch2-721-730-enriched.json';
import enriched731To740 from '../../docs/hsk5-batch2-731-740-enriched.json';
import enriched741To750 from '../../docs/hsk5-batch2-741-750-enriched.json';
import enriched751To760 from '../../docs/hsk5-batch2-751-760-enriched.json';
import enriched761To770 from '../../docs/hsk5-batch2-761-770-enriched.json';
import enriched771To780 from '../../docs/hsk5-batch2-771-780-enriched.json';
import enriched781To790 from '../../docs/hsk5-batch2-781-790-enriched.json';
import enriched791To800 from '../../docs/hsk5-batch2-791-800-enriched.json';
import enriched801To810 from '../../docs/hsk5-batch2-801-810-enriched.json';
import enriched811To820 from '../../docs/hsk5-batch2-811-820-enriched.json';
import enriched821To830 from '../../docs/hsk5-batch2-821-830-enriched.json';
import enriched831To840 from '../../docs/hsk5-batch2-831-840-enriched.json';
import enriched841To850 from '../../docs/hsk5-batch2-841-850-enriched.json';
import enriched851To860 from '../../docs/hsk5-batch2-851-860-enriched.json';
import enriched861To870 from '../../docs/hsk5-batch2-861-870-enriched.json';
import enriched871To880 from '../../docs/hsk5-batch2-871-880-enriched.json';
import enriched881To890 from '../../docs/hsk5-batch2-881-890-enriched.json';
import enriched891To900 from '../../docs/hsk5-batch2-891-900-enriched.json';
import enriched901To910 from '../../docs/hsk5-batch2-901-910-enriched.json';
import enriched911To920 from '../../docs/hsk5-batch2-911-920-enriched.json';
import enriched921To930 from '../../docs/hsk5-batch2-921-930-enriched.json';
import enriched931To940 from '../../docs/hsk5-batch2-931-940-enriched.json';
import enriched941To950 from '../../docs/hsk5-batch2-941-950-enriched.json';
import enriched951To960 from '../../docs/hsk5-batch2-951-960-enriched.json';
import enriched961To970 from '../../docs/hsk5-batch2-961-970-enriched.json';
import enriched971To980 from '../../docs/hsk5-batch2-971-980-enriched.json';
import enriched981To990 from '../../docs/hsk5-batch2-981-990-enriched.json';
import enriched991To1000 from '../../docs/hsk5-batch2-991-1000-enriched.json';
import enriched1001To1010 from '../../docs/hsk5-batch2-1001-1010-enriched.json';
import enriched1011To1020 from '../../docs/hsk5-batch2-1011-1020-enriched.json';
import enriched1021To1030 from '../../docs/hsk5-batch2-1021-1030-enriched.json';
import enriched1031To1040 from '../../docs/hsk5-batch2-1031-1040-enriched.json';
import enriched1041To1050 from '../../docs/hsk5-batch2-1041-1050-enriched.json';
import enriched1051To1060 from '../../docs/hsk5-batch2-1051-1060-enriched.json';
import enriched1061To1070 from '../../docs/hsk5-batch2-1061-1070-enriched.json';
import enriched1071To1080 from '../../docs/hsk5-batch2-1071-1080-enriched.json';
import enriched1081To1090 from '../../docs/hsk5-batch2-1081-1090-enriched.json';
import enriched1091To1100 from '../../docs/hsk5-batch2-1091-1100-enriched.json';

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
  ...(enriched481To490 as EnrichedWord[]),
  ...(enriched491To500 as EnrichedWord[]),
  ...(enriched501To510 as EnrichedWord[]),
  ...(enriched511To520 as EnrichedWord[]),
  ...(enriched521To530 as EnrichedWord[]),
  ...(enriched531To540 as EnrichedWord[]),
  ...(enriched541To550 as EnrichedWord[]),
  ...(enriched551To560 as EnrichedWord[]),
  ...(enriched561To570 as EnrichedWord[]),
  ...(enriched571To580 as EnrichedWord[]),
  ...(enriched581To590 as EnrichedWord[]),
  ...(enriched591To600 as EnrichedWord[]),
  ...(enriched601To610 as EnrichedWord[]),
  ...(enriched611To620 as EnrichedWord[]),
  ...(enriched621To630 as EnrichedWord[]),
  ...(enriched631To640 as EnrichedWord[]),
  ...(enriched641To650 as EnrichedWord[]),
  ...(enriched651To660 as EnrichedWord[]),
  ...(enriched661To670 as EnrichedWord[]),
  ...(enriched671To680 as EnrichedWord[]),
  ...(enriched681To690 as EnrichedWord[]),
  ...(enriched691To700 as EnrichedWord[]),
  ...(enriched701To710 as EnrichedWord[]),
  ...(enriched711To720 as EnrichedWord[]),
  ...(enriched721To730 as EnrichedWord[]),
  ...(enriched731To740 as EnrichedWord[]),
  ...(enriched741To750 as EnrichedWord[]),
  ...(enriched751To760 as EnrichedWord[]),
  ...(enriched761To770 as EnrichedWord[]),
  ...(enriched771To780 as EnrichedWord[]),
  ...(enriched781To790 as EnrichedWord[]),
  ...(enriched791To800 as EnrichedWord[]),
  ...(enriched801To810 as EnrichedWord[]),
  ...(enriched811To820 as EnrichedWord[]),
  ...(enriched821To830 as EnrichedWord[]),
  ...(enriched831To840 as EnrichedWord[]),
  ...(enriched841To850 as EnrichedWord[]),
  ...(enriched851To860 as EnrichedWord[]),
  ...(enriched861To870 as EnrichedWord[]),
  ...(enriched871To880 as EnrichedWord[]),
  ...(enriched881To890 as EnrichedWord[]),
  ...(enriched891To900 as EnrichedWord[]),
  ...(enriched901To910 as EnrichedWord[]),
  ...(enriched911To920 as EnrichedWord[]),
  ...(enriched921To930 as EnrichedWord[]),
  ...(enriched931To940 as EnrichedWord[]),
  ...(enriched941To950 as EnrichedWord[]),
  ...(enriched951To960 as EnrichedWord[]),
  ...(enriched961To970 as EnrichedWord[]),
  ...(enriched971To980 as EnrichedWord[]),
  ...(enriched981To990 as EnrichedWord[]),
  ...(enriched991To1000 as EnrichedWord[]),
  ...(enriched1001To1010 as EnrichedWord[]),
  ...(enriched1011To1020 as EnrichedWord[]),
  ...(enriched1021To1030 as EnrichedWord[]),
  ...(enriched1031To1040 as EnrichedWord[]),
  ...(enriched1041To1050 as EnrichedWord[]),
  ...(enriched1051To1060 as EnrichedWord[]),
  ...(enriched1061To1070 as EnrichedWord[]),
  ...(enriched1071To1080 as EnrichedWord[]),
  ...(enriched1081To1090 as EnrichedWord[]),
  ...(enriched1091To1100 as EnrichedWord[]),
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
  {
    id: 'HSK5-F1-L49',
    moduleId: 'hsk5-module-44',
    title: '49 · 企业',
    topic: '企业与权力 / Doanh nghiệp và quyền lực',
    color: '#B71C1C',
  },
  {
    id: 'HSK5-F1-L50',
    moduleId: 'hsk5-module-45',
    title: '50 · 话题',
    topic: '话题与重复 / Chủ đề và sự lặp lại',
    color: '#4527A0',
  },
  {
    id: 'HSK5-F1-L51',
    moduleId: 'hsk5-module-46',
    title: '51 · 表情',
    topic: '表情与感情 / Nét mặt và cảm xúc',
    color: '#AD1457',
  },
  {
    id: 'HSK5-F1-L52',
    moduleId: 'hsk5-module-47',
    title: '52 · 圈',
    topic: '圈与变化 / Vòng tròn và thay đổi',
    color: '#00838F',
  },
  {
    id: 'HSK5-F1-L53',
    moduleId: 'hsk5-module-48',
    title: '53 · 课程',
    topic: '课程与阅读 / Môn học và việc đọc',
    color: '#1565C0',
  },
  {
    id: 'HSK5-F1-L54',
    moduleId: 'hsk5-module-49',
    title: '54 · 生活',
    topic: '生活与饮食 / Đời sống và ăn uống',
    color: '#EF6C00',
  },
  {
    id: 'HSK5-F1-L55',
    moduleId: 'hsk5-module-50',
    title: '55 · 单位',
    topic: '单位与行业 / Cơ quan và ngành nghề',
    color: '#00695C',
  },
  {
    id: 'HSK5-F1-L56',
    moduleId: 'hsk5-module-51',
    title: '56 · 瞧',
    topic: '话语与语气 / Lời nói và giọng điệu',
    color: '#546E7A',
  },
  {
    id: 'HSK5-F1-L57',
    moduleId: 'hsk5-module-52',
    title: '57 · 体验',
    topic: '体验与心情 / Trải nghiệm và tâm trạng',
    color: '#2E7D32',
  },
  {
    id: 'HSK5-F1-L58',
    moduleId: 'hsk5-module-53',
    title: '58 · 平',
    topic: '形容与差别 / Miêu tả và khác biệt',
    color: '#5D4037',
  },
  {
    id: 'HSK5-F1-L59',
    moduleId: 'hsk5-module-54',
    title: '59 · 手指',
    topic: '身体部位 / Bộ phận cơ thể',
    color: '#6A1B9A',
  },
  {
    id: 'HSK5-F1-L60',
    moduleId: 'hsk5-module-55',
    title: '60 · 堆',
    topic: '家务与饮食 / Việc nhà và ăn uống',
    color: '#0277BD',
  },
  {
    id: 'HSK5-F1-L61',
    moduleId: 'hsk5-module-56',
    title: '61 · 爱护',
    topic: '爱心与态度 / Tấm lòng và thái độ',
    color: '#C62828',
  },
  {
    id: 'HSK5-F1-L62',
    moduleId: 'hsk5-module-57',
    title: '62 · 班主任',
    topic: '课堂与常识 / Lớp học và kiến thức thường thức',
    color: '#37474F',
  },
  {
    id: 'HSK5-F1-L63',
    moduleId: 'hsk5-module-58',
    title: '63 · 称赞',
    topic: '称赞与判断 / Khen và nhận định',
    color: '#6D4C41',
  },
  {
    id: 'HSK5-F1-L64',
    moduleId: 'hsk5-module-59',
    title: '64 · 包裹',
    topic: '家里的物件 / Đồ trong nhà',
    color: '#558B2F',
  },
  {
    id: 'HSK5-F1-L65',
    moduleId: 'hsk5-module-60',
    title: '65 · 岸',
    topic: '时间与自然 / Thời gian và thiên nhiên',
    color: '#283593',
  },
  {
    id: 'HSK5-F1-L66',
    moduleId: 'hsk5-module-61',
    title: '66 · 编辑',
    topic: '实行与传递 / Thi hành và truyền đạt',
    color: '#00897B',
  },
  {
    id: 'HSK5-F1-L67',
    moduleId: 'hsk5-module-62',
    title: '67 · 不得了',
    topic: '情绪与反应 / Cảm xúc và phản ứng',
    color: '#7B1FA2',
  },
  {
    id: 'HSK5-F1-L68',
    moduleId: 'hsk5-module-63',
    title: '68 · 发言',
    topic: '工作与发言 / Công việc và phát biểu',
    color: '#006064',
  },
  {
    id: 'HSK5-F1-L69',
    moduleId: 'hsk5-module-64',
    title: '69 · 本质',
    topic: '本质与程度 / Bản chất và mức độ',
    color: '#BF360C',
  },
  {
    id: 'HSK5-F1-L70',
    moduleId: 'hsk5-module-65',
    title: '70 · 调皮',
    topic: '性格与日常 / Tính cách và đời thường',
    color: '#455A64',
  },
  {
    id: 'HSK5-F1-L71',
    moduleId: 'hsk5-module-66',
    title: '71 · 假装',
    topic: '选择与场合 / Lựa chọn và tình huống',
    color: '#1B5E20',
  },
  {
    id: 'HSK5-F1-L72',
    moduleId: 'hsk5-module-67',
    title: '72 · 长途',
    topic: '路程与转告 / Đường đi và nhắn lại',
    color: '#4A148C',
  },
  {
    id: 'HSK5-F1-L73',
    moduleId: 'hsk5-module-68',
    title: '73 · 包含',
    topic: '词语与连接 / Từ và cách nối',
    color: '#0D47A1',
  },
  {
    id: 'HSK5-F1-L74',
    moduleId: 'hsk5-module-69',
    title: '74 · 分别',
    topic: '分配与分寸 / Phân chia và chừng mực',
    color: '#E65100',
  },
  {
    id: 'HSK5-F1-L75',
    moduleId: 'hsk5-module-70',
    title: '75 · 好奇',
    topic: '态度与评价 / Thái độ và đánh giá',
    color: '#33691E',
  },
  {
    id: 'HSK5-F1-L76',
    moduleId: 'hsk5-module-71',
    title: '76 · 划船',
    topic: '动作 / Động tác',
    color: '#880E4F',
  },
  {
    id: 'HSK5-F1-L77',
    moduleId: 'hsk5-module-72',
    title: '77 · 胡同',
    topic: '街巷与用品 / Ngõ và đồ dùng',
    color: '#3E2723',
  },
  {
    id: 'HSK5-F1-L78',
    moduleId: 'hsk5-module-73',
    title: '78 · 结账',
    topic: '账目与努力 / Tính tiền và nỗ lực',
    color: '#01579B',
  },
  {
    id: 'HSK5-F1-L79',
    moduleId: 'hsk5-module-74',
    title: '79 · 本领',
    topic: '本领与性格 / Bản lĩnh và tính cách',
    color: '#1A237E',
  },
  {
    id: 'HSK5-F1-L80',
    moduleId: 'hsk5-module-75',
    title: '80 · 工厂',
    topic: '工厂与劳动 / Nhà máy và lao động',
    color: '#AD1457',
  },
  {
    id: 'HSK5-F1-L81',
    moduleId: 'hsk5-module-76',
    title: '81 · 相处',
    topic: '相处与读音 / Chung sống và cách đọc',
    color: '#00838F',
  },
  {
    id: 'HSK5-F1-L82',
    moduleId: 'hsk5-module-77',
    title: '82 · 青少年',
    topic: '青少年与家庭 / Thanh thiếu niên và gia đình',
    color: '#C62828',
  },
  {
    id: 'HSK5-F1-L83',
    moduleId: 'hsk5-module-78',
    title: '83 · 天空',
    topic: '天空与食物 / Bầu trời và thức ăn',
    color: '#546E7A',
  },
  {
    id: 'HSK5-F1-L84',
    moduleId: 'hsk5-module-79',
    title: '84 · 下载',
    topic: '下载与纪律 / Tải xuống và kỷ luật',
    color: '#2E7D32',
  },
  {
    id: 'HSK5-F1-L85',
    moduleId: 'hsk5-module-80',
    title: '85 · 密切',
    topic: '密切与判断 / Mật thiết và nhận định',
    color: '#00695C',
  },
  {
    id: 'HSK5-F1-L86',
    moduleId: 'hsk5-module-81',
    title: '86 · 模仿',
    topic: '模仿与传统 / Bắt chước và truyền thống',
    color: '#5D4037',
  },
  {
    id: 'HSK5-F1-L87',
    moduleId: 'hsk5-module-82',
    title: '87 · 延长',
    topic: '延长与变化 / Kéo dài và thay đổi',
    color: '#1565C0',
  },
  {
    id: 'HSK5-F1-L88',
    moduleId: 'hsk5-module-83',
    title: '88 · 招待',
    topic: '招待与规矩 / Tiếp đãi và phép tắc',
    color: '#6A1B9A',
  },
  {
    id: 'HSK5-F1-L89',
    moduleId: 'hsk5-module-84',
    title: '89 · 妇女',
    topic: '妇女与日常 / Phụ nữ và đời thường',
    color: '#EF6C00',
  },
  {
    id: 'HSK5-F1-L90',
    moduleId: 'hsk5-module-85',
    title: '90 · 录音',
    topic: '录音与联系 / Ghi âm và liên lạc',
    color: '#37474F',
  },
  {
    id: 'HSK5-F1-L91',
    moduleId: 'hsk5-module-86',
    title: '91 · 承受',
    topic: '承受与努力 / Chịu đựng và nỗ lực',
    color: '#455A64',
  },
  {
    id: 'HSK5-F1-L92',
    moduleId: 'hsk5-module-87',
    title: '92 · 功能',
    topic: '功能与社会 / Chức năng và xã hội',
    color: '#0D47A1',
  },
  {
    id: 'HSK5-F1-L93',
    moduleId: 'hsk5-module-88',
    title: '93 · 化学',
    topic: '化学与学习 / Hóa học và việc học',
    color: '#1565C0',
  },
  {
    id: 'HSK5-F1-L94',
    moduleId: 'hsk5-module-89',
    title: '94 · 打交道',
    topic: '交际与礼貌 / Giao tiếp và phép lịch sự',
    color: '#00838F',
  },
  {
    id: 'HSK5-F1-L95',
    moduleId: 'hsk5-module-90',
    title: '95 · 嫁',
    topic: '嫁娶与年纪 / Hôn nhân và tuổi tác',
    color: '#AD1457',
  },
  {
    id: 'HSK5-F1-L96',
    moduleId: 'hsk5-module-91',
    title: '96 · 能干',
    topic: '能干与态度 / Tháo vát và thái độ',
    color: '#2E7D32',
  },
  {
    id: 'HSK5-F1-L97',
    moduleId: 'hsk5-module-92',
    title: '97 · 客厅',
    topic: '客厅与用品 / Phòng khách và đồ dùng',
    color: '#5D4037',
  },
  {
    id: 'HSK5-F1-L98',
    moduleId: 'hsk5-module-93',
    title: '98 · 宠物',
    topic: '宠物与自然 / Thú cưng và thiên nhiên',
    color: '#00695C',
  },
  {
    id: 'HSK5-F1-L99',
    moduleId: 'hsk5-module-94',
    title: '99 · 海关',
    topic: '海关与出行 / Hải quan và đi lại',
    color: '#37474F',
  },
  {
    id: 'HSK5-F1-L100',
    moduleId: 'hsk5-module-95',
    title: '100 · 贸易',
    topic: '贸易与农业 / Thương mại và nông nghiệp',
    color: '#E65100',
  },
  {
    id: 'HSK5-F1-L101',
    moduleId: 'hsk5-module-96',
    title: '101 · 内科',
    topic: '内科与穿着 / Sức khỏe và quần áo',
    color: '#6A1B9A',
  },
  {
    id: 'HSK5-F1-L102',
    moduleId: 'hsk5-module-97',
    title: '102 · 名片',
    topic: '名片与文书 / Danh thiếp và giấy tờ',
    color: '#1A237E',
  },
  {
    id: 'HSK5-F1-L103',
    moduleId: 'hsk5-module-98',
    title: '103 · 悄悄',
    topic: '悄悄与请求 / Lén lút và lời thỉnh cầu',
    color: '#C62828',
  },
  {
    id: 'HSK5-F1-L104',
    moduleId: 'hsk5-module-99',
    title: '104 · 平常',
    topic: '平常与规律 / Bình thường và quy luật',
    color: '#546E7A',
  },
  {
    id: 'HSK5-F1-L105',
    moduleId: 'hsk5-module-100',
    title: '105 · 地理',
    topic: '地理与风光 / Địa lý và phong cảnh',
    color: '#455A64',
  },
  {
    id: 'HSK5-F1-L106',
    moduleId: 'hsk5-module-101',
    title: '106 · 日常',
    topic: '日常与日期 / Hàng ngày và ngày tháng',
    color: '#0D47A1',
  },
  {
    id: 'HSK5-F1-L107',
    moduleId: 'hsk5-module-102',
    title: '107 · 说服',
    topic: '说服与谈论 / Thuyết phục và bàn luận',
    color: '#1565C0',
  },
  {
    id: 'HSK5-F1-L108',
    moduleId: 'hsk5-module-103',
    title: '108 · 使劲儿',
    topic: '使劲儿与动作 / Gắng sức và động tác',
    color: '#00838F',
  },
  {
    id: 'HSK5-F1-L109',
    moduleId: 'hsk5-module-104',
    title: '109 · 手续',
    topic: '手续与设备 / Thủ tục và thiết bị',
    color: '#5D4037',
  },
  {
    id: 'HSK5-F1-L110',
    moduleId: 'hsk5-module-105',
    title: '110 · 摄影',
    topic: '摄影与生活 / Nhiếp ảnh và đời sống',
    color: '#6A1B9A',
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
