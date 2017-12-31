<template>
    <textarea
            :id="id"
            :name="name"
            :value="value"
            :placeholder="placeholder"
            :rows="rows"
            :cols="cols"
            class="form-control"
            @dragover.prevent
            @dragenter.prevent
            @drop.prevent="drop"
            @input="update"
    ></textarea>
</template>

<script>
  import {http} from '@/utils/http'

  export default {
    props: {
      id: String,
      name: String,
      value: String,
      placeholder: String,
      rows: {
        type: [Number, String],
        default: 10,
      },
      cols: {
        type: [Number, String],
        default: 30,
      },
      url: String,
    },

    methods: {
      drop(event) {
        let file = event.dataTransfer.files[0];

        let placeholder = '![Uploading ' + file.name + ']\n';

        event.target.value = event.target.value + placeholder;

        let form = new FormData();

        form.append('file', file);

        http.post(this.url, form).then(({data}) => {
          event.target.value = event.target.value.replace(placeholder, `![${data.name}](${data.location})\n`);
        }).catch((error) => {
          let message = '![Failed to upload '
          if (error.response.data.error) {
            message += '- ' + error.response.data.error + ' - '
          }
          event.target.value = event.target.value.replace(placeholder, message + file.name + ']\n');
        });

      },

      update(event) {
        this.$emit('input', event.target.value);
      },
    }
  }
</script>