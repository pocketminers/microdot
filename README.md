# 🟠 microdot

## Decentralized Micro-services Architecture

This repository is designed to provide an effortless decentralized micro-services architecture. The goal is to create a system that can be easily scaled and maintained. The system is designed to be modular and can be easily extended to include new services.

## Specifications

- **Framework**: [Express](https://expressjs.com/)
- **Browser**: [React](https://reactjs.org/)
- **Powered By**: [Node.js](https://nodejs.org/)
- **Testing**: [Jest](https://jestjs.io/) (Unit Testing), [Supertest](https://github.com/visionmedia/supertest) (Integration Testing)
- **Linting**: [TSLint](https://palantir.github.io/tslint/)
- **Documentation**: [TypeDoc](https://typedoc.org/)

## Features

| Feature          | Technology                                                                 | Completion Status |
|------------------|-----------------------------------------------------------------------------|-------------------|
| 📦 **Storage**   | [IPFS](https://ipfs.tech/)                                                  | Not Started       |
| 🗄️ **Database**  | [OrbitDB](https://orbitdb.org/)                                             | Not Started       |
| 💬 **Messaging** | [GossipSub](https://docs.libp2p.io/concepts/publish-subscribe/)             | Not Started       |
| 🆔 **Identity**  | [DID](https://www.w3.org/TR/did-core/)                                      | Not Started       |
| 🔑 **Authentication** | [JWT](https://jwt.io/)                                                 | Not Started       |
| 🛡️ **Authorization** | [RBAC](https://en.wikipedia.org/wiki/Role-based_access_control)         | Not Started       |
| 🖥️ **Compute**   | [Bacalhau](https://www.bacalhau.org/)                                       | Not Started       |

## Overview

### Peers 

The system is designed to be decentralized. This means that there is no central server. Instead, the system is made up of multiple peers. Each peer is responsible for a specific service. This allows for easy scaling and redundancy.


### Uniform API Interface

The system is designed to have a uniform interface. This means that all services will have a consistent API. This allows for easy integration and scaling.

## Development

### Installation

```bash
git clone https://github.com/pocketminers/microdot.git
yarn install
```

### Testing

```bash
yarn test
```

### Linting

```bash
yarn lint
```

### Documentation

```bash
yarn docs
```

### Build

```bash
yarn build
```
