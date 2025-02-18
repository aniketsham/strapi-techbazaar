import { Field, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { useEffect, useState } from 'react';
import { unstable_useContentManagerContext, useFetchClient } from '@strapi/strapi/admin';

const Inputs = ({ ...props }: any) => {
  const { get } = useFetchClient();
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const { form }: any = unstable_useContentManagerContext();
  const { values, onChange } = form;

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await get('api/categories?populate=*', {
          headers: {
            Authorization: `bearer ${process.env.STRAPI_ADMIN_API_TOKEN}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Pre-fill category and subcategory if a subcategory is stored
  useEffect(() => {
    if (values[props.name] && categories.length > 0) {
      const storedSubcategoryId = values[props.name] as string;
      setSelectedSubcategory(storedSubcategoryId as string); // Set subcategory from values

      // Find category where subcategory matches
      const foundCategory = categories.find((cat) =>
        cat.sub_categories.some((sub: any) => sub.id === Number(storedSubcategoryId))
      );

      if (foundCategory) {
        setSelectedCategory(foundCategory.id);
        setSubcategories(foundCategory.sub_categories);

        // Make sure subcategory is selected properly
        const matchedSubcategory = foundCategory.sub_categories.find(
          (sub: any) => sub.id === Number(storedSubcategoryId)
        );
        if (matchedSubcategory) {
          setSelectedSubcategory(matchedSubcategory.id as string);
        }
      }
    }
  }, [values[props.name], categories]); // Run only when categories are available

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      const foundCategory = categories.find((cat) => cat.id === Number(selectedCategory));
      setSubcategories(foundCategory?.sub_categories || []);

      // Only reset subcategory if it doesn't belong to the new category
      if (
        !foundCategory?.sub_categories.some((sub: any) => sub.id === Number(selectedSubcategory))
      ) {
        setSelectedSubcategory(null);
      }
    }
  }, [selectedCategory]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory(null); // Reset subcategory only when user manually changes category
    onChange({ target: { name: 'category', value } });
  };

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategory(value);
    onChange({ target: { name: props.name, value: value.toString() } });
  };

  return (
    <span className="grid grid-cols-2">
      {/* Category Field */}
      <Field.Root error={error}>
        <Field.Label>Category</Field.Label>
        <SingleSelect value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <SingleSelectOption key={category.id} value={category.id}>
              {category.Name}
            </SingleSelectOption>
          ))}
        </SingleSelect>
      </Field.Root>

      {/* Subcategory Field */}
      {selectedCategory && (
        <Field.Root error={error}>
          <Field.Label>Subcategory</Field.Label>
          <SingleSelect value={selectedSubcategory} onChange={handleSubcategoryChange}>
            {subcategories.map((subcategory) => (
              <SingleSelectOption key={subcategory.id} value={subcategory.id}>
                {subcategory.Name}
              </SingleSelectOption>
            ))}
          </SingleSelect>
        </Field.Root>
      )}
    </span>
  );
};

export default Inputs;
