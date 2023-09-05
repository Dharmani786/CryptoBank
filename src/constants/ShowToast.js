import { toast } from "react-toastify";

export function successToast(message) {
  
  
  
  toast.success(message);
}
export function errorToast(message) {
  toast.dismiss();
  toast.error(message);
}
export function warnToast(message) {
  toast.dismiss();
  toast.warn(message);
}

export function infoToast(message) {
  toast.dismiss();
  toast.info(message);
}
