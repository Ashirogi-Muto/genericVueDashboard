<template>
    <div>
        <p class="control">
          <input type="file" @change="onFileChange">
        </p>
        <p>
          <div v-if="showDragDrop" class="dropbox">
            <input type="file" multiple @change="onFileChange" accept="image/*" class="input-file">
              <p>Drag files to upload</p>
          </div>
        </p>
        <p>Files uploaded: {{uploadCount}} of {{fileCount}}</p>
          
    </div>
</template>

<script>

    import product from '../../store/index.js'
    import axios from 'axios'
    let temp_url_data
    export default {
      props: ['showDragDrop'],

      data () {
        return {
          fileCount: 0,
          uploadCount: 0 ,
          
          
        }
      },

      methods: {
        onFileChange (e) {
          this.fileCount = 0
          this.uploadCount = 0
          const files = e.target.files
          const config = {
            headers: { 'content-type': 'multipart/form-data' }
          }

          this.fileCount = files.length
          for (var i = 0; i < files.length; i++) {
            const file = files.item(i)
            let data = new FormData()
            data.append('file', file)

            axios.post(`http://localhost:3000/image-upload-s3`, data, config)
                .then(response => {
                  this.$emit('image-uploaded', file.name)
                  this.uploadCount++
                  temp_url_data = response.data ;
                  product.dispatch('loadImageData' , temp_url_data) ;
                 // console.log(this.img_url)
                })
                .catch(e => {
                  console.log(e)
                })
          }
        }
      }
}
</script>

<style>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

</style>
