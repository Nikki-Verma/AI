const __EDGE_URL__ = process.env.NEXT_PUBLIC_EDGE_BASE_URL;

const __IDENTITY_BASE_URL__ = process.env.NEXT_PUBLIC_IDENTITY_BASE_URL;
const __MODEL_BASE_URL__ = process.env.NEXT_PUBLIC_MODEL_BASE_URL;
const __DATA_BASE_URL__ = process.env.NEXT_PUBLIC_DATA_BASE_URL;
const __RAG_BASE_URL__ = process.env.NEXT_PUBLIC_RAG_BASE_URL;
const __INTRACT_BASE_URL__ = process.env.NEXT_PUBLIC_INTRACT_BASE_URL;
const __CHANNEL_AGGREGATOR_BASE_URL__ =
  process.env.NEXT_PUBLIC_CHANNEL_AGGREGATOR_BASE_URL;
const __AGENT_BASE_URL__ = process.env.NEXT_PUBLIC_AGENT_SERVICE_BASE_URL;
export const BASE_URLS = {
  identity: `${__EDGE_URL__}${__IDENTITY_BASE_URL__}`,
  model: `${__EDGE_URL__}${__MODEL_BASE_URL__}`,
  data: `${__EDGE_URL__}${__DATA_BASE_URL__}`,
  rag: `${__EDGE_URL__}${__RAG_BASE_URL__}`,
  channelAggregator: `${__EDGE_URL__}${__CHANNEL_AGGREGATOR_BASE_URL__}`,
  agent: __AGENT_BASE_URL__,
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
  models: {
    list: `${BASE_URLS.model}/api/v1/model/search`,
    detail: `${BASE_URLS.model}/api/v1/model`,
  },
  workspace: {
    models: `${BASE_URLS.model}/api/v1/user/model`,
    addToWorkspace: `${BASE_URLS.model}/api/v1/user/model`,
    deploy: `${BASE_URLS.model}/api/v1/user/model/deploy`,
    connect: `${BASE_URLS.channelAggregator}/api/v1/model/close-model`,
  },
  workflow: {
    list: `${BASE_URLS.channelAggregator}/api/v1/model-pipeline`,
    details: `${BASE_URLS.channelAggregator}/api/v1/model-pipeline`,
    create: `${BASE_URLS.channelAggregator}/api/v1/model-pipeline`,
    update: `${BASE_URLS.channelAggregator}/api/v1/model-pipeline`,
  },
  agents: {
    list: `${BASE_URLS.channelAggregator}/api/v1/agent-pipeline`,
    details: `${BASE_URLS.channelAggregator}/api/v1/agent-pipeline`,
    create: `${BASE_URLS.channelAggregator}/api/v1/agent-pipeline`,
    update: `${BASE_URLS.channelAggregator}/api/v1/agent-pipeline`,
    delete: `${BASE_URLS.channelAggregator}/api/v1/agent-pipeline`,
  },
  tools: {
    list: `${BASE_URLS.agent}/tools/`,
    details: `${BASE_URLS.agent}/tools`,
  },
  dataset: {
    list: `${BASE_URLS.data}/api/v1/dataset/collections`,
    create: `${BASE_URLS.data}/api/v1/dataset/collection`,
    uploadFile: `${BASE_URLS.data}/api/v1/storage/upload`,
    files: `${BASE_URLS.data}/api/v1/dataset/collection/files`,
  },
  dataConnectors: {
    connectConfluence: `${BASE_URLS.channelAggregator}/api/v1/data-connector`,
    addFilesToDataset: `${BASE_URLS.channelAggregator}/api/v1/data-connector`,
  },
  knowledgebase: {
    list: `${BASE_URLS.data}/api/v1/dataset/knowledgebase`,
    create: `${BASE_URLS.data}/api/v1/dataset/knowledgebase`,
    addFiles: `${BASE_URLS.data}/api/v1/dataset/knowledgebase/add-file`,
    files: `${BASE_URLS.data}/api/v1/dataset/knowledgebase/files`,
  },
  rag: {
    chat: `${BASE_URLS.rag}/retrieve/context/`,
    chunks: `${BASE_URLS.rag}/ingestion/chunking/`,
  },
  integrate: {
    channels: `${BASE_URLS.channelAggregator}/api/v1/chat-channel`,
    create: `${BASE_URLS.channelAggregator}/api/v1/chat-channel`,
  },
};

export default config;
