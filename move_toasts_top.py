import os

mockups_dir = r"d:\justificadll\Mockups"

replacements = {
    "mockup_dashboard_mitra.html": [
        ("bottom: 30px; right: 30px;", "top: 90px; right: 40px;")
    ],
    "mockup_dashboard_admin.html": [
        ("bottom: 30px; left: 30px;", "top: 90px; left: 260px;")
    ],
    "mockup_modul_hukum.html": [
        ("bottom: 20px; right: 20px;", "top: 80px; right: 30px;")
    ],
    "mockup_modul_medis.html": [
        ("bottom: 20px; left: 50%;", "top: 80px; left: 50%;")
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
        print(f"Updated positioning in: {filename}")

print("All floating components moved to top area.")
