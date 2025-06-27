var M=Object.defineProperty;var P=(r,e,t)=>e in r?M(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var v=(r,e,t)=>P(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();class S{static async fadeIn(e,t=300){return e.style.opacity="0",e.style.display="",e.style.transition=`opacity ${t}ms ease-in-out`,e.offsetHeight,e.style.opacity="1",new Promise(i=>{setTimeout(()=>{e.style.transition="",i()},t)})}static async fadeOut(e,t=300){return e.style.opacity="1",e.style.transition=`opacity ${t}ms ease-in-out`,e.offsetHeight,e.style.opacity="0",new Promise(i=>{setTimeout(()=>{e.style.display="none",e.style.transition="",i()},t)})}static async slideIn(e,t="right",i=300){const s=t==="right"?"100%":"-100%";return e.style.transform=`translateX(${s})`,e.style.display="",e.style.transition=`transform ${i}ms ease-in-out`,e.offsetHeight,e.style.transform="translateX(0)",new Promise(o=>{setTimeout(()=>{e.style.transition="",o()},i)})}static async slideOut(e,t="left",i=300){const s=t==="left"?"-100%":"100%";return e.style.transform="translateX(0)",e.style.transition=`transform ${i}ms ease-in-out`,e.offsetHeight,e.style.transform=`translateX(${s})`,new Promise(o=>{setTimeout(()=>{e.style.display="none",e.style.transition="",o()},i)})}static async crossFade(e,t,i=300){await Promise.all([this.fadeOut(e,i),this.fadeIn(t,i)])}static async crossSlide(e,t,i="left",s=300){await Promise.all([this.slideOut(e,i,s),this.slideIn(t,i==="left"?"right":"left",s)])}static parallax(e,t=window,i={}){const{speed:s=.5,direction:o="vertical",min:n=-100,max:a=100}=i,l=()=>{e.getBoundingClientRect();const p=t===window?window.pageYOffset:t.scrollTop,x=p*s,k=Math.max(n,Math.min(a,x));e.style.transform=o==="vertical"?`translateY(${k}px)`:`translateX(${k}px)`};return t===window?(window.addEventListener("scroll",l),l()):(t.addEventListener("scroll",l),l()),()=>{t===window?window.removeEventListener("scroll",l):t.removeEventListener("scroll",l)}}}class B{constructor(e={}){if(this.routes=new Map,this.notFoundHandler=e.notFoundHandler||(()=>{console.error("Route not found")}),this.container=e.container,!this.container)throw new Error("Router container not found");this.currentView=null,this.isTransitioning=!1,this.pendingNavigation=null,this.viewWrapper=document.createElement("div"),this.viewWrapper.className="view-wrapper",this.container.appendChild(this.viewWrapper),window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",t=>{const i=t.target.closest("[data-link]");i&&(t.preventDefault(),this.navigate(i.getAttribute("href")))})}addRoute(e,t){return e=this.normalizePath(e),this.routes.set(e,t),this}normalizePath(e){return e.startsWith("/")||(e="/"+e),e!=="/"&&e.endsWith("/")&&(e=e.slice(0,-1)),e}async cleanupCurrentView(){if(this.currentView)try{await S.fadeOut(this.currentView.container),this.currentView.destroy(),this.currentView=null}catch(e){console.error("Error cleaning up current view:",e)}}async handleRoute(){if(this.isTransitioning){const i=this.normalizePath(window.location.pathname);this.pendingNavigation=i;return}let e=this.normalizePath(window.location.pathname),t=this.routes.get(e);if(!t&&e.endsWith("/")&&(e=e.slice(0,-1),t=this.routes.get(e)),!t&&!e.endsWith("/")&&(t=this.routes.get(e+"/")),!t){console.warn(`Route not found: ${e}`),this.notFoundHandler();return}this.isTransitioning=!0;try{await this.cleanupCurrentView(),this.viewWrapper.innerHTML="";const i=new t(this.viewWrapper);await i.init(),await S.fadeIn(i.container),this.currentView=i}catch(i){console.error("Error handling route:",i),this.notFoundHandler()}finally{if(this.isTransitioning=!1,this.pendingNavigation){const i=this.pendingNavigation;this.pendingNavigation=null,i!==e&&this.navigate(i,!0)}}}async navigate(e,t=!1){try{const i=new URL(e,window.location.origin).pathname,s=this.normalizePath(i),o=this.normalizePath(window.location.pathname);if(s===o)return;if(this.isTransitioning){t?history.replaceState(null,"",s):history.pushState(null,"",s);return}t?history.replaceState(null,"",s):history.pushState(null,"",s),await this.handleRoute()}catch(i){console.error("Error navigating:",i),this.notFoundHandler()}}init(){return this.handleRoute(),this}}class u{constructor(e={}){this._state=e,this._listeners=new Map,this._reducers=new Map,this._middlewares=[]}getState(){return{...this._state}}addReducer(e,t){this._reducers.set(e,t),e in this._state||(this._state[e]=t(void 0,{type:"@@INIT"}))}addMiddleware(e){this._middlewares.push(e)}subscribe(e,t){return this._listeners.has(e)||this._listeners.set(e,new Set),this._listeners.get(e).add(t),()=>{const i=this._listeners.get(e);i&&(i.delete(t),i.size===0&&this._listeners.delete(e))}}dispatch(e){let t=this._middlewares.reduce((o,n)=>n(this)(o),e),i=!1;const s={...this._state};return this._reducers.forEach((o,n)=>{const a=this._state[n],l=o(a,t);if(a!==l){i=!0,s[n]=l;const p=this._listeners.get(n);p&&p.forEach(x=>x(l,a))}}),i&&(this._state=s),t}static createAction(e){const t=i=>({type:e,payload:i});return t.toString=()=>e,t}static createReducer(e,t){return(i=e,s)=>t.hasOwnProperty(s.type)?t[s.type](i,s):i}static combineReducers(e){return(t={},i)=>{const s={};let o=!1;return Object.entries(e).forEach(([n,a])=>{const l=t[n],p=a(l,i);s[n]=p,o=o||p!==l}),o?s:t}}static createAsyncAction(e,t){const i={request:u.createAction(`${e}_REQUEST`),success:u.createAction(`${e}_SUCCESS`),failure:u.createAction(`${e}_FAILURE`)};return(...s)=>async o=>{o(i.request());try{const n=await t(...s);return o(i.success(n)),n}catch(n){throw o(i.failure(n)),n}}}static createSelector(...e){const t=e.slice(0,-1),i=e[e.length-1];let s=null,o=null;return n=>{const a=t.map(l=>l(n));return s&&a.every((l,p)=>l===s[p])||(s=a,o=i(...a)),o}}}class H{constructor(){this._events=new Map,this._onceEvents=new Map}on(e,t){return this._events.has(e)||this._events.set(e,new Set),this._events.get(e).add(t),()=>this.off(e,t)}once(e,t){return this._onceEvents.has(e)||this._onceEvents.set(e,new Set),this._onceEvents.get(e).add(t),()=>this.off(e,t,!0)}off(e,t,i=!1){const s=i?this._onceEvents:this._events,o=s.get(e);o&&(o.delete(t),o.size===0&&s.delete(e))}emit(e,...t){const i=this._events.get(e);i&&i.forEach(o=>{try{o(...t)}catch(n){console.error(`Error in event listener for ${e}:`,n)}});const s=this._onceEvents.get(e);s&&(s.forEach(o=>{try{o(...t)}catch(n){console.error(`Error in once event listener for ${e}:`,n)}}),this._onceEvents.delete(e))}async emitAsync(e,...t){const i=[],s=this._events.get(e);s&&s.forEach(n=>{try{const a=n(...t);a instanceof Promise&&i.push(a)}catch(a){console.error(`Error in async event listener for ${e}:`,a),i.push(Promise.reject(a))}});const o=this._onceEvents.get(e);return o&&(o.forEach(n=>{try{const a=n(...t);a instanceof Promise&&i.push(a)}catch(a){console.error(`Error in async once event listener for ${e}:`,a),i.push(Promise.reject(a))}}),this._onceEvents.delete(e)),Promise.all(i)}hasListeners(e){return this._events.has(e)&&this._events.get(e).size>0||this._onceEvents.has(e)&&this._onceEvents.get(e).size>0}getEvents(){return Array.from(new Set([...this._events.keys(),...this._onceEvents.keys()]))}removeAllListeners(e){e?(this._events.delete(e),this._onceEvents.delete(e)):(this._events.clear(),this._onceEvents.clear())}static createEventName(...e){return e.join(".")}}class y{constructor(e){if(!e)throw new Error("Container element is required");this.container=e,this._eventListeners=new Map,this._intersectionObservers=new Set,this._resizeObserver=null,this._mutationObserver=null,this._timeouts=new Set,this._intervals=new Set}setTitle(e){document.title=`${e} - Noelia Requena`}addEventListener(e,t,i,s){e.addEventListener(t,i,s),this._eventListeners.has(e)||this._eventListeners.set(e,new Map);const o=this._eventListeners.get(e);o.has(t)||o.set(t,new Set),o.get(t).add({listener:i,options:s})}createIntersectionObserver(e,t){const i=new IntersectionObserver(e,t);return this._intersectionObservers.add(i),i}createResizeObserver(e){return this._resizeObserver&&this._resizeObserver.disconnect(),this._resizeObserver=new ResizeObserver(e),this._resizeObserver}createMutationObserver(e){return this._mutationObserver&&this._mutationObserver.disconnect(),this._mutationObserver=new MutationObserver(e),this._mutationObserver}setTimeout(e,t){const i=setTimeout(e,t);return this._timeouts.add(i),i}setInterval(e,t){const i=setInterval(e,t);return this._intervals.add(i),i}clearTimeout(e){clearTimeout(e),this._timeouts.delete(e)}clearInterval(e){clearInterval(e),this._intervals.delete(e)}async init(){await this.render(),await this.afterRender()}render(){return Promise.resolve()}afterRender(){return Promise.resolve()}destroy(){this._eventListeners.forEach((e,t)=>{e.forEach((i,s)=>{i.forEach(({listener:o,options:n})=>{t.removeEventListener(s,o,n)})})}),this._eventListeners.clear(),this._intersectionObservers.forEach(e=>e.disconnect()),this._intersectionObservers.clear(),this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._mutationObserver&&(this._mutationObserver.disconnect(),this._mutationObserver=null),this._timeouts.forEach(e=>clearTimeout(e)),this._timeouts.clear(),this._intervals.forEach(e=>clearInterval(e)),this._intervals.clear(),this.container&&(this.container.innerHTML="")}}const F="home-module__cover___ePi9b",G="home-module__scrollDownBtn___d7LVM",D="home-module__bounce___qYUg7",N="home-module__resumen___xAVL2",V="home-module__slideshow-container___9LPVs",U="home-module__mySlides___pFs8l",W="home-module__text___fRUfS",X="home-module__numbertext___r6gLB",Y="home-module__dot___pGlYo",K="home-module__active___4SHiF",Z="home-module__fade___HU6j3",Q="home-module__slideshow___5EULK",J="home-module__slide___ZbR1h",ee="home-module__slideContent___Ia8n3",te="home-module__slideText___79cA-",ie="home-module__slideNav___5W8i-",se="home-module__prevSlide___KQidu",oe="home-module__nextSlide___ihQUc",ne="home-module__intro___grueX",re="home-module__introContent___f4HRo",ae="home-module__symbols___QUdY2",ce="home-module__hero___Cy-xE",h={cover:F,scrollDownBtn:G,bounce:D,resumen:N,"slideshow-container":"home-module__slideshow-container___9LPVs",slideshowContainer:V,mySlides:U,text:W,numbertext:X,dot:Y,active:K,fade:Z,slideshow:Q,slide:J,slideContent:ee,slideText:te,slideNav:ie,prevSlide:se,nextSlide:oe,intro:ne,introContent:re,symbols:ae,hero:ce};class le extends y{constructor(e){super(e),this._cleanupFunctions=[],this.currentSlide=0,this.slides=[{image:"/images/bg1.jpg",text:"Un anhelo cifrado, <br>un enigma de muchas dimensiones..."},{image:"/images/bg2.jpg",text:"La existencia se desnuda, <br> una pregunta en el vacío..."},{image:"/images/bg3.jpg",text:"El cuerpo como un temblor en el tiempo, <br>como un proceso de luz y sombra."},{image:"/images/bg4.jpg",text:"El cuerpo como un templo de tensiones, <br>como un templo hermético abierto <br>y cerrado al mismo tiempo..."}]}async render(){this.setTitle("Home"),this.container.innerHTML=`
            <section class="${h.hero}">
                <h1>Noelia Requena</h1>
            </section>

            <section class="${h.intro}">
                <div class="container">
                    <div class="${h.introContent}">
                        <div class="${h.symbols}">
                            ☽ □ ♇
                        </div>
                        <p class="emphasis">Busco expresar la complejidad de las emociones humanas a través
                                de la pintura. Mi trabajo se centra en explorar la relación entre el cuerpo, la identidad y la
                                experiencia vivida.</p>
                    </div>
                </div>
            </section>

            <div class="${h.slideshow}">
                ${this.slides.map((e,t)=>`
                    <section class="${h.slide} ${t===0?h.active:""}" 
                             style="background-image: url('${e.image}')">
                        <div class="${h.slideContent}">
                            <div class="${h.slideText}">
                                ${e.text}
                            </div>
                        </div>
                    </section>
                `).join("")}
                
                <div class="${h.slideNav}">
                    <button class="${h.prevSlide}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </button>
                    <button class="${h.nextSlide}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `,this.initializeSlideshow()}initializeSlideshow(){this.container.querySelector(`.${h.slideshow}`);const e=this.container.querySelectorAll(`.${h.slide}`),t=this.container.querySelector(`.${h.prevSlide}`),i=this.container.querySelector(`.${h.nextSlide}`),s=n=>{e.forEach(a=>a.classList.remove(h.active)),this.currentSlide=(n+e.length)%e.length,e[this.currentSlide].classList.add(h.active)};t.addEventListener("click",()=>s(this.currentSlide-1)),i.addEventListener("click",()=>s(this.currentSlide+1));const o=setInterval(()=>{s(this.currentSlide+1)},5e3);this._cleanupFunctions.push(()=>{clearInterval(o),t.removeEventListener("click",()=>{}),i.removeEventListener("click",()=>{})})}destroy(){this._cleanupFunctions.forEach(e=>e()),this._cleanupFunctions=[],super.destroy()}}const de="exposiciones-module__exposiciones___zN-9-",he="exposiciones-module__exposicionesContent___WuFP5 main__container___PD5qd",ue="exposiciones-module__expoBlock___eJm6p",me="exposiciones-module__content___ND8Gk",pe="exposiciones-module__date___hZ0ok",ge="exposiciones-module__subtitle___X938f",_e="exposiciones-module__description___3xPQu",ve="exposiciones-module__mediaContainer___dQ4Rf",be="exposiciones-module__image___-Vwqe",fe="exposiciones-module__video___C8H04",ye="exposiciones-module__details___t-IKc",we="exposiciones-module__grid___lbcEo",xe="exposiciones-module__gap-8___Xbdbk",Ee="exposiciones-module__grid-cols-12___C8od6",Le="exposiciones-module__col-span-4___WOaxH",ke="exposiciones-module__col-span-8___048wk",Se="exposiciones-module__exposicionesGrid___pqWPR",$e="exposiciones-module__expoItem___o3Kvo",Oe="exposiciones-module__thumbnail___sOR5E",ze="exposiciones-module__info___4B9YT",Ie="exposiciones-module__navigation___n3-6f",Ce="exposiciones-module__close___M2B72",m={exposiciones:de,exposicionesContent:he,expoBlock:ue,content:me,date:pe,subtitle:ge,description:_e,mediaContainer:ve,image:be,video:fe,details:ye,grid:we,"gap-8":"exposiciones-module__gap-8___Xbdbk",gap8:xe,"grid-cols-12":"exposiciones-module__grid-cols-12___C8od6",gridCols12:Ee,"col-span-4":"exposiciones-module__col-span-4___WOaxH",colSpan4:Le,"col-span-8":"exposiciones-module__col-span-8___048wk",colSpan8:ke,exposicionesGrid:Se,expoItem:$e,thumbnail:Oe,info:ze,navigation:Ie,close:Ce};class Te extends y{constructor(e){super(e),this.exposiciones=[{id:1,title:"Can Puget",date:"Sala de exposiciones Manlleu, 2023",thumbnail:"/images/expos/cartel_v1.jpeg",subtitle:"Ciertos procesos emocionales coagulan en forma de cuadros",content:{description:["Pinto desnudos como una forma de expresión posible que, lejos de alegorías y connotaciones reivindicativas, son en mí una tentativa de despojar de capas al cuerpo para acceder hacia mi verdad encarnada. Una desnudez que escoge la piel y la carne, que descarta arquetipos y capas teorizadas.","Busco reconocerme, descubrirme en el anonimato de distintos cuerpos, siendo ése el lugar donde no hay ausencia y donde lamo mis propias heridas irracionales, donde despojo a mi realidad de sus vestiduras.","Me apetece significar una piel cristalina, translúcida, frágil: como una vasija cubriendo la superficie del cuadro donde me puedo hacer invisible, y entrar o salir a voluntad.","En los matices del proceso pictórico se van superponiendo las instantáneas de cómo me sentí en ahoras ya transitados.","Me inundo en sensaciones mientras bajo a mi mundo emocional por medio de la materia, percepciones que una vez plasmadas parece que desaparecen o tal vez quedan escondidas como un misterio esperando a ser desvelado. Me dejo sorprender por mi propia necesidad irracional de fijar sombras sutiles, de remarcar cómo se proyecta la luz y se reafirman contornos; vinculándome a la sorpresa del propio descubrimiento.","En ocasiones al aplicar una determinada vibración de color, conecto con una sensación de éxtasis, como una pulsión de fundirme en una vibración divina. La luz iluminando partes del cuerpo descubre con capas muy delgadas y traslúcidas el camino que siento hacia lo sublime. Las corrientes delicadas de las luces y sus tonos se imprimen, de algún modo, también en mi cuerpo y en mi mente.","Los procesos pictóricos son un espejo, generando un espacio donde mis carencias y miedos se van viendo revelados tímidamente, donde danzan mis dualidades internas. Espacio donde es posible un encuentro conmigo misma, un encuentro en el que mi hacer caótico y desbordado busca contener(se) de todo lo que va quedando fijado."],media:[{type:"video",poster:"/images/expos/video_expo_6_poster.jpg",sources:[{src:"/images/expos/video_expo_6.webm",type:"video/webm"},{src:"/images/expos/video_expo_6.mp4",type:"video/mp4"}]},{type:"video",poster:"/images/expos/video_expo_5_poster.jpg",sources:[{src:"/images/expos/video_expo_5.webm",type:"video/webm"},{src:"/images/expos/video_expo_5.mp4",type:"video/mp4"}]}]}},{id:2,title:"Exposición colectiva",date:"Muestra de arte contemporáneo MGA, 2024",thumbnail:"/images/expos/expo2_3.jpg",subtitle:"Autocensura",content:{description:["Oculto, reprimo, me callo.","Experimentando un deterioro","y una deformación."],details:"Autocensura. Óleo sobre lienzo, 130x89cm, 2024",media:[{type:"video",poster:"/images/expos/video_expo_7_poster.jpg",sources:[{src:"/images/expos/video_expo_7.webm",type:"video/webm"},{src:"/images/expos/video_expo_7.mp4",type:"video/mp4"}]},{type:"image",src:"/images/expos/expo2_1.jpg",alt:"Exposición colectiva - Imagen 1"},{type:"image",src:"/images/expos/expo2_2.jpg",alt:"Exposición colectiva - Imagen 2"},{type:"image",src:"/images/expos/expo2_3.jpg",alt:"Exposición colectiva - Imagen 3"}]}}],this.currentExpo=null,this._cleanupFunctions=[],this._isExpoClick=!1,this.resizeObserver=null}async init(){return await super.init(),this.setTitle("Exposiciones"),this.currentExpo?this.renderExpo(this.currentExpo):this.renderGrid(),this.setupEvents(),this}renderGrid(){this.container.innerHTML=`
            <section class="${m.exposicionesGrid}">
                <div class="container">
                    <div class="${m.grid}">
                        ${this.exposiciones.map(e=>`
                            <article class="${m.expoItem}" data-expo-id="${e.id}" role="button" tabindex="0">
                                <div class="${m.thumbnail}">
                                    <img src="${e.thumbnail}" alt="${e.title}" loading="lazy">
                                </div>
                                <div class="${m.info}">
                                    <h3>${e.title}</h3>
                                    <p class="${m.date}">${e.date}</p>
                                </div>
                            </article>
                        `).join("")}
                    </div>
                </div>
            </section>
        `}renderExpo(e){this.container.innerHTML=`
            <section class="${m.exposicionDetalle}">
                <div class="container">
                    <div class="${m.content}">
                        <h2>${e.title}</h2>
                        <h3>${e.subtitle}</h3>
                        <div class="${m.text}">
                            ${e.content.description.map(t=>`
                                <p>${t}</p>
                            `).join("")}
                        </div>
                        <div class="${m.mediaContainer}">
                            ${e.content.media.map(t=>`
                                ${t.type==="video"?`
                                    <video 
                                        class="${m.video}" 
                                        controls 
                                        preload="none"
                                        playsinline
                                        poster="${t.poster}"
                                    >
                                        ${t.sources.map(i=>`
                                            <source src="${i.src}" type="${i.type}">
                                        `).join("")}
                                        Tu navegador no soporta el elemento video.
                                    </video>
                                `:`
                                    <img 
                                        src="${t.src}" 
                                        alt="${t.alt||""}" 
                                        class="${m.image}"
                                        loading="lazy"
                                    />
                                `}
                            `).join("")}
                        </div>
                        ${e.content.details?`
                            <div class="${m.details}">
                                <p>${e.content.details}</p>
                            </div>
                        `:""}
                    </div>
                </div>
            </section>
        `,this.setupResizeObserver()}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.disconnect(),this.resizeObserver=new ResizeObserver(t=>{t.forEach(i=>{this.resizeGridItem(i.target)})}),this.container.querySelectorAll(`.${m.image}, .${m.video}`).forEach(t=>{this.resizeObserver.observe(t)})}resizeGridItem(e){if(!e||!this.container)return;const t=e.closest(`.${m.mediaContainer}`);if(!t)return;const i=1,s=parseInt(window.getComputedStyle(t).rowGap)||10,o=e.getBoundingClientRect().height,n=Math.ceil((o+s)/(i+s));e.style.setProperty("--span",n)}setupEvents(){this._cleanupFunctions.forEach(i=>i()),this._cleanupFunctions=[],this.container.querySelectorAll(`.${m.expoItem}`).forEach(i=>{const s=o=>{o.preventDefault(),o.stopPropagation();const n=parseInt(i.dataset.expoId);this.currentExpo=this.exposiciones.find(a=>a.id===n),this._isExpoClick=!0,this.init()};i.style.cursor="pointer",i.addEventListener("click",s,!0),this._cleanupFunctions.push(()=>i.removeEventListener("click",s,!0))});const t=i=>{i.target.closest('a[href="/exposiciones"]')&&(i.preventDefault(),i.stopPropagation(),this.currentExpo=null,this.init())};document.addEventListener("click",t,!0),this._cleanupFunctions.push(()=>document.removeEventListener("click",t,!0))}getPrevExpo(e){const t=this.exposiciones.findIndex(i=>i.id===e);return this.exposiciones[t-1]}getNextExpo(e){const t=this.exposiciones.findIndex(i=>i.id===e);return this.exposiciones[t+1]}destroy(){this._cleanupFunctions.forEach(e=>e()),this._cleanupFunctions=[],super.destroy()}}const Ae="artworks-module__artworks___WqmJx",je="artworks-module__masonry-grid___Vws-K",qe="artworks-module__artworkImage___7kEr4",Re="artworks-module__review___MOfiv",Me="artworks-module__tabs___P9r3V",Pe="artworks-module__tablink___uu2Zp",Be="artworks-module__active___syuXv",He="artworks-module__tabcontent___gESW7",Fe="artworks-module__author___vH61j",c={artworks:Ae,"masonry-grid":"artworks-module__masonry-grid___Vws-K",masonryGrid:je,artworkImage:qe,review:Re,tabs:Me,tablink:Pe,active:Be,tabcontent:He,author:Fe},O="gallery/setImages",z="gallery/setCurrentImage",I="gallery/setFilter",C="gallery/toggleLightbox";u.createAction(O);u.createAction(z);u.createAction(I);u.createAction(C);const E=u.createAsyncAction("gallery/loadImages",async()=>[{id:1,src:"../images/obras/artwork1.jpg",title:"Artwork 1",category:"painting",width:1200,height:800},{id:2,src:"../images/obras/artwork2.jpg",title:"Artwork 2",category:"sculpture",width:800,height:1200},{id:3,src:"../images/obras/artwork3.jpg",title:"Artwork 3",category:"painting",width:1200,height:800},{id:4,src:"../images/obras/artwork4.jpg",title:"Artwork 4",category:"mixed",width:800,height:1200}]),Ge={images:[],currentImage:null,filter:"all",lightboxOpen:!1,loading:!1,error:null},De=u.createReducer(Ge,{[O]:(r,e)=>({...r,images:e.payload}),[z]:(r,e)=>({...r,currentImage:e.payload}),[I]:(r,e)=>({...r,filter:e.payload}),[C]:r=>({...r,lightboxOpen:!r.lightboxOpen}),[E.request]:r=>({...r,loading:!0,error:null}),[E.success]:(r,e)=>({...r,loading:!1,images:e.payload}),[E.failure]:(r,e)=>({...r,loading:!1,error:e.payload})}),Ne=r=>r.gallery.images,Ve=r=>r.gallery.filter;u.createSelector(Ne,Ve,(r,e)=>e==="all"?r:r.filter(t=>t.category===e));const g=class g{constructor(){v(this,"handleTouchStart",e=>{this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY});v(this,"handleTouchMove",e=>{e.preventDefault()});v(this,"handleTouchEnd",e=>{this.touchEndX=e.changedTouches[0].clientX,this.touchEndY=e.changedTouches[0].clientY;const t=this.touchEndX-this.touchStartX,i=this.touchEndY-this.touchStartY;Math.abs(t)>Math.abs(i)&&Math.abs(t)>50&&(t>0?this.previous():this.next())});v(this,"handleKeyPress",e=>{switch(e.key){case"Escape":this.close();break;case"ArrowLeft":this.previous();break;case"ArrowRight":this.next();break}});if(g.instance)return g.instance;g.instance=this,this.currentIndex=0,this.isOpen=!1,this.items=[],this.onChangeCallbacks=[],this.touchStartX=0,this.touchStartY=0,this.touchEndX=0,this.touchEndY=0}static getInstance(){return g.instance||(g.instance=new g),g.instance}setItems(e){this.items=e.map((t,i)=>({id:i+1,src:t.src,title:t.title||`Obra ${i+1}`,description:t.description||"Descripción de la obra.",width:t.width||800,height:t.height||600})),this.notifyChange()}open(e=0){this.isOpen=!0,this.currentIndex=e,this.notifyChange(),this.renderLightbox()}close(){this.isOpen=!1,this.notifyChange(),this.removeLightbox(),document.body.style.overflow="",document.body.style.position="",document.body.style.width="",document.body.style.height="",document.documentElement.style.overflow="",document.documentElement.style.position="",document.documentElement.style.width="",document.documentElement.style.height="",window.scrollTo(0,window.scrollY)}next(){this.currentIndex<this.items.length-1&&(this.currentIndex++,this.updateLightboxContent(),this.notifyChange())}previous(){this.currentIndex>0&&(this.currentIndex--,this.updateLightboxContent(),this.notifyChange())}getCurrentItem(){return this.items[this.currentIndex]}renderLightbox(){const e=this.getCurrentItem(),t=this.currentIndex===this.items.length-1,i=document.createElement("div");i.id="gallery-lightbox",i.className="gallery-lightbox active",i.innerHTML=`
            <div class="gallery-lightbox-content">
                <img src="${e.src}" alt="${e.title}" />
                <div class="gallery-lightbox-info">
                    <h2>${e.title}</h2>
                    <p>${e.description}</p>
                </div>
                <button class="gallery-lightbox-close" aria-label="Cerrar galería">&times;</button>
                <button class="gallery-lightbox-prev ${this.currentIndex===0?"hidden":""}" 
                        aria-label="Imagen anterior">&lt;</button>
                <button class="gallery-lightbox-next ${t?"hidden":""}" 
                        aria-label="Imagen siguiente">&gt;</button>
            </div>
        `,document.body.appendChild(i),document.body.style.overflow="hidden",i.querySelector(".gallery-lightbox-close").addEventListener("click",()=>this.close());const s=i.querySelector(".gallery-lightbox-prev"),o=i.querySelector(".gallery-lightbox-next");s.classList.contains("hidden")||s.addEventListener("click",()=>this.previous()),o.classList.contains("hidden")||o.addEventListener("click",()=>this.next()),i.addEventListener("click",a=>{a.target===i&&this.close()}),document.addEventListener("keydown",this.handleKeyPress);const n=i.querySelector(".gallery-lightbox-content");n.addEventListener("touchstart",this.handleTouchStart,{passive:!0}),n.addEventListener("touchmove",this.handleTouchMove,{passive:!1}),n.addEventListener("touchend",this.handleTouchEnd,{passive:!0}),setTimeout(()=>i.classList.add("active"),0)}updateLightboxContent(){const e=document.getElementById("gallery-lightbox");if(!e)return;const t=this.getCurrentItem(),i=this.currentIndex===this.items.length-1,s=e.querySelector(".gallery-lightbox-content");s.querySelector("img").src=t.src,s.querySelector("img").alt=t.title,s.querySelector("h2").textContent=t.title,s.querySelector("p").textContent=t.description;const o=s.querySelector(".gallery-lightbox-prev"),n=s.querySelector(".gallery-lightbox-next");o&&o.classList.toggle("hidden",this.currentIndex===0),n&&n.classList.toggle("hidden",i)}removeLightbox(){const e=document.getElementById("gallery-lightbox");if(e){const t=e.querySelector(".gallery-lightbox-content");t.removeEventListener("touchstart",this.handleTouchStart),t.removeEventListener("touchmove",this.handleTouchMove),t.removeEventListener("touchend",this.handleTouchEnd),document.body.removeChild(e),document.body.style.overflow=""}document.removeEventListener("keydown",this.handleKeyPress)}subscribe(e){return this.onChangeCallbacks.push(e),()=>{this.onChangeCallbacks=this.onChangeCallbacks.filter(t=>t!==e)}}notifyChange(){this.onChangeCallbacks.forEach(e=>e())}};v(g,"instance",null);let L=g;class Ue extends y{constructor(e){super(e),this.artworks=[{src:"/images/obras/img1.jpg",title:"Obra 1",description:"Óleo sobre madera. 58x44cm, 2022",width:800,height:1200},{src:"/images/obras/img2.jpg",title:"Obra 2",description:"Óleo sobre lienzo. 31x23cm, 2019",width:1200,height:800},{src:"/images/obras/img3.jpg",title:"Obra 3",description:"Óleo sobre lienzo. 31x23cm, 2019",width:800,height:1200},{src:"/images/obras/img4.jpg",title:"Obra 4",description:"Óleo sobre papel. 31x21cm, 2019",width:1200,height:800},{src:"/images/obras/img5.jpg",title:"Obra 5",description:"Óleo sobre madera. 61x50cm, 2019",width:800,height:1200},{src:"/images/obras/img6.jpg",title:"Obra 6",description:"Óleo sobre madera. 41x33cm, 2019",width:1200,height:800},{src:"/images/obras/img7.jpg",title:"Obra 7",description:"Óleo sobre madera. 50x50cm, 2019",width:800,height:1200},{src:"/images/obras/img8.jpg",title:"Obra 8",description:"Óleo sobre madera. 100x100cm, 2019",width:1200,height:800},{src:"/images/obras/img9.jpg",title:"Obra 9",description:"Óleo sobre madera. 122x60.5cm, 2019",width:800,height:1200},{src:"/images/obras/img10.jpg",title:"Obra 10",description:"Óleo sobre lienzo. 116x81cm, 2019",width:1200,height:800},{src:"/images/obras/img11.jpg",title:"Obra 11",description:"Óleo sobre lienzo. 116x81cm, 2019",width:800,height:1200},{src:"/images/obras/img12.jpg",title:"Obra 12",description:"Óleo sobre madera. 73x55cm, 2019",width:1200,height:800},{src:"/images/obras/img13.jpg",title:"Obra 13",description:"Óleo sobre madera. 73x55cm, 2019",width:800,height:1200},{src:"/images/obras/img14.jpg",title:"Obra 14",description:"Óleo sobre madera. 80x65cm, 2020",width:1200,height:800},{src:"/images/obras/img15.jpg",title:"Obra 15",description:"Óleo sobre madera. 92x73cm, 2020",width:800,height:1200},{src:"/images/obras/img19.jpg",title:"Obra 19",description:"Óleo sobre madera. 100x40cm, 2020",width:800,height:1200},{src:"/images/obras/img20.jpg",title:"Obra 20",description:"Óleo sobre madera. 122x60.5cm, 2020",width:1200,height:800},{src:"/images/obras/img21.jpg",title:"Obra 21",description:"Óleo sobre madera. 92x73cm, 2020",width:800,height:1200},{src:"/images/obras/img22.jpg",title:"Obra 22",description:"Óleo sobre madera. 58x44cm, 2021",width:1200,height:800},{src:"/images/obras/img23.jpg",title:"Obra 23",description:"Óleo sobre lienzo. 90x73cm, 2021",width:800,height:1200},{src:"/images/obras/img24.jpg",title:"Obra 24",description:"Óleo sobre lienzo. 92x73cm, 2021",width:1200,height:800},{src:"/images/obras/img25.jpg",title:"Obra 25",description:"Óleo sobre lienzo. 100x100cm, 2021",width:800,height:1200},{src:"/images/obras/img26.jpg",title:"Obra 26",description:"Óleo sobre madera. 100x100cm, 2021",width:1200,height:800},{src:"/images/obras/img27.jpg",title:"Obra 27",description:"Óleo sobre lienzo. 140x81cm, 2021",width:800,height:1200},{src:"/images/obras/img28.jpg",title:"Obra 28",description:"Óleo sobre lienzo, 120x100cm, 2021",width:1200,height:800},{src:"/images/obras/img29.jpg",title:"Obra 29",description:"Óleo sobre lienzo, 146x97cm, 2023",width:800,height:1200},{src:"/images/obras/img30.jpg",title:"Obra 30",description:"Óleo sobre lienzo, 146x89cm, 2023",width:1200,height:800},{src:"/images/obras/img31.jpg",title:"Obra 31",description:"Óleo sobre lienzo, 146x89cm, 2023",width:800,height:1200},{src:"/images/obras/img32.jpg",title:"Obra 32",description:"Óleo sobre lienzo, 130x89cm, 2022",width:1200,height:800},{src:"/images/obras/img33.jpg",title:"Obra 33",description:"Óleo sobre lienzo, 146x97cm, 2023",width:800,height:1200},{src:"/images/obras/img34.jpg",title:"Obra 34",description:"Óleo sobre lienzo, 130x89cm, 2022",width:1200,height:800},{src:"/images/obras/img35.jpg",title:"Obra 35",description:"Óleo sobre lienzo,100x100cm, 2021",width:800,height:1200},{src:"/images/obras/img36.jpg",title:"Obra 36",description:"Óleo sobre lienzo,130x89cm, 2023",width:1200,height:800},{src:"/images/obras/img37.jpg",title:"Obra 37",description:"Óleo sobre lienzo, 146x114cm, 2024",width:800,height:1200},{src:"/images/obras/img38.jpg",title:"Obra 38",description:"Óleo sobre lienzo, 146x114cm, 2024",width:800,height:1200},{src:"/images/obras/img39.jpg",title:"Obra 39",description:"Óleo sobre lienzo, 130x89cm, 2023",width:1200,height:800},{src:"/images/obras/img40.jpg",title:"Obra 40",description:"Óleo sobre lienzo, 150x90cm, 2023",width:800,height:1200},{src:"/images/obras/img41.jpg",title:"Obra 41",description:"Óleo sobre lienzo, 130x80cm, 2023",width:1200,height:800}].map((t,i)=>({...t,width:i%2===0?800:1200,height:i%2===0?1200:800})),this.galleryStore=new L,this.resizeObserver=null,this._boundResizeHandler=this.handleResize.bind(this)}async init(){return await super.init(),this.setTitle("Artworks"),this.container.innerHTML=`
            <section class="${c.artworks}">
                <div class="container">
                    <div class="grid gap-4">
                    </div>
                </div>
                <div class="${c.masonryGrid}">
                    ${this.generateArtworksHTML()}
                </div>
                <div class="${c.review} container">
                    <div class="${c.tabs}">
                        <button class="${c.tablink} ${c.active}" data-lang="en">EN</button>
                        <button class="${c.tablink}" data-lang="es">ES</button>
                    </div>
                    
                    <div id="en" class="${c.tabcontent} ${c.active}">
                        <h3>Review</h3>
                        <p>"A body in space. A tremor in time. A process of light and shade. Once revealed, the body disintegrates and is deconstructed. A spontaneous crystallisation of dynamic contrasts. A chiaroscuro of fragility and power, cold and heat. The body is a temple of tensions; hermetic, open and shut at the same time, existing only in the logic of membranes. Light that passes through, reflected like the nervous shade of something more. The ornament of the oils captures it like an insect in amber. Frozen but at the same time fluttering. An encrypted longing, like a puzzle in multiple dimensions. The precise and graceful line (a calligraphy of mysteries), unravelling the inexhaustible mystery of beauty. Ariadne's thread entangling. A dark profession. The beauty of horror and the horror of beauty. We need the contrast. The balance in the contradiction. Always the light and the shade, the chiaroscuro...</p>

                        <p>As in the Japanese technique, kintsugi, the lacquer repairs the cracks in the broken ceramic, which is the body. There is a beauty in the crack, like a latent sign of its interior life: vortex of a wound made manifest on the outside. Cloth covers the shape like a gauze a mould. Skin as impasto. Life as a continuous moment of uncertainty. Are we free or are we confined within the coordinates of chance? This is the mystery of a body in a room, a body inhabiting a space, of a body being space. Existence is naked like a question in the void, spilling over the morning air, reflected in the light coming through the window. In this frame, in this space we celebrate the mystery of life."</p>
                        <p class="${c.author}">— Román Bayarri</p>
                    </div>
                    
                    <div id="es" class="${c.tabcontent}">
                        <h3>Reseña</h3>
                        <p>"Un cuerpo en el espacio. Un temblor en el tiempo. Un proceso de luz y sombra. Una vez revelado, el cuerpo se desintegra y se deconstruye. Una cristalización espontánea de contrastes dinámicos. Un claroscuro de fragilidad y poder, frío y calor. El cuerpo es un templo de tensiones; hermético, abierto y cerrado al mismo tiempo, existiendo solo en la lógica de las membranas. Luz que atraviesa, reflejada como la sombra nerviosa de algo más. El ornamento de los óleos lo captura como un insecto en ámbar. Congelado pero al mismo tiempo revoloteando. Un anhelo encriptado, como un rompecabezas en múltiples dimensiones. La línea precisa y grácil (una caligrafía de misterios), desentrañando el misterio inagotable de la belleza. El hilo de Ariadna enredándose. Una profesión oscura. La belleza del horror y el horror de la belleza. Necesitamos el contraste. El equilibrio en la contradicción. Siempre la luz y la sombra, el claroscuro...</p>
                        <p>Como en la técnica japonesa, kintsugi, la laca repara las grietas en la cerámica rota, que es el cuerpo. Hay una belleza en la grieta, como un signo latente de su vida interior: vórtice de una herida que se manifiesta en el exterior. La tela cubre la forma como una gasa un molde. La piel como empaste. La vida como un momento continuo de incertidumbre. ¿Somos libres o estamos confinados dentro de las coordenadas del azar? Este es el misterio de un cuerpo en una habitación, un cuerpo habitando un espacio, de un cuerpo siendo espacio. La existencia está desnuda como una pregunta en el vacío, derramándose sobre el aire de la mañana, reflejada en la luz que entra por la ventana. En este marco, en este espacio celebramos el misterio de la vida."</p>
                        <p class="${c.author}">— Román Bayarri</p>
                    </div>
                </div>
            </section>
        `,this.galleryStore.setItems(this.artworks),this.setupGalleryEvents(),window.addEventListener("resize",this._boundResizeHandler),requestAnimationFrame(async()=>{try{await this.loadAndResizeImages()}catch{}}),this}resizeGridItem(e){if(!e||!this.container)return;const t=this.container.querySelector(`.${c.masonryGrid}`);if(!t)return;const i=parseInt(window.getComputedStyle(t).gridAutoRows)||1,s=parseInt(window.getComputedStyle(t).rowGap)||10,o=e.getBoundingClientRect().height,n=Math.ceil((o+s)/(i+s));e.style.setProperty("--span",n)}handleResize(){this.container.querySelectorAll(`.${c.artworkImage}`).forEach(t=>this.resizeGridItem(t))}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.disconnect(),this.resizeObserver=new ResizeObserver(t=>{t.forEach(i=>{this.resizeGridItem(i.target)})}),this.container.querySelectorAll(`.${c.artworkImage}`).forEach(t=>{this.resizeObserver.observe(t)})}async loadAndResizeImages(){const e=[];this.container.querySelectorAll(`.${c.artworkImage}`).forEach(i=>{e.push(new Promise(s=>{i.complete?(this.resizeGridItem(i),s()):(i.onload=()=>{this.resizeGridItem(i),s()},i.onerror=()=>{s()})}))}),await Promise.all(e)}generateArtworksHTML(){return this.artworks.map((e,t)=>`
                <img 
                    class="${c.artworkImage}"
                    src="${e.src}"
                    alt="${e.title}"
                    loading="lazy"
                    width="${e.width}"
                    height="${e.height}"
                    data-index="${t}"
                />
            `).join("")}setupGalleryEvents(){this.container.querySelectorAll(`.${c.artworkImage}`).forEach(i=>{i.addEventListener("click",s=>{s.preventDefault();const o=parseInt(i.dataset.index);isNaN(o)||this.galleryStore.open(o)})});const t=this.container.querySelectorAll(`.${c.tablink}`);t.forEach(i=>{i.addEventListener("click",()=>{const s=i.dataset.lang;t.forEach(n=>n.classList.remove(c.active)),i.classList.add(c.active),this.container.querySelectorAll(`.${c.tabcontent}`).forEach(n=>{n.id===s?n.classList.add(c.active):n.classList.remove(c.active)})})})}destroy(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),window.removeEventListener("resize",this._boundResizeHandler),this.container.querySelectorAll(`.${c.artworkImage}`).forEach(t=>{t.removeEventListener("click",()=>{})}),super.destroy()}}const We="bio-module__bio___8QJsz",Xe="bio-module__bioContent___q-x1Q main__container___PD5qd",Ye="bio-module__avatarContainer___HI6z8",Ke="bio-module__avatar___QOTOZ",Ze="bio-module__quoteAuthor___KBW8Z",Qe="bio-module__quote___zk5bK",Je="bio-module__bioTabs___NRYb-",_={bio:We,bioContent:Xe,avatarContainer:Ye,avatar:Ke,quoteAuthor:Ze,quote:Qe,bioTabs:Je};class et{constructor(e,t){this.container=e,this.tabs=t,this.activeTab=0,this.buttons=[],this.contentContainer=null,this.render(),this.addEventListeners()}render(){const e=document.createElement("div");e.className="tab-buttons",this.tabs.forEach((t,i)=>{const s=document.createElement("button");s.textContent=t.label,s.className=i===this.activeTab?"active":"",this.buttons.push(s),e.appendChild(s)}),this.contentContainer||(this.contentContainer=document.createElement("div"),this.contentContainer.className="tab-content"),this.contentContainer.innerHTML=this.tabs[this.activeTab].content,this.container.contains(e)||(this.container.innerHTML="",this.container.appendChild(e),this.container.appendChild(this.contentContainer))}addEventListeners(){this.buttons.forEach((e,t)=>{e.addEventListener("click",()=>{t!==this.activeTab&&this.setActiveTab(t)})})}setActiveTab(e){this.buttons.forEach((t,i)=>{t.className=i===e?"active":""}),this.activeTab=e,this.contentContainer.innerHTML=this.tabs[this.activeTab].content}}class tt extends y{constructor(e){super(e),this.tabLink=null}async init(){await super.init(),this.setTitle("Bio"),this.container.innerHTML=`
            <section class="${_.bio} container">
                <div class="grid gap-8">
                    <div class="col-span-12 md:col-span-6">
                        <div class="${_.avatarContainer}">
                            <img 
                                src="/images/avatar.jpg" 
                                alt="Noelia Requena" 
                                class="${_.avatar}"
                                loading="lazy"
                                onload="this.classList.add('${_.loaded}')"
                            />
                        </div>
                    </div>
                    
                    <div class="col-span-12 md:col-span-6">
                        <div class="${_.bioContent}">
                            <div id="bio-tabs" class="${_.bioTabs}"></div>
                        </div>
                    </div>
                </div>
            </section>
        `;const e=this.container.querySelector("#bio-tabs");if(!e)return console.error("Bio tabs container not found"),this;const t=[{label:"EN",content:`
                    <blockquote class="emphasis">
                        "When one becomes aware of the mystery of existence and does not understand it, but out of sheer sincerity and inner coherence, she needs answers even to the pain, then one finds her golden and wonderful Ariadna's thread"
                    </blockquote>
                    <p class="${_.quoteAuthor}">
                        — Blas Cubells
                    </p>
                    
                    <dl>
                        <dt>Born in Vic (Barcelona) in 1976.</dt>
                        <dt>1985-1991</dt>
                        <dd>
                            During my childhood I trained at the
                            <i>Escola de dibuix i art Masferrer</i> in Vic with the teachers
                            Pere Isern Puntí, Eduard Xandri Calvet, Lluís Bres Oliva, Lluís Gros
                            Pujol...
                        </dd>
            
                        <dt>1994-1995</dt>
                        <dd>
                            Studied at the
                            <i>Escola d'arts aplicades i oficis artístics</i> (School of Applied
                            Arts and Crafts) in Vic.
                        </dd>
                        <dt>1997-2001</dt>
                        <dd>
                            Degree in Fashion Design from the
                            <i>Escola Superior de Disseny Bau</i> in Barcelona.
                        </dd>
                        <dt>2000-2001</dt>
                            <dd>Millinery workshop in Barcelona with <i>Nina Pawloswsky</i>.</dd>
                        <dt>1999-2004</dt>
                        <dd>
                        Began working with the women's fashion brand
                        <i>Giménez&amp;Zuazo</i> and its other brand <i>Boba by G&amp;Z</i>,
                        with distribution nationally and internationally through 250
                        multi-brands channels in Spain, France, Italy, Japan and others.
                        </dd>
            
                        <dd>
                            Under the leadership of the partners, co-managed the design
                            department. I was responsible for the entire design process and the
                            illustrations, developing the collections, researching the latest
                            looks and trends, design, drafting and supervising the technical
                            specifications, coordination with the patterns team, managing
                            accessories and materials, coordination with fabric printing and production companies.
                        </dd>
                        <dt>2004-2010</dt>
                        <dd>
                            Creative director and founding partner of the women's fashion brand
                            Obvia. Development of the business idea, part of the management
                            team, co-director of the design department, director of production,
                            director of sales. National distribution to multi-brand points of
                            sale in Spain. Local production.
                        </dd>
                        <dt>2010-2018</dt>
                        <dd>
                            Freelance Textile Graphic Designer. Designer of prints for women, men and children's clothing&nbsp;for
                            <i>Padma Diseño S.L., Zara, Pull&amp;Bear, Bershka, Mango, Replay, Springfield, Blue Inc., Studio F Women / STF Group Colombia</i>...
                        </dd>
            
                        <dt>2019</dt>
                        <dd>
                        Left the world of fashion and illustration to begin looking for a
                        more intimate mode of expression.
                        </dd>
                        <dd>
                        In parallel with my professional career, I maintained a constant
                        level of training in the art world, with incursions into a variety
                        of techniques such as lacquer, ceramics, sculpture, oils, art for
                        children, artist books, as well as astrology and active learning.
                        </dd>
                        <dd>
                        Currently, I live with my partner, the multidisciplinary artist
                        Sergio Forés. Mother to two children and searching for alternative
                        ways of life and education. In 2014 I moved to a small village in
                        Alt Penedès surrounded by vineyards and nature.
                        </dd>
                    </dl>
                `},{label:"ES",content:`
                    <blockquote class="emphasis">
                        "Cuando uno toma conciencia del misterio de la existencia y no lo entiende, pero por pura sinceridad y coherencia interior, necesita respuestas hasta el dolor, entonces encuentra su dorado y maravilloso hilo de Ariadna"
                    </blockquote>
                    <p class="${_.quoteAuthor}">
                        — Blas Cubells
                    </p>
                    
                    <dl>
                        <dt>Nacida en Vic (Barcelona) en 1976.</dt>
                        <dt>1985-1991</dt>
                        <dd>
                            Durante mi infancia me formé en la
                            <i>Escola de dibuix i art Masferrer</i> de Vic con los profesores
                            Pere Isern Puntí, Eduard Xandri Calvet, Lluís Bres Oliva, Lluís Gros
                            Pujol...
                        </dd>
            
                        <dt>1994-1995</dt>
                        <dd>
                            Estudié en la
                            <i>Escola d'arts aplicades i oficis artístics</i> de Vic.
                        </dd>
                        <dt>1997-2001</dt>
                        <dd>
                            Graduada en Diseño de Moda por la
                            <i>Escola Superior de Disseny Bau</i> de Barcelona.
                        </dd>
                        <dt>2000-2001</dt>
                            <dd>Taller de sombrerería en Barcelona con <i>Nina Pawloswsky</i>.</dd>
                        <dt>1999-2004</dt>
                        <dd>
                        Comencé a trabajar con la marca de moda femenina
                        <i>Giménez&amp;Zuazo</i> y su otra marca <i>Boba by G&amp;Z</i>,
                        con distribución nacional e internacional a través de 250
                        canales multimarca en España, Francia, Italia, Japón y otros.
                        </dd>
            
                        <dd>
                            Bajo la dirección de los socios, cogestioné el departamento de diseño.
                            Fui responsable de todo el proceso de diseño y las ilustraciones,
                            desarrollo de colecciones, investigación de las últimas tendencias,
                            diseño, redacción y supervisión de especificaciones técnicas,
                            coordinación con el equipo de patronaje, gestión de accesorios y
                            materiales, coordinación con empresas de estampación textil y producción.
                        </dd>
                        <dt>2004-2010</dt>
                        <dd>
                            Directora creativa y socia fundadora de la marca de moda femenina
                            Obvia. Desarrollo de la idea de negocio, parte del equipo directivo,
                            codirectora del departamento de diseño, directora de producción,
                            directora de ventas. Distribución nacional a puntos de venta
                            multimarca en España. Producción local.
                        </dd>
                        <dt>2010-2018</dt>
                        <dd>
                            Diseñadora Gráfica Textil Freelance. Diseñadora de estampados para ropa de mujer, hombre y niños&nbsp;para
                            <i>Padma Diseño S.L., Zara, Pull&amp;Bear, Bershka, Mango, Replay, Springfield, Blue Inc., Studio F Women / STF Group Colombia</i>...
                        </dd>
            
                        <dt>2019</dt>
                        <dd>
                        Dejé el mundo de la moda y la ilustración para comenzar a buscar un
                        modo de expresión más íntimo.
                        </dd>
                        <dd>
                        En paralelo a mi carrera profesional, mantuve una formación constante
                        en el mundo del arte, con incursiones en diversas técnicas como la
                        laca, la cerámica, la escultura, el óleo, el arte para niños, los
                        libros de artista, así como la astrología y el aprendizaje activo.
                        </dd>
                        <dd>
                        Actualmente, vivo con mi pareja, el artista multidisciplinar
                        Sergio Forés. Madre de dos hijos y en búsqueda de formas alternativas
                        de vida y educación. En 2014 me mudé a un pequeño pueblo del
                        Alt Penedès rodeado de viñedos y naturaleza.
                        </dd>
                    </dl>
                `}];return this.tabLink=new et(e,t),this}destroy(){this.tabLink&&(this.tabLink=null),super.destroy()}}const it="header-module__header___CDHEd",st="header-module__logo___QfbDQ",f={header:it,logo:st};class ot{constructor(e){if(this.container=e,!this.container)throw new Error("Header container not found");this.render(),this.addEventListeners()}render(){this.container.innerHTML=`
            <header class="${f.header}">
                <a href="/" class="${f.logo}" data-link>
                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:bevel;stroke-miterlimit:1.5" viewBox="0 0 408 409">
                        <circle cx="102436" cy="13938.8" r="553.055" style="fill:none;stroke-width:22.12px" transform="matrix(.36163 0 0 .36163 -36839.796 -4836.64)"/>
                        <circle cx="102436" cy="13938.8" r="553.055" style="fill:none;stroke-width:33.18px" transform="matrix(.2411 0 0 .2411 -24493.885 -3223.357)"/>
                        <circle cx="102436" cy="13938.8" r="553.055" style="fill:none;stroke-width:66.36px" transform="translate(-12144.912 -1476.333) scale(.12055)"/>
                        <circle cx="102436" cy="13938.8" r="553.055" style="fill:none;stroke-width:33.18px" transform="matrix(.2411 0 0 .2411 -24493.885 -3090.011)"/>
                    </svg>
                </a>
            </header>
        `}addEventListeners(){const e=this.container.querySelector(`.${f.logo}`);e&&e.addEventListener("click",t=>{t.preventDefault();const i=window.router||window.app&&window.app.router;i?i.navigate("/",!1):window.location.href="/"})}destroy(){const e=this.container.querySelector(`.${f.logo}`);e&&e.removeEventListener("click",()=>{})}}const nt="navigation-module__menu___NArl5",rt="navigation-module__hidden___3fPtV",at="navigation-module__active___ak5Pu",ct="navigation-module__menuItems___FHiO1",lt="navigation-module__hamburger___EnsKU",d={menu:nt,hidden:rt,active:at,menuItems:ct,hamburger:lt};class dt{constructor(e){if(this.container=e,!this.container)throw new Error("Navigation container not found");this.isMenuOpen=!1,this.render(),this.addEventListeners()}render(){this.container.innerHTML=`
            <nav id="navbar" class="${d.menu}" aria-label="Menú principal">
                <button class="${d.hamburger}" 
                        aria-expanded="false"
                        aria-controls="main-menu"
                        aria-label="Abrir menú">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
                <div id="main-menu" class="${d.menuItems}" role="menu">
                    <a href="/exposiciones" data-link role="menuitem">expo</a>
                    <a href="/artworks" data-link role="menuitem">artworks</a>
                    <a href="/bio" data-link role="menuitem">bio</a>
                </div>
            </nav>
        `,this.updateActiveLink()}addEventListeners(){const e=this.container.querySelector(`.${d.hamburger}`);e&&(e.addEventListener("click",()=>{this.isMenuOpen=!this.isMenuOpen,e.classList.toggle(d.active),e.setAttribute("aria-expanded",this.isMenuOpen),this.container.querySelector(`.${d.menuItems}`).classList.toggle(d.active),document.body.classList.toggle("menu-active")}),e.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),e.click())})),this.container.querySelectorAll(`.${d.menuItems} a`).forEach(o=>{o.addEventListener("click",n=>this.handleClick(n)),o.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),this.handleClick(n))})});const i=o=>{if(!this.isMenuOpen)return;const n=this.container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),a=n[0],l=n[n.length-1];o.key==="Tab"&&(o.shiftKey?document.activeElement===a&&(o.preventDefault(),l.focus()):document.activeElement===l&&(o.preventDefault(),a.focus()))};this.container.addEventListener("keydown",i);let s=window.scrollY;window.addEventListener("scroll",()=>{if(window.innerWidth>768){const o=window.scrollY,n=document.getElementById("navbar");o>s&&o>100?(n.classList.add(d.hidden),this.isMenuOpen&&(this.isMenuOpen=!1,e.classList.remove(d.active),e.setAttribute("aria-expanded","false"),this.container.querySelector(`.${d.menuItems}`).classList.remove(d.active),document.body.classList.remove("menu-active"))):n.classList.remove(d.hidden),s=o}}),window.addEventListener("popstate",()=>this.updateActiveLink()),document.addEventListener("click",o=>{o.target.closest("[data-link]")&&setTimeout(()=>this.updateActiveLink(),0)})}handleClick(e){const t=e.target.closest("[data-link]");if(t){e.preventDefault();const i=t.getAttribute("href");if(i===window.location.pathname&&window.dispatchEvent(new CustomEvent("resetView")),window.router.navigate(i),window.innerWidth<=768){this.isMenuOpen=!1;const s=this.container.querySelector(`.${d.hamburger}`);s.classList.remove(d.active),s.setAttribute("aria-expanded","false"),this.container.querySelector(`.${d.menuItems}`).classList.remove(d.active),document.body.classList.remove("menu-active")}}}updateActiveLink(){const e=window.location.pathname;this.container.querySelectorAll("a").forEach(i=>{i.getAttribute("href")===e?i.classList.add(d.active):i.classList.remove(d.active)})}}const ht="footer-module__footer___s8ROr",ut="footer-module__name___hy6CZ",mt="footer-module__socialLink___5ufUO",pt="footer-module__social___ZSd6K",gt="footer-module__copyright___UFGxU",$={footer:ht,name:ut,socialLink:mt,social:pt,copyright:gt};class _t{constructor(e){if(this.container=e,!this.container)throw new Error("Footer container not found");this.render()}render(){this.container.innerHTML=`
            <div class="${$.footer}">
                <a href="https://www.instagram.com/noelia__requena/" target="_blank" rel="noopener" class="${$.socialLink}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </a>
            </div>
        `}}const T="ui/setTheme",A="ui/toggleMenu",j="ui/setLoading",q="ui/setError",R="ui/clearError";u.createAction(T);u.createAction(A);u.createAction(j);u.createAction(q);u.createAction(R);const vt={theme:"light",menuOpen:!1,loading:!1,error:null},bt=u.createReducer(vt,{[T]:(r,e)=>({...r,theme:e.payload}),[A]:r=>({...r,menuOpen:!r.menuOpen}),[j]:(r,e)=>({...r,loading:e.payload}),[q]:(r,e)=>({...r,error:e.payload}),[R]:r=>({...r,error:null})}),ft=new H,w=new u;w.addReducer("ui",bt);w.addReducer("gallery",De);w.addMiddleware(r=>e=>t=>typeof t=="function"?t(r.dispatch,r.getState):e(t));const b={router:null,store:w,eventBus:ft};window.app=b;document.addEventListener("DOMContentLoaded",()=>{new ot(document.getElementById("app-header")),new dt(document.getElementById("app-nav")),new _t(document.getElementById("app-footer")),b.router=new B({container:document.getElementById("app-main"),notFoundHandler:()=>{b.router.navigate("/",!0)}}),window.router=b.router,b.router.addRoute("/",le).addRoute("/exposiciones",Te).addRoute("/artworks",Ue).addRoute("/bio",tt).init()});
//# sourceMappingURL=index-Du39uBKd.js.map
