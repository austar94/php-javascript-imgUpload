
// canvas 태그 선택시 file 인풋 실행
function imgUploadSet(e) {
	$(e).closest('.img_upload').find('input').trigger('click');
}


// 인풋 file onchange 이벤트 작동
function img_changeSet(e) {
	//캔버스 초기화
    let canvas		=	$(e).closest('.img_upload').find('canvas');
    let ctx			=	canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
	$(e).closest('.img_upload').find('img').attr('src', '/img/no-images.png');					//기존 img태그 내용 초기화
	
	//삭제 버튼이 없을경우 이미지 태그 밑에 삭제버튼 추가
	if(!$(e).closest('img_upload').find('a').length){
		$(e).closest('.img_upload').find('img').after('<a href="#none" onclick="img_delSet(this)">이미지삭제</a>');
	}
	
	readURLSet(e);
}

function readURLSet(input) {
    let ext         	=   $(input).val().split(".").pop().toLowerCase();			//확장자 가져옴
	let canvasTag		=	$(input).closest('.img_upload').find('canvas');			//캔버스 태그
	let imgTag			=	$(input).closest('.img_upload').find('img');			//이미지 태그

	//확장자 검사
    if(ext.length > 0){
		if($.inArray(ext, ["gif","png","jpg","jpeg"]) == -1) {
			alert("gif,png,jpg 파일만 업로드 할수 있습니다");

			let agent 	=	navigator.userAgent.toLowerCase();
			if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
				input.replaceWith( input.clone(true) );
			}else{
				input.val("");
			}
			return false;
		}
    }
    
	//파일이 정상적으로 올라와있을경우 회전값 검사
    // If file is loaded, create new FileReader
	if (input.files && input.files[0]) {	
		  
        // Create a FileReader
        let reader			=	new FileReader();
        // Set onloadend function on reader
        reader.onloadend 	=	function (e) {
            
          // Update an image tag with loaded image source
          // $('.imgShow').attr('src', URL.createObjectURL(event.target.files[0]));
          $(imgTag).attr('src', e.target.result);
          // Use EXIF library to handle the loaded image exif orientation
          EXIF.getData(input.files[0], function() {
              
            // Fetch image tag
            var img 		=	$(imgTag).get(0);
            // Fetch canvas
            var canvas 		=	$(imgTag).get(0);
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

	let imgTag				=	$(e).closest('.img_upload').find('img');
	let canvasTag			=	$(e).closest('.img_upload').find('canvas');
	let input				=	$(e).closest('.img_upload').find('input');
	
	$(input).val('');													//input file 내용 초기화 
	let ctx			=	canvas.getContext('2d');						//캔버스 내용 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
	$(e).closest('.img_upload').find('img').attr('src', '/img/no-images.png');					//기존 img태그 내용 초기화
	$(e).remove();											//삭제 버튼 삭제
}
