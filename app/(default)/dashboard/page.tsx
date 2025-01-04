"use client"
  

  import Timeline from "@/components/dashboard-timeline";
  import Dashboard from '@/components/dashboard';
  import { useState, useEffect } from "react";
  
  export default function About() {
    const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

    useEffect(() => {
      // Load the connected address from localStorage when the component mounts
      const storedKeplrAddress = localStorage.getItem("keplrAddress");
      const storedLeapAddress = localStorage.getItem("leapAddress");
      if (storedKeplrAddress) {
        setConnectedAddress(storedKeplrAddress);
      } else if (storedLeapAddress) {
        setConnectedAddress(storedLeapAddress);
      }
    }, []);

    return (
      <>
        <div>
          <Dashboard connectedAddress={connectedAddress} />
        </div>
        <Timeline />
        <div>
          {/* Other components can go here */}
        </div>
      </>
    );
  }