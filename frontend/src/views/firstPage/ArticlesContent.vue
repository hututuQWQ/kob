<!-- @format -->

<template>
  <v-md-preview :text="text"></v-md-preview>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "@/utils/axios.js";

export default {
  setup() {
    const route = useRoute();

    const articleId = route.params.articleId;

    let text = ref('');

    onMounted(() => {
      axios.get('/article/getArticleById/', {
        params: {
          articleId
        }
      }).then(resp => {
        text.value = resp.article_content ;
      }).catch(resp => {
        console.error(resp);
      });
    })

    return {
      text,
    };
  }
};
</script>

<style scoped></style>
