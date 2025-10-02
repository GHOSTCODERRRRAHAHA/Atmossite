import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { CheckCircle, Loader2, Sparkles } from "lucide-react";

interface SimpleWaitlistFormProps {
  className?: string;
  source?: string;
  showSuccessMessage?: boolean;
  compact?: boolean;
}

export function SimpleWaitlistForm({ 
  className = '', 
  source = 'website',
  showSuccessMessage = true,
  compact = false 
}: SimpleWaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Direct insert to Supabase
      const { data, error } = await supabase
        .from('waitlist')
        .insert({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          source: source,
          status: 'active'
        })
        .select()
        .single();

      if (error) {
        // Handle duplicate email
        if (error.code === '23505') {
          toast.error("This email is already on our waitlist!");
          return;
        }
        throw error;
      }

      // Success
      setIsSuccess(true);
      setName('');
      setEmail('');
      
      if (showSuccessMessage) {
        toast.success("Welcome to the future! You're now on the waitlist.", {
          description: "We'll notify you when Atmos Halo is ready.",
          duration: 5000,
        });
      }
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
      
    } catch (error: any) {
      console.error('Waitlist submission error:', error);
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && showSuccessMessage) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">You're in!</h3>
        <p className="text-gray-600 mb-4">
          Thanks for joining the waitlist. We'll be in touch soon!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      <div className="space-y-3">
        <div>
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
              compact ? 'h-10 px-3 text-sm' : 'h-12 px-4 text-base'
            }`}
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
              compact ? 'h-10 px-3 text-sm' : 'h-12 px-4 text-base'
            }`}
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className={`w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
          compact ? 'h-10 text-sm' : 'h-12 text-base'
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Joining...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Join the waitlist</span>
          </div>
        )}
      </Button>
    </form>
  );
}

// Compact version for smaller spaces
export function SimpleWaitlistFormCompact({ className = '', source = 'website' }: SimpleWaitlistFormProps) {
  return (
    <SimpleWaitlistForm 
      className={className}
      source={source}
      compact={true}
      showSuccessMessage={false}
    />
  );
}
