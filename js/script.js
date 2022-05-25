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
});