# 尚筹网

## 一、环境搭建

### (一)、创建空项目

![image-20220211143922688](尚筹网SpringBoot.assets/image-20220211143922688.png)

![image-20220211144013924](尚筹网SpringBoot.assets/image-20220211144013924.png)

### (二)、创建Springboot项目

![image-20220211144026788](尚筹网SpringBoot.assets/image-20220211144026788.png)

![image-20220211144040820](尚筹网SpringBoot.assets/image-20220211144040820.png)

![image-20220211144140764](尚筹网SpringBoot.assets/image-20220211144140764.png)

![image-20220211144234445](尚筹网SpringBoot.assets/image-20220211144234445-16445617550791.png)

### (三)、导入依赖

```xml
        <!--SpringMvc-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--thymeleaf-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <!--连接池-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.10</version>
        </dependency>
        <!--jdbc-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jdbc</artifactId>
        </dependency>
        <!--驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
        <!--mybatis-plus-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.1</version>
        </dependency>
        <!--lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <!--测试-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!--JSON-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-json</artifactId>
            <version>2.3.4.RELEASE</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>
```

### (四)、创建数据库和表

```mysql
CREATE DATABASE `project_crowd` CHARACTER SET utf8;

USE project_crowd;
DROP TABLE IF EXISTS t_admin;
CREATE TABLE t_admin
(
     id            INT NOT NULL AUTO_INCREMENT,  # 主键
     login_acct    VARCHAR(255) NOT NULL,        # 登录账号
     user_pswd     CHAR(32) NOT NULL,            # 登录密码
     user_name     VARCHAR(255) NOT NULL,        # 昵称
     email         VARCHAR(255) NOT NULL,        # 邮箱
     create_time   CHAR(19),                     # 创建时间
     PRIMARY KEY (id)                            # 设置主键
);
```

## 二、整合Mybatis-plus

### (一)、添加在resource下创建application.yaml

```properties
spring.application.name=shangchouwang
server.port=8888
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/project_crowd?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.datasource.username=root
spring.datasource.password=Qwer1234
```

### (二)、实体类 

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
    private Integer id;
    private String loginAcct;
    private String userPswd;
    private String userName;
    private String email;
    private String createTime;
}
```

### (三)、Dao

```java
@Mapper
public interface AdminMapper extends BaseMapper<Admin> {
}
```

### (四)、Mapper

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.ma.shangchouwang.mapper.AdminMapper" >
</mapper>
```

### (五)、service和实现类

```java
@Service
public interface AdminService extends IService<Admin> {
    
}
```

```java
@Component
public class AdminServiceImpl extends ServiceImpl<AdminMapper,Admin> implements AdminService {
    
}
```

### (六)、controller

```java
@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/testMybatis/{id}")
    public Admin selectAdminById(@PathVariable("id")Integer id){
        return adminService.selectAdminById(id);
    }
}
```

### (七)、使用日志

```properties
mybatis-plus.configuration.log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

### (二)、测试

启动项目

访问:http://localhost:8888/testMybatis/2

![image-20220211155923939](尚筹网SpringBoot.assets/image-20220211155923939.png)

![image-20220215134423233](尚筹网SpringBoot.assets/image-20220215134423233.png)

## 三、发送JSON数据

### (一)、发送JSON数据

#### 1、HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript" src="./js/jquery.min.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#but1").click(function () {
                const arr = [5, 7, 9];       // 要发送的数据
                const jsonVar = JSON.stringify(arr);  // 将括号内转换为JSON形式
                $.ajax({
                    "url": "/test/send/json",     // 请求地址
                    "type": "post",  // 请求方式
                    "data": jsonVar, // 请求参数
                    "contentType": "application/json;charset=UTF-8", // 参数类型
                    "dataType": "text",
                    "success": function (response) { // 成功执行
                        console.log("成功")
                    },
                    "error": function (response) {   // 失败执行
                        console.log("失败")
                    }
                })

            });
        })
    </script>
</head>
<body>
    <button id="but1">发送JSON数据</button>
</body>
</html>
```

#### 2、controller

```java
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {

    @PostMapping("/test/send/json")
    public List<Integer> testSendJson(@RequestBody List<Integer> array){
        return array;
    }
}
```

#### 3、测试

![image-20220317180058349](尚筹网SpringBoot.assets/image-20220317180058349.png)

### (二)、发送复杂的JSON数据

#### 1、实体类

- Address

  ```java
  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public class Address {
  
      private String province;
      private String city;
      private String street;
  
  }
  ```

- Student

  ```java
  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public class Student {
  
      private Integer stuId;
      private String stuName;
      private Address address;
      private List<Subject> subjectList;
      private Map<String,String> map;
  }
  ```

- SubJect

  ```java
  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public class Subject {
  
      private String subjectName;
      private Integer subjectId;
  }
  ```

#### 2、HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript" src="./js/jquery.min.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#but1").click(function () {
                var student = {
                    stuId:5,
                    stuName:"tom",
                    address:{
                        province:"河南",
                        city:"郑州",
                        street:"河南职业技术学院"
                    },
                    subjectList:[
                        {
                            subName:"java",
                            subScore:100
                        },
                        {
                            subName: "c++",
                            subScore: 98
                        }
                    ],
                    map:{
                        key1:"value1",
                        key2:"value2"
                    }
                };
                var requestBody = JSON.stringify(student);
                $.ajax({
                    url:"/test/send/fuzaJson",
                    type:"post",
                    data:requestBody,
                    contentType:"application/json;character=UTF-8",
                    dataType:"text",
                    success:function (resp) {
                        console.log("成功")
                    },
                    error:function (resp) {
                        console.log("失败")
                    }
                })
            });
        })
    </script>
</head>
<body>
    <button id="but1">发送JSON复杂数据</button>
</body>
</html>
```

#### 3、测试

![image-20220317182939719](尚筹网SpringBoot.assets/image-20220317182939719.png)

### (三)、返回JSON数据

```java
@Data
@NoArgsConstructor
public class ResultJson<T> {

    private Integer number;
    private String message;
    private T data;


    public ResultJson(Integer num, String message){
        this(num,message,null);
    }

    public ResultJson(Integer num, String message, T t){
        this.number=num;
        this.message=message;
        this.data=t;
    }

}
```

## 四、异常处理

### (一)、SpringBoot自带异常检测

#### 1、存放出错网页

由于SpringBoot自带异常检测,只需要在templates中放入4xx.html和5xx.html只要程序报错就会跳转到对应的页面

![image-20220319115343201](尚筹网SpringBoot.assets/image-20220319115343201.png)

#### 2、controller设置错误

```java
@GetMapping("/test/send/fuzaJson1")
public HttpServletRequest testSendJson1(String str, HttpServletRequest request){
   request.setAttribute("message", "报错了哦");
   int a = 10 /0;
   return request;
}
```

#### 3、出错HTML

```html
<h2 th:text="${status}">OOOPS!!!</h2>
<h3 th:text="${message}">Something went wrong.</h3>
```

#### 4、演示

访问:http://localhost:8888/test/send/fuzaJson1?str=1

![image-20220322182621265](尚筹网SpringBoot.assets/image-20220322182621265.png)

### (二)、自定义异常

#### 1、定义自定义异常类

```java
@ControllerAdvice
public class CustomError {

	// 异常类注解({预想的错误})   
    @ExceptionHandler({ArithmeticException.class,NullPointerException.class})
    public String customErrorNumNull() {
        return "error/CustomError";  	//跳转的自定义页面
    }
}
```

#### 2、自定义出错页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<h1>我自己定义的异常</h1>
</body>
</html>
```

#### 3、测试

访问:http://localhost:8888/test/send/fuzaJson1?str=1

![image-20220322183039412](尚筹网SpringBoot.assets/image-20220322183039412.png)

## 五、登录

### (一)、添加登录网页

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="keys" content="">
<meta name="author" content="">
<link rel="stylesheet" th:href="@{bootstrap/css/bootstrap.min.css}">
<link rel="stylesheet" th:href="@{css/font-awesome.min.css}">
<link rel="stylesheet" th:href="@{css/login.css}">
<link rel="stylesheet" th:href="@{static/css/login.css}">
<script th:src="@{js/jquery-2.1.1.min.js}"></script>
<script th:src="@{bootstrap/js/bootstrap.min.js}"></script>
<style>
</style>
<title>尚筹网</title>
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<div>
					<a class="navbar-brand" href="index.html" style="font-size: 32px;">尚筹网-创意产品众筹平台</a>
				</div>
			</div>
		</div>
	</nav>

	<div class="container">

		<form action="admin/do/login.html" method="post" class="form-signin" role="form">
			<h2 class="form-signin-heading">
				<i class="glyphicon glyphicon-log-in"></i> 管理员登录
			</h2>
			<p th:text="${loginMessageInfo}"></p>
			<div class="form-group has-success has-feedback">
				<input type="text" name="loginAcct" class="form-control" id="inputSuccess4"
					placeholder="请输入登录账号" autofocus> <span
					class="glyphicon glyphicon-user form-control-feedback"></span>
			</div>
			<div class="form-group has-success has-feedback">
				<input type="text" name="userPswd" class="form-control" id="inputSuccess4"
					placeholder="请输入登录密码" style="margin-top: 10px;"> <span
					class="glyphicon glyphicon-lock form-control-feedback"></span>
			</div>
			<button type="submit" class="btn btn-lg btn-success btn-block">登录</button>
		</form>
	</div>
</body>
</html>
```

### (二)、根路径跳转

```java
@Controller
public class IndexController {

    //设置访问目录,如果是/或/login跳转到login目录
    @GetMapping(value = {"/","/login"})
    public String indexPage(){
        return "admin-login";
    }
}
```

### (三)、引入layer

#### 1、引入

```html
<script type="text/javascript" src="layer/layer.js"></script>
```

#### 2、使用

```html
<button id="btn04">layer</button>

$("#btn04").click(function (){
  layer.msg("layer的弹框");
});
```

### (四)、错误页改进

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="keys" content="">
	<meta name="author" content="">
	<link rel="stylesheet" href="../../bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="../../css/login.css">
	<link rel="stylesheet" href="../../css/font-awesome.min.css">
<style>
</style>
<title>尚筹网</title>
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<div>
					<a class="navbar-brand" href="index.html" style="font-size: 32px;">尚筹网-系统出错页面</a>
				</div>
			</div>
		</div>
	</nav>

	<div class="container">

		<form action="admin/do/login.html" method="post" class="form-signin" role="form">
			<h2 class="form-signin-heading">
				<i class="glyphicon glyphicon-log-in"></i> 系统出现了错误
			</h2>
			<p th:text="${errorInfo}"></p>
			<button type="submit" class="btn btn-lg btn-success btn-block">返回上一级</button>
		</form>
	</div>
</body>
</html>
```

### (五)、业务类

#### 1、Controller

```java
    @PostMapping("/loginUser")
    public String loginUser(@RequestParam("loginAcct")String loginAcct,
                            @RequestParam("userPswd")String userPswd, Model model, HttpSession session){
        if(loginAcct == null|| userPswd==null||loginAcct.length()<=0||userPswd.length()<=0){
            model.addAttribute("loginMessageInfo", "账户或密码为null或者长度小于1");
            return "admin-login";
        }
        Admin admin = adminService.getAdminUserAndPasswd(loginAcct,userPswd);
        if(admin == null){
            model.addAttribute("loginMessageInfo", "账户或密码输入错误");
            return "admin-login";
        }
        session.setAttribute("loginUserSession",admin);

        return "redirect:/main";
    }

    @GetMapping("/main")
    public String main(){
        return "main";
    }
```

#### 2、Service接口

```java
@Service
public interface AdminService extends IService<Admin> {
    Admin getAdminUserAndPasswd(String username,String password);
}
```

#### 3、Service实现类

```java
@Component
public class AdminServiceImpl extends ServiceImpl<AdminMapper,Admin> implements AdminService {

    @Autowired
    private AdminMapper adminMapper;

    @Override
    public Admin getAdminUserAndPasswd(String username, String password) {
        if(username != null && username.length()>0 || password != null && password.length()>0){
            Map<String, Object> map = new HashMap<>();
            map.put("username",username);
            String newPasswd = CurrencyUtil.encryptionMD5(password);
            map.put("password",newPasswd);
            Admin databaseUser = adminMapper.getAdminUserAndPasswd(map);
            System.out.println(databaseUser);
            System.out.println(username+"    "+newPasswd);
            if(databaseUser != null){
                if(Objects.equals(username,databaseUser.getLoginAcct()) && Objects.equals(newPasswd,databaseUser.getUserPswd())){
                    return databaseUser;
                }
            }
        }
        return null;
    }
}
```

#### 4、Mapper接口

```java
@Mapper
@Repository
public interface AdminMapper extends BaseMapper<Admin> {
    Admin getAdminUserAndPasswd(Map<String,Object> map);
}
```

#### 5、Mapper

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.ma.shangchouwang.mapper.AdminMapper" >

    <select id="getAdminUserAndPasswd" parameterType="map" resultType="com.ma.shangchouwang.entity.Admin">
        select * from t_admin where login_acct = #{username} and user_pswd = #{password}
  </select>
</mapper>
```

### (六)、主页面

#### 1、主界面并抽取公共页

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<title>主页</title>
	<div th:replace="common :: #tobuScript"></div>
    <link rel="stylesheet" th:href="@{css/main.css}">
    <style>
        .tree li {
            list-style-type: none;
            cursor: pointer;
        }

        .tree-closed {
            height: 40px;
        }

        .tree-expanded {
            height: auto;
        }
    </style>


</head>

<body>

<div th:replace="common :: #tobuxinxilan"></div>
<div class="container-fluid">
	<div class="row">
		<div th:replace="common :: #zuobianxinxilan"></div>
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<h1 class="page-header">控制面板</h1>

			<div class="row placeholders">
				<div class="col-xs-6 col-sm-3 placeholder">
					<img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">
					<h4>Label</h4>
					<span class="text-muted">Something else</span>
				</div>
				<div class="col-xs-6 col-sm-3 placeholder">
					<img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="Generic placeholder thumbnail">
					<h4>Label</h4>
					<span class="text-muted">Something else</span>
				</div>
				<div class="col-xs-6 col-sm-3 placeholder">
					<img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">
					<h4>Label</h4>
					<span class="text-muted">Something else</span>
				</div>
				<div class="col-xs-6 col-sm-3 placeholder">
					<img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="Generic placeholder thumbnail">
					<h4>Label</h4>
					<span class="text-muted">Something else</span>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(function () {
		$(".list-group-item").click(function(){
			if ( $(this).find("ul") ) {
				$(this).toggleClass("tree-closed");
				if ( $(this).hasClass("tree-closed") ) {
					$("ul", this).hide("fast");
				} else {
					$("ul", this).show("fast");
				}
			}
		});
	});
</script>
</body>

</html>
```

#### 2、公共页

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head id="tobuScript">
    <meta charset="UTF-8">
    <link rel="stylesheet" th:href="@{bootstrap/css/bootstrap.min.css}">
    <link rel="stylesheet" th:href="@{css/font-awesome.min.css}">
    <script th:src="@{js/jquery-2.1.1.min.js}"></script>
    <script th:src="@{bootstrap/js/bootstrap.min.js}"></script>
    <script th:src="@{script/docs.min.js}"></script>
</head>
<body>
    <div id="tobuxinxilan">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <div><a class="navbar-brand" style="font-size:32px;" href="#">众筹平台 - 控制面板</a></div>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li style="padding-top:8px;">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default btn-success dropdown-toggle"
                                        data-toggle="dropdown">
                                    <i class="glyphicon glyphicon-user"></i> <span
                                        th:text="${session.loginUserSession.getUserName()}">aaaa</span> <span
                                        class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#"><i class="glyphicon glyphicon-cog"></i> 个人设置</a></li>
                                    <li><a href="#"><i class="glyphicon glyphicon-comment"></i> 消息</a></li>
                                    <li class="divider"></li>
                                    <li><a href="admin/do/logout.do"><i class="glyphicon glyphicon-off"></i> 退出系统</a></li>
                                </ul>
                            </div>
                        </li>
                        <li style="margin-left:10px;padding-top:8px;">
                            <button type="button" class="btn btn-default btn-danger">
                                <span class="glyphicon glyphicon-question-sign"></span> 帮助
                            </button>
                        </li>
                    </ul>
                    <form class="navbar-form navbar-right">
                        <input type="text" class="form-control" placeholder="查询">
                    </form>
                </div>
            </div>
        </nav>
    </div>
    <div id="zuobianxinxilan">
        <div class="col-sm-3 col-md-2 sidebar">
            <div class="tree">
                <ul style="padding-left:0px;" class="list-group">
                    <li class="list-group-item tree-closed" >
                        <a href="main.html"><i class="glyphicon glyphicon-dashboard"></i> 控制面板</a>
                    </li>
                    <li class="list-group-item tree-closed">
                        <span><i class="glyphicon glyphicon glyphicon-tasks"></i> 权限管理 <span class="badge" style="float:right">3</span></span>
                        <ul style="margin-top:10px;display:none;">
                            <li style="height:30px;">
                                <a href="user.html"><i class="glyphicon glyphicon-user"></i> 用户维护</a>
                            </li>
                            <li style="height:30px;">
                                <a href="role.html"><i class="glyphicon glyphicon-king"></i> 角色维护</a>
                            </li>
                            <li style="height:30px;">
                                <a href="permission.html"><i class="glyphicon glyphicon-lock"></i> 菜单维护</a>
                            </li>
                        </ul>
                    </li>
                    <li class="list-group-item tree-closed">
                        <span><i class="glyphicon glyphicon-ok"></i> 业务审核 <span class="badge" style="float:right">3</span></span>
                        <ul style="margin-top:10px;display:none;">
                            <li style="height:30px;">
                                <a href="auth_cert.html"><i class="glyphicon glyphicon-check"></i> 实名认证审核</a>
                            </li>
                            <li style="height:30px;">
                                <a href="auth_adv.html"><i class="glyphicon glyphicon-check"></i> 广告审核</a>
                            </li>
                            <li style="height:30px;">
                                <a href="auth_project.html"><i class="glyphicon glyphicon-check"></i> 项目审核</a>
                            </li>
                        </ul>
                    </li>
                    <li class="list-group-item tree-closed">
                        <span><i class="glyphicon glyphicon-th-large"></i> 业务管理 <span class="badge" style="float:right">7</span></span>
                        <ul style="margin-top:10px;display:none;">
                            <li style="height:30px;">
                                <a href="cert.html"><i class="glyphicon glyphicon-picture"></i> 资质维护</a>
                            </li>
                            <li style="height:30px;">
                                <a href="type.html"><i class="glyphicon glyphicon-equalizer"></i> 分类管理</a>
                            </li>
                            <li style="height:30px;">
                                <a href="process.html"><i class="glyphicon glyphicon-random"></i> 流程管理</a>
                            </li>
                            <li style="height:30px;">
                                <a href="advertisement.html"><i class="glyphicon glyphicon-hdd"></i> 广告管理</a>
                            </li>
                            <li style="height:30px;">
                                <a href="message.html"><i class="glyphicon glyphicon-comment"></i> 消息模板</a>
                            </li>
                            <li style="height:30px;">
                                <a href="project_type.html"><i class="glyphicon glyphicon-list"></i> 项目分类</a>
                            </li>
                            <li style="height:30px;">
                                <a href="tag.html"><i class="glyphicon glyphicon-tags"></i> 项目标签</a>
                            </li>
                        </ul>
                    </li>
                    <li class="list-group-item tree-closed" >
                        <a href="param.html"><i class="glyphicon glyphicon-list-alt"></i> 参数管理</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
```

### (七)、拦截器

#### 1、拦截的内容

```java
@Configuration
public class LoginInterceptorConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //添加的自定义拦截器
        registry.addInterceptor(new LoginInterceptor())
                //拦截什么规则
                .addPathPatterns("/**")
                //排除规则
                .excludePathPatterns("/","/login","/css/**","fonts/**","/img/**","/js/**","/bootstrap/**","/layer/**","/script/**","/ztree/**");
    }
}
```

#### 2、拦截器设置

```java
@Component
public class LoginInterceptor implements HandlerInterceptor {

    //访问数据处理业务之前
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        //获得session
        HttpSession session = request.getSession();
        //取出session中用户的值
        Object loginUser = session.getAttribute("loginUserSession");
        //判断用户是否为空
        if(loginUser != null){
            //不为空放行
            return true;
        }

        //为空添加域信息返回给客户端并显示
        request.setAttribute("loginMessageInfo","请先登录");
        //转发到登录页面
        request.getRequestDispatcher("/").forward(request,response);
        return false;
    }

    //访问数据处理业务之后
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }
}
```

## 六、分页页面管理

### (一)、添加数据

在数据库添加任意条数据

### (二)、分页

#### 1、前端页面

```html
<div class="table-responsive">
    <table class="table  table-bordered">
        <thead>
        <tr>
            <th width="30">#</th>
            <th width="30"><input type="checkbox"></th>
            <th>账号</th>
            <th>名称</th>
            <th>邮箱地址</th>
            <th width="100">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="admin,indexStat : ${pageAdmin.getRecords()}">
            <td th:text="${indexStat.index+1}">1</td>
            <td><input type="checkbox"></td>
            <td th:text="${admin.getLoginAcct()}">Lorem</td>
            <td th:text="${admin.getUserName()}">ipsum</td>
            <td th:text="${admin.getEmail()}">dolor</td>
            <td>
                <button type="button" class="btn btn-success btn-xs"><i
                        class=" glyphicon glyphicon-check"></i></button>
                <button type="button" class="btn btn-primary btn-xs"><i
                        class=" glyphicon glyphicon-pencil"></i></button>
                <a th:href="@{/admin/remove(adminId=${admin.getId()},pageNum=${pageAdmin.getCurrent()},keyword=${keyword})}" id="delete" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-remove"></i> </a>
            </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="6" align="center">
                <div id="Pagination" class="pagination"><!-- 这里显示分页 --></div>
            </td>
        </tr>
        </tfoot>
    </table>
</div>
```

#### 2、javaScript

```javascript
<div th:replace="common :: #tobuScript"></div>
<link rel="stylesheet" th:href="@{css/main.css}">
<link rel="stylesheet" th:href="@{css/pagination.css}">
<script type="text/javascript" th:src="@{js/jquery.pagination.js}"></script>

<script th:inline="javascript">
    $(function(){
        // 调用后面声明的函数对页码导航条进行初始化操作
        initPagination();
    });
    function initPagination() {
        // 获取总记录数
        var totalRecord = [[${pageAdmin.getTotal}]];
        // 声明一个JSON对象存储Pagination要设置的属性
        var properties = {
            num_edge_entries: 3, // 边缘页数
            num_display_entries: 5, // 主体页数
            callback: pageselectCallback,
            items_per_page:[[${pageAdmin.getSize()}]], // 每页显示1项
            current_page: [[${pageAdmin.getCurrent()}]]-1, // Paginaton内部使用pageIndex来管理页码，从0开始，而pageNum从1开始
            prev_text: "上一页",
            next_text: "下一页"
        };
        // 生成页码导航条
        $("#Pagination").pagination(totalRecord, properties);
    }
    // 用户点击页码时调用该函数实现跳转
    function pageselectCallback(pageIndex, jQuery) {

        // 根据pageIndex计算得到pageNum
        var pageNum = pageIndex+1;
        // 跳转页码
         window.location.href = "/pageAdmin?pageNum="+pageNum+"&keyword="+[[${keyword}]];
        // 由于每一个页码按钮都是超链接，所以在这个函数最后取消超链接的默认行为
        return false;
    }
</script>
```

#### 3、Controller

```java
    @GetMapping("/pageAdmin")
    public String pageAdmin(@RequestParam(value = "keyword",defaultValue = "")String keyword,
                            @RequestParam(value = "pageNum",defaultValue = "1")Integer pageNum,
                            Model model){
        Page<Admin> page = new Page<>(pageNum,5);
        QueryWrapper<Admin> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("login_acct", keyword);
        Page<Admin> page1 = adminService.page(page, queryWrapper);

        model.addAttribute("pageAdmin",page1);
        model.addAttribute("keyword",keyword);
        return "user";
    }
```

### (二)、模糊查询

#### 1、前端请求

```html
<form action="/likePage" class="form-inline" role="form" style="float:left;" method="post">
    <div class="form-group has-feedback">
        <div class="input-group">
            <div class="input-group-addon">查询条件</div>
            <input hidden="hidden" name="pageNum" th:value="${pageAdmin.getCurrent()}">
            <input name="keyword" class="form-control has-success" type="text" th:value="${keyword}" placeholder="请输入查询条件">
        </div>
    </div>
    <button type="submit" class="btn btn-warning"><i class="glyphicon glyphicon-search"></i> 查询</button>
</form>
```

#### 2、Controller

```java
@PostMapping("/likePage")
public String likePage(@RequestParam(value = "keyword",defaultValue = "")String keyword,
                       @RequestParam("pageNum")Integer pageNum,
                       Model model){
    Page<Admin> page = new Page<>(pageNum,5);
    QueryWrapper<Admin> queryWrapper = new QueryWrapper<>();
    queryWrapper.like("login_acct", keyword);
    Page<Admin> page1 = adminService.page(page, queryWrapper);

    model.addAttribute("pageAdmin",page1);
    model.addAttribute("keyword",keyword);
    return "user";
}
```

### (三)、删除

#### 1、前端请求

```html
<a th:href="@{/admin/remove(adminId=${admin.getId()},pageNum=${pageAdmin.getCurrent()},keyword=${keyword})}" id="delete" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-remove"></i> </a>
```

#### 2、Controller

```java
@GetMapping("/admin/remove")
public String adminRemove(@RequestParam("adminId")Integer adminId,
                          @RequestParam("pageNum")Integer pageNum,
                          @RequestParam("keyword")String keyword){
    boolean b = adminService.removeById(adminId);
    if(b){
        String url = "redirect:/pageAdmin?pageNum="+pageNum+"&keyword="+keyword;
        return url;
    }else{
        throw new RuntimeException();
    }
}
```

### (四)、新增

#### 1、修改数据库

```mysql
# 为用户名添加唯一约束 
ALTER TABLE `t_admin` ADD UNIQUE INDEX (`login_acct`);
```

#### 2、前端页面

```java
<button type="button" class="btn btn-primary" style="float:right;"
        onclick="window.location.href='/add'"><i class="glyphicon glyphicon-plus"></i> 新增
</button>
```

#### 3、Controller

```java
@GetMapping("/add")
public String add(){
    return "add";
}
```

```java
@GetMapping("/admin/insert")
public String adminInserte(Admin admin){
    Random random = new Random();
    int i = random.nextInt(3000);
    admin.setId(i);
    String s = CurrencyUtil.encryptionMD5(admin.getUserPswd());
    admin.setUserPswd(s);
    admin.setCreateTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
    boolean save = adminService.save(admin);

    if(save){
        String url = "redirect:/pageAdmin?keyword="+admin.getLoginAcct();
        return url;
    }
    else {
        throw new RuntimeException();
    }
}
```

### (五)、更新

#### 1、前端页面

user

```html
<a th:href="@{/selectByid(adminId=${admin.getId()})}" class="btn btn-primary btn-xs"><i class=" glyphicon glyphicon-pencil"></i></a>
```

edit

```html
<form role="form" action="/admin/update" method="post">
  <div class="form-group">
   <label for="exampleInputPassword1">登陆账号</label>
   <input type="text" class="form-control" id="exampleInputPassword1" name="loginAcct" th:value="${updateAdmin.getLoginAcct()}" value="test">
  </div>
   <input hidden="hidden" name="id" th:value="${adminId}">
  <div class="form-group">
   <label for="exampleInputPassword1">用户名称</label>
   <input type="text" class="form-control" id="exampleInputPassword1" name="userName" th:value="${updateAdmin.getUserName()}" value="测试用户">
  </div>
  <div class="form-group">
   <label for="exampleInputEmail1">邮箱地址</label>
   <input type="email" class="form-control" id="exampleInputEmail1" name="email" th:value="${updateAdmin.getEmail()}" value="xxxx@xxxx.com">
   <p class="help-block label label-warning">请输入合法的邮箱地址, 格式为： xxxx@xxxx.com</p>
  </div>
  <button type="submit" class="btn btn-success"><i class="glyphicon glyphicon-edit"></i> 修改</button>
  <button type="reset" class="btn btn-danger"><i class="glyphicon glyphicon-refresh"></i> 重置</button>
</form>
```

#### 2、Controller

```java
@GetMapping("/selectByid")
public String adminUpdate(@RequestParam("adminId")Integer adminId,
                          Model model){
    Admin admin = adminService.getById(adminId);
    model.addAttribute("updateAdmin",admin);
    model.addAttribute("adminId",admin.getId());
    return "edit";
}
```

```java
@PostMapping("/admin/update")
public String adminUpdate(Admin admin){
    boolean b = adminService.saveOrUpdate(admin);
    if(b){
        String url = "redirect:/pageAdmin?keyword="+admin.getLoginAcct();
        return url;
    }else {
        throw new RuntimeException();
    }
}
```

## 七、角色维护

### (一)、创建数据库

```mysql
CREATE TABLE `t_role` (
    id INT NOT NULL AUTO_INCREMENT,
    NAME CHAR(100),
    PRIMARY KEY (id)
);
```

### (二)、Mybatis-plus生成mapper,dao,service

#### 1、导入依赖

```xml
<!--mybatis代码生成插件-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.1</version>
</dependency>
<!--小弟-->
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.31</version>
</dependency>
```

#### 2、生成类

```java
public class MybatisPlusTable {

    public static void main(String[] args) {
        // 设置我们需要创建在哪的路径
        String xmlPath = "F:\\尚筹网SpringBoot\\shangchouwang\\src\\main\\resources\\mapper";
        String Path = "F:\\尚筹网SpringBoot\\shangchouwang\\src\\main\\java";
        // 数据源
        FastAutoGenerator.create("jdbc:mysql://localhost:3306/project_crowd?serverTimezone=GMT%2B8&characterEncoding=utf-8&useSSL=false", "root", "Qwer1234")
                .globalConfig(builder -> {
                    builder.author("ma") // 设置作者
                            // .enableSwagger() // 开启 swagger 模式
                            .fileOverride() // 覆盖已生成文件
                            .outputDir(Path); // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent("com.ma") // 设置父包名
                            .moduleName("shangchouwang") // 设置父包模块名
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, xmlPath)); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.addInclude("t_role") // 设置需要生成的表名
                            .addTablePrefix("t_", "c_"); // 设置过滤表前缀
                }).templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker 引擎模板，默认的是Velocity引擎模板
                .execute();
    }
}
```

### (三)、初始角色分页及条件查询

#### 1、common

```html
<li style="height:30px;">
    <a href="/role"><i class="glyphicon glyphicon-king"></i> 角色维护</a>
</li>
```

#### 2、role

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <div th:replace="common :: #tobuScript"></div>
    <link rel="stylesheet" th:href="@{css/main.css}">
    <script th:src="@{js/My-Role.js}"></script>
    <link rel="stylesheet" th:href="@{css/pagination.css}">
    <script type="text/javascript" th:src="@{js/jquery.pagination.js}"></script>
    <style>
        .tree li {
            list-style-type: none;
            cursor: pointer;
        }

        table tbody tr:nth-child(odd) {
            background: #F4F4F4;
        }

        table tbody td:nth-child(even) {
            color: #C00;
        }
    </style>
</head>

<body>

<div th:replace="common :: #tobuxinxilan"></div>
<div class="container-fluid">
    <div class="row">
        <div th:replace="common :: #zuobianxinxilan"></div>


        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 class="page-header">控制面板</h1>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title"><i class="glyphicon glyphicon-th"></i> 数据列表</h3>
                </div>
                <div class="panel-body">
                    <form class="form-inline" role="form" style="float:left;">
                        <div class="form-group has-feedback">
                            <div class="input-group">
                                <div class="input-group-addon">查询条件</div>
                                <input id="keywordInput" class="form-control has-success" type="text" placeholder="请输入查询条件">
                            </div>
                        </div>
                        <button id="searchBtn" type="button" class="btn btn-warning"><i class="glyphicon glyphicon-search"></i> 查询</button>
                    </form>
                    <button type="button" class="btn btn-danger" style="float:right;margin-left:10px;"><i
                            class=" glyphicon glyphicon-remove"></i> 删除
                    </button>
                    <button type="button" class="btn btn-primary" style="float:right;"
                            onclick="window.location.href='form.html'"><i class="glyphicon glyphicon-plus"></i> 新增
                    </button>
                    <br>
                    <hr style="clear:both;">
                    <div class="table-responsive">
                        <table class="table  table-bordered">
                            <thead>
                            <tr>
                                <th width="30">#</th>
                                <th width="30"><input type="checkbox"></th>
                                <th>名称</th>
                                <th width="100">操作</th>
                            </tr>
                            </thead>
                            <tbody id="rolePageBody">

                            </tbody>
                            <tfoot>
                            <tr>
                                <td colspan="6" align="center">
                                    <div id="Pagination" class="pagination"><!--这里显示分页--></div>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script th:inline="javascript">


    $(function () {
        $(".list-group-item").click(function () {
            if ($(this).find("ul")) {
                $(this).toggleClass("tree-closed");
                if ($(this).hasClass("tree-closed")) {
                    $("ul", this).hide("fast");
                } else {
                    $("ul", this).show("fast");
                }
            }
        });
    });
    
    (function (){
        // 1.为分页操作准备初始化数据
        window.pageNum = 1;
        window.keyword = "";
        // 2. 调用分页函数，实现分页效果
        generatePage();
    })();

    $("tbody .btn-success").click(function () {
        window.location.href = "assignPermission.html";
    });
    
    $("#searchBtn").click(function (){
        window.keyword = $("#keywordInput").val();
        generatePage();
    });
</script>
</body>
</html>
```

#### 3、my-role.js

```javascript
// 执行分页操作
function generatePage() {
    // 1.获取分页数据
    var pageInfo = getPageInfoRemote();
    // 2.填充表格
    fillTableBody(pageInfo);

}

// 远程访问服务器端程序获取pageInfo数据
function getPageInfoRemote() {

    console.log("pageNum=" + window.pageNum);
    var ajaxResult = $.ajax({
        url: "http://localhost:8888/rolePage",
        type: "get",
        data: {
            "pageNum": window.pageNum,
            "keyword": window.keyword
        },
        async: false,
        dataType: "json"
    });
    return ajaxResult.responseJSON;
}

// 填充表格
function fillTableBody(pageInfo) {
    // 清楚原来的内容
    $("#rolePageBody").empty();
    $("#Pagination").empty();
    if (pageInfo.data == null) {
        $("#rolePageBody").append("<tr><td colspan='4' align='center'>抱歉！没有查询到您搜索的数据</td></tr>");
        return;
    }
    // 使用pageInfo的list属性填充tBody
    for (var i = 0; i < pageInfo.data.length; i++) {
        var role = pageInfo.data[i];
        var roleId = role.id;
        var roleName = role.name;

        var numberTd = "<td>" + (i + 1) + "</td>";
        var checkboxTd = "<td><input type='checkbox'></td>";
        var roleNameTd = "<td>" + roleName + "</td>";

        var checkBtn = "<button type=\"button\" class=\"btn btn-success btn-xs\"><i class=\" glyphicon glyphicon-check\"></i></button>";
        var pencilBtn = "<button type=\"button\" class=\"btn btn-primary btn-xs\"><i class=\" glyphicon glyphicon-pencil\"></i></button>";
        var removeBtn = "<button type=\"button\" class=\"btn btn-danger btn-xs\"><i class=\" glyphicon glyphicon-remove\"></i></button>";

        var buttonTd = "<td>" + checkBtn + " " + pencilBtn + " " + removeBtn + "</td>"
        var tr = "<tr>" + numberTd + checkboxTd + roleNameTd + buttonTd + "</tr>";

        $("#rolePageBody").append(tr);
    }
    // 生成分页导航条
    generateNavigator(pageInfo);
}

// 生成分页页码导航条
function generateNavigator(pageInfo) {

    // 获取总记录数
    var totalRecord = pageInfo.number;
    // 声明相关属性
    var properties = {
        "num_edge_entries": 3, // 边缘页数
        "num_display_entries": 5, // 主体页数
        "callback": paginationCallBack,
        "items_per_page": 5, // 每页显示1项
        "current_page": window.pageNum - 1, // Pagination内部使用pageIndex来管理页码，从0开始，而pageNum从1开始
        "prev_text": "上一页",
        "next_text": "下一页"
    };

    // 调用pagination()函数
    $("#Pagination").pagination(totalRecord, properties);

}

// 翻页时的回调函数
function paginationCallBack(pageIndex, jQuery) {
    // 根据pageIndex计算得到pageNum
    window.pageNum = pageIndex + 1;
    // 调用分页函数
    generatePage();
    // 由于每一个页码按钮都是超链接，所以在这个函数最后取消超链接的默认行为
    return false;
}
```

#### 4、Controller

```java
@GetMapping("/role")
public String role(){return "role";}

@ResponseBody
@GetMapping("/rolePage")
public ResultJson<List<Role>> rolePage(@RequestParam(value = "pageNum",defaultValue = "1")Integer pageNum,
                               		   @RequestParam(value = "keyword",defaultValue = "")String keyword){
     Page<Role> page = new Page<>(pageNum,5);
     QueryWrapper<Role> queryWrapper = new QueryWrapper<>();
     queryWrapper.like("name", keyword);
     Page<Role> page1 = roleService.page(page, queryWrapper);
     if(page1 == null){
         return new ResultJson<>(500L,"角色信息获取失败");
     }else{
         return new ResultJson<>(page1.getTotal(),"角色信息成功",page1.getRecords());
     }
}
```

### (四)、新增角色

#### 1、common中添加

```html
 <div id="tanchuang">
        <div id="addModal" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">系统弹窗</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-signin" role="form">
                            <div class="form-group has-success has-feedback">
                                <input type="text" name="roleName" class="form-control" placeholder="请输入角色名称" autofocus>
                                <span class="glyphicon glyphicon-user form-control-feedback"></span>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button id="saveRoleBtn" type="button" class="btn btn-primary">保存</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
```

#### 2、role页面js代码之前添加

```html
<div th:replace="common :: #tanchuang"></div>
```

#### 3、添加js代码

```javascript
// 4. 点击新增打开模态框
$("#showAddModalBtn").click(function (){
    $("#addModal").modal("show");
});
// 5.模态框数据保存
$("#saveRoleBtn").click(function (){
    // 1.获取用户在模态框中输入的角色名，trim去前后空格
    var roleName = $.trim($("#addModal [name=roleName]").val());
    // 发送ajax请求
    $.ajax({
        url: "http://localhost:8888/addAndUpdateRole",
        type: "Get",
        data: {
            name: roleName
        },
        dataType: "json",
        success: function (resp){
            let result = resp.result;
            if (result === "SUCCESS") {
                layer.msg("已保存");

                // 重新加载分页
                window.pageNum = 99999999;
                generatePage();
            }
            if (result === "FAILED") {
                layer.msg("操作失败！"+resp.message);
            }
        },
        error: function (resp) {
            layer.msg(resp.status+""+resp.statusText);
        }
    });

    // 关闭模态框
    $("#addModal").modal("hide");

    // 清理模态框内容
    $("#addModal [name=roleName]").val("");

});
```

#### 4、新增按钮添加id

```html
<button type="button" id="showAddModalBtn" class="btn btn-primary" style="float:right;" ><i class="glyphicon glyphicon-plus"></i> 新增</button>
```

#### 5、controller

```java
@ResponseBody
@GetMapping("/addAndInsertRole")
public ResultJson<String> addRole(Role role){

    boolean b = roleService.saveOrUpdate(role);
    if(b){
        return new ResultJson<>(500L,"角色信息新增或修改失败");
    }else{
        return new ResultJson<>(200L,"角色信息成功");
    }
}
```

### (五)、修改角色

#### 1、js前添加代码

```html
<div id="editModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">系统弹窗</h4>
            </div>
            <div class="modal-body">
                <form class="form-signin" role="form">
                    <div class="form-group has-success has-feedback">
                        <input type="text" name="roleName" class="form-control" placeholder="请输入角色名称" autofocus>
                        <span class="glyphicon glyphicon-user form-control-feedback"></span>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="updateRoleBtn" type="button" class="btn btn-success">更新</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

#### 2、js

```javascript
 	// 6. 更新
    $("#rolePageBody").on("click",".pencilBtn", function (){
        // 打开模态框
        $("#editModal").modal("show");

        // 获取表格中当前行中的角色名称
        var roleName = $(this).parent().prev().text();

        // 获取当前角色id
        window.roleId = this.id;
        // 使用roleName的值设置模态框中的文本框
        $("#editModal [name=roleName]").val(roleName);
    });

    // 7.给更新模态框中的更新按钮绑定单机响应函数
    $("#updateRoleBtn").click(function (){
        // 从文本框中获取新的角色名称
        var roleName = $("#editModal [name=roleName]").val();
        // 发送ajax请求执行更新
        $.ajax({
            url: "http://localhost:8888/addAndUpdateRole",
            type: "get",
            data: {
                id: window.roleId,
                name: roleName
            },
            dataType: "json",
            success: function (resp){

                let result = resp.message;
                if (result === "SUCCESS") {
                    layer.msg("更新成功！");

                    // 重新加载分页
                    generatePage();
                }
                if (result === "FAILED") {
                    layer.msg("操作失败！"+resp.message);
                }
            },
            error: function (resp) {
                layer.msg(resp.status+""+resp.statusText);
            }
        });
        // 关闭模态框
        $("#editModal").modal("hide");
    });
```

#### 3、修改按钮My-Role.js

```javascript
var pencilBtn = "<button id='" + roleId + "' type='button' class='btn btn-primary btn-xs pencilBtn'><i class='glyphicon glyphicon-pencil'></i></button>";
```

#### 4、Controller

```java
@ResponseBody
@GetMapping("/addAndInsertRole")
public ResultJson<String> addRole(Role role) {

    boolean b = roleService.saveOrUpdate(role);
    if (b) {
        return new ResultJson<>(200L, "SUCCESS");

    } else {
        return new ResultJson<>(500L, "FAILED");
    }
}
```

# 更新至140

