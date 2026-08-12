import React from 'react';
import useAppStore from '../../store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Stethoscope, Users } from 'lucide-react';

export default function RoleSwapper() {
  const { role, setRole } = useAppStore();
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'guest') {
      navigate('/');
    } else {
      navigate(`/${newRole.replace('_', '-')}`);
    }
  };

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] bg-white dark:bg-[#15241b] border border-border dark:border-border-dark p-3 rounded-2xl shadow-2xl flex flex-col gap-2 max-w-[200px]">
      <div className="text-xs font-bold text-center text-muted mb-1 pb-2 border-b border-border dark:border-border-dark uppercase tracking-wider">
        Demo Role Switcher
      </div>
      
      <button 
        onClick={() => handleRoleChange('guest')}
        className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-colors ${role === 'guest' ? 'bg-primary/20 text-accent font-medium' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
      >
        <Users size={16} /> Guest
      </button>
      <button 
        onClick={() => handleRoleChange('pasien')}
        className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-colors ${role === 'pasien' ? 'bg-primary/20 text-accent font-medium' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
      >
        <User size={16} /> Pasien
      </button>
      <button 
        onClick={() => handleRoleChange('admin_rs')}
        className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-colors ${role === 'admin_rs' ? 'bg-primary/20 text-accent font-medium' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
      >
        <Shield size={16} /> Admin RS
      </button>
      <button 
        onClick={() => handleRoleChange('admin_apotek')}
        className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-colors ${role === 'admin_apotek' ? 'bg-primary/20 text-accent font-medium' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
      >
        <Stethoscope size={16} /> Admin Apotek
      </button>
    </div>
  );
}
