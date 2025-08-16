// Footer year
(function(){
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Mobile menu toggle
(function(){
  var btn = document.querySelector('.nav__toggle');
  var links = document.getElementById('primary-nav');
  if (!btn || !links) return;
  btn.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// VIDEO MODAL
(function(){
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
})();

// PDF MODAL (Hyperloop)
(function(){
  var modal = document.getElementById('pdf-modal');
  var frame = document.getElementById('pdf-iframe');
  if (!modal || !frame) return;

  function openPDF(url){
    frame.src = url + '#view=FitH&toolbar=1';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closePDF(){
    frame.src = '';
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Robust path check
  function resolve(url){
    var alt = 'White%20Paper_Hyperlink%20Submission.pdf';
    return fetch(url, {method:'HEAD'}).then(function(r){
      if (r.ok) return url;
      return fetch(alt, {method:'HEAD'}).then(function(r2){
        if (r2.ok) return alt;
        throw new Error('PDF missing');
      });
    });
  }

  document.querySelectorAll('.pdf-trigger').forEach(function(el){
    el.addEventListener('click', function(){
      var url = el.getAttribute('data-pdf') || '';
      resolve(url).then(openPDF).catch(function(){
        window.location.href = 'mailto:subhan_khan@hotmail.co.uk?subject=White%20Paper%20request&body=Hi%20Subhan,%20could%20you%20please%20share%20your%20Hyperloop%20Suspension%20white%20paper?';
      });
    });
    el.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        var url = el.getAttribute('data-pdf') || '';
        resolve(url).then(openPDF).catch(function(){
          window.location.href = 'mailto:subhan_khan@hotmail.co.uk?subject=White%20Paper%20request&body=Hi%20Subhan,%20could%20you%20please%20share%20your%20Hyperloop%20Suspension%20white%20paper?';
        });
      }
    });
  });

  var closeBtn = modal.querySelector('.modal__close');
  if (closeBtn) closeBtn.addEventListener('click', closePDF);
  modal.addEventListener('click', function(e){ if (e.target === modal) closePDF(); });
  window.addEventListener('keydown', function(e){ if (e.key === 'Escape' && modal.classList.contains('open')) closePDF(); });
})();
