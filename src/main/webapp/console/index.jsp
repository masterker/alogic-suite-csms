<%@ page language="java" import="com.anysoft.util.*" pageEncoding="UTF-8"%>
<% 
	Settings settings = Settings.get();
	String jscrossJs = 	settings.GetValue("console.jscross",
			"${itportal.cdn}/jscross/jscross.js");
	String itportalJs = settings.GetValue("console.itportal",
			"${itportal.cdn}/itportal/itportal.js");
	String consoleJs = settings.GetValue("console.main",
			"${itportal.cdn}/apps/alogic-console-web/1.0.0/main.js");
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>中国电信IT研发中心运维门户</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script type='text/javascript' src='<%=jscrossJs%>'></script>
		<script type='text/javascript' src='<%=itportalJs%>'></script>
		<script type='text/javascript' src='<%=consoleJs%>'></script>
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
			
			body #main{
				width: 90%;
				padding: 0;
				margin: 60px auto 0 auto;				
			}		
		</style>
	</head>

	<body ng-app="app" ng-controller="myCtrl">
		<p-console-header io-current='current' do-refresh='doRefresh' do-resize="doResize">
			<li ng-class="{'active':currentPath=='home'}" ng-click="currentPath='home'">
				<a href="#/" >首页</a>
			</li>			
			<li 
				do-refresh="doRefresh"
				do-resize="doResize"
				menu = "menus"
			>	
				<li ng-repeat="menu in menus.item | filter:enable=true" 
					ng-class="{'active':currentPath==menu.id}" ng-click="currentPath=menu.id">
					<a href="{{menu.href}}" >{{menu.name}}</a>
				</li>				
			</li>			
		</p-console-header>
		<div id="main" ui-view>
		</div>
		<p-console-footer></p-console-footer>
	</body>

</html>
