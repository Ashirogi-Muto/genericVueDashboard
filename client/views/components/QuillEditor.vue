<template>
<div>
  <quill-editor ref="myTextEditor"
                v-model="content"
                :options="editorOption"
                @focus="onEditorFocus($event)">
  </quill-editor>
    <input type="file" id="getFile" @change="uploadFunction($event)" />

  <div id="image-upload-window">
    <span id="close-button" v-on:click="closeImageWindow"> CLOSE </span>
    <div class="input-container">
      <ul>
        <li><label>URL: </label>
          <input id="image-url" type="text" placeholder="Enter image url..." />
          <button v-on:click="embedImage()">Insert</button></li>
        <li><label>Select file: </label><br>
            <image-uploader @image-uploaded="embedImage($event)" @upload-error="imageUploadError($event)"></image-uploader></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import ImageUploader from './ImageUploader'

var IMGUR_CLIENT_ID = 'bcab3ce060640ba';
var IMGUR_API_URL = 'https://api.imgur.com/3/image';

var toolbarOptions = [['bold', 'italic', 'underline', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['formula','link', 'image'],
                ['clean']];

  export default {

    props: ['initialContent'],
    data () {
      return {
        content: '',
        editorOption: {
          modules: {
                  toolbar: {
                    container: toolbarOptions,
                    handlers: {
                      image: this.imageHandler1
                    }
                  }
              },
        }


            }
    },
    components: {
      quillEditor,
      ImageUploader
    },

    mounted () {
      this.content = 'YOLO'
    },
    methods : {

    embedImage (image_url) {
      var url = document.getElementById('image-url').value;
      var range = window.test.getSelection();
      if(url){
        window.test.insertEmbed(range.index, 'image', url);
      }
      if(image_url){
        window.test.insertEmbed(range.index, 'image', image_url);
      }  
      this.closeImageWindow();  
    },
    imageUploadError (error) {
      alert(JSON.stringify(error));
    },

    closeImageWindow () {
      document.getElementById('image-url').value = '';
      document.getElementById('image-upload-window').style.display = 'none';
    },
    imageHandler1(editor) {

      //var value = prompt('What is the image URL');
      document.getElementById('image-upload-window').style.display = 'inline-block';
      console.log(window.test)
     // window.test.insertEmbed(3, 'image', value);
    },
      uploadFunction(e){

        //you can get images data in e.target.files
        //an single example for using formData to post to server
      console.log('test');

        var form = new FormData()
        form.append('file[]', e.target.files[0])

        //do your post


      },
     onEditorFocus(editor) {
     window.test = editor;
            console.log('editor focus!', editor)
            console.log(this.content);
          },

         imageHandler(image, callback) {
          console.log('test');
            var data = new FormData();
            data.append('image', image);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', IMGUR_API_URL, true);
            xhr.setRequestHeader('Authorization', 'Client-ID ' + IMGUR_CLIENT_ID);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                var response = JSON.parse(xhr.responseText);
                if (response.status === 200 && response.success) {
                  callback(response.data.link);
                } else {
                  var reader = new FileReader();
                  reader.onload = function(e) {
                    callback(e.target.result);
                  };
                  reader.readAsDataURL(image);
                }
              }
            }
            xhr.send(data);
          }
    }
  }
</script>

<style>
  #image-upload-window{
    padding: 5px;
    width: 600px;
    left:25%;
    position: fixed;
    top:80px;
    display: none;
    border-radius: 15px;
    background-color: #ccc;
  }

  .input-container{
    padding:15px;
  }

  #close-button{
    position: absolute;
    right: 0;
    margin-top: -30px;
    cursor: pointer;
    font-weight: 800;
    padding:6px;
  }

</style>
