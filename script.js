// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal-on-scroll (no external libs)
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: .15 });
revealEls.forEach(el => io.observe(el));

// Modal player logic
const modal = document.getElementById('video-modal');
const iframe = document.getElementById('modal-iframe');

function openVideo(id){
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  iframe.src = src;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeVideo(){
  iframe.src = '';
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.video-thumb').forEach(el => {
  el.addEventListener('click', () => openVideo(el.dataset.videoId));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(el.dataset.videoId); }
  });
});
document.querySelector('.modal__close').addEventListener('click', closeVideo);
modal.addEventListener('click', (e) => { if (e.target === modal) closeVideo(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeVideo(); });

// CV button: if Subhan_Khan_CV.pdf isn't in repo root, fallback to email
(async () => {
  const btn = document.getElementById('cvBtn');
  const url = btn.getAttribute('href');
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) throw new Error('CV not found');
  } catch {
    btn.setAttribute('href', 'mailto:subhan_khan@hotmail.co.uk?subject=CV request&body=Hi Subhan, could you please share your CV?');
    btn.textContent = 'Request CV by Email';
    btn.removeAttribute('target');
    btn.removeAttribute('rel');
  }
})();
