export const isString = (val) => {
    if (val.includes(".")) {
      return true;
    }
    if (val.length === 1 && val === " ") {
      return false;
    }
    if (
      val[val.length - 1] === " " &&
      val[val.length - 1] !== val[val.length - 2]
    ) {
      return true;
    }
    if (
      val[val.length - 1]?.trim()?.toLowerCase() !==
        val[val.length - 1]?.trim()?.toUpperCase() ||
      val === ""
    ) {
      return true;
    }
    return false;
  };
  export const isFloat = (val) => {
    if (val[val.length - 1] === " " || val === "." || val === "0") {
      return false;
    }
    if (val.includes(".")) {
      val = val.replace(".", "");
      // eslint-disable-next-line no-restricted-globals
      if ((!val.includes(".") && !isNaN(val?.trim())) || val === "") {
        return true;
      }
      return false;
    }
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(val?.trim()) || val === "") {
      return true;
    }
    return false;
  };
  export const isNumber = (val) => {
    if (val[val.length - 1] === " ") {
      return false;
    }
    if (val.includes(".")) {
      return false;
    }
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(val?.trim()) || val === "") {
      return true;
    }
    return false;
  };
  const isFieldEmpty = (text) => {
    if (text === "") {
      return true;
    }
    return false;
  };
  const validName = (text) => {
    const reg = /^[A-Za-z ]{3,25}$/;
    if (reg.test(text) !== true) {
      return true;
    }
    return false;
  };
  const validPasswordPattern = (password) => {
    const reg =
      /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return reg.test(password);
  };
  const matchPassword = (newpassword, confirmPassword) => {
    if (newpassword !== confirmPassword) {
      return true;
    }
    return false;
  };
  const validEmail = (email) => {
    let reg =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (reg.test(email) !== true) {
      return true;
    }
    return false;
  };
  const validOTP = (otp) => {
    if (otp.length < 4) {
      return false;
    }
    return true;
  };
  const validMobileNo = (number) => {
    let phoneno = /^[1-9]{1}[0-9]{9}$/;
    if (number) {
      // if (number.length > 7 && number.length < 15) {
      //   return false;
      // }
      if (phoneno.test(number)) {
        return false;
      }
      return true;
    }
  };
  