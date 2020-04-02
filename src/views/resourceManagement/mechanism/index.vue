<template>
  <div class="index-box">
    <div class="header">
      <el-input
        v-model="input"
        placeholder="请输入机构名称查询"
        style="width:20%;margin-right: 15px;"
      ></el-input>
      <el-select
        v-model="orgTypeId"
        clearable
        :disabled="orgTypeIsDisabled"
        placeholder="请选择机构类型"
        style="width:20%;"
      >
        <el-option
          v-for="item in orgTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button class="btn1" @click="search">搜索</el-button>
      <el-button
        class="btn2"
        type="primary"
        plain
        @click="addJigou"
      >添加机构</el-button>
    </div>
    <div class="content">
      <el-table :data="mechanismList" style="width: 100%">
        <el-table-column
          prop="orgName"
          label="机构名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="legalPersonName"
          label="机构法人"
          width="180"
        ></el-table-column>
        <el-table-column prop="mobile" label="联系电话"></el-table-column>
        <el-table-column prop="orgTypeName" label="机构类型"></el-table-column>
        <el-table-column prop="address" label="机构地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="addJigou(scope.row)"
            >查看</el-button>
            <el-button
              v-if="scope.row.validFlag == 1"
              type="text"
              size="small"
              @click="stopDetail(scope.row)"
            >停用</el-button>
            <el-button
              v-else
              type="text"
              size="small"
              @click="stopDetail(scope.row)"
            >启用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
let me
export default {
  data() {
    return {
      mechanismList: [], // 机构类型列表数据
      totalNum: 1,
      input: '',
      pageNo: 1, // 当前页数
      pageSize: 10, // 每页条数
      orgTypeList: [], // 机构类型
      orgTypeId: '',
      orgTypeIsDisabled: false,
      type: '1',
      roleId: '', // 角色权限
    }
  },
  mounted() {
    me = this
    // let userdata = JSON.parse(window.sessionStorage.getItem("userInfo"));
    // me.input = userdata.pension.socialOrgId;
    let roleId = window.sessionStorage.getItem('roleId')
    let socialOrgId = window.sessionStorage.getItem('socialOrgId')
    if (roleId) {
      me.roleId = roleId
      if (me.roleId === 'admin' && !socialOrgId) {
        me.socialOrgId = ''
      } else {
        me.socialOrgId = socialOrgId
      }
    }
    me.findDicByTypeCode('equipment_brand')
    me.findByConditions()
    // this.findByOrgType()
    // let socialOrgId = window.sessionStorage.getItem('socialOrgId')
  },
  methods: {
    search() {
      me.pageNo = 1
      me.findByConditions()
    },
    // 启用/停用
    stopDetail(row) {
      let state
      if (row.validFlag == '1') {
        state = '停用'
      } else {
        state = '启用'
      }
      me.$confirm('确定要' + state + '么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          updateOrgStatus(JSON.stringify([row.id])).then(res => {
            me.findByConditions()
          })
        })
        .catch(() => {})
    },
    // 分页改变触发
    pageChange(num) {
      me.pageNo = num
      me.findByConditions()
    },
    // 添加机构
    addJigou(row) {
      this.$router.push({ path: 'detail', query: { id: row.id }})
    },
    // 机构列表
    findByConditions() {
      const limit = this.pageSize
      const start = (this.pageNo - 1) * limit
      let obj = {
        socialOrgId: me.socialOrgId,
        orgName: this.input,
        orgTypeId: this.orgTypeId
      }
      findByConditions(JSON.stringify([obj, start, limit])).then(res => {
        console.log(res, 56)
        me.mechanismList = res.body.items
        me.totalNum = Number(res.body.total)
      })
    },
    // 机构类型
    findDicByTypeCode() {
      findDicByTypeCode(JSON.stringify(['org_type'])).then(res => {
        res.body.forEach(item => {
          let obj = {
            label: item.dicName,
            value: item.id
          }
          me.orgTypeList.push(obj)
        })
      })
    },
    // findByOrgType() {
    //   findByOrgType(JSON.stringify([this.type]))
    //     .then(res => {
    //       console.log(res)
    //       res.body.forEach(item => {
    //         if (me.input == item.id) {
    //           me.input = item.orgName
    //         }
    //         console.log(me.input == item.id)
    //       })
    //     })
    //     .catch(res => {})
    // }
  }

}
</script>
<style lang="scss" scoped>
.index-box {
  padding: 16px;
  .header {
    display: flex;
    justify-content: flex-end;
    .btn1 {
      margin-left: 10px;
      background: #ff4071;
      color: #fff;
    }
    .btn2 {
      color: #ff4071;
      border: 1px solid #ff4071;
    }
  }
  .content {
  }
}
</style>
