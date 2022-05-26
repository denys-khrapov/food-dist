window.addEventListener('DOMContentLoaded', () => {
	//Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');



	function hideTabsContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabsContent(i) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabsContent();
	showTabsContent(0);

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabsContent();
					showTabsContent(i);
				}
			});
		}
	});

	// Timer
	//отправная точка
	const deadline = '2022-06-01';

	//задача функции получить разницу между датами
	//будет определять разницу между нашим дедлайном
	//и текущим временем 
	function getTimeRemaining(endtime) {
		//мы получим количество миллисекунд
		//которые будут в нашем конечном времени 
		const time = Date.parse(endtime) - Date.parse(new Date());
		//Math.floor округление до ближайшего целого
		//1000*60 получаем сколько миллисекунд в минуте = 60000
		//потом умножаем еще на 60, получаем сколько в часе
		//умножаем на 24(часа) получаем сколько в одном дне миллисекунд
		// мы получим сколько суток осталось до окончание даты deadline
		const days = Math.floor(time / (1000 * 60 * 60 * 24)),
			hours = Math.floor((time / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((time / 1000 / 60) % 60),
			seconds = Math.floor((time / 1000) % 60);

		return {
			'total': time,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();


		function getZero(num) {
			if (num >= 0 && num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		}

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadline);


	//Modal
	const modalOpenBtn = document.querySelectorAll('[data-open'),
		modal = document.querySelector('.modal'),
		modalCloseBtn = modal.querySelector('[data-close]');

	function modalOpen() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		// clearInterval(modalTimerId);
	}
	modalOpenBtn.forEach(btn => {
		btn.addEventListener('click', modalOpen);
	});

	function modalClose() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	modalCloseBtn.addEventListener('click', modalClose);


	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			modalClose();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			modalClose();
		}
	});

	// const modalTimerId = setTimeout(modalOpen, 5000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			modalOpen();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

	// Cards Menu
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}
	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		`Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих
овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
		9,
		'.menu .container',
		'menu__item'


	).render();
	new MenuCard(
		'img/tabs/elite.jpg',
		'elite',
		'Меню "Премиум"',
		`В меню “Премиум” мы используем не только красивый дизайн упаковки, но
		и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
		в ресторан!`,
		25,
		'.menu .container',
		'menu__item'

	).render();
	new MenuCard(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		`Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
		продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
		количество белков за счет тофу и импортных вегетарианских стейков.`,
		15,
		'.menu .container',
		'menu__item'

	).render();
});