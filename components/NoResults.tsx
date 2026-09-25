"use client"
import { File, X } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const NoResults = () => {
    const router = useRouter()
    return (
        <div id="not-found">
            <div className="relative flex size-40 items-center justify-center rounded-full bg-dark-500">
                <div className="relative">
                    <File className="size-16 text-light-400" strokeWidth={1.5} />
                    <div className="absolute -right-3 top-0 flex size-9 items-center justify-center rounded-full bg-primary">
                        <X className="size-4 text-dark-100" strokeWidth={3} />
                    </div>
                </div>
            </div>

            <h4>No Results Found</h4>
            <p>
                We couldn&apos;t find any books matching your search. Try using
                different keywords or check for typos.
            </p>

            <Button className="mt-10 w-60 p-3" onClick={() => { void router.replace("/search"); }}>
                Clear Search
            </Button>
        </div>
    );
};

export default NoResults;