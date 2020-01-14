<template>
    <div class="paihangbangContainer">
        <!-- 热榜排行榜 -->
        <v-phb :title ='chuban' :arr ='epub'></v-phb>
        <!-- 女生排行榜 -->
        <v-phb :title ='female' :arr ='femaleArr'></v-phb>
        <!-- 男生排行榜 -->
        <v-phb :title ='male' :arr ='maleArr'></v-phb>
        <!-- 其他排行榜 -->
        <v-phb :title ='picture' :arr ='pictureArr'></v-phb>
    </div>
</template>
<script>
import vPhb from './phb'
export default {
    data(){
        return {
            chuban : '出版',
            epub : [],
            female : '女生排行榜',
            femaleArr : [],
            male:'男生排行榜',
            maleArr : [],
            picture:'其他',
            pictureArr : []
        }
    },
    components:{vPhb},
    created(){
        this.getlist()
    },
    methods : {
        getlist () {
            this.$ajax.get('/api/ranking/gender').then((res)=>{
                console.log(res.data)
                this.epub = res.data.epub
                this.femaleArr = res.data.female
                this.maleArr = res.data.male
                this.pictureArr = res.data.picture
            })
        }
    }
}
</script>
<style lang="less" scoped>
.paihangbangContainer{
    position: absolute;
    top: 70px;
    left:0;
    bottom: 0;
    right: 0;
    background-color: #fff;
}
</style>