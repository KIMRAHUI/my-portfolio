// src/components/ChatTabs.tsx
import './ChatTabs.css';

type Tab = {
  id: string;
  name: string;
  company: string;
};

type ChatTabsProps = {
  tabs: Tab[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function ChatTabs({ tabs, activeId, onSelect }: ChatTabsProps) {
  return (
    <div className="chat-tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`chat-tab ${tab.id === activeId ? 'active' : ''}`}
          onClick={() => onSelect(tab.id)}
        >
          {tab.name} / {tab.company}
        </button>
      ))}
    </div>
  );
}
