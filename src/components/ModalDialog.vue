<template>
    <div class="modal" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id + 'Label'" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="id + 'Label'"><slot name="title">Bestätigung</slot></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body"><slot name="body">Soll die Aktion ausgeführt werden?</slot></div>
                <div class="modal-footer">
                    <button @click="onCancel" type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Nein</button>
                    <button @click="onConfirm" type="button" class="btn btn-sm btn-primary" data-dismiss="modal">Ja</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['id'],
    methods: {
      onConfirm() {
        this.$emit("confirm");
      },
      onCancel() {
        this.$emit("cancel");
      }
    }
  }
</script>

<style scoped>
</style>
