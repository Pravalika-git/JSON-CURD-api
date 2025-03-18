
let container = document.getElementById("container");
let btn = document.getElementById("btn");
let loader=document.getElementById("loader")

btn.addEventListener("click", function () {



    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let category=document.getElementById("category")
    let price = document.getElementById("price");
    let rating=document.getElementById("rating");

    

  
    if (title.value == "" ||  description.value == ""||category.value==""||  price.value == "" ||rating.value=="") {
        alert("Enter data properly");
    }
    else {
        let options = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "title": title.value,
                "description": description.value,
                "category":category.value,
                "price": price.value,
                "rating":rating.value,
                
            
            })
        }
        fetch("https://protective-torpid-veterinarian.glitch.me/products", options)
            .then(res => {
                if (res.ok) {
                    title.value = '';
                    price.value = '';
                    description.value = '';
                    rating.value='';
                    category.value='';
                   
                 
                    getData(); // mandatory
                    alert("Data Added");
                }
            })
    }
})

function getData() {
    fetch("https://protective-torpid-veterinarian.glitch.me/products")
        .then(res => res.json())
        .then(data => displayData(data));
}
function displayData(products) {
// console.log(products)
    container.innerHTML = ``; // mandatory
    products.forEach(obj => {
        let item = document.createElement("div");
        // item.className="item";
        item.innerHTML = `
            <p class="title">${obj.title}</p>
            <p class="description">${obj.description}</p>
            <p class="category">${obj.category}<P>
            <p class="price">${obj.price}</p>
      
            <button onclick = deleteData('${obj.id}')>Delete</button>
        `;
  
        loader.remove()
        container.appendChild(item);
    })
}

function deleteData(id) {
    console.log(id)
    let options = {
        "method": "DELETE"
    }
    fetch(`https://protective-torpid-veterinarian.glitch.me/products/${id}`, options)
        .then(res => {
            if (res.ok) {
                getData(); // mandatory
                alert("Data Deleted");
            }
        })
        .catch(err => console.error(err));
     
}
getData();



