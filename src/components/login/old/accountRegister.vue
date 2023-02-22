<template>
    <layout>
        <el-form label-width="120px" ref="formRef" :model="ruleForms" :rules="rules" require-asterisk-position="left">
            <el-form-item label="用户名称：" prop="userName">
                <el-input v-model="ruleForms.userName" placeholder="请输入用户名！"></el-input>        
            </el-form-item>
            <el-form-item label="登录密码：" prop="password">
                <el-input type="password" v-model="ruleForms.password" placeholder="请输入登录密码！"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="password2">
                <el-input type="password" v-model="ruleForms.password2" placeholder="请输入您的确认密码！"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="ruleForms.email" placeholder="请输入您的邮箱！"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <group>
                    <input type="radio" v-model="ruleForms.sex" value="man">男
                    <input type="radio" v-model="ruleForms.sex" value="woman">女
                </group>
            </el-form-item>
            <el-form-item class="clearMarginBottom">
            <el-row>
                <el-button type="primary" @click="clickRegister">注册</el-button>
                <el-button type="reset" @click="resetRegister">重置</el-button>
            </el-row>
            </el-form-item>
        </el-form>
    </layout>
</template>
<script setup>
    import {reactive,ref} from 'vue';
import { useRouter } from 'vue-router';
    // import {ElForm,ElFormItem,ElInput,ElButton } from 'element-plus'
    const initRuleForms={}
    const formRef=ref(null);
    let ruleForms=reactive(initRuleForms);
    let router=useRouter();
    const checkPwd=(rule,value,callback)=>{
        if (!ruleForms.password) {
            return callback(new Error('密码不能为空！'))
        }
        if (!value) {
            return callback(new Error('确认密码不能为空！'))
        }
        if (ruleForms.password!=value) {
            return callback(new Error('两次密码必须一致！'))
        }
            callback();
    }
    const validEmail=(rule,value,callback)=>{
        if(!value){
            return callback(new Error('邮箱不能为空！'))
        }
        const reg=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if(reg.test(value)){
            callback();
        } else {
            callback(new Error('请输入正确的邮箱地址！'));
        }
    }
    const rules={
      userName:[{required:true,trigger:'blur',message:'用户名不能为空'}],
      password:[{required:true,trigger:'blur',message:'密码不能为空'}],
      password2:[{required:true,trigger:'blur',validator:checkPwd}],
      email:[{required:true,trigger:'blur',validator:validEmail}],
      sex:[{required:true,trigger:'blur',message:'性别不能为空'}],
    }
    
    function clickRegister(){
        console.log(ruleForms)
        formRef.value.validate(valid=>{
            if(valid){
                // 提交后台验证
                setTimeout(()=>{
                    router.push({name:"pwdLogin",query:{}})
                },1000);
            } else{
                // 验证失败
            }
        })
    }
    function resetRegister(){
        ruleForms=reactive(initRuleForms);
    }
</script>