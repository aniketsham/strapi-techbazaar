import type { Schema, Struct } from '@strapi/strapi';

export interface CommonButton extends Struct.ComponentSchema {
  collectionName: 'components_common_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    call_to_action: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface CommonColor extends Struct.ComponentSchema {
  collectionName: 'components_common_colors';
  info: {
    description: '';
    displayName: 'Color';
  };
  attributes: {
    Hex_Code: Schema.Attribute.String & Schema.Attribute.Required;
    Name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonImage extends Struct.ComponentSchema {
  collectionName: 'components_common_images';
  info: {
    description: '';
    displayName: 'Image';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface CommonImageBanner extends Struct.ComponentSchema {
  collectionName: 'components_common_image_banners';
  info: {
    description: '';
    displayName: 'Image_banner';
  };
  attributes: {
    Desktop_image: Schema.Attribute.Component<'common.image', false>;
    Mobile_image: Schema.Attribute.Component<'common.image', false>;
  };
}

export interface CommonMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_common_menu_links';
  info: {
    displayName: 'Menu_link';
  };
  attributes: {
    link: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface CommonSizeColorVariant extends Struct.ComponentSchema {
  collectionName: 'components_common_size_color_variants';
  info: {
    description: '';
    displayName: 'SizeColor_variant';
    icon: 'check';
  };
  attributes: {
    Color: Schema.Attribute.Enumeration<
      ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gray']
    > &
      Schema.Attribute.Required;
    Size: Schema.Attribute.Enumeration<
      ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    > &
      Schema.Attribute.Required;
  };
}

export interface CommonTags extends Struct.ComponentSchema {
  collectionName: 'components_common_tags';
  info: {
    description: '';
    displayName: 'Tags';
  };
  attributes: {
    Tag: Schema.Attribute.String;
  };
}

export interface CommonVideo extends Struct.ComponentSchema {
  collectionName: 'components_common_videos';
  info: {
    description: '';
    displayName: 'Video';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    Video: Schema.Attribute.Media<'videos'>;
  };
}

export interface CommonVideoBanner extends Struct.ComponentSchema {
  collectionName: 'components_common_video_banners';
  info: {
    description: '';
    displayName: 'Video_banner';
  };
  attributes: {
    Desktop_video: Schema.Attribute.Component<'common.video', false>;
    Mobile_video: Schema.Attribute.Component<'common.video', false>;
  };
}

export interface SectionAdvantageSection extends Struct.ComponentSchema {
  collectionName: 'components_section_advantage_sections';
  info: {
    description: '';
    displayName: 'Advantage_section';
  };
  attributes: {
    advantages: Schema.Attribute.Relation<
      'oneToMany',
      'api::advantage.advantage'
    >;
    Button: Schema.Attribute.Component<'common.button', false>;
    Title: Schema.Attribute.String;
  };
}

export interface SectionCategorySection extends Struct.ComponentSchema {
  collectionName: 'components_section_category_sections';
  info: {
    description: '';
    displayName: 'Category_section';
  };
  attributes: {
    Button: Schema.Attribute.Component<'common.button', false>;
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    Title: Schema.Attribute.String;
  };
}

export interface SectionTestimonialSection extends Struct.ComponentSchema {
  collectionName: 'components_section_testimonial_sections';
  info: {
    description: '';
    displayName: 'Testimonial_section';
  };
  attributes: {
    Button: Schema.Attribute.Component<'common.button', false>;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    Title: Schema.Attribute.String;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    description: '';
    displayName: 'seo';
  };
  attributes: {
    Allow_Indexing: Schema.Attribute.Boolean;
    metaDescription: Schema.Attribute.Text;
    metaKeywords: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    schema: Schema.Attribute.JSON & Schema.Attribute.Required;
    Share_Image: Schema.Attribute.Component<'common.image', false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.button': CommonButton;
      'common.color': CommonColor;
      'common.image': CommonImage;
      'common.image-banner': CommonImageBanner;
      'common.menu-link': CommonMenuLink;
      'common.size-color-variant': CommonSizeColorVariant;
      'common.tags': CommonTags;
      'common.video': CommonVideo;
      'common.video-banner': CommonVideoBanner;
      'section.advantage-section': SectionAdvantageSection;
      'section.category-section': SectionCategorySection;
      'section.testimonial-section': SectionTestimonialSection;
      'seo.seo': SeoSeo;
    }
  }
}
