from fpdf import FPDF
import markdown
import sys
import re

def convert_md_to_pdf(md_file, pdf_file):
    with open(md_file, 'r', encoding='utf-8') as f:
        text = f.read()
    
    html = markdown.markdown(text, extensions=['tables'])
    
    # Clean up unsupported HTML for fpdf2
    # fpdf2 doesn't support complex CSS, just basic HTML tags
    html = re.sub(r'class=".*?"', '', html)
    html = re.sub(r'id=".*?"', '', html)
    
    # fpdf2 requires a very specific structure
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_font('Arial', '', 'c:/windows/fonts/arial.ttf')
    pdf.add_font('Arial', 'B', 'c:/windows/fonts/arialbd.ttf')
    pdf.add_font('Arial', 'I', 'c:/windows/fonts/ariali.ttf')
    pdf.set_font('Arial', '', 11)
    
    try:
        pdf.write_html(html)
        pdf.output(pdf_file)
        print(f"Success: {pdf_file}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    convert_md_to_pdf(sys.argv[1], sys.argv[2])
