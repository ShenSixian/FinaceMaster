<template>
  <div id="app">
	<input type="button" value="search" @click.native="search()">
  </div>
</template>

<script>
export default {
  method: {
    search: function () {
      console.log(1)
    }
  }
}
</script>