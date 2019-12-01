export const ACCESS_TOKEN_STORAGE_KEY = '__access_token__';

export class Users {
  token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

  constructor() {
    this.resume();
  }

  setToken = (accessToken) => {
    let token = accessToken;
    if (typeof accessToken === 'object') {
      token = accessToken.token;
    }
    this.token = token;
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  }

  resume = () => {
    this.token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }


  logout = () => {
    this.setToken({ token: '' });
  }
}
export default new Users();
