"use client";
import { useState } from "react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Check, Gift, Users, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);

  // Generate a unique referral code (in production, this would come from the user's profile)
  const referralCode = "VEYYA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const referralLink = `https://veyya.com/signup?ref=${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Veyya",
          text: "Book trusted home services with Veyya! Use my referral code for exclusive rewards.",
          url: referralLink,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      toast.info("Sharing not supported on this device");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-muted/20 to-background">
      <Container className="py-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Refer & Earn Rewards</h1>
          <p className="text-lg text-muted-foreground">
            Share Veyya with your friends and family. Everyone wins when they book their first service!
          </p>
        </div>

        {/* Referral Code Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white border-2 border-primary/20 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Your Unique Referral Code</p>
              <p className="text-3xl font-bold text-primary tracking-wider">{referralCode}</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-mono break-all">{referralLink}</p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleCopy} className="flex-1 gap-2" variant={copied ? "default" : "outline"}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </Button>
              <Button onClick={handleShare} className="flex-1 gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold mb-2">Share Your Code</h3>
              <p className="text-sm text-muted-foreground">
                Send your unique referral link to friends via WhatsApp, email, or social media
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold mb-2">They Sign Up</h3>
              <p className="text-sm text-muted-foreground">
                Your friend creates an account and books their first service using your code
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold mb-2">You Both Earn</h3>
              <p className="text-sm text-muted-foreground">
                Get ฿500 credit when they complete their booking. They get ฿300 off their first service!
              </p>
            </div>
          </div>
        </div>

        {/* Rewards Summary */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-2">Total Referrals</h3>
              <p className="text-3xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground mt-1">Friends who signed up</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
              <DollarSign className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Total Earned</h3>
              <p className="text-3xl font-bold text-green-600">฿0</p>
              <p className="text-sm text-muted-foreground mt-1">Rewards credited to your account</p>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Program Terms</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Referral bonus is credited after your friend completes their first booking</li>
              <li>• Your friend must be a new user who has never booked on Veyya before</li>
              <li>• Credits are valid for 12 months from the date of issue</li>
              <li>• Credits can be used towards any service on the platform</li>
              <li>• There's no limit to how many friends you can refer!</li>
            </ul>
          </div>
        </div>
      </Container>
    </main>
  );
}
