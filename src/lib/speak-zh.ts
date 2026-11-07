const CHINESE_LANG = 'zh-CN';

export const canSpeakChinese = () =>
  typeof window !== 'undefined' &&
  typeof window.speechSynthesis !== 'undefined' &&
  typeof window.SpeechSynthesisUtterance !== 'undefined';

const preferredVoice = () => {
  const voices = window.speechSynthesis.getVoices?.() ?? [];
  return (
    voices.find((voice) => voice.lang === CHINESE_LANG) ??
    voices.find((voice) => voice.lang.toLowerCase().replace('_', '-') === 'zh-cn') ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith('zh'))
  );
};

export const speakChinese = (text: string) => {
  const cleaned = text.trim();
  if (!canSpeakChinese() || !cleaned) {
    return false;
  }
  const utterance = new window.SpeechSynthesisUtterance(cleaned);
  utterance.lang = CHINESE_LANG;
  const voice = preferredVoice();
  if (voice) {
    try {
      utterance.voice = voice;
    } catch {
      // A listed voice can still be rejected by the engine. lang zh-CN still applies.
    }
  }
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
};
