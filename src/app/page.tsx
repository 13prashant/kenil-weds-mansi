"use client";

import CalendarButton, {
  GOOGLE_MAP_URL,
  LOCATION,
} from "@/components/CalendarButton";
import ShootingStars from "@/components/ShootingStars";
import StarsBackground from "@/components/StarsBackground";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import Confetti from "react-confetti";

export default function Page() {
  const { windowSize } = useWindowSize();

  return (
    <main className="desktop-bg h-screen grid place-items-center">
      <Confetti
        className="w-full h-full"
        recycle={false}
        width={windowSize.width}
        height={windowSize.height}
      />
      <section className="relative container max-w-lg mx-auto pl-12 bg-background h-screen max-h-[58rem] flex items-center pattern">
        <Image
          className="absolute top-0 right-0"
          src="/decor-tr.svg"
          width={200}
          height={200}
          alt="Decor"
        />
        <Image
          className="absolute bottom-0 left-0"
          src="/decor-bl.svg"
          width={200}
          height={200}
          alt="Decor"
        />

        <div className="relative z-50">
          <strong className="text-sm underline decoration-wavy decoration-secondary tracking-wider">
            Wedding Invitation
          </strong>

          <div className="relative w-fit flex flex-col gap-3 text-secondary my-10">
            <h4 className="text-4xl font-semibold">Kenil</h4>
            <h1 className="text-9xl absolute -top-4 left-10 text-secondary/20">
              &
            </h1>
            <div className="relative">
              <h2 className="text-4xl ml-10 font-semibold">Mansi</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="currentColor"
                className="size-6 absolute -top-[10px] -right-[10px] rotate-[30deg]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
          </div>

          <div className="mb-3">
            <h4 className="text text-primary">Dinner</h4>
            <span className="text-xl font-bold text-black/70">
              16 Nov&apos;24 at 5 PM
            </span>
          </div>
          <div>
            <h4 className="text text-primary">Wedding Ceremony</h4>
            <span className="text-xl font-bold text-black/70">
              17 Nov&apos;24 at 6 PM
            </span>
          </div>

          <div className="mt-10 max-w-64">
            <p className="font-semibold mb-3 text-sm text-black/50">
              {LOCATION}
            </p>

            <div className="flex flex-col gap-3">
              <CalendarButton />
              <a
                href={GOOGLE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Open Location
              </a>
            </div>
          </div>
        </div>

        <ShootingStars />
        <StarsBackground />
      </section>
    </main>
  );
}
