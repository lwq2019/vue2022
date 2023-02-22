<template>
	<el-form class="login100-form validate-form" ref="formRef" :model="ruleForms" :rules="rules">
		<el-form-item prop="telephone" class="wrap-input100 validate-input" data-validate = "电话格式错误">
			<el-input v-show="false" v-model="ruleForms.telephone"></el-input>
				<input class="input100" :class="ruleForms.telephone?'has-val':''" v-model="ruleForms.telephone" type="text">
				<span class="focus-input100" data-placeholder="手机号"></span>
		</el-form-item>
		<el-form-item prop="password" class="wrap-input100 validate-input" data-validate="密码格式错误">
			<el-input v-show="false" v-model="ruleForms.password"></el-input>
				<input class="input100" :class="ruleForms.password?'has-val':''" v-model="ruleForms.password" type="password">
				<span class="focus-input100" data-placeholder="密码"></span>
		</el-form-item>
		<el-form-item prop="password2" class="wrap-input100 validate-input" data-validate="密码格式错误">
			<el-input v-show="false" v-model="ruleForms.password2"></el-input>
				<input class="input100" :class="ruleForms.password2?'has-val':''" v-model="ruleForms.password2" type="password">
				<span class="focus-input100" data-placeholder="确认密码"></span>
		</el-form-item>
		<el-form-item prop="countDown">
				<el-row>
						<el-col :span="14">
								<el-input v-show="false" v-model="ruleForms.countDown" placeholder="验证码"></el-input>
								<input style="letter-spacing: 28px;font-size: larger;" class="input100" v-model="ruleForms.countDown">
								<input class="count-down">
						</el-col>
						<el-col :span="10" style="padding-left: 5px;">
								<el-button @click="sendCode" :disabled="sendBtndisabled">{{btnText}}</el-button>
						</el-col>
				</el-row>
		</el-form-item>
	</el-form>

<div class="container-login100-form-btn">
<div class="wrap-login100-form-btn">
	<div class="login100-form-bgbtn"></div>
	<button class="login100-form-btn" @click.stop.prevent="handleRegister">
		确认
	</button>
</div>
</div>
</template>

<script setup>
	import {reactive,ref} from 'vue';
	let sendBtndisabled=false;
	let btnText=ref('发送验证码');
	let formRef=ref(null);
	let ruleForms=reactive({});
	const validTelephone=(rule,value,callback)=>{
			if(!value){
					return callback(new Error('手机号不能为空！'))
			}
			const phoneReg=/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
			if(phoneReg.test(value)){
					callback();
			} else {
					callback(new Error('请输入正确的手机号！'));
			}
	}
	const validPwd=(rule,value,callback)=>{
			if(!value){
					return callback(new Error('密码不能为空！'))
			}
			const reg=/^[\w_-]{6,16}$/
			if(reg.test(value)){
					callback();
			} else {
					callback(new Error('密码只能是6到16位的字母或下划线！'));
			}
	}
	const validPwd2=(rule,value,callback)=>{
			if(!value){
					return callback(new Error('密码不能为空！'))
			}
			if(ruleForms.password===value){
					callback();
			} else {
					callback(new Error('密码只能是6到16位的字母或下划线！'));
			}
	}
	const countDown=(rule,value,callback)=>{
			if(!value){
					return callback()
			}
			ruleForms.countDown = value.toString().slice(0,4)
			callback();
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
		const rules = {
			telephone:[{required:true,trigger:'change',validator:validTelephone}],
			password:[{required:true,trigger:'change',validator:validPwd}],
			password2:[{required:true,trigger:'change',validator:validPwd2}],
			countDown:[{required:true,trigger:'change',validator:countDown}]
		}
		function handleRegister(){
			formRef.value.validate(valid=>{
				if(valid){
					// 提交后台验证密码正确性
					alert("密码修改成功！")
				} else {
					// 验证失败
				}
			})
		}
</script>
<style>
.count-down{
	width: 100%;
	background-image: linear-gradient(to right, #E7C737 0%, #28B35B 50%, transparent 0%);
	background-size: 40px 1px;
	background-repeat: repeat-x;
}
</style>
