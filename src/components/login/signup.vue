<template>
    <el-form class="login100-form validate-form" ref="formRef" :model="ruleForms" :rules="rules">
			<el-form-item prop="telephone" class="wrap-input100 validate-input" data-validate = "手机号或邮箱格式错误">
				<el-input v-show="false" v-model="ruleForms.telephone"></el-input>
					<input class="input100" :class="ruleForms.telephone?'has-val':''" v-model="ruleForms.telephone" type="text">
					<span class="focus-input100" data-placeholder="手机号/邮箱"></span>
			</el-form-item>
      <el-form-item prop="password" class="wrap-input100 validate-input" data-validate="密码格式错误">
				<el-input v-show="false" v-model="ruleForms.password"></el-input>
					<input class="input100" :class="ruleForms.password?'has-val':''" v-model="ruleForms.password" type="password">
					<span class="focus-input100" data-placeholder="密码"></span>
			</el-form-item>
    </el-form>

<div class="container-login100-form-btn">
	<div class="wrap-login100-form-btn">
		<div class="login100-form-bgbtn"></div>
		<button class="login100-form-btn" @click.stop.prevent="handleLogin">
			登陆
		</button>
	</div>
</div>
</template>
  
  <script>
    import {reactive,ref} from 'vue';
    const validTelephone=(rule,value,callback)=>{
        if(!value){
            return callback(new Error('手机号/邮箱不能为空！'))
        }
				// /(^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$)|(^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$)/;
        const phoneReg=/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
				const emailReg=/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
        if(phoneReg.test(value) && emailReg.test(value)){
            callback();
        } else {
            callback(new Error('请输入正确的手机号/邮箱！'));
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

    export default {
			name:'signUp',
			components:{},
			setup(){
				const formRef=ref(null);
				return {
					formRef,
					ruleForms:reactive({telephone:'',password:''}),
					rules:{
						telephone:[{required:true,trigger:'change',validator:validTelephone}],
						password:[{required:true,trigger:'change',validator:validPwd}]
					},
					handleLogin:()=>{
						formRef.value.validate(valid=>{
							if(valid){
								// 提交后台验证密码正确性
								alert("登录成功！")
							} else {
								// 验证失败
							}
						})
					}
				}
			}
		}
  </script>
  
  