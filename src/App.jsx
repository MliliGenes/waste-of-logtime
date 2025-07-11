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

function UserStats({ totalHours, selectedUser, currentMonth }) {
  const percentage = Math.min(Math.round((totalHours / 120) * 100), 100);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const formatMonthRange = (date) => {
    const currentMonth = date.toLocaleString('default', { month: 'long' });
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1)
      .toLocaleString('default', { month: 'long' });
    return `${prevMonth} 28 - ${currentMonth} 27`;
  };

  return (
    <div className="mt-6 p-6 bg-gray-800 rounded-lg max-w-md w-full flex flex-col items-center">
      <div className="relative w-52 h-52 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#374151"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-primary">{percentage}%</div>
          <div className="text-xl text-gray-300">{totalHours} Hours</div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-medium text-white uppercase">{selectedUser}</div>
        <div className="text-md text-gray-400 mt-1">
          {formatMonthRange(currentMonth)}
        </div>
      </div>
    </div>
  );
}

function MonthSelector({ currentMonth, onMonthChange }) {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date;
  });

  const formatMonth = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="w-full max-w-md">
      <label htmlFor="month-select" className="block text-sm text-gray-300 mb-1">Select Month</label>
      <select
        id="month-select"
        value={currentMonth.toISOString()}
        onChange={(e) => onMonthChange(new Date(e.target.value))}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        {months.map((month, index) => (
          <option key={index} value={month.toISOString()}>
            {formatMonth(month)}
          </option>
        ))}
      </select>
    </div>
  );
}

function UserSelector({ users, selectedUser, onUserChange, onAddUser, currentMonth, onMonthChange }) {
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
      <MonthSelector currentMonth={currentMonth} onMonthChange={onMonthChange} />

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

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
      const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 28);
      const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 27);
      
      fetchUserData(selectedUser, startDate, endDate);
    }
  }, [selectedUser, currentMonth]);

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
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
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
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
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
            <UserStats 
              totalHours={totalHours} 
              selectedUser={selectedUser}
              currentMonth={currentMonth}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;