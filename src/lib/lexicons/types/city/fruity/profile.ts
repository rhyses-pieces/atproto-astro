/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../lexicons'
import { type $Typed, is$typed as _is$typed, type OmitKey } from '../../../util'

const is$typed = _is$typed,
  validate = _validate
const id = 'city.fruity.profile'

export interface Record {
  $type: 'city.fruity.profile'
  nickname?: string
  /** Free-form profile description text. */
  description?: string
  /** Small image to be displayed next to posts from account. AKA, 'profile picture' */
  avatar?: string
  /** optional, you can share your personal website or social page here! */
  homepage?: string
  created_at?: string
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}
