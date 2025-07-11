import setup from "./coalesce";
import { useEffect, useState } from "react";

function Button({ txt, icon }) {
  return (
    <button className="capitalize px-4 py-2 text-base bg-primary rounded-md flex items-center gap-2 transition-transform duration-100 active:scale-95 active:shadow-inner">
      {icon && <span>{icon}</span>}
      {txt}
    </button>
  );
}

function UserStats({ totalHours }) {
  const percentage = Math.min(Math.round((totalHours / 120) * 100), 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="mt-6 p-6 bg-gray-800 rounded-lg max-w-md w-full flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#374151" // gray-700
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#3B82F6" // primary color
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-primary">{percentage}%</div>
          <div className="text-lg text-gray-300">{totalHours} Hours</div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-xl font-medium text-white">{selectedUser}</div>
        <div className="text-sm text-gray-400 mt-1">
          {formatDate(dates.startDate)} - {formatDate(dates.endDate)}
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  let suffix = 'th';
  
  if (day % 10 === 1 && day !== 11) suffix = 'st';
  else if (day % 10 === 2 && day !== 12) suffix = 'nd';
  else if (day % 10 === 3 && day !== 13) suffix = 'rd';
  
  return `${month} ${day}${suffix}`;
}

function UserSelector({ users, selectedUser, onUserChange, onAddUser, startDate, endDate, onDateChange }) {
  const [newUser, setNewUser] = useState("");
  const currentIndex = users.findIndex(user => user === selectedUser);

  const handlePrevious = () => {
    if (users.length > 0) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : users.length - 1;
      onUserChange(users[prevIndex]);
    }
  };

  const handleNext = () => {
    if (users.length > 0) {
      const nextIndex = currentIndex < users.length - 1 ? currentIndex + 1 : 0;
      onUserChange(users[nextIndex]);
    }
  };

  const handleAddUser = () => {
    if (newUser.trim() && !users.includes(newUser.trim())) {
      onAddUser(newUser.trim());
      setNewUser("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddUser();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* Date Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <div className="flex-1">
          <label htmlFor="startDate" className="block text-sm text-gray-300 mb-1">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => onDateChange('startDate', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="endDate" className="block text-sm text-gray-300 mb-1">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => onDateChange('endDate', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* User Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={users.length === 0}
          className="p-2 bg-primary rounded-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="min-w-[200px] text-center">
          <div className="text-lg font-medium">
            {selectedUser || "No user selected"}
          </div>
          <div className="text-sm text-gray-400">
            {users.length > 0 ? `${currentIndex + 1} of ${users.length}` : "0 users"}
          </div>
        </div>
        
        <button
          onClick={handleNext}
          disabled={users.length === 0}
          className="p-2 bg-primary rounded-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Add User Input */}
      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter username"
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-primary rounded-md hover:bg-primary/80 transition-colors whitespace-nowrap"
        >
          Add User
        </button>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex justify-center items-center">
      <div className="text-2xl sm:text-5xl lg:text-4xl font-light">
        <span className="text-primary">Chrono</span>Leet
      </div>
    </header>
  );
}

function getStandardLogPeriod() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  // Calculate the previous month (handle January case)
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  // Create dates for 28th of previous month and 27th of current month
  const startDate = new Date(prevMonthYear, prevMonth, 28);
  const endDate = new Date(currentYear, currentMonth, 27);
  
  // Format as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  };
}

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Set default dates to standard log period (28th of last month to 27th of current month)
  const { startDate: defaultStartDate, endDate: defaultEndDate } = getStandardLogPeriod();
  const [dates, setDates] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate
  });

  useEffect(() => {
    setup();
    const savedUsers = JSON.parse(localStorage.getItem('chronoleet-users') || '[]');
    setUsers(savedUsers);
    if (savedUsers.length > 0) {
      setSelectedUser(savedUsers[0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chronoleet-users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (selectedUser) {
      fetchUserData(selectedUser, dates.startDate, dates.endDate);
    }
  }, [selectedUser, dates]);

  const fetchUserData = async (username, startDate, endDate) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://logtime-med.1337.ma/api/get_log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: username,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString()
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      if (data['hydra:member'] && data['hydra:member'].length > 0) {
        setTotalHours(data['hydra:member'][0].totalHours || 0);
      } else {
        setTotalHours(0);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = (username) => {
    const newUsers = [...users, username];
    setUsers(newUsers);
    if (!selectedUser) {
      setSelectedUser(username);
    }
  };

  const handleUserChange = (username) => {
    setSelectedUser(username);
  };

  const handleDateChange = (type, value) => {
    setDates(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div id="app" className="font-poppins font-normal">
      <div className="content--canvas"></div>
      <main className="absolute inset-x-0 mx-auto text-white max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-8 md:mt-10">
        <Header />
        <UserSelector 
          users={users}
          selectedUser={selectedUser}
          onUserChange={handleUserChange}
          onAddUser={handleAddUser}
          startDate={dates.startDate}
          endDate={dates.endDate}
          onDateChange={handleDateChange}
        />
        
        {loading && (
          <div className="mt-6 text-center text-gray-400">Loading...</div>
        )}
        
        {error && (
          <div className="mt-6 p-4 bg-red-900/50 rounded-lg max-w-md w-full mx-auto text-center">
            Error: {error}
          </div>
        )}
        
        {selectedUser && !loading && !error && (
          <div className="flex justify-center">
            <UserStats totalHours={totalHours} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;