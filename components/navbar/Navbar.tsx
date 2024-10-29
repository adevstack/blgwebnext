// components/Navbar.tsx
"use client";

import { SafeUser } from "@/types/type";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "../ThemeToggle";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

export default function Navbar({ currentUser }: UserMenuProps) {
  return (
    <header>
      <nav className="bg-background text-foreground flex justify-between items-center px-4 py-6 shadow-xl z-50"> {/* Increased z-index here */}
        {/* Display the current user's name on the left corner */}
        {currentUser && (
          <span className="text-foreground">{currentUser.name}</span>
        )}

        {/* Scrolling News/Ads Section */}
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div
            className="animate-marquee text-white flex"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span className="bg-inherit text-foreground px-3 py-1 rounded-md text-lg">
              Contact Here:{" "}
              <a href="mailto:afrozaman123@gmail.com" className="underline text-blue-500">
                afrozaman123@gmail.com
              </a>
              !
            </span>
            <span className="bg-inherit text-foreground px-3 py-1 rounded-md text-lg ml-5">
              Latest News: Join our newsletter for updates!
            </span>
          </motion.div>
        </div>

        {/* Navigation Links, Sign In/Out, and Theme Toggle */}
        <div className="flex text-foreground items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link href="/">Home</Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link href="/create">Blog</Link>
          </motion.div>

          {currentUser ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => signOut()}
            >
              Sign out
            </motion.button>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/login">
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/register">
                  Register
                </Link>
              </motion.div>
            </>
          )}

          {/* Add the Theme Toggle component */}
          <ThemeToggle />
        </div>
      </nav>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </header>
  );
}
