var category = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){

        var url = new URL(window.location.href);
        var prod = url.searchParams.get("prod");
        console.log(prod);

        if (resultObj.status === "ok"){
            resultObj.data.forEach(product => {
                if(product.name == prod){

                    let productNameHTML  = document.getElementById("productName");
                    let productDescriptionHTML = document.getElementById("productDescription");
                    let productCostHTML = document.getElementById("productCost");
                    let productSoldHTML = document.getElementById("productSold");
                
                    productNameHTML.innerHTML = product.name;
                    productDescriptionHTML.innerHTML = product.description;
                    productCostHTML.innerHTML = product.currency + ' ' + product.cost;
                    productSoldHTML.innerHTML = product.soldCount;

                    //Muestro las imagenes en forma de galería
                    showImagesGallery([product.imgSrc]);  
                }
            });
        }
    });
});