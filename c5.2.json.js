
const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

// парсинг jsonString, преобразуем json в js oбъект
const data = JSON.parse(jsonString);
console.log('jsonData', data);

// получаем массив list
const list = data.list;


//создание js объекта jsObj с пустым массивом list
const jsObj = {list: []};

for (let i = 0; i < list.length; i++) {
  
  const result = {
    name: list[i].name,
    age: Number(list[i].age),
    prof: list[i].prof,
  };
  
  jsObj.list.push(result);
  
}

console.log('jsObj:', jsObj);

