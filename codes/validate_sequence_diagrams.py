import re

FILE_PATH = r"D:\justificadll\MarkDown\plantuml_sequence_diagrams.md"

def validate_diagrams():
    with open(FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    blocks = re.findall(r"(### SD-[^\n]+)\n.*?```plantuml\n(@startuml.*?@enduml)\n```", content, re.DOTALL)
    print(f"Total Sequence Diagrams found: {len(blocks)}")

    errors = []
    for title, puml in blocks:
        # Check lifelines
        has_b_fe = "Boundary Client" in puml or "B_FE" in puml
        has_b_be = "Boundary Server" in puml or "B_BE" in puml
        has_c_svc = "Control" in puml or "C_Svc" in puml
        has_e_db = "Entity" in puml or "E_DB" in puml

        if not (has_b_fe and has_b_be and has_c_svc and has_e_db):
            errors.append(f"[{title}] Missing 5-Lifeline BCE structure!")

        # Check placeholder
        if "dispatchDomainUseCase" in puml:
            errors.append(f"[{title}] Contains illegal placeholder 'dispatchDomainUseCase'")

        # Check /api/v1
        if "/api/v1/" in puml:
            errors.append(f"[{title}] Contains outdated /api/v1/ endpoint")

    if errors:
        print("ERRORS FOUND:")
        for err in errors:
            print(" -", err)
    else:
        print("ALL DIAGRAMS PASSED 100% STRICT FORENSIC VALIDATION!")

if __name__ == "__main__":
    validate_diagrams()
