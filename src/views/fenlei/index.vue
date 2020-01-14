<template>
    <div class ='fenleiContainer'>
        <v-phb :title ='nstitle' :arr = 'nsarr'></v-phb>
        <v-phb :title ='"男生"' :arr = 'nanarr'></v-phb>
        <v-phb :title ='"热门"' :arr = 'picturearr'></v-phb>
        <v-phb :title ='"其他"' :arr = 'pressarr'></v-phb>
        
    </div>
</template>

<script>
import vPhb from '../paihang/phb'
export default {
    components : {vPhb},
    data(){
        return {
            nstitle : '女生',
            nsarr : [],
            nanarr : [],
            picturearr : [],
            pressarr : []
        } 
    },
    created(){
        this.getfenlei()
    },
 methods : {
     getfenlei(){
         this.$ajax.get('/api/cats/lv2/statistics').then((res) => {
             this.nsarr = res.data.female
             this.nanarr = res.data.male
             this.picturearr = res.data.picture
             this.pressarr = res.data.press
         } )
     },
 }    
}

</script>
<style lang="less" scoped>
.fenleiContainer {
    margin-top: 70px;
} 
</style>