var curPage = 0
var curPageCount = 10
var colHeightArray = []
var newsWidth = $('.item').outerWidth(true)
var colCount = parseInt($('.contain').width()/$('.item').outerWidth(true))
console.log(colCount)
for(var i=0; i<colCount; i++){
    colHeightArray[i] = 0
}
var isDataArrive = true
start()
function start(){
    getData(function(newsList){
        console.log(newsList)
        isDataArrive = true
        $.each(newsList,function(index,news){
            var $node = getNode(news)
            $node.find('img').on('load',function(){
                $('.contain').append($node)
                console.log($node)
                waterfall($node)
            })
        })
    })
    isDataArrive = false
}
$(window).scroll(function(){
	if(!isDataArrive) return
	if(isVisible($('#load'))){
		start()
	}
})
function getData(callback){
    $.ajax({
        url:'https://photo.sina.cn/aj/v2/index?cate=military',
        dataType:'jsonp',
        jsonp:'callback',
        data:{
            pagesize: curPageCount,
			page: curPage
        }
    }).done(function(ret){
        if(ret.code==1){
            callback(ret.data);   
            curPage++
        }else{
            console.log('error')
        }
    })
}
function getNode(item){
    var tpl = ''
		tpl += '<li class="item">';
		tpl += ' <a href="'+ item.url +'" class="link"><img src="' + item.thumb + '" alt=""></a>';
		tpl += ' <h4 class="header">'+ item.stitle +'</h4>';
		tpl += '<p class="desp">' + item.title +'</p>';
		tpl += '</li>';
	return $(tpl)
}
function waterfall($node){
    var idx = 0,
        minVaule = colHeightArray[0];
    for(var i=0;i<colHeightArray.length; i++){
        if(colHeightArray[i] < minVaule){
            idx = i;
            minVaule = colHeightArray[i];
        }
    }
    console.log(colHeightArray)
    console.log('waterFallPlace')
    console.log(newsWidth, idx)
    $node.css({
        left: newsWidth*idx,
        top: minVaule,
        opacity: 1
    });
    colHeightArray[idx] = $node.outerHeight(true) + colHeightArray[idx];
    console.log(colHeightArray)
    $('.contain').height(Math.max.apply(null,colHeightArray));

}
function isVisible($el){
    var scrollH = $(window).scrollTop(),
        winH = $(window).height(),
        top = $el.offset().top;

    if(top < winH + scrollH){
        return true;
    }else{
        return false;
    }
}