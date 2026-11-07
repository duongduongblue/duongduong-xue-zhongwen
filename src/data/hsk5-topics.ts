export const HSK5_TOPICS = [
  { id: 'work', vi: 'Công việc', en: 'Work & business' },
  { id: 'study', vi: 'Học tập', en: 'Education' },
  { id: 'health', vi: 'Sức khỏe', en: 'Health & body' },
  { id: 'nature', vi: 'Thiên nhiên', en: 'Nature & environment' },
  { id: 'emotion', vi: 'Cảm xúc', en: 'Emotions & personality' },
  { id: 'people', vi: 'Con người', en: 'People' },
  { id: 'society', vi: 'Xã hội', en: 'Society & culture' },
  { id: 'money', vi: 'Tiền bạc', en: 'Economy & money' },
  { id: 'tech', vi: 'Công nghệ', en: 'Technology' },
  { id: 'daily', vi: 'Đời sống', en: 'Daily life' },
  { id: 'travel', vi: 'Đi lại', en: 'Travel & transport' },
  { id: 'language', vi: 'Ngôn ngữ', en: 'Language & grammar' },
  { id: 'abstract', vi: 'Khái niệm', en: 'Abstract' },
] as const;

export type Hsk5TopicId = (typeof HSK5_TOPICS)[number]['id'];

export const topicById = (topicId?: string) => HSK5_TOPICS.find((topic) => topic.id === topicId);
