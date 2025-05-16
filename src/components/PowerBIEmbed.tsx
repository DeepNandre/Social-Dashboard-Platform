import React from 'react';

interface PowerBIEmbedProps {
  dashboard: {
    id: string;
    title: string;
    embedUrl: string;
  };
}

export function PowerBIEmbed({ dashboard }: PowerBIEmbedProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-[600px] w-full">
        <iframe
          title={dashboard.title}
          width="100%"
          height="100%"
          src={dashboard.embedUrl}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}