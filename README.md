# Dominic Fallows' multichannel app for web, mobile web and mobile native

## Structure

```bash
packages/
  mobile/ # React Native with TypeScript
  mobile-web/ # Gatsby SPWA with TypeScript and React Native for Web
  shared/
    content/ # Shared content (text, images etc)
    contexts/ # Shared React contexts
    helpers/ # Shared JS helpers
    services/ # Shared JS services
    styles/ # Shared JS styles
  shared-native/ # Shared React Native components
  web/ # Gatsby SPWa with TypeScript and React DOM
```

## Get started with Shared package

TODO

## Get started with Web package

TODO

## Get started with Mobile Web packages

TODO

## Get started with Mobile package

### To run your app on iOS

`cd packages/mobile` then `react-native run-ios`

or open `ios/mobile.xcodeproj` in Xcode and hit the Run button

### To run your app on Android

`cd packages/mobile`, have an Android emulator running (quickest way to get started), or a device connected, then `react-native run-android`