
$(function(){
    getCategory();
    getContent(1);
    $(".category-list").on("tap","a",function(){
        $(this).addClass("active").parent().siblings().children("a").removeClass("active");
        getContent($(this).data("id"));
    })

//函数封装：获取分类
    function getCategory(){
        $.ajax({
            url:"/category/queryTopCategory",
            type:"get",
            //data:{},
            success:function(data){
                $(".category-list").html(template("category",data));
            }
        })
    }
//函数封装：获取内容   
    function getContent(id){
        $.ajax({
            url:"/category/querySecondCategory",
            type:"get",
            data:{
                id:id
            },
            success:function(data){
                if(data.rows.length){
                    $(".content-list").html(template("content",data));
                }else {
                    $(".content-list").html("没有更多数据了");
                }
                
            }
        })
    }
    
})