import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import Select from 'react-select';

const HomePage = () => {
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [contentTypes, setContentTypes] = useState<any[]>([]);
  const { get, post } = useFetchClient();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await get(`/api/collection-toggle-plugin/settings`);
        const storedSelection = response?.data.selectedContentTypes || [];
        setSelectedContentTypes(storedSelection);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  // Fetch content types, filter them, and store
  useEffect(() => {
    const fetchContentTypes = async () => {
      try {
        const response = await get('/api/content-type-builder/content-types', {
          headers: {
            Authorization: `bearer ${process.env.STRAPI_ADMIN_API_TOKEN}`,
          },
        });
        const data = response.data.data;
        const filteredContentTypes = data.filter(
          (contentType: any) =>
            contentType.uid.startsWith('api::') &&
            !contentType.plugin &&
            (contentType.schema.attributes.SLUG || contentType.schema.attributes.slug)
        );
        setContentTypes(filteredContentTypes);
      } catch (error) {
        console.error('Error fetching content types:', error);
      }
    };
    fetchContentTypes();
  }, []);

  const updateSetting = async (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setSelectedContentTypes(selectedValues);

    try {
      const resposne = await post(`/api/collection-toggle-plugin/settings`, {
        body: { selectedContentTypes: selectedValues },
      });

      // console.log(resposne.data);
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  };
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        background: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '16px',
          textAlign: 'center',
          color: '#333',
        }}
      >
        Relational Collection Toggle
      </h1>

      <label
        style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#555',
        }}
      >
        Select Content Types:
      </label>

      <Select
        isMulti
        options={contentTypes.map((contentType) => ({
          value: contentType.schema.pluralName,
          label: contentType.apiID.toUpperCase(),
        }))}
        value={contentTypes
          .filter((contentType) => selectedContentTypes.includes(contentType.schema.pluralName))
          .map((contentType) => ({
            value: contentType.schema.pluralName,
            label: contentType.apiID.toUpperCase(),
          }))}
        onChange={updateSetting}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: '#ccc',
            padding: '5px',
            fontSize: '14px',
            background: '#f9f9f9',
          }),
        }}
      />
    </div>
  );
};

export { HomePage };
