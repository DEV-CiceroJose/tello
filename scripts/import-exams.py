"""Rebuild official questions from versioned PDFs. Requires Poppler; pypdf for the 2016 study copy.
No OCR guesses, generated answer keys or duplicated booklet colors. Run from repository root.
"""
import json, re, hashlib, subprocess, xml.etree.ElementTree as ET
from pathlib import Path
from pypdf import PdfReader, PdfWriter
ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'frontend/public/exams'
manifest = json.loads((ROOT / 'research/exams/manifest.json').read_text())
# The official 2016 booklet shades answers. Remove only the exact background operator;
# keep every character, diagram and original PDF. The definitive key supersedes its shading.
reader = PdfReader(PUBLIC / 'pmpe-2016-soldado-prova.pdf')
original_text = [p.extract_text() for p in reader.pages]
writer = PdfWriter(clone_from=reader)
removed = 0
for page in writer.pages:
    content = page.get_contents()
    ops = content.operations
    for i, (args, op) in enumerate(ops):
        if op == b'g' and args == [0.827] and i+2 < len(ops) and ops[i+1][1] == b're' and ops[i+2][1] == b'f*':
            ops[i+2] = ([], b'n')
            removed += 1
    content.operations = ops
    page.replace_contents(content)
assert removed > 50, removed
with open(PUBLIC / 'pmpe-2016-soldado-estudo.pdf','wb') as out: writer.write(out)
assert original_text == [p.extract_text() for p in PdfReader(PUBLIC / 'pmpe-2016-soldado-estudo.pdf').pages]

spec = {
 'pmpe-2009-soldado': (50,[0],[(20,'constitucional'),(30,'portugues'),(40,'logica'),(45,'historia-pe'),(50,'geografia-pe')]),
 'pmpe-2014-oficial': (100,[0,2],[(10,'portugues'),(16,'logica'),(24,'ingles-pmpe'),(30,'informatica'),(38,'constitucional'),(94,'direito-oficial'),(100,'direitos-humanos')]),
 'pmpe-2016-soldado': (60,[1],[(15,'constitucional'),(25,'geografia-pe'),(35,'logica'),(50,'portugues'),(60,'historia-pe')]),
 'pmpe-2018-soldado': (60,[0],[(15,'portugues'),(25,'logica'),(35,'geografia-pe'),(45,'historia-pe'),(60,'constitucional')]),
 'pmpe-2018-oficial': (70,[0],[(10,'portugues'),(19,'ingles-pmpe'),(24,'logica'),(30,'informatica'),(35,'constitucional'),(60,'direito-oficial'),(65,'constitucional'),(70,'legislacao-pmpe')]),
}
all_questions=[]
for e in manifest:
    eid=e['id']; is_enem=e['track']=='enem'
    count=90 if is_enem else spec[eid][0]
    keypages=[0] if is_enem else spec[eid][1]
    keytext=subprocess.check_output(['pdftotext','-layout',str(PUBLIC / f'{eid}-gabarito.pdf'),'-'],text=True).split('\f')
    pairs=re.findall(r'\b(\d{1,3})\s+(NULA|Anulado|[A-E])\b','\n'.join(keytext[i] for i in keypages))
    answers={int(n): a for n,a in pairs}
    expected=set(range(91,181) if is_enem and e['day']==2 else range(1,count+1))
    assert set(answers)==expected,(eid,'answer mismatch',expected-set(answers),set(answers)-expected)
    xml=subprocess.check_output(['pdftotext','-bbox-layout',str(PUBLIC / f'{eid}-prova.pdf'),'-'])
    xml=re.sub(rb'[\x00-\x08\x0b\x0c\x0e-\x1f]',b'',xml)
    tree=ET.fromstring(xml); ns={'x':'http://www.w3.org/1999/xhtml'}
    pages=[]; markers={}
    for pi,page in enumerate(tree.findall('.//x:page',ns),1):
        lines=[]
        raw_lines=page.findall('.//x:line',ns)
        def line_text(line): return ' '.join(w.text or '' for w in line.findall('x:word',ns))
        two_columns=is_enem and any(re.match(r'^QUEST[ÃãA]O\s+\d+',line_text(l),re.I) and float(l.attrib['xMin'])>float(page.attrib['width'])*.45 for l in raw_lines)
        raw_lines.sort(key=lambda l: (int(float(l.attrib['xMin'])>float(page.attrib['width'])*.48) if two_columns else 0, float(l.attrib['yMin']), float(l.attrib['xMin'])))
        for line in raw_lines:
            words=line.findall('x:word',ns)
            text=' '.join(w.text or '' for w in words)
            lines.append(text)
            match=re.match(r'^QUEST[ÃãA]O\s+(\d{1,3})\b',text,re.I) if is_enem else re.match(r'^(\d{2,3})\.\s+\S',text)
            if not match: continue
            n=int(match[1])
            if n not in expected or n in markers: continue # English first; omit repeated Spanish section
            if not is_enem and float(line.attrib['xMin'])>90: continue
            markers[n]={'page':pi,'lineIndex':len(lines)-1,'x':round(float(line.attrib['xMin'])/float(page.attrib['width']),5),'y':round(float(line.attrib['yMin'])/float(page.attrib['height']),5)}
        pages.append('\n'.join(lines))
    assert set(markers)==expected,(eid,'missing markers',expected-set(markers))
    e['questionCount']=count
    e['excludedNumbers']=[n for n in sorted(answers) if answers[n] not in 'ABCDE']
    e['validCount']=count-len(e['excludedNumbers'])
    e['examPath']=f'/exams/{eid}-prova.pdf';e['answerPath']=f'/exams/{eid}-gabarito.pdf'
    e['studyPath']=f'/exams/{eid}-estudo.pdf' if eid=='pmpe-2016-soldado' else e['examPath']
    e['pageCount']=len(pages)
    e['language']='Inglês' if is_enem and e['day']==1 or 'oficial' in eid else None
    e['files']={kind:{'sha256':hashlib.sha256((PUBLIC/f'{eid}-{kind}.pdf').read_bytes()).hexdigest(),'bytes':(PUBLIC/f'{eid}-{kind}.pdf').stat().st_size} for kind in ['prova','gabarito']}
    e['verifiedAt']='2026-10-04'
    if eid=='pmpe-2016-soldado':e['studyNote']='Cópia de estudo: retirado apenas o fundo cinza que indicava respostas. Texto e figuras preservados; correção pelo gabarito definitivo. Original disponível para conferência.'
    for n,a in sorted(answers.items()):
        if a not in 'ABCDE': continue
        s=('linguagens' if n<=45 else 'humanas' if n<=90 else 'natureza' if n<=135 else 'matematica') if is_enem else next(s for end,s in spec[eid][2] if n<=end)
        lines=pages[markers[n]['page']-1].splitlines()[markers[n]['lineIndex']:]
        segment=[]
        for li,line in enumerate(lines):
            if li and (re.match(r'^QUEST[ÃãA]O\s+\d+',line,re.I) if is_enem else re.match(r'^\d{2,3}\.\s',line)): break
            segment.append(line)
        search_text=' '.join(segment)[:1800]
        all_questions.append({'id':f'{eid}-q{n:03}', 'examId':eid, 'questionNumber':n, 'track':e['track'], 'subject':s, 'lessonId':None, 'difficulty':0, 'stem':f"{e['title']} · Questão {n:02d}", 'searchText':search_text, 'options':[f'Alternativa {c} do caderno original' for c in 'ABCDE'], 'answer':'ABCDE'.index(a), 'explanation':'Resposta conforme o gabarito oficial indicado na fonte. Esta questão ainda não possui resolução comentada no Tello.', 'source':f"Prova oficial · {e['board']} · {e['year']}", 'year':e['year'], 'origin':'official','role':e['role'],'historical':not is_enem,'location':markers[n]})
    (PUBLIC/f'{eid}-text.json').write_text(json.dumps(pages,ensure_ascii=False))
    print(eid,e['validCount'],'valid;',e['excludedNumbers'],'excluded',flush=True)
(ROOT/'frontend/src/tello/official-questions.json').write_text(json.dumps(all_questions,ensure_ascii=False,indent=2)+'\n')
(ROOT/'frontend/src/tello/exam-library.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('TOTAL',len(all_questions))
