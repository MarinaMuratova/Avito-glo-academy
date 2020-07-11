	"use strict";

const dataBase = JSON.parse(localStorage.getItem("avito")) || [];
 let counter = dataBase.length;

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

const saveDataBase = () => localStorage.setItem("avito", JSON.stringify(dataBase));
const infoPhoto = {};
const modalFileInput = document.querySelector(".modal__file-input");
const modalFileBtn = document.querySelector(".modal__file-btn");
const modalImageAdd = document.querySelector(".modal__image-add");

const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;
//получили все элементы в модальном окне
const modalImageItem = document.querySelector(".modal__image-item");
const modalHeaderItem = document.querySelector(".modal__header-item");
const modalDescriptionItem = document.querySelector(".modal__description-item");
const modalCostItem = document.querySelector(".modal__cost-item");
const modalStatusItem = document.querySelector(".modal__status-item");

//открытие модального окна при нажатии на карточку товара
catalog.addEventListener("click", e =>{
	const target = e.target;
	const card = target.closest(".card")
	console.log(card.dataset.id)
	if(card){ //в базе данных нашли объявление по id

		const item = dataBase.find(obj => {
			obj.id ===  +card.dataset.id;
		});
		modalImageItem.src = `data:image/jpeg;base64,${item.image}`
		modalHeaderItem.textContent = item.nameItem;
		modalStatusItem.textContent = item.status === "new" ? "Новый" : "Б/У";
		modalDescriptionItem.textContent = item.descriptionItem;
		modalCostItem.textContent = item.costItem;

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


//общая функиця закрытия модального окна
const closeModal = e => {
	const target = e.target;
	if (target.closest(".modal__close") || target.classList.contains("modal") || e.code === "Escape") {
		modalItem.classList.add("hide");
		modalAdd.classList.add("hide");
		modalSubmit.reset();
		modalImageAdd.src =srcModalImage;
		modalFileBtn.textContent = textFileBtn;
		document.removeEventListener("keydown", closeModal);
		checkForm();
	};
}

modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);


modalSubmit.addEventListener("submit", e => {
	e.preventDefault();
	const itemObj = {};
	for(const elem of elementsModalSubmit){
		itemObj[elem.name] = elem.value;
	}
	itemObj.id = counter++;
	itemObj.image = infoPhoto.base64;
	dataBase.push(itemObj);
	closeModal({target: modalAdd});
	saveDataBase();
	renderCard();
})

function checkForm(){
	const validForm = elementsModalSubmit.every(elem => elem.value);
	modalBtnSubmit.disabled = !validForm;
	modalWarning.style.display = validForm ? "none" : ''
}

modalSubmit.addEventListener("input", checkForm)

//добавление картинки
modalFileInput.addEventListener("change", e => {
	const target = e.target;
	const reader = new FileReader();
	const file = target.files[0];
	infoPhoto.name = file.name;
	infoPhoto.size = file.size;

	reader.readAsBinaryString(file);

	reader.addEventListener("load", e => {
		if(infoPhoto.size < 200000){
		modalFileBtn.textContent = "infoPhoto.name";
		infoPhoto.base64 = btoa(e.target.result); //конвертируем картинку в строку
		modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
		}else{
			modalFileBtn.textContent = "Размер файла не должен превышать 200кБ";
			modalFileInput.value = "";
			checkForm();
		}
	})
})

//добавление новой карточки объявления
const renderCard = (DB = dataBase) => {//параметр по умолчанию, если ничего не передается. если передается, то исп его
	catalog.textContent = "";
	DB.forEach(elem => {
		catalog.insertAdjacentHTML("beforeEnd",
			`<li class="card" data-id = "${elem.id}">
				<img class="card__image" src="data:image/jpeg;base64,${elem.image}" alt="test">
				<div class="card__description">
					<h3 class="card__header">${elem.nameItem}</h3>
					<div class="card__price">${elem.costItem} ₽</div>
				</div>
			</li>`)
	})
}

renderCard();


//поиск
const searchInput = document.querySelector(".search__input");

searchInput.addEventListener("input", () => {
	const valueSearch = searchInput.value.trim().toLowerCase(); //обрезали пробелы слева и справа
	if(valueSearch.length > 2){
		const result = dataBase.filter(elem => elem.nameItem.toLowerCase().includes(valueSearch) || elem.descriptionItem.toLowerCase().includes(valueSearch));
		readerCard(result);
	}
});


const menuContainer = document.querySelector(".menu__container");
menuContainer.addEventListener("click", e => {
	const target = e.target;
	if(target.tagName === "A"){
		const result = dataBase.filter(item => item.category === target.dataset.category);
		renderCard(result);
	}
})



