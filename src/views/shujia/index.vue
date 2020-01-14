<template>
    <div class ='shujiaContainer'>
        <div class="true" v-if = 'list'>
            <p class="title">我的书架 :  共 {{length}}本书</p>
            <div class="center">
                <info :flag = flag :styles ='style' ></info>
            </div>
        </div>
        <div class="false" v-if ='!list'>
            <p class="title">书架里什么都没有，快去添加你你换的书吧!</p>
            <div class="push" @click ='gopush'>
                <span>+</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
import info from '../paihang/info'
export default {
    components : {info}, 
    data(){
        return {
            flag : false ,
            style:'width:100%;top:auto;bottom:auto;left:auto;right:auto;overflow:auto;position:static;',
            list : [],
            length : 0
        } 
    },
    methods : {
        gopush(){
            this.$router.push('/paihang')
        },
        ...mapMutations({
            setid : 'SET_ID'
        })
    } ,
    created(){
        let id = JSON.parse(localStorage.getItem('like'))
        this.list = id 
        this.length = id.length
        console.log(id)

        this.setid(id)
    }
}
</script>
<style lang="less" scoped>
.shujiaContainer{
    margin-top: 70px;
    .true {
        .title {
            font-size: 28px;
            padding-left: 60px;
            padding-top:30px;
        }
        .center {
            height: 100px;
        } 
    }
    .false{
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .title {
            white-space:nowrap;
        } 
        .push{
            font-size: 200px;
            text-align: center;
        }
    }
}
</style>