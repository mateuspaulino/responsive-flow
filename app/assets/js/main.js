// import {  } from './modules/.js';

// let $ = document.querySelector.bind(document);

;(function(){
    
    //control variables
    var firstLoad = true;
    var showShareMessage = true;

    //elements
    var urlField = $('.url-field');
    var btnCheck = $('.btn-check');
    var btnAdd = $('.btn-add');

    //element attributes
    var windowWidth = $(window).width();


    $(function() {

        //INITIALIZE APPLICACTION
        responsiveFlow.init();

    });

    var responsiveFlow = {
        init: function(){

            //check if have something on url
            responsiveFlow.parseUrl();

            //initialize resize function
            responsiveFlow.resizeFunction();

            //call button "check it out"
            responsiveFlow.buttonCheck();

            //call button "add new resolution"
            responsiveFlow.buttonAdd();

            //call button "go to top"
            responsiveFlow.buttonGoToTop();
            
        },
        buttonCheck: function(){
            btnCheck.click(function(){
                var url = urlField.val();

                //verify http
                if(url.indexOf('http://')!=-1 || url.indexOf('https://')!=-1){
                    //verify if its valid
                    if(responsiveFlow.validateUrl(url)){
                        //generate iframes
                        responsiveFlow.generateIframes(url);

                        //Toggle animate
                        $('.app-header h1 img').addClass('image-animated');
                        setTimeout(function(){
                            $('.app-header h1 img').removeClass('image-animated');
                        },1000);
                
                    }else{
                        alert("Please enter a valid url");
                    }
                }else{
                    alert("Please add http/https on your url");
                }
            })
        },
        buttonAdd: function(){
            btnAdd.click(function(){
                var x = $('.new-resolution-1').val();
                var y = $('.new-resolution-2').val();
                var result = responsiveFlow.validateNewResolution(x,y);
                if(result){
                    responsiveFlow.addCheckBox(x,y);
                    $('.new-resolution-1, .new-resolution-2').val("");
                }
            })
        },
        parseUrl: function(){
            //http://localhost:9000/#url=http%3A%2F%2Fpudim.com.br&res=1300x768&res=1024x768&res=640x768&res=320x480
            var search  = window.location.hash.substring(1); //url=minhaurl&res=1230x1230&res=12x12&res=30x30
            if(search!=""){
                search = search.split('&');
                var size = search.length;
                var values = {};
                values.res = [];
                for(var x=0;x<size;x++){
                    var inf = search[x].split('=');
                    if(inf[0]=="res"){
                        //insert in res
                        values.res.push(inf[1]);
                    }else{
                        //create na new index and attribute the valeu
                        values[inf[0]] = inf[1];
                    }
                }
                var sizeRes = values.res.length;
                //verify if have data to generate iframes
                if((values.res.length)>=1 && (values.url)!=""){
                    //generate resulutions by url
                    $('.checkbox-list').html("");
                    for(var y=0;y<sizeRes;y++){
                        var value = (values.res[y]).split("x");
                        var w = value[0];
                        var h = value[1];
                        responsiveFlow.addCheckBox(w,h);
                    }
                    var url = decodeURIComponent(values.url);
                    urlField.val(url);

                    if(responsiveFlow.validateUrl(url)){
                        //generate iframes
                        responsiveFlow.generateIframes(url);

                        //Toggle animate
                        $('.app-header h1 img').addClass('image-animated');
                        setTimeout(function(){
                            $('.app-header h1 img').removeClass('image-animated');
                        },1000);
                    }

                }
                // console.log(JSON.stringify(values));
            }
        },
        validateNewResolution: function(x,y){          
            if(x=="" || y==""){
                alert("Please fill all fields. Mare sure insert only numbers");
                return false;
            }else if(x<0 || y<0){
                alert("Please put positive values");
                return false;
            }else if(x<280){
                alert("The minimum width is 280px");
                return false;
            }else if(y<100){
                alert("The minimum height is 180px");
                return false;
            }else if(x>=windowWidth){
                var answer = confirm("Do you really want to add a resolution highter than your screen? This can prejudicate the visualization!");
                return answer;
            }else{
                return true;
            }
        },
        validateUrl: function(url){
            return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
        },
        addCheckBox: function(x,y){
            var elem = "<label class='checkbox-inline'><input id='inlineCheckbox1' value='"+x+"x"+y+"' checked='true' type='checkbox'>"+x+" x "+y+"</label>";
            $('.checkbox-list').append(elem);
        },
        getResolutions: function(){
            var resolutionsObj = new Array();
            
            $('.checkbox-list label').each(function(i,d){
                //:checked
                if($(this).find('input[type=checkbox]').is(':checked')){
                    var item = new Object();
                    var val = $(this).find('input').val();
                    val = val.split('x');

                    item.value = $(this).text();
                    item.x = val[0];
                    item.y = val[1];
                    item.posinitial = i;
                    
                    resolutionsObj.push(item);
                }
            });
            return resolutionsObj;
        },
        generateIframes: function(url){
            var obj = responsiveFlow.getResolutions();
            var strUrl = "";
            strUrl += "url="+encodeURIComponent(url);
            $('.all-resolutions').fadeOut("slow", function(e){
                //clean
                $(this).html("");
                //generate
                var size = obj.length;
                for(var x=0;x<size;x++){
                    var tmp = responsiveFlow.templateIframe();
                    var sizex = Number(obj[x].x)+2;
                    tmp = tmp.replace("#valx",sizex);
                    tmp = tmp.replace("#valx",obj[x].x);
                    tmp = tmp.replace("#valy",obj[x].y);
                    tmp = tmp.replace("#valurl",url);
                    tmp = tmp.replace("#text",obj[x].value);
                    tmp = tmp.replace("#text",obj[x].value);
                    tmp = tmp.replace("#id-panel","panel-iframe-"+x);
                    $('.all-resolutions').append(tmp);
                    //increments url
                    strUrl += "&res="+obj[x].x+"x"+obj[x].y;
                }              

                //Check if is the first access and if the user came from a shared link
                if((document.location.hash)!="" && firstLoad==true){
                    showShareMessage = false;
                    firstLoad = false;
                }else{
                    showShareMessage = true;
                }

                if(showShareMessage){
                    alert("Send the url to someone to share your results :)");
                }

                //update url
                document.location.hash = strUrl;

            }).fadeIn();
        },
        templateIframe: function(){
            return "<div style='max-width: #valxpx' class='panel panel-default resolution' id='#id-panel'><div class='panel-heading text-right'><h3 class='panel-title'>#text</h3></div><div class='panel-body'><iframe src='#valurl' width='#valxpx' height='#valypx' frameborder='0'><p>Your browser does not support iframes.</p></iframe></div><div class='panel-footer'><h3 class='panel-title'>#text</h3></div></div";
        },
        resizeFunction: function(){
            var timeout;
            $(window).resize(function() {
                clearTimeout(timeout);
                timeout = setTimeout(function(){
                    windowWidth = $(window).width();
                }, 300);
            });    
        },
        buttonGoToTop: function(){
            $(window).scroll(function () {
                if ($(this).scrollTop() > 50) {
                    $('#back-to-top').fadeIn();
                } else {
                    $('#back-to-top').fadeOut();
                }
            });
            $('#back-to-top').click(function () {
                $('#back-to-top').tooltip('hide');
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
            $('#back-to-top').tooltip('show');
        }
    }

}());
    

