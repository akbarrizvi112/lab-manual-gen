import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Upload, FileText, CheckCircle2, ArrowRight, ArrowLeft, Loader2, X, LayoutTemplate, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const STEPS = ['Choose Template', 'Set Topic', 'Generate'];

const Generator = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);

    // Template Selection State
    const [savedTemplates, setSavedTemplates] = useState([]);
    const [loadingTemplates, setLoadingTemplates] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(null); // { _id, templateName, formatSchema }
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({ title: '', topic: '', level: 'Undergraduate', details: '' });

    // Load saved templates on mount
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await axios.get('/templates');
                // Only show templates that have a detected format schema (PDF-based)
                setSavedTemplates(res.data.filter(t => t.formatSchema));
            } catch { /* ignore */ }
            finally { setLoadingTemplates(false); }
        };
        fetchTemplates();
    }, []);

    // ─── Upload & Analyze New PDF ────────────────────────────────────────────
    const handleAnalyze = async () => {
        if (!uploadedFile) return alert('Please drop a PDF lab manual first.');
        setAnalyzing(true);
        try {
            const payload = new FormData();
            payload.append('pdf', uploadedFile);
            const res = await axios.post('/ai/analyze-pdf', payload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Auto-select the newly created template
            setSelectedTemplate({ _id: res.data.templateId, templateName: res.data.templateName, formatSchema: res.data.formatSchema });
            setSavedTemplates(prev => [{ _id: res.data.templateId, templateName: res.data.templateName, formatSchema: res.data.formatSchema, status: 'published' }, ...prev]);
            setUploadedFile(null);
            setCurrentStep(1);
        } catch (err) {
            alert('Analysis failed: ' + (err.response?.data?.msg || 'Server error'));
        } finally {
            setAnalyzing(false);
        }
    };

    // ─── Select an Existing Template ────────────────────────────────────────
    const handleSelectTemplate = (template) => {
        setSelectedTemplate(template);
        setCurrentStep(1);
    };

    // ─── Generate the Manual ─────────────────────────────────────────────────
    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.topic) return alert('Title and Topic are required.');
        setCurrentStep(2);
        setIsGenerating(true);
        try {
            const payload = {
                ...formData,
                templateId: selectedTemplate?._id,
                formatSchema: selectedTemplate?.formatSchema || null,
            };
            const res = await axios.post('/ai/generate', payload);
            setIsGenerating(false);
            navigate('/preview', {
                state: { generatedData: res.data.data, title: formData.title, formatSchema: selectedTemplate?.formatSchema }
            });
        } catch (err) {
            setIsGenerating(false);
            setCurrentStep(1);
            alert('Generation failed: ' + (err.response?.data?.msg || 'Server error'));
        }
    };

    return (
        <div className="animate-fade-in w-full max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">AI Manual Generator</h1>
                <p className="text-gray-500 mt-1">Select a saved PDF template or upload a new one, then describe your experiment.</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-3">
                {STEPS.map((label, i) => (
                    <React.Fragment key={i}>
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                                ${i < currentStep ? 'bg-green-500 text-white' : i === currentStep ? 'bg-primary-600 text-white ring-4 ring-primary-100' : 'bg-gray-200 text-gray-500'}`}>
                                {i < currentStep ? <CheckCircle2 size={16} /> : i + 1}
                            </div>
                            <span className={`text-sm font-semibold ${i === currentStep ? 'text-primary-700' : 'text-gray-400'}`}>{label}</span>
                        </div>
                        {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 transition-all duration-500 ${i < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />}
                    </React.Fragment>
                ))}
            </div>

            {/* ── Step 0: Choose Template ──────────────────────────────── */}
            {currentStep === 0 && (
                <div className="space-y-6">

                    {/* Saved Templates */}
                    {!loadingTemplates && savedTemplates.length > 0 && (
                        <div className="glass-card border border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Your Saved Templates</h2>
                            <p className="text-sm text-gray-500 mb-4">Click a template to use it for the new manual.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {savedTemplates.map(t => (
                                    <button key={t._id} onClick={() => handleSelectTemplate(t)}
                                        className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:border-primary-500 hover:shadow-md
                                            ${selectedTemplate?._id === t._id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white'}`}>
                                        <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                                            <LayoutTemplate size={24} className="text-primary-600" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-gray-900 truncate">{t.templateName}</p>
                                            <p className="text-xs text-gray-500">{t.formatSchema?.sections?.length || 0} sections detected</p>
                                            <p className="text-xs text-green-600 font-medium mt-0.5">✓ Ready to use</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <button className="mt-5 btn-secondary text-sm flex items-center gap-2" onClick={() => setCurrentStep(1)}>
                                Skip — Use Default Template <ArrowRight size={14} />
                            </button>
                        </div>
                    )}

                    {/* Upload New PDF */}
                    <div className="glass-card border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-1">Upload a New PDF Lab Manual</h2>
                        <p className="text-sm text-gray-500 mb-4">Gemini will analyze the format and save it as a reusable template for all your future manuals.</p>

                        <div
                            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f?.type === 'application/pdf') setUploadedFile(f); else alert('PDF only'); }}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200
                                ${isDragging ? 'border-primary-500 bg-primary-50' : uploadedFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'}`}
                        >
                            {uploadedFile ? (
                                <>
                                    <FileText size={28} className="text-green-600 mb-2" />
                                    <p className="font-bold text-green-700">{uploadedFile.name}</p>
                                    <p className="text-sm text-green-600">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                                    <button className="mt-3 text-red-500 text-sm flex items-center gap-1" onClick={e => { e.stopPropagation(); setUploadedFile(null); }}>
                                        <X size={14} /> Remove
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Upload size={28} className="text-primary-500 mb-2" />
                                    <p className="font-bold text-gray-700">Drag & drop a PDF here</p>
                                    <p className="text-sm text-gray-400 mt-1">or click to browse</p>
                                </>
                            )}
                            <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={e => setUploadedFile(e.target.files[0])} />
                        </div>

                        {uploadedFile && (
                            <button className="mt-4 w-full btn-primary flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30" onClick={handleAnalyze} disabled={analyzing}>
                                {analyzing ? <><Loader2 size={18} className="animate-spin" /> Analyzing PDF with Gemini...</> : <><Sparkles size={18} /> Analyze & Save as Template</>}
                            </button>
                        )}

                        {loadingTemplates && <p className="text-sm text-gray-400 mt-3">Loading saved templates...</p>}
                        {!loadingTemplates && savedTemplates.length === 0 && !uploadedFile && (
                            <div className="mt-5 btn-secondary text-sm text-center cursor-pointer" onClick={() => setCurrentStep(1)}>
                                Skip — Generate with default format
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Step 1: Enter Topic ──────────────────────────────────── */}
            {currentStep === 1 && (
                <form onSubmit={handleGenerate} className="space-y-6">
                    <div className="glass-card border border-gray-200 space-y-5">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Describe Your New Experiment</h2>
                            {selectedTemplate ? (
                                <div className="mt-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2">
                                    <CheckCircle2 size={16} /> Using template: <strong>{selectedTemplate.templateName}</strong>
                                    <button type="button" className="ml-auto text-gray-400 hover:text-gray-600" onClick={() => { setSelectedTemplate(null); setCurrentStep(0); }}>
                                        <RefreshCw size={14} />
                                    </button>
                                </div>
                            ) : (
                                <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded px-3 py-2 mt-2">Using Gemini default format. <button type="button" className="underline font-medium" onClick={() => setCurrentStep(0)}>Choose a template</button></p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lab Manual Title <span className="text-red-500">*</span></label>
                                <input type="text" className="input-field" placeholder="e.g. Ohm's Law Verification" required
                                    value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Core Topic / Concept <span className="text-red-500">*</span></label>
                                <input type="text" className="input-field" placeholder="e.g. Electrical Resistance & Voltage" required
                                    value={formData.topic} onChange={e => setFormData({ ...formData, topic: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Academic Level</label>
                            <select className="input-field bg-white" value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })}>
                                <option>Freshman Year</option>
                                <option>Sophomore Level</option>
                                <option>Junior Level</option>
                                <option>Undergraduate</option>
                                <option>Senior Capstone</option>
                                <option>Graduate Level</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Instructions</label>
                            <textarea className="input-field min-h-[120px] resize-y"
                                placeholder="e.g. Include safety protocols, specific equipment, grading criteria..."
                                value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button type="button" className="btn-secondary flex items-center gap-2" onClick={() => setCurrentStep(0)}>
                            <ArrowLeft size={16} /> Back
                        </button>
                        <button type="submit" className="btn-primary flex items-center gap-2 shadow-lg shadow-primary-500/30 px-8">
                            <Sparkles size={18} /> Generate Lab Manual <ArrowRight size={16} />
                        </button>
                    </div>
                </form>
            )}

            {/* ── Step 2: Generating ────────────────────────────────────── */}
            {currentStep === 2 && (
                <div className="glass-card border border-gray-200 flex flex-col items-center justify-center py-20 text-center space-y-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center">
                            <Sparkles size={48} className="text-primary-500" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Gemini AI is writing your manual...</h3>
                        <p className="text-gray-500 mt-2">Generating rich academic content for <strong>"{formData.title}"</strong></p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                        <p>✓ Template format loaded</p>
                        <p>✓ Prompt constructed</p>
                        <p className="text-primary-600 font-medium flex items-center gap-2 justify-center"><Loader2 size={14} className="animate-spin" /> Generating sections...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Generator;
