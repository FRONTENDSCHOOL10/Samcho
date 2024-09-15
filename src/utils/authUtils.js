// 유틸리티 함수: localStorage 관련 로직
export const authUtils = {
  setDefaultAuthData: () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        isAuth: false,
        user: null,
        token: '',
      })
    );
  },
  setAuthData: (model, token) => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        isAuth: !!model,
        user: model,
        token,
      })
    );
  },
  setUpdateData: (data) => {
    localStorage.setItem('auth', JSON.stringify(data));
  },
  getPocketbaseAuth: () => {
    return JSON.parse(localStorage.getItem('pocketbase_auth'));
  },
  getAuth: () => {
    return JSON.parse(localStorage.getItem('auth'));
  },
};
