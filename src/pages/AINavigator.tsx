import React, { useState, useEffect, useCallback } from 'react';
import { ClipboardCopy, RefreshCw, Linkedin, Zap, Brain, Sparkles, Copy, ArrowRight, Save, PenLine, BarChart, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';

interface ContentGeneratorProps {
  prompt: string;
  contentType: string;
  tone: string;
  wordCount: number;
}

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
  const [selectedPlatform, setSelectedPlatform] = useState('linkedin');
  const [contentType, setContentType] = useState('post');
  const [tone, setTone] = useState('professional');
  
  // Debounced character count update
  const updateCharCount = useCallback(
    debounce((text: string) => {
      setCharCount(text.length);
    }, 100),
    []
  );
  
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    updateCharCount(e.target.value);
  };

  const copyToNotepad = () => {
    setNotepadContent(generatedContent);
    setNoteSaved(false);
  };

  const saveNotepad = () => {
    try {
      localStorage.setItem('content-notepad', notepadContent);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  };

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('content-notepad');
      if (savedNotes) {
        setNotepadContent(savedNotes);
      }
    } catch (err) {
      console.error('Failed to load from localStorage:', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700">
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
                <span className="ml-2 text-xl font-bold text-gray-900">AI Content Assistant</span>
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
        {/* AI badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-white" />
            <p className="text-white text-sm">Powered by Advanced AI</p>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {/* Content Generator */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center">
                <Brain className="w-4 h-4 text-blue-600 mr-2" />
                <h2 className="text-base font-medium text-gray-800">AI Content Generator</h2>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['linkedin', 'twitter', 'facebook'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        selectedPlatform === platform
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="post">Post</option>
                  <option value="article">Article</option>
                  <option value="thread">Thread</option>
                  <option value="newsletter">Newsletter</option>
                </select>
              </div>

              {/* Tone Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['professional', 'casual', 'friendly'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        tone === t
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Word Count Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Word Count: {wordCount}
                </label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Prompt Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to write about?
                </label>
                <textarea
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Enter your topic or idea..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {charCount} characters
                </p>
              </div>

              {/* Generate Button */}
              <button
                onClick={() => {/* Add generation logic */}}
                disabled={isGenerating || !prompt}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </button>
            </div>
          </div>

          {/* Notepad */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center">
                <PenLine className="w-4 h-4 text-blue-600 mr-2" />
                <h2 className="text-base font-medium text-gray-800">Content Notepad</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={copyToNotepad}
                  className="text-gray-400 hover:text-gray-500"
                  title="Copy to Notepad"
                >
                  <ClipboardCopy className="w-4 h-4" />
                </button>
                <button
                  onClick={saveNotepad}
                  className="text-gray-400 hover:text-gray-500"
                  title="Save Notepad"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <textarea
                value={notepadContent}
                onChange={(e) => setNotepadContent(e.target.value)}
                placeholder="Your content will appear here..."
                className="w-full h-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {noteSaved && (
                <p className="mt-2 text-sm text-green-600">Notepad saved!</p>
              )}
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">AI Insights</h2>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <BarChart className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-gray-900">Performance Metrics</h3>
                </div>
                <p className="text-sm text-gray-600">
                  AI-powered analysis of your content performance
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-medium text-gray-900">Audience Insights</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Understand your audience better with AI analysis
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Target className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-medium text-gray-900">Content Strategy</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Get AI recommendations for content optimization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}