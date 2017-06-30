<template>
  <quill-editor ref="myTextEditor"
                v-model="content"
                :config="editorOption">
  </quill-editor>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'

  export default {

    props: ['initialContent'],
    data () {
      return {
        content: '',
        editorOption: {}
      }
    },
    components: {
      quillEditor
    }
  }
</script>

<style>

</style>