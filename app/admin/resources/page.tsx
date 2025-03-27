'use client';
import React from 'react';
import { useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { Resource } from '@/lib/supabase-schema';
import { TABLES } from '@/lib/supabase';
import { uploadPDF, deleteFile } from '@/lib/supabase-storage';
import Button from '@/components/ui/Button';
import styles from '../../../styles/admin/success-stories.module.css';

interface LocalResource {
  id: string;
  name: string;
  pdf_url: string;
  description?: string;
  created_at: string;
}

export default function ResourcesAdmin() {
  const { data: resources, loading, error, fetchData, addRecord, updateRecord, deleteRecord } = useSupabase<LocalResource>(TABLES.RESOURCES);

  const [selectedForDelete, setSelectedForDelete] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<LocalResource | null>(null);
  const [formState, setFormState] = useState({ name: '', description: '', file: null as File | null });

  const openAddModal = () => {
    setIsAddModalOpen(true);
    setFormState({ name: '', description: '', file: null });
  };

  const openEditModal = (resource: LocalResource) => {
    setIsEditModalOpen(true);
    setCurrentResource(resource);
    setFormState({ name: resource.name, description: resource.description || '', file: null });
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentResource(null);
    setFormState({ name: '', description: '', file: null });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormState((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isAddModalOpen) {
        // For new resource, PDF is required
        if (!formState.file) {
          throw new Error('Please select a PDF file');
        }
        const pdfUrl = await uploadPDF(formState.file);
        await addRecord({
          name: formState.name,
          description: formState.description,
          pdf_url: pdfUrl,
        });
      } else if (isEditModalOpen && currentResource) {
        // For editing, only upload new PDF if file is selected
        const updatedFields: Partial<Resource> = {
          name: formState.name,
          description: formState.description,
        };

        if (formState.file) {
          // If there's an existing PDF, delete it first
          if (currentResource.pdf_url) {
            try {
              await deleteFile(currentResource.pdf_url);
            } catch (err) {
              console.error('Error deleting old PDF:', err);
            }
          }
          // Upload new PDF
          const pdfUrl = await uploadPDF(formState.file);
          updatedFields.pdf_url = pdfUrl;
        }

        await updateRecord(currentResource.id, updatedFields);
      }

      await fetchData();
      closeModal();
    } catch (err) {
      console.error('Error saving resource:', err);
      alert(err instanceof Error ? err.message : 'Error saving resource');
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedForDelete((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedForDelete.size === 0) return;
    try {
      for (const id of Array.from(selectedForDelete)) {
        const resource = resources.find((r) => r.id === id);
        if (resource?.pdf_url) {
          await deleteFile(resource.pdf_url);
        }
        await deleteRecord(id);
      }
      await fetchData();
      setSelectedForDelete(new Set());
    } catch (err) {
      console.error('Error deleting selected resources:', err);
    }
  };

  const sortedResources = React.useMemo(() => {
    return [...(resources || [])].sort((a, b) => {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  }, [resources]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Resources Management</h1>
        <div className={styles.actions}>
          <Button variant="outline" onClick={openAddModal}>Add New Resource</Button>
          <Button variant="outline" onClick={handleDeleteSelected} disabled={selectedForDelete.size === 0}>
            Delete Selected
          </Button>
        </div>
      </div>

      {loading ? (
        <p className={styles.loading}>Loading resources...</p>
      ) : error ? (
        <p className={styles.error}>Error loading resources.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.noData}>No resources found. Add your first resource.</td>
              </tr>
            ) : (
              sortedResources.map((resource) => (
                <tr key={resource.id} className={selectedForDelete.has(resource.id) ? styles.selectedRow : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedForDelete.has(resource.id)}
                      onChange={() => toggleSelect(resource.id)}
                    />
                  </td>
                  <td>{resource.name}</td>
                  <td>{resource.description || 'No description'}</td>
                  <td>
                    {resource.pdf_url ? (
                      <a href={resource.pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        View PDF
                      </a>
                    ) : (
                      'No file'
                    )}
                  </td>
                  <td>
                    <Button variant="outline" onClick={() => openEditModal(resource)}>Edit</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {(isAddModalOpen || isEditModalOpen) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{isAddModalOpen ? 'Add New Resource' : 'Edit Resource'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>File</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  accept=".pdf"
                />
              </div>
              <div className={styles.modalActions}>
                <Button variant="outline" onClick={closeModal}>Cancel</Button>
                <Button variant="outline" type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}