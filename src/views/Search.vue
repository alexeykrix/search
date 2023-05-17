<template>
  <div class="container">
    <router-link :to="'/'" class="logo">SEARCH</router-link>
    <div class="group search">
      <input v-model="inp" type="text">
      <button @click="search">Search</button>
    </div>
    
    <div class="group tools tools-extend" v-if="mode === 'extended'">
      <input v-model="inpExactTerms" placeholder="must contain..." type="text">
      <input v-model="inpExcludeTerms" placeholder="exclude..." type="text">
      <input v-model="inpFileType" placeholder="file type..." type="text">
    </div>
    <div class="group tools">
      <button @click="mode = 'all'">All</button>
      <button @click="mode = 'images'">Images</button>
      <button @click="mode = 'extended'">Extended Search</button>
    </div>



    <div class="results" v-if="mode === 'all' || mode === 'extended'">
      <div class="result" v-for="item in results" :key="item.cacheId">
        <a :href="item.link" target="_blank" class="result-header">
          <img class="result-header__icon" :src="item.pagemap && item.pagemap.cse_thumbnail && item.pagemap.cse_thumbnail.length ? item.pagemap?.cse_thumbnail[0]?.src : ''" alt="">
          <span class="result-header__link" v-html="item.htmlFormattedUrl"></span>
        </a>
        <a :href="item.link" target="_blank" class="result-title" v-html="item.htmlTitle"></a>
        <p class="result-description" v-html="item.htmlSnippet"></p>
      </div>
    </div>

    <div class="results-images" v-if="mode === 'images'">
      <div class="image" v-for="item in results" :key="item.cacheId">
        <img class="image-img" :src="item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.length ? item.pagemap?.cse_image[0]?.src : ''" alt="">
        
        <a :href="item.link" target="_blank" class="result-header">
          <img class="result-header__icon" :src="item.pagemap && item.pagemap.cse_thumbnail && item.pagemap.cse_thumbnail.length ? item.pagemap?.cse_thumbnail[0]?.src : ''" alt="">
          <span class="result-header__link" v-html="item.htmlTitle"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getResults } from '../search'

const route = useRoute()
const router = useRouter()
let slug = ref('')
let inp = ref('')
let results = ref([])

let inpExactTerms = ref('')
let inpExcludeTerms = ref('')
let inpFileType = ref('')

let mode = ref('all')


const load = async (query, params) => {
  const response = await getResults(query, params)
  results.value = response.items
}

const search = () => {
  router.push('/search/' + inp.value)
  
  if (mode.value === 'extended') {
    let exactTerms = inpExactTerms.value
    let excludeTerms = inpExcludeTerms.value
    let fileType = inpFileType.value

    load(inp.value, { exactTerms, excludeTerms, fileType })
  } else {
    load(inp.value)
  }
  
}

onMounted(() => {
  slug.value = route.params.slug
  inp.value = route.params.slug


  const query = slug.value
  load(query)
})
</script>


<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 20px;
  min-height: 100vh;

  .logo {
    font-size: 3em;
    position: absolute;
    top: 2rem;
    left: 2rem;
    line-height: 1;
  }

  .group {
    display: flex;
    gap: 20px;

    &.search {
      width: 100%;
      justify-content: center;
    }
  }

  input {
    display: block;
    max-width: 600px;
    height: 50px;
    width: 100%;
    flex-shrink: 0;
    border-radius: 30px;
    border: 1px solid transparent;
    box-sizing: border-box;
    padding: 0.6em 2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    transition: border-color 0.25s;
    &:hover {
      border-color: #646cff;
    }
    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
    &.error {
      border-color: #df3e39;
    }
  }  
}

.tools-extend {
  width: 100%;
  padding-top: 20px;
  border-top: 2px solid #1a1a1a;

  input {
    width: auto;
  }
}

.results {
  margin-bottom: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  &-header {
    display: flex;
    gap: 20px;
    &__icon {
      width: 27px;
      height: 27px;
      display: block;
      object-fit: cover;
      border-radius: 50%;
    }
    &__link {
      width: 553px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  
  &-title {
    text-align: left;
    margin-top: 10px;
    font-size: 20px;
    width: 600px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-description {
    text-align: left;
  }
}

.results-images {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: auto;

  .image {
    width: 255px;
    &-img {
      width: 255px;
      height: 192px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 10px;
    }

    .result-header__link {
      width: 208px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

}

.tools {
  padding-bottom: 20px;
  border-bottom: 2px solid #1a1a1a;
  width: 100%;
  justify-content: center;
}
</style>