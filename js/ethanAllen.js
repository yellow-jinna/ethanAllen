$(document).ready(function () {

  $(window).on('resize orientationchange', function(){
    viewModeControl();
    hoverpanelControl();
    detailSlider();
    asideTopControl();
    paddingControl();
    loofSlider();
  });
  // header
  headerhoverControl();
  scrollControl();

  // shopPanel
  hoverpanelControl();

  // cartPanel
  removeControl(".removeBtn");
  qtyControl();

  // panel
  panelControl("header > button");
  panelControl("header ul li button");
  panelControl(".leftPanel ul li button");
  panelControl(".listContainer aside + button");
  panelControl(".detailContainer aside button");
  mobileSide()

  // popup
  introPopup();
  popupControl(".locationContainer address button");
  popupControl(".myAddressContainer button");
  popupControl(".myOrderContainer button");
  popup2Control(".crCancelPopup button");
  popup2Control(".crReturnPopup button");
  popupControl(".hospiContainer button");
  popupControl(".socialContainer button");
  popupControl(".businessContainer button");
  
  // toggle
  tooltipControl();
  accordionControl(".accComponent h4");
  checkoutToggle();
  moFoToggle();

  // selectBox
  selectControl("div[class^='select'] button");
  customControl(".customSelect span");

  // img
  listhoverControl();
  detailimgControl();

  // btn
  asideControl();
  viewModeControl();

  // slider
  indexSlider1();
  indexSlider2();
  indexSlider3();
  detailSlider();
  businessSlider();
  loofSlider();

  numberOnly();
  output();
  asideTopControl();
  paddingControl();
});

// header
function headerhoverControl(){
  var header = $("header");
  header.hover(function(){
    if(header.hasClass("active")) return;
    if($(window).scrollTop() == 0){
        header.addClass("active");
        header.data("produce", true); 
      }},function(){
      if(header.data("produce") && $(window).scrollTop() == 0){
        header.removeClass("active");
        header.removeData("produce");
      }
    });
}
function scrollControl(){
  var header = $("header");
  $(window).on("scroll", function(){
    var scrollTop = $(window).scrollTop();
    if(header.hasClass("active") && !header.data("produce")) return;
    if(scrollTop > 0 && !header.hasClass("active")){
      header.addClass("active");
      header.data("produce", true);
    }
    if(scrollTop == 0 && header.data("produce")){
      header.removeClass("active");
      header.removeData("produce");
    }
  });
}

// shopPanel
function hoverpanelControl(){
  $(".shopPanel ul > li").off("mouseenter mouseleave click");
  $(".shopPanel ol").off("mouseleave");
  if(window.matchMedia("(min-width:1280px)").matches){
    $(".shopPanel ul > li").mouseenter(function(){
      $(".shopPanel ol").removeClass("active");
      $(".shopPanel ul > li").removeClass("active");
      $(this).find("ol").addClass("active");
      $(this).addClass("active");
    });
    $(".shopPanel ul > li:has(> a)").mouseleave(function(){
      $(this).removeClass("active");
    });
    $(".shopPanel ol").mouseleave(function(){
      $(this).removeClass("active");
      $(this).closest("li").removeClass("active");
    });
  }else{
    $(".shopPanel ul > li").click(function(){
      $(this).toggleClass("active");
      $(this).find("ol").toggleClass("active");
    });
  }
}

// cartPanel
function updateTotalPrice(){
  var total = 0;
  $(".fillCart ul li").each(function(){
    var priceText = $(this).find("strong").text().replace('$', '').replace(',', '');
    // li에 strong 찾아서 text에 $과,을 ''로 바꿈
    var itemPrice = parseFloat(priceText);
    // priceText를 숫자변환
    var currentNumb = parseFloat($(this).find("span").text());
    // span 찾아서 숫자변환
    total += itemPrice * currentNumb;
    // 변수 total에 itemPrice 와 crrentNumb 곱해 더함 
  });
  $(".fillCart div strong").text("$" + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  // strong text에 $ 와 total을 더함 근데 tofixed는 숫자 소수점 둘째 자리까지 고정된 문자열로 바꾸고 3자리마다 콤마(,)를 넣음
}
function removeControl(btn){
  $(btn).click(function(){
    $(this).closest("li").remove();
    if($(".fillCart ul li").length == 0){
      $(".fillCart").removeClass("active");
      $(".emptyCart").addClass("active");
    }
    updateTotalPrice();
  });
}
function qtyControl(){
  $(".qtyRemove, .qtyAdd").click(function(){
    var span = $(this).siblings('span');
    // 변수 span의 this의 형제 span을 담음
    var currentNumb = parseInt(span.text());
    // span을 숫자변환해서 currentNumb에 저장
    if($(this).hasClass("qtyAdd")){ //qtuAdd 가진애는 클릭할때마다 증가
      currentNumb++;
    }else if($(this).hasClass("qtyRemove")){ //qtyRemove 가진애는 클릭할때마다 감소
      currentNumb--;
    }
    if (currentNumb < 1) currentNumb = 1; // 만약 currentNumb가 1보다 작아지게되면 1로 지정
    span.text(currentNumb);
    updateTotalPrice();
  });
}


// panel 
function panelControl(btn){
  var currentTarget = null;
  $(btn).click(function(){
      var category = $(this).attr("data-panel");
        currentTarget = "." + category;
        $(currentTarget).addClass("active");
  });
  $(".closeBtn").click(function(){
        $(currentTarget).removeClass("active");
  });
}

// popup
function introPopup(){
  var popup = $(".introPopup");
  popup.find(".closeBtn").click(function(){
    popup.removeClass("active");
  });
}

function popupControl(btn){
  var currentTarget = null; 
  $(btn).click(function(){
      var category = $(this).attr("data-popup");
        currentTarget = "." + category;
        $(currentTarget).addClass("active");
  });
  $(".closeBtn").click(function(){
        $(currentTarget).removeClass("active");
  });
}
function popup2Control(btn){ // 의문의 개이득
  var currentTarget = null; 
  $(btn).click(function(){ 
      var category = $(this).attr("data-popup");
        currentTarget = "." + category;
        $(currentTarget).addClass("active");
  });
  $(".closeBtn").click(function(){
        $(currentTarget).removeClass("active");
  });
  $(".cancelBtn").click(function(){
        $(currentTarget).removeClass("active");
  });
}

function mobileSide(){
  var btn = $("header > button:last-of-type");
  $(btn).click(function(){
    $(this).next().addClass("active");
  });
  $(".closeBtn").click(function(){
    $(btn).next().removeClass("active");
  })
}

// toggle
function tooltipControl(){
  $(".toolTip").click(function(){
    $(".tooltipBox").toggleClass("active");
  });
}
function accordionControl(target){
  $(target).click(function(){
    $(this).toggleClass("active");
  });
};
function checkoutToggle(){
  $("[class^='checkout'] aside h2").click(function(){
    $(this).closest("aside").toggleClass("active");
  });
}
function moFoToggle(){
  $("footer h2").click(function(){
    $(this).toggleClass("active");
    $(this).next().toggleClass("active");
  });
}


// selectBox
function detailTotalPrice(){ // detail price 함수충돌?
  var total = 0;
  $(".select.size .selectOpt li").click(function(){
    var $aside = $(this).closest("aside");
    var $strong = $aside.children("strong").first();
    var priceText = $strong.text().replace('$', '').replace(',', '');
    var itemPrice = parseFloat(priceText);
    var extraText = $(this).find("span").text().replace('+', '').replace('$', '').replace(',', '');
    var extraPrice = parseFloat(extraText) || 0;
    total = itemPrice + extraPrice;
    $aside.find("button[data-panel='cartPanel'] strong").text(
      "$" + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  });
}

function selectControl(btn) {
  $(btn).click(function () {
    $(this).toggleClass("active");
    $(this).next().toggleClass("active");
    paddingControl()
    $(this).next().find("li").off("click").click(function(){
      // var selectext = $(this).text();
      var selectext = $(this).text().replace(/\+/g, " +").replace(/\s*\$/g, "$");
      var $selectBox = $(this).closest("div[class^='select']");
      $selectBox.find(".selected").text(selectext);
      $selectBox.find(".selectOpt li").removeClass("active");
      $(this).addClass("active");
      $selectBox.find(".selectOpt").removeClass("active");
      $selectBox.find("button").removeClass("active");
      paddingControl()
    });
    detailTotalPrice();
  });
}
function customControl(btn) {
  $(btn).click(function () {
    $(this).toggleClass("active");
    $(this).next().toggleClass("active");
    $(this).next().find("li").off("click").click(function(){
      var selectext = $(this).text();
      var $selectBox = $(this).closest("div[class^='custom']");
      var $selected = $selectBox.find(".selected");
      $selected.text(selectext);
      $selected.addClass("color");
      $selectBox.find(".selectOpt li").removeClass("active");
      $(this).addClass("active");
      $selectBox.find(".selectOpt").removeClass("active");
      $selectBox.find("span").removeClass("active");
    });
  });
}

// img
function listhoverControl(){
  $(".listContainer li a img").hover(function(){
    var currentSrc = $(this).attr("src");
    $(this).attr("data-src", currentSrc);
    var hoverSrc = currentSrc.replace(/(\.\w+)$/, "_hover$1");
    $(this).attr("src", hoverSrc);
  },function(){
    var currentSrc = $(this).attr("data-src");
    $(this).attr("src", currentSrc);
  });
}

function detailimgControl(){
  var currentImg = $(".detailContainer div > img");
  $(".thumbPager li").click(function(){
    var clickImg = $(this).find("img").attr("src");
    currentImg.attr("src", clickImg);
    $(".thumbPager li").removeClass("active");
    $(this).addClass("active");
  });
}


// btn
function asideControl(){
  $(".signContainer button[data-aside]").click(function(){
    var targetClass = $(this).attr("data-aside");
    $(".loginAside, .forgotPWAside").removeClass("active");
    $("." + targetClass).addClass("active");
  });
}

function viewModeControl() {
  var $viewMode = $(".viewMode");
  var $list = $(".listContainer > ul");

  if(window.matchMedia("(min-width:1115px)").matches){
    $viewMode.css("display", "flex");
    var $activeBtn = $viewMode.find("button.active");
    $list.removeClass("col2 col3").addClass($activeBtn.text());
    
    $viewMode.find("button").off("click").on("click", function() {
      $viewMode.find("button").removeClass("active");
      $(this).addClass("active");
      var col = $(this).text();
      $list.removeClass("col2 col3").addClass(col);
    });
  }else if(window.matchMedia("(min-width:600px)").matches){
    $list.removeClass("col2 col3 col1").addClass("col2");
    $viewMode.css("display", "none");
    $viewMode.find("button").off("click");
  }else{
    $list.removeClass("col2 col3").addClass("col1");
    $viewMode.css("display", "none");
    $viewMode.find("button").off("click");
  }
}


function numberOnly(){
  $(".onlyNumber").on("keyup",function(){ // onlyNumber class 가진 요소에 키보드를 입력할때 함수실행
    var currentVal = $(this).val(); // 현재 요소에 val 값을 가져와서 currentVal에 저장
    var numberOnly = currentVal.replace(/[^0-9]/g, ""); // currentVal에 숫자가 아닌 문자열을 공백처리하여 저장
    $(this).val(numberOnly); // 다시 현재요소에 numberOnly을 val에 넣음

      // $(this).val($(this).val().replace(/[^0-9]/g,"")); 
  });
}

function output(){
  $("input[type='range']").on("input", function(){
    var currentVal = Number($(this).val());
    $("#priceValue").text(currentVal.toLocaleString());
  });
}


function asideTopControl(){
  if(window.matchMedia("(max-width:767px)").matches){
    var imgHeight = $(".detailContainer > div > img").outerHeight(true);
    var pagerHeight = $(".detailContainer .bx-wrapper").outerHeight(true);
    var top = imgHeight + pagerHeight + 89;
    $(".detailContainer > aside").css("top", top + "px");
  } else if(window.matchMedia("(max-width:1279px)").matches){
    var imgHeight = $(".detailContainer > div > img").outerHeight(true);
    var pagerHeight = $(".detailContainer .bx-wrapper").outerHeight(true);
    var top = imgHeight + pagerHeight + 113;
    $(".detailContainer > aside").css("top", top + "px");
  } else {
    $(".detailContainer > aside").css("top", ""); 
  }
}
function paddingControl(){
  if(window.matchMedia("(max-width:767px)").matches){
    var asideHeight = $(".detailContainer aside").outerHeight(true);
    var padding = asideHeight + 90;
    $(".detailContainer > div > div:last-of-type").css("padding-top", padding + "px");
  }else if(window.matchMedia("(max-width:1279px)").matches){
    var asideHeight = $(".detailContainer aside").outerHeight(true);
    var padding = asideHeight + 100;
    $(".detailContainer > div > div:last-of-type").css("padding-top", padding + "px");
  }else{
    $(".detailContainer > div > div:last-of-type").css("padding-top", "");
  }
}


// select, accordion -> toggleClass active -> click이 일어난 대상에게 toggleClass -> 클릭할 때마다 class가 들어갔다가 나왔다

// onlyNumber -https://simsimyeun.github.io/dania/index.html / numberOnly 함수 보면 되고 / 수량 qty로 검색해서 script 참고 - 완성되면 주석 달아오기
function indexSlider1(){
  $('.newArrivalSlider').bxSlider({
    slideWidth: 430,
    minSlides: 1,
    maxSlides: 6,
    moveSlides: 1,
    slideMargin: 40,
    pager: false, 
    controls: true,
    prevSelector: '.new_prev',
    nextSelector: '.new_next',
    prevText: '이전',
    nextText: '다음',
    touchEnabled: false,
    responsive: true,
    shrinkItems: true,
    infiniteLoop: true
  });
}

function indexSlider2(){
  $('.bestSellerSlider').bxSlider({
    slideWidth: 430,
    minSlides: 1,
    maxSlides: 6,
    moveSlides: 1,
    slideMargin: 40,
    pager: false, 
    controls: true,
    prevSelector: '.best_prev',
    nextSelector: '.best_next',
    prevText: '이전',
    nextText: '다음',
    touchEnabled: false,
    responsive: true,
    shrinkItems: true,
    infiniteLoop: true
  });
}

function indexSlider3(){
  $('.clearanceSlider').bxSlider({
    slideWidth: 430,
    minSlides: 1,
    maxSlides: 6,
    moveSlides: 1,
    slideMargin: 40,
    pager: false, 
    controls: true,
    prevSelector: '.clear_prev',
    nextSelector: '.clear_next',
    prevText: '이전',
    nextText: '다음',
    touchEnabled: false,
    responsive: true,
    shrinkItems: true,
    infiniteLoop: true
  });
}


var thumbSlider;
function detailSlider(){
  var $thumbPager = $('.thumbPager');
  if(!$thumbPager.length) return;

  if (window.matchMedia("(min-width:768px)").matches) {
    // 768px 이상일 때: 커스텀 옵션
    var containerWidth = $thumbPager.width();
    var slideMargin = 15;
    var slideShow = $thumbPager.find('li').length;
    var totalMargin = (slideShow - 1) * slideMargin;
    var slideWidth = Math.round((containerWidth - totalMargin) / slideShow);

    if (thumbSlider) {
      thumbSlider.destroySlider();
    }

    thumbSlider = $thumbPager.bxSlider({
      slideWidth: slideWidth,
      maxSlides: slideShow,
      minSlides: slideShow,
      slideMargin: slideMargin,
      moveSlides: 1,
      pager: false,
      responsive: true,
      shrinkItems: true,
      touchEnabled: false
    });

  } else {
    // 767px 이하일 때: 기본 bxSlider 옵션
    if (thumbSlider) {
      thumbSlider.destroySlider();
    }
    thumbSlider = $thumbPager.bxSlider({
      slideWidth: 170,
      maxSlides: 6,
      minSlides: 1,
      slideMargin: 15,
      moveSlides: 1,
      pager: false,
      responsive: true,
      shrinkItems: true,
      touchEnabled: false
    });
  }
}

function businessSlider(){
  $('.businessSlider').bxSlider({
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    slideMargin: 60,
    pager: false, 
    controls: true,
    prevSelector: '.center_prev',
    nextSelector: '.center_next',
    prevText: '이전',
    nextText: '다음',
    infiniteLoop: true,
    touchEnabled: false
  });
}

function loofSlider(){
  if($('.loofSlide').length){ 
    if ($('.loofSlide').data('bxSlider')) {
      $('.loofSlide').data('bxSlider').destroySlider();
    }

    var isDesktop = window.matchMedia("(min-width:1280px)").matches;
    var isMobile = window.matchMedia("(max-width:767px)").matches;

    $('.loofSlide').bxSlider({
      mode: 'horizontal',
      ticker: true,
      speed: 60000,
      slideWidth:  isDesktop ? 400 : (isMobile ? 200 : 250),
      minSlides: 1,
      maxSlides: 6,
      slideMargin: isDesktop ? 60 : 30,
      pager: false,
      controls: false
    });
  }
}