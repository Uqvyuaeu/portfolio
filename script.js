// Footer year
(function(){
  try {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  } catch(e) {}
})();

// VIDEO MODAL (simple & safe)
(function(){
  try {
    var modal = document.getElementById('video-modal');
    var frame = document.getElementById('video-iframe');
    if (!modal || !frame) return;

    function openVideo(url){
      frame.src = url + (url.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeVideo(){
      frame.src = '';
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.video-trigger').forEach(function(el){
      var url = el.getAttribute('data-video');
      el.addEventListener('click', function(){ openVideo(url); });
      el.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' '){
          e.preventDefault(); openVideo(url);
        }
      });
    });

    var closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.addEventListener('click', closeVideo);
    modal.addEventListener('click', function(e){ if (e.target === modal) closeVideo(); });
    window.addEventListener('keydown', function(e){ if (e.key === 'Escape' && modal.classList.contains('open')) closeVideo(); });
  } catch(e) { /* swallow */ }
})();

// PDF MODAL (no HEAD requests; just try primary, else fallback)
(function(){
  try {
    var modal = document.getElementById('pdf-modal');
    var frame = document.getElementById('pdf-iframe');
    if (!modal || !frame) return;

    // Primary then alternate (encoded name) — we just set the src to primary,
    // and if you prefer the alternate name, update the data-pdf in HTML.
    function openPDF(url){
      frame.src = url;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closePDF(){
      frame.src = '';
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.pdf-trigger').forEach(function(el){
      el.addEventListener('click', function(){
        var url = el.getAttribute('data-pdf') || 'docs/hyperloop-whitepaper.pdf';
        openPDF(url);
      });
      el.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          var url = el.getAttribute('data-pdf') || 'docs/hyperloop-whitepaper.pdf';
          openPDF(url);
        }
      });
    });

    var closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.addEventListener('click', closePDF);
    modal.addEventListener('click', function(e){ if (e.target === modal) closePDF(); });
    window.addEventListener('keydown', function(e){ if (e.key === 'Escape' && modal.classList.contains('open')) closePDF(); });
  } catch(e) { /* swallow */ }
})();
