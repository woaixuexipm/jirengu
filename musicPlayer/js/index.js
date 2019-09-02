var musiclist = []
var number = 0;
var audio =new Audio()
audio.autoplay = true
getMUsicList(function(list){
    musiclist = list
    loadmusic(list[number])
    generatelist(list)
    change(list)
})
function $(selector){
    return document.querySelector(selector)
}
audio.ontimeupdate = function(){
    $('.process .bar .progress-now').style.width = (audio.currentTime/audio.duration)*100+'%'
}
audio.onplay = function(){
    clock = setInterval(function(){
    var min = Math.floor(audio.currentTime/60)
    var sec = Math.floor(audio.currentTime%60) + ''
    sec = sec.length === 2 ? sec : '0' + sec
    $('.musicbox .time').innerText = min + ':' + sec
    },1000)
}
audio.onpause = function(){
    clearInterval(clock)
}
audio.onended = function(){
    $('.musicbox .control .play').classList.remove('icon-play')
    $('.musicbox .control .play').classList.add('icon-playpause')
    number = (++number) % musiclist.length
    loadmusic(musiclist[number])
}
$('.musicbox .control .play').addEventListener('click',function(){
    // var icon = this.querySelector('.play')  
    if(this.classList.contains('icon-playpause')){    
        audio.pause()
    }else{    
        audio.play()
    }  
    this.classList.toggle('icon-playpause')  
    this.classList.toggle('icon-play')
})
$('.musicbox .next').addEventListener('click',function(){
    $('.musicbox .control .play').classList.remove('icon-play')
    $('.musicbox .control .play').classList.add('icon-playpause')
    number = (++number) % musiclist.length
    loadmusic(musiclist[number])
})
$('.musicbox .back').addEventListener('click',function(){
    $('.musicbox .control .play').classList.remove('icon-play')
    $('.musicbox .control .play').classList.add('icon-playpause')
    number = (musiclist.length + (--number)) % musiclist.length
    loadmusic(musiclist[number])
})
$('.musicupper .bar .progress-bg').addEventListener('click',function(e){
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    audio.currentTime = audio.duration * percent
})

function getMUsicList(callback) {
    var xml = new XMLHttpRequest()
    xml.open('GET','/jirengu/musicPlayer/music.json',true)
    xml.addEventListener('load',function(){
        if(xml.status>=200&&xml.status<300||xml.status===304){
            console.log(JSON.parse(xml.responseText))
            callback(JSON.parse(xml.responseText))
        }else{
            console.log("获取数据失败")
        }
    })
    xml.onerror = function(){
        console.log("网络异常")
    }
    xml.ontimeout = function(){
        console.log("请求超时")
    }
    xml.send()
}
function loadmusic(musicObj){
    console.log('begin play',musicObj)
    $('.musicbox .song .name').innerText = musicObj.title
    $('.musicbox .song .auther').innerText = musicObj.auther
    $('.background').style.backgroundImage = 'url(' + musicObj.img + ')'
    audio.src = musicObj.src
}
function generatelist(list){
    for(var i=0 ; i<list.length ; i++){     
        $('.list').innerHTML += "<li>"+list[i].title+"--"+list[i].auther+"</li>";
        var aList = document.getElementsByTagName("li");
        aList[i].classList.add("play")
        aList[i].classList.add("iconfont")
        aList[i].classList.add("icon-playpause")
    }
}
function change(list) {
    var aList = document.getElementsByTagName("li");
    for(var i=0; i<aList.length; i++) {
        aList[i].index = i; 
        aList[i].onclick = function() {
            // audio.src = list[this.index].src
            $('.musicbox .control .play').classList.remove('icon-play')
            $('.musicbox .control .play').classList.add('icon-playpause')
            audio.play()
            loadmusic(list[this.index])
        }
    }
}
