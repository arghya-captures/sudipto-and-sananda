import os
import json

IMG_DIR = 'images'
IMG_EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'}

img_files = [
    os.path.join(IMG_DIR, f)
    for f in sorted(os.listdir(IMG_DIR))
    if os.path.splitext(f)[1].lower() in IMG_EXTS and not f.startswith('.')
]

with open('images.json', 'w') as out:
    json.dump(img_files, out, indent=2)

print(f'Wrote {len(img_files)} images to images.json')
