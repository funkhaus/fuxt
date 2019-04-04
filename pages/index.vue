<template>
  <section class="container">
    <div v-for="post in posts.edges">
      {{ posts }}
    </div>
  </section>
</template>

<script>

import gql from 'graphql-tag'
import postQuery from '~/queries/Post.gql'

export default {
    data() {
        return {
            posts: ""
        }
    },
    apollo: {
        posts: {
            query: postQuery,
            variables: {
              first: 1,
            }
        }
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}


</style>
