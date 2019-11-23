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
        timer = setTimeout(Success, 800);
    }

    function hlodEnd(){
        $touch.removeClass('active');
        clearTimeout(timer);
    }

    $('#fingerPrint').on('mousedown touchstart', holdStart);
    $('#fingerPrint').on('mouseup touchend', hlodEnd);
    $('#fingerPrint').on('keydown', function(e){
            var introKey = e.keyCode;
            if(introKey == 13 || introKey == 32) holdStart();
        }
    );



    //skip btn 
    $('#main .skip_btn').on('click', function(){
        clearTimeout(timer1);
        clearTimeout(timer2);
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
    var sayArr = ['Hello', 'i’m data secretary, Edith.', 'This is Sohi’s Portfoilo', 'about Web publishing'];
    var ed = 0;
    var timer1;
    var timer2;
    var timer3;

    function edithSay(){
        var delayTime = 1500;

        $('#main #act1 .txt_area .txt1').append('<span>' + sayArr[ed] + ' </span>').children().stop().animate({opacity: 1, marginTop: 0}, 1000, function(){
            ed++;
        });

        timer1 = setTimeout(function(){
            $('#main #act1 .txt_area .txt2').append('<span>' + sayArr[ed] + ' </span>').children().stop().animate({opacity: 1, marginTop: 0}, 1000, function(){
                ed++;
                $('#main #act1 .txt_area p').stop().delay(1000).animate({opacity: 0}, 800, function(){
                    $(this).empty().css({opacity: 1});
                });
            });
        }, delayTime);

        timer2 = setTimeout(function(){
            $('#main #act1 .txt_area .txt1').append('<span>' + sayArr[ed] + ' </span>').children().stop().animate({opacity: 1, marginTop: 0}, 1000, function(){
                ed++;
            });
        }, 4800);

        timer3 = setTimeout(function(){
            $('#main #act1 .txt_area .txt2').append('<span>' + sayArr[ed] + ' </span>').children().stop().animate({opacity: 1, marginTop: 0}, 1000, function(){
                $('#act1').stop().delay(2000).animate({opacity: 0}, 1000, function(){
                    $('#main .skip_btn').animate({opacity: 0}, 200, function(){
                        $(this).remove();
                    })
                    act2On();
                });
            });
        }, 4800 + delayTime);
    }


    //act2
    function act2On(){
        $('#container #btnOpen').addClass('active').stop().animate({opacity: 1}, 800);
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
        if(!$edith.hasClass("active")) $edith.addClass('active');

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
        if(!$edith.hasClass("active")) $edith.addClass('active');

        $edith.addClass('onCont').stop().animate({left: '50%', opacity: 1}, 1800, "easeInOutBack");

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

        $('#skill .skilltype > li.on button').click();

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

        $('#skill .skilltype > li.on button').click();

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
    $('#about').on('keydown', function(e){
        if($('#about article').is(':animated')) return false;

        $('#skill .skilltype > li.on button').click();
    
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

        $('#skill .polygon_wrap, #skill .btn_wrap').addClass('on').stop().animate({opacity: 1}, 2000);

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

            $('#skill .polygon_wrap, #skill .btn_wrap').stop().animate({opacity: 0}, 800, function(){
                $(this).removeClass('on');
                $poly.removeClass('on');
                $poly.removeClass('prev_pol');
                $poly.removeClass('next_pol');
            });
            
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
    

    //elsewhere 클릭시 blur처리
    $('#elsewhere .site_list > li a').on('click', function(){
        $(this).blur();
    });


    //project===============================================

    var artiZ = [];
    //var artiT = [0, -120, -170, -210, -240, -260, -260 ,-260];
    var artiT = [-150, -270, -330, -370, -400, -425, -425, -425, -425];
    var artiNum = 0;

    //project wheel
    $('#project article').each(function(idx){
        artiZ[idx] = -600*idx;
        $(this).css({top: artiT[idx], transform: 'translate3d(-50%, 0, ' + artiZ[idx] + 'px) scale(0.96)'});
    });
    

    var timerWheel2 = 0;

    $('#project').on('mousewheel DOMMouseScroll', function(e){
        
        clearTimeout(timerWheel2);
        $('#project article').off('mouseenter mouseleave');
        
        timerWheel2 = setTimeout(function(){
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;

            if(delta < 0 && artiNum < 8){
                artiZ.unshift(0);
                artiT.unshift(600);

                for(var i=0; i < $('#project article').length; i++){
                    TweenMax.to('#project article:eq(' + i + ')', 2, {z: artiZ[i], top: artiT[i], onComplete: overOn});
                }

                artiNum++;
            }

            else if(delta > 0 && artiNum > 0){
                artiZ.splice(0,1);
                artiT.splice(0,1);

                for(var i=0; i < $('#project article').length; i++){
                    TweenMax.to('#project article:eq(' + i + ')', 2, {z: artiZ[i], top: artiT[i], onComplete: overOn});
                }

                artiNum--;
            }

        }, 200);
    });


    //project keydown
    $('#project').on('keydown', function(e){

        if($('#project article').is(':animated')) return false;
    
        var key = e.keyCode;
        
        if((key == 39 || key == 40) && artiNum < 8){
            artiZ.unshift(0);
            artiT.unshift(600);

            for(var i=0; i < $('#project article').length; i++){
                TweenMax.to('#project article:eq(' + i + ')', 2, {z: artiZ[i], top: artiT[i], onComplete: overOn});
            }

            artiNum++;
        }
        else if((key == 37 || key == 38) && artiNum > 0){
            artiZ.splice(0,1);
            artiT.splice(0,1);

            for(var i=0; i < $('#project article').length; i++){
                TweenMax.to('#project article:eq(' + i + ')', 2, {z: artiZ[i], top: artiT[i], onComplete: overOn});
            }

            artiNum--;
        }

    });


    $('#project article').on({
        click: function(){
            var artiIdx = $(this).index();
            $(this).parent().next().addClass('on').children().eq(artiIdx).css({display: 'block'}).stop().animate({opacity: 1}, 800);
            $('#project #project_detail .btn_projmenu').on('click', function(){
                $(this).parent().stop().animate({opacity: 0}, 800, function(){
                    $(this).css({display: 'none'});
                    $('#project #project_detail').removeClass('on');
                });

                $('#container #btnOpen').css({display: 'block'});
            });

            $('#container #btnOpen').css({display: 'none'});
        },
        mouseenter: function(){
            $(this).stop().animate({top: artiT[$(this).index()] - 70}, 500);
        },
        mouseleave: function(){
            $(this).stop().animate({top: artiT[$(this).index()]}, 500);
        }
    });


    function overOn(){
        $('#project article').on({
            mouseenter: function(){
                $(this).stop().animate({top: artiT[$(this).index()] - 70}, 500);
            },
            mouseleave: function(){
                $(this).stop().animate({top: artiT[$(this).index()]}, 500);
            }
        });
    }


    for(var i=0; i<2; i++){
        $('#project_detail > div .btn_more .over_rect > div').append('<div class="rect"></div>');
    }

    $('#project_detail > div .btn_more a').on({
        'mouseenter focus': function(){
            var bgColor = $(this).parent().children('.site').css('backgroundColor');

            $('#project_detail > div .btn_more .over_rect > div .rect').css({backgroundColor: bgColor});

            $(this).animate({fontSize: 28});
            $(this).siblings('.over_rect').children().eq($(this).index()).addClass('on');
        },
        'mouseleave blur': function(){
            $(this).animate({fontSize: 26});
            $(this).siblings('.over_rect').children().removeClass('on');
        }
    })


    //contact

    $('#sendEmail').on('submit', function(){
        var $umail = $('#email');
        var $umsg = $('#message').val();

        if(!regChk($umail, /^[\w]+@[a-z]{2,10}[\.][a-z]{2,3}[\.]?[a-z]{0,2}$/, '이메일형식이 올바르지 않습니다')) return false;
        if($umsg == '') {
            alert('메세지를 작성해주세요');
            $('#message').focus();
            return false;
        }

        alert('이메일이 실제로 전송되는 form형식이 아닙니다.\n연락을 원하시면 아래 메일로 연락 부탁드립니다.\n\njshee940315@naver.com');
        sendEffect();

        return false;
        //실제로 전송되는 방법 구글링해서 추가하기
    });

    function regChk($tg, regExp, msg){
        var result = regExp.test($tg.val());

        if(result) return true;
        else {
            alert(msg);
            $tg.focus();
            return false;
        }
    }

    var $conArea = $('#contact .area');

    function sendEffect(){
        $conArea.addClass('on').children('h2').text('Complete !');
        $conArea.children('.rewrite').css('zIndex', 1).stop().animate({opacity: 1}, 800);
        $edith.addClass('onContSend');

        $conArea.children('.rewrite').on('click', function(){
            $(this).css({zIndex: -1, opacity: 0}, 800).parent().removeClass('on').children('h2').text('Contact Me');
            $(this).prev().find('.u_write').val('');
            $edith.removeClass('onContSend');
        });
    }




    //gnb
    var openSrc = $('#container #btnOpen img').attr('src');
    var closeSrc = $('#container #btnOpen img').data('src');

    $('#container #btnOpen').on('click', function(){

        if($(this).hasClass('on')){
            $(this).removeClass('on').attr('aria-label', '전체 메뉴 열기').css({color: '#fff'}).children().attr('src', openSrc);
            $('#gnb').removeClass('active').css('opacity', 0);
        } else {
            $(this).addClass('on').attr('aria-label', '전체 메뉴 닫기').css({color: '#000'}).children().attr('src', closeSrc);
            $('#gnb').addClass('active').css('opacity', 1);
        }

    });


    $('#gnb ul li a').on({
        'mouseenter focus': function(){
            $(this).parent().addClass('on');
        },
        'mouseleave blur': function(){
            $(this).parent().removeClass('on');
        }
    })



    $('#gnb ul li a').on('click', function(e){
        e.preventDefault();

        $('#container #btnOpen').removeClass('on').attr('aria-label', '전체 메뉴 열기').css({color: '#fff'}).children().attr('src', openSrc);
        $('#gnb').removeClass('active').css('opacity', 0);

        $edith.removeClass();
        $('#main, #act1, #act2, #about, #contact, #project, #info, #elsewhere, #skill, #person').removeClass('active').css('opacity', 0);

        $('#skill .skilltype > li.on button').click();
        $conArea.children('.rewrite').click();

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