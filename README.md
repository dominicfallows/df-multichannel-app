# Dominic Fallows's multichannel app for web, mobile web and mobile native

A monorepo for Dominic Fallows's multichannel app for web, mobile web and mobile native.

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
  # mobile/ # React Native with TypeScript
  # mobile-web/ # Gatsby SPWA with TypeScript and React Native for Web
  shared/
    content/ # Shared content (markdown, text, images etc) for web and mobile
    helpers/ # Shared helpers for web and mobile
    interfaces/ # Shared interfaces for web and mobile
    styles/ # Shared styles for web and mobile
  # shared-native/ # Shared React Native components
  shared-web/
    components/ # Shared React components for web
    contexts/ # Shared React contexts for web
    styles/ # Shared styles for web
  web/ # Gatsby SPWa with TypeScript and React DOM
scripts/ # Monorepo scripts triggered by Yarn commands
```

## How to develop

Make sure you are in the root of the project.

First run `yarn install` command from the root of the project.

Then you can run a package script from the table below.

> At the moment we can only run one package script at-a-time, however each command starts multiple package processes as required.

- [ ] TODO: enable running of multiple commands without conflicting package processes.

### Web package

By running the commands for the web package, we also run the required commands for each dependency package, so you don't need to run those independently.

| Command | Job | Packages used |
|---|---|---|
| `yarn web:install` | Prepares the web and dependency packages for development and build | web, shared, shared-web |
| `yarn web:start` | Develop the web package | web, shared, shared-web |
| `yarn web:build` | Build the web package | web, shared, shared-web |
| `yarn web:serve` | Serve the built the web package | web, shared, shared-web |

### Shared (web and mobile)

| Command | Job | Packages used |
|---|---|---|
| `yarn shared:install` | Prepares the shared package for development and build | shared |
| `yarn shared:start` | Develop the shared package | shared |

### Shared (web)

| Command | Job | Packages used |
|---|---|---|
| `yarn shared-web:install` | Prepares the shared-web and dependency packages for development and build | shared, shared-web |
| `yarn shared-web:start` | Develop the shared-web package | shared, shared-web |

<!-- | `yarn start:mobile-web` | Develop the Mobile Web package | shared, shared-native, mobile-web |
| `yarn start:mobile:android` | Develop the Mobile Native package (Android) | shared, shared-native, mobile |
| `yarn start:mobile:ios` | Develop the Mobile Native package (iOS) | shared, shared-native, mobile | -->

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

<!-- ## Hosting
AWS Amplify rewrite rule for hybrid Gatsby app (static and dymaic route app)
</^[^.]+$|\.(?!(css|gif|html|ico|jpg|js|json|png|txt|svg|woff|ttf)$)([^.]+$)/>
-->

## License

See [LICENSE.md](LICENSE.md)
