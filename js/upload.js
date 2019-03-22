//img파일 업로드
function uploadImgProc(){

    //이미지 선택을 안했을 경우
    if(!$('input').val().trim()){
        alert('select img');
        return;
    }
    
    

    var form           =   document.querySelector("#frm");
    var postDate        =   new FormData(form);


    $.ajax({
       type            :   "POST",
       url             :  "/event/imgProc",
       dataType        :   "json",
       data            :   postDate,
       async           :   true,
       cache           :   false,
       contentType     :   false,
       processData     :   false,
       success         :   function(data) {
           let result           =   data.result;
           if(result){
           } else {
           }
           
           
       }
    });
    
}
