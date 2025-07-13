"use client"

import { Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MESSENGER_URL, LINE_URL } from "@/config/mock";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <Link href={MESSENGER_URL} target="_blank" rel="noopener noreferrer">
        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
          <Facebook className="text-white w-6 h-6" />
        </span>
      </Link>
      <Link href={LINE_URL} target="_blank" rel="noopener noreferrer">
        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
          <Image src="/placeholder-logo.png" alt="LINE" width={24} height={24} />
        </span>
      </Link>
    </div>
  );
}
