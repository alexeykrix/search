<template>
  <div class="container">
    <div class="logo">SEARCH</div>
    <input :class="{ error: inputError }" v-model="inputVal" type="text">

    <div class="group">
      <button @click="goToSearch">Google Search</button>
      <button @click="lucky">I'm Feeling Lucky</button>
    </div>

  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { getResults } from '../search'

const router = useRouter()
const inputVal = ref('')
let inputError = ref(false)


const validateInput = () => {
  const val = inputVal.value
  if (val.length > 0) {
    inputError.value = false
    return true
  }
  inputError.value = true
  return false
}

const goToSearch = () => {
  if (!validateInput()) return 
  router.push('/search/' + inputVal.value)
}

const lucky = async () => {
  if (!validateInput()) return 

  const results = await getResults(inputVal.value)
  const reult = results.items[0]
  const link = reult.link

  window.open(link, '_blank');
}




</script>

<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 20px;


  .logo {
    font-size: 3em;
  }

  .group {
    display: flex;
    gap: 20px;
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



</style>