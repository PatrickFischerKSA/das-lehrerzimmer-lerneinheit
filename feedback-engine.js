/* Lokale, transparente Textsignale; keine semantische Bewertung und keine Noten. */
(function (root) {
  'use strict';
  function assess(input, taskId, data) {
    const task = data.tasks[taskId];
    if (!task) throw new Error('Unbekannte Aufgabe');
    const text = String(input || '').trim();
    const empty = !text;
    const valid = new Map(data.cards.map(c => [c.id, c]));
    const mentions = [...new Set((text.match(/\bB\d{1,3}\b/gi) || []).map(id => id.toUpperCase()))];
    const refs = mentions.filter(id => valid.has(id));
    const unknown = mentions.filter(id => !valid.has(id));
    const paragraphMentions = [...new Set([...text.matchAll(/\bP0*(\d{1,4})\b/gi)].map(m => Number(m[1])))];
    const covered = data.cards.filter(c => paragraphMentions.some(n => n >= c.start && n <= c.end));
    const quotes = data.cards.filter(c => c.quotes.some(q => q.text.length >= 24 && text.toLocaleLowerCase('de').includes(q.text.toLocaleLowerCase('de'))));
    const found = [...new Set([...refs, ...covered.map(c => c.id), ...quotes.map(c => c.id)])];
    const hasTime = /\b\d{1,2}:\d{2}(?::\d{2})?\b/.test(text);
    const hasReason = /\b(weil|denn|deshalb|daher|somit|folglich|begründ\w*|schlussregel)\b|daraus folgt|spricht.{0,25}für|zeigt.{0,15}dass|lässt.{0,20}schlie/iu.test(text);
    const hasCounter = /\b(allerdings|andererseits|hingegen|dagegen|einwand|gegenlesart|gegenargument|dennoch|jedoch|trotzdem|alternativ\w*|einschränk\w*)\b|nicht zwingend|könnte auch/iu.test(text);
    const hasLimit = /\b(möglicherweise|vermut\w*|hypothese|unsicher\w*|bedingt|sofern|falls)\b|nur unter|nicht eindeutig|beweist nicht|kein.{0,12}beweis|noch nicht|würde.{0,30}ändern/iu.test(text);
    const verdict = (yes, a, b) => ({found: Boolean(yes), text: yes ? a : b});
    const signals = empty ? [] : [
      {name: 'Auffindbarkeit', ...verdict(found.length || hasTime,
        `${found.length ? 'Belegverweis erkannt: ' + found.join(', ') + '.' : 'Ein Zeitcode ist erkennbar.'} Prüfe selbst, ob die Stelle deine Aussage tatsächlich trägt; das wird nicht automatisch festgestellt.`,
        'Kein Verweis auf eine Belegkarte, einen dort abgedeckten Absatz oder einen Zeitcode erkannt. Ergänze einen präzisen Beleg oder prüfe, ob dein anders formulierter Verweis bereits auffindbar ist.')},
      {name: 'Schlussregel', ...verdict(hasReason,
        'Eine Begründungsformulierung ist erkennbar. Prüfe, ob du damit den Schluss vom konkreten Beleg auf deine These erklärst oder nur Handlung nacherzählst.',
        'Keine typische Begründungsformulierung erkannt. Falls dein Schluss noch unausgesprochen bleibt: Erkläre, warum gerade dieser Beleg für deine Aussage spricht. Die Formulierung ist frei.')},
      {name: 'Gegenprüfung', ...verdict(hasCounter,
        'Ein sprachliches Signal für eine Gegenposition ist erkennbar. Stelle sicher, dass du die stärkste Alternative fair behandelst und nicht bloss «allerdings» hinzufügst.',
        'Keine typische Markierung einer Gegenposition erkannt. Prüfe eine Lesart, die denselben Beleg anders erklärt. Wenn du das bereits anders formulierst, ist keine Änderung des Wortlauts nötig.')},
      {name: 'Reichweite', ...verdict(hasLimit,
        'Ein Signal für eine Einschränkung oder Unsicherheit ist erkennbar. Prüfe, ob du konkret benennst, was die Stelle belegt und was offen bleibt.',
        'Keine typische Einschränkung erkannt. Benenne die Grenze deines Schlusses: Welche stärkere Behauptung lässt sich aus dem Beleg noch nicht ableiten?')}
    ];
    // Themenanlässe knüpfen an den Wortlaut an, ohne die Haltung dazu zu unterstellen.
    const routes = empty ? [] : (data.routes || []).map(route => {
      const match = new RegExp('(?<![\\p{L}\\p{N}_])(?:' + route.pattern.replaceAll('\\w*', '\\p{L}*') + ')(?![\\p{L}\\p{N}_])', 'iu').exec(text);
      return match ? {...route, matched: match[0]} : null;
    }).filter(Boolean).sort((a,b) =>
      b.refs.filter(id => task.refs.includes(id)).length - a.refs.filter(id => task.refs.includes(id)).length
    ).slice(0,2);
    const recommended = [...new Set([...task.refs, ...found])];
    const selection = text.length > 260 ? text.slice(0, 260) + ' …' : text;
    return {empty,selection,signals,found,unknown,routes,paragraphMentions,hasTime,hasReason,hasCounter,hasLimit,
      focus:task.focus,warrant:task.warrant,counter:task.counter,revision:task.revision,refs:recommended};
  }
  const api = {assess};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.LehrerzimmerFeedback = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
