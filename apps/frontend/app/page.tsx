import React from 'react';
import { Pencil, Share2, Download, Users, Sparkles, Github } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 z-0" />
        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center hover:cursor-pointer">
            <div className="flex items-center space-x-2 ">
              <Pencil className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">DrawFlow</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Docs</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Blog</a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors hover:cursor-pointer">
                SignIn
              </button>
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Collaborative Drawing Made Simple
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Create, collaborate, and share beautiful diagrams and drawings in real-time. 
                No installation required.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg hover:cursor-pointer">
                  SignUp
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 transition-colors text-lg hover:cursor-pointer">
                  SignIn
                </button>
              </div>
            </div>

            {/* Preview Image */}
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80" 
                alt="DrawFlow Interface Preview" 
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Everything you need to bring your ideas to life
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Powerful features that make DrawFlow the perfect tool for teams, 
                  designers, and anyone who wants to visualize their thoughts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard 
                  icon={<Users className="h-6 w-6 text-indigo-600" />}
                  title="Real-time Collaboration"
                  description="Work together with your team in real-time, see changes instantly."
                />
                <FeatureCard 
                  icon={<Share2 className="h-6 w-6 text-indigo-600" />}
                  title="Easy Sharing"
                  description="Share your drawings with a simple link, no account required."
                />
                <FeatureCard 
                  icon={<Download className="h-6 w-6 text-indigo-600" />}
                  title="Export Anywhere"
                  description="Export your drawings in multiple formats including SVG and PNG."
                />
                <FeatureCard 
                  icon={<Sparkles className="h-6 w-6 text-indigo-600" />}
                  title="Smart Drawing"
                  description="Intelligent shape recognition and auto-alignment tools."
                />
                <FeatureCard 
                  icon={<Github className="h-6 w-6 text-indigo-600" />}
                  title="Open Source"
                  description="Built with transparency, backed by the community."
                />
                <FeatureCard 
                  icon={<Pencil className="h-6 w-6 text-indigo-600" />}
                  title="Custom Styles"
                  description="Personalize your drawings with custom colors and styles."
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;