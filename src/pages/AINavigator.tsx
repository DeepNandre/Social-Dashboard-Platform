import React, { useState, useEffect, useCallback } from 'react';
import { ClipboardCopy, RefreshCw, Linkedin, Zap, Brain, Sparkles, Copy, ArrowRight, Save, PenLine, BarChart, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { motion } from 'framer-motion';

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
      localStorage.setItem('socialsleuth-content-notepad', notepadContent);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  };

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('socialsleuth-content-notepad');
      if (savedNotes) {
        setNotepadContent(savedNotes);
      }
    } catch (err) {
      console.error('Failed to load from localStorage:', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-teal-400">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img 
                  src="/logo.png" 
                  alt="Social Sleuth Logo"
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
      
      <div className="container mx-auto px-4 py-10">
        {/* AI badge */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-white" />
            <p className="text-white text-sm">Powered by Advanced AI</p>
          </div>
        </motion.div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Content Generator */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">AI Content Generator</h2>
            </div>
            <textarea
              className="w-full border border-gray-200 rounded-lg p-3 mb-4 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Enter your prompt or topic..."
              value={prompt}
              onChange={handlePromptChange}
            />
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-500">{charCount} characters</span>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => setIsGenerating(true)}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </button>
            </div>
            {generatedContent && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Generated Content</span>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={copyToNotepad}
                  >
                    <ClipboardCopy className="w-4 h-4 inline-block mr-1" /> Copy to Notepad
                  </button>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{generatedContent}</p>
              </div>
            )}
            <div className="mt-auto">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Notepad</h3>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 mb-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Your notes..."
                value={notepadContent}
                onChange={e => setNotepadContent(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                  onClick={saveNotepad}
                >
                  <Save className="w-4 h-4 inline-block mr-1" /> Save Note
                </button>
                {noteSaved && <span className="text-green-600 text-xs ml-2">Saved!</span>}
              </div>
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">AI Insights</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg flex items-center">
                <BarChart className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <h3 className="font-medium text-gray-900">Performance Metrics</h3>
                  <p className="text-sm text-gray-600">AI-powered analysis of your content performance</p>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg flex items-center">
                <Users className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <h3 className="font-medium text-gray-900">Audience Insights</h3>
                  <p className="text-sm text-gray-600">Understand your audience better with AI analysis</p>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg flex items-center">
                <Target className="w-5 h-5 text-purple-600 mr-2" />
                <div>
                  <h3 className="font-medium text-gray-900">Content Strategy</h3>
                  <p className="text-sm text-gray-600">Get AI recommendations for content optimization</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}