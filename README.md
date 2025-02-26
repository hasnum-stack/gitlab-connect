# GitLab Connect 🚀

## Introduction 📖

GitLab Connect is a tool designed to streamline the process of managing merge requests and other GitLab operations directly from your application. It provides an intuitive interface and seamless integration with GitLab's API.

## Features ✨

- Simultaneously manage multiple repositories 📂
- Standardize versioning processes across projects 📊
- Create and manage merge requests 🔀
- Preview merge requests 👀

## Setup 🛠️

### Prerequisites 📋

- Node.js (v18 or higher)
- pnpm (v9 or higher)

### Installation 📦

Clone the repository and install the dependencies:

```bash
git clone
pnpm i
```

### Configuration ⚙️

Create a .env.local file in the root directory and add your GitLab credentials and configuration:

```bash
PUBLIC_SERVICE_TOKEN=your_gitlab_token
PUBLIC_SERVICE_BASEURL=/api/v4
PUBLIC_SERVICE_TARGET=http://your_gitlab_instance
PUBLIC_PROJECT_USERNAME=your_username
```

### Get Started 🚀
Start the development server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

## Support 👍

If you like this project, please give it a star on GitHub!
