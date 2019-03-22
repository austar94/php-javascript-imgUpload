
// 이미지 삽입
function img_upSet(e) {

	var id = $(e).attr('id');
	var order = id.split("_")[1];
	$('input[name="img_'+order+'"]').trigger('click');
}


// 이미지 보이기
function img_changeSet(e) {

	var id          =   $(e).attr('id');
	var order       =   id.split("_")[1];
	var str         =   '';

    str             +=  '<canvas class="canvas_full canvas_'+order+'"></canvas>';
	str             +=  '<img src="/common/img/no-images.png" alt="이미지" class="hide imgShow_'+ order +'">';
	str             +=  '<a href="#none" class="imgDel" id="imgDel_'+ order +'" onclick="img_delSet(this)"></a>';

	$(e).parent().append(str); // 이미지 및 삭제버튼 추가
    $(e).siblings('.imgUp').remove(); // 이미지 업로드버튼 삭제
    
	readURLSet(e);
}

function readURLSet(input) {
    var id          =   $(input).attr('id');
	var order       =   id.split("_")[1];
    var ext         =   $(input).val().split(".").pop().toLowerCase();

    if(ext.length > 0){
		if($.inArray(ext, ["gif","png","jpg","jpeg"]) == -1) {
			alert("gif,png,jpg 파일만 업로드 할수 있습니다.");
			var file    =   $(input);

			var agent = navigator.userAgent.toLowerCase();
			if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
				file.replaceWith( file.clone(true) );
			}else{
				file.val("");
			}
			return false;
		}
    }
    
    

    // If file is loaded, create new FileReader
	if (input.files && input.files[0]) {
		  
        // Create a FileReader
        var reader = new FileReader();
        // Set onloadend function on reader
        reader.onloadend = function (e) {
            
          // Update an image tag with loaded image source
          // $('.imgShow').attr('src', URL.createObjectURL(event.target.files[0]));
          $('.imgShow_' + order).attr('src', e.target.result);
          // Use EXIF library to handle the loaded image exif orientation
          EXIF.getData(input.files[0], function() {
              
            // Fetch image tag
            var img = $(".imgShow_" + order).get(0);
            // Fetch canvas
            var canvas = $(".canvas_" + order).get(0);
            // run orientation on img in canvas
            orientation(img, canvas);
        });
    };
    
    // Trigger reader to read the file input
    reader.readAsDataURL(input.files[0]);
  }
	
}


//모바일 이미지 재조정
function orientation(img, canvas) {
	
	// Set variables
	var ctx = canvas.getContext("2d");
	var exifOrientation = '';
	var width = img.width,
		height = img.height;
		

	// Check orientation in EXIF metadatas
	EXIF.getData(img, function() {
		var allMetaData = EXIF.getAllTags(this);
		exifOrientation = allMetaData.Orientation;
	});

	// set proper canvas dimensions before transform & export
	if (jQuery.inArray(exifOrientation, [5, 6, 7, 8]) > -1) {
		canvas.width = height;
		canvas.height = width;
	} else {
		canvas.width = width;
		canvas.height = height;
	}


	// transform context before drawing image
	switch (exifOrientation) {
		case 2:
			ctx.transform(-1, 0, 0, 1, width, 0);
			break;
		case 3:
			ctx.transform(-1, 0, 0, -1, width, height);
			break;
		case 4:
			ctx.transform(1, 0, 0, -1, 0, height);
			break;
		case 5:
			ctx.transform(0, 1, 1, 0, 0, 0);
			break;
		case 6:
			ctx.transform(0, 1, -1, 0, height, 0);
			break;
		case 7:
			ctx.transform(0, -1, -1, 0, height, width);
			break;
		case 8:
			ctx.transform(0, -1, 1, 0, 0, width);
			break;
		default:
			ctx.transform(1, 0, 0, 1, 0, 0);
	}

	// Draw img into canvas
	ctx.drawImage(img, 0, 0, width, height);

}



// 이미지 삭제
function img_delSet(e) {


	var id = $(e).attr('id');
	var order = id.split("_")[1];

	var str = '<a href="#none" class="imgUp" id="imgUp_'+ order +'" onclick="img_upSet(this)"></a>';

	$('input[name="img_'+order+'"]').val(''); // 이미지값 초기화
	$('#isDel_'+order).val('Y');

	$(e).parent().append(str); // 이미지 업로드버튼 생성

	$(e).siblings('img').remove(); // 이미지 삭제
	$(e).remove(); // 이미지 삭제버튼 삭제
	$('#isDel_'+order).val('Y');

}
