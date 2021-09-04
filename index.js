
window.onload = function(){

    const contentItem = document.querySelector(".Content-item")
    const form = document.querySelector(".Content-form")
    const validate = form.querySelectorAll(".validate")
    const btn = document.querySelector(".Content-form__btn")
    const [product, descProduct, productImg, priceProduct] =
        [
            document.querySelector("[name='nameProduct']"),
            document.querySelector("[name='descProduct']"),
            document.querySelector("[name='productImg']"),
            document.querySelector("[name='priceProduct']")
        ]




    const data = [product, productImg, priceProduct].map(item => {
        item.addEventListener("input", onChangeInput)
    })

    function onChangeInput() {
        if (product.value !== "" && productImg.value !== "" && priceProduct.value !== "") {
            btn.style.background = "#7BAE73"
            btn.style.color = "#FFFFFF"

        }else {
            btn.style.background = "#EEEEEE"
            btn.style.color = "#B4B4B4"
        }
    }




    function getForm(event){

        event.preventDefault()
        deleteValidError()


        const obj = {
            product:  product.value,
            descProduct: descProduct.value,
            productImg: productImg.value,
            priceProduct: priceProduct.value
        }

        if(checkFields()){
            [ product.value , descProduct.value , productImg.value, priceProduct.value ] = ["","","",""]
            btn.style.background = "#EEEEEE"
            addProductItem(obj)
        }

    }

    function checkFields(){
        for(let i = 0; i < validate.length; i++){
            if (!validate[i].value){
                const error = validError()

                validate[i].style.border = "1px solid #FF8484";
                form[i].parentElement.insertBefore(error, validate[i])
                return false
            }
        }

        return true
    }

    function validError(){
        const error = document.createElement("div")
        error.className = "form__error";
        error.innerHTML = "Поле явлеяется обязтельным";
        return error
    }

    function deleteValidError(){
        const errors = form.querySelectorAll('.form__error')
        console.log(errors)
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove()
            validate[i].style.border = "none"
        }
    }

    function addProductItem(item){
        const elem = document.createElement("div")

        elem.className = "Content-product"
        elem.innerHTML = `<img class="Content-product__img" src=${item.productImg} alt="item">
                <h2 class="Content-product__title">${item.product}</h2>
                <p class="Content-product__desc">${item.descProduct}</p>
                <span class="Content-product__cost">${item.priceProduct} руб.</span>
                 <button class="Content-product__del">
                    <img class="img" src="./img/delete.png" alt="delete"/>
                </button>`
        contentItem.appendChild(elem)
    }

    function delProductItem(e){
        if (!e.target.classList.contains("Content-product__del") && !e.target.classList.contains("img")){
            return
        }
        e.target.closest("div").remove()
    }

    form.addEventListener("submit", getForm)
    contentItem.addEventListener("click", delProductItem)

};

