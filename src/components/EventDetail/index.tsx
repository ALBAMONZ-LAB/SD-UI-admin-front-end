'use client';

import { useState, useEffect } from 'react';
import { useEventPages } from '@sd-ui-admin/api/event/event.queries';
import * as styles from './index.css';
import { section } from "./index.css";
import TextInputForm from "@sd-ui-admin/components/TextInputForm";

export interface EventDetailProps {
  id: number;
}

interface Section {
  id: number;
  type: string;
}

export function EventDetail({ id }: EventDetailProps) {
  const { data, loading: isLoading, error } = useEventPages(id);
  const [sections, setSections] = useState<Section[]>([]);
  const [nextId, setNextId] = useState(1);
  const [selectedSection, setSelectedSection] = useState('button');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Event data fetching
  useEffect(() => {
    if (data) {
      setTitle(data.getEventPageComponents.pageJson.title);
      setDescription(data.getEventPageComponents.pageJson.description);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const addSection = () => {
    setSections([...sections, { id: nextId, type: selectedSection }]);
    setNextId(nextId + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic for updating the event data
    console.log('Updated Event:', {
      eventId: data?.getEventPageComponents.eventId,
      title,
      description,
      sections,
    });
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2>Event Detail Form</h2>
        <div className={styles.inputGroup}>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
            <option value="button">Button Area</option>
            <option value="image">Image Area</option>
            <option value="carousel">Carousel Area</option>
          </select>
          <button type="button" onClick={addSection}>콘텐츠 추가</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.readOnlyFields}>
            <p>Event ID: {data?.getEventPageComponents.eventId}</p>
            <p>Created At: {new Date(data?.getEventPageComponents.createdAt).toLocaleString()}</p>
            <p>Description: {description}</p>
          </div>

          <TextInputForm label="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className={styles.saveButtonContainer}>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <h2>Preview</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    </div>
  );
}

export default EventDetail;