import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAgentTasks = () => {
  const [agents, setAgents] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentRes, listRes] = await Promise.all([
          axios.get('http://localhost:5000/api/agents', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          axios.get('http://localhost:5000/api/lists', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
        ]);
        setAgents(agentRes.data);
        setLists(listRes.data);
      } catch (err) {
        alert('❌ Failed to fetch agent data or task lists');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-indigo-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">Agent Task Distribution</h2>

        {agents.length === 0 ? (
          <p className="text-center text-gray-600">No agents found.</p>
        ) : (
          agents.map((agent) => {
            const agentTasks = lists.filter((item) => item.agentId === agent._id);

            return (
              <div
                key={agent._id}
                className="mb-6 bg-white shadow-lg rounded-2xl p-6 transition duration-300 hover:shadow-2xl"
              >
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{agent.name}</h3>
                {agentTasks.length === 0 ? (
                  <p className="text-gray-500 italic">No tasks assigned.</p>
                ) : (
                  <ul className="space-y-2 list-inside list-disc text-gray-700">
                    {agentTasks.map((task, i) => (
                      <li key={i} className="bg-indigo-50 px-3 py-2 rounded-md">
                        <span className="font-medium">{task.firstName}</span> — {task.phone} — {task.notes}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ViewAgentTasks;
