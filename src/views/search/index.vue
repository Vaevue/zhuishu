<template>
    <div class="searchContainer">
        <div class="top">
            <div class="input">
                <input @keyup="keysearch" v-model ='word' type="text" placeholder="搜索你喜欢看的小说">
                <i class ='fa fa-search'></i>
                <button @click ='search'>搜索</button>
            </div>
            <div class="searchbox" v-show ='list.length != 0'>
                <ul>
                    <li @click ='go(item)' v-for ='item in list' :key ='item'>{{item}}</li>
                </ul>
            </div>
        </div>
        <div class="search" v-if ='flag'>
            <div class="remen">
                <p class="title">大家都在搜 : </p>
                <ul ref='searchbox'>
                    <li @click ='go(item.word)' v-for ='(item,index) in keyword' :key ='index'> 
                        <span :class ='[index == 0 ? "one" : index == 1 ? "two" : index ==2 ? "three" : "" ]' v-if ='index == 0 ? true : index == 1 ? true : index == 2 ? true : false ' class="one">{{index +1}}</span>
                        <span class='name'>{{item.word}}</span>
                    </li>
                </ul>
                <span ref ='text'  @click ='open' class ='text'>查看更多</span> <i :class ="[iconflag == false ? 'fa-caret-down' : 'fa-caret-up']" class ='fa'></i>
            </div>
        </div>
        <div class="info" v-if="!flag">
            <v-info :flag ='false' :style ='"position:static;width:100%;overflow:auto;"'></v-info>
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import vInfo from '../paihang/info'
import {mapMutations} from 'vuex'
export default {
    components : {vInfo},
    data(){
        return {
            keyword : [],
            iconflag : false,
            word : '',
            list : [],
            info : [],
            flag : true 
        } 
    },
    created(){
        this.gethotkeyword()
    },
    methods : {
        go(item){
            this.word = item
        },
        search(){
           if(this.word == ''){
               Toast('请输入关键字')
           }else {
                this.$ajax.get('/api/book/fuzzy-search',{
                params : {
                    query : this.word
                } 
            }).then((res) => {
                 this.info = res.data.books
                 console.log(this.info)
                 this.setdata(this.info)
                 this.flag = false 
                 this.word =''
            } )
           }
        },
        keysearch(){
         this.$ajax.get('/api/book/auto-complete',{
            params : {
                query : this.word
            } 
        }).then(res=>{
            this.list = res.data.keywords
           
        })
        },
        gethotkeyword () {
            this.$ajax.get('/api/book/search-hotwords').then((res) => {
              this.keyword =   res.data.searchHotWords
            } )
        },
        open(){
            this.iconflag = !this.iconflag
            if(!this.iconflag) {
                this.$refs.searchbox.style.height ='100px'
                this.$refs.text.innerText = '查看更多'
            } else {
                this.$refs.searchbox.style.height = 'auto'
                this.$refs.text.innerText ='收起'
            } 
        },
        ...mapMutations({
            setdata: 'SET_ID'
        })
    }
}
</script>
<style lang="less" scoped>
.searchbox{
    position: absolute;
    left: 75px;
    width: 70%;
    background: #fff;
    border:1px solid #d5d5d5;
    z-index: 333;
    ul {
        li {
            line-height: 60px;
            padding-left: 20px;
            border-bottom: 1px solid #eee;
        } 
    } 
}
.searchContainer {
    margin-top: 80px;
    padding-bottom: 100px;
    .search{
        margin-top: 30px;
        padding : 0 20px;
        .remen {
            .text{
                text-align: center;
                margin-top: 20px;
                display: inline-block;
                margin-left: 50%;
                transform: translateX(-50%)
            }
            i {
                margin-left: -30px;
            } 
            ul {
                 display: flex;
                 justify-content: space-between;
                 flex-wrap: wrap;
                 height: 200px;
                 overflow: hidden;
                li {
                   width: 30%;
                   
                   padding : 20px 0;
                   max-width: 30%;
                   white-space: nowrap;
                   overflow: hidden;
                   text-overflow: ellipsis;
                   .one ,.two,.three{
                       display: inline-block;
                       height: 30px;
                       width: 30px;
                       color:#fff;
                       text-align: center;
                   } 
                   .one {
                       background-color: red;
                   } 
                   .two {
                       background-color: yellowgreen;
                   }
                   .three {
                       background-color: green;
                   } 
                } 
            } 
        } 
    }
    .top {
        .input {
            position: relative;
            text-align: center;
            i {
                position: absolute;
                left: 85px;
                top: 13px;
                color:#ef4543;
            }  
            input {
                width: 70%;
                height: 50px;
                border:none;
                color:#8b8b90;
                 background: #f5f5fa;
                 padding-left: 40px;
                 box-sizing: border-box;
            } 
            button {
                background : #ef4543;
                color:#fff;
                border:none;
                height: 50px;
                margin-left: -10px;
             }
        } 
    } 
} 
</style>