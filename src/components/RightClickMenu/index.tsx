import { useHistoryClipboard } from '@/stores/history-clipboard';
import toClipboard from '@/utils/toClipboard';
import { Dropdown } from 'antd';
import { useEffect, useState } from 'react';

const RightClickMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const clipboard = useHistoryClipboard(state => state.clipboard);

  useEffect(() => {
    // 监听右键点击事件
    const handleRightClick = e => {
      e.preventDefault(); // 阻止默认右键菜单
      setMenuPosition({ x: e.clientX, y: e.clientY }); // 设置菜单位置
      setMenuVisible(true);
    };

    // 监听全局鼠标点击事件，关闭菜单
    const handleClick = () => {
      setMenuVisible(false);
    };

    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // 右键菜单
  const menu = {
    items: clipboard.map(item => {
      return {
        key: item,
        label: item,
      };
    }),
    onClick: ({ key }: { key: string }) => {
      toClipboard(key);
      setMenuVisible(false);
    },
  };
  return (
    <>
      {menuVisible && (
        <Dropdown menu={menu} open={menuVisible} trigger={['contextMenu']} placement='bottomLeft'>
          <div
            style={{
              position: 'absolute',
              top: menuPosition.y,
              left: menuPosition.x,
              width: 0,
              height: 0,
            }}
          />
        </Dropdown>
      )}
    </>
  );
};

export default RightClickMenu;
