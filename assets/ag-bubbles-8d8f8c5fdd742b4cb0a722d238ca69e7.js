!function(){"use strict";function t(t,e,a){D.append("circle").attr("class",t).attr("cx",e).attr("cy",u/2).attr("r",d),D.append("text").attr("x",e).attr("dx",8).attr("y",p/2+u/2-1).text(a)}function e(t){return t.split(":").map(Number).reduce(function(t,e){return 60*t+e})}function a(t){var e=60*t,a=Math.floor(e/3600),t=Math.floor(e/60-60*a),r=e%60;return a?a+"."+n(t)+"."+n(r):t+"."+n(r)}function n(t){return t=Math.round(t),10>t?"0"+t:""+t}function r(t){if(!R[t]){var e=Math.round(((new Date).getTime()-x)/1e3);R[t]=!0,window.ga&&ga("send","event",t,e)}}function l(t){var a=e(t.time);return{name:t.name||[t.first,t.last].join(" "),place:+t.place,city:[t.city,t.state].join(", "),bib:+t.bib,age:+t.age,gender:t.gender,groupplace:t.groupplace,time:t.time,minutes:a/60,pace:t.pace,group:t.group,xoverall:+t.xoverall,yoverall:+t.yoverall,xag:+t.xag,yag:+t.yag}}var i,o=window.RACEVIZ||{},c={top:20,right:95,bottom:10,left:125},s=970-c.left-c.right,u=20,p=10,d=o.circleRadius||2,g=(o.padding||1,o.xThreshold||5,o.groupSpacing||70),y=o.overallYPosition||150,f=o.overallHeight||2*y,v=f+c.top+c.bottom,h="number"==typeof o.animationDuration?o.animationDuration:750,x=(new Date).getTime(),m="Overall",A=d3.scale.linear().range([0,s]),w=d3.select(".tip"),b=d3.scale.ordinal(),k=d3.scale.ordinal().domain([m]).range([y]),M=d3.svg.axis().scale(A).orient("top").tickFormat(a),F=d3.svg.axis().scale(b).orient("left").tickSize(-s,0).tickPadding(30),T=d3.select("#chart").append("svg").attr("height",v).attr("width",s+c.left+c.right).append("g").attr("transform","translate("+c.left+","+c.top+")"),D=d3.select("#legend").append("svg").attr("height",2*u).attr("width",s/2+c.left).append("g").attr("transform","translate("+c.left+",0)");D.append("text").attr("x",5).attr("y",2*p+u/2-1).text("Hover over a runner to view details"),t("F",0,"Female Finisher"),t("M",100,"Male Finisher"),d3.csv(o.datafile||"data.json",l,function(t){function e(t){t.attr("cx",function(t){return t[x].x}).attr("cy",function(t){return t[x].y})}function a(t){if(t){var e=t.split(",").map(function(t){return t.trim()}).filter(function(t){return t.length>0}).map(function(t){return"\\b"+d3.requote(t)}).join("|"),a=new RegExp("("+e+")","i");T.classed("searching",!0),P.classed("match",function(t){return a.test(t.name)||a.test(t.city)});var n=d3.selectAll(".match");1===n[0].length?p(n.datum()):y(),I.style("display",null)}else y(),T.classed("searching",!1),P.classed("match",!1),I.style("display","none")}function n(){return y(),"overall"===x?u():o(),r("transition"),!1}function l(t){function e(){}e.prototype=t;var a=new e,n=function(){return a};a.delay=n,a.transition=n,a.duration=n;var r=a.select,i=a.selectAll;return a.select=function(e){return l(r.call(t,e))},a.selectAll=function(e){return l(i.call(t,e))},a}function o(){w.style("display","none"),x="overall",d3.selectAll("button[data-view]").classed("active",function(t){return t===x});var t=10>h?N:d3.transition().duration(h);t.select("#chart svg").delay(72*h/75).attr("height",v),t.selectAll("#chart circle").delay(function(t){return h*t.overall.x/s}).attr("cx",function(t){return t.overall.x}).attr("cy",function(t){return t.overall.y}),t.select(".y.axis.overall").delay(h/3).style("stroke-opacity",1).style("fill-opacity",1),t.select(".y.axis.agegroup").style("stroke-opacity",0).style("fill-opacity",0)}function u(){w.style("display","none"),x="ag",d3.selectAll("button[data-view]").classed("active",function(t){return t===x});var t=10>h?N:d3.transition().duration(h);t.select("#chart svg").attr("height",i+c.top+c.bottom).transition().delay(72*h/75),t.selectAll("#chart circle").delay(function(t){return h*t.ag.x/s}).attr("cx",function(t){return t.ag.x}).attr("cy",function(t){return t.ag.y}),t.select(".y.axis.overall").style("stroke-opacity",0).style("fill-opacity",0),t.select(".y.axis.agegroup").delay(h/3).style("stroke-opacity",1).style("fill-opacity",1)}function p(e){if(!e.mouseover){y(),e.mouseover=!0,P.filter(function(t){return t===e}).classed("active",!0).attr("r",d).each(function(){this.parentNode.appendChild(this)});var a,n;"overall"===x?(a=e.xoverall,n=e.overall.y):(a=e.xag,n=e.ag.y),w.style("display",null).style("top",n+c.top-+w.style("height").replace("px","")-5+"px").style("left",a+c.left-+w.style("width").replace("px","")-5+"px"),w.selectAll(".name").text(e.name),w.selectAll(".age").text(e.age),w.selectAll(".gender").text(e.gender),w.selectAll(".city").text(e.city),w.selectAll(".time").text(e.time),w.selectAll(".place").text(e.place),w.selectAll(".pace").text(e.pace.split("/")[0]+"/mi"),w.selectAll(".total").text(t.length),"***"===e.groupplace?w.selectAll(".agplace").text("Top "+("M"===e.gender?"male":"female")+" finisher"):w.selectAll(".agplace").text(e.groupplace+"/"+R[e.gender+e.group]+" in "+e.gender+e.group),r("mouseover")}}function y(){w.style("display","none"),P.filter(".active").classed("active",!1).attr("r",d).each(function(t){t.mouseover=!1})}function f(){var t=window.location.hash,e=decodeURI(t.substr(1).replace(/(\+)/g," "));t.indexOf("agegroup")>-1?(e=e.replace(/(agegroup[\s\\,]*|[\s\\,]*agegroup)/,""),u(),setTimeout(a,750,e)):(o(),a(e)),C.property("value",e)}var x="overall",m=d3.nest().key(function(t){return t.group}).sortKeys(function(t,e){return d3.ascending(t.slice(0,2),e.slice(0,2))}).entries(t),D=m.map(function(t){return t.key}),R={};d3.nest().key(function(t){return t.gender+t.group}).entries(t).forEach(function(t){R[t.key]=t.values.length}),i=g*D.length,A.domain(d3.extent(t,function(t){return t.minutes})),M.tickValues(A.domain().concat(A.ticks().slice(1,A.ticks().length-1))),b.domain(D).rangePoints([10,i],1);var j=T.append("g").attr("class","x axis").call(M),E=j.append("text").attr("y",-5).style("text-anchor","end");E.append("tspan").attr("x",-25).style("font-weight","bold").text("Net Finish Time"),T.append("g").attr("class","y axis agegroup").call(F.scale(b)).style("stroke-opacity",0).style("fill-opacity",0),T.append("g").attr("class","y axis overall").call(F.scale(k)),t.forEach(function(t){t.overall={x0:A(t.minutes),y0:k(t.group),x:t.xoverall||A(t.minutes),y:t.yoverall+k(t.group)||k(t.group),r:d},t.ag={x0:A(t.minutes),y0:b(t.group),x:t.xag||A(t.minutes),y:t.yag+b(t.group)||b(t.group),r:d}});var P=T.append("g").attr("class","results").selectAll("circle").data(t).enter().append("circle").attr("r",d3.functor(d)).attr("cx",function(t){return t.overall.x}).attr("cy",function(t){return t.overall.y}).attr("class",function(t){return t.gender}).on("mouseleave",y).on("mouseout",y).on("mouseover",p);w.on("mouseover",y),P.call(e);var C=d3.select(".search input").on("keyup",function(){27===d3.event.keyCode&&(this.value="",this.blur()),a(this.value.trim()),r("search")});d3.selectAll(".search .caption a").datum(function(){return decodeURI(this.getAttribute("href").substr(1)).replace(/\+/g," ")}).on("click",function(t){C.property("value",t),a(t),d3.event.stopPropagation(),d3.event.preventDefault()});var I=d3.select(".search .search-clear").on("click",function(){C.property("value","").node().blur(),a()});d3.selectAll("button[data-view]").datum(function(){return this.getAttribute("data-view")}).on("click",n);var N=l(d3);f(),window.onhashchange=f});var R={}}();