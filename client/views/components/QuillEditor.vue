<template>
<div>
  <quill-editor ref="myTextEditor"
                v-model="content"
                :options="editorOption"
                @focus="onEditorFocus($event)">
  </quill-editor>
    <input type="file" id="getFile" @change="uploadFunction($event)" />
</div>

</template>

<script>
  import { quillEditor } from 'vue-quill-editor'

var IMGUR_CLIENT_ID = 'bcab3ce060640ba';
var IMGUR_API_URL = 'https://api.imgur.com/3/image';



  export default {

    props: ['initialContent'],
    data () {
      return {
        content: '',
        editorOption: {
          modules: {
                  toolbar: {

                    handlers: {
                      image: this.imageHandler1
                    }
                  }
              },
        }


            }
    },
    components: {
      quillEditor
    },
    methods : {
    imageHandler1(editor) {

      var value = prompt('What is the image URL');
      console.log(window.test)
      window.test.insertEmbed(3, 'image', value);
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

</style>
