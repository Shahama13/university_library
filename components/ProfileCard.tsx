import { Image, ImageKitProvider } from "@imagekit/next";
import { CheckCircle } from "lucide-react";
import config from "@/lib/config";

interface Props {
    fullName: string;
    email: string;
    universityId: number;
    universityCard: string; // ImageKit path, not a full URL
}

const ProfileCard = ({ fullName, email, universityId, universityCard }: Props) => {
    const initials = fullName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="flex w-full flex-col gap-6 rounded-2xl bg-dark-300 p-6 xl:w-96 xl:shrink-0 relative">
            <div className="mx-auto h-10 w-7 rounded-b-full rounded-t-sm bg-dark-500 absolute top-0" />

            <div className="flex items-center gap-4 mt-10">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-dark-500 text-lg font-semibold text-primary">
                    {initials}
                </div>

                <div className="flex flex-col gap-1">
                    <span className="flex w-fit items-center gap-1 rounded-full bg-dark-500 px-2 py-0.5 text-xs font-medium text-primary">
                        <CheckCircle className="size-3" />
                        Verified Student
                    </span>
                    <p className="text-lg font-semibold text-white">{fullName}</p>
                    <p className="text-sm text-light-100">{email}</p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-sm text-light-500">Student ID</p>
                <p className="font-semibold text-white">{universityId}</p>
            </div>

            <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl">
                <ImageKitProvider urlEndpoint={config.env.imagekit.urlEndpoint}>
                    <Image
                        src={universityCard}
                        alt="University ID card"
                        fill
                        sizes="(min-width: 1280px) 320px, 100vw"
                        loading="lazy"
                        className="object-cover"
                    />
                </ImageKitProvider>
            </div>
        </div>
    );
};

export default ProfileCard;