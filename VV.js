var showImageAtIndex = function(slide, index) {
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    var className = 'VV-active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    var nextSelector = '#id-VVimage-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)
    // 切换小圆点
    removeClassAll('VV-white')
    // 得到下一个小圆点的选择器
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indi = e(indiSelector)
    indi.classList.add('VV-white')
}

var nextIndex = function(slide, offset) {
    // 得到图片总数和当前图片下标
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)
    // 求出下一张图片的 id
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.VV-slide-button'
    bindAll(selector, 'click', function(event){
        var button = event.target
        var slide = button.parentElement
        var offset = parseInt(button.dataset.offset)
        // 求出下一个图片的 index
        var index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

var bindEventIndicator = function() {
    var selector = '.VV-slide-indi'
    bindAll(selector, 'mouseover', function(event){
        var self = event.target
        var index = parseInt(self.dataset.index)
        var slide = self.closest('.VV-slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}
var playNextImage = function() {
    var slide = e('.VV-slide')
    // 求出下一个图片的 index
    var index = nextIndex(slide, 1)
    // 显示下一张图片
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 2000
    setInterval(function(){
        playNextImage()
    }, interval)
}

bindEventSlide()
bindEventIndicator()
autoPlay()
