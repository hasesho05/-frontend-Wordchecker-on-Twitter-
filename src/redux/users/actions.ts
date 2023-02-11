export const SIGN_IN = 'SIGN_IN'
export const signInAction = (userState: any) => {
  return {
    type: 'SIGN_IN',
    payload: {
      isSignedIn: true,
      icon: userState.icon,
      token: userState.token,
      username: userState.username,
    },
  }
}

export const SIGN_OUT = 'SIGN_OUT'
export const signOutAction = () => {
  return {
    type: 'SIGN_OUT',
    payload: {
      isSignedIn: false,
      icon: '',
      token: '',
      username: '',
    },
  }
}