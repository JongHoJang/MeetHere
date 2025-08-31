import React from 'react'

const Footer = async () => {
  return (
    <footer className="bottom-0 left-0 right-0 py-4 md:py-7 bg-[#333] text-white z-50 ">
      <div className="w-full max-w-web-main mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-sm text-center md:text-left">
          © 2025 MeetHere. All rights reserved.
        </p>
        <div className="flex flex-row gap-2 md:gap-5 text-sm text-center">
          <a
            href="https://walnut-hose-a93.notion.site/1e8ebd82d49180c88637c0e4538efd0b?pvs=4"
            className="text-blue-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            이용 안내
          </a>
          /
          <a
            href="https://relic-stone-f08.notion.site/2606f7d1cf0780e1afc0d35a81248911"
            className="text-blue-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            업데이트 내역
          </a>
          /
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfnmuvcUBV9pftTnj_HWVI28LR98eqcrRQpiN91-bfGe7cYdA/viewform"
            className="text-blue-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            건의사항 및 버그 제보
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
