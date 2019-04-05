<template>
  <section class="container">
    {{ page }}
  </section>
</template>

<script>

import pageQuery from '~/queries/pages/GetPageByDevId.gql'
import { formatPageData } from '~/utils/formatters.js'

export default {
    data() {
        return {
            page: ""
        }
    },
    apollo: {
        page: {
            query: pageQuery,
            variables: {
                devId: 'dev-about'
            },
            update(queryData) {
                return formatPageData(queryData)
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
