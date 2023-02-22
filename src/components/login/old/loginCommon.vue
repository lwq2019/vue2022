<template>
	<layout>
			<RouterLink to="/pwdLogin">《&nbsp;返回</RouterLink>
			<h2 class="title">{{title}}</h2><br>
			<PhoneLogin v-if="type==='phoneLogin'"></PhoneLogin>
			<AccountRegister v-else-if="type==='accountRegister'"></AccountRegister>
			<ResetPwd v-else-if="type==='resetPwd'"></ResetPwd>
			<div v-else>内容未找到</div>
			<slot></slot>
	</layout>
</template>
<script>
import { useRoute } from 'vue-router'
import PhoneLogin from '@/components/login/old/phoneLogin.vue'
import AccountRegister from '@/components/login/old/accountRegister.vue'
import ResetPwd from '@/components/login/old/resetPwd.vue'
export default {
	name:'loginCommon',
	components:{PhoneLogin,AccountRegister,ResetPwd},
	setup(){
		const router = useRoute();
		
		return router.query
	}
}
</script>
<style scoped>
a {
	text-decoration: none;
}
.title{
	text-align: center;
	margin: 0;
}
</style>