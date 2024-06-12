import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { itITLocale } from "@sanity/locale-it-it";

import {DocumentTextIcon} from '@sanity/icons'
import {UsersIcon} from '@sanity/icons'
import {CalendarIcon} from '@sanity/icons'
import {HelpCircleIcon} from '@sanity/icons'
import {DocumentsIcon} from '@sanity/icons'
import {OlistIcon} from '@sanity/icons'
import {ProjectsIcon} from '@sanity/icons'

const post = {
  type: "document",
  name: "post",
  title: "Gestione Post",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "title",
      title: "Titolo",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "keywords",
      title: "Keywords SEO",
      description: "Massimo 3 parole",
      type: "array",
      of: [{type: "string"}]
    },
    {
      name: 'author',
      title: 'Autore',
      type: 'reference',
      to: {type: 'author'}
    },
    {
      name: 'mainImage',
      title: 'Immagine di copertina',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'excerpt',
      title: 'Anteprima Articolo',
      type: 'text',
      description: 'Breve riassunto, massimo 15/20 parole'
    },
    {
      name: 'categories',
      title: 'Categorie',
      description: 'Inserire solo una categoria',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'publishedAt',
      title: 'Data di pubblicazione',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Contenuto',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'mainImage'
    },
    prepare(selection: any) {
      const {title, date, media} = selection;
      return {
        title,
        subtitle: `${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()} - ${new Date(date).getHours()}:${new Date(date).getMinutes()}`,
        media
      }
    }
  }
};

const percorsi = {
  type: "document",
  name: "percorso",
  title: "Gestione Percorsi",
  icon: OlistIcon,
  fields: [
    {
      name: "title",
      title: "Titolo",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Sottotitolo",
      type: "string",
    },
    {
      name: 'mainImage',
      title: 'Immagine di copertina',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'excerpt',
      title: 'Descrizione Percorso',
      type: 'text',
      description: 'Breve riassunto, massimo 20/30 parole'
    },
    {
      name: 'text',
      title: 'Spiegazione Percorso',
      type: 'text',
      description: 'Massimo 70/80'
    },
  ],
};

const events = {
  type: "document",
  name: "event",
  title: "Gestione Eventi",
  icon: CalendarIcon,
  fields: [
    {
      name: "title",
      title: "Titolo",
      type: "string",
    },
    {
      name: 'mainImage',
      title: 'Immagine di copertina',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'excerpt',
      title: 'Descrizione Evento',
      type: 'text',
      description: 'Breve riassunto, massimo 40 parole'
    },
    {
      name: 'startHour',
      title: 'Ora Inizio',
      type: 'string',
      description: 'Formato 24 ore, ":" tra le cifre'
    },
    {
      name: 'endHour',
      title: 'Ora Fine',
      type: 'string',
      description: 'Formato 24 ore, ":" tra le cifre'
    },
    {
      title: "L'evento dura più di un giorno?",
      name: "multipleDays",
      initialValue: false,
      type: "boolean",
    },
    {
      title: "Data dell'evento",
      name: "eventDate",
      type: "date",
      hidden: ({ parent }: { parent: Record<string, any> }) => parent?.multipleDays,
    },
    {
      title: "Data di inizio evento",
      name: "startEventDate",
      type: "date",
      hidden: ({ parent }: { parent: Record<string, any> }) => !parent?.multipleDays,
    },
    {
      title: "Data di fine evento",
      name: "endEventDate",
      type: "date",
      hidden: ({ parent }: { parent: Record<string, any> }) => !parent?.multipleDays,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eventDate',
    },
    prepare(selection: any) {
      const {title, subtitle} = selection;
      return {
        title,
        subtitle: `Data: ${subtitle ? subtitle : "Giorni Multipli"}`
      }
    }
  }
};

const author = {
  name: 'author',
  title: 'Gestione Autori',
  type: 'document',
  icon: UsersIcon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    }
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
};

const faq = {
  name: 'faq',
  title: 'Gestione FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    {
      name: 'question',
      title: 'Domanda',
      type:'string',
    },
    {
      name: 'answer',
      title: 'Risposta',
      type: 'text',
    }
  ]
}

const specific = {
  name: 'corsi',
  title: 'Gestione Corsi',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type:'string',
    },
    {
      name: 'text',
      title: 'Testo',
      type: 'text',
    },
    {
      name: 'current',
      title: "Riferimento Sezione",
      type: "reference",
      to: {type: 'percorso'}
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'current.title',
    },
    prepare(selection: any) {
      const {title, subtitle} = selection;
      return {
        title,
        subtitle: `Sezione: ${subtitle ? subtitle : "nessuna"}`
      }
    }
  }
}


const category = {
  name: "category",
  title: "Gestione Categorie",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    {
      name: "title",
      title: "Titolo",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
  ],
};

const blockContent = {
  title: 'Testo Articolo',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Testo',
      type: 'block',
      styles: [
        {title: 'Standard', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Citazione', value: 'blockquote'},
      ],
      lists: [{title: 'Lista', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Grassetto', value: 'strong'},
          {title: 'Corsivo', value: 'em'},
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              }
            ]
          }
        ]
      }
    }
  ]
}

export default defineConfig({
  title: "Gestionale",

  projectId: import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_STUDIO_DATASET,

  plugins: [structureTool(), visionTool(), itITLocale()],
  schema: {
    types: [
      post,
      author,
      category,
      faq,
      events,
      percorsi,
      specific,
      blockContent
    ],
  },
});
