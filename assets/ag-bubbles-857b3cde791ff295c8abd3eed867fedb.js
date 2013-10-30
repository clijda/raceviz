!function(){"use strict";function t(t,e,a){M.append("circle").attr("class",t).attr("cx",e).attr("cy",s/2).attr("r",p),M.append("text").attr("x",e).attr("dx",8).attr("y",u/2+s/2-1).text(a)}function e(t){return t.split(":").map(Number).reduce(function(t,e){return 60*t+e})}function a(t){var e=60*t,a=Math.floor(e/3600),t=Math.floor(e/60-60*a),l=e%60;return a?a+":"+r(t)+":"+r(l):t+":"+r(l)}function r(t){return t=Math.round(t),10>t?"0"+t:""+t}function l(t){var a=e(t.time);return{name:t.name||[t.first,t.last].join(" "),place:+t.place,city:[t.city,t.state].join(", "),bib:+t.bib,age:+t.age,gender:t.gender,groupplace:t.groupplace,time:t.time,minutes:a/60,pace:t.pace,group:t.group,xoverall:+t.xoverall,yoverall:+t.yoverall,xag:+t.xag,yag:+t.yag}}var n,i=window.RACEVIZ||{},o={top:20,right:95,bottom:10,left:125},c=970-o.left-o.right,s=20,u=10,p=i.circleRadius||2,d=(i.padding||1,i.xThreshold||5,i.groupSpacing||70),g=i.overallYPosition||150,y=i.overallHeight||2*g,f=y+o.top+o.bottom,v=i.animationDuration||750,h="Overall",x=d3.scale.linear().rangeRound([0,c]),m=d3.select(".tip"),A=d3.scale.ordinal(),b=d3.scale.ordinal().domain([h]).range([g]),k=d3.svg.axis().scale(x).orient("top").tickFormat(a),w=d3.svg.axis().scale(A).orient("left").tickSize(-c,0).tickPadding(30),F=d3.select("#chart").append("svg").attr("height",f).attr("width",c+o.left+o.right).append("g").attr("transform","translate("+o.left+","+o.top+")"),M=d3.select("#legend").append("svg").attr("height",2*s).attr("width",c/2+o.left).append("g").attr("transform","translate("+o.left+",0)");M.append("text").attr("x",5).attr("y",2*u+s/2-1).text("Hover over a runner to view details"),t("F",0,"Female Finisher"),t("M",100,"Male Finisher"),d3.csv(i.datafile||"data.json",l,function(t){function e(t){t.attr("cx",function(t){return t[g].x}).attr("cy",function(t){return t[g].y})}function a(t){if(t){var e=t.split(",").map(function(t){return t.trim()}).filter(function(t){return t.length>0}).map(function(t){return"\\b"+d3.requote(t)}).join("|"),a=new RegExp("("+e+")","i");F.classed("searching",!0),E.classed("match",function(t){return a.test(t.name)||a.test(t.city)});var r=d3.selectAll(".match");1===r[0].length?c(r.datum()):s(),T.style("display",null)}else s(),F.classed("searching",!1),E.classed("match",!1),T.style("display","none")}function r(){return s(),"overall"===g?i():l(),!1}function l(){m.style("display","none"),g="overall",d3.selectAll("button[data-view]").classed("active",function(t){return t===g});var t=d3.transition().duration(v);t.select("#chart svg").delay(720).attr("height",f),t.selectAll("#chart circle").delay(function(t){return t.overall.x}).attr("cx",function(t){return t.overall.x}).attr("cy",function(t){return t.overall.y}),t.select(".y.axis.overall").delay(250).style("stroke-opacity",1).style("fill-opacity",1),t.select(".y.axis.agegroup").style("stroke-opacity",0).style("fill-opacity",0)}function i(){m.style("display","none"),g="ag",d3.selectAll("button[data-view]").classed("active",function(t){return t===g});var t=d3.transition().duration(750);t.select("#chart svg").attr("height",n+o.top+o.bottom).transition().delay(720),t.selectAll("#chart circle").delay(function(t){return t.ag.x}).attr("cx",function(t){return t.ag.x}).attr("cy",function(t){return t.ag.y}),t.select(".y.axis.overall").style("stroke-opacity",0).style("fill-opacity",0),t.select(".y.axis.agegroup").delay(250).style("stroke-opacity",1).style("fill-opacity",1)}function c(e){if(!e.mouseover){s(),e.mouseover=!0,E.filter(function(t){return t===e}).classed("active",!0).attr("r",p).each(function(){this.parentNode.appendChild(this)});var a,r;"overall"===g?(a=e.xoverall,r=e.overall.y):(a=e.xag,r=e.ag.y),m.style("display",null).style("top",r+o.top-+m.style("height").replace("px","")-5+"px").style("left",a+o.left-+m.style("width").replace("px","")-5+"px"),m.selectAll(".name").text(e.name),m.selectAll(".age").text(e.age),m.selectAll(".gender").text(e.gender),m.selectAll(".city").text(e.city),m.selectAll(".time").text(e.time),m.selectAll(".place").text(e.place),m.selectAll(".pace").text(e.pace.split("/")[0]+"/mi"),m.selectAll(".total").text(t.length),"***"===e.groupplace?m.selectAll(".agplace").text("Top "+("M"===e.gender?"male":"female")+" finisher"):m.selectAll(".agplace").text(e.groupplace+"/"+M[e.gender+e.group]+" in "+e.gender+e.group)}}function s(){m.style("display","none"),E.filter(".active").classed("active",!1).attr("r",p).each(function(t){t.mouseover=!1})}function u(){var t=window.location.hash,e=decodeURI(t.substr(1).replace(/(\+)/g," "));t.indexOf("agegroup")>-1?(e=e.replace(/(agegroup[\s\\,]*|[\s\\,]*agegroup)/,""),i(),setTimeout(a,750,e)):(l(),a(e)),P.property("value",e)}var g="overall",y=d3.nest().key(function(t){return t.group}).sortKeys(function(t,e){return d3.ascending(t.slice(0,2),e.slice(0,2))}).entries(t),h=y.map(function(t){return t.key}),M={};d3.nest().key(function(t){return t.gender+t.group}).entries(t).forEach(function(t){M[t.key]=t.values.length}),n=d*h.length,x.domain(d3.extent(t,function(t){return t.minutes})).nice(10),A.domain(h).rangePoints([10,n],1);var R=F.append("g").attr("class","x axis").call(k),j=R.append("text").attr("y",-5).style("text-anchor","end");j.append("tspan").attr("x",-25).style("font-weight","bold").text("Net Finish Time"),F.append("g").attr("class","y axis agegroup").call(w.scale(A)).style("stroke-opacity",0).style("fill-opacity",0),F.append("g").attr("class","y axis overall").call(w.scale(b)),t.forEach(function(t){t.overall={x0:x(t.minutes),y0:b(t.group),x:t.xoverall||x(t.minutes),y:t.yoverall+b(t.group)||b(t.group),r:p},t.ag={x0:x(t.minutes),y0:A(t.group),x:t.xag||x(t.minutes),y:t.yag+A(t.group)||A(t.group),r:p}});var E=F.append("g").attr("class","results").selectAll("circle").data(t).enter().append("circle").attr("r",d3.functor(p)).attr("cx",function(t){return t.overall.x}).attr("cy",function(t){return t.overall.y}).attr("class",function(t){return t.gender}).on("mouseleave",s).on("mouseout",s).on("mouseover",c);m.on("mouseover",s),E.call(e);var P=d3.select(".search input").on("keyup",function(){27===d3.event.keyCode&&(this.value="",this.blur()),a(this.value.trim())});d3.selectAll(".search .caption a").datum(function(){return decodeURI(this.getAttribute("href").substr(1)).replace(/\+/g," ")}).on("click",function(t){P.property("value",t),a(t),d3.event.stopPropagation(),d3.event.preventDefault()});var T=d3.select(".search .search-clear").on("click",function(){P.property("value","").node().blur(),a()});d3.selectAll("button[data-view]").datum(function(){return this.getAttribute("data-view")}).on("click",r),u(),window.onhashchange=u})}();