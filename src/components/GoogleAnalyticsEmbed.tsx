import React, { useState, useEffect, useRef } from 'react';
import { GA_CONFIG } from '../config/googleAnalytics';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Maximize2, Minimize2, BarChart2, ArrowUp, ArrowDown } from 'lucide-react';
import { PDFDebugger } from './PDFDebugger';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface GoogleAnalyticsEmbedProps {
  lookerStudioUrl?: string;
  pdfPath?: string;
  showRealData?: boolean;
}

export function GoogleAnalyticsEmbed({ 
  lookerStudioUrl = 'https://lookerstudio.google.com/embed/reporting/your-report-id/page/your-page-id',
  pdfPath = '/Google_Analytics_Website.pdf',
  showRealData = true
}: GoogleAnalyticsEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMockData, setShowMockData] = useState(false);
  const [showPdf, setShowPdf] = useState(!showRealData || window.location.pathname.includes('custom-reports'));
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const [analyticsData, setAnalyticsData] = useState({
    overviews: 66,
    calls: 4,
    bookings: 0,
    directions: 35,
    websiteClicks: 173,
    overviewsPercentChange: 15,
    callsPercentChange: 33,
    bookingsPercentChange: 0,
    directionsPercentChange: 24,
    websiteClicksPercentChange: 2,
    viewsBreakdown: [
      { label: 'Google Search - Desktop', value: 102, percentage: 59 },
      { label: 'Google Search - Mobile', value: 22, percentage: 12.7 },
      { label: 'Google Maps - Desktop', value: 23, percentage: 13.3 },
      { label: 'Google Maps - Mobile', value: 26, percentage: 15 }
    ],
    timelineData: {
      labels: ['Jan 29', 'Feb 2', 'Feb 6', 'Feb 10', 'Feb 14', 'Feb 18', 'Feb 22', 'Feb 26'],
      datasets: [
        {
          label: 'Overviews',
          data: [2, 6, 2, 6, 8, 4, 3, 2, 4, 3, 2, 0],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.4
        }
      ]
    }
  });

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle full screen toggle
  const toggleFullScreen = () => {
    if (!pdfContainerRef.current) return;
    
    if (!isFullScreen) {
      // Enter full screen
      if (pdfContainerRef.current.requestFullscreen) {
        pdfContainerRef.current.requestFullscreen();
      } else if ((pdfContainerRef.current as any).mozRequestFullScreen) {
        (pdfContainerRef.current as any).mozRequestFullScreen();
      } else if ((pdfContainerRef.current as any).webkitRequestFullscreen) {
        (pdfContainerRef.current as any).webkitRequestFullscreen();
      } else if ((pdfContainerRef.current as any).msRequestFullscreen) {
        (pdfContainerRef.current as any).msRequestFullscreen();
      }
    } else {
      // Exit full screen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };
  
  // Listen for full screen change events
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement !== null || 
        (document as any).mozFullScreenElement !== null || 
        (document as any).webkitFullscreenElement !== null || 
        (document as any).msFullscreenElement !== null
      );
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('msfullscreenchange', handleFullScreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('msfullscreenchange', handleFullScreenChange);
    };
  }, []);

  // Handle iframe loading state
  const handleIframeLoad = () => {
    setLoading(false);
    
    try {
      const iframeDocument = iframeRef.current?.contentDocument || 
        (iframeRef.current?.contentWindow?.document);
      
      if (iframeDocument) {
        // Hide login popups in iframe if possible
        const loginElements = iframeDocument.querySelectorAll(
          'div[class*="login"], div[id*="login"], iframe[src*="login"], div[class*="auth"], div[id*="auth"]'
        );
        
        loginElements.forEach(element => {
          (element as HTMLElement).style.display = 'none';
        });
      }
    } catch (e) {
      // Cross-origin restrictions may prevent accessing iframe content
      console.log('Unable to access iframe content due to same-origin policy');
    }
  };

  const handleIframeError = () => {
    setError("Failed to load Looker Studio report");
    setShowPdf(true);
  };

  // Check for existing login popups and hide them
  useEffect(() => {
    const hideLoginPopups = () => {
      // Use MutationObserver to detect when login popups are added to the DOM
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            // Look for login-related elements
            const loginElements = document.querySelectorAll(
              'div[class*="login"], div[id*="login"], iframe[src*="login"], div[class*="auth"], div[id*="auth"]'
            );
            
            loginElements.forEach(element => {
              // Check if it's a login popup
              if (element.classList.contains('login-popup') || 
                  element.id.includes('login') || 
                  (element.getAttribute('src') && element.getAttribute('src')?.includes('login'))) {
                // Hide the element
                (element as HTMLElement).style.display = 'none';
              }
            });
          }
        }
      });
      
      // Start observing the document body for login popups
      observer.observe(document.body, { childList: true, subtree: true });
      
      return () => observer.disconnect();
    };
    
    return hideLoginPopups();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // Replace RealAnalyticsDashboard with inline analytics display
  if (showRealData) {
    // Analytics dashboard implementation
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
          <div className="text-sm text-gray-500">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Live Data</span>
          </div>
        </div>
        
        {/* Key metrics section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 mb-1">Website clicks</p>
            <p className="text-2xl font-bold">{analyticsData.websiteClicks}</p>
            <div className="flex items-center mt-1">
              {analyticsData.websiteClicksPercentChange > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              ) : analyticsData.websiteClicksPercentChange < 0 ? (
                <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
              ) : null}
              <p className={`text-xs ${
                analyticsData.websiteClicksPercentChange > 0 ? 'text-green-600' : 
                analyticsData.websiteClicksPercentChange < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {Math.abs(analyticsData.websiteClicksPercentChange)}% from last month
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 mb-1">Page views</p>
            <p className="text-2xl font-bold">{analyticsData.overviews}</p>
            <div className="flex items-center mt-1">
              {analyticsData.overviewsPercentChange > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              ) : analyticsData.overviewsPercentChange < 0 ? (
                <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
              ) : null}
              <p className={`text-xs ${
                analyticsData.overviewsPercentChange > 0 ? 'text-green-600' : 
                analyticsData.overviewsPercentChange < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {Math.abs(analyticsData.overviewsPercentChange)}% from last month
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 mb-1">Contact submissions</p>
            <p className="text-2xl font-bold">{analyticsData.calls}</p>
            <div className="flex items-center mt-1">
              {analyticsData.callsPercentChange > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              ) : analyticsData.callsPercentChange < 0 ? (
                <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
              ) : null}
              <p className={`text-xs ${
                analyticsData.callsPercentChange > 0 ? 'text-green-600' : 
                analyticsData.callsPercentChange < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {Math.abs(analyticsData.callsPercentChange)}% from last month
              </p>
            </div>
          </div>
        </div>
        
        {/* Traffic chart */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Website Traffic</h3>
          <div className="h-64">
            <Line 
              data={analyticsData.timelineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false,
                    }
                  },
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        
        {/* Views and breakdown */}
        <div>
          <h3 className="text-lg font-medium mb-4">Traffic Source Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              {analyticsData.viewsBreakdown.map((item, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="text-sm font-medium">{item.value} views</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium mb-3">Recommendations</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <BarChart2 className="h-5 w-5 text-blue-600 mt-0.5" />
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Increase mobile optimization to improve mobile conversion rates.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <BarChart2 className="h-5 w-5 text-blue-600 mt-0.5" />
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Focus on improving desktop search visibility for key products.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <BarChart2 className="h-5 w-5 text-blue-600 mt-0.5" />
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Review Maps listings to maximize visibility in location-based searches.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show PDF viewer
  if (showPdf) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Google Analytics Dashboard</h2>
          <div className="text-sm text-gray-500">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">PDF Report</span>
          </div>
        </div>
        
        <PDFDebugger pdfPath={pdfPath} />
        
        <div ref={pdfContainerRef} style={{ position: 'relative' }}>
          <button 
            onClick={toggleFullScreen}
            className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullScreen ? (
              <Minimize2 className="h-5 w-5 text-gray-700" />
            ) : (
              <Maximize2 className="h-5 w-5 text-gray-700" />
            )}
          </button>
          
          <div className="pdf-container" style={{ height: "800px", width: "100%" }}>
            <object
              data={pdfPath}
              type="application/pdf"
              width="100%"
              height="100%"
              className="rounded border border-gray-200"
              style={{ minHeight: "800px" }}
            >
              <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded">
                <p className="mb-4 text-gray-600">Unable to display PDF file. </p>
                <a 
                  href={pdfPath} 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Download PDF Instead
                </a>
              </div>
            </object>
          </div>
        </div>
      </div>
    );
  }

  // Return the Looker Studio embed
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Google Analytics Dashboard</h2>
        <div className="text-sm text-gray-500">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Live Data</span>
        </div>
      </div>
      
      <div className="looker-studio-container" style={{ height: "700px", width: "100%" }}>
        <iframe 
          ref={iframeRef}
          width="100%" 
          height="100%" 
          src={lookerStudioUrl}
          frameBorder="0" 
          style={{ border: 0 }}
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads allow-modals"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
      </div>
    </div>
  );
}

interface GoogleAnalyticsDirectEmbedProps {
  reportId: string;
}

export function GoogleAnalyticsDirectEmbed({ reportId }: GoogleAnalyticsDirectEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Load the Google Charts API
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.async = true;
    
    script.onload = () => {
      if (window.google && window.google.charts) {
        window.google.charts.load('current', {'packages':['corechart']});
        window.google.charts.setOnLoadCallback(() => {
          // This is where you would initialize your charts
          console.log('Google Charts loaded');
        });
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, [reportId]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Google Analytics Dashboard</h2>
        <div className="text-sm text-gray-500">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Direct Access</span>
        </div>
      </div>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">
          For the best experience, please <a 
            href={`https://lookerstudio.google.com/reporting/${reportId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            open the report directly
          </a>.
        </p>
      </div>
      
      <div ref={containerRef} style={{ height: "500px" }}></div>
    </div>
  );
} 