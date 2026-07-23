import base64

with open('LOGO VIU.png', 'rb') as f:
    b = base64.b64encode(f.read()).decode('utf-8')

with open('logo_clinica.js', 'w', encoding='utf-8') as out:
    out.write('const LOGO_CLINICA_BASE64 = "data:image/png;base64,' + b + '";\n')
