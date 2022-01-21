# Git

## 一、安装

安装地址: https://npm.taobao.org/mirrors/git-for-windows/

 ![image-20220113204224535](Git.assets/image-20220113204224535.png)

![image-20220113204231667](Git.assets/image-20220113204231667.png)

 ![image-20220113204236434](Git.assets/image-20220113204236434.png)

 ![image-20220113204241417](Git.assets/image-20220113204241417.png)

 ![image-20220113204247426](Git.assets/image-20220113204247426.png)

 ![image-20220113204252464](Git.assets/image-20220113204252464.png)

 ![image-20220113204257178](Git.assets/image-20220113204257178.png)

 ![image-20220113204302073](Git.assets/image-20220113204302073.png)

  ![image-20220113204308312](Git.assets/image-20220113204308312.png)

 ![image-20220113204313306](Git.assets/image-20220113204313306.png)

![image-20220113204318589](Git.assets/image-20220113204318589.png)

![image-20220113204323728](Git.assets/image-20220113204323728.png)

![image-20220113204327833](Git.assets/image-20220113204327833.png)

![image-20220113204334337](Git.assets/image-20220113204334337.png)

![image-20220113204338673](Git.assets/image-20220113204338673.png)

打开

 ![image-20220113204343839](Git.assets/image-20220113204343839.png)

 ![image-20220113204347524](Git.assets/image-20220113204347524.png)

## 二、Git 常用命令

| 命令名称                             | 作用           |
| ------------------------------------ | -------------- |
| git config --global user.name 用户名 | 设置用户签名   |
| git config --global user.email 邮箱  | 设置用户签名   |
| git init                             | 初始化本地库   |
| git status                           | 查看本地库状态 |
| git add 文件名                       | 添加到暂存区   |
| git commit -m "日志信息" 文件名      | 提交到本地库   |
| git reflog                           | 查看历史记录   |
| git reset --hard 版本号              | 版本穿梭       |

### (一)、创建用户签名

签名的作用是区分不同操作者身份。用户的签名信息在每一个版本的提交信息中能够看 到，以此确认本次提交是谁做的。Git 首次安装必须设置一下用户签名，否则无法提交代码。

 ![image-20220113204355361](Git.assets/image-20220113204355361.png)

在C:\Users\aa\.gitconfig中查看

 ![image-20220113204401087](Git.assets/image-20220113204401087.png)

### (二)、初始化本地库

#### 1、进入一个项目中

 ![image-20220113204406429](Git.assets/image-20220113204406429.png)

#### 2、右键打开git bashHere

 ![image-20220113204408709](Git.assets/image-20220113204408709.png)

#### 3、输入git init会生成一个.git的文件

 ![image-20220113204416516](Git.assets/image-20220113204416516.png)

### (三)、查看git状态

#### 1、Git status

 ![image-20220113204422052](Git.assets/image-20220113204422052.png)

#### 2、创建一个文件 vi ma.txt

 ![image-20220113204424847](Git.assets/image-20220113204424847.png)

#### 3、输入内容保存退出

 ![image-20220113204427930](Git.assets/image-20220113204427930.png)

#### 4、再次使用git status命令

 ![image-20220113204450220](Git.assets/image-20220113204450220.png)

### (四)、添加删除暂存区

#### 1、git add 文件名

 ![image-20220113204454163](Git.assets/image-20220113204454163.png)

#### 2、查看状态

Git status

![image-20220113204459581](Git.assets/image-20220113204459581.png)

#### 3、删除暂存区的文件

```
git rm - -cached 文件名
```

 ![image-20220113204506552](Git.assets/image-20220113204506552.png)

#### 4、再次查看状态

 ![image-20220113204510068](Git.assets/image-20220113204510068.png)

说明删除只是删除了暂存区的文件,而本地的文件没有删除

#### 5、再次提交

```
git add 文件名
```

 ![image-20220113204540432](Git.assets/image-20220113204540432.png)

### (五)、提交到远程仓库

#### 1、git commit –m “my one commit” 文件名

 ![image-20220113204543963](Git.assets/image-20220113204543963.png)

#### 2、查看状态

 ![image-20220113204547349](Git.assets/image-20220113204547349.png)

#### 3、git reflog查看简单信息

 ![image-20220113204550822](Git.assets/image-20220113204550822.png)

#### 4、git log查看详细信息

 ![image-20220113204553515](Git.assets/image-20220113204553515.png)

### (六)、修改文件

#### 1、vi ma.txt

 ![image-20220113204557245](Git.assets/image-20220113204557245.png)

#### 2、添加一列

 ![image-20220113204605289](Git.assets/image-20220113204605289.png)

#### 3、查看状态

git status

显示当前有数据更新,并且没被git追踪到

 ![image-20220113204609388](Git.assets/image-20220113204609388.png)

#### 4、使用git add 文件名上传到缓存区

 ![image-20220113204617446](Git.assets/image-20220113204617446.png)

#### 5、使用git commit –m “my two commit” 文件名

 ![image-20220113204620216](Git.assets/image-20220113204620216.png)

#### 6、查看版本

git reflog

 ![image-20220113204637167](Git.assets/image-20220113204637167.png)

### (七)、版本穿梭

#### 1、首先查看git中有多少个版本

git reflog

 ![image-20220113204644343](Git.assets/image-20220113204644343.png)

#### 2、查看当前版本的文件信息

 ![image-20220113204649080](Git.assets/image-20220113204649080.png)

#### 3、git refset –hard 版本号 穿梭到第一个版本

 ![image-20220113204651821](Git.assets/image-20220113204651821.png)

#### 4、查看文件信息

 ![image-20220113204654313](Git.assets/image-20220113204654313.png)

#### 5、穿梭到最新版本

 ![image-20220113204709578](Git.assets/image-20220113204709578.png)

#### 6、查看文件

 ![image-20220113204715504](Git.assets/image-20220113204715504.png)

### (八)、分支

#### 1、分支的创建

```
git branch myFenZhi
```

 ![image-20220113204724278](Git.assets/image-20220113204724278.png)

#### 2、查看分支

git branch -v

 ![image-20220113204810388](Git.assets/image-20220113204810388.png)

#### 3、切换分支

git checkout myFenZhi

 ![image-20220113204813806](Git.assets/image-20220113204813806.png)

#### 4、在分支下修改文件

vi ma.txt

 ![image-20220113204817617](Git.assets/image-20220113204817617.png)

#### 5、切换到主分支

 ![image-20220113204820849](Git.assets/image-20220113204820849.png)

#### 6、查看文件

 ![image-20220113204824320](Git.assets/image-20220113204824320.png)

### (九)、合并分支(正常合并)

#### 1、首先进入master主分支

git merge master-1

 ![image-20220113204832808](Git.assets/image-20220113204832808.png)

#### 2、查看文件

cat ma.txt

就能看到master-01上传本地仓库中ma.txt中的aaa添加到了mastet的ma.txt中

 ![image-20220113204837967](Git.assets/image-20220113204837967.png)

### (十)、合并分支(冲突合并)

#### 1、设置master的文件

 ![image-20220113204842349](Git.assets/image-20220113204842349.png)

#### 2、设置master-1文件

 ![image-20220113204845884](Git.assets/image-20220113204845884.png)

#### 3、进入master 

 ![image-20220113204850196](Git.assets/image-20220113204850196.png)

#### 4、进行合并

此时发现状态是合并中,不是真正的master

 ![image-20220113204853385](Git.assets/image-20220113204853385.png)

#### 5、进入ma.txt文件

 ![image-20220113204857917](Git.assets/image-20220113204857917.png)

#### 6、删除冲突的地方

 ![image-20220113204903231](Git.assets/image-20220113204903231.png)

![image-20220113204908363](Git.assets/image-20220113204908363.png)

#### 7、添加到缓存区

 ![image-20220113204912197](Git.assets/image-20220113204912197.png)

#### 8、添加到本地仓库不添加文件名

 ![image-20220113204915409](Git.assets/image-20220113204915409.png)

这时候就合并好了

## 三、GitHub

### (一)、创建远程库&起别名

#### 1、登录github

地址:https://github.com/

 ![image-20220113204919400](Git.assets/image-20220113204919400.png)

#### 2、输入账号密码

 ![image-20220113204923425](Git.assets/image-20220113204923425.png)

#### 3、邮箱验证

 ![image-20220113204928778](Git.assets/image-20220113204928778.png)

![image-20220113204945937](Git.assets/image-20220113204945937.png)

#### 4、创建项目

![image-20220113204951924](Git.assets/image-20220113204951924.png)

#### 5、获取http连接

 ![image-20220113204955304](Git.assets/image-20220113204955304.png)

#### 6、使用git起别名

Git remote add 别名 github连接

 ![image-20220113205001223](Git.assets/image-20220113205001223.png)

#### 7、查看别名

Git remote -v

![image-20220113205015922](Git.assets/image-20220113205015922.png)

### (二)、上传远程仓库(最小分支单位)

#### 1、上传

Git push 别名(连接名) 分支名

 ![image-20220113205023299](Git.assets/image-20220113205023299.png)

#### 2、使用浏览器登录

 ![image-20220113205027404](Git.assets/image-20220113205027404.png)

#### 3、上传成功

 ![image-20220113205031940](Git.assets/image-20220113205031940.png)

#### 4、验证

 ![image-20220113205034874](Git.assets/image-20220113205034874.png)

### (三)、拉取远程仓库到本地仓库

#### 1、修改远程仓库的文件

 ![image-20220113205040471](Git.assets/image-20220113205040471.png)

#### 2、本地仓库拉取

Git pull 别名(连接名) 拉取的分支名

 ![image-20220113205048654](Git.assets/image-20220113205048654.png)

#### 3、查看文件

 ![image-20220113205051153](Git.assets/image-20220113205051153.png)

### (四)、克隆远程仓库到本地

克隆仓库做了三件事

1:克隆文件

2:创建本地仓库

3:给连接起别名

#### 1、新建一个文件

 ![image-20220113205058019](Git.assets/image-20220113205058019.png)

#### 2、进入文件打开git

 ![image-20220113205101514](Git.assets/image-20220113205101514.png)

#### 3、克隆远程仓库

Git clone 连接

 ![image-20220113205105535](Git.assets/image-20220113205105535.png)

#### 4、查看文件

 ![image-20220113205108728](Git.assets/image-20220113205108728.png)

#### 5、查看别名

 ![image-20220113205114103](Git.assets/image-20220113205114103.png)

### (五)、团队协作

#### 1、邀请别人加入你的团队

 ![image-20220113205117753](Git.assets/image-20220113205117753.png)

#### 2、填入想要合作的人

 ![image-20220113205121524](Git.assets/image-20220113205121524.png)

#### 3、复制地址并通过微信等方式发送给该用户

 ![image-20220113205126444](Git.assets/image-20220113205126444.png)

#### 4、在被邀请账号中的地址栏复制收到邀请的链接，点击接受邀请

 ![image-20220113205129515](Git.assets/image-20220113205129515.png)

#### 5、成功之后可以在被邀请这个账号上看到 git-Test 的远程仓库

 ![image-20220113205134772](Git.assets/image-20220113205134772.png)

#### 6、邀请账号修改上传文件

vim hello.txt

 ![image-20220113205138112](Git.assets/image-20220113205138112.png)

#### 7、上传缓存区—本地仓库—远程仓库

 ![image-20220113205141820](Git.assets/image-20220113205141820.png)

#### 8、主用户拉取文件

 ![image-20220113205145948](Git.assets/image-20220113205145948.png)

#### 9、查看文件

 ![image-20220113205149623](Git.assets/image-20220113205149623.png)

### (六)、跨团队协作

#### 1、将自己仓库地址发给别人

 ![image-20220113205153907](Git.assets/image-20220113205153907.png)

#### 2、使用别人账号打开网址点击fork叉到自己仓库

 ![image-20220113205157447](Git.assets/image-20220113205157447.png)

#### 3、插入后查看信息

 ![image-20220113205200132](Git.assets/image-20220113205200132.png)

#### 4、别人就可以编辑文件

 ![image-20220113205207338](Git.assets/image-20220113205207338.png)

#### 5、编辑后填入信息提交

 ![image-20220113205209933](Git.assets/image-20220113205209933.png)

#### 6、点击pull请求创建一个新的请求

 ![image-20220113205213981](Git.assets/image-20220113205213981.png)

 ![image-20220113205217341](Git.assets/image-20220113205217341.png)

   ![image-20220113205220333](Git.assets/image-20220113205220333.png)

#### 7、回到以前的账号就发现一个pull request请求

   ![image-20220113205224439](Git.assets/image-20220113205224439.png)

![image-20220113205229885](Git.assets/image-20220113205229885.png)

#### 8、可以进入小组进行讨论

   ![image-20220113205234069](Git.assets/image-20220113205234069.png)

![image-20220113205239818](Git.assets/image-20220113205239818.png)

#### 9、如果代码没问题点击Merge pull reque合并

   ![image-20220113205246920](Git.assets/image-20220113205246920.png)

![image-20220113205251105](Git.assets/image-20220113205251105.png)



### (七)、SSH免密登录

#### 1、进入家目录打开git

 ![image-20220113205255287](Git.assets/image-20220113205255287.png)

#### 2、创建私钥

 ![image-20220113205259067](Git.assets/image-20220113205259067.png)

#### 3、查看私钥

 ![image-20220113205302025](Git.assets/image-20220113205302025.png)

#### 4、应用到github账户上

![image-20220113205310350](Git.assets/image-20220113205310350.png)

![image-20220113205318319](Git.assets/image-20220113205318319.png)

![image-20220113205322007](Git.assets/image-20220113205322007.png)

![image-20220113205326512](Git.assets/image-20220113205326512.png)

![image-20220113205330979](Git.assets/image-20220113205330979.png)

#### 5、复制ssh连接

 ![image-20220113205335598](Git.assets/image-20220113205335598.png)

#### 6、打开git上传测试

 ![image-20220113205338806](Git.assets/image-20220113205338806.png)

## 四、IDEA使用Git

### (一)、配置环境

#### 1、定义配置git提交配置文件

在家目录创建xxxx.ignore的文件,和.gitconfig放在一个目录

 ![image-20220113205344459](Git.assets/image-20220113205344459.png)

#### 2、添加配置

```
# Compiled class file
*.class
\# Log file
*.log
\# BlueJ files
*.ctxt
\# Mobile Tools for Java (J2ME)
.mtj.tmp/
\# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar
\# virtual machine crash logs, see
http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
.classpath
.project
.settings
target
.idea
*.iml
```

![image-20220113205503132](Git.assets/image-20220113205503132.png)

#### 3、在.gitconfig中连接这个文件夹

[core]

   excludesfile = C:/Users/asus/git.ignore

 ![image-20220113205506290](Git.assets/image-20220113205506290.png)

#### 4、IDEA创建一个普通的Maven工程

#### 5、设置IDEA的Git

![image-20220113205513539](Git.assets/image-20220113205513539.png)

![image-20220113205518062](Git.assets/image-20220113205518062.png)

![image-20220113205522274](Git.assets/image-20220113205522274.png)

![image-20220113205525884](Git.assets/image-20220113205525884.png)

### (二)、创建仓库

   ![image-20220113205529627](Git.assets/image-20220113205529627.png)

![image-20220113205533385](Git.assets/image-20220113205533385.png)

变红说明没有存在缓存区

 ![image-20220113205537610](Git.assets/image-20220113205537610.png)

### (三)、添加到缓存区

#### 1、单个文件添加

 ![image-20220113205543274](Git.assets/image-20220113205543274.png)

#### 2、多个文件添加

 ![image-20220113205548473](Git.assets/image-20220113205548473.png)

### (四)、添加本地库

 ![image-20220113205553270](Git.assets/image-20220113205553270.png)

 ![image-20220113205558393](Git.assets/image-20220113205558393.png)

### (五)、版本切换

#### 1、首先创建一个类提交到本地库

 ![image-20220113205604634](Git.assets/image-20220113205604634.png)

#### 2、修改类再次提交

 ![image-20220113205609237](Git.assets/image-20220113205609237.png)

 ![image-20220113205613133](Git.assets/image-20220113205613133.png)

 ![image-20220113205616971](Git.assets/image-20220113205616971.png)

#### 3、查看全部版本

 ![image-20220113205621020](Git.assets/image-20220113205621020.png)

#### 4、切换版本

 ![image-20220113205623781](Git.assets/image-20220113205623781.png)

#### 5、查看这个类

 ![image-20220113205626230](Git.assets/image-20220113205626230.png)

### (六)、创建分支

#### 1、查看当前分支

 ![image-20220113205631303](Git.assets/image-20220113205631303.png)

#### 2、创建分支

 ![image-20220113205637079](Git.assets/image-20220113205637079.png)

![image-20220113205642501](Git.assets/image-20220113205642501.png)

#### 3、切换分支

 ![image-20220113205646458](Git.assets/image-20220113205646458.png)

### (七)、合并分支(正常合并)

#### 1、切换其他分支添加内容,添加了2和3

 ![image-20220113205654447](Git.assets/image-20220113205654447.png)

#### 2、存储缓存区,提交本地库

 ![image-20220113205657320](Git.assets/image-20220113205657320.png)

#### 3、切换到master分支

 ![image-20220113205700615](Git.assets/image-20220113205700615.png)

#### 4、合并master-1分支

 ![image-20220113205704674](Git.assets/image-20220113205704674.png)

#### 5、master的类信息变了

 ![image-20220113205709005](Git.assets/image-20220113205709005.png)

### (八)、合并分支(冲突合并)

#### 1、首先来到master-1分支修改类信息

多添加一行master-1 test

 ![image-20220113205713287](Git.assets/image-20220113205713287.png)

#### 2、master-1提交暂存区和本地库

   ![image-20220113205716375](Git.assets/image-20220113205716375.png)

#### 3、切换回master添加类信息

 ![image-20220113205720068](Git.assets/image-20220113205720068.png)

#### 4、提交到缓存区和本地库

 ![image-20220113205723944](Git.assets/image-20220113205723944.png)

#### 5、双方都添加了一行产生冲突,开始合并

 ![image-20220113205729417](Git.assets/image-20220113205729417.png)

#### 6、弹出冲突提示

 ![image-20220113205733230](Git.assets/image-20220113205733230.png)

#### 7、冲突解决界面

 ![image-20220113205736664](Git.assets/image-20220113205736664.png)

#### 8、将master的添加到合并文件中

 ![image-20220113205740212](Git.assets/image-20220113205740212.png)

#### 9、将master-1的添加到master的下面

 ![image-20220113205744491](Git.assets/image-20220113205744491.png)

#### 10、提示可以提交

 ![image-20220113205748243](Git.assets/image-20220113205748243.png)

#### 11、应用

 ![image-20220113205750798](Git.assets/image-20220113205750798.png)

#### 12、查看文件

 ![image-20220113205753225](Git.assets/image-20220113205753225.png)

## 五、IDEA使用GitHub

### (一)、IDEA编译器登录GitHub

#### 1、打开设置查看有没有github

 ![image-20220113205820963](Git.assets/image-20220113205820963.png)

#### 2、如果没有的话去插件仓库下载

 ![image-20220113205824359](Git.assets/image-20220113205824359.png)

#### 3、登录账户

 ![image-20220113205827728](Git.assets/image-20220113205827728.png)

#### 4、很难登上,使用token登录

 ![image-20220113205835459](Git.assets/image-20220113205835459.png)

#### 5、创建一个token

 ![image-20220113205839273](Git.assets/image-20220113205839273.png)

​       ![image-20220113205844221](Git.assets/image-20220113205844221.png)

![image-20220113205915960](Git.assets/image-20220113205915960.png)

![image-20220113205920131](Git.assets/image-20220113205920131.png)

![image-20220113205927730](Git.assets/image-20220113205927730.png)

#### 6、复制token,注意一刷新就看不见了

 ![image-20220113205932510](Git.assets/image-20220113205932510.png)

#### 7、IDEA使用token登录

 ![image-20220113205957577](Git.assets/image-20220113205957577.png)

#### 8、登录成功

 ![image-20220113210001666](Git.assets/image-20220113210001666.png)

###  (二)、使用IDEA创建远程库并上传

#### 1、创建并上传

 ![image-20220113210007773](Git.assets/image-20220113210007773.png)

![image-20220113210013625](Git.assets/image-20220113210013625.png)

#### 2、创建中

 ![image-20220113210017005](Git.assets/image-20220113210017005.png)

#### 3、验证

 ![image-20220113210019761](Git.assets/image-20220113210019761.png)

 ![image-20220113210024160](Git.assets/image-20220113210024160.png)

### (三)、上传到远程库

#### 1、修改现在的类信息

 ![image-20220113210028559](Git.assets/image-20220113210028559.png)

#### 2、添加暂存区,本地仓库

 ![image-20220113210031778](Git.assets/image-20220113210031778.png)

#### 4、上传到远程仓库

 ![image-20220113210035856](Git.assets/image-20220113210035856.png)

#### 5、默认是https登录

 ![image-20220113210041284](Git.assets/image-20220113210041284.png)

#### 6、设置ssh免密登录

​     ![image-20220113210044442](Git.assets/image-20220113210044442.png)

 ![image-20220113210048145](Git.assets/image-20220113210048145.png)

![image-20220113210051314](Git.assets/image-20220113210051314.png)

#### 7、添加ssh成功

![image-20220113210135633](Git.assets/image-20220113210135633.png)

#### 8、push上传

![image-20220113210142398](Git.assets/image-20220113210142398.png)

#### 9、查看

 ![image-20220113210145625](Git.assets/image-20220113210145625.png)

### (四)、拉取本地仓库文件

#### 1、修改远程仓库的代码并提交

 ![image-20220113210203348](Git.assets/image-20220113210203348.png)

#### 2、使用IDEA拉取远程仓库文件

 ![image-20220113210206623](Git.assets/image-20220113210206623.png)

#### 3、拉取窗口

 ![image-20220113210211022](Git.assets/image-20220113210211022.png)

#### 4、拉取成功

 ![image-20220113210214847](Git.assets/image-20220113210214847.png)

### (五)、克隆远程仓库

#### 1、首先关闭IDEA在本地删除那个项目

 ![image-20220113210218160](Git.assets/image-20220113210218160.png)

#### 2、打开IDEA

 ![image-20220113210222846](Git.assets/image-20220113210222846.png)

#### 3、使用URL获取

 ![image-20220113210226462](Git.assets/image-20220113210226462.png)

#### 4、IDEA根据登录用户自动扫描远程仓库

 ![image-20220113210230261](Git.assets/image-20220113210230261.png)

#### 5、克隆成功

 ![image-20220113210232856](Git.assets/image-20220113210232856.png)

## 六、Gitee

### (一)、创建远程仓库

 ![image-20220113210311789](Git.assets/image-20220113210311789.png)

 ![image-20220113210315209](Git.assets/image-20220113210315209.png)

### (二)、上传,拉取,克隆

#### 1、码云的上传,拉取,克隆和github一模一样

### (三)、IDEA集成Gitee

 ![image-20220113210323489](Git.assets/image-20220113210323489.png)

### (四)、码云导入github项目

#### 1、点击创建项目

 ![image-20220113210335396](Git.assets/image-20220113210335396.png)

#### 2、复制github的Https连接

 ![image-20220113210337929](Git.assets/image-20220113210337929.png)

#### 3、添加现有仓库

 ![image-20220113210342603](Git.assets/image-20220113210342603.png)

#### 4、输入连接导入

 ![image-20220113210346053](Git.assets/image-20220113210346053.png)

#### 5、当github更新后,更新gitee项目

 ![image-20220113210351544](Git.assets/image-20220113210351544.png)

## 七、GitLab

### (一)、安装gitlab

#### 1、准备一台差不多配置的Centos

#### 2、将gitlab镜像上传到/opt/module文件中

#### 3、编写脚本

```shell
vim gitlab-install.sh
sudo rpm -ivh /opt/module/gitlab-ce-13.10.2-ce.0.el7.x86_64.rpm
sudo yum install -y curl policycoreutils-python openssh-server cronie
sudo lokkit -s http -s ssh
sudo yum install -y postfix
sudo service postfix start
sudo chkconfig postfix on
curl https://packages.gitlab.com/install/repositories/gitlab/gitlabce/script.rpm.sh | sudo bash
sudo EXTERNAL_URL="http://gitlab.example.com" yum -y install gitlabce
```

#### 4、添加执行权限

```
chmod –x gitlab-install.sh
```

#### 5、执行脚本

```
./gitlab-install.sh
```

#### 6、初始化GitLab服务

```
gitlab-ctl reconfigure
gitlab Reconfigured!  出现这个为成功
```

#### 7、开启&关闭服务

```
gitlab-ctl start
gitlab-ctl stop
```

### (二)、创建项目

#### 1、登录

修改本地host文件即可域名和ip都能访问,默认80端口

![image-20220113210507650](Git.assets/image-20220113210507650.png)

Gitlab自己会帮你创建一个root的账户,当你进行浏览器访问的时候会让你添加密码

#### 2、创建项目

 ![image-20220113210512842](Git.assets/image-20220113210512842.png)

   ![image-20220113210516099](Git.assets/image-20220113210516099.png)

![image-20220113210522683](Git.assets/image-20220113210522683.png)

(三)、IDEA集成GitLab

 ![image-20220113210528790](Git.assets/image-20220113210528790.png)

#### 3、复制链接

 ![image-20220113210532597](Git.assets/image-20220113210532597.png)

#### 4、修改链接(默认给的是一个模板,修改成自己的链接)

 ![image-20220113210537899](Git.assets/image-20220113210537899.png)

http://gitlab-server/root/git-test.git

#### 5、IDEA连接GitLab

 ![image-20220113210543617](Git.assets/image-20220113210543617.png)

#### 6、自定义连接

 ![image-20220113210549576](Git.assets/image-20220113210549576.png)

### (三)、上传,拉取,克隆

#### 1、都和github一模一样