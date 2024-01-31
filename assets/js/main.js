
//2022-07-20 수정
//Textarea 글자 수 제한  
function fnChkByte(obj, maxByte) {

	var str = obj.value;
	var str_len = str.length;
	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";

	for (var i = 0; i < str_len; i++) {
		one_char = str.charAt(i);
		if (escape(one_char).length > 4) {
			rbyte += 2;
		}
		else {
			rbyte++;
		}


		if (rbyte <= maxByte) {
			rlen = i + 1;
		}
	}

	if (rbyte > maxByte) {
		str2 = str.substr(0, rlen);
		obj.value = str2;
		fnChkByte(obj, maxByte);
	} else {
		document.getElementById('byte-info').innerText = rbyte;
	}
}
// //2022-07-20 수정

//2022/07/18 수정
//공통팝업제어  
function openLayer(sGetName){
    var layer = $("#"+ sGetName);
    layer.addClass("on");
    document.body.style.overflow = "hidden";
}

function closeLayer(sGetName){
    $("#"+ sGetName).removeClass("on");
    document.body.style.overflow = "auto";
}
// //2022/07/18 수정

//아코디언 리스트       
const items = document.querySelectorAll(".accordion button");    

function toggleAccordion() {
	
	const itemToggle = this.getAttribute('aria-expanded');	

	for (i = 0; i < items.length; i++) {
		items[i].setAttribute('aria-expanded', 'false');
	}
	
	if (itemToggle == 'false') {
		this.setAttribute('aria-expanded', 'true');
	}
}
items.forEach(item => item.addEventListener('click', toggleAccordion));

//숫자 maxlength
function maxLengthNum(obj){
	if (obj.value.length > obj.maxLength){
	obj.value = obj.value.slice(0, obj.maxLength);
	}    
}


$(document).ready(function(){
	
	// ********************** 공통
	//자잘한 드랍다운 버튼,컨텐츠
	$('.drop-btn').click(function(){
		// 2022/07 수정
		$(this).parents('.drop-content').toggleClass('close');
		$(this).parents('.drop-content-reverse').toggleClass('open');
		$(this).parents('.drop-content').toggleClass('active');
		$(this).parents('.drop-content-reverse').toggleClass('active');
		// //2022/07 수정
	});

	//버튼 클릭하면 숫자 증감되는 부분
	$('.num-btn').click(function(){

		var data = $(this).attr('data-type');
		var numResult = $(this).siblings('.num-result');
		var number = numResult.html();

		if ( data == 'minus' ){
			number = parseInt(number) - 1;
		}else if( data == 'plus' ){
			number = parseInt(number) + 1;
		}

		if ( number === 0 ){
			number = parseInt(number) + 1;
		}

		numResult.html(number);
		
	})


	// ********************** 메인페이지 (index)

	// 2022/08/01 수정
	//tab menu
	$('.tab-content>div:not(":first-of-type")').hide();

	$('.tab-menu li').each(function (i) {
		$(this).attr('data-tab', 'tab' + i);
	});

	$('.tab-content>div').each(function (i) {
		$(this).attr('data-tab', 'tab' + i);
	});

	//이중 탭리스트
	$('.tab-list-2 li').each(function (i) {
		$(this).attr('data-tab', 'tab' + i);
	});

	$('.tab-menu li').on('click', function () {

		var dataTab = $(this).data('tab');
		var getWrapper = $(this).closest('.tab');
		var sameData = $(this).attr('data-tab'); //이중 탭리스트
		var tabOffset = $('.tab-menu:first-child').offset().top; //이중 탭리스트

		getWrapper.find('.tab-menu li').removeClass('active');
		$(this).addClass('active');
		$(`[data-tab= ${sameData}]`).addClass('active'); //이중 탭리스트
		
		getWrapper.find('.tab-content>div').hide();
		getWrapper.find('.tab-content>div[data-tab=' + dataTab + ']').show();

		//이중 탭리스트
		if ( $(this).parents().hasClass('tab-list-2') == true ){
			$( window ).scrollTop( tabOffset );
		}
	
	});
	// //2022/08/01 수정

	//ham nav open
	$(".gnb-open-btn").click(function(){
		$('.gnb-area').addClass('open');
		document.body.style.overflow = "hidden";
		$('.main_header .header_inner h1').css('z-index','0');
	});

		$(".gnb-close-btn").click(function(){
		$('.gnb-area').removeClass('open');
		document.body.style.overflow = "auto";
		$('.main_header .header_inner h1').css('z-index','101');
	});

	//라디오버튼 선택에 따라 컨텐츠 영역 보이기
	var radioType1 =  $("input:radio[data-type='type-1']");
	var radioType2 =  $("input:radio[data-type='type-2']");
	var radioType3 =  $("input:radio[data-type='type-3']");

	$(document).on('change', radioType1, function(){

        if($(radioType1).is(":checked")){
			$(".ticket-select[data-content='type-1']").addClass('on');
        }else{
            $(".ticket-select[data-content='type-1']").removeClass('on');
        }

	});

	$(document).on('change', radioType2, function(){

        if($(radioType2).is(":checked")){
			$(".ticket-select[data-content='type-2']").addClass('on');
        }else{
            $(".ticket-select[data-content='type-2']").removeClass('on');
        }

	});

	$(document).on('change', radioType3, function(){

        if($(radioType3).is(":checked")){
			$(".ticket-select[data-content='type-3']").addClass('on');
        }else{
            $(".ticket-select[data-content='type-3']").removeClass('on');
        }

	});

	//티켓옵션선택에서 옵션체크되면 티켓정보 보이기
	var radioBtn =  $(".ticket-popup input:radio[name='radio1']");
	var checkBtn =  $(".ticket-popup input:checkbox[name='checkbox1']");

	$(document).on('change', radioBtn, function(){

        if($(radioBtn).is(":checked")){
            if($(checkBtn).is(":checked")){
				$('.ticket-popup .ticket-info').addClass('on');
			}else{
				$('.ticket-popup .ticket-info').removeClass('on');
			}
        }else{
            $('.ticket-popup .ticket-info').removeClass('on');
        }

	});

	//티켓 리스트 삭제 애니메이션
	// function ticketHide(el) {
	// 	el.animate({opacity: '0'}, 150, function(){
	// 	el.animate({minHeight: '0px'}, 150, function(){
	// 		el.remove();
	// 	});
	// 	});
	// }
	
	// $(document).on('click', '.del', function(){
	// 	var el = $(this).closest('.ticket-info');
	// 	ticketHide(el);
	// });

	function ticketHide(el) {
		el.removeClass('on');
	}
	
	$(document).on('click', '.del', function(){
		var el = $(this).closest('.ticket-info');
		ticketHide(el);
	});


	// ********************** Form
	//ios에서 number타입 숫자키패드 나오도록 속성 추가
	$( 'input[type="number"]' ).attr( 'pattern', '\\d*' );

	//비밀번호 보이기
	$('.blind-eyes').on('click',function(){

		$(this).parents('.password').toggleClass('eyes-active');
		if( $('.password').hasClass('eyes-active') == true ){
				$(this).addClass('on');
				$(this).parents('.password').find('input[type="password"]').attr('type','text');
			}else{
				$(this).removeClass('on');
				$(this).parents('.password').find('input[type="text"]').attr('type','password');
			}
	});

	//password input 스타일링
	$( 'input[type="password"]' ).focus(function(){
		$(this).parents('.password').css( 'border', '1px solid #00a9b7' );
	})
	$( 'input[type="password"]' ).blur(function(){
		$(this).parents('.password').css( 'border', '1px solid #eaebec' );
	})

	//textarea 스타일링
	$( '.textarea-basic textarea' ).focus(function(){
		$(this).parents('.textarea-basic').css( 'border', '1px solid #00a9b7' );
	})
	$( '.textarea-basic textarea' ).blur(function(){
		$(this).parents('.textarea-basic').css( 'border', '1px solid #eaebec' );
	})

	
	// ********************** 마이페이지
	//마이페이지 데이터(이름) 들어가는 곳 4자이상 말줄임표
	$(".data-area .name, .top-userinfo .greeting .name").each(function(){

		var length = 5; 

		$(this).each(function(){
			if( $(this).text().length >= length ){
				$(this).text( $(this).text().substr(0,length)+'...'); 
			}

		});

	});
	
	//결제수단 타입에 보이고 숨기고 하는 radio
	$('input[name="pay-type"]').click(function(){

		$('input[name="pay-type"]').parents('.change-display').addClass('on');
		
		if ( $(this).is(':checked') ){
			$(this).parents('.change-display').removeClass('on');
		}else{
			$(this).parents('.change-display').addClass('on');
		}

	});

	//캘린더 기간선택 클릭되면 활성화되는 버튼 
	$('.date-period li').click(function(){

		$('.date-period li').removeClass('active');
		$(this).addClass('active');

	})


	// ********************** 회원가입
	//이용약관 전체선택,해제
    function allCheckFunc( obj ) {
        
		$("[name=chk-one]").prop("checked", $(obj).prop("checked") );
    }

        function oneCheckFunc( obj ) {
            var allObj = $("[name=chk-all]");
            var objName = $(obj).attr("name");

            if( $(obj).prop("checked") ){
                checkBoxLength = $("[name="+ objName +"]").length;
                checkedLength = $("[name="+ objName +"]:checked").length;

                if( checkBoxLength == checkedLength ) {
                    allObj.prop("checked", true);
                } else {
                    allObj.prop("checked", false);
                }
            }else{
                allObj.prop("checked", false);
            }
        }

        $(function(){
            $("[name=chk-all]").click(function(){
                allCheckFunc( this );
            });
            $("[name=chk-one]").each(function(){
                $(this).click(function(){
                    oneCheckFunc( $(this) );
                });
            });
        });

	//체크박스 체크되면 숨김영역 토글되기
	$('.display-chk').click(function(){

		if( $(this).is(':checked') ){
			$(this).parents('.form-area').find('.display-unit').css('display', 'block');	
		}else{
			$(this).parents('.form-area').find('.display-unit').css('display', 'none');	
		}

	})

	//1-1문의 링크부분 위치값 설정
	$('.answer-btn').addClass('p-bottom');

	$('.accordion.contact button').click(function(){

		var standElem = $(this).parents('.accordion-item').find('.bottom');
		var standVal = standElem.position().top;
		var answerElem = $(this).parents('.accordion-item').find('.answer-btn');

		answerElem.css('top' , standVal);
		answerElem.removeClass('p-bottom');

	})

	//2022/07 수정
	// ********************** 예약
	//검색조건설정팝업 탭버튼
	$('.tab-month-btn button').on('click', function(){

		$('.tab-month-btn button').parents().removeClass('active');
		$(this).parents().addClass('active');

	})
	// //2022/07 수정

	//2022/07/28 수정
	/* 펫포레그라운드 링크 */
	$('.healing').click(function(){
		$('.room-facilities .tab-menu li').removeClass('active');
		$('.room-facilities .tab-menu li:nth-child(2)').addClass('active');
		$('.tab-content>div').hide();
		$('.tab-content>div:nth-child(2)').show();
	});

	$('.ground').click(function(){
		$('.room-facilities .tab-menu li').removeClass('active');
		$('.room-facilities .tab-menu li:nth-child(1)').addClass('active');
		$('.tab-content>div').hide();
		$('.tab-content>div:nth-child(1)').show();
	});
	// //2022/07/28 수정

});