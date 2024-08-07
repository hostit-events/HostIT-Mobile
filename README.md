# Welcome to HostIT
## Overview

Welcome to **HostIT**, a robust web3 event ticketing application with integrated Proof of Attendance Protocol (POAP) functionality. HostIT allows users to register for events, purchase tickets, and receive digital badges as proof of their attendance. 

## Features

- **User Registration and Authentication**: Users can register using decentralized identity solutions such as MetaMask or WalletConnect
- **Event Creation and Ticketing**: Event organizers can create events, set ticket prices, and manage ticket sales. IUsers can buy tickets using cryptocurrency.
- **Attendance Verification**: Attendance verification mechanisms for attendees' participation in events, (QR code scanning or check-in procedures)
- **POAP Integration**: Integration with POA protocol to issue digital badges to attendees upon event attendance
- **Social Sharing**: Users can share their earned POAP badges on social media platforms directly from our application.
- **Analytics and Insights**: Event organizers are provided with insights into attendees' participation and engagement.


This project Currently includes:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- And more!

## Quick Start

1. Clone this repo 
2. run "yarn"
3. run "npx expo start" to start the local server

For this project's file architecture look below:

```
Check-out
├── app
│   ├── components
│   ├── config
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
|   ├── styles
│   ├── theme
│   ├── utils
│   └── app.tsx
├── assets
│   ├── icons
│   └── images
├── plugins
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   └── setup.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
├── .env
└── package.json

```

### ./app directory

Included in an Ignite boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the `app` directory looks similar to the following:

```
app
├── components
├── config
├── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
└── app.tsx
```

**components**
This is where your reusable components live.

**i18n**
This is where translations live  `react-native-i18n`.

**models**
This is where app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a place miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. 

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### ./assets directory

This directory is designed to organize and store various assets, making it easy for you to manage and use them in your application. The assets are further categorized into subdirectories, including `icons` and `images`:

```
assets
├── icons
└── images
```


### ./test directory

This directory holds Jest configs and mocks.
