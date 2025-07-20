import Link from "next/link"
import { Facebook, Plus, Instagram, Youtube, MessageCircle, Send, Phone, User } from "lucide-react"

export default function FooterLanding() {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200/20 shadow-sm px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-green-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-green-600 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="hover:text-green-600 transition-colors">
                  Subscription
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Manager */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Manager</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-green-600" />
                <span>Brian</span>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact us</h3>
            <div className="space-y-2 text-sm">
              <p>08123456789</p>
            </div>
          </div>

          {/* Let's chat & Follow us */}
          <div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Let's chat</h3>
              <div className="flex gap-2">
                <div className="p-2 border border-gray-200/30 rounded-full hover:bg-green-50 cursor-pointer transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="p-2 border border-gray-200/30 rounded-full hover:bg-green-50 cursor-pointer transition-colors">
                  <Send className="w-4 h-4" />
                </div>
                <div className="p-2 border border-gray-200/30 rounded-full hover:bg-green-50 cursor-pointer transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Follow us</h3>
              <div className="flex gap-2">
                <div className="p-2 border border-gray-200/30 rounded-full hover:bg-green-50 cursor-pointer transition-colors">
                  <Facebook className="w-4 h-4" />
                </div>
                <div className="p-2 border border-gray-200/30 rounded-full hover:bg-green-50 cursor-pointer transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="p-2 border border-gray-200/30 rounded-full hover:bg-green-50 cursor-pointer transition-colors">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="p-2 border border-gray-200/30 rounded-full hover:bg-green-50 cursor-pointer transition-colors">
                  <Youtube className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with logo, copyright, and watermark */}
        <div className="flex flex-col space-y-4 pt-8 border-t border-gray-200/20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900">SEA Catering</h2>
            </div>
          </div>

          {/* Watermark */}
          <div className="text-center text-xs text-gray-400 border-t border-gray-200/20 pt-4">
            <p>Aditya Wirayudha - Universitas Brawijaya © 2025</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
