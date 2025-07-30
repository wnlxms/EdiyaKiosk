<%@page import="java.text.NumberFormat"%>
<%@page import="db.DtoReceipt1"%>
<%@page import="db.DtoReceipt2"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<%
DtoReceipt1 dto = (DtoReceipt1)request.getAttribute("dto");
ArrayList<DtoReceipt2> list = (ArrayList<DtoReceipt2>)request.getAttribute("list");
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt</title>
    <style>
        html {
            font-size: 62.5%;
        }
        body {
            margin: 0;
        }
        .wrapper {
            color: #666666;
            box-sizing: border-box;
            user-select: none;
            letter-spacing: -0.025em;
            font-weight: 400;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px;
            height: 100vh;
            background-color: #AAAAAA;
            font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        }
        table {
            border-collapse: collapse;
        }
        td, th {
            padding: 5px;
            text-align: left;
            font-size: 1.4em;
        }
        .brand {
            font-weight: 900;
            font-size: 2.4em;
            text-align: center;
            margin-bottom: 20px;
            color: black;
        }
        .info {
            font-size: 1.4em;
            font-weight: 500;
            display: flex;
        }
        .bold {
            font-weight: 600;
        }
        .option {
            font-size: 1.2em;
            color: #555555;
        }
        .line{
            border-bottom: 1px solid black;
        }
        .linetop{
        	border-top: 1px solid black;
        }
        .right{
            text-align: right;
        }
        .center{
            text-align: center;
        }
        p{
            margin: 0;
            font-weight: 600;
        }
        .ordernum{
            font-size: 3.2em;
            text-align: center;
            font-weight: 600;
            color: #444444;
            margin: 5px;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="brand">EDIYA COFFEE</div>
        <div class="info">사업자번호 : 123-45-67890 성명 이지수</div>
        <div class="info">주소 : 서울특별시 강남구 봉은사로 302 ○○프라임타워 1층 </div>
        <div class="info">일자 : <%=dto.getPayTime()%></div>
        <table>
            <thead>
                <tr>
                    <th class="line">품명</th>
                    <th class="line">단가</th>
                    <th class="line">수량</th>
                    <th class="right line">금액</th>
                </tr>
            </thead>
            <tbody>
<%
for(int i = 0; i < list.size(); i++){
%>
                <tr>
                    <td class="bold"><%=list.get(i).getName()%></td>
                    <td class="bold"><%=NumberFormat.getInstance().format(list.get(i).getPrice())%>원</td>
                    <td class="bold"><%=list.get(i).getCount()%>개</td>
                    <td class="bold right"><%=NumberFormat.getInstance().format(("Large".equals(list.get(i).getSize()) ? list.get(i).getPrice()+1200 : list.get(i).getPrice()) * list.get(i).getCount())%>원</td>
                </tr>
	<%
	if(list.get(i).getOption() != ""){
	%>
                <tr>
                    <td colspan="3" class="option"><%=list.get(i).getOption()%></td>
                    <td colspan="1" class="right bold"><%="Extra".equals(list.get(i).getSize()) ? "+" + NumberFormat.getInstance().format(1200 * list.get(i).getCount()) + "원" : ""%></td>
                </tr>
	<%
	}
	%>
<%
}
%>
                <tr>
                    <td colspan="3" class="bold linetop">청구금액</td>
                    <td colspan="1" class="right linetop bold"><%=NumberFormat.getInstance().format(dto.getTotalPrice())%>원</td>
                </tr>
                <tr>
                    <td colspan="3" class="bold">받은금액</td>
                    <td colspan="1" class="right bold"><%=NumberFormat.getInstance().format(dto.getTotalPrice())%>원</td>
                </tr>
                <tr>
                    <td colspan="3" class="bold line">거스름돈</td>
                    <td colspan="1" class="right line bold">0원</td>
                </tr>
            </tbody>
        </table>
<%if(dto.getPhoneNumber() == null){%>
        <div class="info"><p>비회원</p>으로 주문하셨습니다.</div>
<%} else {%>
        <div class="info"><p><%=dto.getPhoneNumber()%></p>으로 포인트 <p><%=dto.getPointearn()%></p>점이 적립되었습니다.</div>
<%}%>
        <div class="info"><p><%=dto.getTakeout()%></p>으로 요청하셨습니다.</div>
        <div class="ordernum">주문번호 : <%=dto.getPayId()%></div>
    </div>
</body>
</html>
    