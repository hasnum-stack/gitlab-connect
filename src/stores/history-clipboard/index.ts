import { create } from 'zustand/index';

interface HistoryClipboardState {
  clipboard: string[];
  push: (clipboard: string) => void;
  clear: () => void;
  setClipboard: (clipboard: HistoryClipboardState['clipboard']) => void;
}

const useHistoryClipboard = create<HistoryClipboardState>()(set => ({
  clipboard: [],
  push: (value: string) => {
    if (!value) return;
    set(state => {
      const clipboard = state.clipboard;

      // 查看是否已经存在
      if (state.clipboard.includes(value)) {
        //删除已经存在的
        clipboard.splice(clipboard.indexOf(value), 1);
      }
      clipboard.unshift(value);
      return { clipboard: [...clipboard] };
    });
  },
  clear: () => set({ clipboard: [] }),
  setClipboard: (clipboard: HistoryClipboardState['clipboard']) => set({ clipboard }),
}));

export { useHistoryClipboard };
