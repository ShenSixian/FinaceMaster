<template>
  <div id="app">
    <h2>自选股列表</h2>
    <div class="button">
      <el-input v-model="search" placeholder="请输入需要查询的自选股代码"></el-input>
      <el-button @click="searchShare">查找</el-button>
      <p></p>   <!-- ? -->
      <el-input v-model="add" placeholder="请输入需要添加的自选股代码"></el-input>
      <el-button @click="addShare">添加</el-button>
    </div>
    <el-table :data="sharesData" border style="width: 100%">
      <el-table-column prop="name" label="股票名称"></el-table-column>
      <el-table-column prop="code" label="代码"></el-table-column>
      <el-table-column prop="latestprice" label="最新价格"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteShare(scope.$index, sharesData)" type="text" size="small">
          移除
          </el-button>
       </template>
      </el-table-column>
    </el-table>
  </div> 
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      username: 'admin',
      add: '',
      search: '',
      input: '',
      sharesData: []
    }
  },
  methods: {
    addShare: function () {
      if (this.add.length === 6) {
        // if already exist in the user's share table
        if (this.isExistence(this.add) === -1) {
          // not exist, get detail information from the server
          var _this = this
          $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/ajax/user_shares',
            data: {'order': 'add', 'username': _this.username, 'code': _this.add},
            dataType: 'JSON',
            success: function (data) {
              if (data['status'] === 'OK') { // add successfully
                _this.sharesData.splice(0, 0, data['values'])
              } else {
                alert('Code Error!')
              }
            }
          })
        } else {
          alert('Error! already exist!')
        }
      } else {
        alert('Code Error!')
      }
    },
    deleteShare: function (index, rows) {
      var _this = this
      var code = rows[index]['code']
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/ajax/user_shares',
        data: {'order': 'delete', 'username': _this.username, 'code': code},
        dataType: 'JSON',
        success: function (data) {
          if (data['status'] === 'OK') { // delete successfully
            rows.splice(index, 1)
          } else {
            alert('Delete Error!')
          }
        }
      })
    },
    searchShare: function () {
      var index = this.isExistence(this.search)
      if (index !== -1) {
        // jump to the detail of the share
      } else {
        alert('Not exist!')
      }
    },
    isExistence: function (code) { // return share position
      for (var i = 0; i < this.sharesData.length; i++) {
        if (this.sharesData[i]['code'] === code) {
          return i
        }
      }
      return -1
    }
  },
  mounted: function () {
    // Load list of user's shares
    var _this = this
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8888/ajax/user_shares',
      data: {'order': 'load_data', 'username': _this.username},
      dataType: 'JSON',
      success: function (data) {
        if (data['status'] === 'OK') {
          _this.sharesData = data['values']
        }
      }
    })
  }
}
</script>

<style>
.button {
  width: 50%;
  padding: 10px 10px 10px 10px;
}
</style>