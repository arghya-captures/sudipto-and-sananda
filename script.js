
// Dynamic gallery loader
(() => {
  const gallery = document.getElementById('gallery');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.getElementById('close');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let images = [];
  let current = -1;

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
      fig.appendChild(editBtn);
      // Image
      const image = document.createElement('img');
      image.src = img;
      image.alt = '';
      fig.appendChild(image);
      fig.addEventListener('click', () => open(i));
      gallery.appendChild(fig);
    });
  }

  function open(index){
    if (!images[index]) return;
    modalImg.src = images[index];
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
