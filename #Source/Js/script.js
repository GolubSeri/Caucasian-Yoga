// ====== Адаптированные фоновые изображения ====== 

function ibg(){
	var ibgItems = document.querySelectorAll('.ibg');
	if (ibgItems.length > 0){
		ibgItems.forEach(ibgItem => {
			let imgItem = ibgItem.querySelector('img').getAttribute('src');
			ibgItem.style.backgroundImage = 'url("' + imgItem + '")';
		});
	}
}
ibg();

// ====== Бургер ====== 

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

if(iconMenu){
	iconMenu.addEventListener('click', function(e){
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// ====== Скролл при клике ====== 

// Базовое значение padding top и bottom шапки;
let headerPadDown = 21;
// До какого размера изменится при скролле; ( нужно в другом скрипте ) 
let headerPadUp = 21;
// Текущее значение padding шапки
let nowPad = headerPadDown;

// scroll-button - класс блоков, в которых есть кнопка, приводящая к скроллу
const menuLinks = Array.prototype.slice.call(document.querySelectorAll('.menu__list, .scroll-button'));

let allLinks = [];
menuLinks.forEach(menuLink => {
	menuLink.querySelectorAll('a').forEach(linksItem=> {
		allLinks.push(linksItem);
	});
});

if (menuLinks.length > 0){
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		let menuLink = e.target;
		if (!menuLink.getAttribute('href')){
			menuLink = menuLink.parentNode;
		}
		e.preventDefault();

		let gotoName = menuLink.getAttribute('href').replace('#', '.')
		if(gotoName && document.querySelector(gotoName)){
			const gotoBlock = document.querySelector(menuLink.getAttribute('href').replace('#', '.'));
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset + ( nowPad * 2 ) - document.querySelector('.header__body').offsetHeight;

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});

			// Закрываем меню бургер при переходе на блок
			if(iconMenu.classList.contains('_active')){
				document.body.classList.remove('_lock');
				iconMenu.classList.toggle('_active');
				menuBody.classList.toggle('_active');
			}
		}
	}
}

// ====== Анимации при скролле ====== 

const animItems = document.querySelectorAll('.animItems');
const hoverItems = document.querySelectorAll('.noHover');
const header = document.querySelector('.header__body');
let scrollPos = 0;

window.addEventListener('scroll', animOnScroll);
function animOnScroll(params){
	// Анимация хедера
	let headerHeight = header.offsetHeight;
	if (pageYOffset > scrollPos && pageYOffset > 90){
		// Down
		document.querySelector('.header__body').style.paddingTop = headerPadUp + 'px';
		document.querySelector('.header__body').style.paddingBottom = headerPadUp + 'px';
		document.querySelector('.header__container').classList.add('styleActive');
	} else {
		// Up
		if (pageYOffset < 90){
			document.querySelector('.header__body').style.paddingTop = headerPadDown + 'px';
			document.querySelector('.header__body').style.paddingBottom = headerPadDown + 'px';
			document.querySelector('.header__container').classList.remove('styleActive');
		}
	}
	scrollPos = pageYOffset;
}

setTimeout(() => {
	animOnScroll();
}, 300);