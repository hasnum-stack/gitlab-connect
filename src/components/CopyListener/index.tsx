import { useEffect } from 'react';
import { formSystemClipboardToHistoryClipboard } from '@/utils/toClipboard';

const CopyListener = () => {
  useEffect(() => {
    const handleCopy = () => {
      formSystemClipboardToHistoryClipboard();
    };

    // 监听复制事件
    document.addEventListener('copy', handleCopy);
    // 清理事件监听器
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return null;
};

export default CopyListener;
