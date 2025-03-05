import type React from 'react';

function create() {
  const url: string[] = [''];
  const factory = {
    projects: () => {
      url.push('projects');
      return factory;
    },
    project: () => {
      url.push('project');
      return factory;
    },
    setProjectId: (id: React.Key) => {
      url.push(id.toString());
      return factory;
    },
    repository: () => {
      url.push('repository');
      return factory;
    },
    branches: () => {
      url.push('branches');
      return factory;
    },
    setBranch: (branch: string) => {
      url.push(branch);
      return factory;
    },
    mergeRequests: () => {
      url.push('merge_requests');
      return factory;
    },
    protectedBranches: () => {
      url.push('protected_branches');
      return factory;
    },
    finish: () => {
      return url.join('/');
    },
  };
  return factory;
}
export default create;
