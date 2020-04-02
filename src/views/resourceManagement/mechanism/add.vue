<template>
  <div class="detail-box">
    <div class="header">
      <el-form label-width="20%">
        <el-row>
          <el-col :span="20">
            <el-form-item label="请选择机构类型：">
              <el-radio-group v-model="radio">
                <el-radio
                  v-for="item in radioGroup"
                  :key="item.value"
                  :label="item.value"
                  :disabled="isDisabledOrgType"
                  @change="radioChange(item.value)"
                >{{ item.label }}</el-radio>

              </el-radio-group>
              <!-- <el-radio v-model="jigouType" label="1">运营商</el-radio>
          <el-radio v-model="jigouType" label="2">养老设施</el-radio> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="请选择注册类型：">
              <el-radio-group v-model="radio1">
                <el-radio
                  v-for="item in radioGroup1"
                  :key="item.value"
                  :label="item.value"

                  @change="radioChange1(item.value)"
                >{{ item.label }}</el-radio>

              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
let me
export default {
  data() {
    return {
      id: '', // 机构id
      radioGroup: [],
      radioGroup1: [],
      jigouType: '37', // 机构类型
      zheceType: '39', // 注册类型
      radio: '37',
      radio1: '39',
      isDisabledOrgType: false
    }
  },
  created() {
    me = this
    let id = this.$route.query.id
    this.id = id
  },
  mounted() {
    me.findDicByTypeCode()
    me.findtype()
    let roleId = window.sessionStorage.getItem('roleId')
    let socialOrgId = window.sessionStorage.getItem('socialOrgId')
    if (roleId === 'admin' && !socialOrgId) {
      this.isDisabledOrgType = false
    } else {
      this.isDisabledOrgType = true
      if (!this.id) {
        this.radio = '38'
      }
    }
    if (this.id) {
      me.selDetail()
    }
  },
  methods: {
    radioChange(id) {
      me.radio = id
    },
    radioChange1(id) {
      me.radio1 = id
    },
    // 查询注册类型
    findtype() {
      findDicByTypeCode(JSON.stringify(['org_reg_type'])).then(res => {
        console.log(res, 76)
        res.body.forEach(item => {
          let obj = {
            label: item.dicName,
            value: item.id
          }
          me.radioGroup1.push(obj)
        })
      })
    },
    // 查询详情
    selDetail() {
      getByOrgId(JSON.stringify([this.id])).then(res => {
        me.radio = res.body.orgTypeId || ''
        me.radio1 = res.body.rigistTypeId
        me.id = res.body.id
      })
    },
    // 查询机构类型
    findDicByTypeCode() {
      findDicByTypeCode(JSON.stringify(['org_type'])).then(res => {
        res.body.forEach(item => {
          let obj = {
            label: item.dicName,
            value: item.id
          }
          me.radioGroup.push(obj)
        })
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.detail-box {
  .header {
    width: 100%;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
