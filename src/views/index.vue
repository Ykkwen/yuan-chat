<template>
	<div class="rounded-lg flex justify-center items-center h-full w-screen">
		<div class="w-16 h-full pt-3 flex flex-col items-center rounded-l-lg bg-slate-700 bg-opacity-80">
			<img class="w-12 h-12 cursor-pointer" src="@/assets/avatar.jpg" alt="" @click="openDialog">
			<el-icon color="#fff" class="side-icon" @click="currentType = 'USER'" size="40">
				<ChatDotRound />
			</el-icon>
			<el-icon color="#fff" class="side-icon" @click="currentType = 'USER'" size="40">
				<User />
			</el-icon>
			<el-icon color="#fff" class="side-icon" @click="currentType = 'GROUP'" size="40">
				<!-- <HomeFilled /> -->
				<House />
			</el-icon>
			<el-icon color="#fff" class="side-icon" size="40">
				<Search />
			</el-icon>
		</div>
		<div class="w-3/12 h-full pl-2 pr-2 flex flex-col items-center bg-slate-600 bg-opacity-80">
			<div class="w-11/12 rounded-full flex text-center h-7 bg-slate-200 mt-3 mb-3 cursor-pointer">
				<el-input type="text">
					<template #prepend>
						<el-icon>
							<Search />
						</el-icon>
					</template>
				</el-input>
			</div>
			<sideList :type="currentType" />
		</div>
		<div class="flex flex-col w-9/12 h-full bg-slate-400 bg-opacity-80">
			<router-view></router-view>
		</div>
	</div>
	<infoModel ref="infoDialog" title="编辑资料" :form="userInfo" />
</template>

<script setup lang="ts">
import infoModel from './infoModel.vue';
import sideList from './sideList.vue';
import { Ref, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { LoginFormType, UserInfo } from '@/api/user';
const userStore = useUserStore()
const currentType = ref('USER')
const infoDialog = ref()
const userInfo:Ref<UserInfo> = ref({
	avatar: '@/assets/avatar1.jpg',
	nickname: 'Yuan',
	password: '123',
	email: ''
})
const {user} = storeToRefs(userStore) 
console.log(user)
userInfo.value = user.value
const openDialog = () => {
	infoDialog.value.open()
}
</script>

<style lang="less" scoped>
.input-with-select .el-input-group__prepend {
	background-color: var(--el-fill-color-blank);
}

.active {
	background-color: rgba(117, 166, 227, 0.5);
}
.side-icon{
	cursor: pointer;
	margin-top: 15px;
}
</style>