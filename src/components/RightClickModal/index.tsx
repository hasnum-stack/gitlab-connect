import HistoryClipboard from '@/galaxy/gitlab-list/components/HistoryClipboard';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
function RightClickModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 监听全局鼠标点击事件，关闭菜单
    const handleRightClick = e => {
      e.preventDefault(); // 阻止默认右键菜单

      setOpen(true);
    };

    document.addEventListener('contextmenu', handleRightClick);
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
    };
  }, []);

  return (
    <>
      <Modal title={'history control'} open={open} onCancel={() => setOpen(false)} zIndex={1001}>
        <HistoryClipboard />
      </Modal>
    </>
  );
}
export default RightClickModal;
