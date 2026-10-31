"use strict";
const key="lehrerzimmer-v1";
const answers=[...document.querySelectorAll("[data-answer]")];
const checks=[...document.querySelectorAll("[data-done]")];
const status=document.querySelector("#save-status");
let memory={};
try {const saved=JSON.parse(localStorage.getItem(key)||"{}");if(saved&&typeof saved==="object"&&!Array.isArray(saved))memory=saved;} catch {status.textContent="Lokales Speichern ist nicht verfügbar. Bitte exportiere deine Antworten vor dem Schliessen.";}
for(const el of [...answers,...checks]){if(el.type==="checkbox")el.checked=memory[el.id]===true;else el.value=typeof memory[el.id]==="string"?memory[el.id]:"";el.addEventListener("input",save);}
function update(){const n=checks.filter(x=>x.checked).length;document.querySelector("#progress").value=n;document.querySelector("#progress-text").textContent=`${n} von 6 Stationen abgeschlossen`;}
function save(){memory=Object.fromEntries([...answers,...checks].map(el=>[el.id,el.type==="checkbox"?el.checked:el.value]));try{localStorage.setItem(key,JSON.stringify(memory));status.textContent="Auf diesem Gerät gespeichert. Für eine Sicherung bitte exportieren.";}catch{status.textContent="Speichern nicht möglich. Bitte Antworten herunterladen.";}update();}
update();
window.addEventListener("beforeprint",()=>{for(const el of answers){el.dataset.previousHeight=el.style.height;el.style.height="auto";el.style.height=`${el.scrollHeight+4}px`;}});
window.addEventListener("afterprint",()=>{for(const el of answers)el.style.height=el.dataset.previousHeight||"";});
document.querySelector("#print").addEventListener("click",()=>window.print());

// Referenzkarten und formative Rückmeldungen. Alle Nutzereingaben nur als Text ausgeben.
const reference = LEHRERZIMMER_DATA;
const cardsById = new Map(reference.cards.map(card => [card.id, card]));
const reviewed = new Map();
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function paragraphId(number) { return 'P' + String(number).padStart(4, '0'); }
function makeCard(card, full) {
  const details = element('details', undefined, 'evidence-card');
  if (full) details.id = 'evidence-' + card.id;
  details.append(element('summary', `${card.id} · ${card.title}`));
  details.append(element('p', `${card.topic} · Referenztext ${paragraphId(card.start)}–${paragraphId(card.end)}`, 'locator'));
  for (const quote of card.quotes) {
    const block = element('blockquote', quote.text);
    block.append(element('cite', `Auszug aus ${paragraphId(quote.paragraph)}`));
    details.append(block);
  }
  details.append(element('p', card.context));
  details.append(element('h4', 'Weiterdiskutieren'));
  details.append(element('p', card.question, 'discussion-question'));
  details.append(element('p', 'Grenze des Belegs: ' + card.limit, 'fine'));
  if (!full) {
    const link = element('a', 'Im Belegarchiv öffnen ↗');
    link.href = '#evidence-' + card.id;
    details.append(link);
  }
  return details;
}
const topicFilter = document.querySelector('#evidence-topic');
const search = document.querySelector('#evidence-search');
for (const topic of [...new Set(reference.cards.map(c => c.topic))]) {
  const opt = element('option', topic); opt.value = topic; topicFilter.append(opt);
}
document.querySelector('#source-note').textContent = reference.source.note;
const archive = document.querySelector('#evidence-cards');
for (const card of reference.cards) archive.append(makeCard(card, true));
function filterArchive() {
  const term = search.value.trim().toLocaleLowerCase('de');
  const para = /^p0*(\d+)$/i.exec(term);
  let count = 0;
  for (const card of reference.cards) {
    const haystack = [card.id, card.title, card.topic, card.context, card.question, card.limit,
      ...card.quotes.map(q => q.text), paragraphId(card.start), paragraphId(card.end)].join(' ').toLocaleLowerCase('de');
    const match = (!topicFilter.value || topicFilter.value === card.topic) && (!term || haystack.includes(term) || (para && +para[1] >= card.start && +para[1] <= card.end));
    document.querySelector('#evidence-' + card.id).hidden = !match;
    if (match) count++;
  }
  document.querySelector('#evidence-count').textContent = `${count} von ${reference.cards.length} Belegkarten${count ? '' : ' – keine Treffer. Suchbegriff oder Filter ändern.'}`;
}
search.addEventListener('input', filterArchive);
topicFilter.addEventListener('change', filterArchive);
filterArchive();
function revealReference() {
  if (!location.hash.startsWith('#evidence-')) return;
  const card = document.getElementById(location.hash.slice(1));
  if (!card) return;
  search.value = ''; topicFilter.value = ''; filterArchive(); card.open = true;
  card.scrollIntoView({block:'start', behavior:'smooth'});
}
window.addEventListener('hashchange', revealReference);
revealReference();
function renderFeedback(field, target) {
  const report = LehrerzimmerFeedback.assess(field.value, field.id, reference);
  target.replaceChildren();
  target.hidden = false;
  target.append(element('h4', report.empty ? 'Dein Analyseauftrag' : 'Rückmeldung zu diesem Eintrag'));
  target.append(element('p', 'Lokale Textprüfung: Hinweise zur Überarbeitung, keine Prüfung der inhaltlichen Richtigkeit und keine Benotung.', 'fine'));
  if (report.empty) {
    target.append(element('p', 'Hier steht noch kein Eintrag. Formuliere zuerst eine eigene Position. Die folgenden Hinweise und Belege helfen beim Einstieg.'));
  } else {
    target.append(element('p', 'Geprüfte Fassung · Anfang deines Eintrags', 'locator'));
    target.append(element('blockquote', report.selection, 'entry-excerpt'));
    const list = element('ul', undefined, 'feedback-signals');
    for (const signal of report.signals) {
      const item = element('li');
      item.append(element('strong', signal.name + ': '));
      item.append(document.createTextNode(signal.text));
      list.append(item);
    }
    target.append(list);
    if (report.unknown.length) target.append(element('p', `Nicht vorhandene Karten: ${report.unknown.join(', ')}. Prüfe die Kennungen im Belegarchiv.`, 'feedback-warning'));
    const uncovered = report.paragraphMentions.filter(n => !reference.cards.some(c => n >= c.start && n <= c.end));
    if (uncovered.length) target.append(element('p', `Diese Absatzverweise sind nicht durch eine veröffentlichte Belegkarte abgedeckt: ${uncovered.map(paragraphId).join(', ')}. Sie werden hier nicht auf Richtigkeit geprüft; gleiche sie mit dem Originaldokument ab.`, 'fine'));
  }
  for (const route of report.routes) {
    const box = element('div', undefined, 'discussion-route');
    box.append(element('h4', 'Dein Stichwort «' + route.matched + '»: ' + route.title));
    box.append(element('p', route.question));
    const links = element('p', undefined, 'route-links');
    for (const id of route.refs) {
      const link = element('a', id + ' · ' + cardsById.get(id).title);
      link.href = '#evidence-' + id; links.append(link, document.createTextNode(' '));
    }
    box.append(links);
    box.append(element('p', 'Thematischer Anschluss an deinen Wortlaut; keine automatische Feststellung deiner Position.', 'fine'));
    target.append(box);
  }
  target.append(element('h4', 'Fachlicher Prüfpunkt'));
  target.append(element('p', report.focus));
  target.append(element('p', report.warrant));
  target.append(element('h4', 'Was deine Position herausfordern kann'));
  target.append(element('p', report.counter));
  target.append(element('h4', 'Nächster Überarbeitungsschritt'));
  target.append(element('p', report.revision, 'revision-step'));
  target.append(element('h4', 'Textstellen zum Vergleichen · Spoiler'));
  target.append(element('p', 'Diese Stellen sind thematisch zugeordnet. Ihre Passung zu deiner Behauptung ist von dir zu prüfen; sie gelten nicht automatisch als Bestätigung.', 'fine'));
  for (const id of report.refs) target.append(makeCard(cardsById.get(id), false));
  reviewed.set(field.id, {value:field.value, report});
  target.dataset.stale = 'false';
  return report;
}
for (const field of answers) {
  const task = field.closest('.task');
  const bar = element('div', undefined, 'feedback-toolbar');
  const button = element('button', 'Eintrag prüfen & Diskussion vertiefen', 'feedback-button');
  button.type = 'button';
  const target = element('section', undefined, 'entry-feedback');
  target.id = 'feedback-' + field.id; target.hidden = true;
  target.setAttribute('aria-label', 'Rückmeldung: ' + reference.tasks[field.id].title);
  target.setAttribute('aria-live', 'polite');
  button.setAttribute('aria-controls', target.id); button.setAttribute('aria-expanded', 'false');
  const stale = element('p', '', 'fine'); stale.setAttribute('role', 'status');
  button.addEventListener('click', () => {
    renderFeedback(field, target);
    button.setAttribute('aria-expanded', 'true');
    button.textContent = 'Überarbeitete Fassung erneut prüfen';
    stale.textContent = 'Rückmeldung für den aktuellen Eintrag erstellt.';
  });
  field.addEventListener('input', () => {
    if (!reviewed.has(field.id)) return;
    const changed = reviewed.get(field.id).value !== field.value;
    target.dataset.stale = String(changed);
    stale.textContent = changed ? 'Eintrag geändert: Die Rückmeldung bezieht sich auf die vorherige Fassung. Bitte erneut prüfen.' : 'Rückmeldung für den aktuellen Eintrag.';
  });
  bar.append(button, stale); task.append(bar, target);
}
// Export enthält die tatsächlich angeforderte Rückmeldung mit Hinweis auf veraltete Fassungen.
document.querySelector('#export').addEventListener('click', () => {
  let text = '# Das Lehrerzimmer – Analysejournal\n\n';
  for (const field of answers) {
    text += `## ${reference.tasks[field.id].title}\n\n${field.value || '(noch kein Eintrag)'}\n\n`;
    const checked = reviewed.get(field.id);
    if (checked) {
      const r = checked.report;
      text += `### Rückmeldung${checked.value !== field.value ? ' · bezieht sich auf eine frühere Fassung' : ''}\n\nLokale Textsignale, keine semantische Bewertung.\n\n`;
      if (checked.value !== field.value) text += `Geprüfte Fassung:\n\n${checked.value}\n\n`;
      for (const signal of r.signals) text += `- ${signal.name}: ${signal.text}\n`;
      text += `\nPrüfpunkt: ${r.focus}\n\n${r.warrant}\n\nGegenposition: ${r.counter}\n\nRevision: ${r.revision}\n\n`;
      for (const route of r.routes) text += `Anschluss an «${route.matched}»: ${route.title}\n\n${route.question}\n\nBelege: ${route.refs.join(', ')}.\n\n`;
      if (r.unknown.length) text += `Nicht vorhandene Karten: ${r.unknown.join(', ')}\n\n`;
      for (const id of r.refs) {
        const c = cardsById.get(id);
        text += `#### ${c.id} · ${c.title} (${paragraphId(c.start)}–${paragraphId(c.end)})\n\n`;
        for (const q of c.quotes) text += `> ${q.text}\n\nAuszug aus ${paragraphId(q.paragraph)}\n\n`;
        text += `Diskussion: ${c.question}\n\nGrenze: ${c.limit}\n\n`;
      }
    }
  }
  text += '## Bearbeitungsstand\n\n' + checks.map(c => `${c.id}: ${c.checked ? 'geprüft' : 'offen'}`).join('\n');
  text += '\n\nReferenz: vom Nutzer bereitgestelltes Transkript Lehrerzimmer.docx. Absatznummern sind keine Filmzeitcodes.\n';
  const url = URL.createObjectURL(new Blob([text], {type:'text/markdown;charset=utf-8'}));
  const link = element('a'); link.href = url; link.download = 'lehrerzimmer-analysejournal.md'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
document.querySelector('#reset').addEventListener('click', () => {
  if (!confirm('Alle Antworten, Fortschritte und angezeigten Rückmeldungen auf diesem Gerät löschen? Exportierte Dateien bleiben erhalten.')) return;
  for (const field of answers) field.value = '';
  for (const check of checks) check.checked = false;
  reviewed.clear();
  for (const section of document.querySelectorAll('.entry-feedback')) { section.replaceChildren(); section.hidden = true; }
  for (const button of document.querySelectorAll('.feedback-button')) {button.textContent = 'Eintrag prüfen & Diskussion vertiefen';button.setAttribute('aria-expanded','false');}
  for (const hint of document.querySelectorAll('.feedback-toolbar [role="status"]')) hint.textContent = '';
  save();
});
