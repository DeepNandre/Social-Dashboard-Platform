declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      auth2: {
        init: (options: { client_id: string }) => Promise<any>;
      };
      analytics: {
        ready: (callback: () => void) => void;
        auth: {
          authorize: (options: { 
            clientid: string;
            container: HTMLElement | null;
          }) => void;
        };
        ViewSelector: new (options: { container: HTMLElement | null }) => {
          execute: () => void;
          on: (event: string, callback: (ids: string) => void) => void;
        };
        googleCharts: {
          Dashboard: new (options: { container: HTMLElement | null }) => any;
          DataChart: new (options: any) => {
            execute: () => void;
            set: (options: any) => any;
          };
        };
      };
    };
  }
}

export {}; 