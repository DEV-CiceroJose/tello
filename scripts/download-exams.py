"""Restore absent original PDFs from the provenance manifest; validate existing fingerprints."""
import hashlib,json,urllib.request
from pathlib import Path
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'frontend/src/tello/exam-library.json').read_text())
for exam in manifest:
    for kind,url in [('prova',exam['examUrl']),('gabarito',exam['answerUrl'])]:
        file=root/'frontend/public/exams'/f"{exam['id']}-{kind}.pdf"
        if not file.exists():
            # Public files only; never disable certificate validation.
            with urllib.request.urlopen(url,timeout=60) as response: data=response.read()
            assert data.startswith(b'%PDF'),f'Not a PDF: {url}'
            assert hashlib.sha256(data).hexdigest()==exam['files'][kind]['sha256'],f'Source changed: review {url}'
            file.parent.mkdir(parents=True,exist_ok=True);file.write_bytes(data)
        assert hashlib.sha256(file.read_bytes()).hexdigest()==exam['files'][kind]['sha256'],f'Checksum mismatch: {file}'
        print(file.name,'verified')
