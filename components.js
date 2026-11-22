/* Wimji native Web Components — editable, accessible DOM, no image-backed UI. */
const iconPath = {
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/>',
  sprout: '<path d="M12 22V12M12 16C3 16 3 7 3 5c6 0 9 4 9 9M12 13c0-6 4-9 9-9 0 7-3 10-9 10"/>',
  star: '<path d="m12 2.5 3 6.3 7 1-5 5 1.2 7.2-6.2-3.3-6.3 3.3L7 14.8l-5-5 7-1z"/>',
  cube: '<path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10"/>',
  layers: '<path d="m12 2-10 5 10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5"/>',
  users: '<circle cx="9" cy="7.5" r="3"/><path d="M2.5 20v-3a6.5 6.5 0 0 1 13 0v3"/><circle cx="18" cy="8.5" r="2.5"/><path d="M18 14a5 5 0 0 1 4 5v1"/>',
  arrow: '<path d="M4 12h16m-7-7 7 7-7 7"/>',
  external: '<path d="M5 19 19 5M9 5h10v10"/>',
  chevron: '<path d="m5 9 7 7 7-7"/>',
  menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
  close: '<path d="M5 5l14 14M19 5 5 19"/>',
  hammer: '<path d="m4 20 9.5-9.5M9 4l3-2 10 10-3 3-4-4-5 5-4-4 5-5z"/>',
};
window.wimjiIcon = function(name, size=24) {
  return `<svg class="ui-icon" aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">${iconPath[name] || iconPath.cube}</svg>`;
};
window.wimjiLogo = function(){return `<img src="assets/wimji-logo.svg" class="mark-svg" width="611" height="348" alt="" aria-hidden="true">`};
class WimjiHeader extends HTMLElement {
 connectedCallback(){
  const page=this.getAttribute('page')||'home'; const isHome=page==='home';
  this.innerHTML=`<header class="site-header ${isHome?'header-home':''}"><div class="header-inner"><a class="site-logo" href="index.html" aria-label="Wimji homepage">${window.wimjiLogo()}<span class="site-logo-text">Wimji</span></a><nav id="site-navigation" class="site-navigation" aria-label="Main navigation"><div class="menu-dropdown"><button id="products-trigger" type="button" class="nav-link ${!isHome?'nav-active':''}" aria-expanded="false" aria-controls="product-menu">Products ${window.wimjiIcon('chevron',13)}</button><div class="product-menu" id="product-menu" hidden><a href="sprout.html"><span class="tiny-seed">◆</span><span>Sprout<small>Find and grow worlds</small></span></a><a href="blocksmith.html"><span class="tiny-block">◇</span><span>Blocksmith<small>Design and build</small></span></a></div></div><a href="index.html#about" class="nav-link">About</a><a href="index.html#news" class="nav-link">News</a></nav><button class="mobile-menu" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="Open menu">${window.wimjiIcon('menu',24)}</button></div></header>`;
  const btn=this.querySelector('.mobile-menu'); const nav=this.querySelector('.site-navigation');
  btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')!=='true';btn.setAttribute('aria-expanded',open);btn.setAttribute('aria-label',open?'Close menu':'Open menu');btn.innerHTML=window.wimjiIcon(open?'close':'menu',24);nav.classList.toggle('is-open',open)});
  const trigger=this.querySelector('#products-trigger');const menu=this.querySelector('#product-menu');
  trigger.addEventListener('click',()=>{let open=menu.hidden;menu.hidden=!open;trigger.setAttribute('aria-expanded',open)});
  const closeMenus=()=>{menu.hidden=true;trigger.setAttribute('aria-expanded','false');nav.classList.remove('is-open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Open menu');btn.innerHTML=window.wimjiIcon('menu',24)};
  document.addEventListener('click',(e)=>{if(!e.composedPath().includes(this))closeMenus()});
  this.addEventListener('keydown',(e)=>{if(e.key==='Escape'){e.preventDefault();closeMenus();(matchMedia('(max-width:450px)').matches?btn:trigger).focus()}});
  window.addEventListener('scroll',()=>this.querySelector('.site-header')?.classList.toggle('is-scrolled',window.scrollY>20),{passive:true});
 }
}
class WimjiFooter extends HTMLElement {
 connectedCallback(){this.innerHTML=`<footer class="site-footer"><div class="footer-main"><a class="site-logo" href="index.html">${window.wimjiLogo()}<span class="site-logo-text">Wimji</span></a><nav aria-label="Footer navigation"><a href="index.html">Home</a><a href="sprout.html">Sprout</a><a href="blocksmith.html">Blocksmith</a><a href="privacy.html">Privacy</a></nav></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Wimji Ltd. Made for creators.</span><span>Independent tools for creative play. Not affiliated with Mojang Studios, Minecraft or Microsoft.</span></div></footer>`; }
}
class WimjiFeature extends HTMLElement {
 connectedCallback(){const icon=this.getAttribute('icon')||'cube',title=this.getAttribute('heading')||'',description=this.getAttribute('description')||'';this.innerHTML=`<div class="feature-icon">${window.wimjiIcon(icon,37)}</div><h3>${title}</h3><p>${description}</p>`;}
}
class WimjiProductCard extends HTMLElement{
 connectedCallback(){const product=this.getAttribute('product')||'seed';const seed=product==='seed';let name=seed?'Sprout':'Blocksmith',description=seed?'Discover and grow<br>amazing Minecraft seeds.':'Design, build, and<br>share custom blocks.',asset=seed?'assets/seed-hero.png':'assets/block-hero.png',link=seed?'sprout.html':'blocksmith.html';this.innerHTML=`<a class="product-card product-card-${product}" href="${link}" aria-label="Explore ${seed?'Sprout':'Blocksmith'}"><img src="${asset}" alt="" loading="lazy"/><span class="product-card-gradient"></span><span class="product-card-contents"><span class="product-card-symbol">${window.wimjiIcon(seed?'sprout':'hammer',34)}</span><span class="product-card-title">${name}</span><span class="product-card-footer"><span>${description}</span><span class="product-card-arrow">${window.wimjiIcon('arrow',19)}</span></span></span></a>`;}
}
class WimjiTryButton extends HTMLElement{
 connectedCallback(){const app=this.getAttribute('app')==='block'?'Blocksmith':'Sprout';this.innerHTML=`<button class="btn btn-${app==='Blocksmith'?'orange':'lime'} try-button" type="button">Try ${app} ${window.wimjiIcon('external',15)}</button>`;this.querySelector('button').addEventListener('click',()=>document.querySelector('#coming-soon-dialog')?.showModal());}
}
class WimjiComingSoon extends HTMLElement{
 connectedCallback(){this.innerHTML=`<dialog id="coming-soon-dialog" class="coming-soon-dialog"><button class="dialog-close" aria-label="Close" type="button">${window.wimjiIcon('close',22)}</button><div class="dialog-symbol">✦</div><h2>Adventure incoming.</h2><p>App Store links will be added here when the apps are published. This is a working website concept, not an active download link.</p><div class="dialog-actions"><a href="sprout.html">Sprout</a><a href="blocksmith.html">Blocksmith</a></div></dialog>`;const dialog=this.querySelector('dialog');dialog.querySelector('.dialog-close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});}
}
customElements.define('wimji-header',WimjiHeader);
customElements.define('wimji-footer',WimjiFooter);
customElements.define('wimji-feature',WimjiFeature);
customElements.define('wimji-product-card',WimjiProductCard);
customElements.define('wimji-try-button',WimjiTryButton);
customElements.define('wimji-coming-soon',WimjiComingSoon);
document.addEventListener('DOMContentLoaded',()=>{
 const observer= new IntersectionObserver((entries)=>{for(const x of entries){if(x.isIntersecting){x.target.classList.add('revealed');observer.unobserve(x.target)}}},{threshold:.12});
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.on-scroll').forEach(el=>observer.observe(el));}else document.querySelectorAll('.on-scroll').forEach(el=>el.classList.add('revealed'));
});
