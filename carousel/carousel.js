function carousel($ct){
    this.init($ct)
    this.bind()
    this.autoPlay()
}
carousel.prototype = {
    init: function($ct){
        this.$ct = $ct
        this.$imgCt = this.$ct.find('.img-ct')
        this.$imgs = this.$ct.find('.img-ct > li')
        this.$preBtn = this.$ct.find('.icon-icon-test')
        this.$nextBtn = this.$ct.find('.icon-icon-test1')
        this.$btn = this.$ct.find('.bullet > li')

        this.$imgWidth = this.$imgs.width()
        this.$imgCount = this.$imgs.length
        this.index = 0
        this.isAnimate = false

        this.$imgCt.append(this.$imgs.eq(0).clone())
        this.$imgCt.prepend(this.$imgs.eq(3).clone())
        this.$imgCt.width((this.$imgCount + 2) * this.$imgWidth)
        console.log((this.$imgCount + 2) * this.$imgWidth)
        this.$imgCt.css('left', -this.$imgWidth)
    },
    bind: function(){
        var _this = this
        this.$preBtn.on('click',function(){
            console.log('prebtn')
            _this.playPre(1)
        })
        this.$nextBtn.on('click',function(){
            console.log('nextBtn')
            _this.playNext(1)
        })
        this.$btn.on('click',function(){
            var index = $(this).index()
            if(_this.index > index){
                _this.playPre(_this.index - index)
            }else {
                _this.playNext(index - _this.index)
            }
        })
    },
    playNext: function(len){
        var _this = this
        if(this.isAnimate) return
        this.isAnimate = true
        console.log('next...')
        this.$imgCt.animate({
            left: '-='+this.$imgWidth*len
        }, function(){
            _this.index += len
            if(_this.index === _this.$imgCount){
                _this.$imgCt.css('left', -_this.$imgWidth)
                _this.index = 0
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    playPre: function(len){
        var _this = this
        if(this.isAnimate) return
        this.isAnimate = true
        console.log('Pre...')
        this.$imgCt.animate({
            left: '+='+this.$imgWidth*len
        }, function(){
            _this.index -= len
            if(_this.index < 0){
                _this.$imgCt.css('left', -_this.$imgWidth*_this.$imgCount)
                _this.index = _this.$imgCount - 1
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    setBullet: function(){
        this.$btn.eq(this.index).addClass('active')
            .siblings().removeClass('active')
    },
    autoPlay: function(){
        var _this = this
        this.setclock = setInterval(function(){
            _this.playNext(1)
        },2000)
    },
    stopPlay: function(){
        clearInterval(this.setclock)
    }
}


$.fn.Carousel = function(){
    $.each(this,function(index, node){
        new carousel($(node))
    })
}


$('.carousel').Carousel()
// var a = new carousel($('.carousel').eq(0))
// var b = new carousel($('.carousel').eq(1))