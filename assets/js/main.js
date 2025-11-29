
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function(){
  const hamb = document.getElementById('hambBtn');
  const mob = document.getElementById('mobileMenu');
  if(hamb){
    hamb.addEventListener('click', ()=>{
      mob.classList.toggle('hidden');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        if(window.innerWidth < 920) mob.classList.add('hidden');
      }
    });
  });

  // Simple reveal animation using IntersectionObserver
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.style.opacity = 1;
        en.target.style.transform = 'translateY(0)';
        obs.unobserve(en.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.card').forEach(c=>{
    c.style.opacity = 0; c.style.transform = 'translateY(12px)'; c.style.transition = 'opacity 600ms ease, transform 600ms ease';
    obs.observe(c);
  });

  // WhatsApp button responsive behavior (both): circle on mobile, bar on desktop
  function renderWhatsApp(){
    const wpContainer = document.getElementById('whatsappContainer');
    if(!wpContainer) return;
    wpContainer.innerHTML = '';
    const number = '+919500158005';
    if(window.innerWidth < 920){
      const btn = document.createElement('button');
      btn.className = 'whatsapp-circle';
      btn.title = 'Chat on WhatsApp';
      btn.innerHTML = '&#128172;';
      btn.onclick = ()=> window.open('https://wa.me/'+number.replace('+',''), '_blank');
      const wrap = document.createElement('div');
      wrap.className = 'whatsapp-float';
      wrap.appendChild(btn);
      wpContainer.appendChild(wrap);
    } else {
      const bar = document.createElement('div');
      bar.className = 'whatsapp-bar';
      bar.innerHTML = '<div style="display:flex;align-items:center;gap:10px"><div style="width:44px;height:44px;border-radius:10px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;font-weight:800">WA</div><div class="txt">Chat with us on WhatsApp<br><span style="font-weight:600">95001 58005</span></div></div>';
      bar.onclick = ()=> window.open('https://wa.me/919500158005', '_blank');
      wpContainer.appendChild(bar);
    }
  }
  renderWhatsApp();
  window.addEventListener('resize', renderWhatsApp);

  // Contact form local handler (replace with server endpoint if needed)
  const contactForms = document.querySelectorAll('.contact-form');
  contactForms.forEach(f=>{
    f.addEventListener('submit', function(e){
      e.preventDefault();
      const name = this.querySelector('[name=name]').value || '';
      const msg = this.querySelector('[name=message]').value || '';
      const info = this.querySelector('.form-info');
      if(info) info.textContent = 'Thanks '+name+' — your message is recorded locally. Configure a server or Google Form for real submissions.';
      this.reset();
    });
  });

});
