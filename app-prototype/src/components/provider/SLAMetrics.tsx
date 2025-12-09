"use client";

import { AlertTriangle, CheckCircle, TrendingDown, TrendingUp, Award, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SLAMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  status: "good" | "warning" | "critical";
  description: string;
  guardrail: string;
}

// Mock SLA data based on framework
const mockSLAMetrics: SLAMetric[] = [
  {
    name: "Decline Rate",
    value: 12,
    target: 15,
    unit: "%",
    status: "good",
    description: "Monthly booking decline rate",
    guardrail: "Target < 15%. Warning at 15-20%, Low Priority >20%, Suspension >30%",
  },
  {
    name: "Cancellation Rate",
    value: 2.5,
    target: 3,
    unit: "%",
    status: "good",
    description: "Accepted bookings that were cancelled",
    guardrail: "Target < 3%. Auto fee 10-20% of booking value, Suspension after 5 cancellations",
  },
  {
    name: "No-Show Rate",
    value: 0,
    target: 1,
    unit: "per quarter",
    status: "good",
    description: "Provider no-shows",
    guardrail: "Target 0-1/quarter. Auto fee 50-100%, Immediate 48h suspension, 3 no-shows = deactivation",
  },
  {
    name: "Late Arrival Rate",
    value: 3,
    target: 5,
    unit: "%",
    status: "good",
    description: "Arrivals >15 minutes late",
    guardrail: "Target < 5%. Auto flag, affects ranking score",
  },
];

interface PPSBreakdown {
  reliability: number; // 40%
  customerRating: number; // 30%
  responsiveness: number; // 15%
  compliance: number; // 15%
  total: number;
  tier: "Gold" | "Standard" | "Low";
}

// Mock PPS data
const mockPPS: PPSBreakdown = {
  reliability: 38, // out of 40
  customerRating: 28, // out of 30
  responsiveness: 14, // out of 15
  compliance: 14, // out of 15
  total: 94, // out of 100
  tier: "Gold",
};

const getTierColor = (tier: PPSBreakdown["tier"]) => {
  switch (tier) {
    case "Gold":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Standard":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "Low":
      return "bg-red-100 text-red-800 border-red-300";
  }
};

const getTierBenefits = (tier: PPSBreakdown["tier"]) => {
  switch (tier) {
    case "Gold":
      return ["Priority access to peak hours", "Higher booking volume", "Featured in search"];
    case "Standard":
      return ["Standard access", "Regular booking flow"];
    case "Low":
      return ["Restricted access", "Coaching required", "Limited visibility"];
  }
};

const getStatusColor = (status: SLAMetric["status"]) => {
  switch (status) {
    case "good":
      return "text-green-600";
    case "warning":
      return "text-orange-600";
    case "critical":
      return "text-red-600";
  }
};

const getStatusIcon = (status: SLAMetric["status"]) => {
  switch (status) {
    case "good":
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-orange-600" />;
    case "critical":
      return <AlertCircle className="h-5 w-5 text-red-600" />;
  }
};

export default function SLAMetrics() {
  return (
    <div className="space-y-6">
      {/* Provider Performance Score */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Provider Performance Score (PPS)
              </CardTitle>
              <CardDescription>
                Your ranking score for search results and match quality
              </CardDescription>
            </div>
            <Badge className={`${getTierColor(mockPPS.tier)} border font-bold text-lg px-4 py-2`}>
              {mockPPS.tier} Tier
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Overall Score */}
          <div className="mb-6 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
                <p className="text-5xl font-bold text-primary">{mockPPS.total}</p>
                <p className="text-sm text-muted-foreground mt-1">out of 100</p>
              </div>
              <div className="text-right">
                {mockPPS.total >= 90 ? (
                  <TrendingUp className="h-12 w-12 text-green-500 mb-2" />
                ) : (
                  <TrendingDown className="h-12 w-12 text-orange-500 mb-2" />
                )}
                <p className="text-xs text-muted-foreground">
                  {mockPPS.total >= 90 ? "Excellent" : "Good"}
                </p>
              </div>
            </div>

            <Progress value={mockPPS.total} className="h-3 mb-4" />
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <TooltipProvider>
              <div className="space-y-3">
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div className="p-3 border rounded-lg text-left hover:border-primary transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Reliability (40%)</span>
                        <span className="text-sm font-bold">{mockPPS.reliability}/40</span>
                      </div>
                      <Progress value={(mockPPS.reliability / 40) * 100} className="h-2" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Based on cancellation rate, no-shows, and on-time arrivals
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div className="p-3 border rounded-lg text-left hover:border-primary transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Customer Rating (30%)</span>
                        <span className="text-sm font-bold">{mockPPS.customerRating}/30</span>
                      </div>
                      <Progress value={(mockPPS.customerRating / 30) * 100} className="h-2" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Average customer rating from completed bookings
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="space-y-3">
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div className="p-3 border rounded-lg text-left hover:border-primary transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Responsiveness (15%)</span>
                        <span className="text-sm font-bold">{mockPPS.responsiveness}/15</span>
                      </div>
                      <Progress value={(mockPPS.responsiveness / 15) * 100} className="h-2" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      How quickly you respond to booking requests
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div className="p-3 border rounded-lg text-left hover:border-primary transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Veyya Compliance (15%)</span>
                        <span className="text-sm font-bold">{mockPPS.compliance}/15</span>
                      </div>
                      <Progress value={(mockPPS.compliance / 15) * 100} className="h-2" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Adherence to platform policies and guidelines
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>

          {/* Tier Benefits */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Your {mockPPS.tier} Tier Benefits
            </h4>
            <ul className="space-y-1">
              {getTierBenefits(mockPPS.tier).map((benefit, idx) => (
                <li key={idx} className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* SLA Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            SLA Performance Metrics
          </CardTitle>
          <CardDescription>
            Key performance indicators and guardrails (Last 30 days)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSLAMetrics.map((metric, idx) => (
              <TooltipProvider key={idx}>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(metric.status)}
                          <div className="text-left">
                            <h4 className="font-semibold">{metric.name}</h4>
                            <p className="text-xs text-muted-foreground">{metric.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                            {metric.value}
                            {metric.unit}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Target: {metric.unit === "%" ? "<" : "≤"} {metric.target}
                            {metric.unit}
                          </p>
                        </div>
                      </div>
                      <Progress
                        value={metric.unit === "%" ? metric.value : (metric.value / metric.target) * 100}
                        className="h-2"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs font-semibold mb-1">Guardrail Policy:</p>
                    <p className="text-xs">{metric.guardrail}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Summary Note */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 mb-1">
                  All SLA Targets Met!
                </p>
                <p className="text-sm text-green-800">
                  You're meeting all performance targets. Keep up the excellent work to maintain your Gold Tier status and maximize your earnings.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
