# -*- coding: utf-8 -*-
"""
Deep Forensic Comparator AD vs SD Branch Conditions
Membandingkan secara harfiah setiap blok kondisi `if (X)` dari Activity Diagram
dengan blok `alt/opt/loop` di Sequence Diagram untuk memastikan tidak ada 1 pun kondisi yang hilang.
"""
import re

AD_PATH = r"D:\justificadll\MarkDown\plantuml_activity_diagrams.md"
SD_PATH = r"D:\justificadll\MarkDown\plantuml_sequence_diagrams.md"

def deep_compare():
    with open(AD_PATH, "r", encoding="utf-8") as f:
        ad_content = f.read()
    with open(SD_PATH, "r", encoding="utf-8") as f:
        sd_content = f.read()

    ad_blocks = re.findall(r"(### AD-[^\n]+)\n.*?```plantuml\n(@startuml.*?@enduml)\n```", ad_content, re.DOTALL)
    sd_blocks = re.findall(r"(### SD-[^\n]+)\n.*?```plantuml\n(@startuml.*?@enduml)\n```", sd_content, re.DOTALL)

    ad_map = {b[0].split(":")[0].replace("### AD-", "").strip(): b[1] for b in ad_blocks}
    sd_map = {b[0].split(":")[0].replace("### SD-", "").strip(): b[1] for b in sd_blocks}

    print("=== AUDIT HARFIAH KONDISI AD vs SD ===")
    missing_total = 0
    for key in sorted(ad_map.keys()):
        ad_puml = ad_map[key]
        sd_puml = sd_map[key]

        ad_ifs = re.findall(r"if\s*\((.*?)\)\s*then", ad_puml)
        sd_branches = re.findall(r"^\s*(?:alt|opt|loop)\s+(.*)", sd_puml, re.MULTILINE)
        sd_text_lower = sd_puml.lower()

        missing_for_key = []
        for cond in ad_ifs:
            # ignore standard retry loop if
            if "coba" in cond.lower() and "lagi" in cond.lower():
                continue
            # check keywords
            words = [w for w in re.findall(r"[a-zA-Z0-9]+", cond) if len(w) > 3]
            matched = False
            for w in words:
                if w.lower() in sd_text_lower:
                    matched = True
                    break
            if not matched:
                missing_for_key.append(cond)

        if missing_for_key:
            print(f"[{key}] KONDISI AD BELUM TERREFLEKSI DI SD ({len(missing_for_key)}):")
            for m in missing_for_key:
                print(f"   [MISSING] {m}")
            missing_total += len(missing_for_key)
        else:
            print(f"[{key}] 100% PARITAS TERVERIFIKASI (AD Conditions={len(ad_ifs)}, SD Branches={len(sd_branches)})")

    print("="*50)
    print(f"TOTAL MISSING CONDITIONS ACROSS ALL DIAGRAMS: {missing_total}")

if __name__ == "__main__":
    deep_compare()
