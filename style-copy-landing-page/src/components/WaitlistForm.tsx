import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addToWaitlist, checkRateLimit, waitlistSchema, type WaitlistFormData } from "@/lib/supabaseWaitlistService";
import { CheckCircle, Loader2, Users, Sparkles } from "lucide-react";

interface WaitlistFormProps {
  className?: string;
  source?: string;
  showSuccessMessage?: boolean;
  compact?: boolean;
}

export function WaitlistForm({ 
  className = '', 
  source = 'website',
  showSuccessMessage = true,
  compact = false 
}: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const email = watch('email');

  const onSubmit = async (data: WaitlistFormData) => {
    // Rate limiting check
    const rateLimitKey = `waitlist-${email || 'anonymous'}`;
    const rateLimit = checkRateLimit(rateLimitKey);
    
    if (!rateLimit.allowed) {
      const resetTime = rateLimit.resetTime;
      const minutesLeft = resetTime ? Math.ceil((resetTime - Date.now()) / 60000) : 15;
      toast.error(`Too many attempts. Please wait ${minutesLeft} minutes before trying again.`);
      return;
    }

    try {
      setIsSubmitting(true);
      
      await addToWaitlist({
        ...data,
        source,
        referrer: document.referrer || undefined,
      });
      
      setIsSuccess(true);
      reset();
      
      if (showSuccessMessage) {
        toast.success("Welcome to the future! You're now on the waitlist.", {
          description: "We'll notify you when Atmos Halo is ready.",
          duration: 5000,
        });
      }
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
      
    } catch (error) {
      console.error('Waitlist submission error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('already registered')) {
          toast.error("This email is already on our waitlist!");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("Failed to join waitlist. Please try again.");
      }
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
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>Join thousands of others waiting for Atmos Halo</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      {/* Honeypot field for bot protection */}
      <input 
        type="text" 
        name="website" 
        tabIndex={-1} 
        autoComplete="off" 
        className="hidden" 
        aria-hidden="true" 
      />
      
      <div className="space-y-3">
        <div>
          <Input
            {...register("name")}
            placeholder="Your name"
            className={`w-full border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
              compact ? 'h-10 px-3 text-sm' : 'h-12 px-4 text-base'
            }`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Your email address"
            className={`w-full border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
              compact ? 'h-10 px-3 text-sm' : 'h-12 px-4 text-base'
            }`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
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
export function WaitlistFormCompact({ className = '', source = 'website' }: WaitlistFormProps) {
  return (
    <WaitlistForm 
      className={className}
      source={source}
      compact={true}
      showSuccessMessage={false}
    />
  );
}