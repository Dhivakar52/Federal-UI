import Layout from '../Layout/Layout';
import { AdminInner } from '../components/Admin/AdminInner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const AdminPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <AdminInner />
      </Layout>
    </QueryClientProvider>
  );
};

export default AdminPage;
