export const WISH_LIST_STORAGE_KEY = '__wish_list__';

export class Wish {
  wishList = localStorage.getItem(WISH_LIST_STORAGE_KEY) || [];

  constructor() {
    this.resume();
  }

  setList = (wishList) => {
    this.wishList = wishList;
    this._setToStorage(wishList);
  }

  setItem = (productId) => {
    this.wishList.push(productId);
    this._setToStorage(this.wishList);
  }

  removeItem = (productId) => {
    this.wishList = this.wishList.filter((e) => e !== productId);
    this._setToStorage(this.wishList);
  }

  isWish = (productId) => this.wishList.includes(productId)


  _setToStorage = (wishList) => {
    localStorage.setItem(WISH_LIST_STORAGE_KEY, JSON.stringify(wishList));
  }

  resume = () => {
    this.wishList = JSON.parse(localStorage.getItem(WISH_LIST_STORAGE_KEY));
  }
}
export default new Wish();
