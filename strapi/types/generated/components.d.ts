import type { Schema, Struct } from '@strapi/strapi';

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
      'non-repetable.indice': NonRepetableIndice;
    }
  }
}
