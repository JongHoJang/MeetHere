import { TABS } from '@/constants/tabs'

interface TabSelectorProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TabSelector({
  activeTab,
  setActiveTab,
}: TabSelectorProps) {
  return (
    <div className="flex border-b">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`flex-1 py-2 text-center border-b-2 transition ${
            activeTab === tab.id
              ? 'border-gray-800 text-gray-800 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
