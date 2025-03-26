import type { ProjectInfo, BranchFormValues, BranchSelectOptions } from '@/galaxy/gitlab-list/types';
import create from '@/utils/createFetchUrl';
import service from '@/utils/service';
import type React from 'react';

function getProjectsService(params?: any) {
  return service.get(create().projects().finish(), {
    params,
  });
}
// 获取项目详情
function getProjectService(id: string) {
  return service.get<ProjectInfo>(create().projects().setProjectId(id).finish(), {});
}

// 创建项目分支
function createProjectBranchService(id: React.Key, data: BranchFormValues) {
  return service.post<undefined, BranchFormValues>(
    create().projects().setProjectId(id).repository().branches().finish(),
    data,
  );
}

// 保护项目分支
function protectedProjectBranchService(id: React.Key, data: { name: string }) {
  return service.post(create().projects().setProjectId(id).protectedBranches().finish(), data);
}
// 删除项目分支
function deleteProjectBranchService(id: React.Key, branch: string) {
  const encodedBranch = encodeURIComponent(branch);
  return service.delete(create().projects().setProjectId(id).repository().branches().setBranch(encodedBranch).finish());
}
// 创建项目合并请求
function createProjectMergeRequestsService(id: React.Key, data: any) {
  return service.post(create().projects().setProjectId(id).mergeRequests().finish(), data);
}
// 根据项目查询分支
function getProjectBranchesService(id: React.Key, params?: any) {
  return service.get<BranchSelectOptions>(create().projects().setProjectId(id).repository().branches().finish(), {
    params,
  });
}

export {
  getProjectsService,
  getProjectService,
  createProjectBranchService,
  protectedProjectBranchService,
  deleteProjectBranchService,
  createProjectMergeRequestsService,
  getProjectBranchesService,
};
