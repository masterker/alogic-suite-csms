<%@ page language="java" import="com.anysoft.util.*" pageEncoding="UTF-8"%>
<% 
	Settings settings = Settings.get();
	String jscrossJs = 	settings.GetValue("settings.jscross",
			"${itportal.cdn}/jscross/jscross.js");
	String itportalJs = settings.GetValue("settings.itportal",
			"${itportal.cdn}/itportal/itportal.js");
	String mainJs = settings.GetValue("settings.main",
			"${itportal.cdn}/apps/alogic-settings-web/1.0.0/main.js");
%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<title>配置中心</title>
        
		<script type='text/javascript' src='<%=jscrossJs%>'></script>
		<script type='text/javascript' src='<%=itportalJs%>'></script>
		<script type='text/javascript' src='<%=mainJs%>'></script>

		<style>
			.clear-fix {
				zoom: 1;
			}
			
			.clear-fix:after {
				content: "";
				display: block;
				height: 0;
				line-height: 0;
				clear: both;
				visibility: hidden;
			}
			
			body #main {
				width: 80%;
				padding: 0;
				margin: 100px auto 0 auto;
				margin-bottom: 60px;
			}
		</style>
	</head>

	<body ng-app="app" ng-controller="myCtrl">
		<p-header io-current='current' do-refresh='doRefresh' do-resize="doResize" on-home='onHome'>
			<li ng-class="{'active':currentPath=='home'}" ng-click="currentPath='home'">
				<a href="#/">首页</a>
			</li>
			<li>
				<div class="input-group margin-top-10 margin-left-10">
					<input type="text" ng-model="keyword" class="form-control" ng-keypress="onKeyPress(keyword)" placeholder="请输入任意内容进行检索..">
					<span class="input-group-btn">
					<button type="submit" class="btn btn-default" ng-click="onQuery(keyword)"><i class="fa fa-search"></i></button>	
		        </span>
				</div>
			</li>
		</p-header>
		<div id="main" ui-view>
		</div>
		<p-footer></p-footer>
	</body>

</html>