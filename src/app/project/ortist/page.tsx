import Navbar from '@/components/navbar';
import Ortist from '@/components/project-detail/2-ortist';

export default function OrtistPage() {
  return (
    <main className="min-h-screen">
      <Navbar variant="dark" />
      <Ortist />
    </main>
  );
}