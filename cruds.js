let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let Id = document.getElementById('Id');
let count = document.getElementById('count');
let market = document.getElementById('market');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood= 'create';
let tmp;


function getTotal()
{
    if(price.value!=''){
        let result= ( +price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML= result +'$';
        total.style.background ='#040' ;
    }else{
     total.innerHTML='0$';
     total.style.background='red';

    }
}

// get total
// create product
let dataPro;
if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}


submit.onclick =function(){
    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value, 
        discount:discount.value,
        title:title.value,
        total:total.innerHTML,
        market:market.value,
        Id:Id.value.toLowerCase(),
        count:count.value,
        category:category.value.toLowerCase(),

        
    }
 if(title.value !=''){
    if(mood==='create'){
        dataPro.push(newPro);
    }else{
        dataPro[ tmp  ]=newPro;
        mood ='create';
        submit.innerHTML ='Create';
    }
 }

   


//local storage
    localStorage.setItem('product',  JSON.stringify(dataPro) )
    

    clearData()
    showData()
}

// save localstorage
// clear of inputs after create


function clearData(){

title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
market.value='';
Id.value='';
count.value='';
category.value='';
}
//read
function showData(){
    getTotal()
  let table ='';
  for(let i=0; i <dataPro.length;i++)
  {
     table += `
    <tr>
     <td>${i}</td>
     <td>${dataPro[i].Id}</td>
     <td>${dataPro[i].count}</td>
     <td>${dataPro[i].title}</td>
     <td>${dataPro[i].price}</td>
     <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
     <td>${dataPro[i].discount}</td>
     <td>${dataPro[i].total}</td>
     <td>${dataPro[i].market}</td>
     <td>${dataPro[i].category}</td>
     <td><button  onclick="updateData(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
 </tr>
        `
  }

   document.getElementById('tbody').innerHTML= table;
   let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length>0){
        btnDelete.innerHTML =`
        <button onclick="deleteAll()">Delete All</button>
        
        `

    }else{
     
    btnDelete.innerHTML ='';

    }
}

showData()
//count
//delete

function deleteData(i){

dataPro.splice(i,1);
localStorage.product =JSON.stringify(dataPro);
showData()

}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

//count


//update
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    market.value=dataPro[i].market;
    Id.value=dataPro[i].Id;
    count.value=dataPro[i].count;
    category.value=dataPro[i].category;
getTotal()
submit.innerHTML ='Update';
mood ='update';
tmp = i;
scroll({
    top:0,
    behavior:'smooth',
})


}
//search
let searchMood = 'title';

function getSearchMood(id)
{
    let search = document.getElementById('search');
if(id==='searchTitle'){
    searchMood='title';
    search.placeholder='Search By Title';
}else if(id==='searchId'){
    searchMood='Id';
    search.placeholder='Search By Id';
}
else{
    searchMood= 'category';
    search.placeholder='Search By Category';
}
search.focus()
search.value ='';
showData();

}


function searchData(value){
let table = '';
if(searchMood=='title'){
    for(let i=0; i<dataPro.length;i++){
        if(dataPro[i].title.includes(value.toLowerCase())){ 
            
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].Id}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].market}</td>
            <td>${dataPro[i].category}</td>
            <td><button  onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
             </tr>
               `
        }
      }

    }else if(searchMood=='Id'){
        for(let i=0; i<dataPro.length;i++){
         if(dataPro[i].Id.includes(value.toLowerCase())){ 
             table += `
      <tr>
      <td>${i}</td>
      <td>${dataPro[i].Id}</td>
      <td>${dataPro[i].count}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].market}</td>
      <td>${dataPro[i].category}</td>
      <td><button  onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
       </tr>
         `
             
         }
        }
       

      }else {

      for(let i=0; i<dataPro.length;i++){
        if(dataPro[i].category.includes(value.toLowerCase())){ 
            table += `
      <tr>
     <td>${i}</td>
     <td>${dataPro[i].Id}</td>
     <td>${dataPro[i].count}</td>
     <td>${dataPro[i].title}</td>
     <td>${dataPro[i].price}</td>
     <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
     <td>${dataPro[i].discount}</td>
     <td>${dataPro[i].total}</td>
     <td>${dataPro[i].market}</td>
     <td>${dataPro[i].category}</td>
     <td><button  onclick="updateData(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
     </tr>
        `
            
        
        }}}
      document.getElementById('tbody').innerHTML= table;
   

}





//clean data
