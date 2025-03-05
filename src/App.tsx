import GitlabList from '@/galaxy/gitlab-list';
import { FloatButton } from 'antd';
const App = () => {
  return (
    <>
      <GitlabList />
      <FloatButton style={{ left: 30 }} />
    </>
  );
};
export default App;
