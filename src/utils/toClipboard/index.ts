import { message } from '@/components/Message';
import { useHistoryClipboard } from '@/stores/history-clipboard';

function pushClipboard(value: string) {
  useHistoryClipboard.getState().push(value);
  message.success({
    key: 'copy',
    content: '复制成功',
  });
}

async function toClipboard(value: string) {
  await navigator.clipboard.writeText(value);
  pushClipboard(value);
}

//从系统剪切板复制到历史剪切板,onCopy回调
async function formSystemClipboardToHistoryClipboard() {
  const value = await navigator.clipboard.readText();
  pushClipboard(value);
}

export default toClipboard;
export { formSystemClipboardToHistoryClipboard };
