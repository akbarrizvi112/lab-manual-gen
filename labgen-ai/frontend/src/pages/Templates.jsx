import React, { useState, useEffect } from 'react';
import { Plus, LayoutTemplate, MoreVertical, Code, Settings, Save, Upload } from 'lucide-react';
import axios from 'axios';

const Templates = () => {
    const [templates, setTemplates] = useState([]);
    const [isBuilderOpen, setIsBuilderOpen] = useState(false);
    const [builderState, setBuilderState] = useState({ name: 'Untitled Template', html: '<p>Document starts here...</p>', description: '' });
    const [loadingTemplates, setLoadingTemplates] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await axios.get('/templates');
                setTemplates(res.data);
            } catch (err) {
                console.error("Failed fetching templates");
            } finally {
                setLoadingTemplates(false);
            }
        };
        fetchTemplates();
    }, []);

    const handleSaveTemplate = async () => {
        try {
            const payload = { templateName: builderState.name, templateHtml: builderState.html, description: builderState.description };
            const res = await axios.post('/templates', payload);
            setTemplates([res.data, ...templates]);
            setIsBuilderOpen(false);
            alert("Template created successfully as Draft!");
        } catch (error) {
            alert("Error saving: " + (error.response?.data?.msg || "Server Error"));
        }
    };

    return (
        <div className="animate-fade-in w-full h-full flex flex-col pt-2 max-w-7xl mx-auto">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Templates</h1>
                    <p className="text-gray-500 mt-1">Manage and create custom lab manual structures.</p>
                </div>
                {!isBuilderOpen && (
                    <button onClick={() => setIsBuilderOpen(true)} className="btn-primary flex items-center gap-2 shadow-lg shadow-primary-500/30 ring-4 ring-primary-50">
                        <Plus size={20} /> New Template
                    </button>
                )}
            </div>

            {!isBuilderOpen ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1">
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex flex-col gap-2">
                            <span className="font-semibold text-gray-900 border-b-2 border-primary-500 pb-1">My Templates ({templates.length})</span>
                            <span className="text-gray-500 hover:text-gray-900 cursor-pointer py-1">Community Templates</span>
                            <span className="text-gray-500 hover:text-gray-900 cursor-pointer py-1">Department Shared</span>
                            <span className="text-gray-500 hover:text-gray-900 cursor-pointer py-1">Archived</span>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loadingTemplates ? (
                                <p className="text-gray-500 col-span-full">Loading templates...</p>
                            ) : templates.length === 0 ? (
                                <p className="text-gray-500 col-span-full">No templates found. Create your first one!</p>
                            ) : (
                                templates.map((template, i) => (
                                    <div key={template._id || i} className="glass-card hover:-translate-y-1 transition-all duration-300 cursor-pointer group hover:border-primary-500 hover:shadow-xl hover:shadow-primary-500/10 p-5 border border-gray-200">
                                        <div className="h-40 bg-gray-50 rounded-lg mb-4 border border-gray-100 relative overflow-hidden flex items-center justify-center">
                                            <LayoutTemplate size={48} className="text-gray-300" />
                                            <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded text-xs font-bold text-gray-600 shadow-sm border border-gray-100">
                                                {template.status || 'draft'}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-900 line-clamp-1">{template.templateName}</h3>
                                                <p className="text-sm text-gray-500 mt-1">Edited {new Date(template.updatedAt).toLocaleDateString()}</p>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col glass-card p-0 overflow-hidden border border-gray-200">
                    <div className="border-b border-gray-200 bg-gray-50 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400">Builder</span>
                            <span>›</span>
                            <input
                                type="text"
                                className="bg-transparent border-none text-xl font-bold text-gray-900 focus:ring-0 p-0"
                                value={builderState.name}
                                onChange={e => setBuilderState({ ...builderState, name: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-3">
                            <button className="btn-secondary" onClick={() => setIsBuilderOpen(false)}>Cancel</button>
                            <button className="btn-primary flex items-center gap-2 shadow-lg shadow-primary-500/30" onClick={handleSaveTemplate}>
                                <Save size={18} /> Publish Content
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex min-h-[500px]">
                        <div className="w-64 border-r border-gray-200 bg-white p-4 space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sections</h3>
                                <div className="space-y-2">
                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium text-gray-700 cursor-move hover:border-primary-500 transition-colors">Header Block</div>
                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium text-gray-700 cursor-move hover:border-primary-500 transition-colors">Objectives (AI Target)</div>
                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium text-gray-700 cursor-move hover:border-primary-500 transition-colors">Materials Box</div>
                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium text-gray-700 cursor-move hover:border-primary-500 transition-colors">Procedure Markdown</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
                            <div className="max-w-3xl mx-auto bg-white min-h-full shadow-lg border border-gray-200 rounded-lg p-8">
                                <div className="border border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center">
                                    <Code size={40} className="text-gray-300 mb-4" />
                                    <h3 className="text-lg font-bold text-gray-900">Document Canvas</h3>
                                    <p className="text-gray-500 text-sm mt-1 max-w-sm">Drag and drop sections from the left panel to construct your template layout.</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-72 border-l border-gray-200 bg-white p-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1"><Settings size={14} /> Properties</h3>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-sm text-gray-500 text-center">Select an element to view its properties.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Templates;
