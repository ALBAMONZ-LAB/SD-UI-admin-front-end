'use client';

import { useState, useEffect } from 'react';
import { useGetEventPage } from "@sd-ui-admin/api/event/event.queries";
import * as styles from './index.css';
import TextInputForm from "@sd-ui-admin/components/TextInputForm";

export interface EventDetailProps {
  id: number;
}

interface Section {
  id: number;
  type: string;
}

export function EventDetail({ id }: EventDetailProps) {
  const { data, loading: isLoading, error } = useGetEventPage(id);
  const [sections, setSections] = useState<Section[]>([]);
  const [nextId, setNextId] = useState(1);
  const [selectedSection, setSelectedSection] = useState('button');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    if (data) {
      setTitle(data.pageJson.title);
      setDescription(data.pageJson.description);
    }
  }, [data]);


  const addSection = () => {
    setSections([...sections, { id: nextId, type: selectedSection }]);
    setNextId(nextId + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Event:', {
      eventId: data?.eventId,
      title,
      description,
      sections,
    });
  };
  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
            <p>Event ID: {data?.eventId}</p>
            <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
            <p>Description: {data?.pageJson.description}</p>
          </div>

          <TextInputForm label="Title" name="title" value={data?.pageJson.title} onChange={(e) => setTitle(e.target.value)} />
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