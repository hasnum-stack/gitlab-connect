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

interface HistoryClipboardState {
  clipboard: string[];
  push: (clipboard: string) => void;
  clear: () => void;
  setClipboard: (clipboard: HistoryClipboardState['clipboard']) => void;
}

const useHistoryClipboard = create<HistoryClipboardState>()(set => ({
  clipboard: [],
  push: (clipboard: string) => {
    set(state => ({ clipboard: [...state.clipboard, clipboard] }));
  },
  clear: () => set({ clipboard: [] }),
  setClipboard: (clipboard: HistoryClipboardState['clipboard']) => set({ clipboard }),
}));

export { useGitlabListStore, useGitlabListSelectState, useHistoryClipboard };
