import React from 'react';
import { format } from 'date-fns';
import { Download } from 'lucide-react';

const Export = ({ users }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Invalid Date' : format(date, 'dd/MM/yyyy hh:mm a');
  };

  const exportToCSV = (users) => {
    const headers = ['Name', 'Email', 'Designation', 'Last Login', 'Last Logout'];
    const rows = users.map(user => [
      user.name || '',
      user.email || '',
      user.role || '',
      formatDate(user.lastLogin),
      formatDate(user.lastLogout),
    ]);

    const csvContent = [
      headers.join(','), // header row
      ...rows.map(row => row.map(value => `"${value}"`).join(',')), // data rows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button
        className="btn btn-primary exportColor"
        onClick={() => exportToCSV(users)}
      >
        Export Users <span className='me-2'><Download size={15} /></span>
      </button>
    </div>
  );
};

export default Export;
