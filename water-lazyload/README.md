## 瀑布流新闻网站
https://woaixuexipm.github.io/jirengu/water-lazyload/index.html
## 懒加载原理
先将img标签中的src链接设为同一张图片（空白图片），将其真正的图片地址存储再img标签的自定义属性中（比如data-src）。当js监听到该图片元素进入可视窗口时，即将自定义属性中的地址存储到src属性中，达到懒加载的效果。

这样做能防止页面一次性向服务器响应大量请求导致服务器响应慢，页面卡顿或崩溃等问题。
## 瀑布流原理
瀑布流布局要求要进行布置的元素等宽，然后计算元素的宽度与浏览器宽度之比，得到需要布置的列数。
创建一个数组，长度为列数，里面的值为已布置元素的总高度（最开始为0）
然后将未布置的元素依次布置到高度最小的那一列，就得到了瀑布流布局。
## 瀑布新闻网站实现原理
ajax 获取数据 
把数据变为 DOM 节点
通过瀑布流的方式放到页面上 
当滚动到底部的时候，再次获取数据循环