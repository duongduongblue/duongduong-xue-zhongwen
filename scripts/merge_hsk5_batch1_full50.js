const fs = require('fs');
const path = require('path');

const root = process.cwd();
const docsDir = path.join(root, 'docs');

const files = [
  'hsk5-batch1-top10-enriched.json',
  'hsk5-batch1-11-20-enriched.json',
  'hsk5-batch1-21-30-enriched.json',
  'hsk5-batch1-31-40-enriched.json',
  'hsk5-batch1-41-50-enriched.json',
];

const merged = files.flatMap((file) => {
  const content = JSON.parse(fs.readFileSync(path.join(docsDir, file), 'utf8'));
  return content;
});

fs.writeFileSync(
  path.join(docsDir, 'hsk5-batch1-full50-enriched.json'),
  JSON.stringify(merged, null, 2),
  'utf8'
);

const headers = [
  'id','level','hanzi','pinyin','display_meaning_vi','meaning_en','part_of_speech','topic_tags','exam_tags','register','grammar_pattern','app_note_vi','app_synonym_note_vi','app_collocation_top','app_example_vi','content_status','needs_reference_check'
];
const csvEscape = (value) => {
  const s = Array.isArray(value) ? value.join('|') : String(value ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const csv = [headers.join(',')]
  .concat(merged.map((row) => headers.map((h) => csvEscape(row[h])).join(',')))
  .join('\n');

fs.writeFileSync(path.join(docsDir, 'hsk5-batch1-full50-enriched.csv'), csv, 'utf8');
console.log(`Merged ${merged.length} HSK5 entries.`);
