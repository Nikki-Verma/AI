import _authHttp from "@/services/_http";
import config from "@/utils/apiEndoints";

export const createPaymentOrderApi = ({ payload = {}, headers = {} }: any) => {
  return _authHttp.post(config.payment.createOrder, payload, {
    headers,
  });
};

export const verifyPaymentStatusApi = ({ txn_id, headers = {} }: any) => {
  return _authHttp.get(`${config.payment.verifyPaymentStatus}/${txn_id}`, {
    headers,
  });
};
