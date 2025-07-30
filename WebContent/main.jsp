<%@page import="db.DtoCategory"%>
<%@page import="db.DtoP1Products"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<%
ArrayList<DtoP1Products> productsList = (ArrayList<DtoP1Products>)request.getAttribute("productsList");
ArrayList<DtoCategory> categoryList = (ArrayList<DtoCategory>)request.getAttribute("categoryList");
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="index.css">
	<script src="https://cdn.iamport.kr/v1/iamport.js"></script>
    <title>키오스크</title>
</head>
<body>
    <div class="pc-wrapper" style="display: none;">
        <header>
            <div class="go-back blue">
            	<img src="icon/home.svg" width="20">
            	<div>처음으로</div>
            </div>
            <h2 class="blue">EDIYA COFFEE</h2>
            <div></div>
        </header>
        <!-- 모달 -->
		<div class="modal">
        	<div class="modal-content"></div>
        </div>
		<div class="point-modal">
            <div class="point-modal-content">

            </div>
        </div>
        <!-- 모달 -->
		<div class="alert-modal">
			<div class=alert-content>
			</div>
		</div>
        <div class="confirm-modal">
	       	<div class="confirm-content">
	       		<div class="confirm-title"></div>
	       		<div class="confirm-btn-area">
	       			<div class="confirm-ybtn f-hover">네</div>
	       			<div class="confirm-xbtn f-hover">아니요</div>
	       		</div>
			</div>
		</div>
		<div class="loading-modal">
			<div class="loading-modal-ui"></div>
		</div>
		<div id="page0" class="page active">
			<div class="p0-banner">
				<div class="p0-banner-container">
					<img alt="" src="img/bg1.jpg" class="p0-bgimg">
					<img alt="" src="img/bg2.jpg" class="p0-bgimg">
					<img alt="" src="img/bg3.png" class="p0-bgimg">
				</div>
			</div>
			<div class="p0-btnarea">
				<div class="p0-eatin skyhover"><img alt="" src="icon/eatin.svg" width="60"><div>매장에서 먹어요</div></div>
				<div class="p0-takeout skyhover"><img alt="" src="icon/takeout.svg" width="60">포장해서 갈래요</div>
			</div>
		</div>
        <div id="page1" class="page">
            <!-- 카테고리 -->
            <nav>
                <div id="p1-category-leftbtn" class="p1-category-btn">◀</div>
                <div class="p1-categorylist-container">
                    <div class="p1-category">
                        <div class="p1-category-items selected" data-id="0"><a>추천상품</a></div>
<%
for(int i = 0; i < categoryList.size(); i++){
%>
						<div class="p1-category-items f-hover" data-id="<%=categoryList.get(i).getId()%>"><a><%=categoryList.get(i).getName()%></a></div>
<%
}
%>
                    </div>
                </div>
                <div id="p1-category-rightbtn" class="p1-category-btn">▶</div>
            </nav>
            <!-- 카테고리 -->
            <!-- 상품리스트 -->
            <section class="p1-products-section">
                <div class="p1-products-btn" id="p1-products-leftbtn">◀</div>
                <div class="p1-products-area">
                    <div class="p1-products-row">
                        <div class="p1-products-container">
<%for(int i = 0; i < productsList.size(); i++) {
	if(i % 10 > 4) continue;
%>
                            <div class="p1-products-child">
                                <div class="p1-products-items f-hover" data-id="<%=productsList.get(i).getId()%>">
                                    <div class="p1-products-img">
<%if(productsList.get(i).getSpecial() == 1){%>
                                    	<img src="icon/new.png" class="p1-products-special">
<%}%>
<%if(productsList.get(i).getSpecial() == 2){%>
                                    	<img src="icon/best.png" class="p1-products-special">
<%}%>
                                        <img src="products/<%=productsList.get(i).getFilename()%>" alt="" width="175">
                                    </div>
                                    <div class="p1-products-title black"><%=productsList.get(i).getName()%></div>
                                    <div class="p1-products-price sky">₩<%=productsList.get(i).getPrice()%></div>
                                </div>
                            </div>
<%
}
%>
                        </div>
                    </div>
                    <div class="p1-products-row">
                        <div class="p1-products-container">
<%for(int i = 0; i < productsList.size(); i++) {
	if(i % 10 < 5) continue;
%>
                            <div class="p1-products-child">
                                <div class="p1-products-items f-hover" data-id="<%=productsList.get(i).getId()%>">
                                    <div class="p1-products-img">
<%if(productsList.get(i).getSpecial() == 1){%>
                                    	<img src="icon/new.png" class="p1-products-special">
<%}%>
<%if(productsList.get(i).getSpecial() == 2){%>
                                    	<img src="icon/best.png" class="p1-products-special">
<%}%>
                                        <img src="products/<%=productsList.get(i).getFilename()%>" alt="" width="175">
                                    </div>
                                    <div class="p1-products-title"><%=productsList.get(i).getName()%></div>
                                    <div class="p1-products-price">₩<%=productsList.get(i).getPrice()%></div>
                                </div>
                            </div>
<%
}
%>
                        </div>
                    </div>
                </div>
                <div class="p1-products-btn" id="p1-products-rightbtn">▶</div>
            </section>
            <!-- 상품리스트 -->
            <!-- 하단 -->
             <section class="p1-bottom">
                <div class="p1-cart-area">
                    <div class="p1-cart-btn" id="p1-cart-leftbtn">◀</div>
                    <div class="p1-cart-div">
                        <div class="p1-cart-container">
                            <div class="p1-cart-row">
<%
for(int i = 0; i < 11; i++){
%>
                                <div class="p1-cart-child">
                                    <img src="products/blankimg.png" alt="">
                                    <div class="p1-cart-cancelbtn" style="display: none;" data-id="<%=i%>">
                                        <img src="icon/cancel.svg" alt="" width="25">
                                    </div>
                                    <div class="p1-cart-itemsname"></div>
                                </div>
<%
}
%>
                            </div>
                        </div>
                    </div>
                    <div class="p1-cart-btn" id="p1-cart-rightbtn">▶</div>
                </div>
                <div class="p1-bill-area">
                    <p class="p1-cart-pricetitle">총 결제 금액</p>
                    <p class="p1-cart-totalprice">₩ 0원</p>
                    <div class="p1-cart-reset">전체취소</div>
                </div>
                <div class="p1-payment-area skyhover">
                    <img src="icon/wallet.svg" alt="" width="80">
                    <p class="p1-payment-text">결제하기</p>
                </div>
             </section>
            <!-- 하단 -->
        </div>
        <div id="page2" class="page">
            <section class="p2-area">
                <div class="p2-cart-parent">
                    <div class="p2-cart"><!-- js에서 추가되는 영역--></div>
                </div>

                <div class="p2-step-area" id="step1">
                    <div>
                        <div class="p2-step">STEP 1.</div>
                        <div class="p2-step-title">포인트 적립/사용 여부를 선택해주세요!</div>
                    </div>
                    <div class="p2-choice-container">
                        <div class="p2-choice-box" id="pointcheck">
                            <div class="keypad-thumb">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div style="display: none;"></div>
                                <div></div>
                                <div style="display: none;"></div>
                            </div>
                            <div class="p2-choice-content">포인트 조회</div>
                        </div>
                        <div class="p2-choice-box" id="pointno">
                            <div class="x-thumb">
                            </div>
                            <div class="p2-choice-content">적립 안함</div>
                        </div>
                    </div>
                </div>
                <div class="p2-step-area" id="step2">
                    <div>
                        <div class="p2-step">STEP 2.</div>
                        <div class="p2-step-title">결제 방법을 선택해주세요.</div>
                    </div>
                    <div class="p2-choice-container">
                        <div class="p2-choice-box" id="danal">
                            <div class="p2-payment-thumb"><img alt="" src="icon/danal.png" width="100"></div>
                            <div class="p2-choice-content">카드 결제</div>
                        </div>
                        <div class="p2-choice-box" id="kakaopay">
                            <div class="p2-payment-thumb"><img alt="" src="icon/kakaopay.png" width="100"></div>
                            <div class="p2-choice-content">카카오 페이</div>
                        </div>
                        <div class="p2-choice-box" id="tosspay">
                            <div class="p2-payment-thumb"><img alt="" src="icon/tosspay.png" width="100"></div>
                            <div class="p2-choice-content">토스 페이</div>
                        </div>
                    </div>
                </div>
                <div class="p2-total-area">
                    <div class="p2-total">
                        <div class="p2-total-title">주문금액</div>
                        <div class="p2-total-content red" id="p2-totalprice"></div>
                    </div>
                    <div class="p2-total">
                        <div class="p2-total-title">포인트 보유량</div>
                        <div class="p2-total-content" id="p2-point"></div>
                    </div>
                    <div class="p2-total">
                        <div class="p2-total-title">포인트 사용</div>
                        <div class="p2-total-content" id="p2-pointused"></div>
                    </div>
                    <div class="p2-total">
                        <div class="p2-total-title">잔여금액</div>
                        <div class="p2-total-content red" id="p2-remainingamount"></div>
                    </div>
                </div>
                <div class="p2-btnarea">
                    <div class="p2-reset e-hover">전체취소</div>
                    <div class="p2-prebtn e-hover">이전</div>
                    <div class="p2-nextbtn skyhover">다음</div>
                </div>
            </section>
        </div>
        <div id="page3" class="page">
            <section class="p3-area">
                <div class="p3-title">결제가 성공적으로 완료되었습니다.</div>
                <div class="p3-content">영수증 출력이 완료될 때까지 잡아당기지마세요.</div>
                <div class="p3-ordernum">주문번호</div>
                <div class="p3-num"></div>
                <div class="p3-content grey">잠시후 홈으로 이동합니다.</div>
            </section>
        </div>
    </div>

    <!-- 모바일 버전 화면 -->
    <div class="mobile-wrapper" style="display: block">
    <div class="mobile-toast" id="mobileToast"></div>
    <div class="mobile-modal">
    	<div class="mobile-modal-content">
	    	<div class="mobile-modal-area1">
				<label for="phonenum">휴대폰 번호를 입력해주세요!</label>
				<input type="text" id="phonenum" class="mobile-phonenum" autocomplete="off" inputmode="numeric"  pattern="[0-9]*" placeholder="휴대폰 번호를 입력해주세요!">
				<div class="mobile-modal-btnarea">
					<div class="mobile-modal-pointcheck">조회하기</div>
					<div class="mobile-modal-pre">취소</div>
				</div>
    		</div>
    		<div class="mobile-modal-area2"><!-- js에서 추가되는 영역 --></div>
    	</div>
    </div>
    	<div class="mobile-header">
    		<div class="mobile-resetbtn">
    			<img alt="" src="icon/home.svg" width="20">
    		</div>
    		<h3 class="blue">EDIYA COFFEE</h3>
    		<div></div>
    	</div>
    	<div class="mobilepage active" id="mobile0">
    		<div class="mobile-p0-question">주문 방식을 선택해 주세요</div>
    		<div class="mobile-p0-btnarea">
    			<div class="mobile-p0-btn" id="mobile-eatin"><img alt="" src="icon/eatin.svg">매장 식사</div>
    			<div class="mobile-p0-btn" id="mobile-takeout"><img alt="" src="icon/takeout.svg">포장 하기</div>
    		</div>
    		<div class="mobile-p0-slogan">언제나 맛있는 커피, 이디야와 함께 ☕</div>
    	</div>
        <div class="mobilepage" id="mobile1">
	        <div class="mobile-nav">
	            <div id="mobile-nav-leftbtn" class="mobile-nav-btn">◀</div>
	            <div class="mobile-nav-container">
	                <div class="mobile-nav-category">
	                    <div class="mobile-nav-items selected" data-id="0"><a>추천상품</a></div>
<%
for(int i = 0; i < categoryList.size(); i++){
%>
						<div class="mobile-nav-items" data-id="<%=categoryList.get(i).getId()%>"><a><%=categoryList.get(i).getName()%></a></div>
<%
}
%>
	                </div>
    	        </div>
	            <div id="mobile-nav-rightbtn" class="mobile-nav-btn">▶</div>
	        </div>
	        <section class="mobile-p1-products-area">
<%for(int i = 0; i < productsList.size(); i++) {%>
				<div class="mobile-p1-products-items" data-id="<%=productsList.get(i).getId()%>">
					<div class="mobile-p1-items-img">
						<img alt="" src="products/<%=productsList.get(i).getFilename()%>" class="mobile-p1-items-thumb">
<%if(productsList.get(i).getSpecial() == 1){%>
						<img src="icon/new.png" class="mobile-p1-products-special">
<%}if(productsList.get(i).getSpecial() == 2){%>
						<img src="icon/best.png" class="mobile-p1-products-special">
<%}%>
					</div>
					<div class="mobile-p1-products-nameprice">

						<div class="mobile-p1-products-name"><%=productsList.get(i).getName()%></div>
						<div class="mobile-p1-products-price">₩<%=productsList.get(i).getPrice()%></div>
					</div>
				</div>
<%}%>
	        </section>
			<section class="mobile-p1-bottom">
				<div class="mobile-p1-cartarea">
					<div class="mobile-p1-cart-btn" id="mobile-cart-leftbtn">◀</div>
					<div class="mobile-p1-cart-container">
						<div class="mobile-p1-cart-child">
<%
for(int i = 0; i < 11; i++){
%>
							<div class="mobile-p1-cart-items">
							    <img src="products/blankimg.png" alt="" class="mobile-p1-cartimg">
							    <div class="mobile-p1-cart-cancelbtn" style="display: none;" data-id="<%=i%>">
							        <img src="icon/cancel.svg" alt="" width="15">
							    </div>
							</div>
<%}%>
						</div>
					</div>
					<div class="mobile-p1-cart-btn" id="mobile-cart-rightbtn">▶</div>
				</div>
				<div class="mobile-p1-paybtnarea">
					<img alt="" src="icon/wallet.svg" width="30">
					<span id="mobile-price-text">₩ 0원</span> 결제하기
				</div>
			</section>
		</div>
		<div class="mobilepage" id="mobile-modal"><!-- js에서 추가되는 영역 --></div>
		<div class="mobilepage" id="mobile2">
			<div class="mobile-p2-area">
				<div class="mobile-p2-cartarea"><!-- js에서 추가되는 영역--></div>
				<div class="mobile-p2-steparea" id="mobile-step1">
					<div class="mobile-p2-steptitle">
						<div class="mobile-p2-step">STEP 1.</div>
						<div class="mobile-p2-step-title">포인트 적립/사용 여부를 선택해주세요!</div>
					</div>
                    <div class="mobile-p2-choice-container">
                        <div class="mobile-p2-choice-box" id="mobile-pointcheck">
                            <div class="mobile-keypad-thumb">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div style="display: none;"></div>
                                <div></div>
                                <div style="display: none;"></div>
                            </div>
                            <div class="mobile-p2-choice-content">포인트 조회</div>
                        </div>
						<div class="mobile-p2-choice-box" id="mobile-pointno">
                            <div class="mobile-x-thumb">
                            </div>
                            <div class="mobile-p2-choice-content">적립 안함</div>
                        </div>
                    </div>
				</div>
				<div class="mobile-p2-steparea" id="mobile-step2">
					<div class="mobile-p2-steptitle">
						<div class="mobile-p2-step">STEP 2.</div>
						<div class="mobile-p2-step-title">결제 방법을 선택해주세요.</div>
					</div>
					<div class="mobile-p2-choice-container">
						<div class="mobile-p2-choice-box" id="mobile-danal">
                            <div class="mobile-p2-payment-thumb"><img alt="" src="icon/danal.png" width="80"></div>
                            <div class="mobile-p2-choice-content">카드 결제</div>
                        </div>
						<div class="mobile-p2-choice-box" id="mobile-tosspay">
                            <div class="mobile-p2-payment-thumb"><img alt="" src="icon/tosspay.png" width="80"></div>
                            <div class="mobile-p2-choice-content">토스 페이</div>
                        </div>
					</div>
				</div>
				
			</div>
			<div class="mobile-p2-footer">
				<div class="mobile-p2-footer-totalarea">
					<div class="mobile-p2-footer-total">
						<div class="mobile-p2-footer-title">주문금액</div>
						<div class="mobile-p2-footer-content red" id="mobile-p2-totalprice">0</div>
					</div>
					<div class="mobile-p2-footer-total">
						<div class="mobile-p2-footer-title">포인트 사용</div>
						<div class="mobile-p2-footer-content" id="mobile-p2-pointused">0</div>
					</div>
					<div class="mobile-p2-footer-total">
						<div class="mobile-p2-footer-title">잔여 금액</div>
						<div class="mobile-p2-footer-content red" id="mobile-p2-remainingamount">0</div>
					</div>
				</div>
				<div class="mobile-p2-footer-btnarea">
					<div class="mobile-p2-footer-prebtn">이전</div>
					<div class="mobile-p2-footer-nextbtn">다음</div>
				</div>
			</div>
		</div>
        <div class="mobilepage" id="mobile3">
            <section class="p3-area">
                <div class="p3-title">결제가 성공적으로 완료되었습니다.</div>
                <div class="p3-content">영수증 출력이 완료될 때까지 잡아당기지마세요.</div>
                <div class="p3-ordernum">주문번호</div>
                <div class="p3-num"></div>
                <div class="p3-content grey">잠시후 홈으로 이동합니다.</div>
            </section>
        </div>
    </div>
    <script src="index.js">
    </script>
</body>
</html>