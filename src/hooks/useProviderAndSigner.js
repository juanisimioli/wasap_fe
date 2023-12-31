"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useToast } from "./useToast";

const useProviderAndSigner = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const {
    wallet: { address, chainId },
  } = useMetamaskContext();

  const { handleOpenToast } = useToast();

  const getProviderAndSigner = async (ethereum) => {
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = address ? await provider.getSigner() : null;

      setProvider(provider);
      setSigner(signer);
    } catch (e) {
      handleOpenToast("error", "Problem getting signer and provider");
      console.error(e);
    }
  };

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return;
    getProviderAndSigner(ethereum);
  }, [address, chainId]);

  return { provider, signer };
};

export default useProviderAndSigner;
