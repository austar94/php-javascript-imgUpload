<form id="frm">
    <div class="img_upload">
        <input type="file" name="imgFile_1" onchange="imgUploadSet(event, this)">
        <img src="/img/no-images.png" class="img_1">
    </div>
</form>
<button type="button" onclick="uploadImgProc()">upload img</button>

<script src="/js/jquery-3.1.1.min.js"></script>
<script src="/js/upload.js"></script>
<script src="/js/img.js"></script>
<script src="/js/exif-js.js"></script>

