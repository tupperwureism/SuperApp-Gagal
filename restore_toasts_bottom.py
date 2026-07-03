import os

mockups_dir = r"d:\justificadll\Mockups"

replacements = {
    "mockup_dashboard_mitra.html": [
        ("top: 90px; right: 40px;", "bottom: 30px; right: 30px;")
    ],
    "mockup_dashboard_admin.html": [
        ("top: 90px; left: 260px;", "bottom: 30px; left: 30px;")
    ],
    "mockup_modul_hukum.html": [
        ("top: 80px; right: 30px;", "bottom: 20px; right: 20px;")
    ],
    "mockup_modul_medis.html": [
        ("top: 80px; left: 50%;", "bottom: 20px; left: 50%;")
    ]
}

for filename, rules in replacements.items():
    filepath = os.path.join(mockups_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for old_str, new_str in rules:
            content = content.replace(old_str, new_str)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Restored positioning in: {filename}")

print("All floating components restored to bottom/bottom-right.")
