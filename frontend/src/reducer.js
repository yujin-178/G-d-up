const initialState = {
  newId: 100,
  email: '',
  password: '',
};

export default function reducer(state = initialState, action) {
  if (action.type === 'changeEmailField') {
    return {
      ...state,
      email: action.payload.email,
    };
  }

  if (action.type === 'changePasswordField') {
    return {
      ...state,
      password: action.payload.password,
    };
  }

  return state;
};
