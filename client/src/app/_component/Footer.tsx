import React from 'react'

const Footer = async () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 bg-[#333] flex justify-center items-center z-50">
      <div className="w-web-main w-full flex h-full justify-between items-center text-white px-4">
        <p>© 2025 MCRR. All rights reserved.</p>
        <a
          href="https://yourwebsite.com/bug-report"
          className="text-blue-400 text-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          건의사항 및 버그 제보
        </a>
      </div>
    </footer>
  )
}

export default Footer
