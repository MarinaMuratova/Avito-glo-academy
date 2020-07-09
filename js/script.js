	"use strict";

const dataBase = [];

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const modalBtnSubmit = document.querySelector(".modal__btn-submit");
const modalSubmit = document.querySelector(".modal__submit");
const modalItem = document.querySelector(".modal__item");
const catalog = document.querySelector(".catalog");
const catalogCard = Array.from(catalog.querySelectorAll(".card"));
const modalWarning = document.querySelector(".modal__btn-warning");
const elementsModalSubmit = [...modalSubmit.elements]
	.filter(elem =>  elem.tagName !=='BUTTON' && elem.type !== 'submit')

//открытие модального окна при нажатии на карточку товара
catalog.addEventListener("click", e =>{
	if(e.target.closest(".card")){
   		modalItem.classList.remove("hide");
   		document.addEventListener("keydown", closeModal);
	}
})

//открытие модального окна при нажатии "подать объявление"
addAd.addEventListener("click", function(){
	modalAdd.classList.remove("hide");
	modalBtnSubmit.disabled = true;
	document.addEventListener("keydown", closeModal);
});

//закрытие модального окна 

// const closeModal = function(e) {
// 	const target = e.target;
// 	if (target.closest(".modal__close") || target === this){
// 		this.classList.add("hide");
// 		if(this === modalAdd){
// 			modalSubmit.reset();
// 		}
// 	}
// }
// //выход по esc
// const closeModalEcs = e => {
// 	if(e.code === "Escape"){
// 		modalItem.classList.add("hide");
// 		modalAdd.classList.add("hide");
// 		modalSubmit.reset();
// 		document.removeEventListener("keydown", closeModalEcs);
// 	};
// }


//общая функиця закрытия модального окна
const closeModal = function(e) {
	const target = e.target;
	if (target.closest(".modal__close") || target === this){
		this.classList.add("hide");
		if(this === modalAdd){
			modalSubmit.reset();
		}
	}else if (e.code === "Escape"){
		modalItem.classList.add("hide");
		modalAdd.classList.add("hide");
		modalSubmit.reset();
		document.removeEventListener("keydown", closeModal);
	};
}

modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);

modalSubmit.addEventListener("input", () => {
	const validForm = elementsModalSubmit.every(elem => elem.value);
	modalBtnSubmit.disabled = !validForm;
	modalWarning.style.display = validForm ? "none" : ''
})

modalSubmit.addEventListener("submit", e => {
	e.preventDefault();
	const itemObj = {};
	for(const elem of elementsModalSubmit){
		itemObj[elem.name] = elem.value;
	}
	dataBase.push(itemObj);
	modalSubmit.reset();
	closeModal(e); //закрыть окно не получается
})






