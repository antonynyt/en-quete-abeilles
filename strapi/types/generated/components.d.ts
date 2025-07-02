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
    displayName: 'Media';
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
      'content.list': ContentList;
      'content.media': ContentMedia;
      'content.text': ContentText;
      'non-repetable.indice': NonRepetableIndice;
      'quiz.choice': QuizChoice;
      'quiz.quiz': QuizQuiz;
    }
  }
}
