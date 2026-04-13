import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Camera, UploadCloud, Edit3, Zap } from 'lucide-react'
import { createWorker } from 'tesseract.js'
import { useAppData } from '../context/AppDataContext'

const ScanFlow = () => {
  const [category, setCategory] = useState('medicine')
  const [productName, setProductName] = useState('')
  const [imageSrc, setImageSrc] = useState(null)
  const [scannedData, setScannedData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState('camera')
  const [manualExpiry, setManualExpiry] = useState('')
  const [manualQty, setManualQty] = useState(1)
  const [savedMessage, setSavedMessage] = useState('')
  const { addProduct } = useAppData()
  
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const categories = ['medicine', 'grocery', 'cosmetics', 'other']

  useEffect(() => {
    let isMounted = true

    const initCamera = async () => {
      if (method !== 'camera') return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false
        })

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        streamRef.current = stream
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream
        }
      } catch (err) {
        console.error('Camera access error:', err)
      }
    }

    initCamera()

    return () => {
      isMounted = false
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [method])

  const capture = useCallback(() => {
    const canvas = canvasRef.current
    if (webcamRef.current && canvas && webcamRef.current.video?.videoWidth > 0) {
      canvas.width = webcamRef.current.video.videoWidth
      canvas.height = webcamRef.current.video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(webcamRef.current.video, 0, 0)
      setImageSrc(canvas.toDataURL())
    }
  }, [])

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageSrc(reader.result)
    reader.readAsDataURL(file)
  }

  const scanOCR = async () => {
    if (!imageSrc) return
    setLoading(true)
    try {
      const worker = await createWorker('eng')
      const { data: { text } } = await worker.recognize(imageSrc)
      await worker.terminate()

      const expiryPatterns = [
        new RegExp('(Up to|Valid till|Best before|Expiry|Exp)\\s*[:.-]?\\s*(\\d{1,2}[-/.]\\d{1,2}[-/.]\\d{2,4})', 'i'),
        new RegExp('(Up to|Valid till|Best before|Expiry|Exp)\\s*[:.-]?\\s*(\\d{4}[-/.]\\d{1,2}[-/.]\\d{1,2})', 'i'),
        new RegExp('(Up to|Valid till|Best before|Expiry|Exp)\\s*[:.-]?\\s*(\\d{1,2}[-/.]\\d{4})', 'i'),
        /(\d{1,2}[-/]\d{1,2}[-/]\d{4})/,
        /(\d{1,2}[.-]\d{1,2}[.-]\d{2,4})/,
        /(\d{4}[-/.]\d{1,2}[-/.]\d{1,2})/,
        /(\d{1,2}[-/.]\d{4})/
      ]
      
      let expiry = null
      for (const pattern of expiryPatterns) {
        const match = text.match(pattern)
        if (match) {
          expiry = match[2] || match[1] || match[0]
          break
        }
      }

      setScannedData({
        text,
        category,
        expiry,
        productName: productName.trim() || text.split('\n')[0]?.trim() || 'Unknown'
      })
    } catch (err) {
      console.error('OCR Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveFromScan = () => {
    if (!scannedData) return
    addProduct({
      name: scannedData.productName || 'Unknown Product',
      cat: scannedData.category ? scannedData.category.charAt(0).toUpperCase() + scannedData.category.slice(1) : 'Other',
      date: scannedData.expiry || new Date().toISOString().slice(0, 10),
      qty: 1,
    })
    setSavedMessage('Saved to inventory.')
    setTimeout(() => setSavedMessage(''), 1200)
  }

  const saveManualEntry = () => {
    if (!productName.trim() || !manualExpiry) return
    addProduct({
      name: productName.trim(),
      cat: category.charAt(0).toUpperCase() + category.slice(1),
      date: manualExpiry,
      qty: Number(manualQty || 1),
    })
    setSavedMessage('Manual entry added to inventory.')
    setTimeout(() => setSavedMessage(''), 1200)
    setProductName('')
    setManualExpiry('')
    setManualQty(1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Scan Product</h1>
        <p className="text-slate-500">Use OCR to scan products or add them manually</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-6">Step 1: Choose Details</h3>
        <div className="flex flex-col md:flex-row gap-4">
           <select
             value={category}
             onChange={(e) => setCategory(e.target.value)}
             className="panel-input flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50"
           >
             {categories.map((cat) => (
               <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
             ))}
           </select>
           <input
             type="text"
             value={productName}
             onChange={(e) => setProductName(e.target.value)}
             className="panel-input flex-[2] p-3 rounded-xl border border-slate-200 bg-slate-50 min-w-[50%]"
             placeholder="Product name (optional, helps OCR fallback)"
           />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-6">Step 2: Choose Scanning Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => setMethod('camera')}
            className={`flex flex-col items-center justify-center p-8 rounded-xl transition-colors ${method === 'camera' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
          >
            <Camera className="w-8 h-8 mb-4" />
            <span className="font-bold">Camera</span>
          </button>
          <button 
            onClick={() => setMethod('upload')}
            className={`flex flex-col items-center justify-center p-8 rounded-xl transition-colors ${method === 'upload' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
          >
            <UploadCloud className="w-8 h-8 mb-4" />
            <span className="font-bold">Upload Image</span>
          </button>
          <button 
            onClick={() => setMethod('manual')}
            className={`flex flex-col items-center justify-center p-8 rounded-xl transition-colors ${method === 'manual' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
          >
            <Edit3 className="w-8 h-8 mb-4" />
            <span className="font-bold">Manual Entry</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-6 flex justify-between items-center">
            <span>Step 3: Capture and Scan</span>
            {imageSrc && (
                <button onClick={() => setImageSrc(null)} className="text-sm font-normal text-blue-600 hover:underline">Clear Image</button>
            )}
        </h3>
        
        {!imageSrc ? (
            <div className="bg-slate-50 rounded-xl w-full border border-slate-200 flex flex-col items-center justify-center p-6 min-h-[300px]">
              {method === 'camera' && (
                  <div className="w-full flex flex-col items-center gap-4">
                     <video ref={webcamRef} autoPlay className="rounded-xl w-full max-w-lg object-cover" />
                     <canvas ref={canvasRef} className="hidden" />
                    <button onClick={capture} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700">
                        <Camera className="w-5 h-5"/> Capture
                     </button>
                  </div>
              )}
              {method === 'upload' && (
                  <div className="w-full flex flex-col items-center gap-4 py-12">
                     <UploadCloud className="w-12 h-12 text-slate-400 mb-2"/>
                    <label className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-blue-700">
                        Select File
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                     </label>
                  </div>
              )}
               {method === 'manual' && (
                  <div className="w-full max-w-lg mx-auto py-4 space-y-3">
                     <input
                       type="text"
                       placeholder="Product name"
                       className="panel-input w-full p-3"
                       value={productName}
                       onChange={(e) => setProductName(e.target.value)}
                     />
                     <input
                       type="date"
                       className="panel-input w-full p-3"
                       value={manualExpiry}
                       onChange={(e) => setManualExpiry(e.target.value)}
                     />
                     <input
                       type="number"
                       min="1"
                       className="panel-input w-full p-3"
                       value={manualQty}
                       onChange={(e) => setManualQty(e.target.value)}
                     />
                     <button onClick={saveManualEntry} className="w-full bg-blue-600 text-white rounded-xl py-3 hover:bg-blue-700">Save Manual Entry</button>
                  </div>
              )}
            </div>
        ) : (
            <div className="space-y-6">
                <img src={imageSrc} alt="Captured" className="rounded-xl max-h-72 w-full object-contain bg-slate-50 border border-slate-200" />
                <button onClick={scanOCR} disabled={loading} className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50">
                    <Zap className={loading ? 'animate-spin' : ''} /> {loading ? 'Scanning...' : 'Extract Expiry Date'}
                </button>
            </div>
        )}
      </div>

       {scannedData && (
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6 shadow-sm mt-6">
          <h3 className="text-xl font-bold mb-4 text-emerald-800">Scan Complete!</h3>
          <div className="space-y-2 text-slate-800">
            <p><strong>Product:</strong> {scannedData.productName}</p>
            <p><strong>Category:</strong> {scannedData.category}</p>
            <p><strong>Expiry:</strong> <span className="font-mono bg-white px-2 py-1 rounded border border-emerald-200">{scannedData.expiry || 'Not found (add manually)'}</span></p>
          </div>
          <button onClick={saveFromScan} className="mt-6 w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700">
            Save to Inventory & Set Reminders
          </button>
        </div>
      )}

      {savedMessage && <p className="text-sm text-emerald-700">{savedMessage}</p>}
    </div>
  )
}

export default ScanFlow
