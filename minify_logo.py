import base64
from PIL import Image
from io import BytesIO

with Image.open('LOGO VIU.png') as img:
    # Convert to RGB (if it's RGBA, keep white background)
    if img.mode in ('RGBA', 'LA'):
        background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
        background.paste(img, img.split()[-1])
        img = background
    
    # Resize to max 500px width
    max_width = 500
    if img.width > max_width:
        ratio = max_width / img.width
        img = img.resize((max_width, int(img.height * ratio)), Image.LANCZOS)
    
    # Save as JPEG in memory
    buffer = BytesIO()
    img.save(buffer, format="JPEG", quality=85)
    b64_data = base64.b64encode(buffer.getvalue()).decode('utf-8')

with open('logo_clinica.js', 'w', encoding='utf-8') as f:
    f.write('const LOGO_CLINICA_BASE64 = "data:image/jpeg;base64,' + b64_data + '";\n')

print("Minimized logo_clinica.js successfully.")
