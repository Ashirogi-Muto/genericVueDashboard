<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h1 class="title">Controls</h1>
          <div class="block">
            <label class="label">Name</label>
            <p class="control">
              <input class="input" type="text" placeholder="Text input">
            </p>
            <label class="label">Username</label>
            <p class="control has-icon has-icon-right">
              <input class="input is-success" type="text" placeholder="Text input" value="bulma">
              <span class="icon is-small">
                <i class="fa fa-check"></i>
              </span>
              <span class="help is-success">This username is available</span>
            </p>
            <label class="label">Email</label>
            <p class="control has-icon has-icon-right">
              <input class="input is-danger" type="text" placeholder="Email input" value="hello@">
              <span class="icon is-small">
                <i class="fa fa-warning"></i>
              </span>
              <span class="help is-danger">This email is invalid</span>
            </p>
            <label class="label">Subject</label>
            <p class="control">
              <span class="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </span>
            </p>
            <label class="label">Message</label>
            <p class="control">
              <textarea class="textarea" placeholder="Textarea"></textarea>
            </p>
            <p class="control">
              <label class="checkbox">
                <input type="checkbox">
                Remember me
              </label>
            </p>
            <p class="control">
              <label class="radio">
                <input type="radio" name="question">
                Yes
              </label>
              <label class="radio">
                <input type="radio" name="question">
                No
              </label>
            </p>
            <p class="control">
              <input type="file" @change="onFileChange">
            </p>
            <p>
              <div class="dropbox">
                <input type="file" multiple @change="onFileChange" accept="image/*" class="input-file">
                <p>Drag files to upload</p>
              </div>
            </p>
            <p class="control">
              <button class="button is-primary">Submit</button>
              <button class="button is-link">Cancel</button>
            </p>
          </div>
        </article>
      </div>

      <div class="tile is-parent is-5 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Colors</h1>
          <div class="block">
            <p class="control">
              <input class="input is-primary" type="text" placeholder="Primary input">
            </p>
            <p class="control">
              <input class="input is-info" type="text" placeholder="Info input">
            </p>
            <p class="control">
              <input class="input is-success" type="text" placeholder="Success input">
            </p>
            <p class="control">
              <input class="input is-warning" type="text" placeholder="Warning input">
            </p>
            <p class="control">
              <input class="input is-danger" type="text" placeholder="Danger input">
            </p>
          </div>
        </article>
        <article class="tile is-child box">
          <h1 class="title">Sizes</h1>
          <div class="block">
            <p class="control">
              <input class="input is-small" type="text" placeholder="Small input">
            </p>
            <p class="control">
              <input class="input" type="text" placeholder="Normal input">
            </p>
            <p class="control">
              <input class="input is-medium" type="text" placeholder="Medium input">
            </p>
            <p class="control">
              <input class="input is-large" type="text" placeholder="Large input">
            </p>
          </div>
        </article>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">States</h1>
          <div class="block">
            <h2 class="subtitle">Loading</h2>
            <p class="control is-loading">
              <input class="input" type="text" placeholder="Loading input">
            </p>
            <p class="control is-loading">
              <textarea class="textarea" placeholder="Loading textarea"></textarea>
            </p>
          </div>
          <div class="block">
            <h2 class="subtitle">Disabled</h2>
            <p class="control">
              <input class="input" type="text" placeholder="Disabled input" disabled>
            </p>
            <p class="control">
              <textarea class="textarea" placeholder="Disabled textarea" disabled></textarea>
            </p>
            <p class="control">
              <label class="checkbox is-disabled">
                <input type="checkbox" disabled>
                Remember me
              </label>
            </p>
            <p class="control">
              <label class="radio is-disabled">
                <input type="radio" name="question" disabled>
                Yes
              </label>
              <label class="radio is-disabled">
                <input type="radio" name="question" disabled>
                No
              </label>
            </p>
            <p class="control">
              <button class="button is-primary" disabled>Submit</button>
              <button class="button" disabled>Cancel</button>
            </p>
          </div>
        </article>
      </div>
    </div>
    <image-uploader></image-uploader>
  </div>

</template>

<script>
import Cleave from 'vue-cleave'
import axios from 'axios'
import ImageUploader from '../components/ImageUploader'

import 'cleave.js/dist/addons/cleave-phone.cn'

export default {
  components: {
    Cleave,
    ImageUploader
  },

  data () {
    return {
      demo: {
        value: '',
        rawValue: ''
      }
    }
  },

  methods: {
    onRawValueChanged (newVal) {
      this.demo.rawValue = newVal
    },
    onFileChange (e) {
      const files = e.target.files
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      let data = new FormData()
      for (var i = 0; i < files.length; i++) {
        const file = files.item(i)
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
  },

  watch: {
    'demo.value' (newVal, oldVal) {
      console.log('value: new ->', newVal, 'old ->', oldVal)
    },
    'demo.rawValue' (newVal, oldVal) {
      console.log('rawValue: new ->', newVal, 'old ->', oldVal)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.button {
  margin: 5px 0 0;
}

.control .button {
  margin: inherit;
}

.control.has-addons {
  @include mobile() {
    input {
      width: 100%;
    }

    input.is-expanded {
      flex-shrink: 1;
    }
  }
}

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
