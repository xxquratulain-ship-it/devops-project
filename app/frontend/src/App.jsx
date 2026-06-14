import { useState, useEffect } from 'react'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    fetch('/api/tasks').then(r => r.json()).then(setTasks)
  }, [])

  const addTask = async () => {
    if (!newTask.trim()) return
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask })
    })
    const task = await res.json()
    setTasks([...tasks, task])
    setNewTask('')
  }

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div style={{maxWidth:'600px',margin:'40px auto',fontFamily:'sans-serif',padding:'20px'}}>
      <h1 style={{color:'#0066cc'}}>🚀 TaskFlow — DevOps Project</h1>
      <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          style={{flex:1,padding:'10px',borderRadius:'4px',border:'1px solid #ccc'}}
        />
        <button onClick={addTask}
          style={{padding:'10px 20px',background:'#0066cc',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
          Add
        </button>
      </div>
      {tasks.map(t => (
        <div key={t.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
          padding:'12px',marginBottom:'8px',background:'#f5f5f5',borderRadius:'6px',border:'1px solid #ddd'}}>
          <span>{t.title} — <b style={{color: t.status==='done' ? 'green' : 'orange'}}>{t.status}</b></span>
          <button onClick={() => deleteTask(t.id)}
            style={{background:'#cc0000',color:'white',border:'none',borderRadius:'4px',
              cursor:'pointer',padding:'6px 12px'}}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
