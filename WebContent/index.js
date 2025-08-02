class ProductInfo{
	constructor(id, count, price, hotIce, sizeChange, cream, iceAmount){
		this.id = id;
		this.count = count;
		this.price = price;
		this.hotIce = hotIce;
		this.sizeChange = sizeChange;
		this.cream = cream;
		this.iceAmount = iceAmount;
	}
}
class OptionStatus{
	constructor(id, name, filename){
		this.id = id;
		this.count = 1;
		this.price = null;
		this.hotice = null;
		this.size = null;
		this.cream = null;
		this.iceamount = null;
		this.name = name;
		this.filename = filename;
	}	
	toString() { return `OptionStatus:\n- id: ${this.id}\n- count: ${this.count}\n- price: ${this.price}\n- hotice: ${this.hotice}\n- size: ${this.size}\n- cream: ${this.cream}\n- iceamount: ${this.iceamount}\n- name: ${this.name}\n- filename: ${this.filename}`; }	
}
let resizeTimer = null; //화면 가로 사이즈 바뀔때 0.3초내 실행안되게 하는 타이머 변수
let boxcount;
let takeout; //포장 || 매장
let bannerTranslateValue = 0; // p0배너 스크롤값
let category = 1; // p1 카테고리 버튼onoff 변수
let productTranslateValue = 0;// p1 상품영역 스크롤값
let cartTranslateValue = 0;// p1 카트영역 스크롤값
let productListSize = 10; // p1 카테고리 상품개수 초기값은 처음화면값
let productInfo; //m1 상품상세 옵션 ui표시관련
let optionStatus; // 유저 input 옵션 값
let cart = []; //장바구니 담은 상품 리스트  옵션 포함
//p2변수
let totalPrice = 0; 
let point = 0;
let pointUsed = 0;
let remainingAmount = 0;
let confirmStatus;
let deleteIdx;//p2물품삭제시 idx저장변수
let step = 0;
let phoneNumber = '';
let buyerId = '';
let test; //개발자도구로 중요정보 수정 검사
let merchant_uid;
let pay_method;


window.addEventListener('resize', function(){
	if(resizeTimer !== null) clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function(){
		updateItemboxUi();
	}, 100);
});
function updateItemboxUi(){
	let windowWidth = window.innerWidth;
	if(windowWidth > 1550) boxcount = 5;
	else if(windowWidth > 1250) boxcount = 4;
	else if(windowWidth > 950) boxcount = 3;
	if(windowWidth < 950){
		closeModal(document.querySelector('.confirm-modal'));// 모바일 UI는 confirm없으므로 닫기
		document.querySelector('.pc-wrapper').style.display = 'none';
		document.querySelector('.mobile-wrapper').style.display = 'block';
	}else{
		document.querySelector('.pc-wrapper').style.display = 'block';
		document.querySelector('.mobile-wrapper').style.display = 'none';
	}
	document.querySelectorAll('.p1-products-child').forEach(function(e){
		e.style.width = `${(95 / boxcount).toFixed(2)}vw`;
	});
	productTranslateValue = 0;
	const containers = document.querySelectorAll('.p1-products-container').forEach(function(e){
		e.style.transform = 'translate(0vw)';
	});
	productBtnDisplay();
}
//	--------------------데스크 탑 버전 클릭이벤트 영역--------------------
document.querySelector('.pc-wrapper').addEventListener('click', function(event){
//	--------------------p0--------------------
	if(event.target.closest('.p0-takeout')) return goToPage1('포장');
	if(event.target.closest('.p0-eatin')) return goToPage1('매장');
	if(event.target.closest('.go-back')) return location.reload(true);
//	--------------------p1--------------------
	if(event.target.closest('#p1-category-leftbtn')) return scrollCategory('left');
	if(event.target.closest('#p1-category-rightbtn')) return scrollCategory('right');
	if(event.target.closest('.p1-category-items')) return loadCategory(event.target.closest('.p1-category-items').dataset.id);
	if(event.target.closest('#p1-products-leftbtn')) return scrollProductArea('left');
	if(event.target.closest('#p1-products-rightbtn')) return scrollProductArea('right');
	if(event.target.closest('.p1-products-items')) return loadProductModal(event.target.closest('.p1-products-items').dataset.id);
	if(event.target.closest('#p1-cart-leftbtn')) return moveCartSlide('left');
	if(event.target.closest('#p1-cart-rightbtn')) return moveCartSlide('right');
	if(event.target.closest('.p1-cart-cancelbtn')) return removeCartItem(event.target.closest('.p1-cart-cancelbtn').dataset.id);
	if(event.target.closest('.p1-cart-reset')) return resetCart();
	if(event.target.closest('.p1-payment-area')) return handlePaymentClick();
//	--------------------상품모달영역--------------------
	if(event.target.closest('#m1-minusbtn')) return updateOptionCount('minus');
	if(event.target.closest('#m1-plusbtn')) return updateOptionCount('plus');
	if(event.target.closest('.m1-option-title')) return toggleOptionBox(event.target.closest('.m1-option-title'));
	if(event.target.closest('.m1-option-hot')) return selectHotice('HOT');
	if(event.target.closest('.m1-option-iced')) return selectHotice('ICED');
	if(event.target.closest('#option-regular')) return selectSize('Regular');
	if(event.target.closest('#option-large')) return selectSize('Large');
	if(event.target.closest('#option-cream1')) return updateCream('휘핑있음');
	if(event.target.closest('#option-cream2')) return updateCream('휘핑없음');
	if(event.target.closest('#option-cream3')) return updateCream('휘핑조금');
	if(event.target.closest('#option-iceamount1')) return updateiceAmount('기본');
	if(event.target.closest('#option-iceamount2')) return updateiceAmount('많이');
	if(event.target.closest('#option-iceamount3')) return updateiceAmount('조금');
	if(event.target.closest('.m1-product-done')) return completeOptionSelect();
	if(event.target.closest('.m1-product-cancel')) return cancelModal();
//	--------------------p2--------------------
	if(event.target.closest('.p2-product-cancel')) return removeCartItem2(event.target.closest('.p2-product-cancel').closest('.p2-cart-item').dataset.id);
	if(event.target.closest('.p2-product-minusbtn')) return updateProductCount('minus', event.target.closest('.p2-cart-item').dataset.id);
	if(event.target.closest('.p2-product-plusbtn')) return updateProductCount('plus', event.target.closest('.p2-cart-item').dataset.id);
	if(event.target.closest('.p2-reset')) return resetProducts();
	if(event.target.closest('.p2-prebtn')) return stepBack();
	if(event.target.closest('.p2-nextbtn')) return stepNext();
	if(event.target.closest('#pointcheck')) return pointModalOpen();
	if(event.target.closest('#pointno')) return skipPoint();
	if(event.target.closest('#danal')) return auditCartIntegrity('danal');
	if(event.target.closest('#kakaopay')) return auditCartIntegrity('kakaopay');
	if(event.target.closest('#tosspay')) return auditCartIntegrity('tosspay');
//	--------------------포인트 적립 모달 영역--------------------
	if(event.target.closest('.point-keypad div')) return inputKeypad(event.target.closest('.point-keypad div').dataset.id);
	if(event.target.closest('.point-check')) return checkPoint();
	if(event.target.closest('.point-pre')) return pointPre();
	if(event.target.closest('.point-earn')) return pointEarn();
	if(event.target.closest('.point-used')) return pointUse();
	//	--------------------Confirm 모달 영역--------------------
	if(event.target.closest('.confirm-ybtn')) return confirmYes();
	if(event.target.closest('.confirm-xbtn')) return closeModal(document.querySelector('.confirm-modal'));
});

//	--------------------MOBILE 버전 클릭이벤트 영역--------------------
document.querySelector('.mobile-wrapper').addEventListener('click', function(event){
//	--------------------p0--------------------
	if(event.target.closest('#mobile-takeout')) return goToPage1('포장');
	if(event.target.closest('#mobile-eatin')) return goToPage1('매장');
	if(event.target.closest('.mobile-resetbtn')) return location.reload(true);
//	--------------------p1--------------------
	if(event.target.closest('#mobile-nav-leftbtn')) return scrollCategory('left');
	if(event.target.closest('#mobile-nav-rightbtn')) return scrollCategory('right');
	if(event.target.closest('.mobile-nav-items')) return loadCategory(event.target.closest('.mobile-nav-items').dataset.id);
	if(event.target.closest('.mobile-p1-products-items')) return loadProductModal(event.target.closest('.mobile-p1-products-items').dataset.id);
	if(event.target.closest('#mobile-cart-leftbtn')) return moveCartSlide('left');
	if(event.target.closest('#mobile-cart-rightbtn')) return moveCartSlide('right');
	if(event.target.closest('.mobile-p1-cart-cancelbtn')) return removeCartItem(event.target.closest('.mobile-p1-cart-cancelbtn').dataset.id);
	if(event.target.closest('.mobile-p1-paybtnarea')) return handlePaymentClick();
//	--------------------상품모달영역--------------------
	if(event.target.closest('#mobile-m1-minusbtn')) return updateOptionCount('minus');
	if(event.target.closest('#mobile-m1-plusbtn')) return updateOptionCount('plus');
	if(event.target.closest('.mobile-m1-option-title')) return toggleOptionBox(event.target.closest('.mobile-m1-option-title'));
	if(event.target.closest('.mobile-m1-hot')) return selectHotice('HOT');
	if(event.target.closest('.mobile-m1-iced')) return selectHotice('ICED');
	if(event.target.closest('#mobile-regular')) return selectSize('Regular');
	if(event.target.closest('#mobile-large')) return selectSize('Large');
	if(event.target.closest('#mobile-cream1')) return updateCream('휘핑있음');
	if(event.target.closest('#mobile-cream2')) return updateCream('휘핑없음');
	if(event.target.closest('#mobile-cream3')) return updateCream('휘핑조금');
	if(event.target.closest('#mobile-iceamount1')) return updateiceAmount('기본');
	if(event.target.closest('#mobile-iceamount2')) return updateiceAmount('많이');
	if(event.target.closest('#mobile-iceamount3')) return updateiceAmount('조금');
	if(event.target.closest('.mobile-m1-done')) return completeOptionSelect();
	if(event.target.closest('.mobile-m1-cancel')) return cancelModal();
//	--------------------p2--------------------
	if(event.target.closest('.mobile-p2-product-cancel')) return removeCartItem2(event.target.closest('.mobile-p2-product-cancel').closest('.mobile-p2-cart-item').dataset.id);
	if(event.target.closest('.mobile-p2-product-minusbtn')) return updateProductCount('minus', event.target.closest('.mobile-p2-cart-item').dataset.id);
	if(event.target.closest('.mobile-p2-product-plusbtn')) return updateProductCount('plus', event.target.closest('.mobile-p2-cart-item').dataset.id);
	if(event.target.closest('.mobile-p2-footer-prebtn')) return stepBack();
	if(event.target.closest('.mobile-p2-footer-nextbtn')) return stepNext();
	if(event.target.closest('#mobile-pointcheck')) return pointModalOpen();
	if(event.target.closest('#mobile-pointno')) return skipPoint();
	if(event.target.closest('#mobile-danal')) return auditCartIntegrity('danal');
	if(event.target.closest('#mobile-tosspay')) return auditCartIntegrity('tosspay');
//	--------------------포인트 적립 모달 영역--------------------
	if(event.target.closest('.mobile-modal-pointcheck')) return checkPoint();
	if(event.target.closest('.mobile-modal-pre')) return pointPre();
	if(event.target.closest('.mobile-point-earn')) return pointEarn();
	if(event.target.closest('.mobile-point-used')) return pointUse();
});


//	--------------------p0--------------------
function bannerSwipe(){ //p0 배너 슬라이드
	bannerTranslateValue -= 100;
	if(bannerTranslateValue === -300) bannerTranslateValue = 0;
	document.querySelector('.p0-banner-container').style.transform = `translate(${bannerTranslateValue}vw)`;
}
function goToPage1(str){// 포장 선택 누를시
	takeout = str;
	document.getElementById('page0').classList.remove('active');
	document.getElementById('page1').classList.add('active');
	document.getElementById('mobile0').classList.remove('active');
	document.getElementById('mobile1').classList.add('active');
}
//	--------------------p1 카테고리 영역 --------------------
function scrollCategory(str){//카테고리 스크롤
	category = str === 'right' ? 2 : 1;
	document.querySelector('.p1-category').style.transform = `translate(${category === 2 ? '-90vw' : '0'})`;;
	document.querySelector('.mobile-nav-category').style.transform = `translate(${category === 2 ? '-90vw' : '0'})`;;
	categoryBtnDisplay();
}
function categoryBtnDisplay(){//스크롤 버튼 활성화 비활성화
    setCategoryBtnState(document.getElementById('p1-category-leftbtn'), category !== 1);
    setCategoryBtnState(document.getElementById('p1-category-rightbtn'), category === 1);
    setCategoryBtnState(document.getElementById('mobile-nav-leftbtn'), category !== 1);
    setCategoryBtnState(document.getElementById('mobile-nav-rightbtn'), category === 1);
}
function setCategoryBtnState(btn, active) {//스크롤 버튼 처리 로직
    btn.style.color = active ? '#014B98' : '#BBBBBB';
    btn.style.cursor = active ? 'pointer' : 'default';
    btn.classList.toggle('f-hover', active);
}
function loadCategory(id){//AJAX 카테고리 변경시 상품영역 업데이트
	document.querySelectorAll('.p1-category-items').forEach(function(item){
		item.classList.remove('selected');
		item.classList.add('f-hover');
	});
	document.querySelectorAll('.mobile-nav-items').forEach(function(item){
		item.classList.remove('selected');
	});
	document.querySelector(`.p1-category-items[data-id="${id}"]`).classList.add('selected');
	document.querySelector(`.p1-category-items[data-id="${id}"]`).classList.remove('f-hover');
	document.querySelector(`.mobile-nav-items[data-id="${id}"]`).classList.add('selected');
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'AjaxCategoryChange', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	let data = 'categoryid=' + encodeURIComponent(id);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			const jsonData = JSON.parse(xhr.responseText);
			let str = `
				<div class="p1-products-row">
					<div class="p1-products-container">`;
			for(let i = 0; i < jsonData.length; i++){
				if(i % 10 > 4) continue;
				let img = jsonData[i].special === 1 ? '<img src="icon/new.png" class="p1-products-special">' :
						  jsonData[i].special === 2 ? '<img src="icon/best.png" class="p1-products-special">' : '';
				str += `
					<div class="p1-products-child">
						<div class="p1-products-items f-hover" data-id="${jsonData[i].id}">
							<div class="p1-products-img">
								${img}
								<img src="products/${jsonData[i].filename}" alt="" width="175">
							</div>
							<div class="p1-products-title">${jsonData[i].name}</div>
							<div class="p1-products-price">₩${jsonData[i].price}</div>
						</div>
					</div>`;
			}
			str += `
					</div>
				</div>
				<div class="p1-products-row">
					<div class="p1-products-container">`;
			for(let i = 0; i < jsonData.length; i++){
				if(i % 10 < 5) continue;
				let img = jsonData[i].special === 1 ? '<img src="icon/new.png" class="p1-products-special">' :
						  jsonData[i].special === 2 ? '<img src="icon/best.png" class="p1-products-special">' : '';
				str += `
					<div class="p1-products-child">
						<div class="p1-products-items f-hover" data-id="${jsonData[i].id}">
							<div class="p1-products-img">
								${img}
								<img src="products/${jsonData[i].filename}" alt="" width="175">
							</div>
							<div class="p1-products-title">${jsonData[i].name}</div>
							<div class="p1-products-price">₩${jsonData[i].price}</div>
						</div>
					</div>`;
			}
			str += `
					</div>
				</div>`;
			let strM = '';
			for(let i = 0; i < jsonData.length; i++){
				let img = jsonData[i].special === 1 ? '<img src="icon/new.png" class="mobile-p1-products-special">' :
						  jsonData[i].special === 2 ? '<img src="icon/best.png" class="mobile-p1-products-special">' : '';
				strM += 
					`
						<div class="mobile-p1-products-items" data-id="${jsonData[i].id}">
							<div class="mobile-p1-items-img">
								${img}
								<img alt="" src="products/${jsonData[i].filename}" class="mobile-p1-items-thumb">
							</div>
							<div class="mobile-p1-products-nameprice">
		
								<div class="mobile-p1-products-name">${jsonData[i].name}</div>
								<div class="mobile-p1-products-price">₩${jsonData[i].price}</div>
							</div>
						</div>
					`
			}
			productListSize = jsonData.length;
			document.querySelector('.p1-products-area').innerHTML = str;
			document.querySelector('.mobile-p1-products-area').innerHTML = strM;
			updateItemboxUi();
		}
	};
	xhr.send(data);
}
//	--------------------p1 상품영역 --------------------
function scrollProductArea(str){//상품영역 스크롤버튼
	const containers = document.querySelectorAll('.p1-products-container');
	const pageCount = Math.ceil((Math.floor(productListSize / 2)) / boxcount);

	if(str === 'left' && productTranslateValue !== 0){
		productTranslateValue += 95;
	}
	if(str === 'right' && (productTranslateValue * -1) / 95 < pageCount - 1){
		productTranslateValue -= 95;
	}

	containers.forEach(container => {
		container.style.transform = `translate(${productTranslateValue}vw)`;
	});
	productBtnDisplay();
}
function productBtnDisplay(){//버튼 활성화 비활성화UI
    const leftBtn = document.getElementById('p1-products-leftbtn');
    const rightBtn = document.getElementById('p1-products-rightbtn');
	let pageCount = Math.ceil((Math.floor(productListSize / 2)) / boxcount);

    if(productTranslateValue != 0){
        leftBtn.style.color = '#014B98';
        leftBtn.style.cursor = 'pointer';
		leftBtn.classList.add('e-hover');
    }
    if(productTranslateValue === 0){
        leftBtn.style.color = '#BBBBBB';
        leftBtn.style.cursor = 'default';
		leftBtn.classList.remove('e-hover');
        rightBtn.style.color = '#014B98';
        rightBtn.style.cursor = 'pointer';
		rightBtn.classList.add('e-hover');
    }
    if((productTranslateValue * -1) / 95 === pageCount - 1){
        rightBtn.style.color = '#BBBBBB';
        rightBtn.style.cursor = 'default';
		rightBtn.classList.remove('e-hover');
    }
}
function loadProductModal(id){
	if(cart.length === 11){
		showAlert('더이상 담을 수 없습니다!');
		showToast('더이상 담을 수 없습니다!');
		return;
	}
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'AjaxShowModal', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	let data = 'productid=' + encodeURIComponent(id);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			const jsonData = JSON.parse(xhr.responseText);
			const formattedPrice = new Intl.NumberFormat().format(jsonData.price);
			productInfo = new ProductInfo(id, 1, jsonData.price, jsonData.hotIce, jsonData.sizeChange, jsonData.cream, jsonData.iceAmount);
			optionStatus = new OptionStatus(id, jsonData.name, jsonData.filename);
			let str = `
				<div class="m1-product">
					<div class="m1-img">
						<img src="products/${jsonData.filename}" id="m1-img" alt="" width="150">
					</div>
					<div class="m1-product-area">
						<div class="m1-product-title">${jsonData.name}</div>
						<div class="m1-product-countprice">
							<div class="m1-product-countarea">
								<div class="m1-product-countbtn e-hover" id="m1-minusbtn"><img src="icon/minus.svg" alt=""></div>
								<div class="m1-product-count">1</div>
								<div class="m1-product-countbtn e-hover" id="m1-plusbtn"><img src="icon/plus.svg" alt=""></div>
							</div>
							<div class="m1-product-pricearea">₩${formattedPrice}</div>
						</div>
						<div></div>
					</div>
				</div>
				<div class="m1-content">
					<div class="m1-option open" id="option-hotice">
						<div class="m1-option-title" data-id="1">
							<div class="m1-option-name">핫/아이스</div>
							<div class="m1-option-togglearea">
								<div id="selected-hotice"></div>
								<div class="m1-dropbox active"></div>
							</div>
						</div>
						<div class="m1-option-content">
							<div class="m1-option-hot f-hover">HOT</div>
							<div class="m1-option-iced f-hover">ICED</div>
							<div class="m1-option-blank"></div>
						</div>
					</div>
					<div class="m1-option" id="option-size">
						<div class="m1-option-title" data-id="2">
							<div class="m1-option-name">사이즈</div>
							<div class="m1-option-togglearea">
								<div id="selected-size"></div>
								<div class="m1-dropbox"></div>
							</div>
						</div>
						<div class="m1-option-content">
							<div class="m1-option-size f-hover" id="option-regular"><img src="icon/drink.svg" width="60" alt="">Regular</div>
							<div class="m1-option-size f-hover" id="option-large"><img src="icon/drink.svg" width="70" alt="">Large</div>
							<div class="m1-option-sizeblank"></div>
						</div>
					</div>
					<div class="m1-option" id="option-cream">
						<div class="m1-option-title" data-id="3">
							<div class="m1-option-name">휘핑크림</div>
							<div class="m1-option-togglearea">
								<div id="selected-cream"></div>
								<div class="m1-dropbox"></div>
							</div>
						</div>
						<div class="m1-option-content">
							<div class="m1-option-box f-hover" id="option-cream1">휘핑있음</div>
							<div class="m1-option-box f-hover" id="option-cream2">휘핑없음</div>
							<div class="m1-option-box f-hover" id="option-cream3">휘핑조금</div>
						</div>
					</div>
					<div class="m1-option" id="option-iceamount">
						<div class="m1-option-title" data-id="4">
							<div class="m1-option-name">얼음</div>
							<div class="m1-option-togglearea">
								<div id="selected-iceamount"></div>
								<div class="m1-dropbox"></div>
							</div>
						</div>
						<div class="m1-option-content">
							<div class="m1-option-box f-hover" id="option-iceamount1">기본</div>
							<div class="m1-option-box f-hover" id="option-iceamount2">많이</div>
							<div class="m1-option-box f-hover" id="option-iceamount3">조금</div>
						</div>
					</div>
				</div>
				<div class="m1-product-btnarea">
					<div class="m1-product-cancel e-hover">취소</div>
					<div class="m1-product-done">선택완료</div>
				</div>
			`;
			
			let strM = 
				`
					<div class="mobile-m1-product">
						<div>
							<img src="products/${jsonData.filename}" id="mobile-m1-img" alt="" width="65">
						</div>
						<div class="mobile-m1-name">${jsonData.name}</div>
					</div>
					<div class="mobile-m1-option">
					<!-- 핫아이스 -->
						<div class="mobile-m1-optionbox open" id="mobile-hotice">
							<div class="mobile-m1-option-title" data-id="1">
								<div class="mobile-m1-option-name">핫/아이스</div>
								<div class="mobile-m1-togglearea">
									<div id="mobile-selected-hotice"></div>
									<div class="mobile-m1-dropbox active"></div>
								</div>
							</div>
							<div class="mobile-m1-option-content">
								<div class="mobile-m1-hot">HOT</div>
								<div class="mobile-m1-iced">ICED</div>
								<div class="mobile-m1-option-blank"></div>
							</div>
						</div>
						<!-- 사이즈-->
						<div class="mobile-m1-optionbox" id="mobile-size">
							<div class="mobile-m1-option-title" data-id="2">
								<div class="mobile-m1-option-name">사이즈</div>
								<div class="mobile-m1-togglearea">
									<div id="mobile-selected-size"></div>
									<div class="mobile-m1-dropbox"></div>
								</div>
							</div>
							<div class="mobile-m1-option-content">
								<div class="mobile-m1-option-size" id="mobile-regular"><img src="icon/drink.svg" width="40" alt="">Regular</div>
								<div class="mobile-m1-option-size" id="mobile-large"><img src="icon/drink.svg" width="45" alt="">Large</div>
								<div class="mobile-m1-option-sizeblank"></div>
							</div>
						</div>
						<!-- 크림 -->
						<div class="mobile-m1-optionbox" id="mobile-cream">
							<div class="mobile-m1-option-title" data-id="3">
								<div class="mobile-m1-option-name">휘핑크림</div>
								<div class="mobile-m1-togglearea">
									<div id="mobile-selected-cream"></div>
									<div class="mobile-m1-dropbox"></div>
								</div>
							</div>
							<div class="mobile-m1-option-content">
								<div class="mobile-m1-option-box" id="mobile-cream1">휘핑있음</div>
								<div class="mobile-m1-option-box" id="mobile-cream2">휘핑없음</div>
								<div class="mobile-m1-option-box" id="mobile-cream3">휘핑조금</div>
							</div>
						</div>
						<!-- 얼음양조절 -->
						<div class="mobile-m1-optionbox" id="mobile-iceamount">
							<div class="mobile-m1-option-title"  data-id="4">
								<div class="mobile-m1-option-name">얼음</div>
								<div class="mobile-m1-togglearea">
									<div id="mobile-selected-iceamount"></div>
									<div class="mobile-m1-dropbox"></div>
								</div>
							</div>
							<div class="mobile-m1-option-content">
								<div class="mobile-m1-option-box" id="mobile-iceamount1">기본</div>
								<div class="mobile-m1-option-box" id="mobile-iceamount2">많이</div>
								<div class="mobile-m1-option-box" id="mobile-iceamount3">조금</div>
							</div>
						</div>
					</div>
					<div class="mobile-m1-countprice">
						<div class="mobile-m1-countarea">
							<div class="mobile-m1-countbtn" id="mobile-m1-minusbtn"><img src="icon/minus.svg" alt=""></div>
							<div class="mobile-m1-count">1</div>
							<div class="mobile-m1-countbtn" id="mobile-m1-plusbtn"><img src="icon/plus.svg" alt=""></div>
						</div>
						<div class="mobile-m1-price">₩${formattedPrice}원</div>
					</div>
					<div class="mobile-m1-btnarea">
						<div class="mobile-m1-cancel">취소</div>
						<div class="mobile-m1-done">선택완료</div>
					</div>				
				`;
			document.querySelector('.modal-content').innerHTML = str;
			document.querySelector('.modal').style.display = 'block';
			document.getElementById('option-hotice').style.display = 'block';
			document.getElementById('mobile-modal').innerHTML = strM;
			document.getElementById('mobile1').classList.remove('active');
			document.getElementById('mobile-modal').classList.add('active');
			if(jsonData.hotIce !== 1){
				document.querySelector('.m1-option-blank').style.display = 'block';
				document.querySelector('.mobile-m1-option-blank').style.display = 'block';
			}
			if(jsonData.hotIce === 2){
				document.querySelector('.m1-option-hot').style.display = 'none';
				document.querySelector('.mobile-m1-hot').style.display = 'none';
			}
			if(jsonData.hotIce === 3){
				document.querySelector('.m1-option-iced').style.display = 'none';
				document.querySelector('.mobile-m1-iced').style.display = 'none';
			}
			if(productInfo.sizeChange === 0){
				document.querySelector('.m1-option-sizeblank').style.display = 'block';
				document.getElementById('option-large').style.display = 'none';
				document.querySelector('.mobile-m1-option-sizeblank').style.display = 'block';
				document.getElementById('mobile-large').style.display = 'none';
			}
			document.getElementById('option-size').style.display = 'none';
			document.getElementById('option-cream').style.display = 'none';
			document.getElementById('option-iceamount').style.display = 'none';
			document.getElementById('mobile-size').style.display = 'none';
			document.getElementById('mobile-cream').style.display = 'none';
			document.getElementById('mobile-iceamount').style.display = 'none';
			if(id > 90){
				document.querySelector('.m1-product-done').classList.add('active');
				document.querySelector('.m1-product-done').classList.add('skyhover');
				document.querySelector('.m1-content').innerHTML = '';
				document.querySelector('.mobile-m1-option').innerHTML = '';
				document.querySelector('.m1-product-done').classList.add('active');
				document.querySelector('.mobile-m1-done').classList.add('active');
				document.querySelector('.m1-content').style.backgroundColor = '#EEEEEE';
				document.querySelector('.mobile-m1-option').style.backgroundColor = '#EEEEEE';
				optionStatus.price = jsonData.price;
			}

		}
	};
	xhr.send(data);
}
//	--------------------p1 카트영역 --------------------
function moveCartSlide(str){//카트영역 슬라이드
	const pc = document.querySelector('.p1-cart-container');
	const m = document.querySelector('.mobile-p1-cart-child');
	if(str === 'left' && cartTranslateValue != 0) cartTranslateValue += 16;
	else if(str === 'right' && cartTranslateValue != -32) cartTranslateValue -= 16;
	pc.style.transform = `translate(${cartTranslateValue}vw)`;
	let mobilevalue = cartTranslateValue === 0 ? 0 : (cartTranslateValue === -16 ? -26.66 : -53.32);
	m.style.transform = `translate(${mobilevalue}vw)`;
	cartBtnDisplay();
}
function cartBtnDisplay(){
	setCartBtnState(document.getElementById('p1-cart-leftbtn'), cartTranslateValue === 0);
	setCartBtnState(document.getElementById('mobile-cart-leftbtn'), cartTranslateValue === 0);
	setCartBtnState(document.getElementById('p1-cart-rightbtn'), cartTranslateValue === -32);
	setCartBtnState(document.getElementById('mobile-cart-rightbtn'), cartTranslateValue === -32);
}
function setCartBtnState(btn, active) {//스크롤 버튼 처리 로직
    btn.style.color = active ? '#BBBBBB' : '#014B98';
    btn.style.cursor = active ? 'default' : 'pointer';
    btn.classList.toggle('e-hover', !active);
}
function removeCartItem(id){//상품제거
	cart.splice(id, 1);
	updateCartDisplay();
}
function resetCart(){//카트리셋
	cart.length = 0;
	cartTranslateValue = 0;
	document.querySelector('.p1-cart-container').style.transform = 'translate(0vw)';
	document.querySelector('.mobile-p1-cart-child').style.transform = 'translate(0vw)';
	cartBtnDisplay();
	updateCartDisplay();
}
function handlePaymentClick(){//결제버튼 누를시
	if(cart.length === 0){
		showAlert('선택된 상품이 없습니다.');
		showToast('선택된 상품이 없습니다.');
		return;
	}
	document.getElementById('page1').classList.remove('active');
	document.getElementById('mobile1').classList.remove('active');
	document.getElementById('page2').classList.add('active');
	document.getElementById('mobile2').classList.add('active');
	openPage2();
}
function openPage2(){//2페이지 오픈
	let str = '';
	let strM = '';
	for(let i = 0; i < cart.length; i++){
		let formattedSize = cart[i].size === 'Regular' ? 'Regular' : 'Large +1,200';
		let creamDisplay = cart[i].cream === null ? 'style="display: none;"' : '';
		let iceamountDisplay = cart[i].iceamount === null ? 'style="display: none;"' : '';
		let productName = (cart[i].size === 'Regular' ? '(R)' : '(L)') + cart[i].hotice + cart[i].name;
		productName = cart[i].id > 88 ? cart[i].name : productName;
		let noOptionProduct = cart[i].id > 88 ? 'style="display: none"' : '';
		str += `
			<div class="p2-cart-item" data-id="${i}">
		        <div class="p2-cart-container">
		            <div class="p2-product-img">
		                <img src="products/${cart[i].filename}" alt="" width="80">
		                <div class="p2-product-cancel">
		                    <img src="icon/cancel.svg" alt="" width="30">
		                </div>
		            </div>
		            <div class="p2-product-title">
		                <div class="p2-product-namearea">
		                    <div class="p2-product-name">${productName}</div>
		                    <div class="p2-product-countarea">
		                        <div class="p2-product-minusbtn e-hover">
		                            <img src="icon/minus.svg" alt="" width="20">
		                        </div>
		                        <div class="p2-product-count">${cart[i].count}</div>
		                        <div class="p2-product-plusbtn e-hover">
		                            <img src="icon/plus.svg" alt="" width="20">
		                        </div>
		                    </div>
		                </div>
		                <div class="p2-option-container" ${noOptionProduct}>
		                    <div class="p2-option">
		                        <div class="p2-option-titlearea">
		                            <div>온도</div>
		                            <div>사이즈</div>
		                        </div>
		                        <div>
		                            <div>----------</div>
		                            <div>----------</div>
		                        </div>
		                        <div class="p2-option-content">
		                            <div>${cart[i].hotice}</div>
		                            <div>${formattedSize}</div>
		                        </div> 
		                    </div>
		                    <div class="p2-option">
		                        <div class="p2-option-titlearea">
		                            <div ${creamDisplay}>휘핑크림</div>
		                            <div ${iceamountDisplay}>얼음</div>
		                        </div>
		                        <div>
		                            <div ${creamDisplay}>----------</div>
		                            <div ${iceamountDisplay}>----------</div>
		                        </div>
		                        <div class="p2-option-content">
		                            <div ${creamDisplay}>${cart[i].cream}</div>
		                            <div ${iceamountDisplay}>${cart[i].iceamount}</div>
		                        </div> 
		                    </div>
		                </div>
		            </div>
		        </div>
		        <div class="p2-price-area">
		            <div class="p2-price">
		                ₩ ${new Intl.NumberFormat().format(cart[i].price)}
		            </div>
		            <div class="p2-price-detail">
		                + ${new Intl.NumberFormat().format(cart[i].price/cart[i].count)}x${cart[i].count}
		            </div>
		        </div>
		    </div>
		`;
		strM += `
			<div class="mobile-p2-cart-item" data-id="${i}">
				<div class="mobile-p2-product-img">
					<img src="products/${cart[i].filename}">
					<div class="mobile-p2-product-cancel">
						<img alt="" src="icon/cancel.svg">
					</div>
				</div>
				<div class="mobile-p2-product-info">
					<div class="mobile-p2-product-name">${productName}</div>
					<div class="mobile-p2-product-countprice">
						<div class="mobile-p2-product-amount">${cart[i].count}개 |</div>
						<div class="mobile-p2-product-price"><strong>${new Intl.NumberFormat().format(cart[i].price)}</strong>원</div>
					</div>
				</div>
	            <div class="mobile-p2-product-countarea">
	                <div class="mobile-p2-product-minusbtn">
	                    <img src="icon/minus.svg" alt="" width="20">
	                </div>
	                <div class="mobile-p2-product-count">${cart[i].count}</div>
	                <div class="mobile-p2-product-plusbtn">
	                    <img src="icon/plus.svg" alt="" width="20">
	                </div>
	            </div>
			</div>
		`;
	};
	document.querySelector('.p2-cart').innerHTML = str;
	document.querySelector('.mobile-p2-cartarea').innerHTML = strM;
	updatePriceStatus();
}
function updatePriceStatus(){
	totalPrice = 0;
	for(let i = 0; i < cart.length; i++) totalPrice += cart[i].price;
	remainingAmount = totalPrice - pointUsed;
	if(remainingAmount < 0){
		pointUsed = 0;
		remainingAmount = totalPrice - pointUsed;
		showAlert('포인트 사용 금액이 결제 금액을 초과하여 취소되었습니다.');
		showToast('포인트 사용 금액이 결제 금액을 초과하여 취소되었습니다.');
	}
	document.getElementById('p2-totalprice').innerHTML = `₩ ${new Intl.NumberFormat().format(totalPrice)}`;
	document.getElementById('mobile-p2-totalprice').innerHTML = `₩ ${new Intl.NumberFormat().format(totalPrice)}`;
	document.getElementById('p2-point').innerHTML = `₩ ${new Intl.NumberFormat().format(point)}`;
	document.getElementById('p2-pointused').innerHTML = `₩ ${new Intl.NumberFormat().format(pointUsed)}`;
	document.getElementById('mobile-p2-pointused').innerHTML = `₩ ${new Intl.NumberFormat().format(pointUsed)}`;
	document.getElementById('p2-remainingamount').innerHTML = `₩ ${new Intl.NumberFormat().format(remainingAmount)}`;
	document.getElementById('mobile-p2-remainingamount').innerHTML = `₩ ${new Intl.NumberFormat().format(remainingAmount)}`;
}
//	--------------------상품모달영역--------------------
function updateOptionCount(str){
	if(str === 'minus'){
		if(optionStatus.count === 1){
			showAlert('최소 1개 이상 선택해야 합니다.');
			showToast('최소 1개이상 선택해야 합니다.');
			return;
		}
		optionStatus.count--;
	}
	if(str === 'plus'){
		if(optionStatus.count === 9){
			showAlert('최대 9개까지만 선택할 수 있습니다.');
			showToast('최대 9개까지만 선택할 수 있습니다.');
			return;
		}
		optionStatus.count++;
	}
	updateCount();
}
function updateCount(){//개수 업데이트
	optionStatus.price = productInfo.price * optionStatus.count;
	document.querySelector('.m1-product-pricearea').innerHTML = `₩${new Intl.NumberFormat().format(optionStatus.price)}`;
	document.querySelector('.m1-product-count').innerHTML = `${optionStatus.count}`;
	document.querySelector('.mobile-m1-price').innerHTML = `₩${new Intl.NumberFormat().format(optionStatus.price)}원`;
	document.querySelector('.mobile-m1-count').innerHTML = `${optionStatus.count}`;
	if(optionStatus.size === 'Large'){
		document.getElementById('selected-size').innerHTML = `Large(+1,200)${optionStatus.count === 1 ? '' : ` x ${optionStatus.count}`}`;
		document.getElementById('mobile-selected-size').innerHTML = `Large(+1,200)${optionStatus.count === 1 ? '' : ` x ${optionStatus.count}`}`;
	}
}
function optionOpen(pc, m){//오픈
	pc.style.display = 'block';
	m.style.display = 'block';
	pc.classList.toggle('open');
	m.classList.toggle('open');
	pc.querySelector('.m1-dropbox').classList.toggle('active');
	m.querySelector('.mobile-m1-dropbox').classList.toggle('active');
}
function optionClose(pc, m){//닫기
	pc.classList.toggle('open');
	m.classList.toggle('open');
	pc.querySelector('.m1-dropbox').classList.toggle('active');
	m.querySelector('.mobile-m1-dropbox').classList.toggle('active');
}
function toggleOptionBox(e){//옵션영역 누를시 UI
	let num = Number(e.dataset.id);
	let arr = ['hotice', 'size', 'cream', 'iceamount'];
	let pc = document.getElementById(`option-${arr[num-1]}`);
	let m = document.getElementById(`mobile-${arr[num-1]}`);
	optionClose(pc, m);//toggle이라 여는기능으로 이용함
	document.querySelectorAll('.m1-option').forEach(el => {
		if(el !== pc){
			el.classList.remove('open');
			el.querySelector('.m1-dropbox').classList.remove('active');
		}
	});
	document.querySelectorAll('.mobile-m1-optionbox').forEach(el => {
		if(el !== m){
			el.classList.remove('open');
			el.querySelector('.mobile-m1-dropbox').classList.remove('active');
		}
	});
}
function activeBtn(str){//선택완료버튼 ui활설화 or 제거
	if(str === 'active'){
		document.querySelector('.m1-product-done').classList.add('active');
		document.querySelector('.m1-product-done').classList.add('skyhover');
		document.querySelector('.mobile-m1-done').classList.add('active');
	}else{
		document.querySelector('.m1-product-done').classList.remove('active');
		document.querySelector('.m1-product-done').classList.remove('skyhover');
		document.querySelector('.mobile-m1-done').classList.remove('active');
	}
}
function selectHotice(str){//HOTICED 옵션 처리
	document.getElementById('selected-hotice').innerHTML = str;
	document.getElementById('mobile-selected-hotice').innerHTML = str;
	optionClose(document.getElementById('option-hotice'), document.getElementById('mobile-hotice'));
	optionStatus.hotice = str;
	if(str === 'HOT'){
		document.getElementById('option-iceamount').style.display = 'none';
		document.getElementById('mobile-iceamount').style.display = 'none';
		optionStatus.iceamount = null;
		document.getElementById('selected-iceamount').innerHTML = '';
		document.getElementById('mobile-selected-iceamount').innerHTML = '';
		if(productInfo.cream === 1 && optionStatus.cream !== null) activeBtn('active');
		else optionOpen(document.getElementById('option-size'), document.getElementById('mobile-size'));
	}else{
		if(document.querySelector('.m1-product-done').classList.contains('active')){
			optionOpen(document.getElementById('option-iceamount'), document.getElementById('mobile-iceamount'));
			activeBtn('remove');
		}else optionOpen(document.getElementById('option-size'), document.getElementById('mobile-size'));
	}
	updateImg();
}
function selectSize(str){//SIZE 옵션 선택시
	if(str === 'Regular'){
		if(optionStatus.size === 'Large') updatePrice(-1200);
		optionStatus.size = 'Regular';
		updateSize('Regular(+0)');
	}else{
		if(optionStatus.size !== 'Large') updatePrice(1200);
		optionStatus.size = 'Large';
		updateSize('Large(+1,200)');
	}
	updateImg();
}
function updateImg(){
	optionStatus.filename = `${optionStatus.size === 'Large' ? 'EX_' : 'R_'}${optionStatus.hotice}${optionStatus.name}.png`;
	document.getElementById('m1-img').src = `products/${optionStatus.filename}`;
	document.getElementById('mobile-m1-img').src = `products/${optionStatus.filename}`;
}
function updateSize(str){//사이즈 옵션 처리
	optionClose(document.getElementById('option-size'), document.getElementById('mobile-size'));
	if(productInfo.cream === 1) optionOpen(document.getElementById('option-cream'), document.getElementById('mobile-cream'));
	else if(productInfo.iceAmount === 1 && optionStatus.hotice === 'ICED')optionOpen(document.getElementById('option-iceamount'), document.getElementById('mobile-iceamount'));
	else activeBtn('active');
	if(str === 'Large(+1,200)' && optionStatus.count !== 1) str += ' x ' + optionStatus.count;
	document.getElementById('selected-size').innerHTML = str;
	document.getElementById('mobile-selected-size').innerHTML = str;
	updateCount();
}
function updatePrice(num){//사이즈 가격변동
	productInfo.price += num;
	optionStatus.price = productInfo.price;
	document.querySelector('.m1-product-pricearea').innerHTML = '₩' + new Intl.NumberFormat().format(productInfo.price);
}
function updateCream(str){//크림 옵션 선택시
	document.getElementById('selected-cream').innerHTML = str;
	document.getElementById('mobile-selected-cream').innerHTML = str;
	optionClose(document.getElementById('option-cream'), document.getElementById('mobile-cream'));
	if(productInfo.iceAmount === 1 && optionStatus.hotice === 'ICED') optionOpen(document.getElementById('option-iceamount'), document.getElementById('mobile-iceamount'));
	else activeBtn('active');
	optionStatus.cream = str;
}
function updateiceAmount(str){//얼음 옵션 선택시
	document.getElementById('selected-iceamount').innerHTML = str;
	document.getElementById('mobile-selected-iceamount').innerHTML = str;
	optionClose(document.getElementById('option-iceamount'), document.getElementById('mobile-iceamount'));
	optionStatus.iceamount = str;
	activeBtn('active');
}
function cancelModal(){
    document.querySelector('.modal').style.display = 'none';
	document.getElementById('mobile-modal').classList.remove('active');
	document.getElementById('mobile1').classList.add('active');
}
function completeOptionSelect(){
	if(!document.querySelector('.m1-product-done').classList.contains('active')){	
		showAlert('옵션을 먼저 선택해 주세요.');
		showToast('옵션을 먼저 선택해 주세요.');
		return;
	}
	cart.push(optionStatus);
	document.querySelector('.m1-content').style.backgroundColor = 'none';
	document.querySelector('.mobile-m1-option').style.backgroundColor = 'none';
	updateCartDisplay();
}
function updateCartDisplay(){
	let str = '';
	let strM = '';
	let total = 0;
	for(let i = 0; i < 11; i++){
		if(cart.length - 1 < i){
			str += `
				<div class="p1-cart-child">
				    <img src="products/blankimg.png" alt="">
				    <div class="p1-cart-cancelbtn" style="display: none; data-id="${i}">
				        <img src="icon/cancel.svg" alt="" width="25">
				    </div>
				    <div class="p1-cart-itemsname"></div>
				</div>
			`;
			strM += `
				<div class="mobile-p1-cart-items">
				    <img src="products/blankimg.png" alt="" class="mobile-p1-cartimg">
				    <div class="mobile-p1-cart-cancelbtn" style="display: none;" data-id="${i}">
				        <img src="icon/cancel.svg" alt="" width="15">
				    </div>
				</div>
			`;
		} else {
			total += cart[i].price;
			let filename = cart[i].filename;
			let name = cart[i].name;
			str += `
				<div class="p1-cart-child">
				    <img src="products/${filename}" alt="">
				    <div class="p1-cart-cancelbtn" data-id="${i}">
				        <img src="icon/cancel.svg" alt="" width="25">
				    </div>
				    <div class="p1-cart-itemsname">${name}</div>
				</div>
			`;
			strM += `
				<div class="mobile-p1-cart-items">
				    <img src="products/${filename}" alt="" class="mobile-p1-cartimg">
				    <div class="mobile-p1-cart-cancelbtn" data-id="${i}">
				        <img src="icon/cancel.svg" alt="" width="15">
				    </div>
				</div>
			`;
		}
	}
	document.querySelector('.p1-cart-row').innerHTML = str;
	document.querySelector('.mobile-p1-cart-child').innerHTML = strM;
	document.querySelector('.modal').style.display = 'none';
	if(document.getElementById('mobile-modal').classList.contains('active')){
		document.getElementById('mobile1').classList.add('active');
		document.getElementById('mobile-modal').classList.remove('active');
	}
	document.querySelector('.p1-cart-totalprice').innerHTML = `₩ ${new Intl.NumberFormat().format(total)}원`;
	document.getElementById('mobile-price-text').innerHTML = `₩ ${new Intl.NumberFormat().format(total)}원`;
	
}
//	--------------------p2장바구니 영억--------------------
function removeCartItem2(str){//상품제거 누를시
    confirmStatus = 'p2-cancel';
    deleteIdx = str;
    showConfirm('선택한 상품을 제거 하시겠습니까?');
	if(window.innerWidth < 950) confirmYes();
}
function updateProductCount(str, idx){// 상품 개수 조정
    if(str === 'minus'){
        if(cart[idx].count === 1){
			showAlert('물품 개수는 1개 이상이어야 합니다.');
			showToast('물품 개수는 1개 이상이어야 합니다.');
			return;
		}
        let price = cart[idx].price / cart[idx].count;
        cart[idx].count--;
        cart[idx].price = price * cart[idx].count;
    } else if(str === 'plus'){
        if(cart[idx].count === 9){
			showAlert('물품 개수는 9개 이하로 설정해 주세요.');
			showToast('물품 개수는 9개 이하로 설정해 주세요.');
			return;
		}
        let price = cart[idx].price / cart[idx].count;
        cart[idx].count++;
        cart[idx].price = price * cart[idx].count;
    }
    openPage2();
}
function resetProducts(){//p2 상품리셋후 p1이동
    confirmStatus = 'p2-reset';
    showConfirm('상품을 전체 취소하고 메인 화면으로 이동하시겠습니까?');
}
function stepBack(){//p2 이전누를시
    if(step === 0){
        confirmStatus = 'p2-pre';
        showConfirm('상품 선택 화면으로 돌아가시겠습니까?');
		if(window.innerWidth < 950) confirmYes();
        return;
    }
    if(step === 1){
        document.querySelector('.p2-cart-parent').style.display = 'block';
        document.querySelector('.mobile-p2-cartarea').style.display = 'flex';
        document.getElementById('step1').style.display = 'none';
        document.getElementById('mobile-step1').style.display = 'none';
        step = 0;
        return;
    }
    if(step === 2){
        document.getElementById('step1').style.display = 'flex';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('mobile-step1').style.display = 'block';
        document.getElementById('mobile-step2').style.display = 'none';
        step = 1;
        return;
    }
}
function stepNext(){//p2 다음누를시
    if(step === 0){
        document.querySelector('.p2-cart-parent').style.display = 'none';
		document.querySelector('.mobile-p2-cartarea').style.display = 'none';
        document.getElementById('step1').style.display = 'flex';
        document.getElementById('mobile-step1').style.display = 'block';
        step = 1;
        return;
    }
    if(step === 1){
        if(buyerId === ''){
            confirmStatus = 'nopoint';
            showConfirm('포인트 적립 없이 진행하시겠습니까?');
			showToast('포인트 적립 없이 진행됩니다.')
			if(window.innerWidth < 950) confirmYes();
        } else {
            showAlert(`ID (${phoneNumber.slice(9)})으로 결제금액의 5%가 적립됩니다!`);
			showToast(`ID (${phoneNumber.slice(9)})으로 결제금액의 5%가 적립됩니다!`);
            document.getElementById('step1').style.display = 'none';
            document.getElementById('step2').style.display = 'flex';
			document.getElementById('mobile-step1').style.display = 'none';
			document.getElementById('mobile-step2').style.display = 'block';
            step = 2;
        }
        return;
    }
    if(step === 2){
		showAlert('결제 수단을 선택하여 주십시오.');
		showToast('결제 수단을 선택하여 주십시오.');
		return;
	}
}
function pointModalOpen(){//포인트 모달 오픈
	const pc = document.querySelector('.point-modal');
	const mobile = document.querySelector('.mobile-modal');
	pc.style.visibility = 'visible';
	pc.classList.add('show');
	mobile.classList.add('show');
	document.querySelector('.mobile-modal-area1').style.display = 'flex';
	document.querySelector('.mobile-modal-area2').style.display = 'none';
	let str = 
				`
		            <div class="point-title">휴대폰 번호를 입력해주세요!</div>
		            <div class="point-num">휴대폰 번호를 입력해주세요!</div>
		            <div class="point-inputarea">
		                <div class="point-keypad">
		                    <div data-id="1">1</div>
		                    <div data-id="2">2</div>
		                    <div data-id="3">3</div>
		                    <div data-id="4">4</div>
		                    <div data-id="5">5</div>
		                    <div data-id="6">6</div>
		                    <div data-id="7">7</div>
		                    <div data-id="8">8</div>
		                    <div data-id="9">9</div>
		                    <div data-id="reset">C</div>
		                    <div data-id="0">0</div>
		                    <div data-id="delete">←</div>
		                </div>
		                <div class="point-btnarea">
		                    <div class="point-check f-hover">조회</div>
		                </div>
		                <div class="point-btnarea">
		                    <div class="point-pre f-hover">취소</div>
		                </div>
		            </div>
				`;
	document.querySelector('.point-modal-content').innerHTML = str;
	if(buyerId !== ''){
		document.querySelector('.point-num').innerHTML = buyerId;
		document.querySelector('.point-num').style.color = '#36454F';
		document.getElementById('phonenum').value = buyerId;
	}else{
		document.getElementById('phonenum').value = '';
	}
}
function skipPoint(){//포인트 적립 안함
    confirmStatus = 'nopoint';
    showConfirm('포인트 적립 없이 진행하시겠습니까?');
	showToast('포인트 적립 없이 진행됩니다.');
	if(window.innerWidth < 950) confirmYes();
}
function auditCartIntegrity(paytype){//유효성체크
	document.querySelector('.loading-modal').style.display = 'flex';
	test = true;
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'AjaxAudit', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	const params = new URLSearchParams({
		cart: JSON.stringify(cart),
		phoneNumber: phoneNumber
	});
	let data = params.toString();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			document.querySelector('.loading-modal').style.display = 'none';
			if(xhr.status===200){
	        	const jsonData = JSON.parse(xhr.responseText);
				if(jsonData.dbTotalPrice !== totalPrice || jsonData.dbPoint !== point || point < pointUsed) test = false;
				merchant_uid = jsonData.merchant_uid;
				if(test){
					if(paytype === 'danal'){
						pay_method = 'card';
						danal();
					}
					if(paytype === 'kakaopay'){
						pay_method = 'kakaopay';
						kakaopay();
					}
					if(paytype === 'tosspay'){
						pay_method = 'tosspay';
						tosspay();
					}
				}else{
					showAlert('부정행위가 탐지되었습니다. 처음부터 다시 시도해 주세요.');
					showToast('부정행위가 탐지되었습니다. 처음부터 다시 시도해 주세요.');
					setTimeout(() => location.reload(true), 1700);
				}
			}else{
	        	console.error('AJAX 요청 실패:', xhr.status, xhr.statusText);
			}
		}
	};
	xhr.send(data);
}
function kakaopay(){
	if(totalPrice-pointUsed === 0) return updatePaymentDB();
	requestPayment("channel-key-90ac4b1c-5b33-4402-b62e-2ebee93a1730");
}
function tosspay(){
	if(totalPrice-pointUsed === 0) return updatePaymentDB();
	requestPayment("channel-key-4e7c6a0d-5486-4da0-88b5-501e8c4ff26e");
}
function danal(){
	if(totalPrice-pointUsed === 0) return updatePaymentDB();
	requestPayment("channel-key-4f39d0b9-87da-4c3b-8eb0-d8642e80fe02");
}
function requestPayment(chanelKey){//결제API호출
	document.querySelector('.loading-modal').style.display = 'flex';
	let amount = totalPrice-pointUsed;
	let payname = `${cart[0].name} ${cart[0].count}잔`;
	if(cart.length > 1) payname += ` 외  ${cart.length - 1}개의 상품`;
	const random10 = Math.floor(1000000000 + Math.random() * 9000000000);
	let data = `cart=${encodeURIComponent(JSON.stringify(cart))}&phoneNumber=${encodeURIComponent(buyerId)}&totalPrice=${encodeURIComponent(totalPrice)}&pointUsed=${encodeURIComponent(pointUsed)}&payMethod=${encodeURIComponent(pay_method)}&takeout=${encodeURIComponent(takeout)}`;
	IMP.init("imp41617173");
	IMP.request_pay({
    	channelKey: chanelKey,
	    pay_method: "card",
	    escrow: true,
	    merchant_uid: "testcustomer" + random10 + merchant_uid,
	    name: payname,
	    amount: amount,
	    buyer_tel: buyerId,
		m_redirect_url: `http://1.236.173.69:10000/MobilePayComplete?${data}`
	}, function(rsp){
		if (rsp.success){
			showAlert('결제완료됨');
			showToast('결제완료됨');
			document.querySelector('.loading-modal').style.display = 'none';
			updatePaymentDB();
		}else{
			showAlert('결제에 실패하였습니다.');
			document.querySelector('.loading-modal').style.display = 'none';
		}
	});
}
function updatePaymentDB(){//결제 성공 후 DB 업데이트
	document.querySelector('.loading-modal').style.display = 'flex';
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'AjaxUpdatePaymentDB', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	const params = new URLSearchParams({
		cart: JSON.stringify(cart),
		phoneNumber: buyerId,
		totalPrice: totalPrice,
		pointUsed: pointUsed,
		payMethod: pay_method,
		takeout: takeout
	});
	let data = params.toString();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			document.querySelector('.loading-modal').style.display = 'none';
			if(xhr.status===200){
				window.open('Receipt', 'popup', 'width=500,height=600');
				document.getElementById('page2').classList.remove('active');
				document.getElementById('page3').classList.add('active');
				document.querySelectorAll('.p3-num').forEach(e => {e.innerHTML = parseInt(merchant_uid.replace('testpayuid_', '')) + 1;});
				document.getElementById('mobile2').classList.remove('active');
				document.getElementById('mobile3').classList.add('active');
				loadingDots();
			}else{
	        	console.error('AJAX 요청 실패:', xhr.status, xhr.statusText);
			}
		}
	};
	xhr.send(data);
}
function loadingDots(){//결제완료후 ...애니메이션
	let dots = '.';
	setInterval(() => {
        dots += '.';
        if (dots.length > 3) dots = '.';
		document.querySelectorAll('.p3-content.grey').forEach(e => {e.innerHTML = '잠시후 홈으로 이동합니다'+dots;});
	}, 1000);
	setTimeout(() => location.reload(true), 8000);
}
//	--------------------포인트 적립 모달 영역--------------------
function updatePhoneNumber(str){
	let num = str.replace(/[^0-9]/g, '');
	if(num.length > 11) num = num.slice(0, 11).replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
	else if(num.length > 7) num = num.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
	else if(num.length > 3) num = num.replace(/(\d{3})(\d+)/, '$1-$2');
	phoneNumber = num;
	document.getElementById('phonenum').value = num;
	document.querySelector('.point-num').innerHTML = num;
	document.querySelector('.point-num').style.color = '#36454F';
}
document.getElementById('phonenum').addEventListener('input', function(){
	updatePhoneNumber(this.value);
})
function inputKeypad(str){//휴대폰 번호 입력 
    const pc = document.querySelector('.point-num');
	const mobile = document.getElementById('phonenum');
    if(str !== 'delete' && str !== 'reset'){
        if(phoneNumber.length === 13) return showAlert('더이상 입력할 수 없습니다.');
        phoneNumber = phoneNumber.replaceAll('-', '');
        phoneNumber += str;
		updatePhoneNumber(phoneNumber);
    }
    if(str === 'reset'){
        phoneNumber = '';
        pc.innerHTML = '휴대폰 번호를 입력해주세요!';
        pc.style.color = '#DDDDDD';
		mobile.value = '';
    }
    if(str === 'delete'){
        if(phoneNumber.length > 1){
			phoneNumber = phoneNumber.replace(/[^0-9]/g, '').slice(0, -1);
			updatePhoneNumber(phoneNumber);
        }else{
            phoneNumber = '';
            pc.innerHTML = '휴대폰 번호를 입력해주세요!';
            pc.style.color = '#DDDDDD';
			mobile.value = '';
        }
    }
}
function checkPoint(){//전화번호 유효성 검사 및 포인트 리턴
    const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if(regex.test(phoneNumber)){
        document.querySelector('.loading-modal').style.display = 'flex';
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'AjaxPointCheck', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        let data = 'phoneNumber=' + encodeURIComponent(phoneNumber);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                document.querySelector('.loading-modal').style.display = 'none';
                if(xhr.status === 200){
                    const jsonData = JSON.parse(xhr.responseText);
                    point = jsonData.point;
                    let str = `
                        <div class="point-title">${phoneNumber.slice(9)}&nbsp;님의 현재 포인트 보유량은&nbsp;<p class="color-red">${point}P</p>입니다!</div>
                        <div class="point-detail">적립하기를 클릭시 결제금액의 5%가 포인트로 적립됩니다.</div>
                        <div class="point-btnarea2">
                            <div class="point-earn f-hover">적립하고 결제하기</div>
                            <div class="point-used f-hover">포인트 사용하기</div>
                        </div>
                    `;
					let strM = `
						<div class="mobile-point-title">${phoneNumber.slice(9)}님의 현재 포인트 보유량은&nbsp;<p class="color-red">${point}P</p>입니다!</div>
						<div class="mobile-point-detail">적립하기를 클릭시 결제금액의 5%가 포인트로 적립됩니다.</div>
						<div class="mobile-point-btnarea2">
							<div class="mobile-point-earn">적립하고 결제하기</div>
							<div class="mobile-point-used">포인트 사용하기</div>
						</div>
					`
                    document.querySelector('.point-modal-content').innerHTML = str;
					document.querySelector('.mobile-modal-area2').innerHTML = strM;
					document.querySelector('.mobile-modal-area1').style.display = 'none';
					document.querySelector('.mobile-modal-area2').style.display = 'flex';
                }else{
                    console.error('AJAX 요청 실패:', xhr.status, xhr.statusText);
                }
            }
        };
        xhr.send(data);
    }else{
        showAlert('유효한 핸드폰 번호 형식이 아닙니다.');
		showToast('유효한 핸드폰 번호 형식이 아닙니다.');
    }
}
function pointPre(){//포인트 조회 취소
    closeModal(document.querySelector('.point-modal'));
	document.querySelector('.mobile-modal').classList.remove('show');
    phoneNumber = '';
	document.getElementById('phonenum').value = '';
	
}
function pointEarn(){// 포인트 적립
    buyerId = phoneNumber;
    pointUsed = 0;
    closeModal(document.querySelector('.point-modal'));
	document.querySelector('.mobile-modal').classList.remove('show');
    updatePriceStatus();
}
function pointUse(){
    if(point === 0){
		showAlert('사용할 수 있는 포인트가 없습니다!');
		showToast('사용할 수 있는 포인트가 없습니다!');
		return;
	}
    buyerId = phoneNumber;
    closeModal(document.querySelector('.point-modal'));
	document.querySelector('.mobile-modal').classList.remove('show');
    if(point <= totalPrice) pointUsed = point;
    else if(point > totalPrice) pointUsed = totalPrice;
    updatePriceStatus();
}
//	--------------------Modal 영역--------------------
function showAlert(str){//경고창 띄우기
	const e = document.querySelector('.alert-modal');
	document.querySelector('.alert-content').innerHTML = str;
	e.style.visibility = 'visible';
	e.classList.add('show');
	setTimeout(() => closeModal(e), 1400);
}
function closeModal(e){//서서히 사라지는 모달이펙트
	e.classList.remove('show');
	setTimeout(() => e.style.visibility = 'hidden', 300);
}
function showConfirm(str){//확인창 띄우기 
	const e = document.querySelector('.confirm-modal');
	document.querySelector('.confirm-title').innerHTML = str;
	e.style.visibility = 'visible';
	e.classList.add('show');
}
function confirmYes(){
    if(confirmStatus === 'p2-reset'){
        alertAfterHome('메인화면으로 이동합니다.');
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'none';
        document.querySelector('.p2-cart-parent').style.display = 'block';
        step = 0;
        return;
    }
    if(confirmStatus === 'p2-pre'){
        closeModal(document.querySelector('.confirm-modal'));
        document.getElementById('page2').classList.remove('active');
        document.getElementById('mobile2').classList.remove('active');
        document.getElementById('page1').classList.add('active');
        document.getElementById('mobile1').classList.add('active');
        return;
    }
    if(confirmStatus === 'p2-cancel'){
        cart.splice(deleteIdx, 1);
        if(cart.length === 0){
            openPage2();
            alertAfterHome('선택된 상품이 없어 이전 페이지로 이동합니다.');
            return;
        }
        openPage2();
        updateCartDisplay();
        closeModal(document.querySelector('.confirm-modal'));
        return;
    }
    if(confirmStatus === 'nopoint'){
        step = 2;
        buyerId = '';
        phoneNumber = '';
        point = 0;
        pointUsed = 0;
        closeModal(document.querySelector('.confirm-modal'));
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'flex';	
		document.getElementById('mobile-step1').style.display = 'none';
		document.getElementById('mobile-step2').style.display = 'block';
        updatePriceStatus();
    }
}

function alertAfterHome(str){//alert 끝나는 타이밍에 홈으로 이동
	document.querySelector('.confirm-modal').classList.remove('show');
	document.querySelector('.confirm-modal').style.visibility = 'hidden';
	cart.length = 0;
	cartTranslateValue = 0;
	cartBtnDisplay();
	updateCartDisplay();
	showAlert(str);
	showToast(str);
	document.querySelector('.mobile-p2-cartarea').style.display = 'flex';
	document.getElementById('mobile-step1').style.display = 'none';
	document.getElementById('mobile-step2').style.display = 'none';
	document.getElementById('mobile2').classList.remove('active');
	document.getElementById('mobile1').classList.add('active');
	setTimeout(() => {
		document.getElementById('page2').classList.remove('active');
		document.getElementById('page1').classList.add('active');
	}, 1400);
}

function showToast(str){
    const toast = document.getElementById('mobileToast');
    toast.innerText = str;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
}
setInterval(bannerSwipe, 4000);// p0 배너 슬라이드
//페이지 로딩시 실행
updateItemboxUi();
categoryBtnDisplay();
cartBtnDisplay();