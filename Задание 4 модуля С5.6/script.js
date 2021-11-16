
const useRequest = (url, callback) => {
  return fetch(url)
    .then((response) => {
      if (callback) {
				callback(url);
			}
    })
    .catch(() => { console.log('error') });
}




// ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');



// функция обработки полученного результата
// apiData - объект с результатом запроса
function displayResult(apiData) {
	let picture = `
			<div class="card">
				<img
					src="${apiData}"
					class="card-image"
				/>
			</div>
		  `;
	resultNode.innerHTML = picture;
}; // end function displayResult


//вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', async () => {
	// ищем текстовые поля, куда вводим число от 100 до 300
	const inputWidth = document.querySelector('.inputWidth').value;
  const inputHeight = document.querySelector('.inputHeight').value;
	// ищем div text-RangeError, для отображения под input-ом сообщения, если неверный диапазон 
	const rangeError = document.querySelector('.text-RangeError');

  
  //Выполним вызов функции useRequest, если inputWidth и inputHeight в диапазоне от 100 до 300
	if ((Number(inputWidth) >= 100 && Number(inputWidth) <= 300) &&   
     (Number(inputHeight) >= 100 && Number(inputHeight) <= 300)) {
      await useRequest(`https://picsum.photos/${inputWidth}/${inputHeight}`,
      displayResult);
      const divTextRangeError = `
        <div class="text-RangeError"></div>
        `;
      rangeError.innerHTML = divTextRangeError;
	} else {
		const divTextRangeError = `
			<div class="text-RangeError">
				одно из чисел вне диапазона от 100 до 300
			</div>
			`;
		rangeError.innerHTML = divTextRangeError;
	}
  
}); // end addEventListener












