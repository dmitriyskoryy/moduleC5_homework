const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

// парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");


// получение  DOM
const listNode = xmlDOM.querySelector("list");  

//создание js объекта с пустым массивом
const jsObj = {list: []};

for (let i = 0; i < listNode.children.length; i++) {
  
  const student = listNode.querySelectorAll("student")[i]; 

  const name = student.querySelector("name"); 
  const langAttribute = name.getAttribute('lang');
  const first = name.querySelector("first");
  const second = name.querySelector("second");
  const age = student.querySelector("age"); 
  const prof = student.querySelector("prof"); 

  
  const result = {
    name: `${first.textContent} ${second.textContent}`, 
    age: Number(age.textContent), 
    prof: prof.textContent, 
    lang: langAttribute,
  };

  
  jsObj.list.push(result);

}

console.log('jsObj:', jsObj);

