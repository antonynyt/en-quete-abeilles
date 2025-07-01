import type { Schema, Struct } from '@strapi/strapi';

export interface ContentList extends Struct.ComponentSchema {
  collectionName: 'components_content_lists';
  info: {
    displayName: 'List';
    icon: 'bulletList';
  };
  attributes: {
    listElement: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentMedia extends Struct.ComponentSchema {
  collectionName: 'components_content_media';
  info: {
    displayName: 'media';
    icon: 'attachment';
  };
  attributes: {
    Media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ContentText extends Struct.ComponentSchema {
  collectionName: 'components_content_texts';
  info: {
    displayName: 'Text';
    icon: 'feather';
  };
  attributes: {
    textContent: Schema.Attribute.Blocks;
  };
}

export interface NonRepetableIndice extends Struct.ComponentSchema {
  collectionName: 'components_non_repetable_indices';
  info: {
    displayName: 'Indice';
    icon: 'question';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    fact: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.list': ContentList;
      'content.media': ContentMedia;
      'content.text': ContentText;
      'non-repetable.indice': NonRepetableIndice;
    }
  }
}
