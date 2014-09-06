/* Compiled by kdc on Sat Sep 06 2014 00:24:37 GMT+0000 (UTC) */
(function() {
/* KDAPP STARTS */
if (typeof window.appPreview !== "undefined" && window.appPreview !== null) {
  var appView = window.appPreview
}
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/config.coffee */
var CLONED, CLONING, LOADING, NOT_CLONED, api, app, appCSS, appName, domain, getSession, github, logger, maxSymbolsInDescription, oauthKey, randomTopic, repoSearchLimit, topics, user, vmHostname, _ref;

_ref = [0, 1, 2, 3, 4, 5], NOT_CLONED = _ref[0], CLONING = _ref[1], CLONED = _ref[2], LOADING = _ref[3];

user = KD.nick();

domain = "" + user + ".kd.io";

vmHostname = "" + user + ".koding.kd.io";

getSession = function() {
  return (Math.random() + 1).toString(36).substring(7);
};

app = "github";

appName = "Github";

appCSS = "Github-installer";

github = "https://rest.kd.io/bvallelunga/Github.kdapp/master";

logger = "/tmp/_Github." + (getSession()) + ".out";

api = "https://api.github.com";

repoSearchLimit = 50;

maxSymbolsInDescription = 100;

oauthKey = "D6R6uhEmh7kmXCVT9YzSwvHP-tk";

topics = ["express", "sails", "orm", "geo location", "phonegap", "ios", "contact picker", "go", "session handler", "kd", "mixpanel"];

randomTopic = function() {
  return topics[Math.floor(Math.random() * (topics.length - 1))];
};
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/resources/oauth.js */
(function e(b,g,d){function c(k,i){if(!g[k]){if(!b[k]){var h=typeof require=="function"&&require;if(!i&&h){return h(k,!0)}if(a){return a(k,!0)}throw new Error("Cannot find module '"+k+"'")}var j=g[k]={exports:{}};b[k][0].call(j.exports,function(l){var m=b[k][1][l];return c(m?m:l)},j,j.exports,e,b,g,d)}return g[k].exports}var a=typeof require=="function"&&require;for(var f=0;f<d.length;f++){c(d[f])}return c})({1:[function(b,c,a){c.exports={oauthd_url:"https://oauth.io",oauthd_api:"https://oauth.io/api",version:"web-0.2.4",options:{}}},{}],2:[function(d,f,b){var i,a,c,g,h;c=d("../config");g=d("../tools/cookies");a=d("../tools/cache");i=d("../tools/url");h=d("../tools/sha1");f.exports=function(o,p,u,s){var n,q,j,t,k,r,m,l;n=u;i=i(p);g.init(c,p);a.init(g,c);t={request:{}};l={};m={};r={execProvidersCb:function(z,y,x){var v,w;if(m[z]){v=m[z];delete m[z];for(w in v){v[w](y,x)}}},getDescription:function(w,v,x){v=v||{};if(typeof l[w]==="object"){return x(null,l[w])}if(!l[w]){r.fetchDescription(w)}if(!v.wait){return x(null,{})}m[w]=m[w]||[];m[w].push(x)}};c.oauthd_base=i.getAbsUrl(c.oauthd_url).match(/^.{2,5}:\/\/[^/]+/)[0];q=[];j=void 0;(k=function(){var w,v;v=/[\\#&]oauthio=([^&]*)/.exec(p.location.hash);if(v){p.location.hash=p.location.hash.replace(/&?oauthio=[^&]*/,"");j=decodeURIComponent(v[1].replace(/\+/g," "));w=g.readCookie("oauthio_state");if(w){q.push(w);g.eraseCookie("oauthio_state")}}})();o.location_operations={reload:function(){return p.location.reload()},getHash:function(){return p.location.hash},setHash:function(v){return p.location.hash=v},changeHref:function(v){return p.location.href=v}};return function(v){var w,x,y,z;w=function(A){t.request=d("./oauthio_requests")(A,c,q,a,r);r.fetchDescription=function(B){if(l[B]){return}l[B]=true;A.ajax({url:c.oauthd_api+"/providers/"+B,data:{extend:true},dataType:"json"}).done(function(C){l[B]=C.data;r.execProvidersCb(B,null,C.data)}).always(function(){if(typeof l[B]!=="object"){delete l[B];r.execProvidersCb(B,new Error("Unable to fetch request description"))}})}};if(v.OAuth==null){v.OAuth={initialize:function(C,A){var B;c.key=C;if(A){for(B in A){c.options[B]=A[B]}}},setOAuthdURL:function(A){c.oauthd_url=A;c.oauthd_base=i.getAbsUrl(c.oauthd_url).match(/^.{2,5}:\/\/[^/]+/)[0]},getVersion:function(){return c.version},create:function(G,F,E){var D,B,A,C;if(!F){return a.tryCache(v.OAuth,G,true)}if(typeof E!=="object"){r.fetchDescription(G)}B=function(H){return t.request.mkHttp(G,F,E,H)};A=function(I,H){return t.request.mkHttpEndpoint(G,F,E,I,H)};C={};for(D in F){C[D]=F[D]}C.get=B("GET");C.post=B("POST");C.put=B("PUT");C.patch=B("PATCH");C.del=B("DELETE");C.me=t.request.mkHttpMe(G,F,E,"GET");return C},popup:function(M,C,O){var B,N,K,I,F,J,D,G,L,E,A,H;I=false;K=function(P){if(P.origin!==c.oauthd_base){return}try{G.close()}catch(Q){}C.data=P.data;t.request.sendCallback(C,B);return I=true};G=void 0;N=void 0;L=void 0;B=(H=o.jQuery)!=null?H.Deferred():void 0;C=C||{};if(!c.key){if(B!=null){B.reject(new Error("OAuth object must be initialized"))}if(O==null){return B.promise()}else{return O(new Error("OAuth object must be initialized"))}}if(arguments.length===2&&typeof C==="function"){O=C;C={}}if(a.cacheEnabled(C.cache)){J=a.tryCache(v.OAuth,M,C.cache);if(J){if(B!=null){B.resolve(J)}if(O){return O(null,J)}else{return B.promise()}}}if(!C.state){C.state=h.create_hash();C.state_type="client"}q.push(C.state);D=c.oauthd_url+"/auth/"+M+"?k="+c.key;D+="&d="+encodeURIComponent(i.getAbsUrl("/"));if(C){D+="&opts="+encodeURIComponent(JSON.stringify(C))}if(C.wnd_settings){A=C.wnd_settings;delete C.wnd_settings}else{A={width:Math.floor(o.outerWidth*0.8),height:Math.floor(o.outerHeight*0.5)}}if(A.height==null){A.height=(A.height<350?350:void 0)}if(A.width==null){A.width=(A.width<800?800:void 0)}if(A.left==null){A.left=o.screenX+(o.outerWidth-A.width)/2}if(A.top==null){A.top=o.screenY+(o.outerHeight-A.height)/8}E="width="+A.width+",height="+A.height;E+=",toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0";E+=",left="+A.left+",top="+A.top;C={provider:M,cache:C.cache};C.callback=function(Q,P){if(o.removeEventListener){o.removeEventListener("message",K,false)}else{if(o.detachEvent){o.detachEvent("onmessage",K)}else{if(p.detachEvent){p.detachEvent("onmessage",K)}}}C.callback=function(){};if(L){clearTimeout(L);L=undefined}if(O){return O(Q,P)}else{return undefined}};if(o.attachEvent){o.attachEvent("onmessage",K)}else{if(p.attachEvent){p.attachEvent("onmessage",K)}else{if(o.addEventListener){o.addEventListener("message",K,false)}}}if(typeof chrome!=="undefined"&&chrome.runtime&&chrome.runtime.onMessageExternal){chrome.runtime.onMessageExternal.addListener(function(R,Q,P){R.origin=Q.url.match(/^.{2,5}:\/\/[^/]+/)[0];if(B!=null){B.resolve()}return K(R)})}if(!N&&(s.userAgent.indexOf("MSIE")!==-1||s.appVersion.indexOf("Trident/")>0)){N=p.createElement("iframe");N.src=c.oauthd_url+"/auth/iframe?d="+encodeURIComponent(i.getAbsUrl("/"));N.width=0;N.height=0;N.frameBorder=0;N.style.visibility="hidden";p.body.appendChild(N)}L=setTimeout(function(){if(B!=null){B.reject(new Error("Authorization timed out"))}if(C.callback&&typeof C.callback==="function"){C.callback(new Error("Authorization timed out"))}try{G.close()}catch(P){}},1200*1000);G=o.open(D,"Authorization",E);if(G){G.focus();F=o.setInterval(function(){if(G===null||G.closed){o.clearInterval(F);if(!I){if(B!=null){B.reject(new Error("The popup was closed"))}if(C.callback&&typeof C.callback==="function"){return C.callback(new Error("The popup was closed"))}}}},500)}else{if(B!=null){B.reject(new Error("Could not open a popup"))}if(C.callback&&typeof C.callback==="function"){C.callback(new Error("Could not open a popup"))}}return B!=null?B.promise():void 0},redirect:function(E,D,B){var A,C;if(arguments.length===2){B=D;D={}}if(a.cacheEnabled(D.cache)){C=a.tryCache(v.OAuth,E,D.cache);if(C){B=i.getAbsUrl(B)+(B.indexOf("#")===-1?"#":"&")+"oauthio=cache";o.location_operations.changeHref(B);o.location_operations.reload();return}}if(!D.state){D.state=h.create_hash();D.state_type="client"}g.createCookie("oauthio_state",D.state);A=encodeURIComponent(i.getAbsUrl(B));B=c.oauthd_url+"/auth/"+E+"?k="+c.key;B+="&redirect_uri="+A;if(D){B+="&opts="+encodeURIComponent(JSON.stringify(D))}o.location_operations.changeHref(B)},callback:function(E,B,F){var D,A,C;D=(C=o.jQuery)!=null?C.Deferred():void 0;if(arguments.length===1&&typeof E==="function"){F=E;E=undefined;B={}}if(arguments.length===1&&typeof E==="string"){B={}}if(arguments.length===2&&typeof B==="function"){F=B;B={}}if(a.cacheEnabled(B.cache)||j==="cache"){A=a.tryCache(v.OAuth,E,B.cache);if(j==="cache"&&(typeof E!=="string"||!E)){if(D!=null){D.reject(new Error("You must set a provider when using the cache"))}if(F){return F(new Error("You must set a provider when using the cache"))}else{return D!=null?D.promise():void 0}}if(A){if(F){if(A){return F(null,A)}}else{if(D!=null){D.resolve(A)}return D!=null?D.promise():void 0}}}if(!j){return}t.request.sendCallback({data:j,provider:E,cache:B.cache,callback:F},D);return D!=null?D.promise():void 0},clearCache:function(A){g.eraseCookie("oauthio_provider_"+A)},http_me:function(A){if(t.request.http_me){t.request.http_me(A)}},http:function(A){if(t.request.http){t.request.http(A)}}};if(typeof o.jQuery==="undefined"){z=[];x=void 0;if(typeof chrome!=="undefined"&&chrome.extension){x=function(){return function(){throw new Error("Please include jQuery before oauth.js")}}}else{y=p.createElement("script");y.src="//code.jquery.com/jquery.min.js";y.type="text/javascript";y.onload=function(){var A;w(o.jQuery);for(A in z){z[A].fn.apply(null,z[A].args)}};p.getElementsByTagName("head")[0].appendChild(y);x=function(A){return function(){var B,C;C=[];for(B in arguments){C[B]=arguments[B]}z.push({fn:A,args:C})}}}t.request.http=x(function(){t.request.http.apply(v.OAuth,arguments)});r.fetchDescription=x(function(){r.fetchDescription.apply(r,arguments)});t.request=d("./oauthio_requests")(o.jQuery,c,q,a,r)}else{w(o.jQuery)}}}}},{"../config":1,"../tools/cache":5,"../tools/cookies":6,"../tools/sha1":7,"../tools/url":8,"./oauthio_requests":3}],3:[function(b,c,a){var f,d=[].indexOf||function(j){for(var h=0,g=this.length;h<g;h++){if(h in this&&this[h]===j){return h}}return -1};f=b("../tools/url")();c.exports=function(k,i,g,h,j){return{http:function(p){var q,o,n,m,l;n=function(){var t,s,r,u;u=l.oauthio.request||{};if(!u.cors){l.url=encodeURIComponent(l.url);if(l.url[0]!=="/"){l.url="/"+l.url}l.url=i.oauthd_url+"/request/"+l.oauthio.provider+l.url;l.headers=l.headers||{};l.headers.oauthio="k="+i.key;if(l.oauthio.tokens.oauth_token&&l.oauthio.tokens.oauth_token_secret){l.headers.oauthio+="&oauthv=1"}for(s in l.oauthio.tokens){l.headers.oauthio+="&"+encodeURIComponent(s)+"="+encodeURIComponent(l.oauthio.tokens[s])}delete l.oauthio;return k.ajax(l)}if(l.oauthio.tokens){if(l.oauthio.tokens.access_token){l.oauthio.tokens.token=l.oauthio.tokens.access_token}if(!l.url.match(/^[a-z]{2,16}:\/\//)){if(l.url[0]!=="/"){l.url="/"+l.url}l.url=u.url+l.url}l.url=f.replaceParam(l.url,l.oauthio.tokens,u.parameters);if(u.query){r=[];for(t in u.query){r.push(encodeURIComponent(t)+"="+encodeURIComponent(f.replaceParam(u.query[t],l.oauthio.tokens,u.parameters)))}if(d.call(l.url,"?")>=0){l.url+="&"+r}else{l.url+="?"+r}}if(u.headers){l.headers=l.headers||{};for(t in u.headers){l.headers[t]=f.replaceParam(u.headers[t],l.oauthio.tokens,u.parameters)}}delete l.oauthio;return k.ajax(l)}};l={};m=void 0;for(m in p){l[m]=p[m]}if(!l.oauthio.request||l.oauthio.request===true){o={wait:!!l.oauthio.request};q=k!=null?k.Deferred():void 0;j.getDescription(l.oauthio.provider,o,function(r,s){if(r){return q!=null?q.reject(r):void 0}if(l.oauthio.tokens.oauth_token&&l.oauthio.tokens.oauth_token_secret){l.oauthio.request=s.oauth1&&s.oauth1.request}else{l.oauthio.request=s.oauth2&&s.oauth2.request}if(q!=null){q.resolve()}});return q!=null?q.then(n):void 0}else{return n()}},http_me:function(p){var q,o,n,l,m;n=function(){var u,r,t,s;u=k!=null?k.Deferred():void 0;s=m.oauthio.request||{};m.url=i.oauthd_url+"/auth/"+m.oauthio.provider+"/me";m.headers=m.headers||{};m.headers.oauthio="k="+i.key;if(m.oauthio.tokens.oauth_token&&m.oauthio.tokens.oauth_token_secret){m.headers.oauthio+="&oauthv=1"}for(r in m.oauthio.tokens){m.headers.oauthio+="&"+encodeURIComponent(r)+"="+encodeURIComponent(m.oauthio.tokens[r])}delete m.oauthio;t=k.ajax(m);k.when(t).done(function(v){if(u!=null){u.resolve(v.data)}}).fail(function(v){if(v.responseJSON){if(u!=null){u.reject(v.responseJSON.data)}}else{if(u!=null){u.reject(new Error("An error occured while trying to access the resource"))}}});return u!=null?u.promise():void 0};m={};for(l in p){m[l]=p[l]}if(!m.oauthio.request||m.oauthio.request===true){o={wait:!!m.oauthio.request};q=k!=null?k.Deferred():void 0;j.getDescription(m.oauthio.provider,o,function(r,s){if(r){return q!=null?q.reject(r):void 0}if(m.oauthio.tokens.oauth_token&&m.oauthio.tokens.oauth_token_secret){m.oauthio.request=s.oauth1&&s.oauth1.request}else{m.oauthio.request=s.oauth2&&s.oauth2.request}if(q!=null){q.resolve()}});return q!=null?q.then(n):void 0}else{return n()}},mkHttp:function(o,n,l,p){var m;m=this;return function(t,q){var s,r;r={};if(typeof t==="string"){if(typeof q==="object"){for(s in q){r[s]=q[s]}}r.url=t}else{if(typeof t==="object"){for(s in t){r[s]=t[s]}}}r.type=r.type||p;r.oauthio={provider:o,tokens:n,request:l};return m.http(r)}},mkHttpMe:function(o,n,l,p){var m;m=this;return function(r){var q;q={};q.type=q.type||p;q.oauthio={provider:o,tokens:n,request:l};q.data=q.data||{};q.data.filter=(r?r.join(","):undefined);return m.http_me(q)}},sendCallback:function(m,l){var o,s,u,p,t,q,n,r,w,x,z;o=this;s=void 0;p=void 0;try{s=JSON.parse(m.data)}catch(y){u=y;if(l!=null){l.reject(new Error("Error while parsing result"))}return m.callback(new Error("Error while parsing result"))}if(!s||!s.provider){return}if(m.provider&&s.provider.toLowerCase()!==m.provider.toLowerCase()){p=new Error("Returned provider name does not match asked provider");if(l!=null){l.reject(p)}if(m.callback&&typeof m.callback==="function"){return m.callback(p)}else{return}}if(s.status==="error"||s.status==="fail"){p=new Error(s.message);p.body=s.data;if(l!=null){l.reject(p)}if(m.callback&&typeof m.callback==="function"){return m.callback(p)}else{return}}if(s.status!=="success"||!s.data){p=new Error();p.body=s.data;if(l!=null){l.reject(p)}if(m.callback&&typeof m.callback==="function"){return m.callback(p)}else{return}}s.state=s.state.replace(/\s+/g,"");for(q in g){z=g[q];g[q]=z.replace(/\s+/g,"")}if(!s.state||g.indexOf(s.state)===-1){if(l!=null){l.reject(new Error("State is not matching"))}if(m.callback&&typeof m.callback==="function"){return m.callback(new Error("State is not matching"))}else{return}}if(!m.provider){s.data.provider=s.provider}w=s.data;if(h.cacheEnabled(m.cache)&&w){h.storeCache(s.provider,w)}r=w.request;delete w.request;x=void 0;if(w.access_token){x={access_token:w.access_token}}else{if(w.oauth_token&&w.oauth_token_secret){x={oauth_token:w.oauth_token,oauth_token_secret:w.oauth_token_secret}}}if(!r){if(l!=null){l.resolve(w)}if(m.callback&&typeof m.callback==="function"){return m.callback(null,w)}else{return}}if(r.required){for(t in r.required){x[r.required[t]]=w[r.required[t]]}}n=function(v){return o.mkHttp(s.provider,x,r,v)};w.get=n("GET");w.post=n("POST");w.put=n("PUT");w.patch=n("PATCH");w.del=n("DELETE");w.me=o.mkHttpMe(s.provider,x,r,"GET");if(l!=null){l.resolve(w)}if(m.callback&&typeof m.callback==="function"){return m.callback(null,w)}else{}}}}},{"../tools/url":8}],4:[function(c,f,b){var d,a;if(typeof jQuery!=="undefined"&&jQuery!==null){a=jQuery}else{a=void 0}d=c("./lib/oauth")(window,document,a,navigator);d(window||this)},{"./lib/oauth":2}],5:[function(b,c,a){c.exports={init:function(d,f){this.config=f;return this.cookies=d},tryCache:function(h,l,d){var j,g,f;if(this.cacheEnabled(d)){d=this.cookies.readCookie("oauthio_provider_"+l);if(!d){return false}d=decodeURIComponent(d)}if(typeof d==="string"){try{d=JSON.parse(d)}catch(k){j=k;return false}}if(typeof d==="object"){f={};for(g in d){if(g!=="request"&&typeof d[g]!=="function"){f[g]=d[g]}}return h.create(l,f,d.request)}return false},storeCache:function(f,d){this.cookies.createCookie("oauthio_provider_"+f,encodeURIComponent(JSON.stringify(d)),d.expires_in-10||3600)},cacheEnabled:function(d){if(typeof d==="undefined"){return this.config.options.cache}return d}}},{}],6:[function(b,c,a){c.exports={init:function(f,d){this.config=f;return this.document=d},createCookie:function(g,h,d){var f;this.eraseCookie(g);f=new Date();f.setTime(f.getTime()+(d||1200)*1000);d="; expires="+f.toGMTString();this.document.cookie=g+"="+h+d+"; path=/"},readCookie:function(f){var j,d,g,h;h=f+"=";d=this.document.cookie.split(";");g=0;while(g<d.length){j=d[g];while(j.charAt(0)===" "){j=j.substring(1,j.length)}if(j.indexOf(h)===0){return j.substring(h.length,j.length)}g++}return null},eraseCookie:function(f){var d;d=new Date();d.setTime(d.getTime()-86400000);this.document.cookie=f+"=; expires="+d.toGMTString()+"; path=/"}}},{}],7:[function(c,d,a){var b,f;f=0;b="";d.exports={hex_sha1:function(g){return this.rstr2hex(this.rstr_sha1(this.str2rstr_utf8(g)))},b64_sha1:function(g){return this.rstr2b64(this.rstr_sha1(this.str2rstr_utf8(g)))},any_sha1:function(g,h){return this.rstr2any(this.rstr_sha1(this.str2rstr_utf8(g)),h)},hex_hmac_sha1:function(g,h){return this.rstr2hex(this.rstr_hmac_sha1(this.str2rstr_utf8(g),this.str2rstr_utf8(h)))},b64_hmac_sha1:function(g,h){return this.rstr2b64(this.rstr_hmac_sha1(this.str2rstr_utf8(g),this.str2rstr_utf8(h)))},any_hmac_sha1:function(g,i,h){return this.rstr2any(this.rstr_hmac_sha1(this.str2rstr_utf8(g),this.str2rstr_utf8(i)),h)},sha1_vm_test:function(){return thishex_sha1("abc").toLowerCase()==="a9993e364706816aba3e25717850c26c9cd0d89d"},rstr_sha1:function(g){return this.binb2rstr(this.binb_sha1(this.rstr2binb(g),g.length*8))},rstr_hmac_sha1:function(j,m){var l,n,h,g,k;l=this.rstr2binb(j);if(l.length>16){l=this.binb_sha1(l,j.length*8)}g=Array(16);k=Array(16);h=0;while(h<16){g[h]=l[h]^909522486;k[h]=l[h]^1549556828;h++}n=this.binb_sha1(g.concat(this.rstr2binb(m)),512+m.length*8);return this.binb2rstr(this.binb_sha1(k.concat(n),512+160))},rstr2hex:function(j){var m,l,k,h,g;try{f}catch(n){m=n;f=0}l=(f?"0123456789ABCDEF":"0123456789abcdef");h="";g=void 0;k=0;while(k<j.length){g=j.charCodeAt(k);h+=l.charAt((g>>>4)&15)+l.charAt(g&15);k++}return h},rstr2b64:function(o){var n,l,k,m,h,g,q;try{b}catch(p){n=p;b=""}g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";h="";m=o.length;l=0;while(l<m){q=(o.charCodeAt(l)<<16)|(l+1<m?o.charCodeAt(l+1)<<8:0)|(l+2<m?o.charCodeAt(l+2):0);k=0;while(k<4){if(l*8+k*6>o.length*8){h+=b}else{h+=g.charAt((q>>>6*(3-k))&63)}k++}l+=3}return h},rstr2any:function(s,j){var o,h,p,n,k,g,l,m,r;h=j.length;m=Array();n=void 0;g=void 0;r=void 0;l=void 0;o=Array(Math.ceil(s.length/2));n=0;while(n<o.length){o[n]=(s.charCodeAt(n*2)<<8)|s.charCodeAt(n*2+1);n++}while(o.length>0){l=Array();r=0;n=0;while(n<o.length){r=(r<<16)+o[n];g=Math.floor(r/h);r-=g*h;if(l.length>0||g>0){l[l.length]=g}n++}m[m.length]=r;o=l}k="";n=m.length-1;while(n>=0){k+=j.charAt(m[n]);n--}p=Math.ceil(s.length*8/(Math.log(j.length)/Math.log(2)));n=k.length;while(n<p){k=j[0]+k;n++}return k},str2rstr_utf8:function(j){var k,h,g,l;h="";k=-1;g=void 0;l=void 0;while(++k<j.length){g=j.charCodeAt(k);l=(k+1<j.length?j.charCodeAt(k+1):0);if(55296<=g&&g<=56319&&56320<=l&&l<=57343){g=65536+((g&1023)<<10)+(l&1023);k++}if(g<=127){h+=String.fromCharCode(g)}else{if(g<=2047){h+=String.fromCharCode(192|((g>>>6)&31),128|(g&63))}else{if(g<=65535){h+=String.fromCharCode(224|((g>>>12)&15),128|((g>>>6)&63),128|(g&63))}else{if(g<=2097151){h+=String.fromCharCode(240|((g>>>18)&7),128|((g>>>12)&63),128|((g>>>6)&63),128|(g&63))}}}}}return h},str2rstr_utf16le:function(h){var j,g;g="";j=0;while(j<h.length){g+=String.fromCharCode(h.charCodeAt(j)&255,(h.charCodeAt(j)>>>8)&255);j++}return g},str2rstr_utf16be:function(h){var j,g;g="";j=0;while(j<h.length){g+=String.fromCharCode((h.charCodeAt(j)>>>8)&255,h.charCodeAt(j)&255);j++}return g},rstr2binb:function(h){var j,g;g=Array(h.length>>2);j=0;while(j<g.length){g[j]=0;j++}j=0;while(j<h.length*8){g[j>>5]|=(h.charCodeAt(j/8)&255)<<(24-j%32);j+=8}return g},binb2rstr:function(h){var j,g;g="";j=0;while(j<h.length*32){g+=String.fromCharCode((h[j>>5]>>>(24-j%32))&255);j+=8}return g},binb_sha1:function(y,p){var v,u,s,r,q,m,k,o,n,l,h,g,A,z;y[p>>5]|=128<<(24-p%32);y[((p+64>>9)<<4)+15]=p;z=Array(80);v=1732584193;u=-271733879;s=-1732584194;r=271733878;q=-1009589776;m=0;while(m<y.length){o=v;n=u;l=s;h=r;g=q;k=0;while(k<80){if(k<16){z[k]=y[m+k]}else{z[k]=this.bit_rol(z[k-3]^z[k-8]^z[k-14]^z[k-16],1)}A=this.safe_add(this.safe_add(this.bit_rol(v,5),this.sha1_ft(k,u,s,r)),this.safe_add(this.safe_add(q,z[k]),this.sha1_kt(k)));q=r;r=s;s=this.bit_rol(u,30);u=v;v=A;k++}v=this.safe_add(v,o);u=this.safe_add(u,n);s=this.safe_add(s,l);r=this.safe_add(r,h);q=this.safe_add(q,g);m+=16}return Array(v,u,s,r,q)},sha1_ft:function(h,g,j,i){if(h<20){return(g&j)|((~g)&i)}if(h<40){return g^j^i}if(h<60){return(g&j)|(g&i)|(j&i)}return g^j^i},sha1_kt:function(g){if(g<20){return 1518500249}else{if(g<40){return 1859775393}else{if(g<60){return -1894007588}else{return -899497514}}}},safe_add:function(g,j){var i,h;i=(g&65535)+(j&65535);h=(g>>16)+(j>>16)+(i>>16);return(h<<16)|(i&65535)},bit_rol:function(g,h){return(g<<h)|(g>>>(32-h))},create_hash:function(){var g;g=this.b64_sha1((new Date()).getTime()+":"+Math.floor(Math.random()*9999999));return g.replace(/\+/g,"-").replace(/\//g,"_").replace(/\=+$/,"")}}},{}],8:[function(b,c,a){c.exports=function(d){return{getAbsUrl:function(f){var g;if(f.match(/^.{2,5}:\/\//)){return f}if(f[0]==="/"){return d.location.protocol+"//"+d.location.host+f}g=d.location.protocol+"//"+d.location.host+d.location.pathname;if(g[g.length-1]!=="/"&&f[0]!=="#"){return g+"/"+f}return g+f},replaceParam:function(g,f,h){g=g.replace(/\{\{(.*?)\}\}/g,function(i,j){return f[j]||""});if(h){g=g.replace(/\{(.*?)\}/g,function(i,j){return h[j]||""})}return g}}}},{}]},{},[4]);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/selectVm.coffee */
var GithubSelectVm,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubSelectVm = (function(_super) {
  __extends(GithubSelectVm, _super);

  function GithubSelectVm(options, data) {
    if (options == null) {
      options = {};
    }
    this.kiteHelper = options.kiteHelper;
    options.cssClass = "" + appName + "-dropdown";
    GithubSelectVm.__super__.constructor.call(this, options, data);
  }

  GithubSelectVm.prototype.viewAppended = function() {
    return this.kiteHelper.getReady().then((function(_this) {
      return function() {
        _this.addSubView(_this.header = new KDCustomHTMLView({
          tagName: 'div',
          cssClass: 'header',
          partial: _this.namify(_this.kiteHelper.getVm().hostnameAlias)
        }));
        _this.addSubView(_this.selection = new KDCustomHTMLView({
          tagName: 'div',
          cssClass: 'selection'
        }));
        return _this.updateList();
      };
    })(this));
  };

  GithubSelectVm.prototype.announce = function(message, error) {
    return this.emit("status-update", message, error);
  };

  GithubSelectVm.prototype.error = function(err, override) {
    var message, _ref;
    message = ((_ref = err.details) != null ? _ref.message : void 0) || err.message;
    switch (message) {
      case "CPU limit reached":
        message = "To use another vm with your plan, please turn off one of your vms";
        this.turnOffVmModal();
        break;
      default:
        message = override;
    }
    console.log(err);
    return this.announce(message, true);
  };

  GithubSelectVm.prototype.namify = function(hostname) {
    return hostname.split(".")[0];
  };

  GithubSelectVm.prototype.updateList = function() {
    var vmController;
    this.selection.updatePartial("");
    vmController = KD.singletons.vmController;
    return this.kiteHelper.getVms().forEach((function(_this) {
      return function(vm) {
        var vmItem;
        _this.selection.addSubView(vmItem = new KDCustomHTMLView({
          tagName: 'div',
          cssClass: "item",
          click: function() {
            if (!_this.hasClass("disabled")) {
              return _this.chooseVm(vm);
            }
          }
        }));
        if (vm.hostnameAlias === _this.kiteHelper.getVm().hostnameAlias) {
          vmItem.setClass("active");
        }
        vmItem.addSubView(new KDCustomHTMLView({
          tagName: 'span',
          cssClass: "bubble"
        }));
        vmItem.addSubView(new KDCustomHTMLView({
          tagName: 'span',
          cssClass: "name",
          partial: _this.namify(vm.hostnameAlias)
        }));
        return vmController.info(vm.hostnameAlias, function(err, vmn, info) {
          return vmItem.setClass(info != null ? info.state.toLowerCase() : void 0);
        });
      };
    })(this));
  };

  GithubSelectVm.prototype.chooseVm = function(vm) {
    var hostname;
    hostname = this.namify(vm.hostnameAlias);
    this.disabled(true);
    this.announce("Please wait while we turn on " + hostname + "... It can take awhile", false);
    this.header.updatePartial(hostname);
    this.kiteHelper.setDefaultVm(vm);
    return this.turnOnVm();
  };

  GithubSelectVm.prototype.turnOnVm = function() {
    return this.kiteHelper.testKite().then((function(_this) {
      return function() {
        _this.announce(false);
        _this.disabled(false);
        _this.updateList();
        return _this.emit("reload-tabs");
      };
    })(this))["catch"]((function(_this) {
      return function(err) {
        return _this.error(err);
      };
    })(this));
  };

  GithubSelectVm.prototype.turnOffVm = function(vm) {
    this.announce("Please wait while we turn off " + (this.namify(vm)) + "... It can take awhile", false);
    return this.kiteHelper.turnOffVm(vm).then((function(_this) {
      return function() {
        return KD.utils.wait(15000, function() {
          return _this.turnOnVm();
        });
      };
    })(this))["catch"]((function(_this) {
      return function(err) {
        return _this.error(err);
      };
    })(this));
  };

  GithubSelectVm.prototype.turnOffVmModal = function() {
    var container, vmController;
    if (this.modal) {
      return this.modal;
    }
    vmController = KD.singletons.vmController;
    this.addSubView(container = new KDCustomHTMLView({
      tagName: 'div'
    }));
    container.addSubView(new KDCustomHTMLView({
      tagName: 'div',
      cssClass: "description",
      partial: "Your plan's vm quota requires that you turn off one of your vms to use another"
    }));
    this.kiteHelper.getVms().forEach((function(_this) {
      return function(vm) {
        var vmItem;
        container.addSubView(vmItem = new KDCustomHTMLView({
          tagName: 'div',
          cssClass: "item",
          partial: "<div class=\"bubble\"></div>\n" + vm.hostnameAlias,
          click: function(event) {
            _this.turnOffVm(vm.hostnameAlias);
            return _this.removeModal();
          }
        }));
        return vmController.info(vm.hostnameAlias, function(err, vmn, info) {
          if ((info != null ? info.state : void 0) !== "RUNNING") {
            return vmItem.destroy();
          }
        });
      };
    })(this));
    return this.modal = new KDModalView({
      title: "Choose VM To Turn Off",
      overlay: true,
      overlayClick: false,
      width: 400,
      height: "auto",
      cssClass: "vm-kdmodal",
      view: container,
      cancel: (function(_this) {
        return function() {
          return _this.removeModal();
        };
      })(this)
    });
  };

  GithubSelectVm.prototype.removeModal = function() {
    this.modal.destroy();
    return delete this.modal;
  };

  GithubSelectVm.prototype.disabled = function(disabled) {
    if (disabled) {
      return this.setClass("disabled");
    } else {
      return this.unsetClass("disabled");
    }
  };

  return GithubSelectVm;

})(KDView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/repo.coffee */
var GithubRepoView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubRepoView = (function(_super) {
  __extends(GithubRepoView, _super);

  function GithubRepoView(options, data) {
    if (options == null) {
      options = {};
    }
    options.cssClass = "repo";
    GithubRepoView.__super__.constructor.call(this, options, data);
    this.state = NOT_CLONED;
    this.repo = options.data;
    this.installer = options.installer;
    this.loading = false;
  }

  GithubRepoView.prototype.viewAppended = function() {
    var buttonTitle, cssClass, extraInfo, info;
    this.addSubView(new KDCustomHTMLView({
      cssClass: "avatar",
      partial: "<img src=\"" + this.repo.avatar + "\"/>"
    }));
    this.addSubView(info = new KDCustomHTMLView({
      cssClass: "info"
    }));
    info.addSubView(new KDCustomHTMLView({
      tagName: "a",
      cssClass: "name",
      partial: "<span>" + this.repo.user + "</span>/<strong>" + this.repo.name + "</strong>",
      attributes: {
        href: this.repo.url,
        target: "_blank"
      }
    }));
    info.addSubView(new KDCustomHTMLView({
      cssClass: "description",
      partial: this.repo.description
    }));
    this.addSubView(extraInfo = new KDCustomHTMLView({
      cssClass: "extra-info"
    }));
    extraInfo.addSubView(new KDCustomHTMLView({
      cssClass: "details",
      partial: "" + (this.repo.language || "Unknown") + " - Stars: " + this.repo.stars
    }));
    if (this.repo.cloned) {
      buttonTitle = "cloned";
      cssClass = "cloned";
    } else {
      buttonTitle = "clone to vm";
      cssClass = "";
    }
    return extraInfo.addSubView(this.button = new KDCustomHTMLView({
      partial: buttonTitle,
      cssClass: "button " + cssClass,
      click: (function(_this) {
        return function() {
          if (!_this.repo.cloned) {
            _this.button.setClass("cloned");
            _this.button.updatePartial("cloning");
            return _this.installer.cloneRepo(_this.repo).then(function() {
              _this.button.updatePartial("cloned");
              _this.button.setClass("cloned");
              return _this.repo.cloned = true;
            })["catch"](function(error) {
              console.log(error);
              _this.button.updatePartial("failed");
              _this.button.setClass("error");
              return _this.button.unsetClass("cloned");
            });
          }
        };
      })(this)
    }));
  };

  return GithubRepoView;

})(KDListItemView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/myRepos.coffee */
var GithubMyReposPaneView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubMyReposPaneView = (function(_super) {
  __extends(GithubMyReposPaneView, _super);

  function GithubMyReposPaneView(options, data) {
    if (options == null) {
      options = {};
    }
    GithubMyReposPaneView.__super__.constructor.call(this, options, data);
    this.installer = options.installer;
  }

  GithubMyReposPaneView.prototype.viewAppended = function() {
    this.addSubView(this.loader = new KDLoaderView({
      cssClass: "loader",
      showLoader: false
    }));
    this.addSubView(this.repos = new KDListView({
      cssClass: "repos"
    }));
    return KD.utils.defer((function(_this) {
      return function() {
        return _this.populateRepos();
      };
    })(this));
  };

  GithubMyReposPaneView.prototype.reload = function() {
    return this.populateRepos();
  };

  GithubMyReposPaneView.prototype.populateRepos = function() {
    this.loader.show();
    this.repos.empty();
    return this.installer.myRepos().then((function(_this) {
      return function(repos) {
        var repo, _i, _len, _results;
        _this.loader.hide();
        if (repos != null) {
          _results = [];
          for (_i = 0, _len = repos.length; _i < _len; _i++) {
            repo = repos[_i];
            _results.push(_this.repos.addItemView(new GithubRepoView({
              installer: _this.installer,
              data: repo
            })));
          }
          return _results;
        } else {
          return _this.repos.addItemView(new KDView({
            partial: "Woah, slow down. Github can't handle that many search requests. Try again in a minute"
          }));
        }
      };
    })(this));
  };

  return GithubMyReposPaneView;

})(KDView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/trending.coffee */
var GithubTrendingPaneView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubTrendingPaneView = (function(_super) {
  __extends(GithubTrendingPaneView, _super);

  function GithubTrendingPaneView(options, data) {
    if (options == null) {
      options = {};
    }
    GithubTrendingPaneView.__super__.constructor.call(this, options, data);
    this.topic = randomTopic();
    this.installer = options.installer;
  }

  GithubTrendingPaneView.prototype.viewAppended = function() {
    this.addSubView(new KDListView({
      cssClass: "topic",
      partial: "Showing trending repos related to <strong>" + this.topic + "</strong>..."
    }));
    this.addSubView(this.loader = new KDLoaderView({
      cssClass: "loader",
      showLoader: false
    }));
    this.addSubView(this.repos = new KDListView({
      cssClass: "repos"
    }));
    return KD.utils.defer((function(_this) {
      return function() {
        return _this.populateRepos();
      };
    })(this));
  };

  GithubTrendingPaneView.prototype.reload = function() {
    return this.populateRepos();
  };

  GithubTrendingPaneView.prototype.populateRepos = function() {
    this.loader.show();
    this.repos.empty();
    return this.installer.trendingRepos(this.topic).then((function(_this) {
      return function(repos) {
        var repo, _i, _len, _results;
        _this.loader.hide();
        if (repos != null) {
          _results = [];
          for (_i = 0, _len = repos.length; _i < _len; _i++) {
            repo = repos[_i];
            _results.push(_this.repos.addItemView(new GithubRepoView({
              installer: _this.installer,
              data: repo
            })));
          }
          return _results;
        } else {
          return _this.repos.addItemView(new KDView({
            partial: "Woah, slow down. Github can't handle that many search requests. Try again in a minute"
          }));
        }
      };
    })(this));
  };

  return GithubTrendingPaneView;

})(KDView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/search.coffee */
var GithubSearchPaneView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubSearchPaneView = (function(_super) {
  __extends(GithubSearchPaneView, _super);

  function GithubSearchPaneView(options, data) {
    if (options == null) {
      options = {};
    }
    GithubSearchPaneView.__super__.constructor.call(this, options, data);
    this.installer = options.installer;
  }

  GithubSearchPaneView.prototype.viewAppended = function() {
    this.addSubView(this.searchBox = new KDInputView({
      cssClass: "search-input",
      placeholder: "Search github for " + (topics.slice(0, 3).join(", ")) + "..."
    }));
    this.searchBox.on('keydown', (function(_this) {
      return function(e) {
        if (e.keyCode === 13 && _this.searchBox.getValue()) {
          return _this.searchRepos(_this.searchBox.getValue());
        }
      };
    })(this));
    this.addSubView(this.loader = new KDLoaderView({
      cssClass: "loader",
      showLoader: false
    }));
    return this.addSubView(this.repos = new KDListView({
      cssClass: "repos"
    }));
  };

  GithubSearchPaneView.prototype.reload = function() {
    var search;
    search = this.searchBox.getValue();
    if (search) {
      return this.searchRepos(search);
    }
  };

  GithubSearchPaneView.prototype.searchRepos = function(search) {
    this.loader.show();
    this.repos.empty();
    return this.installer.searchRepos(search).then((function(_this) {
      return function(repos) {
        _this.loader.hide();
        return _this.populateRepos(repos);
      };
    })(this));
  };

  GithubSearchPaneView.prototype.populateRepos = function(repos) {
    var repo, _i, _len, _results;
    if (repos != null) {
      _results = [];
      for (_i = 0, _len = repos.length; _i < _len; _i++) {
        repo = repos[_i];
        _results.push(this.repos.addItemView(new GithubRepoView({
          installer: this.installer,
          data: repo
        })));
      }
      return _results;
    } else {
      return this.repos.addItemView(new KDView({
        partial: "Woah, slow down. Github can't handle that many search requests. Try again in a minute"
      }));
    }
  };

  return GithubSearchPaneView;

})(KDView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/controllers/kiteHelper.coffee */
var KiteHelper,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

KiteHelper = (function(_super) {
  __extends(KiteHelper, _super);

  function KiteHelper(options, data) {
    var kiteHelperController;
    if (options == null) {
      options = {};
    }
    this.vmIsStarting = false;
    kiteHelperController = KD.singletons.kiteHelperController;
    if (kiteHelperController) {
      return kiteHelperController;
    }
    this.registerSingleton("kiteHelperController", this, true);
    KiteHelper.__super__.constructor.call(this, options, data);
  }

  KiteHelper.prototype.getReady = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        var JVM;
        JVM = KD.remote.api.JVM;
        return JVM.fetchVmsByContext(function(err, vms) {
          var alias, kiteController, vm, _i, _len;
          if (err) {
            console.warn(err);
          }
          if (!vms) {
            return reject(vms);
          }
          _this._vms = vms;
          _this._kites = {};
          kiteController = KD.singletons.kiteController;
          for (_i = 0, _len = vms.length; _i < _len; _i++) {
            vm = vms[_i];
            alias = vm.hostnameAlias;
            _this._kites[alias] = kiteController.getKite("os-" + vm.region, alias, 'os');
          }
          _this.emit('ready');
          return resolve();
        });
      };
    })(this));
  };

  KiteHelper.prototype.setDefaultVm = function(vm) {
    this.defaultVm = vm;
    return this.vmIsStarting = false;
  };

  KiteHelper.prototype.getVm = function() {
    return this.defaultVm != null ? this.defaultVm : this.defaultVm = this._vms.first;
  };

  KiteHelper.prototype.getVmByName = function(name) {
    var vm, _i, _len, _ref;
    _ref = this._vms;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vm = _ref[_i];
      if (vm.hostnameAlias === name) {
        return vm;
      }
    }
  };

  KiteHelper.prototype.getVms = function() {
    return this._vms.sort((function(_this) {
      return function(a, b) {
        return _this.getVMNumber(a) > _this.getVMNumber(b);
      };
    })(this));
  };

  KiteHelper.prototype.testKite = function() {
    return this.run({
      command: "echo are we running"
    });
  };

  KiteHelper.prototype.getVMNumber = function(_arg) {
    var hostnameAlias;
    hostnameAlias = _arg.hostnameAlias;
    return +(hostnameAlias.match(/\d+/)[0]);
  };

  KiteHelper.prototype.turnOffVm = function(vm) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return _this.getReady().then(function() {
          var kite;
          if (!(kite = _this._kites[vm])) {
            return reject({
              message: "No such kite for " + vm
            });
          }
          return kite.vmOff().then(function() {
            return _this.whenVmState(vm, "STOPPED").then(function() {
              return resolve();
            })["catch"](reject);
          })["catch"](reject);
        })["catch"](reject);
      };
    })(this));
  };

  KiteHelper.prototype.whenVmState = function(vm, state) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        var repeat, timeout, vmController, wait;
        vmController = KD.singletons.vmController;
        timeout = 10 * 60 * 1000;
        repeat = KD.utils.repeat(1000, function() {
          return vmController.info(vm, function(err, vmn, info) {
            if ((info != null ? info.state : void 0) === state) {
              KD.utils.killRepeat(repeat);
              KD.utils.killWait(wait);
              return resolve();
            }
          });
        });
        return wait = KD.utils.wait(timeout, function() {
          if (repeat != null) {
            KD.utils.killRepeat(repeat);
            return reject();
          }
        });
      };
    })(this));
  };

  KiteHelper.prototype.getKite = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return _this.getReady().then(function() {
          var kite, vm, vmController;
          vm = _this.getVm().hostnameAlias;
          vmController = KD.singletons.vmController;
          if (!(kite = _this._kites[vm])) {
            return reject({
              message: "No such kite for " + vm
            });
          }
          return vmController.info(vm, function(err, vmn, info) {
            var timeout;
            if (err) {
              return reject(err);
            }
            if (!_this.vmIsStarting && info.state === "STOPPED") {
              _this.vmIsStarting = true;
              timeout = 10 * 60 * 1000;
              kite.options.timeout = timeout;
              return kite.vmOn().then(function() {
                return _this.whenVmState(vm, "RUNNING").then(function() {
                  _this.vmIsStarting = false;
                  return resolve(kite);
                })["catch"](function(err) {
                  _this.vmIsStarting = false;
                  return reject(err);
                });
              }).timeout(timeout)["catch"](function(err) {
                _this.vmIsStarting = false;
                return reject(err);
              });
            } else {
              return resolve(kite);
            }
          });
        });
      };
    })(this));
  };

  KiteHelper.prototype.run = function(options) {
    return this.getKite().then(function(kite) {
      if (options.timeout == null) {
        options.timeout = 10 * 60 * 1000;
      }
      kite.options.timeout = options.timeout;
      return kite.exec(options);
    });
  };

  return KiteHelper;

})(KDController);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/controllers/installer.coffee */
var GithubInstallerController,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

GithubInstallerController = (function(_super) {
  __extends(GithubInstallerController, _super);

  function GithubInstallerController(options, data) {
    var githubInstallerController;
    if (options == null) {
      options = {};
    }
    githubInstallerController = KD.singletons.githubInstallerController;
    if (githubInstallerController) {
      return githubInstallerController;
    }
    this.kiteHelper = options.kiteHelper;
    this.appStorage = options.appStorage;
    this.token = null;
    this.registerSingleton("githubInstallerController", this, true);
    GithubInstallerController.__super__.constructor.call(this, options, data);
  }

  GithubInstallerController.prototype.announce = function(message, error) {
    return this.emit("status-update", message, error);
  };

  GithubInstallerController.prototype.error = function(err, override) {
    var message, _ref;
    message = ((_ref = err.details) != null ? _ref.message : void 0) || err.message;
    switch (message) {
      case "CPU limit reached":
        message = "To use another vm with your plan, please turn off one of your vms";
        this.turnOffVmModal();
        break;
      default:
        message = override;
    }
    console.log(err);
    return this.announce(message, true);
  };

  GithubInstallerController.prototype.handler = function(url) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        if (_this.token != null) {
          return _this.token.get(url).done(function(data) {
            return resolve(data);
          }).fail(function(err) {
            return reject(err);
          });
        } else {
          return $.getJSON("" + api + url).then(function(data) {
            return resolve(data);
          }).fail(function(err) {
            return reject(err);
          });
        }
      };
    })(this));
  };

  GithubInstallerController.prototype.request = function(topic) {
    return this.clonedRepos().then((function(_this) {
      return function(clonedRepos) {
        var paramaters;
        paramaters = "q=" + topic + "&sort=stars&order=desc&limit=" + repoSearchLimit;
        return _this.handler("/search/repositories?" + paramaters).then(function(response) {
          var repo, repoData, repos, _i, _len, _ref;
          repos = [];
          _ref = response.items;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            repo = _ref[_i];
            repoData = _this.repoData(clonedRepos, repo);
            repos.push(repoData);
          }
          return repos;
        });
      };
    })(this));
  };

  GithubInstallerController.prototype.repoData = function(repos, repo) {
    var _ref;
    repo.description || (repo.description = "");
    if (repo.description.length > 150) {
      repo.description = "" + (repo.description.slice(0, 150)) + "...";
    }
    return {
      name: repo.name,
      user: repo.owner.login,
      avatar: repo.owner.avatar_url,
      cloneUrl: repo.clone_url,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      url: repo.html_url,
      sshCloneUrl: repo.ssh_url,
      cloned: (_ref = repo.name, __indexOf.call(repos, _ref) >= 0)
    };
  };

  GithubInstallerController.prototype.searchRepos = function(search) {
    return this.request(search);
  };

  GithubInstallerController.prototype.trendingRepos = function(topic) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return _this.request(topic).then(function(repos) {
          _this.appStorage.setValue("repos", repos);
          return resolve(repos);
        })["catch"](function(error) {
          var value;
          console.log(error);
          value = _this.appStorage.getValue("repos");
          if (value != null) {
            return resolve(value);
          } else {
            return reject(error);
          }
        });
      };
    })(this));
  };

  GithubInstallerController.prototype.myRepos = function() {
    return this.clonedRepos().then((function(_this) {
      return function(clonedRepos) {
        return _this.handler("/user/repos").then(function(response) {
          var repo, repoData, repos, _i, _len;
          repos = [];
          for (_i = 0, _len = response.length; _i < _len; _i++) {
            repo = response[_i];
            repoData = _this.repoData(clonedRepos, repo);
            repos.push(repoData);
          }
          return repos;
        });
      };
    })(this));
  };

  GithubInstallerController.prototype.clonedRepos = function() {
    return this.kiteHelper.run({
      command: "mkdir -p ~/Github;\ncd ~/Github;\nls -d */;"
    }).then(function(response) {
      return response.stdout.split("\n").map(function(folder) {
        return folder.slice(0, -1);
      });
    });
  };

  GithubInstallerController.prototype.cloneRepo = function(repo) {
    this.announce("Cloning " + repo.name + " to ~/Github directory...");
    return this.kiteHelper.run({
      command: "git clone " + repo.cloneUrl + " ~/Github/" + repo.name
    }).then((function(_this) {
      return function() {
        return _this.announce(false);
      };
    })(this));
  };

  GithubInstallerController.prototype.removeModal = function() {
    this.modal.destroy();
    return delete this.modal;
  };

  return GithubInstallerController;

})(KDController);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/index.coffee */
var GithubMainView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubMainView = (function(_super) {
  __extends(GithubMainView, _super);

  function GithubMainView(options, data) {
    if (options == null) {
      options = {};
    }
    this.kiteHelper = new KiteHelper;
    this.appStorage = KD.getSingleton('appStorageController').storage('Github', '0.1');
    this.installer = new GithubInstallerController({
      kiteHelper: this.kiteHelper,
      appStorage: this.appStorage
    });
    this.selectVm = new GithubSelectVm({
      kiteHelper: this.kiteHelper
    });
    options.cssClass = "" + appCSS + " main-view";
    GithubMainView.__super__.constructor.call(this, options, data);
  }

  GithubMainView.prototype.viewAppended = function() {
    this.addSubView(this.wrapper = new KDCustomHTMLView({
      cssClass: 'wrapper'
    }));
    this.wrapper.addSubView(this.selectVm);
    this.wrapper.addSubView(this.container = new KDCustomHTMLView({
      cssClass: 'container'
    }));
    this.container.addSubView(this.statusBar = new KDCustomHTMLView({
      cssClass: 'status-bar hidden'
    }));
    this.container.addSubView(this.githubConnect = new KDCustomHTMLView({
      cssClass: 'github-button',
      partial: "Connect with Github",
      click: this.bound("oauthAuthentication")
    }));
    this.container.addSubView(this.tabView = new KDTabView({
      cssClass: "tab-view"
    }));
    this.tabView.addPane(this.trendingTab = new KDTabPaneView({
      title: "Trending",
      closable: false
    }));
    this.tabView.addPane(this.searchTab = new KDTabPaneView({
      title: "Search",
      closable: false
    }));
    this.trendingTab.setMainView(this.trending = new GithubTrendingPaneView({
      installer: this.installer
    }));
    this.searchTab.setMainView(this.search = new GithubSearchPaneView({
      installer: this.installer
    }));
    this.tabView.showPane(this.trendingTab);
    return KD.utils.defer((function(_this) {
      return function() {
        var token;
        token = OAuth.create("github");
        if (token !== false) {
          _this.initPersonal(token);
        }
        _this.selectVm.on("reload-tabs", _this.bound("reloadTabs"));
        _this.selectVm.on("status-update", _this.bound("statusUpdate"));
        return _this.installer.on("status-update", _this.bound("statusUpdate"));
      };
    })(this));
  };

  GithubMainView.prototype.reloadTabs = function() {
    this.trending.reload();
    this.search.reload();
    if (this.myRepos != null) {
      return this.myRepos.reload();
    }
  };

  GithubMainView.prototype.statusUpdate = function(message, error) {
    if (message === false) {
      this.githubConnect.show();
      return this.statusBar.hide();
    } else {
      this.githubConnect.hide();
      this.statusBar.show();
    }
    this.statusBar.updatePartial(message);
    return this.statusBar[error ? "setClass" : "unsetClass"]("error");
  };

  GithubMainView.prototype.oauthAuthentication = function() {
    return OAuth.popup("github", {
      cache: true
    }).done((function(_this) {
      return function(token) {
        _this.initPersonal(token);
        return _this.appStorage.setValue("githubToken", token);
      };
    })(this)).fail(function(err) {
      return console.log(err);
    });
  };

  GithubMainView.prototype.initPersonal = function(token) {
    this.githubConnect.destroy();
    this.installer.token = token;
    this.tabView.addPane(this.myReposTab = new KDTabPaneView({
      title: "My Repos",
      closable: false
    }));
    return this.myReposTab.setMainView(this.myRepos = new GithubMyReposPaneView({
      installer: this.installer
    }));
  };

  return GithubMainView;

})(KDView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/index.coffee */
var GithubController,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubController = (function(_super) {
  __extends(GithubController, _super);

  function GithubController(options, data) {
    if (options == null) {
      options = {};
    }
    options.view = new GithubMainView;
    options.appInfo = {
      name: "Github",
      type: "application"
    };
    GithubController.__super__.constructor.call(this, options, data);
  }

  return GithubController;

})(AppController);

(function() {
  var view;
  OAuth.initialize(oauthKey);
  if (typeof appView !== "undefined" && appView !== null) {
    view = new GithubMainView;
    return appView.addSubView(view);
  } else {
    return KD.registerAppClass(GithubController, {
      name: "Github",
      routes: {
        "/:name?/Github": null,
        "/:name?/bvallelunga/Apps/Github": null
      },
      dockPath: "/bvallelunga/Apps/Github",
      behavior: "application"
    });
  }
})();

/* KDAPP ENDS */
}).call();