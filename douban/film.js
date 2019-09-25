$('footer>div').click(function(){
    var index = $(this).index()
    $('section').hide()
                .eq(index).fadeIn()
    $(this).addClass('active').siblings().removeClass('active')
})
var index = 1
var isloading = false
start()
function start() {
    if(isloading) return
    isloading = true
    $('.loading').show()
    $.ajax({
        url: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc',
        type: 'GET',
        data: {
            page: index
        },
        dataType: 'jsonp'
    }).done(function(ret){
        console.log(ret)
        createNode(ret)
        index = index + 1
    }).fail(function(){
        console.log("error");
    }).always(function () {
        isloading = false
        $('.loading').hide()
    })
}
var clock
$('main').scroll(function () {
    if(clock){
        clearTimeout(clock)
    }
    clock = setTimeout(function(){
        if($('section').eq(0).height() == $('main').scrollTop() + $('main').height()){
            console.log(1)
            start()
        }
    },300)
})
var sum = 0
function createNode(ret){
    ret.data.items.forEach(function (subject,index) {
        var $node = $(`<div class="item clearfix">
            <a href="https://github.com/TryGhost/Ghost">
            <div class="order"><span>1</span></div>
            <div class="detail">
                <h2>Ghost </h2>
                <div class="description">Knockout makes it easier to create rich, responsive UIs with JavaScript</div>
                <div class="extra"><span class="star-count">4196</span> star</div>  
            </div>
        </a>
        </div> `)
        var index = index + 1 + sum
        $node.find('.order span').text(index)
        $node.find('a').attr('href', subject.html_url)    
        $node.find('.detail h2').text(subject.name)  
        $node.find('.detail .description').text(subject.description)
        //$node.find('.detail .collection').text(subject.collect_count)  
        $node.find('.detail .star-count').text(subject.stargazers_count ) 
        $('#Top250').append($node)
        
    });
    return sum = ret.data.items.length + sum
}