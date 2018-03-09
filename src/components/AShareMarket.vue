<template>
  <div id>
    <h2>A股市场的信息概览</h2>
    <div class="button">
      <el-input v-model="search" placeholder="请输入需要查询的自选股代码"></el-input>
      <el-button @click="searchShare">查找</el-button>
    </div>
    <el-table :data="shareDatas" border style="width: 100%">
      <el-table-column prop="name" label="股票名称"></el-table-column>
      <el-table-column prop="code" label="代码"></el-table-column>
      <el-table-column prop="latestprice" label="最新价格"></el-table-column>
    </el-table>
  </div> 
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      shareDatas: [],
      search: ''
    }
  },
  methods: {
    searchShare: function () {
      // search
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // LoadData
      var _this = this
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/ajax/share_data',
        dataType: 'JSON',
        success: function (data) {
          _this.shareDatas = data['data']
        }
      })
    })
  }
}
</script>