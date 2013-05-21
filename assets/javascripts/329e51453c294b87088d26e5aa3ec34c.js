(function(r,i){var c=(function(){var y=r.createElement("dummy").style,z="Webkit Moz O ms Khtml".split(" "),A={};return function(E){if(typeof A[E]==="undefined"){var B=E.charAt(0).toUpperCase()+E.substr(1),D=(E+" "+z.join(B+" ")+B).split(" ");A[E]=null;for(var C in D){if(y[D[C]]!==undefined){A[E]=D[C];break}}}return A[E]}})();var s=function(y){return[].slice.call(y)};var l=function(A,z){var y,B;for(y in z){if(z.hasOwnProperty(y)){B=c(y);if(B!==null){A.style[B]=z[y]}}}return A};var v=function(y,z){return isNaN(y)?(z||0):Number(y)};var e=function(y){return r.getElementById(y)};var d=function(y,z){z=z||r;return z.querySelector(y)};var n=function(y,z){z=z||r;return s(z.querySelectorAll(y))};var a=function(A,y,z){var B=r.createEvent("CustomEvent");B.initCustomEvent(y,true,true,z);A.dispatchEvent(B)};var o=function(y){return" translate3d("+y.x+"px,"+y.y+"px,"+y.z+"px) "};var w=function(B,y){var C=" rotateX("+B.x+"deg) ",A=" rotateY("+B.y+"deg) ",z=" rotateZ("+B.z+"deg) ";return y?z+A+C:C+A+z};var x=function(y){return" scale("+y+") "};var q=function(y){return" perspective("+y+"px) "};var p=function(){return e(i.location.hash.replace(/^#\/?/,""))};var f=function(z){var y=i.innerHeight/z.height,A=i.innerWidth/z.width,B=y>A?A:y;if(z.maxScale&&B>z.maxScale){B=z.maxScale}if(z.minScale&&B<z.minScale){B=z.minScale}return B};var m=r.body;var u=navigator.userAgent.toLowerCase();var b=(c("perspective")!==null)&&(m.classList)&&(m.dataset)&&(u.search(/(iphone)|(ipod)|(android)/)===-1);if(!b){m.className+=" impress-not-supported "}else{m.classList.remove("impress-not-supported");m.classList.add("impress-supported")}var h=({transition:"transitionEnd",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"})[c("transition")];var g={};var k={width:1024,height:768,maxScale:1,minScale:0,perspective:1000,transitionDuration:1000};var j=function(){return false};var t=i.impress=function(O){if(!b){return{init:j,goTo:j,prev:j,next:j}}O=O||"impress";if(g["impress-root-"+O]){return g["impress-root-"+O]}var H={};var M=null;var S=null;var K=null;var P=null;var C=null;var I=e(O);var z=r.createElement("div");var A=false;var F=null;var Q=function(T){if(F!==T){a(T,"impress:stepenter");F=T}};var D=function(T){if(F===T){a(T,"impress:stepleave");F=null}};var y=null;var N=function(T){if(T.target===y){Q(M);T.stopPropagation()}};var B=function(U,T){var W=U.dataset,V={translate:{x:v(W.x),y:v(W.y),z:v(W.z)},rotate:{x:v(W.rotateX),y:v(W.rotateY),z:v(W.rotateZ||W.rotate)},scale:v(W.scale,1),el:U};if(!U.id){U.id="step-"+(T+1)}H["impress-"+U.id]=V;l(U,{position:"absolute",transform:"translate(-50%,-50%)"+o(V.translate)+w(V.rotate)+x(V.scale),transformStyle:"preserve-3d"})};var J=function(){if(A){return}var V=d("meta[name='viewport']")||r.createElement("meta");V.content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no";if(V.parentNode!==r.head){V.name="viewport";r.head.appendChild(V)}var U=I.dataset;P={width:v(U.width,k.width),height:v(U.height,k.height),maxScale:v(U.maxScale,k.maxScale),minScale:v(U.minScale,k.minScale),perspective:v(U.perspective,k.perspective),transitionDuration:v(U.transitionDuration,k.transitionDuration)};C=f(P);s(I.childNodes).forEach(function(W){z.appendChild(W)});I.appendChild(z);r.documentElement.style.height="100%";l(m,{height:"100%",overflow:"hidden"});var T={position:"absolute",transformOrigin:"top left",transition:"all 0s ease-in-out",transformStyle:"preserve-3d"};l(I,T);l(I,{top:"50%",left:"50%",transform:q(P.perspective/C)+x(C)});l(z,T);I.addEventListener(h,N,false);z.addEventListener(h,N,false);m.classList.remove("impress-disabled");m.classList.add("impress-enabled");K=n(".step",I);K.forEach(B);S={translate:{x:0,y:0,z:0},rotate:{x:0,y:0,z:0},scale:1};A=true;a(I,"impress:init",{api:g["impress-root-"+O]})};var L=function(T){if(typeof T==="number"){T=T<0?K[K.length+T]:K[T]}else{if(typeof T==="string"){T=e(T)}}return(T&&T.id&&H["impress-"+T.id])?T:null};var R=function(U,Z){if(!A||!(U=L(U))){return false}i.scrollTo(0,0);var V=H["impress-"+U.id];if(M){M.classList.remove("active");m.classList.remove("impress-on-"+M.id)}U.classList.add("active");m.classList.add("impress-on-"+U.id);var Y={rotate:{x:-V.rotate.x,y:-V.rotate.y,z:-V.rotate.z},translate:{x:-V.translate.x,y:-V.translate.y,z:-V.translate.z},scale:1/V.scale};var X=Y.scale>=S.scale;Z=v(Z,P.transitionDuration);var T=(Z/2);if(U===M){C=f(P)}var W=Y.scale*C;y=Y.scale>S.scale?I:z;if(M&&M!==U){D(M)}l(I,{transform:q(P.perspective/W)+x(W),transitionDuration:Z+"ms",transitionDelay:(X?T:0)+"ms"});l(z,{transform:w(Y.rotate,true)+o(Y.translate),transitionDuration:Z+"ms",transitionDelay:(X?0:T)+"ms"});S=Y;M=U;if(Z===0){Q(M)}return U};var E=function(){var T=K.indexOf(M)-1;T=T>=0?K[T]:K[K.length-1];return R(T)};var G=function(){var T=K.indexOf(M)+1;T=T<K.length?K[T]:K[0];return R(T)};I.addEventListener("impress:init",function(){K.forEach(function(T){T.classList.add("future")});I.addEventListener("impress:stepenter",function(T){T.target.classList.remove("past");T.target.classList.remove("future");T.target.classList.add("present")},false);I.addEventListener("impress:stepleave",function(T){T.target.classList.remove("present");T.target.classList.add("past")},false)},false);I.addEventListener("impress:init",function(){var T="";I.addEventListener("impress:stepenter",function(U){i.location.hash=T="#/"+U.target.id},false);i.addEventListener("hashchange",function(){if(i.location.hash!==T){R(p())}},false);R(p()||K[0],0)},false);m.classList.add("impress-disabled");return(g["impress-root-"+O]={init:J,goTo:R,next:G,prev:E})};t.supported=b})(document,window);(function(a,b){var c=function(e,d){var f=null;return function(){var h=this,g=arguments;clearTimeout(f);f=setTimeout(function(){e.apply(h,g)},d)}};a.addEventListener("impress:init",function(e){var d=e.detail.api;a.addEventListener("keydown",function(f){if(f.keyCode===9||(f.keyCode>=32&&f.keyCode<=34)||(f.keyCode>=37&&f.keyCode<=40)){f.preventDefault()}},false);a.addEventListener("keyup",function(f){if(f.keyCode===9||(f.keyCode>=32&&f.keyCode<=34)||(f.keyCode>=37&&f.keyCode<=40)){switch(f.keyCode){case 33:case 37:case 38:d.prev();break;case 9:case 32:case 34:case 39:case 40:d.next();break;default:break}f.preventDefault()}},false);a.addEventListener("click",function(g){var h=g.target;while((h.tagName!=="A")&&(h!==a.documentElement)){h=h.parentNode}if(h.tagName==="A"){var f=h.getAttribute("href");if(f&&f[0]==="#"){h=a.getElementById(f.slice(1))}}if(d.goTo(h)){g.stopImmediatePropagation();g.preventDefault()}},false);a.addEventListener("click",function(f){var g=f.target;while(!(g.classList.contains("step")&&!g.classList.contains("active"))&&(g!==a.documentElement)){g=g.parentNode}if(d.goTo(g)){f.preventDefault()}},false);a.addEventListener("touchstart",function(i){if(i.touches.length===1){var g=i.touches[0].clientX,h=b.innerWidth*0.3,f=null;if(g<h){f=d.prev()}else{if(g>b.innerWidth-h){f=d.next()}}if(f){i.preventDefault()}}},false);b.addEventListener("resize",c(function(){d.goTo(a.querySelector(".active"),500)},250),false)},false)})(document,window);(function(){var a=this;$(document).bind("impress:stepenter",function(b){var c;if(!b){return}c=b.target.id;console.log(c);if($(b.target).hasClass("dark")||c==="demo"||c==="nights"){$("body").addClass("code")}if($(b.target).hasClass("light")||c==="first"||c==="thatsit"){return $("body").removeClass("code")}})}).call(this);impress().init();