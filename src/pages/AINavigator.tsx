import React, { useState, useEffect, useCallback } from 'react';
import { ClipboardCopy, RefreshCw, Linkedin, Zap, Brain, Sparkles, Copy, ArrowRight, Save, PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

export function AINavigator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [notepadContent, setNotepadContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [wordCount, setWordCount] = useState(300);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [noteSaved, setNoteSaved] = useState(false);
  
  // Debounced character count update to improve performance
  const updateCharCount = useCallback(
    debounce((text) => {
      setCharCount(text.length);
    }, 100),
    []
  );
  
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    updateCharCount(e.target.value);
  };
  
  const copyToNotepad = () => {
    setNotepadContent(generatedContent);
    setNoteSaved(false);
  };

  const saveNotepad = () => {
    try {
      localStorage.setItem('enspec-content-notepad', notepadContent);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  };

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('enspec-content-notepad');
      if (savedNotes) {
        setNotepadContent(savedNotes);
      }
    } catch (err) {
      console.error('Failed to load from localStorage:', err);
    }
  }, []);
  
  const generateContent = async () => {
    setIsGenerating(true);
    setError('');
    setCopySuccess(false);
    
    try {
      const apiUrl = 'http://localhost:3003/api/content-generator';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt || "Enspec Power's analytics solutions for the energy sector",
          contentType: 'industry_insight',
          tone: 'professional',
          wordCount,
          maxTokens: 2000
        }),
      });
      
      if (!response.ok) {
        let errorMsg = response.statusText;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          // If parsing fails, use status text
        }
        throw new Error(`API Error: ${errorMsg}`);
      }
      
      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (err) {
      console.error('Detailed error:', err);
      setError(`Failed to generate content: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#4076bb]">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img 
                  src="/analytics-logo.png" 
                  alt="Analytics Logo"
                  className="h-8 w-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="ml-2 text-xl font-bold text-gray-900">Analytics Dashboard</span>
              </Link>
            </div>
            <Link 
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        {/* OpenAI badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-white" />
            <p className="text-white text-sm">Powered by OpenAI</p>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {/* LinkedIn Content Generator */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 text-[#0077b5] mr-2" />
                <h2 className="text-base font-medium text-gray-800">LinkedIn Content Generator</h2>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                  What would you like to write about?
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={handlePromptChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4076bb] focus:border-[#4076bb] text-sm"
                  placeholder="Create a post on Power Systems"
                ></textarea>
                <div className="mt-1 text-xs text-right text-gray-500">{charCount} characters</div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="wordCount" className="block text-sm font-medium text-gray-700 mb-1">
                  Length (Approx. Words)
                </label>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">50</span>
                  <input
                    type="range"
                    id="wordCount"
                    min="50"
                    max="750"
                    step="10"
                    value={wordCount}
                    onChange={(e) => setWordCount(parseInt(e.target.value))}
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-gray-500 ml-2">750</span>
                </div>
                <div className="text-center text-sm mt-1">{wordCount}</div>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                  {error}
                </div>
              )}
              
              <button
                className="w-full bg-[#4076bb] text-white py-2 px-4 rounded-md hover:bg-[#3567a6] transition-colors flex items-center justify-center"
                onClick={generateContent}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate LinkedIn Post
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Generated LinkedIn Post */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 text-[#0077b5] mr-2" />
                <h2 className="text-base font-medium text-gray-800">Generated LinkedIn Post</h2>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={copyToNotepad}
                  disabled={!generatedContent}
                  
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={copyToClipboard}
                  disabled={!generatedContent}
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4" style={{ minHeight: "260px" }}>
              {generatedContent ? (
                <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-line overflow-y-auto" style={{ maxHeight: "260px" }}>
                  {generatedContent}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-6">
                  <ClipboardCopy className="w-10 h-10 mb-3 text-gray-300" />
                  <p className="text-sm text-gray-500">Your LinkedIn content will appear here</p>
                  <p className="text-xs mt-1 text-gray-400">
                    Click the "Generate LinkedIn Post" button to create content
                  </p>
                </div>
              )}
              
              {copySuccess && (
                <div className="absolute top-14 right-4 bg-green-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
                  <ClipboardCopy className="w-3 h-3 mr-1" />
                  Copied!
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Notepad - Full width */}
        <div className="mt-4 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center">
                <PenLine className="w-4 h-4 text-gray-600 mr-2" />
                <h2 className="text-base font-medium text-gray-800">Content Notepad</h2>
              </div>
              <button 
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={saveNotepad}
                title="Save notes"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4">
              <textarea
                value={notepadContent}
                onChange={(e) => setNotepadContent(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4076bb] focus:border-[#4076bb] text-sm"
                placeholder="Use this space to edit and save your content..."
              ></textarea>
              
              {noteSaved && (
                <div className="absolute bottom-16 right-8 bg-green-500 text-white px-3 py-1 rounded-md text-xs flex items-center">
                  <Save className="w-3 h-3 mr-1" />
                  Saved!
                </div>
              )}
              
              <div className="mt-3 flex flex-wrap gap-2">
                <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                  #PowerSystems
                </div>
                <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                  #GridAnalytics
                </div>
                <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                  #HarmonicFilter
                </div>
                <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                  #RenewableEnergy
                </div>
                <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                  #EnspecPower
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}