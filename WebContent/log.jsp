<%@page import="db.LogDto"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>접속 기록</title>
</head>
<%
ArrayList<LogDto> list = (ArrayList<LogDto>)request.getAttribute("list");
%>
<body>
	<div style="display: flex; gap: 20px; flex-direction: column;">
		<%for(int i = 0; i < list.size(); i++){ %>
		<%if(list.get(i).getIsNew()){%><div style="color: #BBBBBB;"><%=list.get(i)%></div>
		<%}else{ %>
		<div style="font-weight: 900; color: red; background-color: black;"><%=list.get(i)%></div>
		<%} %>
		<%} %>
	</div>
</body>
</html>