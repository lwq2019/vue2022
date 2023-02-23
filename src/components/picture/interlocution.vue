<template>
	<layout class="container-login100">
        <el-form ref="formRef" :model="formInfo" :rules="rules" require-asterisk-position="left">
            <el-form-item label="提问关键字：" prop="content">
                <el-input v-model="formInfo.content" placeholder="请输入问题"></el-input>        
            </el-form-item>
      </el-form>
        <el-button style="width:100%" type="primary" @click="clickGenerate">提问</el-button>
        <h3>结果展示</h3>
        <div>
            <ul>
                <li v-for="(item,index) in resData.resList" :key="index">{{ item.text }}</li>
            </ul>
        </div>
	</layout>
</template>
<script>
    import {ref,reactive,inject,getCurrentInstance} from 'vue'
    export default {
        name:'interLocution',
        setup(){
            const $axios = inject("$axios");
            const formRef=ref(null);
            let formInfo=reactive({content:''});
            let resData=reactive({resList:[]});
            const { proxy } = getCurrentInstance();
            function generateAnswers(){
                proxy.$loading.show()
                resData.resList=reactive([]);
                $axios({
                    url:'https://api.openai.com/v1/completions',
                    // url:'https://chat.openai.com/backend-api/conversation',
                    method:'post',
                    data:{"model":"davinci","prompt":formInfo.content,"temperature":0.4,"max_tokens":64,"top_p":1,"frequency_penalty":0,"presence_penalty":0}
                }).then((res)=>{
                    resData.resList=reactive(res.data.choices);
                }).catch((e)=>{
                    console.error(e)
                }).finally(()=>{
                    proxy.$loading.hide()
                });
            }
            return {
                formRef,
                formInfo,
                resData,
                rules:{
                    content:[{required:true,trigger:'blur',message:'提问关键字不能为空'}]
                },
                clickGenerate:()=>{
                    formRef.value.validate(valid=>{
                        if(valid){
                                                generateAnswers();
                        } else {
                        // 验证失败
                        }
                    })
                },
            }
        }
    }
</script>
<style scoped>
</style>