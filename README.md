![Screenshot 2023-12-31 at 01 00 13](https://github.com/juanisimioli/wasap_fe/assets/48897558/ae8a7b9c-51ad-4460-ad25-b2212b0f4ebe)

# Wasap Front End

Hello! I'm Juanisimioli, a frontend developer venturing into the blockchain ecosystem. I'm practicing by building decentralized applications (dapps) from scratch using NextJS 14 + Ethers 6.9 + Hardhat 2.19 + Solidity 0.8.18.

## Overview

Step into the future of messaging with our current chat app version deployed in December 2023 – a groundbreaking platform seamlessly integrating blockchain and conversation. Avatars are securely stored on the InterPlanetary File System (IPFS).

It's important to note that the current version lacks the proxy pattern, a feature I will be working on in January 2024. Once implemented, this enhancement will enable continuous updates and new features, including the highly anticipated ability for users to seamlessly send money to contacts directly within the application. Join me in shaping the next era of decentralized communication!

This dApp is developed for educational & learning purposes.

> ```diff
> + TRY IT sending me a message using sepolia testnet to my address:
> + 0x86B6181C7Ad521817191097F383748BCb4D62594
> ```
> [www.wasap.net.ar](https://www.wasap.net.ar)

<br/>

## dApp

The application is developed entirely by Juanisimioli and is available for your use. Feel free to provide feedback or even consider hiring me!

This project is crafted with cutting-edge technologies to ensure a robust and modern development experience:

- **Next.js 14:** Leveraging the power of the latest Next.js version for a seamless and efficient web application.
- **Material UI:** Employing the sleek and responsive design components of Material UI to enhance the user interface.
- **Ethers:** Utilizing Ethers to seamlessly integrate blockchain functionality, providing a secure and reliable foundation for blockchain interactions.

You can experience it live at [www.wasap.net.ar](https://www.wasap.net.ar). Please ensure you have MetaMask installed to interact with the dapp and use Sepolia Testnet.

You can also explore the backend repository [here](https://github.com/juanisimioli/wasap_be) (built with Hardhat 2.19 + Solidity 0.8.18).

**Note**: Please be aware that actual version 11.6.1 of MetaMask has reported bugs. For optimal performance, we strongly recommend using MetaMask version 11.5.2. Instructions on how to install this version can be found [here](https://support.metamask.io/hc/en-us/articles/360016336611-Revert-back-to-earlier-version-or-add-custom-build-to-Chrome).

**Note**: In the `config.js` file, you have the flexibility to tailor the allowed chain IDs for various testnets or networks. Feel free to customize these settings to align with your specific blockchain environment. Additionally, the file allows you to effortlessly update contract addresses based on your preferences. Simply modify the corresponding fields to ensure seamless integration with your chosen blockchain configurations.

## Contract ABI Location

Inside the `contract` folder, you'll find the ABI (Application Binary Interface) of the contract. In case you make any modifications to the smart contract within the [Wasap repository](https://github.com/juanisimioli/wasap_be), kindly update the ABI file by replacing it with the newly generated version.

## Installation and Development Mode

First install all dependencies

```shell
npm run install
```

Initiate the development mode

```shell
npm run dev
```

## Connect to Hardhat Network

To integrate the Hardhat network with your front-end application, you need to manually add the network to your MetaMask. Follow these steps:

1. Open MetaMask in your browser.

2. Click on the network dropdown in the top right corner of the MetaMask extension.

3. Select "Custom RPC" from the list.

4. In the "New RPC URL" field, enter the URL for the Hardhat network. This is typically `http://localhost:8545` if you are running Hardhat locally.

5. Optionally, you can provide a name for the network (e.g., "Hardhat Network").

6. In the "Chain ID" field, enter `1337` for the Hardhat network.

7. Click "Save" to add the custom network.

Now, your MetaMask is configured to connect to the Hardhat network, allowing your front-end application to interact seamlessly during development. For more detailed instructions, you can refer to the official MetaMask documentation [here](https://docs.metamask.io/wallet/how-to/get-started-building/run-devnet/).

## Contact me

I would love to hear from you! Whether you have questions, feedback, or just want to connect, please don't hesitate to reach out via email at [juanisimioli@gmail.com](mailto:juanisimioli@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/juanisimioli/). Learning together in this community is a wonderful experience, and I'm always open to feedback and collaboration.

## Wasap Demo

(in progress)

## Other DApps Developed by Me:

Aerolineas: This dapp facilitates the purchase of flight tickets using cryptocurrency. Each seat from one destination to another on a specific flight is represented as an NFT. This allows users to perform various actions such as canceling reservations, purchasing tickets, making free transfer reservations, or even reselling tickets at a desired price for others to buy.
[Aerolineas Front End](https://github.com/juanisimioli/aerolineas_fe) /
[Aerolineas Back End](https://github.com/juanisimioli/aerolineas_be)
