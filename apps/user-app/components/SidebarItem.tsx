"use client";

import { usePathname, useRouter } from "next/navigation";

export function SideBarItem({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;
  return (
    <div
      className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer gap-3  p-2 pl-8`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="text-gray-400 text-md ">{icon}</div>
      <div
        className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}
      >
        {title}
      </div>{" "}
    </div>
  );
}
