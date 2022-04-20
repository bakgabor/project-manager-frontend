<template>
  <div>
    <json-view :json="jsonData" :boxed="false" />
  </div>
</template>

<script>
import JsonView from '@/components/views/JsonView'
export default {
  name: 'json-view-tutorial',
  components: { JsonView },
  data() {
    return {
      jsonData: {
        name: 'mike',
        age: 23,
        phone: '18552129932',
        address: ['AAA C1', 'BBB C2'],
        address1: ['AAA C1', 'BBB C2'],
        address2: ['AAA C1', 'BBB C2'],
        address3: ['AAA C1', 'BBB C2'],
        address4: ['AAA C1', 'BBB C2'],
        address5: ['AAA C1', 'BBB C2'],
        address6: ['AAA C1', 'BBB C2'],
        address7: ['AAA C1', 'BBB C2'],
        address8: ['AAA C1', 'BBB C2'],
        address9: ['AAA C1', 'BBB C2'],
        address0: ['AAA C1', 'BBB C2'],
      },
    }
  },
}
</script>

<style scoped></style>
