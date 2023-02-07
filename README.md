<p align="center">
  <img src="https://cdn.rawgit.com/ElemeFE/element/dev/element_logo.svg">
</p>


<div><span style="fontSize:16px;fontWeight:700">@description:</span>由于项目开发时遇到element-ui组件库无法满足的需求，于是开启了修改源码之旅</div>
<div><span style="fontSize:16px;fontWeight:700">@time:</span>2023-02-04 0:51</div>
<div><span style="fontSize:16px;fontWeight:700">@author:</span>cyx</div>

<dl>
    <dt>编译环境:</dt>
    <dd>element-ui <span style="fontWeight:700">v2.15.12</span></dd>
    <dd>node       <span style="fontWeight:700">v14.14.0</span></dd>
    <dd>npm        <span style="fontWeight:700">v6.14.8</span></dd>
</dl>

<h4>若和我同样修改element-ui源码想法的朋友们，欢迎和我互相探讨qq702609592</h4>


# 修改源码步骤
<ol>
    <li>git下载源码包 `https://github.com/ElemeFE/element.git`</li>
    <li>安装node配置环境,配置环境变量,可自行查百度安装配置. 注: 版本过高或者过低可能导致下载依赖出现问题</li>
    <li>进入源码根目录，使用终端or命令提示窗口开启下载依赖命令 `npm i`</li>
    <li>修改源码,vue组件源码在package中，一个文件对应一个组件,css源码在在package中theme-chalk/src下</li>
    <li>检查错误，在根目录使用终端or命令提示窗口,开启检查命令 `npm run dev`</li>
    <li>打包,在根目录使用终端or命令提示窗口,开启打包命令 `npm run dist`</li>
    <li>使用，打包成功后会获得lib文件夹，在根目录下,将lib复制到对应项目的/node_modules/element-ui下替换lib</li>
    <li>重新编译对应项目即可实现效果</li>
</ol>


# el-input-number
- NO.1  `time：2023-02-04 01:17`
    <p>① `添加了鼠标滚动事件`</p>
        在最值范围内数值随着鼠标滚动而变大变小
    <p>② `修改了 + -按钮样式`</p>
        点击触发active样式按钮变蓝，增加人机交互体验,原先是hover相对比较生硬
    
# el-progress
- No.2  `time:2023-02-06 04:26`
    <p>① `新增动画animation属性`</p>
         默认值为false，增加人机交互体验（仅限于 type为bar时可用）
    <p>② `新增过渡transform属性`</p>
         默认值为false，增加人机交互体验（仅限于 type为bar时可用）

# el-page-header
- No.3  `time:2023-02-06 18:50`
    <p>① `优化原有样式`</p>
        提升组件使用体验 优化图标、分隔栏
    <p>② `新增title-right属性`</p>
        将“返回按键”置于最右边，为更多需求提供便利

# el-radio-button/group
- No.4  `time:2023-02-07 20:32`
    <p>① 修复由边框圆角与填充色引起按钮部分留白bug</p>
    <p>② 修复边框颜色与填充色不一致bug</p>
    <p>③ 修复键盘事件下，禁用按钮仍会被选中bug</p>
    <p>④ 优化鼠标触发（:hover）设置文字颜色之后不触发hover，反之触发element-ui默认色</p>
