/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  type LexiconDoc,
  Lexicons,
  ValidationError,
  type ValidationResult,
} from '@atproto/lexicon'
import { type $Typed, is$typed, maybe$typed } from './util.js'

export const schemaDict = {
  CityFruityDefs: {
    lexicon: 1,
    id: 'city.fruity.defs',
    defs: {
      statusView: {
        type: 'object',
        required: ['uri', 'status', 'profile', 'created_at'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          status: {
            type: 'string',
            minLength: 1,
            maxGraphemes: 1,
            maxLength: 255,
          },
          created_at: {
            type: 'string',
            format: 'datetime',
          },
          profile: {
            type: 'ref',
            ref: 'lex:city.fruity.defs#profileView',
          },
        },
      },
      profileView: {
        type: 'object',
        required: ['did', 'handle'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
          handle: {
            type: 'string',
            format: 'handle',
          },
        },
      },
    },
  },
  CityFruityProfile: {
    lexicon: 1,
    id: 'city.fruity.profile',
    defs: {
      main: {
        type: 'record',
        description: 'A user profile on fruity city, maybe custom css?',
        key: 'literal:self',
        record: {
          type: 'object',
          properties: {
            nickname: {
              type: 'string',
              maxGraphemes: 32,
              maxLength: 255,
            },
            description: {
              type: 'string',
              description: 'Free-form profile description text.',
              maxGraphemes: 256,
              maxLength: 500,
            },
            avatar: {
              type: 'string',
              description:
                "Small image to be displayed next to posts from account. AKA, 'profile picture'",
            },
            homepage: {
              type: 'string',
              description:
                'optional, you can share your personal website or social page here!',
            },
            created_at: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  CityFruityStatus: {
    lexicon: 1,
    id: 'city.fruity.status',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['content', 'created_at'],
          properties: {
            content: {
              type: 'string',
              minLength: 1,
              maxGraphemes: 4,
              maxLength: 255,
            },
            created_at: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  ComAtprotoRepoStrongRef: {
    lexicon: 1,
    id: 'com.atproto.repo.strongRef',
    description: 'A URI with a content-hash fingerprint.',
    defs: {
      main: {
        type: 'object',
        required: ['uri', 'cid'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>
export const schemas = Object.values(schemaDict) satisfies LexiconDoc[]
export const lexicons: Lexicons = new Lexicons(schemas)

export function validate<T extends { $type: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType: true,
): ValidationResult<T>
export function validate<T extends { $type?: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: false,
): ValidationResult<T>
export function validate(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: boolean,
): ValidationResult {
  return (requiredType ? is$typed : maybe$typed)(v, id, hash)
    ? lexicons.validate(`${id}#${hash}`, v)
    : {
        success: false,
        error: new ValidationError(
          `Must be an object with "${hash === 'main' ? id : `${id}#${hash}`}" $type property`,
        ),
      }
}

export const ids = {
  CityFruityDefs: 'city.fruity.defs',
  CityFruityProfile: 'city.fruity.profile',
  CityFruityStatus: 'city.fruity.status',
  ComAtprotoRepoStrongRef: 'com.atproto.repo.strongRef',
} as const
