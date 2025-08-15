// Video modal
(function () {
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('video-iframe');

  document.querySelectorAll('.video-trigger').forEach(card => {
    card.addEventListener('click', () => {
      videoIframe.src = card.getAttribute('data-video') + '?autoplay=1';
      videoModal.classList.add('open');
    });
  });

  videoModal.querySelector('.modal__close').addEventListener('click', () => {
    videoIframe.src = '';
    videoModal.classList.remove('open');
  });

  videoModal.addEventListener('click', e => {
    if (e.target === videoModal) {
      videoIframe.src = '';
      videoModal.classList.remove('open');
    }
  });
})();

// PDF modal
(function () {
  const pdfModal = document.getElementById('pdf-modal');
  const pdfIframe = document.getElementById('pdf-iframe');

  document.querySelectorAll('.pdf-trigger').forEach(card => {
    card.addEventListener('click', () => {
      pdfIframe.src = card.getAttribute('data-pdf');
      pdfModal.classList.add('open');
    });
  });

  pdfModal.querySelector('.modal__close').addEventListener('click', () => {
    pdfIframe.src = '';
    pdfModal.classList.remove('open');
  });

  pdfModal.addEventListener('click', e => {
    if (e.target === pdfModal) {
      pdfIframe.src = '';
      pdfModal.classList.remove('open');
    }
  });
})();
