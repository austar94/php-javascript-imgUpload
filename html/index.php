<form id="frm">
    <div class="img_upload">
        <input type="file" name="imgFile" onchange="img_changeSet(this)">
        <canvas onclick="imgUploadSet(this)"></canvas>
        <img src="/img/no-images.png" style="display:none"> 
        <button onclick="img_delSet(this)">이미지삭제</button>
    </div>
</form>
<button type="button" onclick="uploadImgProc()">upload img</button>

<script src="/js/jquery-3.1.1.min.js"></script>
<script src="/js/upload.js"></script>
<script src="/js/img.js"></script>
<script src="/js/exif-js.js"></script>

