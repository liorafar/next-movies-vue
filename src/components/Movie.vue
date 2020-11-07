<template>
    <div class="movieContainer">
        <img :src="imagePath" loading="lazy">
        <h2 class="movie-name">{{ title }}</h2>
    </div>
</template>

<script>
export default {
  name: 'Movie',
  props: {
    title: String,  
    imagePath: String,
  },
}
</script>

<style lang="scss" scoped>

    .movieContainer {
        vertical-align: top;
        display: inline-block;
        text-align: center;
        width: 166px;
        padding: 10px;

         h2 {
            color: white;
            font-size: 14px;
        }
    }
</style>