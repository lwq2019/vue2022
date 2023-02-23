<template>
	<layout class="container-login100">
        <div class="wrap-login100">
            <el-form label-width="120px" ref="formRef" :model="formInfo" :rules="rules" require-asterisk-position="left">
                <el-form-item label="图像关键字：" prop="content">
                    <el-input v-model="formInfo.content" placeholder="请输入图像关键字"></el-input>        
                </el-form-item>
                <el-form-item label="张数：" prop="number">
                    <el-input type="number" v-model.number="formInfo.number" :min="1" :max="5" :step="1"></el-input>
                </el-form-item>
            </el-form>
            <el-button style="width:100%" type="primary" @click="clickGenerate">生成图像</el-button>
            <div>
                <h3>结果展示</h3>
                <ul>
                    <ol v-for="(item,index) in resData.pictureList" :key="index">
                        <img :src="item.url">
                        <!--el-input type="text" v-model="item.prompt" ></!--el-input>
                        <el-button @click="againGenerate('again',item.prompt,item.url)">重新生成图像</el-button>
                        <el-button-- @click="againGenerate('variations',item.prompt,item.url)">图像变体</el-button-->
                    </ol>
                </ul>
            </div>
            <div v-if="false">
                <h3>重新生成的图像</h3>
                <ul>
                    <ol v-for="(item,index) in resData.picture2List" :key="index">
                        <img :src="item.url">
                    </ol>
                </ul>
            </div>
        </div>
	</layout>
</template>
<script>
    import {ref,reactive,inject} from 'vue'
    import { getCurrentInstance} from 'vue'
export default {
	name:'pictureSearch',
	setup(){
        const $axios = inject("$axios");
        const formRef=ref(null);
        let formInfo=reactive({content:'',number:2});
        let resData=reactive({resList:[],pictureList:[]});
        const { proxy } = getCurrentInstance();
        function generatePicture(){
            proxy.$loading.show()
            resData.pictureList=reactive([]);
            $axios({
                url:'/openai/v1/images/generations',
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
        function againGenerate(type,prompt, imgUrl){
            proxy.$loading.show()
            resData.picture2List=reactive([]);
            const url=type=='again'?'/openai/v1/images/edits':'/openai/v1/images/variations'
            $axios({
                url,
                method:'post',
                data:{
                    "image":imgUrl,
                    "prompt":prompt,
                    "n":1,
                    "size":"1024x1024"
                }
            }).then((res)=>{
                resData.picture2List=reactive(res.data.data);
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
            againGenerate:(type,prompt,imgUrl)=>{
                if (prompt && imgUrl){
                    againGenerate(type,prompt, imgUrl)
                }
            }
		}
	}
}
</script>
<style scoped>
img{
    width: 300px;
    height: 300px;
}
ol {
    float: left;
}
</style>