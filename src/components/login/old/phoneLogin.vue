<template>
    <layout>
        <el-form label-width="120px" :model="formMode" :rules="rules" ref="formRef">
            <el-form-item label="手机号：" prop="phone">
                <el-input v-model="formMode.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证码：" prop="countDown">
                <el-row>
                    <el-col :span="10">
                        <el-input v-model="formMode.countDown" placeholder="验证码"></el-input>
                    </el-col>
                    <el-col :span="14" style="padding-left: 5px;">
                        <el-button @click="sendCode" :disabled="sendBtndisabled">{{btnText}}</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%" type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
        <!-- <a href="tel:13632784599##">移动WEB页面JS一键拨打号码咨询功能</a> 
        <a href="sms:13632784599##">发送短信功能</a>-->
    </layout>
</template>
<script setup>
    import {reactive,ref} from 'vue'
    // window.location.href = 'tel:13632784599'
// window.location.href = 'sms:13632784599'
    const formMode=reactive({phone:'',countDown:'',phone2:''});
    let sendBtndisabled=false;
    const checkPhone=(rule,value,callback)=>{
        if(!value){
            return callback(new Error('手机号不能为空！'))
        }
        const reg=/^1[3|4|5|7|8]\d{9}$/;
        if(reg.test(value)){
            callback();
        } else {
            callback(new Error('请输入正确的手机号！'));
        }
    }
    const rules=reactive({
        phone:[{required:true,trigger:'change',validator:checkPhone}],
        countDown:[{required:true,message:'验证码不能为空'}]
    });
    const formRef=ref(null);
    let btnText=ref('发送验证码');
    const handleLogin=()=>{
        formRef.value.validate(valid=>{
            if(valid){
                // 提交后台验证
            } else{
                // 验证失败
            }
        })
    }
    const sendCode=()=>{
        formRef.value.validateField('phone',msg=>{
            if (!msg){
                btnText
            } else {
                // 发送验证码
                sendCodeBtnFunc();
            }
        })
    }
    const sendCodeBtnFunc=()=>{
        sendJSONPData();
        let time = 60;
        sendBtndisabled=true;
        let timer=setInterval(()=>{
            time--;
            btnText.value=`${time}s后重新发送`;
            if (time===0){
                sendBtndisabled=false;
                btnText.value='重新发送';
                clearInterval(timer);
            }
        },1000);
    }
    
    function sendJSONPData(){
        function getJsonpData(data){
            if (!data) return;
            console.log("数据获取成功",data)
        }
        var script=document.createElement("script")
        // script.src=`http://www.900ppt.com/api/login/getSmsCode?callback=getJsonpData&phone=${formMode.phone}&easy=1`;
        script.src=`https://818ps.com/site-api/send-tel-login-code?callback=getJsonpData&num=${formMode.phone}`;
        document.body.appendChild(script);
        script.onload=function(){
            document.body.removeChild(script)
        }
        getJsonpData()
    }
</script>