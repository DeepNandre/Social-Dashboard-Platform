import React, { useState, useRef, useEffect } from 'react';
import { PowerBIEmbed } from './PowerBIEmbed';
import { Maximize2, Minimize2 } from 'lucide-react';
import { GoogleAnalyticsEmbed } from './GoogleAnalyticsEmbed';
import { PublicationsSection } from './PublicationsSection';
import { publicationsData } from '../constants/publicationsData';

interface Report {
  id: string;
  title: string;
  type: 'powerbi' | 'google-analytics' | 'pdf';
  embedUrl?: string;
  pdfPath?: string;
  description?: string;
}

interface CustomReportsTileProps {
  reports: Report[];
}

export function CustomReportsTile({ reports }: CustomReportsTileProps) {
  const [activeTab, setActiveTab] = useState(reports[0]?.id || '');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => {
    if (!pdfContainerRef.current) return;
    
    if (!isFullScreen) {
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

  if (!reports || reports.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Custom Reports</h2>
        <p className="text-gray-600">No reports available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Custom Reports</h2>
        
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <div className="flex -mb-px">
              {reports.map(report => (
                <button
                  key={report.id}
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === report.id
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(report.id)}
                >
                  {report.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="tab-content mt-4">
          {reports.map(report => (
            <div 
              key={report.id} 
              className={activeTab === report.id ? 'block' : 'hidden'}
            >
              {report.description && (
                <p className="text-gray-600 mb-4">{report.description}</p>
              )}
              
              {report.type === 'powerbi' && report.embedUrl && (
                <PowerBIEmbed 
                  dashboard={{ 
                    id: report.id, 
                    title: report.title, 
                    embedUrl: report.embedUrl 
                  }} 
                />
              )}
              
              {report.type === 'google-analytics' && (
                <GoogleAnalyticsEmbed 
                  lookerStudioUrl="https://lookerstudio.google.com/embed/reporting/1c566451-86f9-40e1-9ef1-90b8ffaea128/page/kIV1C"
                  pdfPath={report.pdfPath || '/Google_Analytics_Website.pdf'}
                  showRealData={false} // Force PDF view since iframe embed often has login issues
                />
              )}
              
              {report.type === 'pdf' && report.pdfPath && (
                <div ref={pdfContainerRef} style={{ position: 'relative', height: '800px' }}>
                  {/* Full screen button */}
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
                  
                  <object
                    data={report.pdfPath}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    className="border rounded"
                  >
                    <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded border border-gray-300 p-8">
                      <p className="text-gray-700 mb-4">
                        Unable to display PDF. You can download it instead.
                      </p>
                      <a 
                        href={report.pdfPath} 
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Download PDF
                      </a>
                    </div>
                  </object>
                  
                  {/* Fullscreen button at the bottom for better accessibility */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <button 
                      onClick={toggleFullScreen}
                      className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none"
                    >
                      {isFullScreen ? (
                        <>
                          <Minimize2 className="h-4 w-4 mr-2" />
                          Exit Fullscreen
                        </>
                      ) : (
                        <>
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Fullscreen
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Show Publications Section */}
      {typeof publicationsData !== 'undefined' && (
        <PublicationsSection
          totalPublications={publicationsData?.totalPublications || 9}
          totalImpressions={publicationsData?.totalImpressions || 11900}
          publications={publicationsData?.publications || []}
        />
      )}
    </div>
  );
} 