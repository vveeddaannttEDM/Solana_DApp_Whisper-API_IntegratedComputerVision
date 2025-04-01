# Solana_DApp_Whisper-API_IntegratedComputerVision
Solana DApp with Face Authentication

## 🚀 Overview
This is a decentralized application (DApp) built on **Solana**, integrating **Face Authentication** for secure access. The app verifies the user's identity using face recognition before connecting their **Phantom** or **Backpack wallet** and processing transactions with voice commands and symbol-based verification.

## 🏗️ Features
- **Face Authentication** using Expo's Face Detector API.
- **Secure Wallet Connection** with Phantom/Backpack.
- **Voice Recognition** for amount and recipient identification.
- **Symbol-Based Verification** using a camera for enhanced security.

## 🛠️ Tech Stack
- **Frontend:** React Native (Expo)
- **Face Detection:** Expo FaceDetector API
- **Storage:** AsyncStorage for face data
- **Blockchain:** Solana Web3.js
- **Voice Recognition:** Google Speech-to-Text API (Upcoming)

## 📦 Installation
### Prerequisites:
- Node.js & npm
- Expo CLI installed globally (`npm install -g expo-cli`)
- Phantom or Backpack Wallet

### Steps:
```sh
# Clone the repo
git clone https://github.com/your-repo/solana-dapp-faceauth.git
cd solana-dapp-faceauth

# Install dependencies
npm install

# Start the project
npx expo start
```

## 🏃‍♂️ Running the App
1. Scan the QR code using the **Expo Go App**.
2. The app will request **camera permissions**.
3. If it's your first time, it will **register your face**.
4. On the next login, it will **authenticate your face**.
5. If the face is recognized, you proceed to **wallet connection**.

## 📌 Next Steps
- [ ] Improve face recognition using **Face-API.js**.
- [ ] Implement **voice recognition** for transaction input.
- [ ] Integrate **symbol-based verification**.
- [ ] Deploy on a **Solana smart contract** backend.

## 💡 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## 📝 License
This project is **MIT licensed**. Feel free to use and modify!

