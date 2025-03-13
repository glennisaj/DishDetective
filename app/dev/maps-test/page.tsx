// app/dev/maps-test/page.tsx
import MapsApiTest from '@/components/maps-api-test';

export const metadata = {
  title: 'Maps API Test | DishDetective',
  description: 'Test the Google Maps API integration'
};

export default function MapsTestPage() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-6">Google Maps API Test</h1>
      <MapsApiTest />
    </div>
  );
}