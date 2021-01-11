<template>
  <a data-test="post" class="panel-block">
    <div>
      <a>{{ post.title }}</a>
      <div>{{ post.created.format('Do MMM')}}</div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Post } from './Types'

export default defineComponent({
  props: {
    post: {
      // type: Object as () => Post,
      type: Object as () => Post,
      required: true
    }
  }
})
</script>
