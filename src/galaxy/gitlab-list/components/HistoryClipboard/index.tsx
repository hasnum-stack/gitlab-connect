import { useHistoryClipboard } from '@/stores/history-clipboard';
import toClipboard from '@/utils/toClipboard';
import { Button, Flex } from 'antd';
import { Copy } from 'lucide-react';

function HistoryClipboard() {
  const clipboard = useHistoryClipboard(state => state.clipboard);
  const clear = useHistoryClipboard(state => state.clear);
  return (
    <div>
      {clipboard.map((item: string, index: number) => {
        return (
          <Flex key={`${item}`} align='center' justify='space-between' style={{ borderBottom: '1px solid #f0f0f0' }}>
            <div key={item}>{item}</div>
            <Button
              shape='circle'
              icon={<Copy size={12} />}
              onClick={() => {
                toClipboard(item);
              }}
            />
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
