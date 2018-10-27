# dominicfallows-multichannel-app

## Structure

```bash
packages/
  core/
    services/ # Shared JS services
    contexts/ # Shared React Contexts
    helpers/ # Shared JS helpers
  shared/
    native/ # Shared React Native components
    web/ # Shared React DOM components
    styles/ # Shared JS styles
    assets/ # Shared assets, like SVGs etc
  mobile/ # React Native with TypeScript
  mobile-web/ # Gatsby PWA with TypeScript and React Native for Web
  web/ # Gatsby PWS with TypeScript and React DOM
```

## Get started with Core or Shared

TODO

## Get started with Web

TODO

## Get started with Mobile Web

TODO

## Get started with Mobile

### To run your app on iOS

`cd packages/mobile` then `react-native run-ios`

or open `ios/mobile.xcodeproj` in Xcode and hit the Run button

### To run your app on Android

`cd packages/mobile`, have an Android emulator running (quickest way to get started), or a device connected, then `react-native run-android`