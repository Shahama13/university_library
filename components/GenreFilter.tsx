"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    genres: string[];
}

const GenreFilter = ({ genres }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentGenre = searchParams.get("genre") ?? "all";

    const handleChange = (value: string | null) => {
        if (value === null) return;

        const params = new URLSearchParams(searchParams.toString());

        if (value === "all") {
            params.delete("genre");
        } else {
            params.set("genre", value);
        }
        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Select value={currentGenre} onValueChange={handleChange}>
            <SelectTrigger className="select-trigger">
                <SelectValue placeholder="Filter by: Department" />
            </SelectTrigger>
            <SelectContent className="select-content">
                <SelectItem className="select-item" value="all">
                    All Departments
                </SelectItem>
                {genres.map((genre) => (
                    <SelectItem className="select-item" key={genre} value={genre}>
                        {genre}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default GenreFilter;