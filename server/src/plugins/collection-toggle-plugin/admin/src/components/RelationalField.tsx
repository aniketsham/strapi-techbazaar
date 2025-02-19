import { Field, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { TextInput } from '@strapi/design-system';
import { Grid } from '@strapi/design-system';
import { Group } from '@strapi/design-system/dist/components/Avatar/Avatar';
import { useFetchClient } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';

const RelationalField = ({ ...props }: any) => {
  const { name, value, onChange, attribute } = props;
  const { get } = useFetchClient();
  const [contentTypes, setContentTypes] = useState<any>();
  const [selectedContentTypes, setSelectedContentTypes] = useState<any>();

  const [relationSlug, setRelationSlug] = useState<any>();
  const [selectedSlug, setSelectedSlug] = useState<any>();
  const { form }: any = useContentManagerContext();
  const { initialValues } = form;
  useEffect(() => {
    if (initialValues) {
      setSelectedSlug(initialValues[props.name]);
    }
  }, []);
  console.log(form);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await get(`/api/collection-toggle-plugin/settings`);
        const storedSelection = response?.data.selectedContentTypes || [];
        setContentTypes(storedSelection);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchContentTypesSlug = async () => {
      try {
        console.log(selectedContentTypes);
        const response = await get(`/api/${selectedContentTypes}`, {
          headers: {
            Authorization: `bearer ${process.env.STRAPI_ADMIN_API_TOKEN}`,
          },
        });

        console.log(response.data, 'response');
        let slugs;
        if (selectedContentTypes === 'blogs' || selectedContentTypes === 'sub-categories') {
          slugs = response.data.data.map((item: any) => item.SLUG);
        } else {
          slugs = response.data.map((item: any) => item.SLUG);
        }
        console.log(slugs);
        setRelationSlug(slugs);
      } catch (error) {
        console.error('Error fetching slugs:', error);
      }
    };

    if (selectedContentTypes) {
      fetchContentTypesSlug();
    }
  }, [selectedContentTypes]);

  const handleContentTypesChange = (value: string) => {
    setSelectedContentTypes(value);
  };

  const handleRelationSlugChange = (value: string) => {
    setSelectedSlug(value);
    onChange({ target: { name: props.name, value: value.toString() } });
  };
  return (
    <Grid.Root
      gap={{
        large: 5,
        medium: 2,
        initial: 1,
      }}
      style={{ width: '100%' }}
    >
      <Grid.Item col={6} s={12}>
        <div style={{ flexGrow: 1, width: '100%' }}>
          <Field.Label>{name}</Field.Label>
          <SingleSelect
            name={name}
            value={selectedContentTypes}
            onChange={handleContentTypesChange}
            style={{ width: '200%' }}
          >
            {contentTypes?.map((contentType: any) => {
              return (
                <SingleSelectOption key={contentType} value={contentType}>
                  {contentType}
                </SingleSelectOption>
              );
            })}
          </SingleSelect>
        </div>
      </Grid.Item>

      <Grid.Item col={6} s={12}>
        <div style={{ flexGrow: 1, width: '100%' }}>
          <Field.Label>{name} slug</Field.Label>
          <SingleSelect
            value={selectedSlug}
            onChange={handleRelationSlugChange}
            style={{ width: '100%' }}
          >
            {relationSlug?.map((slug: any) => {
              return (
                <SingleSelectOption key={slug} value={slug}>
                  {slug}
                </SingleSelectOption>
              );
            })}
          </SingleSelect>
        </div>
      </Grid.Item>
    </Grid.Root>
  );
};

export default RelationalField;
