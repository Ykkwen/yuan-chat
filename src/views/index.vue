<template>
    <div class="rounded-lg flex justify-center items-center" :style="{ width: '987px', height: '507px' }">
        <div class="w-1/12 h-full pt-3 flex justify-center rounded-l-lg bg-slate-700 bg-opacity-80">
            <img class="w-12 h-12 cursor-pointer" src="@/assets/avatar.jpg" alt="">
        </div>
        <div class="w-3/12 h-full pl-2 pr-2 flex flex-col items-center bg-slate-600 bg-opacity-80">
            <div class="w-full rounded-full flex text-center h-7 bg-slate-200 mt-3 mb-3 cursor-pointer">
                <div class="active rounded-l-full w-1/2">User</div>
                <div class="w-1/2 rounded-r-full">Group</div>
            </div>
            <div class="w-full pl-1 pr-2 flex-1 overflow-auto">
                <template v-for="i in 15">
                    <div
                        class="h-12 p-3 mb-1 flex cursor-pointer rounded-lg justify-start items-center bg-black bg-opacity-10 hover:bg-slate-900">
                        <img class="h-9" src="@/assets/avatar.jpg" alt="">
                        <div class="ml-3 text-base text-cyan-100">张三</div>
                    </div>
                </template>

            </div>
        </div>
        <div class="w-8/12 h-full bg-slate-400 bg-opacity-80">
            <div class="h-12 flex justify-between items-center pl-5 pr-5 pt-1 pb-1 border-b-2 border-b-slate-400">
                <div class="h-full flex items-center">
                    <img class="h-full rounded-full mr-3" src="@/assets/avatar2.jpg" alt="">
                    <div>前端已死</div>
                </div>
                <div
                    class="w-14 h-4/5 text-center text-white rounded-full leading-8 cursor-pointer bg-red-500 hover:bg-red-600">
                    退出
                </div>
            </div>
            <div class="w-full border-b-2 border-b-slate-400 pl-5 pr-5 overflow-auto" :style="{ height: '330px' }">
                <template v-for=" i in 6">
                    <div class="flex justify-start relative mt-3 mb-3">
                    <img class="h-7 rounded-full mr-3" src="@/assets/avatar1.jpg" alt="">
                    <div class="others bg-green-400 max-w-md pl-3 pr-3 text-sm rounded-lg" :style="{lineHeight: '28px'}">哈喽哈喽</div>
                    <div class="before-other"></div>
                </div>
                <div class="flex flex-row-reverse relative mt-3 mb-3">
                    <img class="h-7 rounded-full ml-3" src="@/assets/avatar.jpg" alt="">
                    <div class="me bg-green-400 max-w-md pl-3 pr-3 text-sm rounded-lg" :style="{lineHeight: '28px'}">你好啊</div>
                    <div class="before-me"></div>
                </div>
                <div class="flex flex-row-reverse relative mt-3 mb-3">
                    <img class="h-7 rounded-full ml-3" src="@/assets/avatar.jpg" alt="">
                    <div class="me bg-green-400 max-w-md pl-3 pr-3 text-sm rounded-lg" :style="{lineHeight: '28px'}">你好啊</div>
                    <div class="before-me"></div>
                </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.active {
    background-color: rgba(117, 166, 227, 0.5);
}
.before-other {
    width: 0;
    height: 0;
    border-right: 12px solid #4ade80;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    position: absolute;
    left: 32px;
    top: 6px;
    z-index: 3;
}
.before-me {
    width: 0;
    height: 0;
    border-left: 12px solid #4ade80;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    position: absolute;
    right: 32px;
    top: 6px;
    z-index: 3;
}
</style>