var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequirece68;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},e.parcelRequirece68=n);var i=n("h9NR5");n.register("7eXHk",(function(e,t){var r,n,i,o;r=e.exports,n="ScrollTrigger",i=function(){return mt},Object.defineProperty(r,n,{get:i,set:o,enumerable:!0,configurable:!0});
/*!
 * ScrollTrigger 3.8.0
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var a,s,l,c,u,f,d,p,g,h,v,m,y,x,b,w,T,k,S,C,O,E,P,M,R,_,A,L,B=1,I=[],N=[],z=Date.now,D=z(),F=0,W=1,H=function(e){return e},q=function(e){return v(e)[0]||(K(e)?console.warn("Element not found:",e):null)},U=function(e){return Math.round(1e5*e)/1e5||0},V=function(){return"undefined"!=typeof window},X=function(){return a||V()&&(a=window.gsap)&&a.registerPlugin&&a},j=function(e){return!!~d.indexOf(e)},Y=function(e,t){return~I.indexOf(e)&&I[I.indexOf(e)+1][t]},Z=function(e,t){var r=t.s,n=t.sc,i=N.indexOf(e),o=n===Ce.sc?1:2;return!~i&&(i=N.push(e)-1),N[i+o]||(N[i+o]=Y(e,r)||(j(e)?n:function(t){return arguments.length?e[r]=t:e[r]}))},$=function(e){return Y(e,"getBoundingClientRect")||(j(e)?function(){return dt.width=l.innerWidth,dt.height=l.innerHeight,dt}:function(){return Pe(e)})},G=function(e,t){var r=t.s,n=t.d2,i=t.d,o=t.a;return(o=Y(e,r="scroll"+n))?o()-$(e)()[i]:j(e)?(f[r]||u[r])-(l["inner"+n]||u["client"+n]||f["client"+n]):e[r]-e["offset"+n]},J=function(e,t){for(var r=0;r<O.length;r+=3)(!t||~t.indexOf(O[r+1]))&&e(O[r],O[r+1],O[r+2])},K=function(e){return"string"==typeof e},Q=function(e){return"function"==typeof e},ee=function(e){return"number"==typeof e},te=function(e){return"object"==typeof e},re=function(e){return Q(e)&&e()},ne=function(e,t){return function(){var r=re(e),n=re(t);return function(){re(r),re(n)}}},ie=function(e,t,r){return e&&e.progress(t?0:1)&&r&&e.pause()},oe=function(e,t){var r=t(e);r&&r.totalTime&&(e.callbackAnimation=r)},ae=Math.abs,se="scrollLeft",le="scrollTop",ce="left",ue="top",fe="right",de="bottom",pe="width",ge="height",he="Right",ve="Left",me="Top",ye="Bottom",xe="padding",be="margin",we="Width",Te="Height",ke="px",Se={s:se,p:ce,p2:ve,os:fe,os2:he,d:pe,d2:we,a:"x",sc:function(e){return arguments.length?l.scrollTo(e,Ce.sc()):l.pageXOffset||c.scrollLeft||u.scrollLeft||f.scrollLeft||0}},Ce={s:le,p:ue,p2:me,os:de,os2:ye,d:ge,d2:Te,a:"y",op:Se,sc:function(e){return arguments.length?l.scrollTo(Se.sc(),e):l.pageYOffset||c.scrollTop||u.scrollTop||f.scrollTop||0}},Oe=function(e){return l.getComputedStyle(e)},Ee=function(e,t){for(var r in t)r in e||(e[r]=t[r]);return e},Pe=function(e,t){var r=t&&"matrix(1, 0, 0, 1, 0, 0)"!==Oe(e)[T]&&a.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),n=e.getBoundingClientRect();return r&&r.progress(0).kill(),n},Me=function(e,t){var r=t.d2;return e["offset"+r]||e["client"+r]||0},Re=function(e){var t,r=[],n=e.labels,i=e.duration();for(t in n)r.push(n[t]/i);return r},_e=function(e){var t=a.utils.snap(e),r=Array.isArray(e)&&e.slice(0).sort((function(e,t){return e-t}));return r?function(e,n){var i;if(!n)return t(e);if(n>0){for(e-=1e-4,i=0;i<r.length;i++)if(r[i]>=e)return r[i];return r[i-1]}for(i=r.length,e+=1e-4;i--;)if(r[i]<=e)return r[i];return r[0]}:function(r,n){var i=t(r);return!n||Math.abs(i-r)<.001||i-r<0==n<0?i:t(n<0?r-e:r+e)}},Ae=function(e,t,r,n){return r.split(",").forEach((function(r){return e(t,r,n)}))},Le=function(e,t,r){return e.addEventListener(t,r,{passive:!0})},Be=function(e,t,r){return e.removeEventListener(t,r)},Ie={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Ne={toggleActions:"play",anticipatePin:0},ze={top:0,left:0,center:.5,bottom:1,right:1},De=function(e,t){if(K(e)){var r=e.indexOf("="),n=~r?+(e.charAt(r-1)+1)*parseFloat(e.substr(r+1)):0;~r&&(e.indexOf("%")>r&&(n*=t/100),e=e.substr(0,r-1)),e=n+(e in ze?ze[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Fe=function(e,t,r,n,i,o,a,s){var l=i.startColor,u=i.endColor,d=i.fontSize,p=i.indent,g=i.fontWeight,h=c.createElement("div"),v=j(r)||"fixed"===Y(r,"pinType"),m=-1!==e.indexOf("scroller"),y=v?f:r,x=-1!==e.indexOf("start"),b=x?l:u,w="border-color:"+b+";font-size:"+d+";color:"+b+";font-weight:"+g+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return w+="position:"+((m||s)&&v?"fixed;":"absolute;"),(m||s||!v)&&(w+=(n===Ce?fe:de)+":"+(o+parseFloat(p))+"px;"),a&&(w+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),h._isStart=x,h.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),h.style.cssText=w,h.innerText=t||0===t?e+"-"+t:e,y.children[0]?y.insertBefore(h,y.children[0]):y.appendChild(h),h._offset=h["offset"+n.op.d2],We(h,0,n,x),h},We=function(e,t,r,n){var i={display:"block"},o=r[n?"os2":"p2"],s=r[n?"p2":"os2"];e._isFlipped=n,i[r.a+"Percent"]=n?-100:0,i[r.a]=n?"1px":0,i["border"+o+we]=1,i["border"+s+we]=0,i[r.p]=t+"px",a.set(e,i)},He=[],qe={},Ue=function(){return z()-F>20&&ot()},Ve=function(){var e=z();F!==e?(ot(),F||Je("scrollStart"),F=e):h||(h=g(ot))},Xe=function(){return!b&&!M&&!c.fullscreenElement&&p.restart(!0)},je={},Ye=[],Ze=[],$e=function(e){var t,r=a.ticker.frame,n=[],i=0;if(A!==r||B){for(et();i<Ze.length;i+=4)(t=l.matchMedia(Ze[i]).matches)!==Ze[i+3]&&(Ze[i+3]=t,t?n.push(i):et(1,Ze[i])||Q(Ze[i+2])&&Ze[i+2]());for(Qe(),i=0;i<n.length;i++)t=n[i],_=Ze[t],Ze[t+2]=Ze[t+1](e);_=0,s&&rt(0,1),A=r,Je("matchMedia")}},Ge=function e(){return Be(mt,"scrollEnd",e)||rt(!0)},Je=function(e){return je[e]&&je[e].map((function(e){return e()}))||Ye},Ke=[],Qe=function(e){for(var t=0;t<Ke.length;t+=5)e&&Ke[t+4]!==e||(Ke[t].style.cssText=Ke[t+1],Ke[t].getBBox&&Ke[t].setAttribute("transform",Ke[t+2]||""),Ke[t+3].uncache=1)},et=function(e,t){var r;for(k=0;k<He.length;k++)r=He[k],t&&r.media!==t||(e?r.kill(1):r.revert());t&&Qe(t),t||Je("revert")},tt=function(){return N.forEach((function(e){return"function"==typeof e&&(e.rec=0)}))},rt=function(e,t){if(!F||e){L=!0;var r=Je("refreshInit");E&&mt.sort(),t||et(),He.forEach((function(e){return e.refresh()})),r.forEach((function(e){return e&&e.render&&e.render(-1)})),tt(),p.pause(),L=!1,Je("refresh")}else Le(mt,"scrollEnd",Ge)},nt=0,it=1,ot=function(){if(!L){var e=He.length,t=z(),r=t-D>=50,n=e&&He[0].scroll();if(it=nt>n?-1:1,nt=n,r&&(F&&!w&&t-F>200&&(F=0,Je("scrollEnd")),y=D,D=t),it<0){for(k=e;k-- >0;)He[k]&&He[k].update(0,r);it=1}else for(k=0;k<e;k++)He[k]&&He[k].update(0,r);h=0}},at=[ce,ue,de,fe,"marginBottom","marginRight","marginTop","marginLeft","display","flexShrink","float","zIndex","grid-column-start","grid-column-end","grid-row-start","grid-row-end","grid-area","justify-self","align-self","place-self"],st=at.concat([pe,ge,"boxSizing","maxWidth","maxHeight","position",be,xe,"paddingTop","paddingRight","paddingBottom","paddingLeft"]),lt=function(e,t,r,n){if(e.parentNode!==t){for(var i,o=at.length,a=t.style,s=e.style;o--;)a[i=at[o]]=r[i];a.position="absolute"===r.position?"absolute":"relative","inline"===r.display&&(a.display="inline-block"),s.bottom=s.right="auto",a.overflow="visible",a.boxSizing="border-box",a.width=Me(e,Se)+ke,a.height=Me(e,Ce)+ke,a.padding=s.margin=s.top=s.left="0",ut(n),s.width=s.maxWidth=r.width,s.height=s.maxHeight=r.height,s.padding=r.padding,e.parentNode.insertBefore(t,e),t.appendChild(e)}},ct=/([A-Z])/g,ut=function(e){if(e){var t,r,n=e.t.style,i=e.length,o=0;for((e.t._gsap||a.core.getCache(e.t)).uncache=1;o<i;o+=2)r=e[o+1],t=e[o],r?n[t]=r:n[t]&&n.removeProperty(t.replace(ct,"-$1").toLowerCase())}},ft=function(e){for(var t=st.length,r=e.style,n=[],i=0;i<t;i++)n.push(st[i],r[st[i]]);return n.t=e,n},dt={left:0,top:0},pt=function(e,t,r,n,i,o,a,s,l,c,d,p,g){Q(e)&&(e=e(s)),K(e)&&"max"===e.substr(0,3)&&(e=p+("="===e.charAt(4)?De("0"+e.substr(3),r):0));var h,v,m,y=g?g.time():0;if(g&&g.seek(0),ee(e))a&&We(a,r,n,!0);else{Q(t)&&(t=t(s));var x,b,w,T,k=e.split(" ");m=q(t)||f,(x=Pe(m)||{})&&(x.left||x.top)||"none"!==Oe(m).display||(T=m.style.display,m.style.display="block",x=Pe(m),T?m.style.display=T:m.style.removeProperty("display")),b=De(k[0],x[n.d]),w=De(k[1]||"0",r),e=x[n.p]-l[n.p]-c+b+i-w,a&&We(a,w,n,r-w<20||a._isStart&&w>20),r-=r-w}if(o){var S=e+r,C=o._isStart;h="scroll"+n.d2,We(o,S,n,C&&S>20||!C&&(d?Math.max(f[h],u[h]):o.parentNode[h])<=S+1),d&&(l=Pe(a),d&&(o.style[n.op.p]=l[n.op.p]-n.op.m-o._offset+ke))}return g&&m&&(h=Pe(m),g.seek(p),v=Pe(m),g._caScrollDist=h[n.p]-v[n.p],e=e/g._caScrollDist*p),g&&g.seek(y),g?e:Math.round(e)},gt=/(?:webkit|moz|length|cssText|inset)/i,ht=function(e,t,r,n){if(e.parentNode!==t){var i,o,s=e.style;if(t===f){for(i in e._stOrig=s.cssText,o=Oe(e))+i||gt.test(i)||!o[i]||"string"!=typeof s[i]||"0"===i||(s[i]=o[i]);s.top=r,s.left=n}else s.cssText=e._stOrig;a.core.getCache(e).uncache=1,t.appendChild(e)}},vt=function(e,t){var r,n,i=Z(e,t),o="_scroll"+t.p2,s=function t(s,l,c,u,f){var d=t.tween,p=l.onComplete,g={};return d&&d.kill(),r=Math.round(c),l[o]=s,l.modifiers=g,g[o]=function(e){return(e=U(i()))!==r&&e!==n&&Math.abs(e-r)>2?(d.kill(),t.tween=0):e=c+u*d.ratio+f*d.ratio*d.ratio,n=r,r=U(e)},l.onComplete=function(){t.tween=0,p&&p.call(d)},d=t.tween=a.to(e,l)};return e[o]=i,e.addEventListener("wheel",(function(){return s.tween&&s.tween.kill()&&(s.tween=0)}),{passive:!0}),s};Se.op=Ce;var mt=function(){function e(t,r){s||e.register(a)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),this.init(t,r)}return e.prototype.init=function(t,r){if(this.progress=this.start=0,this.vars&&this.kill(1),W){var n,i,o,s,d,p,g,h,x,T,S,C,O,M,A,L,N,D,U,V,X,J,re,ne,se,le,ce,ue,fe,de,pe,ge,he,ve,me,ye,Te,Ae,ze,We,Ue=t=Ee(K(t)||ee(t)||t.nodeType?{trigger:t}:t,Ne),je=Ue.onUpdate,Ye=Ue.toggleClass,Ze=Ue.id,$e=Ue.onToggle,Je=Ue.onRefresh,Ke=Ue.scrub,Qe=Ue.trigger,et=Ue.pin,tt=Ue.pinSpacing,rt=Ue.invalidateOnRefresh,nt=Ue.anticipatePin,ot=Ue.onScrubComplete,at=Ue.onSnapComplete,st=Ue.once,ct=Ue.snap,gt=Ue.pinReparent,mt=Ue.pinSpacer,yt=Ue.containerAnimation,xt=Ue.fastScrollEnd,bt=Ue.preventOverlaps,wt=t.horizontal||t.containerAnimation&&!1!==t.horizontal?Se:Ce,Tt=!Ke&&0!==Ke,kt=q(t.scroller||l),St=a.core.getCache(kt),Ct=j(kt),Ot="fixed"===("pinType"in t?t.pinType:Y(kt,"pinType")||Ct&&"fixed"),Et=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],Pt=Tt&&t.toggleActions.split(" "),Mt="markers"in t?t.markers:Ne.markers,Rt=Ct?0:parseFloat(Oe(kt)["border"+wt.p2+we])||0,_t=this,At=t.onRefreshInit&&function(){return t.onRefreshInit(_t)},Lt=function(e,t,r){var n=r.d,i=r.d2,o=r.a;return(o=Y(e,"getBoundingClientRect"))?function(){return o()[n]}:function(){return(t?l["inner"+i]:e["client"+i])||0}}(kt,Ct,wt),Bt=function(e,t){return!t||~I.indexOf(e)?$(e):function(){return dt}}(kt,Ct),It=0,Nt=Z(kt,wt);if(_t.media=_,nt*=45,_t.scroller=kt,_t.scroll=yt?yt.time.bind(yt):Nt,s=Nt(),_t.vars=t,r=r||t.animation,"refreshPriority"in t&&(E=1),St.tweenScroll=St.tweenScroll||{top:vt(kt,Ce),left:vt(kt,Se)},_t.tweenTo=n=St.tweenScroll[wt.p],r&&(r.vars.lazy=!1,r._initted||!1!==r.vars.immediateRender&&!1!==t.immediateRender&&r.render(0,!0,!0),_t.animation=r.pause(),r.scrollTrigger=_t,(pe=ee(Ke)&&Ke)&&(de=a.to(r,{ease:"power3",duration:pe,onComplete:function(){return ot&&ot(_t)}})),ue=0,Ze||(Ze=r.vars.id)),He.push(_t),ct&&(te(ct)&&!ct.push||(ct={snapTo:ct}),"scrollBehavior"in f.style&&a.set(Ct?[f,u]:kt,{scrollBehavior:"auto"}),o=Q(ct.snapTo)?ct.snapTo:"labels"===ct.snapTo?function(e){return function(t){return a.utils.snap(Re(e),t)}}(r):"labelsDirectional"===ct.snapTo?(Ae=r,function(e,t){return _e(Re(Ae))(e,t.direction)}):!1!==ct.directional?function(e,t){return _e(ct.snapTo)(e,t.direction)}:a.utils.snap(ct.snapTo),ge=ct.duration||{min:.1,max:2},ge=te(ge)?m(ge.min,ge.max):m(ge,ge),he=a.delayedCall(ct.delay||pe/2||.1,(function(){if(Math.abs(_t.getVelocity())<10&&!w&&It!==Nt()){var e=r&&!Tt?r.totalProgress():_t.progress,t=(e-fe)/(z()-y)*1e3||0,i=a.utils.clamp(-_t.progress,1-_t.progress,ae(t/2)*t/.185),s=_t.progress+(!1===ct.inertia?0:i),l=m(0,1,o(s,_t)),c=Nt(),u=Math.round(p+l*O),f=ct,d=f.onStart,h=f.onInterrupt,v=f.onComplete,x=n.tween;if(c<=g&&c>=p&&u!==c){if(x&&!x._initted&&x.data<=ae(u-c))return;!1===ct.inertia&&(i=l-_t.progress),n(u,{duration:ge(ae(.185*Math.max(ae(s-e),ae(l-e))/t/.05||0)),ease:ct.ease||"power3",data:ae(u-c),onInterrupt:function(){return he.restart(!0)&&h&&h(_t)},onComplete:function(){It=Nt(),ue=fe=r&&!Tt?r.totalProgress():_t.progress,at&&at(_t),v&&v(_t)}},c,i*O,u-c-i*O),d&&d(_t,n.tween)}}else _t.isActive&&he.restart(!0)})).pause()),Ze&&(qe[Ze]=_t),Qe=_t.trigger=q(Qe||et),et=!0===et?Qe:q(et),K(Ye)&&(Ye={targets:Qe,className:Ye}),et&&(!1===tt||tt===be||(tt=!(!tt&&"flex"===Oe(et.parentNode).display)&&xe),_t.pin=et,!1!==t.force3D&&a.set(et,{force3D:!0}),(i=a.core.getCache(et)).spacer?M=i.pinState:(mt&&((mt=q(mt))&&!mt.nodeType&&(mt=mt.current||mt.nativeElement),i.spacerIsNative=!!mt,mt&&(i.spacerState=ft(mt))),i.spacer=N=mt||c.createElement("div"),N.classList.add("pin-spacer"),Ze&&N.classList.add("pin-spacer-"+Ze),i.pinState=M=ft(et)),_t.spacer=N=i.spacer,ce=Oe(et),re=ce[tt+wt.os2],U=a.getProperty(et),V=a.quickSetter(et,wt.a,ke),lt(et,N,ce),L=ft(et)),Mt&&(C=te(Mt)?Ee(Mt,Ie):Ie,T=Fe("scroller-start",Ze,kt,wt,C,0),S=Fe("scroller-end",Ze,kt,wt,C,0,T),D=T["offset"+wt.op.d2],h=Fe("start",Ze,kt,wt,C,D,0,yt),x=Fe("end",Ze,kt,wt,C,D,0,yt),yt&&(Te=a.quickSetter([h,x],wt.a,ke)),Ot||I.length&&!0===Y(kt,"fixedMarkers")||(We=Oe(ze=Ct?f:kt).position,ze.style.position="absolute"===We||"fixed"===We?We:"relative",a.set([T,S],{force3D:!0}),se=a.quickSetter(T,wt.a,ke),le=a.quickSetter(S,wt.a,ke))),yt){var zt=yt.vars.onUpdate,Dt=yt.vars.onUpdateParams;yt.eventCallback("onUpdate",(function(){_t.update(0,0,1),zt&&zt.apply(Dt||[])}))}_t.previous=function(){return He[He.indexOf(_t)-1]},_t.next=function(){return He[He.indexOf(_t)+1]},_t.revert=function(e){var t=!1!==e||!_t.enabled,n=b;t!==_t.isReverted&&(t&&(_t.scroll.rec||(_t.scroll.rec=Nt()),me=Math.max(Nt(),_t.scroll.rec||0),ve=_t.progress,ye=r&&r.progress()),h&&[h,x,T,S].forEach((function(e){return e.style.display=t?"none":"block"})),t&&(b=1),_t.update(t),b=n,et&&(t?function(e,t,r){ut(r);var n=e._gsap;if(n.spacerIsNative)ut(n.spacerState);else if(e.parentNode===t){var i=t.parentNode;i&&(i.insertBefore(e,t),i.removeChild(t))}}(et,N,M):(!gt||!_t.isActive)&&lt(et,N,Oe(et),ne)),_t.isReverted=t)},_t.refresh=function(n,i){if(!b&&_t.enabled||i)if(et&&n&&F)Le(e,"scrollEnd",Ge);else{b=1,de&&de.pause(),rt&&r&&r.progress(0).invalidate(),_t.isReverted||_t.revert();for(var o,l,c,u,v,m,y,w,k,C,E=Lt(),R=Bt(),_=yt?yt.duration():G(kt,wt),B=0,I=0,z=t.end,D=t.endTrigger||Qe,W=t.start||(0!==t.start&&Qe?et?"0 0":"0 100%":0),H=t.pinnedContainer&&q(t.pinnedContainer),V=Qe&&Math.max(0,He.indexOf(_t))||0,j=V;j--;)(m=He[j]).end||m.refresh(0,1)||(b=1),!(y=m.pin)||y!==Qe&&y!==et||m.isReverted||(C||(C=[]),C.unshift(m),m.revert());for(Q(W)&&(W=W(_t)),p=pt(W,Qe,E,wt,Nt(),h,T,_t,R,Rt,Ot,_,yt)||(et?-.001:0),Q(z)&&(z=z(_t)),K(z)&&!z.indexOf("+=")&&(~z.indexOf(" ")?z=(K(W)?W.split(" ")[0]:"")+z:(B=De(z.substr(2),E),z=K(W)?W:p+B,D=Qe)),g=Math.max(p,pt(z||(D?"100% 0":_),D,E,wt,Nt()+B,x,S,_t,R,Rt,Ot,_,yt))||-.001,O=g-p||(p-=.01)&&.001,B=0,j=V;j--;)(y=(m=He[j]).pin)&&m.start-m._pinPush<p&&!yt&&(o=m.end-m.start,(y===Qe||y===H)&&!ee(W)&&(B+=o),y===et&&(I+=o));if(p+=B,g+=B,_t._pinPush=I,h&&B&&((o={})[wt.a]="+="+B,H&&(o[wt.p]="-="+Nt()),a.set([h,x],o)),et)o=Oe(et),u=wt===Ce,c=Nt(),X=parseFloat(U(wt.a))+I,!_&&g>1&&((Ct?f:kt).style["overflow-"+wt.a]="scroll"),lt(et,N,o),L=ft(et),l=Pe(et,!0),w=Ot&&Z(kt,u?Se:Ce)(),tt&&((ne=[tt+wt.os2,O+I+ke]).t=N,(j=tt===xe?Me(et,wt)+O+I:0)&&ne.push(wt.d,j+ke),ut(ne),Ot&&Nt(me)),Ot&&((v={top:l.top+(u?c-p:w)+ke,left:l.left+(u?w:c-p)+ke,boxSizing:"border-box",position:"fixed"}).width=v.maxWidth=Math.ceil(l.width)+ke,v.height=v.maxHeight=Math.ceil(l.height)+ke,v.margin=v.marginTop=v.marginRight=v.marginBottom=v.marginLeft="0",v.padding=o.padding,v.paddingTop=o.paddingTop,v.paddingRight=o.paddingRight,v.paddingBottom=o.paddingBottom,v.paddingLeft=o.paddingLeft,A=function(e,t,r){for(var n,i=[],o=e.length,a=r?8:0;a<o;a+=2)n=e[a],i.push(n,n in t?t[n]:e[a+1]);return i.t=e.t,i}(M,v,gt)),r?(k=r._initted,P(1),r.render(r.duration(),!0,!0),J=U(wt.a)-X+O+I,O!==J&&A.splice(A.length-2,2),r.render(0,!0,!0),k||r.invalidate(),P(0)):J=O;else if(Qe&&Nt()&&!yt)for(l=Qe.parentNode;l&&l!==f;)l._pinOffset&&(p-=l._pinOffset,g-=l._pinOffset),l=l.parentNode;C&&C.forEach((function(e){return e.revert(!1)})),_t.start=p,_t.end=g,s=d=Nt(),yt||(s<me&&Nt(me),_t.scroll.rec=0),_t.revert(!1),b=0,r&&Tt&&r._initted&&r.progress()!==ye&&r.progress(ye,!0).render(r.time(),!0,!0),ve!==_t.progress&&(r&&!Tt&&r.totalProgress(ve,!0),_t.progress=ve,_t.update(0,0,1)),et&&tt&&(N._pinOffset=Math.round(_t.progress*J)),Je&&Je(_t)}},_t.getVelocity=function(){return(Nt()-d)/(z()-y)*1e3||0},_t.endAnimation=function(){ie(_t.callbackAnimation),r&&(de?de.progress(1):r.paused()?Tt||ie(r,_t.direction<0,1):ie(r,r.reversed()))},_t.getTrailing=function(e){var t=He.indexOf(_t),r=_t.direction>0?He.slice(0,t).reverse():He.slice(t+1);return K(e)?r.filter((function(t){return t.vars.preventOverlaps===e})):r},_t.update=function(e,t,i){if(!yt||i||e){var o,a,l,c,u,h,m,x=_t.scroll(),w=e?0:(x-p)/O,k=w<0?0:w>1?1:w||0,S=_t.progress;if(t&&(d=s,s=yt?Nt():x,ct&&(fe=ue,ue=r&&!Tt?r.totalProgress():k)),nt&&!k&&et&&!b&&!B&&F&&p<x+(x-d)/(z()-y)*nt&&(k=1e-4),k!==S&&_t.enabled){if(c=(u=(o=_t.isActive=!!k&&k<1)!==(!!S&&S<1))||!!k!=!!S,_t.direction=k>S?1:-1,_t.progress=k,c&&!b&&(a=k&&!S?0:1===k?1:1===S?2:3,Tt&&(l=!u&&"none"!==Pt[a+1]&&Pt[a+1]||Pt[a],m=r&&("complete"===l||"reset"===l||l in r))),bt&&u&&(m||Ke||!r)&&(Q(bt)?bt(_t):_t.getTrailing(bt).forEach((function(e){return e.endAnimation()}))),Tt||(!de||b||B?r&&r.totalProgress(k,!!b):(de.vars.totalProgress=k,de.invalidate().restart())),et)if(e&&tt&&(N.style[tt+wt.os2]=re),Ot){if(c){if(h=!e&&k>S&&g+1>x&&x+1>=G(kt,wt),gt)if(e||!o&&!h)ht(et,N);else{var C=Pe(et,!0),E=x-p;ht(et,f,C.top+(wt===Ce?E:0)+ke,C.left+(wt===Ce?0:E)+ke)}ut(o||h?A:L),J!==O&&k<1&&o||V(X+(1!==k||h?0:J))}}else V(X+J*k);ct&&!n.tween&&!b&&!B&&he.restart(!0),Ye&&(u||st&&k&&(k<1||!R))&&v(Ye.targets).forEach((function(e){return e.classList[o||st?"add":"remove"](Ye.className)})),je&&!Tt&&!e&&je(_t),c&&!b?(Tt&&(m&&("complete"===l?r.pause().totalProgress(1):"reset"===l?r.restart(!0).pause():"restart"===l?r.restart(!0):r[l]()),je&&je(_t)),!u&&R||($e&&u&&oe(_t,$e),Et[a]&&oe(_t,Et[a]),st&&(1===k?_t.kill(!1,1):Et[a]=0),u||Et[a=1===k?1:3]&&oe(_t,Et[a])),xt&&!o&&Math.abs(_t.getVelocity())>(ee(xt)?xt:2500)&&(ie(_t.callbackAnimation),de?de.progress(1):ie(r,!k,1))):Tt&&je&&!b&&je(_t)}if(le){var P=yt?x/yt.duration()*(yt._caScrollDist||0):x;se(P+(T._isFlipped?1:0)),le(P)}Te&&Te(-x/yt.duration()*(yt._caScrollDist||0))}},_t.enable=function(t,r){_t.enabled||(_t.enabled=!0,Le(kt,"resize",Xe),Le(kt,"scroll",Ve),At&&Le(e,"refreshInit",At),!1!==t&&(_t.progress=ve=0,s=d=It=Nt()),!1!==r&&_t.refresh())},_t.getTween=function(e){return e&&n?n.tween:de},_t.disable=function(t,r){if(_t.enabled&&(!1!==t&&_t.revert(),_t.enabled=_t.isActive=!1,r||de&&de.pause(),me=0,i&&(i.uncache=1),At&&Be(e,"refreshInit",At),he&&(he.pause(),n.tween&&n.tween.kill()&&(n.tween=0)),!Ct)){for(var o=He.length;o--;)if(He[o].scroller===kt&&He[o]!==_t)return;Be(kt,"resize",Xe),Be(kt,"scroll",Ve)}},_t.kill=function(e,t){_t.disable(e,t),de&&de.kill(),Ze&&delete qe[Ze];var n=He.indexOf(_t);He.splice(n,1),n===k&&it>0&&k--,n=0,He.forEach((function(e){return e.scroller===_t.scroller&&(n=1)})),n||(_t.scroll.rec=0),r&&(r.scrollTrigger=null,e&&r.render(-1),t||r.kill()),h&&[h,x,T,S].forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),et&&(i&&(i.uncache=1),n=0,He.forEach((function(e){return e.pin===et&&n++})),n||(i.spacer=0))},_t.enable(!1,!1),r&&r.add&&!O?a.delayedCall(.01,(function(){return p||g||_t.refresh()}))&&(O=.01)&&(p=g=0):_t.refresh()}else this.update=this.refresh=this.kill=H},e.register=function(t){if(!s&&(a=t||X(),V()&&window.document&&(l=window,c=document,u=c.documentElement,f=c.body),a&&(v=a.utils.toArray,m=a.utils.clamp,P=a.core.suppressOverwrites||H,a.core.globals("ScrollTrigger",e),f))){g=l.requestAnimationFrame||function(e){return setTimeout(e,16)},Le(l,"wheel",Ve),d=[l,c,u,f],Le(c,"scroll",Ve);var r,n=f.style,i=n.borderTopStyle;n.borderTopStyle="solid",r=Pe(f),Ce.m=Math.round(r.top+Ce.sc())||0,Se.m=Math.round(r.left+Se.sc())||0,i?n.borderTopStyle=i:n.removeProperty("border-top-style"),x=setInterval(Ue,200),a.delayedCall(.5,(function(){return B=0})),Le(c,"touchcancel",H),Le(f,"touchstart",H),Ae(Le,c,"pointerdown,touchstart,mousedown",(function(){return w=1})),Ae(Le,c,"pointerup,touchend,mouseup",(function(){return w=0})),T=a.utils.checkPrefix("transform"),st.push(T),s=z(),p=a.delayedCall(.2,rt).pause(),O=[c,"visibilitychange",function(){var e=l.innerWidth,t=l.innerHeight;c.hidden?(S=e,C=t):S===e&&C===t||Xe()},c,"DOMContentLoaded",rt,l,"load",function(){return F||rt()},l,"resize",Xe],J(Le)}return s},e.defaults=function(e){for(var t in e)Ne[t]=e[t]},e.kill=function(){W=0,He.slice(0).forEach((function(e){return e.kill(1)}))},e.config=function(e){"limitCallbacks"in e&&(R=!!e.limitCallbacks);var t=e.syncInterval;t&&clearInterval(x)||(x=t)&&setInterval(Ue,t),"autoRefreshEvents"in e&&(J(Be)||J(Le,e.autoRefreshEvents||"none"),M=-1===(e.autoRefreshEvents+"").indexOf("resize"))},e.scrollerProxy=function(e,t){var r=q(e),n=N.indexOf(r),i=j(r);~n&&N.splice(n,i?6:2),i?I.unshift(l,t,f,t,u,t):I.unshift(r,t)},e.matchMedia=function(e){var t,r,n,i,o;for(r in e)n=Ze.indexOf(r),i=e[r],_=r,"all"===r?i():(t=l.matchMedia(r))&&(t.matches&&(o=i()),~n?(Ze[n+1]=ne(Ze[n+1],i),Ze[n+2]=ne(Ze[n+2],o)):(n=Ze.length,Ze.push(r,i,o),t.addListener?t.addListener($e):t.addEventListener("change",$e)),Ze[n+3]=t.matches),_=0;return Ze},e.clearMatchMedia=function(e){e||(Ze.length=0),(e=Ze.indexOf(e))>=0&&Ze.splice(e,4)},e.isInViewport=function(e,t,r){var n=(K(e)?q(e):e).getBoundingClientRect(),i=n[r?pe:ge]*t||0;return r?n.right-i>0&&n.left+i<l.innerWidth:n.bottom-i>0&&n.top+i<l.innerHeight},e.positionInViewport=function(e,t,r){K(e)&&(e=q(e));var n=e.getBoundingClientRect(),i=n[r?pe:ge],o=null==t?i/2:t in ze?ze[t]*i:~t.indexOf("%")?parseFloat(t)*i/100:parseFloat(t)||0;return r?(n.left+o)/l.innerWidth:(n.top+o)/l.innerHeight},e}();mt.version="3.8.0",mt.saveStyles=function(e){return e?v(e).forEach((function(e){if(e&&e.style){var t=Ke.indexOf(e);t>=0&&Ke.splice(t,5),Ke.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),a.core.getCache(e),_)}})):Ke},mt.revert=function(e,t){return et(!e,t)},mt.create=function(e,t){return new mt(e,t)},mt.refresh=function(e){return e?Xe():(s||mt.register())&&rt(!0)},mt.update=ot,mt.clearScrollMemory=tt,mt.maxScroll=function(e,t){return G(e,t?Se:Ce)},mt.getScrollFunc=function(e,t){return Z(q(e),t?Se:Ce)},mt.getById=function(e){return qe[e]},mt.getAll=function(){return He.slice(0)},mt.isScrolling=function(){return!!F},mt.snapDirectional=_e,mt.addEventListener=function(e,t){var r=je[e]||(je[e]=[]);~r.indexOf(t)||r.push(t)},mt.removeEventListener=function(e,t){var r=je[e],n=r&&r.indexOf(t);n>=0&&r.splice(n,1)},mt.batch=function(e,t){var r,n=[],i={},o=t.interval||.016,s=t.batchMax||1e9,l=function(e,t){var r=[],n=[],i=a.delayedCall(o,(function(){t(r,n),r=[],n=[]})).pause();return function(e){r.length||i.restart(!0),r.push(e.trigger),n.push(e),s<=r.length&&i.progress(1)}};for(r in t)i[r]="on"===r.substr(0,2)&&Q(t[r])&&"onRefreshInit"!==r?l(0,t[r]):t[r];return Q(s)&&(s=s(),Le(mt,"refresh",(function(){return s=t.batchMax()}))),v(e).forEach((function(e){var t={};for(r in i)t[r]=i[r];t.trigger=e,n.push(mt.create(t))})),n},mt.sort=function(e){return He.sort(e||function(e,t){return-1e6*(e.vars.refreshPriority||0)+e.start-(t.start+-1e6*(t.vars.refreshPriority||0))})},X()&&a.registerPlugin(mt)}));var o=n("7eXHk");i.gsap.registerPlugin(o.ScrollTrigger),i.gsap.timeline({scrollTrigger:{trigger:".animCrop",start:"top 0vh",end:"center 50vh",scrub:!0,toggleActions:"play play play reverse"}}).fromTo(".animCrop",{opacity:1,width:"100vw",height:"100vh",clipPath:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"},{opacity:.5,y:"30vh",x:"50vw",backgroundPosition:"top left"});
//# sourceMappingURL=lab.8be9d5d6.js.map