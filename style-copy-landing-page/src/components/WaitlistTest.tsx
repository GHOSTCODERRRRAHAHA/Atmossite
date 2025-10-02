import { useState, useEffect } from 'react';
import { WaitlistForm } from './WaitlistForm';
import { WaitlistCount } from './WaitlistCount';
import { getWaitlistCount, getWaitlistStats } from '@/lib/waitlistService';

export function WaitlistTest() {
  const [count, setCount] = useState<number | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [countData, statsData] = await Promise.all([
          getWaitlistCount(),
          getWaitlistStats()
        ]);
        setCount(countData);
        setStats(statsData);
        console.log('Waitlist data loaded:', { count: countData, stats: statsData });
      } catch (error) {
        console.error('Error loading waitlist data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Waitlist Test</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Current Status</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-2">
            <p><strong>Count:</strong> {count}</p>
            <p><strong>Total:</strong> {stats?.total_count}</p>
            <p><strong>Recent (24h):</strong> {stats?.recent_count}</p>
            <p><strong>Growth Rate:</strong> {stats?.growth_rate}%</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Waitlist Count Component</h3>
        <WaitlistCount showDetails={true} />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Waitlist Form</h3>
        <WaitlistForm source="test" />
      </div>

      <div className="text-sm text-gray-500">
        <p>This is a test component to verify the waitlist functionality is working.</p>
        <p>Check the browser console for any errors.</p>
      </div>
    </div>
  );
}
