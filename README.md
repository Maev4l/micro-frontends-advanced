# Micro frontend (advanced)

## Introduction

This project is a PoC of a micro-frontend approach based on module federation.

The layout is depicted below:
![layout](./docs/layout.jpg?raw=true "Layout")

Basically, it consists of a:

- header
- sidebar
- central content

## Design

The application (vaguely inspired by the Java Pet Store project) is composed of:

- a host, which provides:

  - a header
  - a side bar, with a single entry for the home page
  - a redux store
  - a router
  - several extension points

- 3 micro-frontends (aka MFE aka plugins aka modules)

  - catalog plugin, contributes to the side bar, the redux store and the router
  - orders plugin, contributes to the side bar and the router
  - user plugin, contributes to the header right slot and the router

The application relies on dynamic remotes capabiliy of module federation, meaning the host is not aware of the different modules at build time, but loads them dynamically when it kicks in.

In order to know the url where the different plugins are hosted, the host relies on a dedicated HTTP endpoint exposed by a server. This endpoint provides all the information to bootstrap the host. Therefore, the plugins can be toggled dynamically.

Each plugin declares its contributions to the different extension points defined by the host: eg. as the host has defined an extension point for its router, each plugin can contribute to this 'routing' extension point by declaring the routes to be added.

The extension points defined by the host are:

- side bar menu entries
- header right slot
- routes
- redux store reducers

## What's next:

- SSR (Server Side Rendering)
- Multi frameworks (eg. mixing React and Angular)
- Testability ?

## Resources

- https://martinfowler.com/articles/micro-frontends.html
- https://blog.palo-it.com/en/micro-frontends-with-webpack-module-federation
- https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes
- https://h3manth.com/posts/dynamic-remotes-webpack-module-federation/
- https://github.com/module-federation/module-federation-examples
- https://redux.js.org/recipes/code-splitting/#defining-an-injectreducer-function
