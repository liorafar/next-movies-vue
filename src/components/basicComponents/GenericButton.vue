<template>
    <div class="buttonContainer" @click="onClick">
      <div class="buttonLabel">{{ label }}</div>
    </div>
</template>

<script>
export default {
  name: 'GenericButton',
  props: {
    label: String 
  },
  methods: {
    onClick(){
          this.$emit('clicked');
      }
  }
}
</script>

<style lang="scss" scoped>
  .buttonContainer{
    position: relative;
    cursor: pointer;

     .buttonLabel{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: Lato;
      }
  }
 
    
</style>