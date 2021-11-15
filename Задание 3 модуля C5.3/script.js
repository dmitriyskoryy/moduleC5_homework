
function useRecuest(url, callback) {
	var xhr = new XMLHttpRequest();
	//инициализируем запрос
	xhr.open('GET', url, true);

	//добавляем обработчик ответа сервера. Этот обработчик возвращает конечный результат
	xhr.onload = function() {
		if (xhr.status != 200) {
			console.log('Статус ответа:', xhr.status);
		} else {
			//  json надо распарсить
			const result = JSON.parse(xhr.response);
			if (callback) {
				callback(result);
			} 
		}
	};

	// Добавляем обработчик ошибки
	xhr.onerror = function() {
		console.log('Ошибка! Статус ответа:', xhr.status);
	};

	xhr.send();
}; // end function useRecuest


// ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');



// функция обработки полученного результата
// apiData - объект с результатом запроса
function displayResult(apiData) {
	let cards = '';

	apiData.forEach(item => {
		const cardBlock = `
			<div class="card">
				<img
					src="${item.download_url}"
					class="card-image"
				/>
				<p>${item.author}</p>
			</div>
		`;
		cards = cards + cardBlock;	
	});
	resultNode.innerHTML = cards;
}; // end function displayResult


//вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
	// ищем текстовое поле, куда вводим число от 1 до 10
	const numberInput = document.querySelector('.number-input').value;
	// ищем div text-RangeError, для отображения под input-ом сообщения, если неверный диапазон 
	const rangeError = document.querySelector('.text-RangeError');
	
	if (Number(numberInput) > 1 && Number(numberInput) < 10) {
		useRecuest(`https://picsum.photos/v2/list?limit=${numberInput}`,
		displayResult);
		const divTextRangeError = `
			<div class="text-RangeError"></div>
			`;
		rangeError.innerHTML = divTextRangeError;
	} else {
		const divTextRangeError = `
			<div class="text-RangeError">
				Введен неверный диапазон
			</div>
			`;
		rangeError.innerHTML = divTextRangeError;
	}
});









