<template>
  <quill-editor ref="myTextEditor"
                v-model="content"
                :config="editorOption"
                @focus="onEditorFocus($event)">
  </quill-editor>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'

var IMGUR_CLIENT_ID = 'bcab3ce060640ba';
var IMGUR_API_URL = 'https://api.imgur.com/3/image';

function imageHandler(image, callback) {
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

  export default {

    props: ['initialContent'],
    data () {
      return {
        content: '',
        editorOption: {
            placeholder: 'Insert an image...',
            theme: 'snow',
            imageHandler: imageHandler
                }
            }
    },
    components: {
      quillEditor
    },
    methods : {
     onEditorFocus(editor) {
            console.log('editor focus!', editor)
            console.log(this.content);
          },
    }
  }
</script>

<style>

</style>
