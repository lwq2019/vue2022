<template>
	<div class="confirm-warpper">
			<input :ref="setInputRef" v-model="code" @blur="lose" type="number" />
			<div @click="focus" class="box">
					<div v-for="(item,index) in loopDiv" :key="index" class="item" :clas="{active:current == index}">{{code[index]}}</div>
			</div>
	</div>
</template>

<script>
	import {ref,watch} from 'vue'
	export default {
			name:'confirmCode',
			mounted(){
					focus();
			},
			props:['size'],
			setup(props,context){
				const loopDiv = new Array(props.size);
				let inputRef = ref(null);
				console.log("ss",inputRef)
				let code = ref("");
				let current = ref(0);
				let inputEl;
				function setInputRef(el){
					inputEl=el;
				}
				watch(code,(newVal)=>{
					code.value = newVal.toString().slice(0,props.size);
							current.value = code.value.length;
							context.emit("input",code.value);
				},{immediate:true});
				return {
					code,
					loopDiv,
					setInputRef,
					focus(){
						inputEl.focus();
							var len = code.value.length;
							// 如果已经输满，点击则聚焦在最后一个字符
							if(len == props.size){
									current.value = len - 1;
							}else{
									current.value = len;
							}
					},
					//input失焦触发，等于-1防止出现size符合偶然情况，失焦后又聚焦某一div
					lose(){
							current.value = -1;
					}
				}
			}
	}
</script>

<style scoped>
	@keyframes cursor{
			0%{
					opacity: 0;
			}
			50%{
					opacity: 1;
			}
			100%{
					opacity: 0;
			}
	}

	input{
			position: absolute;
			transform: scale(0);
	}
	.box{
			display: flex;
			justify-content: space-between;
			cursor: text;
	}
	.item{
			display:flex;
			justify-content: center;
			align-items: center;
			width: 80px;
			height: 80px;
			border: 1px solid hsla(0,0%,100%,.08);
			border-radius: 10px;
			background: rgba(0,0,0,.2);
			color: #fff;
			font-size: 30px;
			position: relative;
	}
	.item.active::before{
			content:"";
			position: absolute;
			top: 50%;
			left: 70%;
			transform: translate(-50%,-50%);
			height: 40px;
			width: 2px;
			background: #fff;
			animation: cursor 1s infinite;
	}
	
</style>