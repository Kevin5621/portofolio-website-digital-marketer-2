import Navbar from '@/components/navbar';
import Binjasiimen from '@/components/project-detail/5-binjasiimen-samapta';

export default function BinjasiimenPage() {
  return (
    <main className="min-h-screen">
      <Navbar variant="dark" />
      <Binjasiimen />
    </main>
  );
}