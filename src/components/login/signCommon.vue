<template>
  <layout class="container-login100">
		<div class="wrap-login100">
			<span class="login100-form-title p-b-26">
				{{ query.title }}
			</span>
			<span class="login100-form-title p-b-48">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-zhuce"></use>
				</svg>
			</span>
			<Signin v-if="query.type=='signin'"></Signin>
			<ChangePwd v-else-if="query.type=='change'"></ChangePwd>
			<Signup v-else></Signup>

		<!--bootstrap用-->
		<div class="text-center p-t-115">
			<span class="txt1">
				{{query.type=='signup'?'没有账号|':'已有账号|'}}
			</span>
			<a class="txt2"  @click="changePage">
				{{query.type=='signup'?'注册':'登录'}}
			</a>
			<a v-if="query.type=='signup'" class="txt2"  @click="changePage('change')" style="margin-left: 10px;">
				忘记密码
			</a>
		</div>
		</div>
  </layout>
</template>
  
  <script>
		import '@/css/sign.css'
		import '@/css/bootstrap.min.css'
		import '@/css/font_1554827_uixfzwgne2o/iconfont.js'
		import { reactive } from 'vue'
		import { useRoute } from 'vue-router'
		import Signup from '@/components/login/signup.vue'
		import Signin from '@/components/login/signin.vue'
		import ChangePwd from '@/components/login/changePwd.vue'

    export default {
			name:'signCommon',
			components:{Signup,Signin,ChangePwd},
			
			setup(){
				const router = useRoute();
				let query = reactive(router.query)
				return {
					query,
					changePage:(val)=>{
						if (val=='change'){
							query.type='change'
							query.title='更新密码'
						} else if (query.type=='signup') {
							query.type='signin'
							query.title='注册'
						} else {
							query.type='signup'
							query.title='登录'
						}
					}
				}
			}
		}
  </script>
	<style>
	.txt2:hover{
		color: #007bff;
		text-decoration: underline !important;
    cursor: pointer !important;
	}
</style>
  
  