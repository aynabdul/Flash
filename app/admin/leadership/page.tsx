'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useSupabase } from '@/hooks/useSupabase';
import { TABLES } from '@/lib/supabase';
import { Leadership } from '@/lib/supabase-schema';
import { uploadImage, deleteFile } from '@/lib/supabase-storage';
import styles from '../../../styles/admin/leadership.module.css';

export default function LeadershipAdminPage() {
  const router = useRouter();
  const { data: leaders, loading, error, fetchData, deleteRecord, addRecord, updateRecord } = useSupabase<Leadership>(TABLES.LEADERSHIP);

  // For multi-selection deletion
  const [selectedForDelete, setSelectedForDelete] = useState<Set<string>>(new Set());

  // For adding/editing a leader
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLeader, setCurrentLeader] = useState<Leadership | null>(null);
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Open add leader modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setFullName('');
    setDesignation('');
    setUploadFile(null);
  };

  // Open edit leader modal
  const openEditModal = (leader: Leadership) => {
    setIsEditModalOpen(true);
    setCurrentLeader(leader);
    setFullName(leader.full_name);
    setDesignation(leader.designation);
    setUploadFile(null);
  };

  // Close modal
  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentLeader(null);
    setFullName('');
    setDesignation('');
    setUploadFile(null);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  // Handle form submission for adding/editing a leader
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!fullName || !designation) && !uploadFile) return;

    setUploading(true);
    setUploadError(null);

    try {
      let imgUrl = currentLeader?.img_url || '';

      // Upload new image if a file is selected
      if (uploadFile) {
        imgUrl = await uploadImage(uploadFile, 'leadership');
      }

      if (isAddModalOpen) {
        // Add new leader
        await addRecord({
          full_name: fullName,
          designation: designation,
          img_url: imgUrl,
        });
      } else if (isEditModalOpen && currentLeader) {
        // Update existing leader
        await updateRecord(currentLeader.id, {
          full_name: fullName,
          designation: designation,
          img_url: imgUrl,
        });
      }

      // Refresh the leadership data
      await fetchData();
      closeModal();
    } catch (err: any) {
      console.error('Error saving leader:', err);
      setUploadError(err.message || 'Failed to save leader.');
    } finally {
      setUploading(false);
    }
  };

  // Toggle selection for deletion
  const toggleSelect = (id: string) => {
    setSelectedForDelete((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Delete selected leaders
  const handleDeleteSelected = async () => {
    if (selectedForDelete.size === 0) return;
    try {
      for (const id of Array.from(selectedForDelete)) {
        const leader = leaders.find((l) => l.id === id);
        if (leader && leader.img_url) {
          try {
            await deleteFile(leader.img_url);
          } catch (err) {
            console.error('Error deleting file from storage:', err);
            // Continue even if storage deletion fails
          }
        }
        await deleteRecord(id);
      }
      await fetchData();
      setSelectedForDelete(new Set());
    } catch (err: any) {
      console.error('Error deleting selected leaders:', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Leadership Management</h1>
        <div className={styles.actions}>
          <Button variant="outline" onClick={() => router.push('/admin')}>Back to Dashboard</Button>
          <Button variant="outline" onClick={openAddModal}>Add New Leader</Button>
          <Button variant="outline" onClick={handleDeleteSelected} disabled={selectedForDelete.size === 0}>
            Delete Selected
          </Button>
        </div>
      </div>

      {loading ? (
        <p className={styles.loading}>Loading leadership data...</p>
      ) : error ? (
        <p className={styles.error}>Error loading leadership data.</p>
      ) : (
        <div className={styles.grid}>
          {leaders.length === 0 ? (
            <p>No leadership members found. Add your first member.</p>
          ) : (
            leaders.map((leader) => (
              <div key={leader.id} className={styles.card} onClick={() => toggleSelect(leader.id)}>
                <div className={styles.imageWrapper}>
                  {leader.img_url ? (
                    <Image
                      src={decodeURIComponent(leader.img_url)}
                      alt={leader.full_name || 'Leadership image'}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className={styles.noImage}>No image</div>
                  )}
                  {selectedForDelete.has(leader.id) && <div className={styles.selectedOverlay}>Selected</div>}
                </div>
                <p className={styles.name}>{leader.full_name || 'No name'}</p>
                <p className={styles.designation}>{leader.designation || 'No designation'}</p>
                <Button variant="outline" onClick={() => openEditModal(leader)}>
                  Edit
                </Button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{isAddModalOpen ? 'Add New Leader' : 'Edit Leader'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {uploadError && <p className={styles.error}>{uploadError}</p>}
              <div className={styles.modalActions}>
                <Button variant="outline" onClick={closeModal}>Cancel</Button>
                <Button variant="outline" type="submit" disabled={uploading}>
                  {uploading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}