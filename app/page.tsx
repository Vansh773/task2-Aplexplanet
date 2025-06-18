import Link from "next/link"
import { ArrowRight, CheckCircle, ImageIcon, Mail, Layout } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Interactive Web Development
            <span className="text-indigo-600"> Showcase</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Explore modern web development techniques with React, featuring responsive design, form validation, and
            dynamic user interactions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/todo"
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Learning Objectives Covered</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Form</h3>
            <p className="text-gray-600 mb-4">
              HTML forms with various input types, styled with modern CSS and complete validation.
            </p>
            <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Try it out →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Form Validation</h3>
            <p className="text-gray-600 mb-4">
              JavaScript validation for required fields, email format, and real-time feedback.
            </p>
            <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">
              See validation →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Layout className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Responsive Layout</h3>
            <p className="text-gray-600 mb-4">
              Flexbox navigation and CSS Grid layouts with media queries for all devices.
            </p>
            <Link href="/todo" className="text-indigo-600 hover:text-indigo-700 font-medium">
              View layouts →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Dynamic Components</h3>
            <p className="text-gray-600 mb-4">Interactive to-do list and image gallery with full CRUD operations.</p>
            <Link href="/gallery" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Explore features →
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Built With Modern Technologies</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold">React</div>
            <div className="text-2xl font-bold">TypeScript</div>
            <div className="text-2xl font-bold">Tailwind CSS</div>
            <div className="text-2xl font-bold">Next.js</div>
            <div className="text-2xl font-bold">CSS Grid</div>
            <div className="text-2xl font-bold">Flexbox</div>
          </div>
        </div>
      </section>
    </div>
  )
}
