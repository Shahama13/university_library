"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";


const SortToggle = ({ type , displayText}: { type: string, displayText?: string }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isDesc = searchParams.get("sort") === `${type}-desc`;

    const toggle = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", isDesc ? `${type}-asc` : `${type}-desc`);
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Button
            type="button"
            onClick={toggle}
            className="gap-1.5 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100!"
        >
            <ArrowUpDown className="size-3.5" />
            {displayText? displayText: isDesc ? "Z-A" : "A-Z"}
          
        </Button>
    );
};

export default SortToggle;