export const allowedNetworkIds = {
  localhost: 31337,
  sepolia: 11155111,
};

export const wasapContractAddress = {
  // LOCALHOST deployed contract
  31337: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  // SEPOLIA deployed contract
  11155111: "0x726c6e1382BE603DCb6189b5c74ae32743791502",
};

export const SMART_CONTRACT_VERSION_FEATURES = {
  1: {
    PAYMENTS_ENABLED: false,
  },
  2: {
    PAYMENTS_ENABLED: true,
  },
};
