import React from "react";
import './globals.css';
import { BottomBar, Navbar } from "@/components";
import { GameDataProvider } from "@/context/GameDataProvider";
import { Providers } from "@/context/Providers";
import { Metadata } from "next";
import { cookies } from "next/headers";
import '@rainbow-me/rainbowkit/styles.css'

export const metadata: Metadata = {
  title: 'Swipe Win',
}

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  const cookieStore = cookies()
 
  const initialChainId = cookieStore.get('appChainId')?.value
  const initialLiveState = JSON.parse(cookieStore.get('live')?.value || 'false')

  return (
    <html lang="en">
      <body className="bg-bg text-text font-noto flex flex-col">
            <Providers initialChainId={initialChainId} initialLiveState={initialLiveState}>
              <GameDataProvider>
                <Navbar />
                  <main className="container flex-1 fixed h-full flex-grow">
                    {children}
                  </main>
                <BottomBar />
              </GameDataProvider>
            </Providers>
      </body>
    </html>
  );
}
