'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

import { chartColors } from '@/components/charts/chartjs-config';
import '@/components/charts/chartjs-config';
import {
  Chart, DoughnutController, ArcElement, TimeScale, Tooltip,
} from 'chart.js';
import type { ChartData } from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import { tailwindConfig } from '@/components/utils/utils';

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);
Chart.overrides.doughnut.cutout = '65%';

interface DoughnutProps {
  data: ChartData<'doughnut'>;
  width: number;
  height: number;
}

export default function DoughnutChart({
  data,
  width,
  height,
}: DoughnutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null); // Track chart instance
  const { theme } = useTheme();
  const darkMode = theme === 'dark';
  const { tooltipTitleColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      // Destroy existing chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart instance
      chartRef.current = new Chart(canvas, {
        type: 'doughnut',
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => tooltipItems[0]?.label || '',
                label: (tooltipItem) => `${tooltipItem.raw}`,
              },
              backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
              borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
              borderWidth: 1,
              titleColor: darkMode ? tooltipTitleColor.dark : tooltipTitleColor.light,
              bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            },
          },
        },
      });
    }

    // Cleanup: Destroy chart instance on unmount or re-render
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, darkMode, tooltipBgColor, tooltipBorderColor, tooltipTitleColor, tooltipBodyColor]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      <ul className="chart-legend"></ul>
    </div>
  );
}
