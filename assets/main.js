'use strict';
const yearEl=document.getElementById('year');if(yearEl)yearEl.textContent=new Date().getFullYear();
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#primary-nav');
if(menu&&nav){menu.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));}
const form=document.querySelector('#client-brief');
if(form){
 const params=new URLSearchParams(location.search),pack=params.get('package');
 if(['landing','business','plus'].includes(pack))form.elements.namedItem('package').value=pack;
 const output=document.getElementById('brief-output'),result=document.getElementById('brief-result');
 const label={landing:'One-page website — £20 introductory',business:'Small business website — £60 introductory',plus:'Business Plus — £105 introductory',unsure:'Not decided yet'};
 const val=name=>String(form.elements.namedItem(name)?.value||'Not provided').trim()||'Not provided';
 function summary(){return ['HAMDEV — NEW WEBSITE ENQUIRY','================================','','Name: '+val('name'),'Preferred contact: '+val('reply'),'Business: '+val('business'),'Business type: '+val('type'),'Location / service area: '+val('location'),'','PACKAGE: '+(label[val('package')]||val('package')),'Main goal: '+val('goal'),'Services and pages: '+val('services'),'','Preferred style and colours: '+val('style'),'Inspiration: '+val('inspiration'),'Logo / photos / written content: '+val('assets'),'','Existing website / domain: '+val('domain'),'Public contact details: '+val('publiccontact'),'Ideal launch date: '+val('deadline'),'Additional notes: '+val('notes'),'','Please reply in our Messenger conversation. This is an enquiry, not an order or payment.'].join('\n')}
 form.addEventListener('submit',ev=>{ev.preventDefault();if(!form.reportValidity())return;output.value=summary();result.classList.add('show');result.scrollIntoView({behavior:'smooth',block:'nearest'});});
 document.getElementById('copy-brief')?.addEventListener('click',async ev=>{try{await navigator.clipboard.writeText(output.value);ev.currentTarget.textContent='Copied ✓';}catch(e){output.focus();output.select();ev.currentTarget.textContent='Select the text to copy';}});
 document.getElementById('save-brief')?.addEventListener('click',()=>{const blob=new Blob([output.value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='hamdev-website-enquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
}