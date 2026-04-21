import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, Plus, Trash2, Edit, ChevronRight, 
  Database, Image, FolderKanban, BookOpen, 
  Settings, LogOut, Loader2, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp, GripVertical, FileJson
} from 'lucide-react';

const ADMIN_PASSWORD = "28042006";

const AdminPanel = () => {
  const { password } = useParams();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const dataFiles = [
    { id: 'projects', name: 'Projects', file: 'projects.json', icon: <FolderKanban size={18} /> },
    { id: 'paintings', name: 'Paintings', file: 'paintings.json', icon: <Image size={18} /> },
    { id: 'shelf', name: 'Shelf (Books/Movies)', file: 'shelf.json', icon: <BookOpen size={18} /> },
    { id: 'skills', name: 'Skills', file: 'skills.json', icon: <Database size={18} /> },
    { id: 'content', name: 'Hero/Nav', file: 'content.json', icon: <Settings size={18} /> },
  ];

  useEffect(() => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchAllData();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [password]);

  const fetchAllData = async () => {
    setLoading(true);
    const loadedData = {};
    try {
      for (const fileObj of dataFiles) {
        const response = await import(`../../data/${fileObj.file}`);
        loadedData[fileObj.id] = response.default || response;
      }
      setData(loadedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage({ type: 'error', text: 'Error loading data files.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (tabId) => {
    setSaving(true);
    setMessage(null);
    const fileObj = dataFiles.find(f => f.id === tabId);
    
    try {
      const response = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: fileObj.file,
          data: data[tabId]
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Failed to save: ${error.message}` });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Helper to update deep nested state
  const updateNestedState = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((o, k) => o[k] = o[k] || {}, obj);
    target[lastKey] = value;
    return { ...obj };
  };

  // CRUD Operations
  const deleteItem = (tabId, index) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    const newData = { ...data };
    newData[tabId].splice(index, 1);
    setData(newData);
  };

  const startEdit = (index) => {
    setEditingItem({ index, ...JSON.parse(JSON.stringify(data[activeTab][index])) });
  };

  const saveEdit = () => {
    const newData = { ...data };
    const { index, ...newItem } = editingItem;
    if (index === -1) {
      newData[activeTab].push(newItem);
    } else {
      newData[activeTab][index] = newItem;
    }
    setData(newData);
    setEditingItem(null);
  };

  const addNew = () => {
    const activeData = data[activeTab];
    let template = {};
    if (Array.isArray(activeData) && activeData.length > 0) {
      template = JSON.parse(JSON.stringify(activeData[0]));
      // Recursively clear the template
      const clear = (obj) => {
        Object.keys(obj).forEach(key => {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            clear(obj[key]);
          } else if (typeof obj[key] === 'boolean') {
            obj[key] = false;
          } else if (typeof obj[key] === 'number') {
            obj[key] = 0;
          } else {
            obj[key] = "";
          }
        });
      };
      clear(template);
    }
    setEditingItem({ index: -1, ...template });
  };

  // Recursive Field Renderer Component
  const RecursiveField = ({ label, value, path, onChange, depth = 0 }) => {
    const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
    const isArray = Array.isArray(value);
    const isLongText = typeof value === 'string' && (value.length > 50 || label.toLowerCase().includes('description') || label.toLowerCase().includes('about') || label.toLowerCase().includes('review') || label.toLowerCase().includes('thought') || label.toLowerCase().includes('subtitle'));

    if (isObject) {
      return (
        <div className={`flex flex-col gap-4 p-6 rounded-3xl border border-brand-accent/5 bg-white/5 mb-4 ${depth > 0 ? 'ml-4' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent">{label}</span>
            <div className="h-px bg-brand-accent/10 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(value).map(key => (
              <RecursiveField 
                key={key}
                label={key}
                value={value[key]}
                path={`${path}.${key}`}
                onChange={onChange}
                depth={depth + 1}
              />
            ))}
          </div>
        </div>
      );
    }

    if (isArray) {
      return (
        <div className={`flex flex-col gap-4 p-6 rounded-3xl border border-brand-accent/5 bg-white/5 mb-4 ${depth > 0 ? 'ml-4 md:col-span-2' : 'md:col-span-2'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent">{label}</span>
            <button 
              onClick={() => {
                const newItem = typeof value[0] === 'object' ? JSON.parse(JSON.stringify(value[0] || {})) : "";
                onChange(path, [...value, newItem]);
              }}
              className="flex items-center gap-1 text-[10px] uppercase font-bold text-brand-text/40 hover:text-brand-accent transition-colors"
            >
              <Plus size={12} /> Add to {label}
            </button>
          </div>
          
          <div className="space-y-4">
            {value.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-brand-bg/20 p-4 rounded-2xl relative group">
                <div className="flex-1">
                  <RecursiveField 
                    label={`${label} Item ${idx + 1}`}
                    value={item}
                    path={`${path}.${idx}`}
                    onChange={onChange}
                    depth={depth + 1}
                  />
                </div>
                <button 
                  onClick={() => {
                    const newValue = [...value];
                    newValue.splice(idx, 1);
                    onChange(path, newValue);
                  }}
                  className="mt-2 p-2 text-brand-text/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className={`flex flex-col gap-2 ${isLongText ? 'md:col-span-2' : ''}`}>
        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-2">{label}</label>
        {typeof value === 'boolean' ? (
          <button 
            onClick={() => onChange(path, !value)}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${value ? 'bg-green-500' : 'bg-brand-accent/20'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        ) : isLongText ? (
          <textarea 
            rows={4}
            className="w-full bg-brand-bg/50 border border-brand-accent/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-accent transition-colors text-sm leading-relaxed"
            value={value}
            onChange={(e) => onChange(path, e.target.value)}
          />
        ) : (
          <input 
            type={typeof value === 'number' ? 'number' : 'text'}
            className="w-full bg-brand-bg/50 border border-brand-accent/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-accent transition-colors text-sm"
            value={value}
            onChange={(e) => onChange(path, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
          />
        )}
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full glass-heavy p-10 rounded-[2.5rem] text-center shadow-2xl">
          <AlertCircle size={64} className="mx-auto text-brand-accent mb-6 opacity-80" />
          <h1 className="text-3xl font-serif italic mb-4">Access Denied</h1>
          <p className="text-brand-text/60 mb-8">This area is protected. Please enter through the correct link.</p>
          <button onClick={() => navigate('/')} className="w-full py-4 bg-brand-text text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform">Go Back Home</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans flex flex-col md:flex-row transition-colors duration-500">
      
      {/* Sidebar */}
      <aside className="w-full md:w-80 glass-heavy border-r border-brand-accent/10 flex flex-col z-20">
        <div className="p-8 border-b border-brand-accent/5">
          <h1 className="text-2xl font-serif italic font-bold">Aeris Admin</h1>
          <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold mt-1">Smart Content Manager</p>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {dataFiles.map(file => (
            <button
              key={file.id}
              onClick={() => { setActiveTab(file.id); setEditingItem(null); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-medium ${activeTab === file.id ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' : 'hover:bg-brand-accent/10 opacity-70 hover:opacity-100'}`}
            >
              {file.icon}
              {file.name}
              {activeTab === file.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-brand-text/40 hover:text-brand-accent transition-colors border border-brand-accent/10 text-sm font-bold uppercase tracking-widest">
            <LogOut size={16} /> Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen no-scrollbar relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-serif italic mb-2 capitalize">{activeTab}</h2>
            <p className="text-brand-text/40 text-sm">Update {dataFiles.find(f => f.id === activeTab).file} with easy fields</p>
          </div>
          
          <div className="flex gap-4">
            {Array.isArray(data[activeTab]) && (
              <button onClick={addNew} className="flex items-center gap-2 px-8 py-4 bg-brand-text text-white rounded-2xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">
                <Plus size={18} /> Add New
              </button>
            )}
            <button onClick={() => handleSave(activeTab)} disabled={saving} className="flex items-center gap-2 px-8 py-4 bg-brand-accent text-white rounded-2xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? 'Saving...' : 'Save File'}
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-8 p-6 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500 ${message.type === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <p className="font-bold">{message.text}</p>
          </div>
        )}

        {/* List View / Editor */}
        {!editingItem ? (
          <div className="grid grid-cols-1 gap-4">
            {Array.isArray(data[activeTab]) ? (
              data[activeTab].map((item, idx) => (
                <div key={idx} className="glass-heavy p-6 rounded-3xl flex items-center justify-between group hover:border-brand-accent/30 transition-all">
                  <div className="flex items-center gap-6">
                    {(item.image || item.posterUrl || item.coverUrl) && (
                      <img src={item.image || item.posterUrl || item.coverUrl} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{item.title || item.name || item.platform || `Entry ${idx + 1}`}</h3>
                      <p className="text-xs opacity-40 line-clamp-1">{item.shortDescription || item.description || item.url || item.author || "Browse fields to edit content"}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(idx)} className="p-3 bg-brand-accent/10 text-brand-accent rounded-xl hover:bg-brand-accent hover:text-white transition-all">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteItem(activeTab, idx)} className="p-3 bg-red-400/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
                <div className="animate-in fade-in duration-700">
                  <div className="grid grid-cols-1 gap-6">
                    {data[activeTab] && Object.keys(data[activeTab]).map(key => (
                      <RecursiveField 
                        key={key}
                        label={key}
                        value={data[activeTab][key]}
                        path={key}
                        onChange={(path, val) => {
                          const newData = { ...data };
                          const keys = path.split('.');
                          const lastKey = keys.pop();
                          const target = keys.reduce((o, k) => o[k], newData[activeTab]);
                          target[lastKey] = val;
                          setData(newData);
                        }}
                      />
                    ))}
                  </div>
                </div>
            )}
          </div>
        ) : (
          <div className="glass-heavy p-8 md:p-12 rounded-[2.5rem] animate-in zoom-in-95 duration-500">
            <h3 className="text-2xl font-serif italic mb-10 flex items-center gap-4">
              {editingItem.index === -1 ? 'Add New Item' : 'Edit Item Details'}
              <div className="h-px bg-brand-accent/20 flex-1"></div>
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {Object.keys(editingItem).filter(k => k !== 'index').map(key => (
                <RecursiveField 
                  key={key}
                  label={key}
                  value={editingItem[key]}
                  path={key}
                  onChange={(path, val) => {
                    const newEdit = { ...editingItem };
                    const keys = path.split('.');
                    const lastKey = keys.pop();
                    const target = keys.reduce((o, k) => o[k], newEdit);
                    target[lastKey] = val;
                    setEditingItem(newEdit);
                  }}
                />
              ))}
            </div>

            <div className="flex gap-4 mt-12 pt-8 border-t border-brand-accent/5">
              <button onClick={saveEdit} className="flex-1 py-4 bg-brand-text text-white rounded-2xl font-bold hover:scale-[1.01] active:scale-[0.99] transition-all">Save Changes</button>
              <button onClick={() => setEditingItem(null)} className="flex-1 py-4 bg-brand-accent/10 text-brand-accent rounded-2xl font-bold hover:bg-brand-accent/20 transition-all">Discard</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
