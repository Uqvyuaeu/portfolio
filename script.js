// Video modal open/close
const modal = document.getElementById('modal');
const iframe = document.getElementById('ytframe');

function openModal(src){
  iframe.src = src;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  iframe.src = '';
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}

// click play buttons
document.querySelectorAll('.playbtn').forEach(btn=>{
  btn.addEventListener('click', () => openModal(btn.dataset.yt));
});

// close on backdrop or X
modal.addEventListener('click', (e)=>{
  if(e.target.hasAttribute('data-close')) closeModal();
});
document.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click', closeModal));

// ESC to close
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});
