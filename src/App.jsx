
import './App.css'
import FileUpload from './components/FileUpload'
import UploadedImages from './components/UploadedImages'

function App() {
 
  return (
    <div className='mt-10' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div style={{ width: '50%' }}>
        <FileUpload />
      </div>
      <div style={{ width: '80%' }}>
        <UploadedImages />
      </div>
    </div>
  )
}

export default App
