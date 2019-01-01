# Dominic Fallows' multichannel app for web, mobile web and mobile native

A monorepo for Dominic Fallows' multichannel app for web, mobile web and mobile native.

## What is a monorepo

> In revision control systems, a monorepo (syllabic abbreviation of monolithic repository) is a software development strategy where code for many projects are stored in the same repository.
>
> from [Wikipedia](https://en.wikipedia.org/wiki/Monorepo)

## How this monorepo works

We have a custom monorepo setup that is operated using root [Yarn run scripts](https://yarnpkg.com/lang/en/docs/cli/run) (this project operates from the root, not the individual package folders).

The packages in this project are written using [TypeScript](https://www.typescriptlang.org). The packages are based on various frameworks, like [React DOM](https://reactjs.org), [React Native](https://facebook.github.io/react-native/) and [Gatsby](https://www.gatsbyjs.org/)

- React DOM imports Shared packages via [Yarn Link](https://yarnpkg.com/lang/en/docs/cli/link)
- React Native imports Shared packages using a custom script that [starts React Native with `yarn link`/symlink like support](https://gist.github.com/GingerBear/485f922a1e403739dc56d279925b216d)

We can't use other existing monorepo tools - see [Why we don't use Yarn Workspaces, Lerna or TypeScript Project References](#why-we-dont-use-yarn-workspaces-lerna-or-typescript-project-references)

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

## How to develop

Make sure you are in the root of the project.

First run `yarn install && yarn bootstrap` command from the root of the project. This will prepare each of the packages.

Then you can run a package script from the table below.

> At the moment we can only run one package script at-a-time, however each command starts multiple package processes as required.
> - [ ] TODO: enable running of multiple commands without conflicting package processes.

| Job | Packages started | Command |
|---|---|---|
| Develop the Web package | shared, web | `yarn start:web` |
| Develop the Mobile Web package | shared, shared-native, mobile-web | yarn start:mobile-web |
| Develop the Mobile Native package (Android) | shared, shared-native, mobile | `yarn start:mobile:android` |
| Develop the Mobile Native package (iOS) | shared, shared-native, mobile | `yarn start:mobile:ios` |

<!---
### To run your app on iOS

`cd packages/mobile` then `react-native run-ios`

or open `ios/mobile.xcodeproj` in Xcode and hit the Run button

### To run your app on Android

`cd packages/mobile`, have an Android emulator running (quickest way to get started), or a device connected, then `react-native run-android`
-->

## Why we don't use Yarn Workspaces, Lerna or TypeScript Project References

Because we use both TypeScript and multiple different frameworks across the packages, we are prevented from using other monorepo tools:

- React Native and React DOM both have their own conflicting TypeScript Definitions - which prevents use of [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces) and [Lerna](https://github.com/lerna/lerna)
- Gatsby compiles TypeScript using [@babel/preset-typescript](@babel/preset-typescript) - which prevents use of more recent TypeScript monorepo support, like [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- Lerna is designed to work with JavaScript monorepos that publish compiled code to NPM. We need to handle raw TypeScript code and store to GitHub.