import * as actionTypes from "../actions/actions";

const initialState = {
  invitation: {
    id: "",
    form: {
      subject: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "موضوع جلسه",
        },
        value: "",
        vaildation: {
          required: true,
        },
        valid: false,
        used: false,
      },
      host: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "میزبان جلسه",
        },
        value: "",
        vaildation: {
          required: true,
        },
        valid: false,
        used: false,
      },
      minute: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "دستور جلسه",
        },
        value: "",
        vaildation: {
          required: true,
        },
        valid: false,
        used: false,
      },
      room: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "محل برگزاری",
        },
        value: "",
        vaildation: {
          required: true,
        },
        valid: false,
        used: false,
      },
      roomAddress: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "آدرس محل برگزاری",
        },
        value: "",
        vaildation: {
          required: true,
        },
        valid: false,
        used: false,
      },
    },
    date: "",
    time: "",
    participants: [],
  },
  cantactForm: {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "نام و نام خانوادگی",
      },
      value: "",
      vaildation: {
        required: true,
      },
      valid: false,
      used: false,
    },
    position: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "پست سازمانی",
      },
      value: "",
      vaildation: {
        required: true,
      },
      valid: false,
      used: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "آدرس ایمیل",
      },
      value: "",
      vaildation: {
        required: true,
      },
      valid: false,
      used: false,
    },
    mobile: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "شماره تلفن همراه",
      },
      value: "",
      vaildation: {
        required: true,
      },
      valid: false,
      used: false,
    },
  },
  loginForm: {
    signIn: {
      mobile: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "09...",
        },
        value: "",
        vaildation: {
          required: true,
        },
        valid: false,
        used: false,
      },
    },
    loginVerify: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "- - - -",
      },
      value: "",
      vaildation: {
        required: true,
      },
      valid: false,
      used: false,
    },
    signUp: {
      verifyCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "- - - -",
        },
        value: "",
        vaildation: {
          required: true,
        },
        valid: false,
        used: false,
      },
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "نام و نام خانوادگی",
        },
        value: "",
        vaildation: {
          required: true,
        },
        valid: false,
        used: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ایمیل",
        },
        value: "",
        vaildation: {
          required: true,
        },
        valid: false,
        used: false,
      },
    },
    level: '1'
  },
  participants: [],
  meetings: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INVITATIONINPUTCHANGE:
      return {
        ...state,
        invitation: {
          ...state.invitation,
          form: action.payload.data,
        },
      };
    case actionTypes.SETMEETINGDATE:
      return {
        ...state,
        invitation: {
          ...state.invitation,
          date: action.payload.data,
        },
      };
    case actionTypes.SETMEETINGTIME:
      return {
        ...state,
        invitation: {
          ...state.invitation,
          time: action.payload.data,
        },
      };
    case actionTypes.CONTACTINPUTCHANGE:
      return {
        ...state,
        cantactForm: action.payload.data,
      };
    case actionTypes.SETCONTACT:
      return {
        ...state,
        invitation: {
          ...state.invitation,
          participants: action.payload.data,
        },
      };
    case actionTypes.SIGNINCHANGEINPUT:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          signIn: action.payload.data
        }
      }
      case actionTypes.SWITCHFORM:
        return {
          ...state,
          loginForm: {
            ...state.loginForm,
            level: action.payload.data
          }
        }
    case actionTypes.GETMEETINGS:
      return {
        ...state,
        meetings: action.payload.data,
      };

    case actionTypes.GETCONTACTS:
      return {
        ...state,
        participants: action.payload.data,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
