import { create } from 'zustand';
import type { ProjectInfo } from '../types';

// gitlab信息集合
interface GitlabListState {
  gitlabList: ProjectInfo[];
  setGitlabList: (gitlabList: ProjectInfo[]) => void;
}

const getDefaultGitlabList = () => {
  const gitlabInfo = localStorage.getItem('gitlabInfo');
  return gitlabInfo ? JSON.parse(gitlabInfo) : [];
};

const useGitlabListStore = create<GitlabListState>()(set => ({
  gitlabList: getDefaultGitlabList(),
  setGitlabList: list => {
    set({ gitlabList: list });
  },
}));

// gitlab列表选择
interface GitlabListSelectState {
  selected: ProjectInfo[];
  setSelected: (selected: ProjectInfo[]) => void;
}

const useGitlabListSelectState = create<GitlabListSelectState>()(set => ({
  selected: [],
  setSelected: selected => set({ selected }),
}));

export { useGitlabListStore, useGitlabListSelectState };
