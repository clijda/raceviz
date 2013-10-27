!function(){"use strict";function t(t,e,a){w.append("circle").attr("class",t).attr("cx",e).attr("cy",u/2).attr("r",d),w.append("text").attr("x",e).attr("dx",8).attr("y",p/2+u/2-1).text(a)}function e(t){return t.split(":").map(Number).reduce(function(t,e){return 60*t+e})}function a(t){var e=60*t,a=Math.floor(e/3600),t=Math.floor(e/60-60*a),l=e%60;return a?a+":"+r(t)+":"+r(l):r(t)+":"+r(l)}function r(t){return t=Math.round(t),10>t?"0"+t:""+t}function l(t){var a=e(t.time);return{name:t.name||[t.first,t.last].join(" "),place:+t.place,city:[t.city,t.state].join(", "),bib:+t.bib,age:+t.age,gender:t.gender,groupplace:t.groupplace,time:t.time,minutes:a/60,pace:t.pace,group:t.group,xoverall:+t.xoverall,yoverall:+t.yoverall,xag:+t.xag,yag:+t.yag}}var n,i=window.RACEVIZ||{},c={top:20,right:95,bottom:10,left:125},o=970-c.left-c.right,s=300+c.top+c.bottom,u=20,p=10,d=i.circleRadius||2,g=(i.padding||1,i.groupSpacing||70),y=i.animationDuration||750,f="Overall",v=d3.scale.linear().rangeRound([0,o]),h=d3.select(".tip"),x=d3.scale.ordinal(),m=d3.scale.ordinal().domain([f]).range([150]),A=d3.svg.axis().scale(v).orient("top").tickFormat(a),b=d3.svg.axis().scale(x).orient("left").tickSize(-o,0).tickPadding(30),k=d3.select("#chart").append("svg").attr("height",s).attr("width",o+c.left+c.right).append("g").attr("transform","translate("+c.left+","+c.top+")"),w=d3.select("#legend").append("svg").attr("height",2*u).attr("width",o/2+c.left).append("g").attr("transform","translate("+c.left+",0)");w.append("text").attr("x",5).attr("y",2*p+u/2-1).text("Hover over a runner to view details"),t("F",0,"Female Finisher"),t("M",100,"Male Finisher"),d3.csv(i.datafile||"data.csv",l,function(t){function e(t){t.attr("cx",function(t){return t[f].x}).attr("cy",function(t){return t[f].y})}function a(t){if(t){var e=t.split(",").map(function(t){return t.trim()}).filter(function(t){return t.length>0}).map(function(t){return"\\b"+d3.requote(t)}).join("|"),a=new RegExp("("+e+")","i");k.classed("searching",!0),j.classed("match",function(t){return a.test(t.name)||a.test(t.city)});var r=d3.selectAll(".match");1===r[0].length?o(r.datum()):u(),I.style("display",null)}else u(),k.classed("searching",!1),j.classed("match",!1),I.style("display","none")}function r(){return u(),"overall"===f?i():l(),!1}function l(){h.style("display","none"),f="overall",d3.selectAll("button[data-view]").classed("active",function(t){return t===f});var t=d3.transition().duration(y);t.select("#chart svg").delay(720).attr("height",s),t.selectAll("#chart circle").delay(function(t){return t.overall.x}).attr("cx",function(t){return t.overall.x}).attr("cy",function(t){return t.overall.y}),t.select(".y.axis.overall").delay(250).style("stroke-opacity",1).style("fill-opacity",1),t.select(".y.axis.agegroup").style("stroke-opacity",0).style("fill-opacity",0)}function i(){h.style("display","none"),f="ag",d3.selectAll("button[data-view]").classed("active",function(t){return t===f});var t=d3.transition().duration(750);t.select("#chart svg").attr("height",n+c.top+c.bottom).transition().delay(720),t.selectAll("#chart circle").delay(function(t){return t.ag.x}).attr("cx",function(t){return t.ag.x}).attr("cy",function(t){return t.ag.y}),t.select(".y.axis.overall").style("stroke-opacity",0).style("fill-opacity",0),t.select(".y.axis.agegroup").delay(250).style("stroke-opacity",1).style("fill-opacity",1)}function o(e){if(!e.mouseover){u(),e.mouseover=!0,j.filter(function(t){return t===e}).classed("active",!0).attr("r",d).each(function(){this.parentNode.appendChild(this)});var a,r;"overall"===f?(a=e.xoverall,r=e.overall.y):(a=e.xag,r=e.ag.y),h.style("display",null).style("top",r+c.top-+h.style("height").replace("px","")-5+"px").style("left",a+c.left-+h.style("width").replace("px","")-5+"px"),h.selectAll(".name").text(e.name),h.selectAll(".age").text(e.age),h.selectAll(".gender").text(e.gender),h.selectAll(".city").text(e.city),h.selectAll(".time").text(e.time),h.selectAll(".place").text(e.place),h.selectAll(".pace").text(e.pace.split("/")[0]+"/mi"),h.selectAll(".total").text(t.length),"***"===e.groupplace?h.selectAll(".agplace").text("Top "+("M"===e.gender?"male":"female")+" finisher"):h.selectAll(".agplace").text(e.groupplace+"/"+M[e.gender+e.group]+" in "+e.gender+e.group)}}function u(){h.style("display","none"),j.filter(".active").classed("active",!1).attr("r",d).each(function(t){t.mouseover=!1})}function p(){var t=window.location.hash,e=decodeURI(t.substr(1).replace(/(\+)/g," "));t.indexOf("agegroup")>-1?(e=e.replace(/(agegroup[\s\\,]*|[\s\\,]*agegroup)/,""),i(),setTimeout(a,750,e)):(l(),a(e)),C.property("value",e)}var f="overall",w=d3.nest().key(function(t){return t.group}).sortKeys(function(t,e){return d3.ascending(t.slice(0,2),e.slice(0,2))}).entries(t),F=w.map(function(t){return t.key}),M={};d3.nest().key(function(t){return t.gender+t.group}).entries(t).forEach(function(t){M[t.key]=t.values.length}),n=g*F.length,v.domain(d3.extent(t,function(t){return t.minutes})).nice(10),x.domain(F).rangePoints([10,n],1);var R=k.append("g").attr("class","x axis").call(A),E=R.append("text").attr("y",-5).style("text-anchor","end");E.append("tspan").attr("x",-25).style("font-weight","bold").text("Net Finish Time"),k.append("g").attr("class","y axis agegroup").call(b.scale(x)).style("stroke-opacity",0).style("fill-opacity",0),k.append("g").attr("class","y axis overall").call(b.scale(m)),t.forEach(function(t){t.overall={x0:v(t.minutes),y0:m(t.group),x:t.xoverall||v(t.minutes),y:t.yoverall+m(t.group)||m(t.group),r:d},t.ag={x0:v(t.minutes),y0:x(t.group),x:t.xag||v(t.minutes),y:t.yag+x(t.group)||x(t.group),r:d}});var j=k.append("g").attr("class","results").selectAll("circle").data(t).enter().append("circle").attr("r",d3.functor(d)).attr("cx",function(t){return t.overall.x}).attr("cy",function(t){return t.overall.y}).attr("class",function(t){return t.gender}).on("mouseleave",u).on("mouseout",u).on("mouseover",o);h.on("mouseover",u),j.call(e);var C=d3.select(".search input").on("keyup",function(){27===d3.event.keyCode&&(this.value="",this.blur()),a(this.value.trim())});d3.selectAll(".search .caption a").datum(function(){return decodeURI(this.getAttribute("href").substr(1)).replace(/\+/g," ")}).on("click",function(t){C.property("value",t),a(t),d3.event.stopPropagation(),d3.event.preventDefault()});var I=d3.select(".search .search-clear").on("click",function(){C.property("value","").node().blur(),a()});d3.selectAll("button[data-view]").datum(function(){return this.getAttribute("data-view")}).on("click",r),p(),window.onhashchange=p})}();