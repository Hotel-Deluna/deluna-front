const IsLogin = () =>
!!localStorage.getItem('Authorization');

export default IsLogin;