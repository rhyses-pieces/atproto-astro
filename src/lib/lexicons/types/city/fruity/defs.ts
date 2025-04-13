/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../lexicons'
import { type $Typed, is$typed as _is$typed, type OmitKey } from '../../../util'

const is$typed = _is$typed,
  validate = _validate
const id = 'city.fruity.defs'

export interface StatusView {
  $type?: 'city.fruity.defs#statusView'
  uri: string
  status: string
  created_at: string
  profile: ProfileView
}

const hashStatusView = 'statusView'

export function isStatusView<V>(v: V) {
  return is$typed(v, id, hashStatusView)
}

export function validateStatusView<V>(v: V) {
  return validate<StatusView & V>(v, id, hashStatusView)
}

export interface ProfileView {
  $type?: 'city.fruity.defs#profileView'
  did: string
  handle: string
}

const hashProfileView = 'profileView'

export function isProfileView<V>(v: V) {
  return is$typed(v, id, hashProfileView)
}

export function validateProfileView<V>(v: V) {
  return validate<ProfileView & V>(v, id, hashProfileView)
}
