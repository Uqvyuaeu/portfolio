// Mark that JS is active (enables reveal animation styles)
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Footer year
(function(){
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Reveal-on-scroll (safe + simple)
(function(){
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    // Browser too old: just show everything
    els.forEach(function(el){ el.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  els.forEach(function(el){ io.observe(el); });
})();

// Modal YouTube player
(function(){
  var modal = document.getElementById('video-modal');
  var iframe = document.getElementById('modal-iframe');
  if (!modal || !iframe) return;

  function openVideo(id){
    iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeVideo(){
    iframe.src = '';
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.video-thumb').forEach(function(el){
    el.addEventListener('click', function(){ openVideo(el.dataset.videoId); });
    el.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(el.dataset.videoId); }
    });
  });

  var closeBtn = document.querySelector('.modal__close');
  if (closeBtn) closeBtn.addEventListener('click', closeVideo);
  modal.addEventListener('click', function(e){ if (e.target === modal) closeVideo(); });
  window.addEventListener('keydown', function(e){ if (e.key === 'Escape' && modal.classList.contains('open')) closeVideo(); });
})();

// CV fallback: if file missing at repo root, switch to email
(function(){
  var btn = document.getElementById('cvBtn');
  if (!btn) return;
  var url = btn.getAttribute('href');
  // HEAD on GitHub Pages is usually OK; fallback to email on any error
  fetch(url, { method: 'HEAD' })
    .then(function(res){
      if (!res.ok) throw new Error('not found');
    })
    .catch(function(){
      btn.setAttribute('href', 'mailto:subhan_khan@hotmail.co.uk?subject=CV request&body=Hi Subhan, could you please share your CV?');
      btn.textContent = 'Request CV by Email';
      btn.removeAttribute('target');
      btn.removeAttribute('rel');
    });
})();
