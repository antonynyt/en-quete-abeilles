import type { Schema, Struct } from '@strapi/strapi';

export interface BorneSubject extends Struct.ComponentSchema {
  collectionName: 'components_borne_subjects';
  info: {
    displayName: 'subject';
    icon: 'discuss';
  };
  attributes: {
    cover: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Media<'files', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    video: Schema.Attribute.Media<'files' | 'videos'> &
      Schema.Attribute.Required;
  };
}

export interface ContentEmbed extends Struct.ComponentSchema {
  collectionName: 'components_content_embeds';
  info: {
    displayName: 'Embed';
    icon: 'earth';
  };
  attributes: {
    embed: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'plugin::oembed.oembed'>;
  };
}

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
    displayName: 'Media';
    icon: 'attachment';
  };
  attributes: {
    Media: Schema.Attribute.Media<'images' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
  };
}

export interface ContentParagraph extends Struct.ComponentSchema {
  collectionName: 'components_content_paragraphs';
  info: {
    displayName: 'paragraph';
    icon: 'italic';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface ContentText extends Struct.ComponentSchema {
  collectionName: 'components_content_texts';
  info: {
    displayName: 'Text';
    icon: 'feather';
  };
  attributes: {
    paragraph: Schema.Attribute.Component<'content.paragraph', true>;
    subtitle: Schema.Attribute.String;
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

export interface QuizChoice extends Struct.ComponentSchema {
  collectionName: 'components_quiz_choices';
  info: {
    displayName: 'Choice';
    icon: 'check';
  };
  attributes: {
    correct: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    response: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface QuizQuiz extends Struct.ComponentSchema {
  collectionName: 'components_quiz_quizzes';
  info: {
    displayName: 'Quiz';
    icon: 'gate';
  };
  attributes: {
    choice: Schema.Attribute.Component<'quiz.choice', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 2;
        },
        number
      >;
    feedback: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'borne.subject': BorneSubject;
      'content.embed': ContentEmbed;
      'content.list': ContentList;
      'content.media': ContentMedia;
      'content.paragraph': ContentParagraph;
      'content.text': ContentText;
      'non-repetable.indice': NonRepetableIndice;
      'quiz.choice': QuizChoice;
      'quiz.quiz': QuizQuiz;
    }
  }
}
