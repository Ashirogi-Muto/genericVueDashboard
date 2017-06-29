<template>
    <div>
        <p class="control">
          <input type="file" @change="onFileChange">
        </p>
        <p>
          <div class="dropbox">
            <input type="file" multiple @change="onFileChange" accept="image/*" class="input-file">
              <p>Drag files to upload</p>
          </div>
        </p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {

      data () {
        return {}
      },

      methods: {
        onFileChange (e) {
          const files = e.target.files
          const config = {
            headers: { 'content-type': 'multipart/form-data' }
          }
          let data = new FormData()
          for (var i = 0; i < files.length; i++) {
            const file = files.item(i)
            this.$emit('image-uploaded', file.name) /* Call this emit event after image is uploaded! */
            data.append('images[' + i + ']', file, file.name)
          }
          axios.post(`http://localhost:3000/image`, data, config)
                .then(response => {
                  console.log(response.data)
                })
                .catch(e => {
                  console.log(e)
                })
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
