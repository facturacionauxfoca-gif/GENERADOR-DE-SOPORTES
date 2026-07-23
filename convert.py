import openpyxl
import json
import sys

def convert_excel_to_js():
    try:
        wb = openpyxl.load_workbook('RELACION DE SERVICIOS.xlsx')
        ws = wb.active
        
        servicios = []
        # Skip header, iterate rows
        for row in ws.iter_rows(min_row=2, values_only=True):
            codigo, descripcion = row[0], row[1]
            if codigo and descripcion:
                servicios.append({
                    "codigo": str(codigo).strip(),
                    "descripcion": str(descripcion).strip()
                })
        
        js_content = f"const SERVICIOS_DATA = {json.dumps(servicios, ensure_ascii=False, indent=4)};\n"
        
        with open('serviciosData.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
            
        print(f"Successfully converted {len(servicios)} services to serviciosData.js")
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)

if __name__ == '__main__':
    convert_excel_to_js()
