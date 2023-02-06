
`@description:`
 由于项目开发时遇到element-ui组件库无法满足的需求，于是开启了修改源码之旅
`@time:` 2023-02-04 0:51
`@author:` cyx

`element-ui v2.15.12`
`   node    v14.14.0`
`   npm     v6.14.8`


`    若和我同样修改element-ui源码想法的朋友们，欢迎和我互相探讨qq702609592   `
# 修改源码步骤
-
    ① git下载源码包 `https://github.com/ElemeFE/element.git`
    ② 安装node配置环境  node版本 ---> `v14.14.0`
        配置环境变量，可自行查百度安装配置
        注: 版本过高或者过低可能导致下载依赖出现问题
    ③ 进入源码根目录，使用终端or命令提示窗口
        开启下载依赖命令 `npm i`
    ④ 修改源码 
        vue组件源码在package中，一个文件对应一个组件
        css源码在在package中theme-chalk/src下
    ⑤ 检查错误，在根目录使用终端or命令提示窗口
        开启检查命令 `npm run dev`
    ⑥ 打包，在根目录使用终端or命令提示窗口
        开启打包命令 `npm run dist`
    ⑦ 使用，打包成功后会获得lib文件夹，在根目录下
        将lib复制到对应项目的/node_modules/element-ui下
        替换lib
    ⑧ 重新编译对应项目即可


# el-input-number
- NO.1  `time：2023-02-04 01:17`
    ① `添加了鼠标滚动事件`
        在最值范围内数值随着鼠标滚动而变大变小
    ② `修改了 + -按钮样式`
        点击触发active样式按钮变蓝，增加人机交互体验
        原先是hover，相对比较生硬
    
# el-progress
- No.2  `time:2023-02-06 04:26`
    ① `新增动画animation属性`
         默认值为false，增加人机交互体验（仅限于 type为bar时可用）
    ② `新增过渡transform属性`
         默认值为false，增加人机交互体验（仅限于 type为bar时可用）

# el-page-header
- No.3  `time:2023-02-06 18:50`
    ① `优化原有样式`
        提升组件使用体验 优化图标、分隔栏
    ② `新增title-right属性`
        将“返回按键”置于最右边，为更多需求提供便利