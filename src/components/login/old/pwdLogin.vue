<template>
  <layout>
    <el-form label-width="120px" ref="ruleFormRef" :model="ruleForms" :rules="rules" require-asterisk-position="left">
      <el-form-item label="用户名：" prop="userName">
          <el-input v-model="ruleForms.userName" placeholder="请输入账号"></el-input>        
      </el-form-item>
      <el-form-item class="clearMarginBottom" label="密码：" prop="password">
            <el-input type="password" v-model="ruleForms.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="clearMarginBottom">
        <el-row>
            <el-col :span="8">
              <RouterLink :to="{name:'loginCommon',query:{type:'accountRegister',title:'账号注册'}}">注册账号</RouterLink>
            </el-col>
            <el-col :span="8">
              <RouterLink :to="{name:'loginCommon',query:{type:'phoneLogin',title:'手机号登录'}}">手机号登录</RouterLink>
            </el-col>
            <el-col :span="8" style="text-align:right">
              <RouterLink :to="{name:'loginCommon',query:{type:'resetPwd',title:'重置密码'}}">忘记密码</RouterLink>
            </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </layout>
</template>
  
  <script>
    import {reactive,ref} from 'vue';
    // import {ElForm,ElFormItem,ElInput,ElButton } from 'element-plus'
    
    export default {
	name:'pwdLogin',
	components:{},
setup(){
    const ruleFormRef=ref(null);
  return {
    ruleForms:reactive({userName:'',password:''}),
    handleLogin:()=>{
      ruleFormRef.value.validate(valid=>{
        if(valid){
          // 提交后台验证密码正确性
        } else {
          // 验证失败
        }
      })},
    rules:{
      userName:[{required:true,trigger:'blur',message:'用户名不能为空'}],
      password:[{required:true,trigger:'blur',message:'密码不能为空'}]
    },
    ruleFormRef:ref(null)
    }
}}
  </script>
  
  <style scoped>
  </style>
  