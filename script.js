
// Dynamic gallery loader
(() => {
  const gallery = document.getElementById('gallery');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalSpinner = document.getElementById('modal-spinner');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.getElementById('close');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let images = [];
  let current = -1;

  function getThumb(img) {
    // Use thumbnail if exists, else fallback to original
    const parts = img.split('/');
    const fname = parts[parts.length - 1];
    return `images/thumbs/${fname}`;
  }

  function renderGallery(imgList) {
    gallery.innerHTML = '';
    imgList.forEach((img, i) => {
      const fig = document.createElement('figure');
      fig.className = 'thumb';
      // Edit button
      const editBtn = document.createElement('button');
      editBtn.className = 'edit-btn';
      editBtn.title = 'Edit this image online';
      editBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.71-9.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`;
      editBtn.onclick = (e) => {
        e.stopPropagation();
        // Open in Photopea with image URL
        const url = location.origin + '/' + img;
        window.open(`https://www.photopea.com#${encodeURIComponent(url)}`, '_blank');
      };
      // Download button
      const downloadBtn = document.createElement('a');
      downloadBtn.className = 'download-btn';
      downloadBtn.title = 'Download this image';
      downloadBtn.href = img;
      downloadBtn.download = img.split('/').pop();
      downloadBtn.onclick = (e) => { e.stopPropagation(); };
      downloadBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm7-18c-.55 0-1 .45-1 1v12.59l-4.3-4.3a.996.996 0 1 0-1.41 1.41l6 6c.39.39 1.02.39 1.41 0l6-6a.996.996 0 1 0-1.41-1.41l-4.3 4.3V3c0-.55-.45-1-1-1z"/></svg>`;
      // Button container
      const btns = document.createElement('div');
      btns.className = 'thumb-btns';
      btns.appendChild(editBtn);
      btns.appendChild(downloadBtn);
      fig.appendChild(btns);
      // Image (use thumbnail for preview)
      const image = document.createElement('img');
      image.src = getThumb(img);
      image.alt = '';
      fig.appendChild(image);
      fig.addEventListener('click', () => open(i));
      gallery.appendChild(fig);
    });
  }

  function open(index){
    if (!images[index]) return;
    // Show spinner, hide image
    if (modalSpinner) modalSpinner.style.display = 'flex';
    modalImg.style.display = 'none';
    modalImg.src = '';
    // Preload image
    const fullImg = new window.Image();
    fullImg.onload = function() {
      modalImg.src = images[index];
      modalImg.style.display = '';
      if (modalSpinner) modalSpinner.style.display = 'none';
    };
    fullImg.onerror = function() {
      if (modalSpinner) modalSpinner.style.display = 'none';
      modalImg.style.display = '';
    };
    fullImg.src = images[index];
    modalImg.alt = '';
    if (modalCaption) modalCaption.textContent = '';
    current = index;
    modal.setAttribute('aria-hidden', 'false');
  }

  function close(){
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    current = -1;
  }

  function showNext(delta){
    if(current === -1) return;
    let nextIndex = (current + delta + images.length) % images.length;
    open(nextIndex);
  }

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => showNext(-1));
  nextBtn.addEventListener('click', () => showNext(1));

  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  // Fetch images.json and render
  fetch('images.json')
    .then(r => r.json())
    .then(list => {
      images = list;
      renderGallery(images);
    })
    .catch(() => {
      gallery.innerHTML = '<p style="color:#b85c7a">No images found. Run the provided script to generate images.json.</p>';
    });
})();
