import base64

def convert_firma():
    with open('FIRMAS/FIRMA_NEIDER.png', 'rb') as f:
        encoded = base64.b64encode(f.read()).decode('utf-8')
    
    js_content = f"const FIRMA_NEIDER_BASE64 = 'data:image/png;base64,{encoded}';\n"
    
    with open('firmaNeider.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print("firmaNeider.js created successfully")

if __name__ == '__main__':
    convert_firma()
