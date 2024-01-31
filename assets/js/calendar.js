	var li_count = 5; // Spinner에 나타날 목록 개수 
	var y, pre_y; // touch, move 시 사용되는 y 좌표 (위, 아래 touch, move 만 필요하기 때문에 y만 존재)
	var dragFlag = false; // mousemove 이벤트가 mousedown이후에만 실행되도록 하는 flag
	var touch_limit = 10; //spinner 의 선택된 값이 변경되는 '최초 터치좌표(pre_y) - 마지막 터치 좌표(y)' 한계값 (모바일 터치)
	var mouse_limit = 30; //spinner 의 선택된 값이 변경되는 '최초 터치좌표(pre_y) - 마지막 터치 좌표(y)' 한계값 (PC 마우스)
	
	$(function() {
		$("#date_box1").hide();
		
		$("#date_box").click(
			function(){
				defaultSetCalender();
				$("#date_box1").show();
			}
		);
		
		$('.year').bind('touchstart', function(e) {
			dragFlag = true;
			var event = e.originalEvent;
			y =  event.touches[0].screenY;
			pre_y = event.touches[0].screenY;
			e.preventDefault();
		});
		
		$('.month').bind('touchstart', function(e) {
			dragFlag = true;
			var event = e.originalEvent;
			y =  event.touches[0].screenY;
			pre_y = event.touches[0].screenY;
			e.preventDefault();
		});	
		
		$('.day').bind('touchstart', function(e) {
			dragFlag = true;
			var event = e.originalEvent;
			y =  event.touches[0].screenY;
			pre_y = event.touches[0].screenY;
			e.preventDefault();
		});	
		
		$('.year').bind('touchmove', function(e) {
				if (dragFlag) {
					var event = e.originalEvent;
					y =  event.touches[0].screenY;
					var y_pt = y - pre_y;
					
					if(y_pt > touch_limit || y_pt < - touch_limit)
					{
						makeYear($('#year_' + Math.ceil(li_count/2)).text(), $('#mon_' + Math.ceil(li_count/2)).text(), $('#day_' + Math.ceil(li_count/2)).text(), pre_y - y); // 마우스와 반대 + 가 아래로 드래그, =가 위로 드래그라서 이전위치 - 현재위치로 함.
						pre_y =  event.touches[0].screenY;
					}
				}
		});
		
		$('.month').bind('touchmove', function(e) {
				if (dragFlag) {
					var event = e.originalEvent;
					y =  event.touches[0].screenY;
					var y_pt = y - pre_y;
					
					if(y_pt > touch_limit || y_pt < - touch_limit)
					{
						makeMonth($('#year_' + Math.ceil(li_count/2)).text(), $('#mon_' + Math.ceil(li_count/2)).text(), $('#day_' + Math.ceil(li_count/2)).text(), pre_y - y); // 마우스와 반대 + 가 아래로 드래그, =가 위로 드래그라서 이전위치 - 현재위치로 함.
						pre_y =  event.touches[0].screenY;
					}
				}
		});
		
		$('.day').bind('touchmove', function(e) {
				if (dragFlag) {
					var event = e.originalEvent;
					y =  event.touches[0].screenY;
					var y_pt = y - pre_y;
					
					if(y_pt > touch_limit || y_pt < - touch_limit)
					{
						makeDay($('#year_' + Math.ceil(li_count/2)).text(), $('#mon_' + Math.ceil(li_count/2)).text(), $('#day_' + Math.ceil(li_count/2)).text(), pre_y - y); // 마우스와 반대 + 가 아래로 드래그, =가 위로 드래그라서 이전위치 - 현재위치로 함.
						pre_y =  event.touches[0].screenY;
					}
				}
		});
		
		$('.year').bind('touchend', function(e) {
				dragFlag = false;
				e.preventDefault();
		});
		
		$('.month').bind('touchend', function(e) {
				dragFlag = false;
				e.preventDefault();
		});
		
		$('.day').bind('touchend', function(e) {
				dragFlag = false;
				e.preventDefault();
		});
		
		$('.year').mousedown(
			function (e) {
				dragFlag = true;
				var obj = $(this);
				y = obj.scrollTop();
				pre_y = e.screenY;
			}
		);

		$('.month').mousedown(
			function (e) {
				dragFlag = true;
				var obj = $(this);
				y = obj.scrollTop();
				pre_y = e.screenY;
			}
		);
		
		$('.day').mousedown(
			function (e) {
				dragFlag = true;
				var obj = $(this);
				y = obj.scrollTop();
				pre_y = e.screenY;
			}
		);
		
		$('.year').mousemove(
			function (e) {
				if (dragFlag) {
					var obj = $(this);
					obj.scrollTop(y - e.screenY + pre_y);
					var y_pt = y - e.screenY + pre_y;
				
					if(y_pt > mouse_limit || y_pt < -mouse_limit)
					{
						makeYear($('#year_' + Math.ceil(li_count/2)).text(), $('#mon_' + Math.ceil(li_count/2)).text(), $('#day_' + Math.ceil(li_count/2)).text(), y - e.screenY + pre_y); 
						y = obj.scrollTop();
						pre_y = e.screenY;
					}
					return false;
				}
			}
		);
		
		$('.month').mousemove(
			function (e) {
				if (dragFlag) {
					var obj = $(this);
					obj.scrollTop(y - e.screenY + pre_y);
					var y_pt = y - e.screenY + pre_y;
				
					if(y_pt > mouse_limit || y_pt < -mouse_limit)
					{
						makeMonth($('#year_' + Math.ceil(li_count/2)).text(), $('#mon_' + Math.ceil(li_count/2)).text(), $('#day_' + Math.ceil(li_count/2)).text(), y - e.screenY + pre_y); 
						y = obj.scrollTop();
						pre_y = e.screenY;
					}
					return false;
				}
			}
		);
		
		$('.day').mousemove(
			function (e) {
				if (dragFlag) {
					var obj = $(this);
					obj.scrollTop(y - e.screenY + pre_y);
					var y_pt = y - e.screenY + pre_y;
				
					if(y_pt > mouse_limit || y_pt < -mouse_limit)
					{
						makeDay($('#year_' + Math.ceil(li_count/2)).text(), $('#mon_' + Math.ceil(li_count/2)).text(),$('#day_' + Math.ceil(li_count/2)).text() , y - e.screenY + pre_y);
						y = obj.scrollTop();
						pre_y = e.screenY;
					}
					return false;
				}
			}
		);
		
		$('.year').mouseup(
			function () {
				dragFlag = false;
			}
		);
		
		$('.month').mouseup(
			function () {
				dragFlag = false;
			}
		);
		
		$('.day').mouseup(
			function () {
				dragFlag = false;
			}
		);
		
		$('body').mouseup(
			function () {
				dragFlag = false;
			}
		);
		
		$('#ok_btn_calender').click(
			function() {
				var date_text = $('#year_' + Math.ceil(li_count/2)).text() + changeDigit($('#mon_' + Math.ceil(li_count/2)).text(),2) + changeDigit($('#day_' + Math.ceil(li_count/2)).text(), 2);
				$('#date_box').val(date_text);
				$("#date_box1").hide();
			}
		);
	});
	
	// 텍스트 박스에 입력된 날짜가 Spinner에 선택되도록 하는 함수
	// 텍스트 박스(#date_box)를 클릭 시 호출
	function defaultSetCalender()
	{
		var date_box_txt = $('#date_box').val();
		var year = date_box_txt.slice(0, 4);
		var month = date_box_txt.slice(4, 6);
		var day = date_box_txt.slice(6, 8);
		makeYear(year-1, month, day, 1);
		makeMonth(year, month-1, day, 1);
	    makeDay(year, month, day-1, 1);
	}	

	// spinner에서 선택한 년(year)과 월(month)에 맞는 마지막 일(day) return
	// 윤달, 28/30일/31일 선택 
	function getLastDay(year, month)
	{
		var default_last_day = [31,28,31,30,31,30,31,31,30,31,30,31]
		if(Number(month) === 2)
		{
			if((Number(year) % 4) === 0)
			{
				if((Number(year) % 400) === 0)
				{
					default_last_day[Number(month)-1] = 29;
				}
				else if((Number(year) % 100) === 0)
				{
					default_last_day[Number(month)-1] = 28;
				}
				else
				{
					default_last_day[Number(month)-1] = 29;
				}
			}
		}
		
		return default_last_day[Number(month)-1];
	}
	
	// 입력받은 number에 digit 길이까지 앞쪽에 '0'을 채움. 
	// Ex) changeDigit(10, 3) => '010' , changeDigit(10, 2) => '10' , changeDigit(1, 2) => '01'
	function changeDigit(number, digit)
	{
		var number_length = number.toString().length;
		var return_number='';
		
		if( number_length >= digit )
			return number.toString();
		else
		{
			for(var i = 0 ; i < (digit - number_length) ; i++)
			{
				return_number += '0';
			}
			return_number += number;
			return return_number;
		}
		
	}
	
	// 드래그된 거리 정보를 받아 년(year)를 갱신하는 함수
	function makeYear(current_year, current_month, current_day, y_point)
	{
		//min_year 이상에서 max_year 이하 년까지 나옴.
		var min_year = 1900;
		var max_year = 2999;
		
		var current_month_n =  Number(current_month);
		var current_year_n =  Number(current_year);
		var current_day_n =  Number(current_day);
		
		if(y_point > 0) //위로 드래그하면 수가 올라감
		{
			if(current_year_n < min_year + (li_count - Math.ceil(li_count/2)-1))
			{
				for(var i =  min_year + (li_count - Math.ceil(li_count/2)-1) - current_year_n  ; i < li_count; i ++) 
				{
					$("#year_" + (i+1)).text((current_year_n - (li_count - Math.ceil(li_count/2) - 1) + i) > max_year ? ' ' : (current_year_n - (li_count - Math.ceil(li_count/2) - 1) + i));	
				}
			}
			else {
				if(current_year_n < max_year)
				{
					for(var i = 0 ; i < li_count; i ++)
					{
						$("#year_" + (i+1)).text((current_year_n - (li_count - Math.ceil(li_count/2) - 1) + i) > max_year ? ' ' : (current_year_n - (li_count - Math.ceil(li_count/2) - 1) + i));	
					}
				}
			}
			makeDay2(current_year_n, (max_year < current_year_n + 1) ? current_year_n : current_year_n + 1, current_month_n ,current_month_n, current_day_n)
		}
		if(y_point < 0) // 아래로 드래그
		{
			if(current_year_n > max_year -(li_count - Math.ceil(li_count/2)-1))
			{
				for(var i = 0 ; i < (li_count - (current_year_n + (li_count - Math.ceil(li_count/2)-1) - max_year)) ; i ++)
				{
					$("#year_" + (i+1)).text((current_year_n - (li_count - Math.ceil(li_count/2)+ 1) + i) < min_year ? ' ' : (current_year_n - (li_count - Math.ceil(li_count/2)+ 1) + i));	
				}
			}
			else
			{
				if(current_year_n > min_year)
				{
					for(var i = 0 ; i < li_count; i ++)
					{
						$("#year_" + (i+1)).text((current_year_n - (li_count - Math.ceil(li_count/2) + 1) + i) < min_year ? ' ' : (current_year_n - (li_count - Math.ceil(li_count/2)+ 1) + i));	
					}
				}
			}
			makeDay2(current_year_n, (min_year > current_year_n - 1) ? current_year_n : current_year_n - 1 , current_month_n ,current_month_n, current_day_n)
		}
	}
	
	// 드래그된 거리 정보를 받아 월(month)를 갱신하는 함수
	function makeMonth(current_year, current_month, current_day, y_point)
	{
		var min_month = 1;
		var max_month = 12;
		
		var current_month_n =  Number(current_month);
		var current_year_n =  Number(current_year);
		var current_day_n =  Number(current_day);
		
		if(y_point > 0) //위로 드래그 : 증가
		{
			if(current_month_n < min_month + (li_count - Math.ceil(li_count/2)-1))
			{
				for(var i =  min_month + (li_count - Math.ceil(li_count/2)-1) - current_month_n  ; i < li_count; i ++) 
				{
					$("#mon_" + (i+1)).text((current_month_n - (li_count - Math.ceil(li_count/2) - 1) + i) > max_month ? ' ' : (current_month_n - (li_count - Math.ceil(li_count/2) - 1) + i));	
				}
			}
			else {
				if(current_month_n < max_month)
				{
					for(var i = 0 ; i < li_count; i ++)
					{
						$("#mon_" + (i+1)).text((current_month_n - (li_count - Math.ceil(li_count/2) - 1) + i) > max_month ? ' ' : (current_month_n - (li_count - Math.ceil(li_count/2) - 1) + i));	
					}
				}
			}
			makeDay2(current_year_n, current_year_n, current_month_n ,(current_month_n+1 > max_month) ? current_month_n : current_month_n + 1, current_day_n)
		}
		if(y_point < 0) // 아래로 드래그 : 감소
		{
			if(current_month_n > max_month -(li_count - Math.ceil(li_count/2)-1))
			{
				for(var i = 0 ; i < (li_count - (current_month_n + (li_count - Math.ceil(li_count/2)-1) - max_month)) ; i ++) 
				{
					$("#mon_" + (i+1)).text((current_month_n - (li_count - Math.ceil(li_count/2)+ 1) + i) < min_month ? ' ' : (current_month_n - (li_count - Math.ceil(li_count/2)+ 1) + i));	
				}
			}
			else
			{
				if(current_month_n > min_month)
				{
					for(var i = 0 ; i < li_count; i ++)
					{
						$("#mon_" + (i+1)).text((current_month_n - (li_count - Math.ceil(li_count/2) + 1) + i) < min_month ? ' ' : (current_month_n - (li_count - Math.ceil(li_count/2)+ 1) + i));	
					}
				}
			}
			makeDay2(current_year_n ,current_year_n, current_month_n, (current_month_n-1 < min_month) ? current_month_n : current_month_n - 1, current_day_n)
		}
		
		
	}
	
	// 마지막 일자를 선택한 상태에서 월이나 년을 변경할 때 마지막 일자 처리 함수
	function makeDay2(current_year , next_year, current_month, next_month, current_day_n)
	{
		var min_day = 1;
		var max_day_current_mon = getLastDay(current_year, current_month);
		var max_day_next_mon = getLastDay(next_year, next_month);
		
		
		if((max_day_current_mon !==  max_day_next_mon) && (max_day_current_mon === current_day_n))
		{
			for(var i = 0 ; i < li_count ; i ++) 
			{
				if(i < Math.ceil(li_count/2))
					$("#day_" + (i+1)).text((max_day_next_mon - (li_count - Math.ceil(li_count/2)) + i));	
				else
					$("#day_" + (i+1)).text('');	
			}
		}
	}
	
	// 드래그된 거리 정보를 받아 일(day)를 갱신하는 함수
	function makeDay(current_year ,current_month, current_day, y_point)
	{
		var min_day = 1;
		var max_day = getLastDay(current_year, current_month);
		
		var current_day_n =  Number(current_day);
				
		if(y_point > 0) //위로 드래그 : 증가
		{
			if(current_day_n < min_day + (li_count - Math.ceil(li_count/2)-1))
			{
				for(var i =  min_day + (li_count - Math.ceil(li_count/2)-1) - current_day_n  ; i < li_count; i ++) 
				{
					$("#day_" + (i+1)).text((current_day_n - (li_count - Math.ceil(li_count/2) - 1) + i) > max_day ? ' ' : (current_day_n - (li_count - Math.ceil(li_count/2) - 1) + i));	
				}
			}
			else {
				if(current_day_n < max_day)
				{
					for(var i = 0 ; i < li_count; i ++)
					{
						$("#day_" + (i+1)).text((current_day_n - (li_count - Math.ceil(li_count/2) - 1) + i) > max_day ? ' ' : (current_day_n - (li_count - Math.ceil(li_count/2) - 1) + i));	
					}
				}
			}
		}
		
		if(y_point < 0) // 아래로 드래그 : 감소
		{
			if(current_day_n > max_day -(li_count - Math.ceil(li_count/2)-1))
			{
				for(var i = 0 ; i < (li_count - (current_day_n + (li_count - Math.ceil(li_count/2)-1) - max_day)) ; i ++) // li_count-1 를 해서 마지막 목록에는 빈칸으로 나오도록함.
				{
					$("#day_" + (i+1)).text((current_day_n - (li_count - Math.ceil(li_count/2)+ 1) + i) < min_day ? ' ' : (current_day_n - (li_count - Math.ceil(li_count/2)+ 1) + i));	
				}
			}
			else
			{
				if(current_day_n > min_day)
				{
					for(var i = 0 ; i < li_count; i ++)
					{
						$("#day_" + (i+1)).text((current_day_n - (li_count - Math.ceil(li_count/2) + 1) + i) < min_day ? ' ' : (current_day_n - (li_count - Math.ceil(li_count/2)+ 1) + i));	
					}
				}
			}
		}
	}