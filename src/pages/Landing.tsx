import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Brain, 
  Users, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Search
} from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Uncover Social Media
              <span className="text-blue-400"> Insights</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your all-in-one platform for social media intelligence, content management, and team collaboration.
              Powered by AI to help you make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Start Sleuthing
              </button>
              <button className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Uncover Hidden Insights
            </h2>
            <p className="text-gray-400">
              Powerful features to help you discover and leverage social media opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-xl"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Sleuthing Plan
            </h2>
            <p className="text-gray-400">
              Find the perfect plan for your social media investigation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 p-8 rounded-xl"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {plan.name}
                </h3>
                <p className="text-4xl font-bold text-white mb-6">
                  ${plan.price}
                  <span className="text-gray-400 text-lg">/month</span>
                </p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Start Sleuthing
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Advanced Analytics",
    description: "Uncover detailed insights into your social media performance with real-time analytics and custom reports.",
    icon: <BarChart3 className="w-6 h-6 text-blue-500" />
  },
  {
    title: "AI-Powered Insights",
    description: "Leverage AI to generate content, predict performance, and get actionable recommendations.",
    icon: <Brain className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Team Collaboration",
    description: "Work together seamlessly with role-based access, task management, and real-time updates.",
    icon: <Users className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Content Management",
    description: "Create, schedule, and publish content across multiple platforms from one dashboard.",
    icon: <Zap className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Performance Tracking",
    description: "Monitor your social media growth with detailed metrics and competitor analysis.",
    icon: <Sparkles className="w-6 h-6 text-blue-500" />
  }
];

const pricingPlans = [
  {
    name: "Sleuth Starter",
    price: "0",
    features: [
      "Basic analytics",
      "3 social accounts",
      "Content calendar",
      "Basic AI features",
      "Email support"
    ]
  },
  {
    name: "Sleuth Pro",
    price: "49",
    features: [
      "Advanced analytics",
      "10 social accounts",
      "Team collaboration",
      "AI content generation",
      "Priority support"
    ]
  },
  {
    name: "Sleuth Enterprise",
    price: "199",
    features: [
      "Custom analytics",
      "Unlimited accounts",
      "Advanced team features",
      "Custom AI solutions",
      "Dedicated support"
    ]
  }
]; 