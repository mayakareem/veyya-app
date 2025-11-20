"use client";

import { useState, useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Props = {
  categories: string[];
  className?: string;
};

export default function FilterDrawer({ categories, className }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get("maxPrice") ?? 300));
  const [minRating, setMinRating] = useState<number>(Number(searchParams.get("minRating") ?? 0));
  const [instant, setInstant] = useState<boolean>((searchParams.get("instant") ?? "0") === "1");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "rating-desc");

  const apply = () => {
    const params = new URLSearchParams(searchParams.toString());
    q ? params.set("q", q) : params.delete("q");
    category && category !== "all" ? params.set("category", category) : params.delete("category");
    params.set("maxPrice", String(maxPrice));
    minRating ? params.set("minRating", String(minRating)) : params.delete("minRating");
    params.set("instant", instant ? "1" : "0");
    sort ? params.set("sort", sort) : params.delete("sort");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const DesktopRail = useMemo(
    () => (
      <div className="hidden md:block sticky top-20 h-fit rounded-xl border p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm">Search</label>
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Providers or services..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm">Max price: ${maxPrice}</label>
          <Slider value={[maxPrice]} min={20} max={500} step={10} onValueChange={(v) => setMaxPrice(v[0])} />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Min rating: {minRating}+</label>
          <Slider value={[minRating]} min={0} max={5} step={0.5} onValueChange={(v) => setMinRating(v[0])} />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="instant" checked={instant} onCheckedChange={(v) => setInstant(Boolean(v))} />
          <label htmlFor="instant" className="text-sm">Instant book</label>
        </div>
        <div className="space-y-2">
          <label className="text-sm">Sort</label>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">Top rated</SelectItem>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
              <SelectItem value="soonest">Soonest slot</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={apply} disabled={isPending} className="w-full">Apply</Button>
      </div>
    ),
    [q, category, maxPrice, minRating, instant, sort, isPending, categories],
  );

  return (
    <div className={className}>
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild><Button variant="outline">Filters</Button></SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] overflow-auto">
            <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
            <div className="mt-4 space-y-4">{DesktopRail}</div>
          </SheetContent>
        </Sheet>
      </div>
      {DesktopRail}
    </div>
  );
}
