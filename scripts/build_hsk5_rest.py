#!/usr/bin/env python3
"""Turn authored HSK5 cards into the JSON the app loads."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PARTS = ROOT / "content" / "hsk5" / "parts"
PINYIN_PATH = ROOT / "content" / "hsk5" / "pinyin-map.json"
OUT = ROOT / "content" / "hsk5" / "hsk5-level5-rest.json"

TOPICS = {
    "home": ("hsk5-module-11", "起居", "Nhà cửa và đồ dùng", "#6D4C41"),
    "people": ("hsk5-module-12", "人物", "Con người và tính cách", "#8E24AA"),
    "feel": ("hsk5-module-13", "情感", "Cảm xúc", "#AD1457"),
    "study": ("hsk5-module-14", "学习", "Học tập", "#1565C0"),
    "work": ("hsk5-module-15", "事务", "Công việc và thủ tục", "#4527A0"),
    "society": ("hsk5-module-16", "社会", "Xã hội", "#6B2FA0"),
    "money": ("hsk5-module-17", "经济", "Kinh tế và tiêu dùng", "#C0392B"),
    "nature": ("hsk5-module-18", "自然", "Thiên nhiên", "#2E7D32"),
    "body": ("hsk5-module-19", "健康", "Sức khỏe và cơ thể", "#00897B"),
    "food": ("hsk5-module-20", "饮食", "Ăn uống", "#EF6C00"),
    "move": ("hsk5-module-21", "出行", "Đi lại và nơi chốn", "#0277BD"),
    "culture": ("hsk5-module-22", "文化", "Văn hóa", "#6A1B9A"),
    "talk": ("hsk5-module-23", "表达", "Diễn đạt", "#3949AB"),
    "think": ("hsk5-module-24", "思维", "Tư duy", "#5E35B1"),
    "desc": ("hsk5-module-25", "描述", "Miêu tả", "#00838F"),
}

ALLOWED = set(TOPICS)


def chunks(items, size=10, minimum=4):
    count = len(items)
    if count == 0:
        return []
    lesson_count = max(1, (count + size - 1) // size)
    while lesson_count > 1 and count / lesson_count < minimum:
        lesson_count -= 1
    base, extra = divmod(count, lesson_count)
    grouped = []
    index = 0
    for lesson_index in range(lesson_count):
        take = base + (1 if lesson_index < extra else 0)
        grouped.append(items[index : index + take])
        index += take
    return grouped


def main():
    pinyin = json.loads(PINYIN_PATH.read_text())
    for hanzi, reading in list(pinyin.items()):
        if reading[:1].isupper():
            pinyin[hanzi] = reading[0].lower() + reading[1:]

    cards = []
    seen = set()
    for path in sorted(PARTS.glob("*.jsonl")):
        for line_number, line in enumerate(path.read_text().splitlines(), 1):
            if not line.strip():
                continue
            card = json.loads(line)
            hanzi = card["h"]
            if hanzi in seen:
                raise SystemExit(f"duplicate {hanzi} in {path.name}:{line_number}")
            seen.add(hanzi)
            if hanzi not in pinyin:
                raise SystemExit(f"no pinyin for {hanzi}")
            if hanzi not in card["zh"]:
                raise SystemExit(f"example does not contain {hanzi}")
            if len(card.get("c") or []) != 3:
                raise SystemExit(f"{hanzi} needs 3 collocations")
            if card.get("t") not in ALLOWED:
                raise SystemExit(f"bad topic for {hanzi}: {card.get('t')}")
            for field in ("vi", "en", "zh", "ve", "n"):
                if not str(card.get(field, "")).strip():
                    raise SystemExit(f"empty {field} on {hanzi}")
            cards.append(card)

    buckets = {topic: [] for topic in TOPICS}
    for card in cards:
        buckets[card["t"]].append(card)

    lessons = []
    words = []
    lesson_number = 16
    serial = 1
    for topic, (module_id, title_zh, topic_vi, color) in TOPICS.items():
        for group in chunks(buckets[topic]):
            lessons.append(
                {
                    "id": f"HSK5-F1-L{lesson_number}",
                    "moduleId": module_id,
                    "title": f"{lesson_number} · {title_zh}",
                    "topic": f"{title_zh} / {topic_vi}",
                    "color": color,
                    "wordCount": len(group),
                }
            )
            for card in group:
                words.append(
                    {
                        "id": f"hsk5_rest_{serial:04d}",
                        "level": "HSK5",
                        "hanzi": card["h"],
                        "pinyin": pinyin[card["h"]],
                        "display_meaning_vi": card["vi"],
                        "meaning_en": card["en"],
                        "collocations": card["c"],
                        "example_sentences": [{"zh": card["zh"], "vi": card["ve"]}],
                        "app_note_vi": card["n"],
                        "app_synonym_note_vi": card.get("s") or "",
                    }
                )
                serial += 1
            lesson_number += 1

    short = [lesson["id"] for lesson in lessons if lesson["wordCount"] < 4]
    if short:
        raise SystemExit(f"lessons under 4 words: {short}")

    OUT.write_text(json.dumps({"lessons": lessons, "words": words}, ensure_ascii=False, indent=2) + "\n")
    print(f"words {len(words)} lessons {len(lessons)} -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
