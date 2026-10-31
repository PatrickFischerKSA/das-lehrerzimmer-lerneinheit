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
document.querySelector("#export").addEventListener("click",()=>{let text="# Das Lehrerzimmer – mein Lernjournal\n\n";for(const section of document.querySelectorAll(".station")){text+=`## ${section.querySelector(".eyebrow").textContent}\n\n`;for(const el of section.querySelectorAll("[data-answer]")){text+=`### ${el.closest(".task").querySelector("h3").textContent}\n\n${el.value||"(noch keine Antwort)"}\n\n`;}text+=`Station geprüft: ${section.querySelector("[data-done]").checked?"ja":"nein"}\n\n`;}const url=URL.createObjectURL(new Blob([text],{type:"text/markdown;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="lehrerzimmer-lernjournal.md";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
window.addEventListener("beforeprint",()=>{for(const el of answers){el.dataset.previousHeight=el.style.height;el.style.height="auto";el.style.height=`${el.scrollHeight+4}px`;}});
window.addEventListener("afterprint",()=>{for(const el of answers)el.style.height=el.dataset.previousHeight||"";});
document.querySelector("#print").addEventListener("click",()=>window.print());
document.querySelector("#reset").addEventListener("click",()=>{if(!confirm("Alle Antworten und Fortschritte auf diesem Gerät löschen? Exportierte Dateien bleiben erhalten."))return;for(const el of answers)el.value="";for(const el of checks)el.checked=false;save();});
