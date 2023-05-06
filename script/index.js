import {initialCards} from './constants.js'

const popup = document.querySelector('.popup');
const closePopUpButton = document.querySelector('.popup__close-button');
const openPopUpButton = document.querySelector('.profile__edit-button');
const form = document.querySelector('.popup__form')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')
const inputName = document.querySelector('.popup__input-name')
const inputAbout = document.querySelector('.popup__input-about')


const popupAdd = document.querySelector('.popup_add')
const popupAddForm = popupAdd.querySelector('.popup__form_add')
const inputCardName = popupAdd.querySelector('.popup__input-name_add')
const inputCardLink = document.querySelector('.popup__input-link_add')
const popupCloseButtonAdd = popupAdd.querySelector('.popup__close-button')

const cardsList = document.querySelector('.elements__cards-list')
const popupOpenButtonAdd = document.querySelector('.profile__add-button')
const templateCard = document.querySelector('#template-card').content.querySelector('.card__item')


const createCard = (list, dataCard) => {
  // создали карточку клонированием и присвоили новые значения из dataCard
  const cloneCard = templateCard.cloneNode(true);
  const title = cloneCard.querySelector('.card__title');
  const image  = cloneCard.querySelector('.card__image');
  title.textContent = dataCard.name;
  image.src = dataCard.link;
  image.alt = dataCard.name;


  const cardImage = document.querySelector('.card__image')
  const popupImg = document.querySelector('.popup-image')
  const photoImg = popupImg.querySelector('.popup-image__photo')
  const closeButtonImg = popupImg.querySelector('.popup-image__close-button')
  const infoImg = popupImg.querySelector('.popup-image__info')
  
  image.addEventListener('click', function(evt) {
  evt.preventDefault()
  infoImg.textContent = dataCard.name
  photoImg.src = dataCard.link
  photoImg.alt = dataCard.name
  popupImg.classList.add('popup_opened')
  console.log(popupImg)
  })

  closeButtonImg.addEventListener('click' , () => {
    popupImg.classList.remove('popup_opened')
  })
// Нашли кнопку удаления в клоне карточки  и навесили событие удаления
  const buttonDelete = cloneCard.querySelector('.card__delete-button')
  buttonDelete.addEventListener('click',() => handleClick(list, cloneCard))

  list.prepend(cloneCard);

  const likeButton = document.querySelector('.card__like-image');
  likeButton.addEventListener('click', function () { 
    likeButton.classList.toggle('card__like-image_active');
  });

}



const handleClickRemove = (event) => {
  event.target('click').remove
}

const handleClick = (list, element) => {
  list.removeChild(element)
}


popupAddForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const cardTitle = inputCardName.value
  const cardLink = inputCardLink.value
  const newCard = {
    name:inputCardName.value,
    link:inputCardLink.value,
  }
  createCard(cardsList, newCard)
  popupAdd.classList.remove('popup_opened')
})

//открытие попапа редактирования профиля и сохранение введенных значений в профиль
const openPopup = function() {
  popup.classList.add('popup_opened')
  inputName.value = profileName.textContent
  inputAbout.value = profileAbout.textContent
}

// функция закрытия попапа
const closePopup = function() {
  popup.classList.remove('popup_opened')
}

// функция для слушателя событий формы попапа редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

openPopUpButton.addEventListener('click', openPopup)
closePopUpButton.addEventListener('click', closePopup)
form.addEventListener('submit', handleFormSubmit)
popupOpenButtonAdd.addEventListener('click', () => {
  popupAdd.classList.add('popup_opened')
})

popupCloseButtonAdd.addEventListener('click', () => {
  popupAdd.classList.remove('popup_opened')
})
initialCards.forEach(element => {
  createCard(cardsList, element)
})