$(document).ready(function(){

    var $edith = $('#edith');

    //fingerprint hold
    var $touch = $('#fingerPrint .touch');
    var timer=0;

    function Success () {
        $touch.removeClass('active');
        $('#intro').stop().fadeOut(800, "easeInOutCubic");
        $('#main, #edith').addClass('active').stop().delay(500).animate({opacity: 1}, 2800, "easeInOutCubic");
        $('#act1').addClass('active').delay(500).animate({opacity: 1}, 2000, "easeInOutCubic", function(){
            edithSay();
        });
    } 

    function holdStart(){
        $touch.addClass('active');
        timer = setTimeout(Success, 1000);
    }

    function hlodEnd(){
        $touch.removeClass('active');
        clearTimeout(timer);
    }

    $('#fingerPrint').on('mousedown touchstart', holdStart);
    $('#fingerPrint').on('mouseup touchend', hlodEnd);



    //skip btn 
    $('#main .skip_btn').on('click', function(){
        clearInterval(timer1);
        clearInterval(timer2);
        clearTimeout(timer3);
        $edith.css({opacity: 1});
        act2On();
        $(this).animate({opacity: 0}, 200, function(){
            $(this).remove();
        });
    });



    //edith
    for(var i=0; i<=50; i++){
        $('.o-wrapper1 .o').eq(i).css({transform: 'rotateY(' + i + 'deg)', transform: 'rotateX(' + i + 'deg)'});
        $('.o-wrapper1 .o').eq(i).css('borderColor', 'rgba(150,' + i*6 +  ',194, 0.3)');
    }

    for(var i=0; i<=60; i++){
        $('.o-wrapper2 .o').eq(i).css({transform: 'rotateY(' + i + 'deg)', transform: 'rotateX(' + i + 'deg)'});
        $('.o-wrapper2 .o').eq(i).css('borderColor', 'rgba(255,' + 50+i*3 +  ',194, 0.1)');
    }

    for(var i=0; i<=80; i++){
        $('.o-wrapper3 .o').eq(i).css({transform: 'rotateY(' + i + 'deg)', transform: 'rotateX(' + i + 'deg)'});
        $('.o-wrapper3 .o').eq(i).css('borderColor', 'rgba(150,' + i*2 +  ',194, 0.4)');
    }


    //act1
    var sayArr = ['Hello', 'i’m data secretary, Edith.', 'This is Sohi’s Portfoilo', 'about WEB PUBLISHING'];
    var sayThat = new Array();

    for (var i=0; i<sayArr.length; i++){
        sayThat[i] = sayArr[i].split(' ');
    }

    var ed = 0;
    var timer1;
    var timer2;
    var timer3;

    function edithSay(){
        var n = 0;
        var delayTime = 1000*(sayThat[0].length);

        $('#main #act1 .txt1').empty();
        $('#main #act1 .txt2').empty();

        timer1 = setInterval(function(){
            if(n == sayThat[ed].length-1) {
                ed++;
                clearInterval(timer1);
            }
            $('#main #act1 .txt1').append('<span>' + sayThat[0][n] + ' </span>');
            $('.txt1 span').stop().animate({opacity: 1}, 800);
            n++;
        }, 1000);

        timer3 = setTimeout(function(){
            n=0;
            timer2 = setInterval(function(){
                if(n == sayThat[ed].length-1) {
                    ed++;
                    $('#act1').stop().delay(2000).animate({opacity: 0}, 1000, function(){
                        $('#main .skip_btn').animate({opacity: 0}, 200, function(){
                            $(this).remove();
                        })
                        act2On();
                    });
                    clearInterval(timer2);
                }
                $('#main #act1 .txt2').append('<span>' + sayThat[1][n] + ' </span>');
                $('.txt2 span').stop().animate({opacity: 1, paddingRight: 10}, 800);
                n++;
            }, 1000);
        }, delayTime);
    }

    //act2
    function act2On(){
        $('#act1').removeClass('active');
        $edith.addClass('onAct2').stop().animate({left: '24%', opacity: 1}, 2500, "easeInOutExpo", function(){
            $('#act2').addClass('active').animate({opacity: 1}, function(){
                seeWhat();
            });
        });
    }

    function seeWhat() {
        $('#act2 .txt5').css('display', 'block').animate({opacity: 1}, 900);
        setTimeout(function(){
            $('#act2 button').each(function(idx){
                $(this).css('display', 'block').stop().delay(800*idx).animate({right: 80}, 700).animate({opacity: 1}, 700);
            });
        }, 500);
    }

    //act2 button
    $('#act2 button').on({
        "mouseenter focus": function(){
            $(this).addClass('on');
        },

        "mouseleave blur": function(){
            $(this).removeClass('on');
        }
    });

    //act2 btn click
    $('#act2 button').on('click', function(){
        $('#main').animate({opacity: 0}, 800, function(){
            $(this).removeClass('active');
        });
        $('#act2').animate({opacity: 0}, 800, function(){
            $(this).removeClass('active');
        });
        $edith.removeClass('onAct2');


        var btnIdx = $(this).index('button');

        switch(btnIdx) {
            case 0:
                onAbout();
                break;
            case 1:
                onProject();
                break;
            case 2:
                onContact();
                break;
        }
    });

    function onAbout(){
        if(!$edith.hasClass("active")) $edith.addClass('active').stop().animate({opacity: 1}, 2800, "easeInOutCubic");

        $edith.addClass('onInfo').stop().animate({left: '76%', opacity: 1}, 1800, "easeInOutBack", function(){
            $('#about').addClass("active").stop().animate({opacity: 1}, 800).find('#info').addClass("active").stop().animate({opacity: 1}, 500).siblings().removeClass("active");
        });
    }

    function onProject(){
        $edith.stop().animate({opacity: 0}, 200, function(){
            $(this).removeClass('active');
        });

        $('#project').addClass("active").stop().delay(800).animate({opacity: 1}, 800);
    }

    function onContact(){
        if(!$edith.hasClass("active")) $edith.addClass('active').stop().delay(500).animate({opacity: 1}, 2800, "easeInOutCubic");

        $('#contact').addClass("active").stop().delay(800).animate({opacity: 1}, 800);
    }


    //about pagination
    var $pagi = $("#pagination ul li");
    var pagiIdx = 0;

    $pagi.eq(0).addClass('on');

    var $toolTip = $('#pagination .tooltip');
    var indiWid = $("#pagination ul li a").width();
    //var indiL = $("#pagination ul li.on a").position().left;
    var indiL = 1008;
    var toolTip = indiL + indiWid/2;
    var indiR = $('#pagination.area').width() - indiL - indiWid;
    var nowIndiL;
    var nowIndiR;

    
    $toolTip.css({left: toolTip});
    $('#pagination .indicator').css({left: indiL, right: indiR});

    $pagi.children().on('click', function(e){
        e.preventDefault();
        if($('#about article').is(':animated')) return false;

        nowIndiL = $(this).position().left;
        nowIndiR = $('#pagination.area').width() - nowIndiL - indiWid;
        pagiIdx = $(this).parent().index() + 1;

        if(pagiIdx-1 > $("#pagination ul li.on").index()){
            $('#pagination .indicator').stop().animate({right: nowIndiR}, 200, "easeInOutCirc", function(){
                $(this).stop().animate({left: nowIndiL}, 300, "easeInOutCirc");
            });
        }
        else if (pagiIdx-1 < $("#pagination ul li.on").index()){
            $('#pagination .indicator').stop().animate({left: nowIndiL}, 200, "easeInOutCirc", function(){
                $(this).stop().animate({right: nowIndiR}, 300, "easeInOutCirc");
            });
        }

        slideAbout();

    });

    
    //about mousewheel
    var timerWheel = 0;
    var total = $('#about article').length;

    $('#about').on('mousewheel DOMMouseScroll', function(e){
        if($('#about article').is(':animated')) return false;
        clearTimeout(timerWheel);

        timerWheel = setTimeout(function(){
            //if($('#about article').is(':animated')) return false;

            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;

            if(delta < 0 && pagiIdx < total){
                $('#pagination .indicator').stop().animate({right: nowIndiR - 120 - indiWid}, 200, "easeInOutCirc", function(){
                    $(this).stop().animate({left: nowIndiL + 120 + indiWid}, 300, "easeInOutCirc");
                    nowIndiL = $(this).position().left;
                    nowIndiR = $('#pagination.area').width() - nowIndiL - indiWid;
                });
                pagiIdx++;
            }
            else if(delta > 0 && pagiIdx > 1){
                $('#pagination .indicator').stop().animate({left: nowIndiL - 120 - indiWid}, 200, "easeInOutCirc", function(){
                    $(this).stop().animate({right: nowIndiR + 120 + indiWid}, 300, "easeInOutCirc");
                    nowIndiL = $(this).position().left;
                    nowIndiR = $('#pagination.area').width() - nowIndiL - indiWid;
                });
                pagiIdx--;
            }

            console.log(nowIndiL, pagiIdx);

            slideAbout();

        }, 200);

    });

    //about keydown
    $(document).on('keydown', function(e){
        if($('#about article').is(':animated')) return false;
    
        var key = e.keyCode;
        
        if((key == 39 || key == 40) && pagiIdx-1 < total){
            $('#pagination .indicator').stop().animate({right: nowIndiR - 120 - indiWid}, 200, "easeInOutCirc", function(){
                $(this).stop().animate({left: nowIndiL + 120 + indiWid}, 300, "easeInOutCirc");
                nowIndiL = $(this).position().left;
                nowIndiR = $('#pagination.area').width() - nowIndiL - indiWid;
            });
            pagiIdx++;
        }
        else if((key == 37 || key == 38) && pagiIdx-1 > 1){
            $('#pagination .indicator').stop().animate({left: nowIndiL - 120 - indiWid}, 200, "easeInOutCirc", function(){
                $(this).stop().animate({right: nowIndiR + 120 + indiWid}, 300, "easeInOutCirc");
                nowIndiL = $(this).position().left;
                nowIndiR = $('#pagination.area').width() - nowIndiL - indiWid;
            });
            pagiIdx--;
        }
        slideAbout();

    });

    function slideAbout(){
        switch(pagiIdx) {
            case 1:
                $edith.removeClass().addClass('active').css('left', '76%').stop().delay(1000).animate({opacity:1}, 2800, "easeInOutCubic").addClass('onInfo');
                break;
            case 2:
                $edith.stop().delay(1000).animate({opacity: 0}, 500, function(){
                    $(this).removeClass('active');
                });
                break;
            case 3:
                $edith.removeClass().addClass('active').css('left', 0).stop().delay(1000).animate({opacity:1}, 1000).addClass('onPerson');
                break;
            case 4:
                $edith.stop().delay(1000).animate({opacity: 0}, 500, function(){
                    $(this).removeClass('active');
                });
                break;
        }

        $('#about article:nth-of-type('+ pagiIdx +')').addClass('active').stop().delay(1200).animate({opacity: 1}, 1200).siblings('article').stop().delay(200).animate({opacity: 0}, 600, function(){
            $(this).removeClass('active');
        });

        $pagi.eq(pagiIdx-1).addClass('on').siblings().removeClass('on');
      
    }


    //tooltip hover
    $pagi.children().on({
        'mouseenter focus': function(){
            var nowTtip = $(this).position().left + indiWid/2;
            $toolTip.stop().animate({left: nowTtip, opacity: 1}, 800, "easeOutQuart");

            var tTipNum = $(this).parent().index();
            var tTipTxt = $('#about article:nth-of-type('+ (tTipNum+1) +')').find('h2').text();
            $toolTip.children().text(tTipTxt);
        },
        'mouseleave blur': function(){
            $toolTip.stop().animate({opacity: 0}, 600);
        }
    });


    //skill
    var $poly = $('#skill .polygon_wrap .poly');

    $('#skill .skilltype > li').on({
        'mouseenter focusin': function(){
            if($('#skill .skilltype > li').hasClass('on')) return false;
            $(this).addClass('over');
        },
        'mouseleave focusout': function(){
            $(this).removeClass('over');
        }
    });


    //skill 클릭 이벤트
    $('#skill .skilltype > li').on('click', function(){
        if($('#skill .skilltype > li').hasClass('on')) return false;

        var skillIdx = $(this).index();

        $('#skill .polygon_wrap, #skill .btn_wrap').addClass('on');
        $poly.css({display: 'block'});

        $(this).removeClass('over').addClass('on').parent().stop().animate({opacity: 0}, 500, function(){
            $(this).addClass('active').children('li:not(.on)').css('display', 'none').parent().stop().delay(2000).animate({opacity: 1}, 1500, "easeOutCirc");
            $(this).find('.skill_view').text('CLOSE');
        });


        $poly.eq(skillIdx).addClass('on');

        switch(skillIdx){
            case 0:
                $poly.eq(1).addClass('next_pol').next().addClass('prev_pol');
                break;
            case 1:
                $poly.eq(0).addClass('prev_pol');
                $poly.eq(2).addClass('next_pol');
                break;
            case 2:
                $poly.eq(0).addClass('next_pol').next().addClass('prev_pol');
                break;
        }

        //close 버튼 클릭 닫기
        $('#skill .skilltype > li.on button').on('click', function(){

            $('#skill .polygon_wrap, #skill .btn_wrap').removeClass('on');
            $poly.css({display: 'none'});
            $poly.removeClass('on');
            $poly.removeClass('prev_pol');
            $poly.removeClass('next_pol');
            
            $(this).closest('.skilltype').stop().animate({opacity: 0}, 500, function(){
                $(this).children().removeClass('on').find('.txt_wrap p, .txt_wrap .icons').css({display: 'none'});
                $(this).removeClass('active').children().siblings().css('display', 'block');
                $(this).find('.skill_view').text('VIEW');
                $(this).stop().animate({opacity: 1}, 500, "easeOutCirc", function(){
                     $(this).find('.txt_wrap p, .txt_wrap .icons').css({display: 'block'});
                });
            });
        
        });

    });




    //skill next, prev 버튼


    //person



    //elsewhere bubble effect
    var bArray = [];
    var sArray = [9,12,15,18];

    for (var i = 0; i < $('.bubbles').width(); i++) {
        bArray.push(i);
    }

    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    setInterval(function(){

        var size = randomValue(sArray);

        $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');

        $('.individual-bubble').animate({bottom: '100%', opacity: '-=0.7'}, 3400, function(){
            $(this).remove();
        });
        
    }, 800);


    //project===============================================

    var artiZ = [];
    var artiT = [0, -120, -170, -210, -240, -260, -260 ,-260];
    var artiNum = 0;

    $('#project article').each(function(idx){
        artiZ[idx] = -600*idx;
        //artiT[idx] = -50*idx;

        //$(this).css({transform: 'translate3d(-50%, 0, ' + artiZ[idx] + 'px) scale(' + artiSize[idx] + ')'});
        $(this).css({top: artiT[idx], transform: 'translate3d(-50%, 0, ' + artiZ[idx] + 'px) scale(0.96)'});

    });

    var timerWheel2 = 0;

    $(document).on('mousewheel DOMMouseScroll', function(e){
        clearTimeout(timerWheel2);
        
        timerWheel2 = setTimeout(function(){
            //if($('#about article').is(':animated')) return false;
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
            //var pNum =  artiNum1;

            if(delta < 0 && artiNum < 7){
                artiZ.unshift(0);
                artiT.unshift(600);

                for(var i=0; i<$('#project article').length; i++){
                    TweenMax.to('#project article:eq(' + i + ')', 2, {z: artiZ[i], y: artiT[i]});
                }

                artiNum++;
            }

            else if(delta > 0 && artiNum > 0){
                artiZ.splice(0,1);
                artiT.splice(0,1);

                for(var i=0; i<$('#project article').length; i++){
                    TweenMax.to('#project article:eq(' + i + ')', 2, {z: artiZ[i], y: artiT[i]});
                }

                artiNum--;
            }
        }, 200);

        console.log(artiZ, artiT, artiNum);
    });

    // $('#project article').on('click', function(){
        
    //     TweenMax.to('#project article:eq(' + i + ')', 2, {z: artiZ[i], y: artiT[i]});

    // });




    //gnb
    $('#container #btnOpen').on('click', function(){
        $('#gnb').addClass('active').css('opacity', 1);

    });

    $('#gnb ul li a').on('click', function(e){
        e.preventDefault();

        $edith.removeClass();

        $('#gnb').removeClass('active');
        $('#edith, #main, #act1, #act2, #about, #contact, #project, #info, #elsewhere, #skill, #person').removeClass('active').css('opacity', 0);

        var gnbIdx = $(this).parent().index();

        switch(gnbIdx) {
            case 0:
                $('#main, #edith').addClass('active').stop().animate({opacity: 1}, 2800, "easeInOutCubic");
                act2On();
                break;
            case 1:
                pagiIdx = 0;
                indiL = 1008;
                $toolTip.css({left: toolTip});
                $('#pagination .indicator').css({left: indiL, right: indiR});
                $pagi.eq(0).addClass('on').siblings().removeClass('on');
                onAbout();
                break;
            case 2:
                onProject();
                break;
            case 3:
                onContact();
                break;
        }

    });



});