var nameInp = document.getElementById("productName");
var typeInp = document.getElementById("productType");
var priceInp = document.getElementById("productPrice");
var noteInp = document.getElementById("ProductNotes");
var searchInp = document.getElementById("searchBar");
var ClickButton = document.getElementById("clickButton");
var UpdateButton = document.getElementById("UpdateButton");
var UpdatedIndex;
var productItems = [];

if (localStorage.getItem("ourproduct") != null) {

    productItems = JSON.parse(localStorage.getItem("ourproduct"));
    displayData();

} 


function Addproduct() {

    var productinfo = {
        Productname: nameInp.value,
        producttype: typeInp.value,
        productprice: priceInp.value,
        productnotes: noteInp.value,
    };
    productItems.push(productinfo);
    localStorage.setItem("ourproduct", JSON.stringify(productItems));
    displayData();

    clearData();
};

function clearData() {
    nameInp.value = "";
    typeInp.value = "";
    priceInp.value = "";
    noteInp.value = "";
}

function displayData() {
    var str = "";
    for (var i = 0; i < productItems.length; i++) {

        str += `<tr>
               <td>${i}</td>
               <td>${productItems[i].Productname}</td>
               <td>${productItems[i].producttype}</td>
               <td>${productItems[i].productprice}</td>
               <td>${productItems[i].productnotes}</td>
               <td><button onclick="DeleteItem(${i})" class="bg-danger"><i class="fas fa-trash text-white"></i></button></td>
               <td><button onclick="Update(${i})" ><i class="fas fa-edit"></i></button></td>
             </tr>`
    }
    document.getElementById('T_Body').innerHTML = str;
}

function searchbar() {
    str = "";

    for (var i = 0; i < productItems.length; i++) {

        if (productItems[i].Productname
            .toLowerCase()
            .includes(searchInp.value.toLowerCase()) == true) {

            str += `<tr>
            <td>${i}</td>
            <td>${productItems[i].Productname.toLowerCase().replace(searchInp.value, `<span style="background-color: yellow;">${searchInp.value}</span>
            `)}</td>
            <td>${productItems[i].producttype}</td>
            <td>${productItems[i].productprice}</td>
            <td>${productItems[i].productnotes}</td>
            <td><button class="bg-danger"><i class="fas fa-trash text-white"></i></button></td>
            <td><button ><i class="fas fa-edit"></i></button></td>
          </tr>`

        }
    }

    document.getElementById('T_Body').innerHTML = str;
}

function DeleteItem(index) {
    productItems.splice(index, 1);
    localStorage.setItem("ourproduct", JSON.stringify(productItems));
    displayData();
}

function Update(index) {

    UpdatedIndex = index;

    nameInp.value = productItems[index].Productname;
    typeInp.value = productItems[index].producttype;
    priceInp.value = productItems[index].productprice;
    noteInp.value = productItems[index].productnotes;

    UpdateButton.classList.remove("d-none");
    ClickButton.classList.add("d-none");

}

function UpdateClickButton() {

    productItems[UpdatedIndex].Productname = nameInp.value;
    productItems[UpdatedIndex].producttype = typeInp.value;
    productItems[UpdatedIndex].productprice = priceInp.value;
    productItems[UpdatedIndex].productnotes = noteInp.value;

    displayData();
    localStorage.setItem("ourproduct", JSON.stringify(productItems));
    clearData();
    UpdateButton.classList.add("d-none");
    ClickButton.classList.remove("d-none");
}