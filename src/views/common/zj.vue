<template>
  <transition name ='test-fade'>
    <div>
       
         <div class="zj">
                
                <div class="wrapper">
                <ul>
                    <li :data-id ='item.link' v-for ='item in zhangj' :key ='item.title'>
                        {{item.title}}
                    </li>
                </ul>
                </div>
        </div>
        
    </div>
     </transition>
</template>
<script>
export default {
    props : ['zhangj']
}
</script>
<style lang="less" scoped>
.zj {
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    overflow: auto;

    ul {
        overflow-y: auto;
        li {
            height: 70px;
            line-height: 70px;
            padding-left: 30px;
            font-size: 20px;
            border-bottom: 1px solid #eee;
        }
    } 
} 
</style>

<style lang="less">
    .test-fade-enter {
        transform: translateY(100%);
        opacity: 1;
    } 
    .test-fade-leave-to {
        transform: translateY(100%);
    } 
    .test-fade-enter-active,
    .test-fade-leave-active {
        transition: all .5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    } 
</style>
