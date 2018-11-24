var Bezier=function(t){function r(i){if(n[i])return n[i].exports;var e=n[i]={exports:{},id:i,loaded:!1};return t[i].call(e.exports,e,e.exports,r),e.loaded=!0,e.exports}var n={};return r.m=t,r.c=n,r.p="",r(0)}([function(t,r,n){"use strict";t.exports=n(1)},function(t,r,n){"use strict";var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};!function(){function r(t,r,n,i,e){"undefined"==typeof e&&(e=.5);var o=l.projectionratio(e,t),s=1-o,u={x:o*r.x+s*i.x,y:o*r.y+s*i.y},a=l.abcratio(e,t),f={x:n.x+(n.x-u.x)/a,y:n.y+(n.y-u.y)/a};return{A:f,B:n,C:u}}var e=Math.abs,o=Math.min,s=Math.max,u=Math.cos,a=Math.sin,f=Math.acos,c=Math.sqrt,h=Math.PI,x={x:0,y:0,z:0},l=n(2),p=n(3),y=function(t){var r=t&&t.forEach?t:[].slice.call(arguments),n=!1;if("object"===i(r[0])){n=r.length;var o=[];r.forEach(function(t){["x","y","z"].forEach(function(r){"undefined"!=typeof t[r]&&o.push(t[r])})}),r=o}var s=!1,u=r.length;if(n){if(n>4){if(1!==arguments.length)throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");s=!0}}else if(6!==u&&8!==u&&9!==u&&12!==u&&1!==arguments.length)throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");var a=!s&&(9===u||12===u)||t&&t[0]&&"undefined"!=typeof t[0].z;this._3d=a;for(var f=[],c=0,h=a?3:2;u>c;c+=h){var x={x:r[c],y:r[c+1]};a&&(x.z=r[c+2]),f.push(x)}this.order=f.length-1,this.points=f;var p=["x","y"];a&&p.push("z"),this.dims=p,this.dimlen=p.length,function(t){for(var r=t.order,n=t.points,i=l.align(n,{p1:n[0],p2:n[r]}),o=0;o<i.length;o++)if(e(i[o].y)>1e-4)return void(t._linear=!1);t._linear=!0}(this),this._t1=0,this._t2=1,this.update()},v=n(4);y.SVGtoBeziers=function(t){return v(y,t)},y.quadraticFromPoints=function(t,n,i,e){if("undefined"==typeof e&&(e=.5),0===e)return new y(n,n,i);if(1===e)return new y(t,n,n);var o=r(2,t,n,i,e);return new y(t,o.A,i)},y.cubicFromPoints=function(t,n,i,e,o){"undefined"==typeof e&&(e=.5);var s=r(3,t,n,i,e);"undefined"==typeof o&&(o=l.dist(n,s.C));var u=o*(1-e)/e,a=l.dist(t,i),f=(i.x-t.x)/a,c=(i.y-t.y)/a,h=o*f,x=o*c,p=u*f,v=u*c,m={x:n.x-h,y:n.y-x},d={x:n.x+p,y:n.y+v},g=s.A,z={x:g.x+(m.x-g.x)/(1-e),y:g.y+(m.y-g.y)/(1-e)},b={x:g.x+(d.x-g.x)/e,y:g.y+(d.y-g.y)/e},_={x:t.x+(z.x-t.x)/e,y:t.y+(z.y-t.y)/e},w={x:i.x+(b.x-i.x)/(1-e),y:i.y+(b.y-i.y)/(1-e)};return new y(t,_,w,i)};var m=function(){return l};y.getUtils=m,y.PolyBezier=p,y.prototype={getUtils:m,valueOf:function(){return this.toString()},toString:function(){return l.pointsToString(this.points)},toSVG:function(t){if(this._3d)return!1;for(var r=this.points,n=r[0].x,i=r[0].y,e=["M",n,i,2===this.order?"Q":"C"],o=1,s=r.length;s>o;o++)e.push(r[o].x),e.push(r[o].y);return e.join(" ")},update:function(){this._lut=[],this.dpoints=l.derive(this.points,this._3d),this.computedirection()},computedirection:function(){var t=this.points,r=l.angle(t[0],t[this.order],t[1]);this.clockwise=r>0},length:function(){return l.length(this.derivative.bind(this))},_lut:[],getLUT:function(t){if(t=t||100,this._lut.length===t)return this._lut;this._lut=[],t--;for(var r=0;t>=r;r++)this._lut.push(this.compute(r/t));return this._lut},on:function(t,r){r=r||5;for(var n,i=this.getLUT(),e=[],o=0,s=0;s<i.length;s++)n=i[s],l.dist(n,t)<r&&(e.push(n),o+=s/i.length);return e.length?o/=e.length:!1},project:function(t){var r=this.getLUT(),n=r.length-1,i=l.closest(r,t),e=i.mdist,o=i.mpos;if(0===o||o===n){var s=o/n,u=this.compute(s);return u.t=s,u.d=e,u}var a,s,f,c,h=(o-1)/n,x=(o+1)/n,p=.1/n;for(e+=1,s=h,a=s;x+p>s;s+=p)f=this.compute(s),c=l.dist(t,f),e>c&&(e=c,a=s);return f=this.compute(a),f.t=a,f.d=e,f},get:function(t){return this.compute(t)},point:function(t){return this.points[t]},compute:function(t){return l.compute(t,this.points,this._3d)},raise:function(){for(var t,r,n,i=this.points,e=[i[0]],o=i.length,t=1;o>t;t++)r=i[t],n=i[t-1],e[t]={x:(o-t)/o*r.x+t/o*n.x,y:(o-t)/o*r.y+t/o*n.y};return e[o]=i[o-1],new y(e)},derivative:function(t){var r,n,i=1-t,e=0,o=this.dpoints[0];2===this.order&&(o=[o[0],o[1],x],r=i,n=t),3===this.order&&(r=i*i,n=i*t*2,e=t*t);var s={x:r*o[0].x+n*o[1].x+e*o[2].x,y:r*o[0].y+n*o[1].y+e*o[2].y};return this._3d&&(s.z=r*o[0].z+n*o[1].z+e*o[2].z),s},curvature:function(t){return l.curvature(t,this.points)},inflections:function(){return l.inflections(this.points)},normal:function(t){return this._3d?this.__normal3(t):this.__normal2(t)},__normal2:function(t){var r=this.derivative(t),n=c(r.x*r.x+r.y*r.y);return{x:-r.y/n,y:r.x/n}},__normal3:function(t){var r=this.derivative(t),n=this.derivative(t+.01),i=c(r.x*r.x+r.y*r.y+r.z*r.z),e=c(n.x*n.x+n.y*n.y+n.z*n.z);r.x/=i,r.y/=i,r.z/=i,n.x/=e,n.y/=e,n.z/=e;var o={x:n.y*r.z-n.z*r.y,y:n.z*r.x-n.x*r.z,z:n.x*r.y-n.y*r.x},s=c(o.x*o.x+o.y*o.y+o.z*o.z);o.x/=s,o.y/=s,o.z/=s;var u=[o.x*o.x,o.x*o.y-o.z,o.x*o.z+o.y,o.x*o.y+o.z,o.y*o.y,o.y*o.z-o.x,o.x*o.z-o.y,o.y*o.z+o.x,o.z*o.z],a={x:u[0]*r.x+u[1]*r.y+u[2]*r.z,y:u[3]*r.x+u[4]*r.y+u[5]*r.z,z:u[6]*r.x+u[7]*r.y+u[8]*r.z};return a},hull:function(t){var r,n=this.points,i=[],e=[],o=0,s=0,u=0;for(e[o++]=n[0],e[o++]=n[1],e[o++]=n[2],3===this.order&&(e[o++]=n[3]);n.length>1;){for(i=[],s=0,u=n.length-1;u>s;s++)r=l.lerp(t,n[s],n[s+1]),e[o++]=r,i.push(r);n=i}return e},split:function(t,r){if(0===t&&r)return this.split(r).left;if(1===r)return this.split(t).right;var n=this.hull(t),i={left:new y(2===this.order?[n[0],n[3],n[5]]:[n[0],n[4],n[7],n[9]]),right:new y(2===this.order?[n[5],n[4],n[2]]:[n[9],n[8],n[6],n[3]]),span:n};if(i.left._t1=l.map(0,0,1,this._t1,this._t2),i.left._t2=l.map(t,0,1,this._t1,this._t2),i.right._t1=l.map(t,0,1,this._t1,this._t2),i.right._t2=l.map(1,0,1,this._t1,this._t2),!r)return i;r=l.map(r,t,1,0,1);var e=i.right.split(r);return e.left},extrema:function(){var t,r,n=this.dims,i={},e=[];return n.forEach(function(n){r=function(t){return t[n]},t=this.dpoints[0].map(r),i[n]=l.droots(t),3===this.order&&(t=this.dpoints[1].map(r),i[n]=i[n].concat(l.droots(t))),i[n]=i[n].filter(function(t){return t>=0&&1>=t}),e=e.concat(i[n].sort(l.numberSort))}.bind(this)),e=e.sort(l.numberSort).filter(function(t,r){return e.indexOf(t)===r}),i.values=e,i},bbox:function(){var t=this.extrema(),r={};return this.dims.forEach(function(n){r[n]=l.getminmax(this,n,t[n])}.bind(this)),r},overlaps:function(t){var r=this.bbox(),n=t.bbox();return l.bboxoverlap(r,n)},offset:function(t,r){if("undefined"!=typeof r){var n=this.get(t),i=this.normal(t),e={c:n,n:i,x:n.x+i.x*r,y:n.y+i.y*r};return this._3d&&(e.z=n.z+i.z*r),e}if(this._linear){var o=this.normal(0),s=this.points.map(function(r){var n={x:r.x+t*o.x,y:r.y+t*o.y};return r.z&&i.z&&(n.z=r.z+t*o.z),n});return[new y(s)]}var u=this.reduce();return u.map(function(r){return r.scale(t)})},simple:function(){if(3===this.order){var t=l.angle(this.points[0],this.points[3],this.points[1]),r=l.angle(this.points[0],this.points[3],this.points[2]);if(t>0&&0>r||0>t&&r>0)return!1}var n=this.normal(0),i=this.normal(1),o=n.x*i.x+n.y*i.y;this._3d&&(o+=n.z*i.z);var s=e(f(o));return h/3>s},reduce:function(){var t,r,n=0,i=0,o=.01,s=[],u=[],a=this.extrema().values;for(-1===a.indexOf(0)&&(a=[0].concat(a)),-1===a.indexOf(1)&&a.push(1),n=a[0],t=1;t<a.length;t++)i=a[t],r=this.split(n,i),r._t1=n,r._t2=i,s.push(r),n=i;return s.forEach(function(t){for(n=0,i=0;1>=i;)for(i=n+o;1+o>=i;i+=o)if(r=t.split(n,i),!r.simple()){if(i-=o,e(n-i)<o)return[];r=t.split(n,i),r._t1=l.map(n,0,1,t._t1,t._t2),r._t2=l.map(i,0,1,t._t1,t._t2),u.push(r),n=i;break}1>n&&(r=t.split(n,1),r._t1=l.map(n,0,1,t._t1,t._t2),r._t2=t._t2,u.push(r))}),u},scale:function(t){var r=this.order,n=!1;if("function"==typeof t&&(n=t),n&&2===r)return this.raise().scale(n);var i=this.clockwise,e=n?n(0):t,o=n?n(1):t,s=[this.offset(0,10),this.offset(1,10)],u=l.lli4(s[0],s[0].c,s[1],s[1].c);if(!u)throw new Error("cannot scale this curve. Try reducing it first.");var a=this.points,f=[];return[0,1].forEach(function(t){var n=f[t*r]=l.copy(a[t*r]);n.x+=(t?o:e)*s[t].n.x,n.y+=(t?o:e)*s[t].n.y}.bind(this)),n?([0,1].forEach(function(e){if(2!==this.order||!e){var o=a[e+1],s={x:o.x-u.x,y:o.y-u.y},h=n?n((e+1)/r):t;n&&!i&&(h=-h);var x=c(s.x*s.x+s.y*s.y);s.x/=x,s.y/=x,f[e+1]={x:o.x+h*s.x,y:o.y+h*s.y}}}.bind(this)),new y(f)):([0,1].forEach(function(t){if(2!==this.order||!t){var n=f[t*r],i=this.derivative(t),e={x:n.x+i.x,y:n.y+i.y};f[t+1]=l.lli4(n,e,u,a[t+1])}}.bind(this)),new y(f))},outline:function(t,r,n,i){function e(t,r,n,i,e){return function(o){var s=i/n,u=(i+e)/n,a=r-t;return l.map(o,0,1,t+s*a,t+u*a)}}r="undefined"==typeof r?t:r;var o,s=this.reduce(),u=s.length,a=[],f=[],c=0,h=this.length(),x="undefined"!=typeof n&&"undefined"!=typeof i;s.forEach(function(o){_=o.length(),x?(a.push(o.scale(e(t,n,h,c,_))),f.push(o.scale(e(-r,-i,h,c,_)))):(a.push(o.scale(t)),f.push(o.scale(-r))),c+=_}),f=f.map(function(t){return o=t.points,o[3]?t.points=[o[3],o[2],o[1],o[0]]:t.points=[o[2],o[1],o[0]],t}).reverse();var y=a[0].points[0],v=a[u-1].points[a[u-1].points.length-1],m=f[u-1].points[f[u-1].points.length-1],d=f[0].points[0],g=l.makeline(m,y),z=l.makeline(v,d),b=[g].concat(a).concat([z]).concat(f),_=b.length;return new p(b)},outlineshapes:function(t,r,n){r=r||t;for(var i=this.outline(t,r).curves,e=[],o=1,s=i.length;s/2>o;o++){var u=l.makeshape(i[o],i[s-o],n);u.startcap.virtual=o>1,u.endcap.virtual=s/2-1>o,e.push(u)}return e},intersects:function(t,r){return t?t.p1&&t.p2?this.lineIntersects(t):(t instanceof y&&(t=t.reduce()),this.curveintersects(this.reduce(),t,r)):this.selfintersects(r)},lineIntersects:function(t){var r=o(t.p1.x,t.p2.x),n=o(t.p1.y,t.p2.y),i=s(t.p1.x,t.p2.x),e=s(t.p1.y,t.p2.y),u=this;return l.roots(this.points,t).filter(function(t){var o=u.get(t);return l.between(o.x,r,i)&&l.between(o.y,n,e)})},selfintersects:function(t){var r,n,i,e,o=this.reduce(),s=o.length-2,u=[];for(r=0;s>r;r++)i=o.slice(r,r+1),e=o.slice(r+2),n=this.curveintersects(i,e,t),u=u.concat(n);return u},curveintersects:function(t,r,n){var i=[];t.forEach(function(t){r.forEach(function(r){t.overlaps(r)&&i.push({left:t,right:r})})});var e=[];return i.forEach(function(t){var r=l.pairiteration(t.left,t.right,n);r.length>0&&(e=e.concat(r))}),e},arcs:function(t){t=t||.5;var r=[];return this._iterate(t,r)},_error:function(t,r,n,i){var o=(i-n)/4,s=this.get(n+o),u=this.get(i-o),a=l.dist(t,r),f=l.dist(t,s),c=l.dist(t,u);return e(f-a)+e(c-a)},_iterate:function(t,r){var n,i=0,e=1;do{n=0,e=1;var o,s,f,c,h,x=this.get(i),p=!1,y=!1,v=e,m=1,d=0;do{y=p,c=f,v=(i+e)/2,d++,o=this.get(v),s=this.get(e),f=l.getccenter(x,o,s),f.interval={start:i,end:e};var g=this._error(f,x,i,e);if(p=t>=g,h=y&&!p,h||(m=e),p){if(e>=1){if(f.interval.end=m=1,c=f,e>1){var z={x:f.x+f.r*u(f.e),y:f.y+f.r*a(f.e)};f.e+=l.angle({x:f.x,y:f.y},z,this.get(1))}break}e+=(e-i)/2}else e=v}while(!h&&n++<100);if(n>=100)break;c=c?c:f,r.push(c),i=m}while(1>e);return r}},t.exports=y}()},function(t,r,n){"use strict";!function(){var r=Math.abs,i=Math.cos,e=Math.sin,o=Math.acos,s=Math.atan2,u=Math.sqrt,a=Math.pow,f=function(t){return 0>t?-a(-t,1/3):a(t,1/3)},c=Math.PI,h=2*c,x=c/2,l=1e-6,p=Number.MAX_SAFE_INTEGER||9007199254740991,y=Number.MIN_SAFE_INTEGER||-9007199254740991,v={x:0,y:0,z:0},m={Tvalues:[-.06405689286260563,.06405689286260563,-.1911188674736163,.1911188674736163,-.3150426796961634,.3150426796961634,-.4337935076260451,.4337935076260451,-.5454214713888396,.5454214713888396,-.6480936519369755,.6480936519369755,-.7401241915785544,.7401241915785544,-.820001985973903,.820001985973903,-.8864155270044011,.8864155270044011,-.9382745520027328,.9382745520027328,-.9747285559713095,.9747285559713095,-.9951872199970213,.9951872199970213],Cvalues:[.12793819534675216,.12793819534675216,.1258374563468283,.1258374563468283,.12167047292780339,.12167047292780339,.1155056680537256,.1155056680537256,.10744427011596563,.10744427011596563,.09761865210411388,.09761865210411388,.08619016153195327,.08619016153195327,.0733464814110803,.0733464814110803,.05929858491543678,.05929858491543678,.04427743881741981,.04427743881741981,.028531388628933663,.028531388628933663,.0123412297999872,.0123412297999872],arcfn:function(t,r){var n=r(t),i=n.x*n.x+n.y*n.y;return"undefined"!=typeof n.z&&(i+=n.z*n.z),u(i)},compute:function(t,r,n){if(0===t)return r[0];var i=r.length-1;if(1===t)return r[i];var e=r,o=1-t;if(0===i)return r[0];if(1===i)return x={x:o*e[0].x+t*e[1].x,y:o*e[0].y+t*e[1].y},n&&(x.z=o*e[0].z+t*e[1].z),x;if(4>i){var s,u,a,f=o*o,c=t*t,h=0;2===i?(e=[e[0],e[1],e[2],v],s=f,u=o*t*2,a=c):3===i&&(s=f*o,u=f*t*3,a=o*c*3,h=t*c);var x={x:s*e[0].x+u*e[1].x+a*e[2].x+h*e[3].x,y:s*e[0].y+u*e[1].y+a*e[2].y+h*e[3].y};return n&&(x.z=s*e[0].z+u*e[1].z+a*e[2].z+h*e[3].z),x}for(var l=JSON.parse(JSON.stringify(r));l.length>1;){for(var p=0;p<l.length-1;p++)l[p]={x:l[p].x+(l[p+1].x-l[p].x)*t,y:l[p].y+(l[p+1].y-l[p].y)*t},"undefined"!=typeof l[p].z&&(l[p]=l[p].z+(l[p+1].z-l[p].z)*t);l.splice(l.length-1,1)}return l[0]},derive:function(t,r){for(var n=[],i=t,e=i.length,o=e-1;e>1;e--,o--){for(var s,u=[],a=0;o>a;a++)s={x:o*(i[a+1].x-i[a].x),y:o*(i[a+1].y-i[a].y)},r&&(s.z=o*(i[a+1].z-i[a].z)),u.push(s);n.push(u),i=u}return n},between:function(t,r,n){return t>=r&&n>=t||m.approximately(t,r)||m.approximately(t,n)},approximately:function(t,n,i){return r(t-n)<=(i||l)},length:function(t){var r,n,i=.5,e=0,o=m.Tvalues.length;for(r=0;o>r;r++)n=i*m.Tvalues[r]+i,e+=m.Cvalues[r]*m.arcfn(n,t);return i*e},map:function(t,r,n,i,e){var o=n-r,s=e-i,u=t-r,a=u/o;return i+s*a},lerp:function(t,r,n){var i={x:r.x+t*(n.x-r.x),y:r.y+t*(n.y-r.y)};return r.z&&n.z&&(i.z=r.z+t*(n.z-r.z)),i},pointToString:function(t){var r=t.x+"/"+t.y;return"undefined"!=typeof t.z&&(r+="/"+t.z),r},pointsToString:function(t){return"["+t.map(m.pointToString).join(", ")+"]"},copy:function(t){return JSON.parse(JSON.stringify(t))},angle:function(t,r,n){var i=r.x-t.x,e=r.y-t.y,o=n.x-t.x,u=n.y-t.y,a=i*u-e*o,f=i*o+e*u;return s(a,f)},round:function(t,r){var n=""+t,i=n.indexOf(".");return parseFloat(n.substring(0,i+1+r))},dist:function(t,r){var n=t.x-r.x,i=t.y-r.y;return u(n*n+i*i)},closest:function(t,r){var n,i,e=a(2,63);return t.forEach(function(t,o){i=m.dist(r,t),e>i&&(e=i,n=o)}),{mdist:e,mpos:n}},abcratio:function(t,n){if(2!==n&&3!==n)return!1;if("undefined"==typeof t)t=.5;else if(0===t||1===t)return t;var i=a(t,n)+a(1-t,n),e=i-1;return r(e/i)},projectionratio:function(t,r){if(2!==r&&3!==r)return!1;if("undefined"==typeof t)t=.5;else if(0===t||1===t)return t;var n=a(1-t,r),i=a(t,r)+n;return n/i},lli8:function(t,r,n,i,e,o,s,u){var a=(t*i-r*n)*(e-s)-(t-n)*(e*u-o*s),f=(t*i-r*n)*(o-u)-(r-i)*(e*u-o*s),c=(t-n)*(o-u)-(r-i)*(e-s);return 0==c?!1:{x:a/c,y:f/c}},lli4:function(t,r,n,i){var e=t.x,o=t.y,s=r.x,u=r.y,a=n.x,f=n.y,c=i.x,h=i.y;return m.lli8(e,o,s,u,a,f,c,h)},lli:function(t,r){return m.lli4(t,t.c,r,r.c)},makeline:function(t,r){var i=n(1),e=t.x,o=t.y,s=r.x,u=r.y,a=(s-e)/3,f=(u-o)/3;return new i(e,o,e+a,o+f,e+2*a,o+2*f,s,u)},findbbox:function(t){var r=p,n=p,i=y,e=y;return t.forEach(function(t){var o=t.bbox();r>o.x.min&&(r=o.x.min),n>o.y.min&&(n=o.y.min),i<o.x.max&&(i=o.x.max),e<o.y.max&&(e=o.y.max)}),{x:{min:r,mid:(r+i)/2,max:i,size:i-r},y:{min:n,mid:(n+e)/2,max:e,size:e-n}}},shapeintersections:function(t,r,n,i,e){if(!m.bboxoverlap(r,i))return[];var o=[],s=[t.startcap,t.forward,t.back,t.endcap],u=[n.startcap,n.forward,n.back,n.endcap];return s.forEach(function(r){r.virtual||u.forEach(function(i){if(!i.virtual){var s=r.intersects(i,e);s.length>0&&(s.c1=r,s.c2=i,s.s1=t,s.s2=n,o.push(s))}})}),o},makeshape:function(t,r,n){var i=r.points.length,e=t.points.length,o=m.makeline(r.points[i-1],t.points[0]),s=m.makeline(t.points[e-1],r.points[0]),u={startcap:o,forward:t,back:r,endcap:s,bbox:m.findbbox([o,t,r,s])},a=m;return u.intersections=function(t){return a.shapeintersections(u,u.bbox,t,t.bbox,n)},u},getminmax:function(t,r,n){if(!n)return{min:0,max:0};var i,e,o=p,s=y;-1===n.indexOf(0)&&(n=[0].concat(n)),-1===n.indexOf(1)&&n.push(1);for(var u=0,a=n.length;a>u;u++)i=n[u],e=t.get(i),e[r]<o&&(o=e[r]),e[r]>s&&(s=e[r]);return{min:o,mid:(o+s)/2,max:s,size:s-o}},align:function(t,r){var n=r.p1.x,o=r.p1.y,u=-s(r.p2.y-o,r.p2.x-n),a=function(t){return{x:(t.x-n)*i(u)-(t.y-o)*e(u),y:(t.x-n)*e(u)+(t.y-o)*i(u)}};return t.map(a)},roots:function(t,r){r=r||{p1:{x:0,y:0},p2:{x:1,y:0}};var n=t.length-1,e=m.align(t,r),s=function(t){return t>=0&&1>=t};if(2===n){var a=e[0].y,c=e[1].y,x=e[2].y,l=a-2*c+x;if(0!==l){var p=-u(c*c-a*x),y=-a+c,v=-(p+y)/l,d=-(-p+y)/l;return[v,d].filter(s)}return c!==x&&0===l?[(2*c-x)/(2*c-2*x)].filter(s):[]}var g=e[0].y,z=e[1].y,b=e[2].y,_=e[3].y,l=-g+3*z-3*b+_,a=3*g-6*z+3*b,c=-3*g+3*z,x=g;if(m.approximately(l,0)){if(m.approximately(a,0))return m.approximately(c,0)?[]:[-x/c].filter(s);var w=u(c*c-4*a*x),E=2*a;return[(w-c)/E,(-c-w)/E].filter(s)}a/=l,c/=l,x/=l;var M,v,S,k,j,e=(3*c-a*a)/3,O=e/3,w=(2*a*a*a-9*a*c+27*x)/27,T=w/2,C=T*T+O*O*O;if(0>C){var L=-e/3,N=L*L*L,A=u(N),B=-w/(2*A),F=-1>B?-1:B>1?1:B,I=o(F),q=f(A),P=2*q;return S=P*i(I/3)-a/3,k=P*i((I+h)/3)-a/3,j=P*i((I+2*h)/3)-a/3,[S,k,j].filter(s)}if(0===C)return M=0>T?f(-T):-f(T),S=2*M-a/3,k=-M-a/3,[S,k].filter(s);var Q=u(C);return M=f(-T+Q),v=f(T+Q),[M-v-a/3].filter(s)},droots:function(t){if(3===t.length){var r=t[0],n=t[1],i=t[2],e=r-2*n+i;if(0!==e){var o=-u(n*n-r*i),s=-r+n,a=-(o+s)/e,f=-(-o+s)/e;return[a,f]}return n!==i&&0===e?[(2*n-i)/(2*(n-i))]:[]}if(2===t.length){var r=t[0],n=t[1];return r!==n?[r/(r-n)]:[]}},curvature:function(t,r){var n=m.derive(r),i=n[0],e=n[1],o=m.compute(t,i),s=m.compute(t,e),u=o.x*s.y-o.y*s.x,f=a(o.x*o.x+o.y*o.y,2/3);return 0===u||0===f?{k:0,r:0}:{k:u/f,r:f/u}},inflections:function(t){if(t.length<4)return[];var r=m.align(t,{p1:t[0],p2:t.slice(-1)[0]}),n=r[2].x*r[1].y,i=r[3].x*r[1].y,e=r[1].x*r[2].y,o=r[3].x*r[2].y,s=18*(-3*n+2*i+3*e-o),u=18*(3*n-i-3*e),a=18*(e-n);if(m.approximately(s,0)){if(!m.approximately(u,0)){var f=-a/u;if(f>=0&&1>=f)return[f]}return[]}var c=u*u-4*s*a,h=Math.sqrt(c),o=2*s;return m.approximately(o,0)?[]:[(h-u)/o,-(u+h)/o].filter(function(t){return t>=0&&1>=t})},bboxoverlap:function(t,n){var i,e,o,s,u,a=["x","y"],f=a.length;for(i=0;f>i;i++)if(e=a[i],o=t[e].mid,s=n[e].mid,u=(t[e].size+n[e].size)/2,r(o-s)>=u)return!1;return!0},expandbox:function(t,r){r.x.min<t.x.min&&(t.x.min=r.x.min),r.y.min<t.y.min&&(t.y.min=r.y.min),r.z&&r.z.min<t.z.min&&(t.z.min=r.z.min),r.x.max>t.x.max&&(t.x.max=r.x.max),r.y.max>t.y.max&&(t.y.max=r.y.max),r.z&&r.z.max>t.z.max&&(t.z.max=r.z.max),t.x.mid=(t.x.min+t.x.max)/2,t.y.mid=(t.y.min+t.y.max)/2,t.z&&(t.z.mid=(t.z.min+t.z.max)/2),t.x.size=t.x.max-t.x.min,t.y.size=t.y.max-t.y.min,t.z&&(t.z.size=t.z.max-t.z.min)},pairiteration:function(t,r,n){var i=t.bbox(),e=r.bbox(),o=1e5,s=n||.5;if(i.x.size+i.y.size<s&&e.x.size+e.y.size<s)return[(o*(t._t1+t._t2)/2|0)/o+"/"+(o*(r._t1+r._t2)/2|0)/o];var u=t.split(.5),a=r.split(.5),f=[{left:u.left,right:a.left},{left:u.left,right:a.right},{left:u.right,right:a.right},{left:u.right,right:a.left}];f=f.filter(function(t){return m.bboxoverlap(t.left.bbox(),t.right.bbox())});var c=[];return 0===f.length?c:(f.forEach(function(t){c=c.concat(m.pairiteration(t.left,t.right,s))}),c=c.filter(function(t,r){return c.indexOf(t)===r}))},getccenter:function(t,r,n){var o,u=r.x-t.x,a=r.y-t.y,f=n.x-r.x,c=n.y-r.y,l=u*i(x)-a*e(x),p=u*e(x)+a*i(x),y=f*i(x)-c*e(x),v=f*e(x)+c*i(x),d=(t.x+r.x)/2,g=(t.y+r.y)/2,z=(r.x+n.x)/2,b=(r.y+n.y)/2,_=d+l,w=g+p,E=z+y,M=b+v,S=m.lli8(d,g,_,w,z,b,E,M),k=m.dist(S,t),j=s(t.y-S.y,t.x-S.x),O=s(r.y-S.y,r.x-S.x),T=s(n.y-S.y,n.x-S.x);return T>j?((j>O||O>T)&&(j+=h),j>T&&(o=T,T=j,j=o)):O>T&&j>O?(o=T,T=j,j=o):T+=h,S.s=j,S.e=T,S.r=k,S},numberSort:function(t,r){return t-r}};t.exports=m}()},function(t,r,n){"use strict";!function(){var r=n(2),i=function(t){this.curves=[],this._3d=!1,t&&(this.curves=t,this._3d=this.curves[0]._3d)};i.prototype={valueOf:function(){return this.toString()},toString:function(){return"["+this.curves.map(function(t){return r.pointsToString(t.points)}).join(", ")+"]"},addCurve:function(t){this.curves.push(t),this._3d=this._3d||t._3d},length:function(){return this.curves.map(function(t){return t.length()}).reduce(function(t,r){return t+r})},curve:function(t){return this.curves[t]},bbox:function e(){for(var t=this.curves,e=t[0].bbox(),n=1;n<t.length;n++)r.expandbox(e,t[n].bbox());return e},offset:function o(t){var o=[];return this.curves.forEach(function(r){o=o.concat(r.offset(t))}),new i(o)}},t.exports=i}()},function(t,r,n){"use strict";function i(t,r,n){if("Z"!==r){if("M"===r)return void(s={x:n[0],y:n[1]});var i=[!1,s.x,s.y].concat(n),e=t.bind.apply(t,i),o=new e,u=n.slice(-2);return s={x:u[0],y:u[1]},o}}function e(t,r){for(var n,e,s,u=o(r).split(" "),a=new RegExp("[MLCQZ]",""),f=[],c={C:6,Q:4,L:2,M:2};u.length;)n=u.splice(0,1)[0],a.test(n)&&(s=u.splice(0,c[n]).map(parseFloat),e=i(t,n,s),e&&f.push(e));return new t.PolyBezier(f)}var o=n(5),s={x:!1,y:!1};t.exports=e},function(t,r){"use strict";function n(t){t=t.replace(/,/g," ").replace(/-/g," - ").replace(/-\s+/g,"-").replace(/([a-zA-Z])/g," $1 ");var r,n,i,e,o,s,u=t.replace(/([a-zA-Z])\s?/g,"|$1").split("|"),a=u.length,f=[],c=0,h=0,x=0,l=0,p=0,y=0,v=0,m=0,d="";for(r=1;a>r;r++)if(n=u[r],i=n.substring(0,1),e=i.toLowerCase(),f=n.replace(i,"").trim().split(" "),f=f.filter(function(t){return""!==t}).map(parseFloat),o=f.length,"m"===e){if(d+="M ","m"===i?(x+=f[0],l+=f[1]):(x=f[0],l=f[1]),c=x,h=l,d+=x+" "+l+" ",o>2)for(s=0;o>s;s+=2)"m"===i?(x+=f[s],l+=f[s+1]):(x=f[s],l=f[s+1]),d+=["L",x,l,""].join(" ")}else if("l"===e)for(s=0;o>s;s+=2)"l"===i?(x+=f[s],l+=f[s+1]):(x=f[s],l=f[s+1]),d+=["L",x,l,""].join(" ");else if("h"===e)for(s=0;o>s;s++)"h"===i?x+=f[s]:x=f[s],d+=["L",x,l,""].join(" ");else if("v"===e)for(s=0;o>s;s++)"v"===i?l+=f[s]:l=f[s],d+=["L",x,l,""].join(" ");else if("q"===e)for(s=0;o>s;s+=4)"q"===i?(p=x+f[s],y=l+f[s+1],x+=f[s+2],l+=f[s+3]):(p=f[s],y=f[s+1],x=f[s+2],l=f[s+3]),d+=["Q",p,y,x,l,""].join(" ");else if("t"===e)for(s=0;o>s;s+=2)p=x+(x-p),y=l+(l-y),"t"===i?(x+=f[s],l+=f[s+1]):(x=f[s],l=f[s+1]),d+=["Q",p,y,x,l,""].join(" ");else if("c"===e)for(s=0;o>s;s+=6)"c"===i?(p=x+f[s],y=l+f[s+1],v=x+f[s+2],m=l+f[s+3],x+=f[s+4],l+=f[s+5]):(p=f[s],y=f[s+1],v=f[s+2],m=f[s+3],x=f[s+4],l=f[s+5]),d+=["C",p,y,v,m,x,l,""].join(" ");else if("s"===e)for(s=0;o>s;s+=4)p=x+(x-v),y=l+(l-m),"s"===i?(v=x+f[s],m=l+f[s+1],x+=f[s+2],l+=f[s+3]):(v=f[s],m=f[s+1],x=f[s+2],l=f[s+3]),d+=["C",p,y,v,m,x,l,""].join(" ");else"z"===e&&(d+="Z ",x=c,l=h);return d.trim()}t.exports=n}]);