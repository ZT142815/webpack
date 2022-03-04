# 项目搭建 
## 初始化项目
    创建package.json文件
    npm init
## 创建.gitignore文件
    方法一：
    touch .gitigonre
    这个文件就是忽略文件的变动，在git提交的时候只提交没有被忽略的文件
    方法二：
    下载vscode插件：gitignore
    command+shift+p召唤命令面板
    输入Add gitignore

    添加配置，我们在项目中一般配置为：
    可以根据自身需要来配置
    node_modules
    dist
    build
    .vscode
    .Ds_Store
## 创建.npmrc文件
    npm文件主要用来设置项目的npm源，不在需要每个开发本地设置
    一般配置为：
    registry=https://registry.npm.taobao.org/
##############






