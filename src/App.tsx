import GitlabList from '@/galaxy/gitlab-list';
import RightClickMenu from '@/components/RightClickMenu';
import CopyListener from '@/components/CopyListener';
const App = () => {
  return (
    <>
      <GitlabList />
      <RightClickMenu />
      <CopyListener />
    </>
  );
};
export default App;
