export default (state, action) => {
  switch (action.type) {
    case "UPDATESTATE":
      return { ...state, [action.payload.name]: action.payload.value };
    case "UPDATELIST":
      return {
        ...state,
        messageList: [...state.messageList, action.payload.value],
      };
    default:
      return (
        state || {
          name: "",
          phone: "",
          email: "",
          isScreenOne: true,
          messageList: [],
          isAuth: false,
          sessionId: null
        }
      );
  }
};
