!function e(t,a,u){function n(r,o){if(!a[r]){if(!t[r]){var l="function"==typeof require&&require;if(!o&&l)return l(r,!0);if(i)return i(r,!0);var F=new Error("Cannot find module '"+r+"'");throw F.code="MODULE_NOT_FOUND",F}var d=a[r]={exports:{}};t[r][0].call(d.exports,function(e){var a=t[r][1][e];return n(a?a:e)},d,d.exports,e,t,a,u)}return a[r].exports}for(var i="function"==typeof require&&require,r=0;r<u.length;r++)n(u[r]);return n}({1:[function(e,t,a){"use strict";!function(){var e=!0,t=!0,a=$(".url-field"),u=$(".btn-check"),n=$(".btn-add"),i=$(window).width();$(function(){r.init()});var r={init:function(){r.parseUrl(),r.resizeFunction(),r.buttonCheck(),r.buttonAdd(),r.buttonGoToTop()},buttonCheck:function(){u.click(function(){var e=a.val();e.indexOf("http://")!=-1||e.indexOf("https://")!=-1?r.validateUrl(e)?(r.generateIframes(e),$(".app-header h1 img").addClass("image-animated"),setTimeout(function(){$(".app-header h1 img").removeClass("image-animated")},1e3)):alert("Please enter a valid url"):alert("Please add http/https on your url")})},buttonAdd:function(){n.click(function(){var e=$(".new-resolution-1").val(),t=$(".new-resolution-2").val(),a=r.validateNewResolution(e,t);a&&(r.addCheckBox(e,t),$(".new-resolution-1, .new-resolution-2").val(""))})},parseUrl:function(){var e=window.location.hash.substring(1);if(""!=e){e=e.split("&");var t=e.length,u={};u.res=[];for(var n=0;n<t;n++){var i=e[n].split("=");"res"==i[0]?u.res.push(i[1]):u[i[0]]=i[1]}var o=u.res.length;if(u.res.length>=1&&""!=u.url){$(".checkbox-list").html("");for(var l=0;l<o;l++){var F=u.res[l].split("x"),d=F[0],s=F[1];r.addCheckBox(d,s)}var c=decodeURIComponent(u.url);a.val(c),r.validateUrl(c)&&(r.generateIframes(c),$(".app-header h1 img").addClass("image-animated"),setTimeout(function(){$(".app-header h1 img").removeClass("image-animated")},1e3))}}},validateNewResolution:function(e,t){if(""==e||""==t)return alert("Please fill all fields. Mare sure insert only numbers"),!1;if(e<0||t<0)return alert("Please put positive values"),!1;if(e<280)return alert("The minimum width is 280px"),!1;if(t<100)return alert("The minimum height is 180px"),!1;if(e>=i){var a=confirm("Do you really want to add a resolution highter than your screen? This can prejudicate the visualization!");return a}return!0},validateUrl:function(e){return/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)},addCheckBox:function(e,t){var a="<label class='checkbox-inline'><input id='inlineCheckbox1' value='"+e+"x"+t+"' checked='true' type='checkbox'>"+e+" x "+t+"</label>";$(".checkbox-list").append(a)},getResolutions:function(){var e=new Array;return $(".checkbox-list label").each(function(t,a){if($(this).find("input[type=checkbox]").is(":checked")){var u=new Object,n=$(this).find("input").val();n=n.split("x"),u.value=$(this).text(),u.x=n[0],u.y=n[1],u.posinitial=t,e.push(u)}}),e},generateIframes:function(a){var u=r.getResolutions(),n="";n+="url="+encodeURIComponent(a),$(".all-resolutions").fadeOut("slow",function(i){$(this).html("");for(var o=u.length,l=0;l<o;l++){var F=r.templateIframe(),d=Number(u[l].x)+2;F=F.replace("#valx",d),F=F.replace("#valx",u[l].x),F=F.replace("#valy",u[l].y),F=F.replace("#valurl",a),F=F.replace("#text",u[l].value),F=F.replace("#text",u[l].value),F=F.replace("#id-panel","panel-iframe-"+l),$(".all-resolutions").append(F),n+="&res="+u[l].x+"x"+u[l].y}""!=document.location.hash&&1==e?(t=!1,e=!1):t=!0,t&&alert("Send the url to someone to share your results :)"),document.location.hash=n}).fadeIn()},templateIframe:function(){return"<div style='max-width: #valxpx' class='panel panel-default resolution' id='#id-panel'><div class='panel-heading text-right'><h3 class='panel-title'>#text</h3></div><div class='panel-body'><iframe src='#valurl' width='#valxpx' height='#valypx' frameborder='0'><p>Your browser does not support iframes.</p></iframe></div><div class='panel-footer'><h3 class='panel-title'>#text</h3></div></div"},resizeFunction:function(){var e;$(window).resize(function(){clearTimeout(e),e=setTimeout(function(){i=$(window).width()},300)})},buttonGoToTop:function(){$(window).scroll(function(){$(this).scrollTop()>50?$("#back-to-top").fadeIn():$("#back-to-top").fadeOut()}),$("#back-to-top").click(function(){return $("#back-to-top").tooltip("hide"),$("body,html").animate({scrollTop:0},800),!1}),$("#back-to-top").tooltip("show")}}}()},{}]},{},[1]);
//# sourceMappingURL=bundle.js.map