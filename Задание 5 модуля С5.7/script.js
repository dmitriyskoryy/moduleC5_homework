
// функция выполняет запрос по url, и если ок, то выполняет callback: функцию displayResult
const useRequest = (url, callback) => {
  return fetch(url)
    .then((response) => {
			// Превращаем объект в JSON. Мы не можем его сразу прочитать,
      // надо отдать в следующий then
			const result = response.json();
			return result;
		})
		.then((jsonData) => {   
      //запишем полученные данные в localStorage с ключем url
      localStorage.setItem('url', url);
      
      //вызовем функцию displayResult
     	if (callback) {
				callback(jsonData);
			}
    })
    .catch(() => { console.log('error') });
}


// проверяем наличие url в localStorage, загружаем его
let localStorageKey = localStorage.getItem('url');
if (localStorageKey) {
  useRequest(localStorageKey, displayResult);
}

// ищем ноду для вставки результата запроса (картинок)
const resultNode = document.querySelector('.j-result');
// ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');



// функция обработки полученного результата
function displayResult(apiData) {
	/*
	В apiData получаем список в формате json, в котором по ключам "download_url"
	будут ссылки на картинки, которые нужно вывести
	*/
	let picture = '';
	// проходим по всем элементам списка 
	apiData.forEach(item => {
		let pictureBlock = `
			<div class="card">
				<img
					src="${item.download_url}"
					class="card-image"
				/>
			</div>
		  `;
		picture = picture + pictureBlock;
	});
	resultNode.innerHTML = picture;
}; // end function displayResult



//вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', async () => {
	// ищем текстовые поля, куда будем вводить лимит и номер страницы в диапазоне от 1 до 10
	const numberPage = document.querySelector('.text-number-page').value;
	const limit = document.querySelector('.limit').value;
	/* ищем тэги div: limit-error и number-page-error, для отображения 
	под input-ами сообщений, что неверный диапазон*/ 
	const numberPageError = document.querySelector('.number-page-error');
	const limitError = document.querySelector('.limit-error');
	
	//предварительно очищаем сообщения о неверном диапазоне
	const divTextNumberPageError = `
	  <div class="number-page-error"></div>
	`;
	numberPageError.innerHTML = divTextNumberPageError;
		
	const divTextLimitError = `
	  <div class="limit-error"></div>
	`;
	limitError.innerHTML = divTextLimitError;
	
	
	// начинаем проверку введенных значений в инпуты
	if ((Number(numberPage) < 1 || Number(numberPage) > 10) &&   
     (Number(limit) < 1 || Number(limit) > 10)) {
		const divTextLimitError = `
		  <div class="limit-error">Номер страницы и лимит вне диапазона от 1 до 10</div>
		`;
		limitError.innerHTML = divTextLimitError;
		return;
	} else if (Number(numberPage) < 1 || Number(numberPage) > 10) {
		const divTextNumberPageError = `
		  <div class="number-page-error">Номер страницы вне диапазона от 1 до 10</div>
		`;
		numberPageError.innerHTML = divTextNumberPageError;
		return;
	} else if (Number(limit) < 1 || Number(limit) > 10) {
		const divTextLimitError = `
		  <div class="limit-error">Лимит вне диапазона от 1 до 10</div>
		`;
		limitError.innerHTML = divTextLimitError;
		return;
	} else {
		const divTextNumberPageError = `
		  <div class="number-page-error"></div>
		`;
		numberPageError.innerHTML = divTextNumberPageError;
		
		const divTextLimitError = `
		  <div class="limit-error"></div>
		`;
		limitError.innerHTML = divTextLimitError;
	}
	
  //сформируем url
  const url = `https://picsum.photos/v2/list?page=${numberPage}&limit=${limit}`;
  
  //запрос
  await useRequest(url, displayResult);
  
}); // end addEventListener





