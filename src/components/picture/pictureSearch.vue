<template>
	<layout>
        <el-form label-width="120px" ref="formRef" :model="formInfo" :rules="rules" require-asterisk-position="left">
            <el-form-item label="图像关键字：" prop="content">
                <el-input v-model="formInfo.content" placeholder="请输入图像关键字"></el-input>        
            </el-form-item>
            <el-form-item label="张数：" prop="number">
                <el-input type="number" v-model.number="formInfo.number" :min="1" :max="10" :step="1"></el-input>
            </el-form-item>
      </el-form>
        <el-button style="width:100%" type="primary" @click="clickGenerate">生成图像</el-button>
        <h3>结果展示</h3>
        <div>
            <ul>
                <li v-for="(item,index) in resData.resList" :key="index">{{ item.text }}</li>
            </ul>
        </div>
        <div>
            <ul>
                <ol v-for="(item,index) in resData.pictureList" :key="index">
                    <img :src="item.url">
                </ol>
            </ul>
        </div>
	</layout>
</template>
<script>
//import API from "@/api/axiosInstance"
    import {ref,reactive} from 'vue'
    import axios from "axios";
    import { getCurrentInstance} from 'vue'
export default {
	name:'pictureSearch',
	setup(){
        const formRef=ref(null);
        let formInfo=reactive({content:'',number:2});
        let resData=reactive({resList:[],pictureList:[]});
        const { proxy } = getCurrentInstance();
        function generatePicture(){
            proxy.$loading.show()
                    resData.pictureList=reactive([]);
				axios({
                    url:'https://api.openai.com/v1/images/generations',
                    method:'post',
                    data:{
                        "prompt":formInfo.content,
                        "n":formInfo.number,
                        "size":"1024x1024"
                    }
                }).then((res)=>{
                    resData.pictureList=reactive(res.data.data);
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
                content:[{required:true,trigger:'blur',message:'图像关键字不能为空'}],
                number:[{required:true,trigger:'blur',message:'密码不能为空'}]
            },
            clickGenerate:()=>{
                formRef.value.validate(valid=>{
                    if(valid){
                        generatePicture();
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
img{
    width: 500px;
    height: 500px;
}
ol {
    float: left;
}
</style>