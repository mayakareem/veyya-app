import Container from "@/components/layout/Container";
import ProviderHeader from "@/components/layout/ProviderHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Gift,
  Users,
  DollarSign,
  Share2,
  CheckCircle2,
  Trophy,
  TrendingUp,
  Copy
} from "lucide-react";

export default function ProviderReferralsPage() {
  return (
    <>
      <ProviderHeader />
      <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        {/* Hero Section */}
        <section className="border-b">
          <Container className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Gift className="w-4 h-4" />
                Provider Referral Program
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Grow Your Network, Earn Rewards
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Invite other service providers to join Veyya and earn rewards for each successful referral
              </p>

              {/* Referral Stats */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-background border rounded-xl p-6">
                  <DollarSign className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">฿2,500+</div>
                  <p className="text-sm text-muted-foreground">
                    Potential earnings per referral
                  </p>
                </div>
                <div className="bg-background border rounded-xl p-6">
                  <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">Unlimited</div>
                  <p className="text-sm text-muted-foreground">
                    Number of providers you can refer
                  </p>
                </div>
                <div className="bg-background border rounded-xl p-6">
                  <Trophy className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">Bonus</div>
                  <p className="text-sm text-muted-foreground">
                    Top referrers get exclusive rewards
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section>
          <Container className="py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How the Referral Program Works</h2>
                <p className="text-lg text-muted-foreground">
                  Three simple steps to start earning
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl mb-4 mx-auto">
                    1
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Share Your Link</h3>
                  <p className="text-sm text-muted-foreground">
                    Copy your unique referral link and share it with service providers you know
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl mb-4 mx-auto">
                    2
                  </div>
                  <h3 className="font-semibold text-lg mb-2">They Sign Up</h3>
                  <p className="text-sm text-muted-foreground">
                    When they join using your link and complete onboarding, you both get rewarded
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-2xl mb-4 mx-auto">
                    3
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Earn Rewards</h3>
                  <p className="text-sm text-muted-foreground">
                    Get bonus payments at key milestones and track all your referrals
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Reward Structure */}
        <section className="bg-muted/30">
          <Container className="py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Referral Rewards</h2>
                <p className="text-lg text-muted-foreground">
                  Earn at every milestone of your referral's journey
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-background border rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">Onboarding Complete</h3>
                      <span className="text-2xl font-bold text-primary">฿500</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Earn ฿500 when your referral completes the provider onboarding process and gets approved
                    </p>
                  </div>
                </div>

                <div className="bg-background border rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">First Booking Completed</h3>
                      <span className="text-2xl font-bold text-primary">฿1,000</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Earn ฿1,000 when your referral successfully completes their first booking on the platform
                    </p>
                  </div>
                </div>

                <div className="bg-background border rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">Top Referrer Bonuses</h3>
                      <span className="text-2xl font-bold text-primary">฿5,000+</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Monthly bonuses for top referrers: ฿5,000 for 1st place, ฿3,000 for 2nd, ฿2,000 for 3rd
                    </p>
                  </div>
                </div>

                <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">Referral Welcome Bonus</h3>
                      <span className="text-2xl font-bold text-primary">฿500</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your referral also gets ฿500 credit towards their first booking when they sign up!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Your Referral Link */}
        <section>
          <Container className="py-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                  Your Unique Referral Link
                </h2>
                <p className="text-center mb-6 text-primary-foreground/90">
                  Share this link with other service providers to start earning
                </p>

                <div className="bg-background/10 backdrop-blur rounded-lg p-4 flex items-center gap-3">
                  <Input
                    value="https://veyya.com/providers?ref=YOURCODE"
                    readOnly
                    className="bg-background text-foreground flex-1"
                  />
                  <Button variant="secondary" className="gap-2">
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share via WhatsApp
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share via Facebook
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share via Email
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Referral Stats Dashboard */}
        <section className="bg-muted/30">
          <Container className="py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Your Referral Dashboard</h2>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Total Referrals</p>
                  <p className="text-3xl font-bold">0</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Active Providers</p>
                  <p className="text-3xl font-bold">0</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Total Earned</p>
                  <p className="text-3xl font-bold text-primary">฿0</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Pending</p>
                  <p className="text-3xl font-bold text-muted-foreground">฿0</p>
                </Card>
              </div>

              <div className="bg-background border rounded-xl p-8 text-center">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Referrals Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start sharing your referral link to see your stats here
                </p>
                <Button>Copy Referral Link</Button>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section>
          <Container className="py-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Who can I refer?</h3>
                  <p className="text-muted-foreground">
                    You can refer any professional service provider in beauty, wellness, fitness, pet care, or cleaning services who would like to join Veyya's platform.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">When do I get paid?</h3>
                  <p className="text-muted-foreground">
                    Referral bonuses are added to your weekly payout. The ฿500 onboarding bonus is paid within 48 hours of approval, and the ฿1,000 first booking bonus is paid after their booking is completed.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Is there a limit to referrals?</h3>
                  <p className="text-muted-foreground">
                    No limit! Refer as many providers as you like and earn rewards for each successful referral.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">What if my referral doesn't complete onboarding?</h3>
                  <p className="text-muted-foreground">
                    You'll only earn the bonus once your referral successfully completes the onboarding process and gets approved by Veyya.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
