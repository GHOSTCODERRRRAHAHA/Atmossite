import { useState, useEffect } from 'react';
import { getWaitlistCount } from '@/lib/waitlistService';
import { Users, TrendingUp, Clock } from 'lucide-react';

interface WaitlistCountProps {
  className?: string;
  showDetails?: boolean;
}

export function WaitlistCount({ className = '', showDetails = false }: WaitlistCountProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setIsLoading(true);
        const waitlistCount = await getWaitlistCount();
        setCount(waitlistCount);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch waitlist count:', err);
        setError('Failed to load count');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();

    // Refresh count every 30 seconds
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 text-gray-600 ${className}`}>
        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (error || count === null) {
    return (
      <div className={`flex items-center space-x-2 text-gray-500 ${className}`}>
        <Users className="w-4 h-4" />
        <span className="text-sm">Join the waitlist</span>
      </div>
    );
  }

  const formatCount = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Users className="w-4 h-4 text-purple-600" />
      <div className="flex items-center space-x-1">
        <span className="font-semibold text-gray-900">{formatCount(count)}</span>
        <span className="text-sm text-gray-600">people waiting</span>
      </div>
      
      {showDetails && (
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <TrendingUp className="w-3 h-3" />
          <span>Growing daily</span>
        </div>
      )}
    </div>
  );
}

// Compact version for smaller spaces
export function WaitlistCountCompact({ className = '' }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const waitlistCount = await getWaitlistCount();
        setCount(waitlistCount);
      } catch (err) {
        console.error('Failed to fetch waitlist count:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (isLoading || count === null) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        Join the waitlist
      </div>
    );
  }

  return (
    <div className={`text-sm text-gray-600 ${className}`}>
      <span className="font-semibold">{count.toLocaleString()}</span> people waiting
    </div>
  );
}
