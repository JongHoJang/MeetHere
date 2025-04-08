interface TabSelectorProps {
  tabs: string[] // floor 목록
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TabSelector({
  tabs,
  activeTab,
  setActiveTab,
}: TabSelectorProps) {
  return (
    <div className="flex border-b mb-10">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`flex-1 py-2 text-center border-b-2 transition ${
            activeTab === tab
              ? 'border-gray-800 text-gray-800 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
