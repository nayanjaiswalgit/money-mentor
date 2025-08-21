import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-background-light to-background text-text-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold text-text">Revence</h3>
                    <p className="text-sm">Your Personal Finance Companion</p>
                </div>
                <div className="flex space-x-6">
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.2, color: "#2F81F7" }}
                        className="text-text-light"
                    >
                        <FaGithub size={24} />
                    </motion.a>
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.2, color: "#2F81F7" }}
                        className="text-text-light"
                    >
                        <FaTwitter size={24} />
                    </motion.a>
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.2, color: "#2F81F7" }}
                        className="text-text-light"
                    >
                        <FaLinkedin size={24} />
                    </motion.a>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Revence. All Rights Reserved.</p>
            </div>
        </footer>
    )
} 