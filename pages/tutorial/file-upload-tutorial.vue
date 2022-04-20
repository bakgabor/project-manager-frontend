<template>
  <div>
    <section class="section is-main-section">
      <card-component title="File upload" icon="ballot">
        <file-upload-form />
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/default/card/CardComponent'
import FileUploadForm from '@/components/forms/FileUploadForm'

export default {
  name: 'file-upload-tutorial',
  components: { CardComponent, FileUploadForm },
}
</script>
<style scoped></style>
