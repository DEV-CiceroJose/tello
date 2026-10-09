"""Import reviewed author-written items. No randomized stems or numeric clones."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
rows=[r.split('|') for r in (root/'research/authored/pmpe-foundations.txt').read_text().splitlines() if r and not r.startswith('#')]
questions=[]
for i,r in enumerate(rows):
    assert len(r)==8,(i,len(r))
    subject,stem,*tail=r
    choices=tail[:5];explanation=tail[5]
    assert len(set(choices))==5
    answer=(i*3+2)%5
    options=choices[-answer:]+choices[:-answer] if answer else choices
    questions.append(dict(id=f'pmpe-foundation-{i+1:03}',track='pmpe',subject=subject,lessonId=None,difficulty=2,stem=stem,options=options,answer=answer,explanation=explanation,source='Autoral · Tello · Fundamentos',year=2026,origin='authored',role='Soldado'))
assert len(questions)==120,len(questions)
(root/'frontend/src/tello/foundation-questions.json').write_text(json.dumps(questions,ensure_ascii=False,indent=2)+'\n')
print(len(questions),'authored questions')
