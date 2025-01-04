// connect/page.tsx
import WalletConnection from '@/components/WalletConnection';
import Head from "next/head";

export default function ConnectPage() {
  return (
    <>
      <Head>
        <title>Connect Wallet - ToknWrks</title>
        <meta name="description" content="Page description" />
      </Head>
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="pb-12 text-center">
              <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                Connect your wallet
              </h1>
            </div>
            {/* Wallet Connection */}
            <div className="mx-auto max-w-[400px]">
              <WalletConnection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}