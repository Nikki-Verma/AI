const __EDGE_URL__ = process.env.NEXT_PUBLIC_EDGE_BASE_URL;
const __IDENTITY_BASE_URL__ = process.env.NEXT_PUBLIC_IDENTITY_BASE_URL;
const __INTRACT_BASE_URL__ = process.env.NEXT_PUBLIC_INTRACT_BASE_URL;
export const BASE_URLS = {
  identity: `${__EDGE_URL__}${__IDENTITY_BASE_URL__}`,
  intract: __INTRACT_BASE_URL__,
};

const config = {
  identity: {
    login: `${BASE_URLS.identity}/user/login`,
    logout: `${BASE_URLS.identity}/user/logout`,
    createSession: `${BASE_URLS.identity}/session/create`,
    signup: `${BASE_URLS.identity}/user/signup`,
    changeStatus: `${BASE_URLS.identity}/user/change_status`,
    authenticateOtp: `${BASE_URLS.identity}/authenticate/otp`,
    authenticateInvitation: `${BASE_URLS.identity}/authenticate/invitation`,
    getPublicKey: `${BASE_URLS.identity}/util/public_key`,
    getUsers: `${BASE_URLS.identity}/user/all`,
    getRolesByUserGroup: `${BASE_URLS.identity}/user_group/details`,
    getAllUserGroups: `${BASE_URLS.identity}/user_group/all`,
    inviteUser: `${BASE_URLS.identity}/user/invite`,
    createUserGroup: `${BASE_URLS.identity}/user_group/create`,
    resetPassword: `${BASE_URLS.identity}/password/reset`,
    updatePassword: `${BASE_URLS.identity}/password/update`,
    authenticateEmail: `${BASE_URLS.identity}/authenticate/email`,
    resendOTP: `${BASE_URLS.identity}/authenticate/resend_otp`,
  },
  intract: {
    initiateConversation: `${BASE_URLS.intract}/api/v1/intract/conversation`,
    streamResponse: `${BASE_URLS.intract}/api/v1/intract/conversation/fetch`,
    chatHistoryList: `${BASE_URLS.intract}/api/v1/intract/conversation`,
    chatDetails: `${BASE_URLS.intract}/api/v1/intract/conversation`,
  },
};

export default config;
