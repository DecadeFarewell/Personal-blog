//随机标签
const tag_module = new Vue({
    el:'#tag_module',
    data:{
        tags:['深度思维','深入浅出vue.js','DOM编程艺术','javascript设计模式','深度思维','深入浅出vue.js','DOM编程艺术','javascript设计模式']
    },
    computed:{
        //随机颜色
        randomColor(){
            return () => {
                const r = Math.random()*255;
                const g = Math.random()*255;
                const b = Math.random()*255;
                return `rgb(${r},${g},${b})`;
            }
        },
        //随机字体大小
        randomSize(){
            return () => {
                const size = Math.random()*6 + 12;
                return size + 'px';
            }
        }
    },
    created(){
        axios.get('/getRamdonTags').then(resp => {
            console.log(resp)
            this.tags = resp.data.data;
        }).catch(resp =>{
            console.log(resp)
        })
    }
})

//最近热门
const reecent_hot = new Vue({
    el:'#recent_hot',
    data:{
        tipsList:[]
    },
    created() {
        axios.get('/queryBlog?page=0&pageSize=5').then(resp => {
            console.log(resp)
            const temp = resp.data.data
            for(let i = 0;i<temp.length;i++){
                temp[i].link = '/blog_detail.html?blog_id='+temp[i].id;
            }
            this.tipsList = temp
        }).catch(resp => {
            console.log(resp)
        })
    }
})

//最新评论
const recent_comments = new Vue({
    el:'#recent_comments',
    data:{
        commentsList:[]
    },
    created(){
        axios.get('/queryRecentComment?limit=5').then(resp => {
            const dataArr = resp.data.data
            const tempList = []
            for(let i = 0;i<dataArr.length;i++){
                if(dataArr[i].blog_id > 0){
                    dataArr[i].link = '/blog_detail.html?blog_id='+dataArr[i].blog_id
                    tempList.push(dataArr[i])
                }
            }
            this.commentsList = tempList
        }).catch(resp => {
            console.log(resp)
        })
    }
})
//搜索部分
const search_module = new Vue({
    el:'#search_module',
    data:{
        searchWord:'',
    },
    computed:{

    },
    methods:{
        submit(){
            location.href = location.origin + '/indexBytags.html?searchWord=' + this.searchWord;
            // alert(location.href)
        }
    },
    created(){

    }
})