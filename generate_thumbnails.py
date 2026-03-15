import os
from PIL import Image, ExifTags

IMG_DIR = 'images'
THUMB_DIR = os.path.join(IMG_DIR, 'thumbs')
THUMB_SIZE = (400, 300)
IMG_EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.JPG', '.PNG', '.JPEG', '.WEBP'}

os.makedirs(THUMB_DIR, exist_ok=True)

# Map EXIF orientation values to rotation/flip
def exif_transpose(im):
    try:
        exif = im._getexif()
        if exif is not None:
            for tag, value in exif.items():
                decoded = ExifTags.TAGS.get(tag, tag)
                if decoded == 'Orientation':
                    orientation = value
                    if orientation == 3:
                        im = im.rotate(180, expand=True)
                    elif orientation == 6:
                        im = im.rotate(270, expand=True)
                    elif orientation == 8:
                        im = im.rotate(90, expand=True)
                    elif orientation == 2:
                        im = im.transpose(Image.FLIP_LEFT_RIGHT)
                    elif orientation == 4:
                        im = im.transpose(Image.FLIP_TOP_BOTTOM)
                    elif orientation == 5:
                        im = im.transpose(Image.FLIP_LEFT_RIGHT).rotate(270, expand=True)
                    elif orientation == 7:
                        im = im.transpose(Image.FLIP_LEFT_RIGHT).rotate(90, expand=True)
    except Exception:
        pass
    return im

for fname in os.listdir(IMG_DIR):
    fpath = os.path.join(IMG_DIR, fname)
    ext = os.path.splitext(fname)[1].lower()
    if ext in IMG_EXTS and os.path.isfile(fpath):
        thumb_path = os.path.join(THUMB_DIR, fname)
        try:
            with Image.open(fpath) as im:
                im = exif_transpose(im)
                im.thumbnail(THUMB_SIZE)
                im.save(thumb_path, quality=80, optimize=True)
            print(f"Thumbnail created: {thumb_path}")
        except Exception as e:
            print(f"Error processing {fname}: {e}")
