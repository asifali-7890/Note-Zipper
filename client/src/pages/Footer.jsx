import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-600 border-t border-blue-400 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Note Zipper</h3>
                        <p className="text-sm opacity-90">
                            Your secure digital notebook for organizing thoughts, ideas, and important information.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/about" className="hover:text-blue-200 transition-colors">About Us</a></li>
                            <li><a href="/features" className="hover:text-blue-200 transition-colors">Features</a></li>
                            <li><a href="/privacy" className="hover:text-blue-200 transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-blue-200 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <div className="space-y-2 text-sm">
                            <p>123 Knowledge Street</p>
                            <p>New York, NY 10001</p>
                            <p>Email: <a href="mailto:support@notezipper.com" className="hover:text-blue-200">support@notezipper.com</a></p>
                            <p>Phone: (555) 123-4567</p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
                                <FaGithub size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/asifaliquraishy/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="mailto:support@notezipper.com" className="hover:text-blue-200 transition-colors">
                                <FaEnvelope size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-blue-400 mt-8 pt-8 text-center">
                    <p className="text-sm opacity-90">
                        &copy; {new Date().getFullYear()} Note Zipper. All rights reserved.
                    </p>
                    <p className="text-xs mt-2 opacity-75">
                        Made with ❤️ by Tech Innovators
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;