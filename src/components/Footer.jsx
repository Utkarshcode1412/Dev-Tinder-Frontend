import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  const socialLinks = [
    {
      href: "https://linkedin.com/in/utkarshpawar14",
      icon: faLinkedin, // Changed to explicit icon variable
      label: 'LinkedIn',
    },
    {
      href: "https://github.com/Utkarshcode1412",
      icon: faGithub,   // Changed to explicit icon variable
      label: 'GitHub',
    },
    {
      href: "https://x.com/Utkaarshhh_ai",
      icon: faSquareXTwitter, // Changed to explicit icon variable
      label: 'X',
    },
  ]
  
  return (
    <div>
        <footer className="footer sm:footer-horizontal border-t border-base-300 bg-base-100 text-base-content items-center p-4 fixed bottom-0 left-0 w-full z-50">
            <aside className="grid-flow-col items-center">
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="mx-5 grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                {socialLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        className="transition hover:text-primary"
                    >
                        {/* This component will now run perfectly */}
                        <FontAwesomeIcon icon={link.icon} size="lg" />
                    </a>
                ))}
            </nav>
        </footer>
    </div>
  )
}

export default Footer
