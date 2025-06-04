import { useHistoryClipboard } from '@/stores/history-clipboard';
import toClipboard from '@/utils/toClipboard';
import { Button, Flex, Space } from 'antd';
import { Copy, X } from 'lucide-react';
import type React from 'react';
import { useRef } from 'react';

const useDrop = () => {
  const clipboard = useHistoryClipboard(state => state.clipboard);
  const setClipboard = useHistoryClipboard(state => state.setClipboard);
  const draggedItemRef = useRef<number | null>(null);
  const handleDragStart = (index: number) => {
    draggedItemRef.current = index;
  };
  const handleDrop = (index: number) => {
    const draggedIndex = draggedItemRef.current;
    if (draggedIndex !== null && draggedIndex !== index) {
      const updatedItems = [...clipboard];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(index, 0, draggedItem);
      setClipboard(updatedItems);
    }
    draggedItemRef.current = null;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return {
    createDragHandler: (index: number) => {
      return {
        onDragStart: () => handleDragStart(index),
        onDrop: () => handleDrop(index),
        onDragOver: handleDragOver,
        draggable: true,
      };
    },
  };
};

function HistoryClipboard() {
  const clipboard = useHistoryClipboard(state => state.clipboard);
  const clear = useHistoryClipboard(state => state.clear);
  const { createDragHandler } = useDrop();
  return (
    <div>
      {clipboard.map((item: string, index: number) => {
        return (
          <Flex
            key={`${item}`}
            align='center'
            justify='space-between'
            style={{ borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
            {...createDragHandler(index)}
          >
            <div key={item}>{item}</div>
            <Space>
              <Button
                shape='circle'
                icon={<Copy size={12} />}
                onClick={() => {
                  toClipboard(item);
                }}
              />
              <Button
                color='danger'
                shape='circle'
                icon={<X size={12} />}
                onClick={() => {
                  const _clipboard = [...clipboard];
                  _clipboard.splice(index, 1);
                  useHistoryClipboard.setState({
                    clipboard: _clipboard,
                  });
                }}
              />
            </Space>
          </Flex>
        );
      })}
      {clipboard.length > 0 ? (
        <Button
          onClick={() => {
            clear();
          }}
        >
          clear all
        </Button>
      ) : null}
    </div>
  );
}

export default HistoryClipboard;
