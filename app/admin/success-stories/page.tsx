'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useSupabase } from '@/hooks/useSupabase';
import { TABLES } from '@/lib/supabase';
import { SuccessStory } from '@/lib/supabase-schema';
import styles from '../../../styles/admin/success-stories.module.css';

export default function SuccessStoriesAdminPage() {
  const router = useRouter();
  const { data: stories, loading, error, fetchData, deleteRecord, addRecord, updateRecord } = useSupabase<SuccessStory>(TABLES.SUCCESS_STORIES);

  // For multi-selection deletion
  const [selectedForDelete, setSelectedForDelete] = useState<Set<string>>(new Set());

  // For adding/editing a story
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState<SuccessStory | null>(null);
  const [name, setName] = useState('');
  const [circumstances, setCircumstances] = useState('');
  const [engagedOn, setEngagedOn] = useState('');
  const [releasedOn, setReleasedOn] = useState('');
  const [status, setStatus] = useState('');

  // Open add story modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setName('');
    setCircumstances('');
    setEngagedOn('');
    setReleasedOn('');
    setStatus('');
  };

  // Open edit story modal
  const openEditModal = (story: SuccessStory) => {
    setIsEditModalOpen(true);
    setCurrentStory(story);
    setName(story.name);
    setCircumstances(story.circumstances);
    setEngagedOn(story.engaged_on);
    setReleasedOn(story.released_on);
    setStatus(story.status);
  };

  // Close modal
  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentStory(null);
    setName('');
    setCircumstances('');
    setEngagedOn('');
    setReleasedOn('');
    setStatus('');
  };

  // Handle form submission for adding/editing a story
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !circumstances || !engagedOn || !releasedOn || !status) return;

    try {
      if (isAddModalOpen) {
        // Add new story
        await addRecord({
          name,
          circumstances,
          engaged_on: engagedOn,
          released_on: releasedOn,
          status,
        });
      } else if (isEditModalOpen && currentStory) {
        // Update existing story
        await updateRecord(currentStory.id, {
          name,
          circumstances,
          engaged_on: engagedOn,
          released_on: releasedOn,
          status,
        });
      }

      // Refresh the stories data
      await fetchData();
      closeModal();
    } catch (err: Error | unknown) {
      console.error('Error saving story:', err);
      if (err instanceof Error) {
        console.error(err.message);
      }
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

  // Delete selected stories
  const handleDeleteSelected = async () => {
    if (selectedForDelete.size === 0) return;
    try {
      for (const id of Array.from(selectedForDelete)) {
        await deleteRecord(id);
      }
      await fetchData();
      setSelectedForDelete(new Set());
    } catch (err: Error | unknown) {
      console.error('Error deleting selected stories:', err);
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Success Stories Management</h1>
        <div className={styles.actions}>
          <Button variant="outline" onClick={() => router.push('/admin')}>Back to Dashboard</Button>
          <Button variant="outline" onClick={openAddModal}>Add New Story</Button>
          <Button variant="outline" onClick={handleDeleteSelected} disabled={selectedForDelete.size === 0}>
            Delete Selected
          </Button>
        </div>
      </div>

      {loading ? (
        <p className={styles.loading}>Loading success stories...</p>
      ) : error ? (
        <p className={styles.error}>Error loading success stories.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Circumstances</th>
              <th>Engaged On</th>
              <th>Released On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stories.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.noData}>No success stories found. Add your first story.</td>
              </tr>
            ) : (
              stories.map((story) => (
                <tr key={story.id} className={selectedForDelete.has(story.id) ? styles.selectedRow : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedForDelete.has(story.id)}
                      onChange={() => toggleSelect(story.id)}
                    />
                  </td>
                  <td>{story.name}</td>
                  <td>{story.circumstances}</td>
                  <td>{new Date(story.engaged_on).toLocaleDateString()}</td>
                  <td>{new Date(story.released_on).toLocaleDateString()}</td>
                  <td>{story.status}</td>
                  <td>
                    <Button variant="outline" onClick={() => openEditModal(story)}>Edit</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{isAddModalOpen ? 'Add New Story' : 'Edit Story'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Circumstances</label>
                <textarea
                  value={circumstances}
                  onChange={(e) => setCircumstances(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Engaged On</label>
                <input
                  type="date"
                  value={engagedOn}
                  onChange={(e) => setEngagedOn(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Released On</label>
                <input
                  type="date"
                  value={releasedOn}
                  onChange={(e) => setReleasedOn(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Acquitted">Acquitted</option>
                  <option value="Released	">Released</option>
                </select>
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