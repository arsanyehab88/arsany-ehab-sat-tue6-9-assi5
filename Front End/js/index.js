let productList = []
let productName = document.getElementById("productName")
let productPrice = document.getElementById("productPrice")
let productCat = document.getElementById("productCat")
let productDesc = document.getElementById("productDesc")
let currentId ;

fetchData()
function fetchData(){
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(json => {
        if(json.massage=="success"){
            productList = json.data
            console.log(json);
            Display(productList)
        }
      })
}



function Display(x){
    let cartona = ``
    x.map((ele)=>{
        cartona +=`
        <tr class="text-white">
        <td>${ele.id}</td>
        <td>${ele.Name}</td>
        <td>${ele.Price}</td>
        <td>${ele.Category}</td>
        <td>${ele.Description}</td>
        <td><button class="btn btn-outline-warning rounded-pill" onclick="Update(${ele.id})">Update</button></td>
        <td><button class="btn btn-outline-secondary rounded-pill"  onclick="Delete(${ele.id})">Delete</button></td>
    </tr>
        `
    })
    document.getElementById("data").innerHTML=cartona
}

function Add(){

    let productObj = {
        name:productName.value,
        price:productPrice.value,
        desc:productDesc.value,
        cat:productCat.value
    }
    
    fetch('http://localhost:3000/AddProducts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(productObj)
}).then(res => res.json())
  .then(res => {
    if(res.massage == "success"){
        fetchData()
        clear()
    }
  });
  
}

function Search(value){
    fetch(`http://localhost:3000/searchById/${value}`)
    .then(response => response.json())
    .then(json => {
      if(json.massage=="success"){
        productList=json.data
        if(productList.length != 0){
            Display(productList)
        }
        
      }
    })
    
}

function Delete(id){
    fetch(`http://localhost:3000/deleteProduct/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
  .then(res => {
    if(res.massage == "success"){
        fetchData()
        
    }
  });
}
function DeleteALL(){
    fetch(`http://localhost:3000/DeleteALL`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
  .then(res => {
    if(res.massage == "success"){
        fetchData()
        
    }
  });
}
function Update(id){
    currentId=id
    let cartItem = productList.filter(ele => ele.id == id)[0]
    productName.value=cartItem.Name
    productPrice.value=cartItem.Price
    productDesc.value=cartItem.Description
    productCat.value=cartItem.Category
    document.getElementById("main").classList.add("d-none")
    document.getElementById("up").classList.remove("d-none")

}

function CallUpdate(){
    let productObj = {
        name:productName.value,
        price:productPrice.value,
        desc:productDesc.value,
        cat:productCat.value
    }
    fetch(`http://localhost:3000/updateProducts/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productObj)
      }).then(res => res.json())
        .then(res => {
          if(res.massage == "success"){
              fetchData()
              clear()
              document.getElementById("main").classList.remove("d-none")
              document.getElementById("up").classList.add("d-none")
          }
        });
}


function clear(){
    productName.value=''
    productPrice.value=''
    productDesc.value=''
    productCat.value=''
}
