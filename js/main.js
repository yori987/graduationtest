

//ハンバーガーメニュー
$(".hamburger").click(function () {
	$(this).toggleClass('active');
  $(".header__nav").toggleClass('panelactive');
  $("#container").toggleClass('mainblur');
});

$(".header__link").click(function () {
  $(".hamburger").removeClass('active');
  $(".header__nav").removeClass('panelactive');
  $("#container").removeClass('mainblur');
});

//スライドショー
var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;

  var responsiveImage = [//PC用の画像
    { src: '../img/top1.png'},
    { src: '../img/top2.png'},
    { src: '../img/top3.png'}
  ];

//Vegas全体の設定
$('#slider').vegas({
  overlay: false,//画像の上に網線やドットのオーバーレイパターン画像を指定。
  transition: 'blur',//切り替わりのアニメーション。http://vegas.jaysalvat.com/documentation/transitions/参照。fade、fade2、slideLeft、slideLeft2、slideRight、slideRight2、slideUp、slideUp2、slideDown、slideDown2、zoomIn、zoomIn2、zoomOut、zoomOut2、swirlLeft、swirlLeft2、swirlRight、swirlRight2、burnburn2、blurblur2、flash、flash2が設定可能。
  transitionDuration: 2000,//切り替わりのアニメーション時間をミリ秒単位で設定
  delay: 10000,//スライド間の遅延をミリ秒単位で。
  animationDuration: 20000,//スライドアニメーション時間をミリ秒単位で設定
  animation: 'kenburns',//スライドアニメーションの種類。http://vegas.jaysalvat.com/documentation/transitions/参照。kenburns、kenburnsUp、kenburnsDown、kenburnsRight、kenburnsLeft、kenburnsUpLeft、kenburnsUpRight、kenburnsDownLeft、kenburnsDownRight、randomが設定可能。
  slides: responsiveImage,//画像設定を読む
  //timer:false,// プログレスバーを非表示したい場合はこのコメントアウトを外してください
});

//ヘッダースクロール

var headerH = $(".header").outerHeight(true);//headerの高さを取得    

//スクロール途中からヘッダーの高さを変化させるための設定を関数でまとめる
function FixedAnime() {
	//ヘッダーの高さを取得
	var scroll = $(window).scrollTop();
	if (scroll >= headerH){//ヘッダーの高さを超えたら
        $('.header').addClass('HeightMin');//#headerについているHeightMinというクラス名を付与
        $('.js-header').addClass('headerLogoScroll');
	}else{
        $('.header').removeClass('HeightMin');//HeightMinというクラス名を除去
        $('.js-header').removeClass('headerLogoScroll');
	}    
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	FixedAnime();//スクロール途中からヘッダーの高さを変化させる関数を呼ぶ
});

// フェードイン
function fadeIn(){ 
  // フェードアップ 
  $('.fadeUpTrigger').each(function(){  // fadeUpTriggerクラスの各要素に対して 
    let scroll = $(window).scrollTop();  // スクロール位置を取得する 
    let triTop = $(this).offset().top + 100;  // 要素の上部より100px下の位置を取得 
    let winHeight = $(window).height();  // ウィンドウの高さを取得 
    if (scroll >= triTop - winHeight){  // 画面内に要素が入ったかを判断 
      $(this).addClass('fadeUp');  // fadeUpクラスを付与 
    } 
  }); 

  // フェードレフト 
  $('.fadeLeftTrigger').each(function(){ 
    let scroll = $(window).scrollTop(); 
    let triTop = $(this).offset().top + 100; 
    let winHeight = $(window).height(); 
    if (scroll >= triTop - winHeight){ 
      $(this).addClass('fadeLeft'); 
    } 
  }); 

  // フェードライト 
  $('.fadeRightTrigger').each(function(){ 
    let scroll = $(window).scrollTop(); 
    let triTop = $(this).offset().top + 100; 
    let winHeight = $(window).height(); 
    if (scroll >= triTop - winHeight){ 
      $(this).addClass('fadeRight'); 
    } 
  }); 
} 

$(window).scroll(function () {  // スクロールしたら 
  fadeIn();  // 関数を実行 
});

function delayScrollAnime() {
	var time = 0.2;//遅延時間を増やす秒数の値
	var value = time;
	$('.delayScroll').each(function () {
		var parent = this;					
		var elemPos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		var childs = $(this).children();	
		
		if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
			$(childs).each(function () {
				
				if (!$(this).hasClass("fadeUp")) {//アニメーションのクラス名が指定されているかどうかをチェック
					
					$(parent).addClass("play");	//親要素にクラス名playを追加
					$(this).css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
					$(this).addClass("fadeUp");//アニメーションのクラス名を追加
					value = value + time;//delay時間を増加させる
					
					//全ての処理を終わったらplayを外す
					var index = $(childs).index(this);
					if((childs.length-1) == index){
						$(parent).removeClass("play");
					}
				}
			})
		}else {
			$(childs).removeClass("fadeUp");//アニメーションのクラス名を削除
			value = time;//delay初期値の数値に戻す
		}
	})
}

// 画面をスクロールをしたら動かしたい場合の記述
	$(window).scroll(function (){
		delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面をスクロールをしたら動かしたい場合の記述


//ローディングアニメーション
$(window).on('load',function(){
  $("#splash-logo").delay(1800).fadeOut('slow');//ロゴを1.8秒でフェードアウトする記述
  
  //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
  $("#splash").delay(1500).fadeOut('slow',function(){//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述
  
  $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与
  
  });
  //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
  
  //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
  $('.splashbg').on('animationend', function() { 
  //この中に動かしたいJSを記載
  });
  //=====ここまで背景が伸びた後に動かしたいJSをまとめる
  
  });


//流れるテキスト
function slideAnime(){
//====左に動くアニメーションここから===
  $('.leftAnime').each(function(){ 
    var elemPos = $(this).offset().top-50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
      //左から右へ表示するクラスを付与
      //テキスト要素を挟む親要素（左側）とテキスト要素を元位置でアニメーションをおこなう
      $(this).addClass("slideAnimeLeftRight"); //要素を左枠外にへ移動しCSSアニメーションで左から元の位置に移動
      $(this).children(".leftAnimeInner").addClass("slideAnimeRightLeft");  //子要素は親要素のアニメーションに影響されないように逆の指定をし元の位置をキープするアニメーションをおこなう
    }else{
      //左から右へ表示するクラスを取り除く
      $(this).removeClass("slideAnimeLeftRight");
      $(this).children(".leftAnimeInner").removeClass("slideAnimeRightLeft");
      
    }
  });
}

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function(){
  slideAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述