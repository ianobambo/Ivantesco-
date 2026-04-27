import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customers, setCustomers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState({});

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [customersRes, loansRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/customers`),
        axios.get(`${API_URL}/loans`),
        axios.get(`${API_URL}/reports/stats`)
      ]);
      setCustomers(customersRes.data);
      setLoans(loansRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <Toaster />
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl border-b border-white/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-teal-500 bg-clip-text text-transparent mb-2">
              IVANTESCO
            </h1>
            <p className="text-xl text-gray-600 font-light">Money Lending Corporation</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all">
            <div className="text-4xl font-bold text-green-500">{stats.totalLoans || 0}</div>
            <div className="text-gray-600">Total Loans</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all">
            <div className="text-4xl font-bold text-blue-500">{stats.activeLoans || 0}</div>
            <div className="text-gray-600">Active</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all">
            <div className="text-4xl font-bold text-orange-500">{stats.overdue || 0}</div>
            <div className="text-gray-600">Overdue</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all">
            <div className="text-4xl font-bold text-emerald-500">KES {stats.totalCollected?.toLocaleString() || 0}</div>
            <div className="text-gray-600">Collected</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {['dashboard', 'customers', 'loans', 'payments', 'reports'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-xl scale-105'
                    : 'bg-white/50 hover:bg-white/80 shadow-lg'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'dashboard' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome to IVANTESCO Dashboard</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-12 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-white/20 py-3 px-6 rounded-xl hover:bg-white/30 transition-all">➕ Register Customer</button>
                    <button className="w-full bg-white/20 py-3 px-6 rounded-xl hover:bg-white/30 transition-all">💰 Issue Loan</button>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-12 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-2 text-sm">
                    <div>✅ John Doe paid KES 5,000</div>
                    <div>➕ New customer registered</div>
                    <div>💰 Loan issued to Jane</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;