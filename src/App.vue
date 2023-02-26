<template>
  <div class="home w-auto h-screen bg-slate-400 bg-opacity-50 flex justify-center items-center ">
    <router-view />
  </div>
</template>

<style lang="less">
#app{
  ::-webkit-scrollbar{
    width: 4px;
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background-color: rgba(215, 215, 215, 0.4);
    &:hover{
      background-color: rgba(215, 215, 215, 0.6);
    }
  }
}
.home{
  background: no-repeat center/100% url('@/assets/bgImage.jpg'),;
}
</style>
