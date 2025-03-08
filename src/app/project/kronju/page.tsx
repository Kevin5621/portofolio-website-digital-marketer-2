import Navbar from '@/components/navbar';
import Kronju from '@/components/project-detail/1-kronju';

export default function KronjuPage() {
  return (
    <main className="min-h-screen">
      <Navbar variant="dark"/>
      <Kronju />
    </main>
  );
}