import { Clipboard, Lightbulb, AlertCircle } from 'lucide-react';

const QuickAccess = () => {
  const tasks = [
    { icon: <Clipboard />, text: 'Approve deliverables for Campaign ABC' },
    { icon: <Clipboard />, text: 'Finalize influencer selection for Campaign XYZ' },
  ];

  const tips = [
    { icon: <Lightbulb />, text: 'Boost engagement by scheduling posts on weekends.' },
    { icon: <AlertCircle />, text: 'New advanced filters for influencer discovery available!' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quick Access</h1>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-4">Pending Tasks</h2>
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center space-x-2">
              {task.icon}
              <p>{task.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-4">Tips & Updates</h2>
          {tips.map((tip, index) => (
            <div key={index} className="flex items-center space-x-2">
              {tip.icon}
              <p>{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;