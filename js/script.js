	"use strict";

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const modalBtnSubmit = document.querySelector(".modal__btn-submit");
const modalSubmit = document.querySelector(".modal__submit");
const modalItem = document.querySelector(".modal__item");
const catalog = document.querySelector(".catalog");
const catalogCard = Array.from(catalog.querySelectorAll(".card"));


//открытие модального окна при нажатии "подать объявление"
addAd.addEventListener("click", function(){
	modalAdd.classList.remove("hide");
	modalBtnSubmit.disabled = true;
});

//закрытие модального окна 
modalAdd.addEventListener("click", function(e){
	const target = e.target;
	if (target.classList.contains("modal__close") || target === modalAdd){
		modalAdd.classList.add("hide");
		modalSubmit.reset();
	}
});
//выход по esc
document.addEventListener("keydown", function(e){
	if(e.keyCode === 27){
		if(!modalAdd.classList.contains("hide")){
			modalAdd.classList.add("hide");
		}
		if(!modalItem.classList.contains("hide")){
			modalItem.classList.add("hide");
		}
	}
})

//открытие модального окна при нажатии на карточку товара
catalogCard.forEach((elem) => {
	elem.addEventListener("click", function(){
   		modalItem.classList.remove("hide");
    })
})

//закрытие модального окна 
modalItem.addEventListener("click", function(){
	if (this.classList.contains("modal__close") || this === modalItem){
		this.classList.add("hide");
	}
});




