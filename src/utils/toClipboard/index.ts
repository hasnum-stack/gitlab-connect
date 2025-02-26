import { message } from '@/components/Message';
async function toClipboard(value: string) {
  await navigator.clipboard.writeText(value);
  message.success('复制成功');
}
export default toClipboard;
